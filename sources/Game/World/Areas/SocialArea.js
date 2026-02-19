import * as THREE from 'three/webgpu'
import { color, float, texture } from 'three/tsl'
import { Game } from '../../Game.js'
import { InteractivePoints } from '../../InteractivePoints.js'
import socialData from '../../../data/social.js'
import { InstancedGroup } from '../../InstancedGroup.js'
import { Area } from './Area.js'
import { View } from '../../View.js'
import { MeshDefaultMaterial } from '../../Materials/MeshDefaultMaterial.js'

export class SocialArea extends Area
{
    constructor(model)
    {
        super(model)

        this.center = this.references.items.get('center')[0].position

        // Debug
        if(this.game.debug.active)
        {
            this.debugPanel = this.game.debug.panel.addFolder({
                title: '👨‍🦲 Social',
                expanded: false,
            })
        }

        this.setLinks()
        this.replaceStatues()
        this.setFans()
        this.setOnlyFans()
        this.setStatue()
        // this.setFWA()
        this.setAchievement()
    }

    setLinks()
    {
        const radius = 6

        for(const link of socialData)
        {
            const angle = link.slotIndex * Math.PI / 7
            const position = this.center.clone()
            position.x += Math.cos(angle) * radius
            position.y = 1
            position.z -= Math.sin(angle) * radius

            this.interactivePoint = this.game.interactivePoints.create(
                position,
                link.name,
                link.align === 'left' ? InteractivePoints.ALIGN_LEFT : InteractivePoints.ALIGN_RIGHT,
                InteractivePoints.STATE_CONCEALED,
                () =>
                {
                    if(link.url)
                        window.open(link.url, '_blank')
                    else if(link.modal)
                        this.game.modals.open(link.modal)
                },
                () =>
                {
                    this.game.inputs.interactiveButtons.addItems(['interact'])
                },
                () =>
                {
                    this.game.inputs.interactiveButtons.removeItems(['interact'])
                },
                () =>
                {
                    this.game.inputs.interactiveButtons.removeItems(['interact'])
                }
            )
        }
    }

    replaceStatues()
    {
        // Extract the palette texture from an existing statue (e.g. GitHub)
        // All GLTF statues use a shared palette texture for color via UV mapping
        let paletteTexture = null
        for(const item of this.objects.items)
        {
            if(!item.visual?.object3D) continue
            if(item.visual.object3D.name.toLowerCase() === 'github')
            {
                item.visual.object3D.traverse((child) =>
                {
                    if(child.isMesh && child.material?._colorNode && !paletteTexture)
                    {
                        const texNode = child.material._colorNode.node // SplitNode.node → TextureNode
                        if(texNode?.value?.isTexture)
                            paletteTexture = texNode.value
                    }
                })
                break
            }
        }

        // Create material using the same palette texture as existing statues
        const statueMaterial = new MeshDefaultMaterial({
            colorNode: paletteTexture ? texture(paletteTexture).rgb : color(0xffffff),
            alphaNode: float(1),
            hasCoreShadows: true,
            hasDropShadows: true,
            hasLightBounce: true,
            hasFog: true,
            hasWater: true,
            hasReveal: true,
            transparent: false,
        })

        const replacements = [
            { search: 'bluesky', createLogo: (mat) => this.createMediumLogo(mat) },
            { search: 'youtube', createLogo: (mat) => this.createNpmLogo(mat) },
            { search: 'twitch', createLogo: (mat) => this.createPyPILogo(mat) },
            { search: 'discord', createLogo: (mat) => this.createContactLogo(mat) },
        ]

        for(const replacement of replacements)
        {
            for(const item of this.objects.items)
            {
                if(!item.visual || !item.visual.object3D)
                    continue

                let found = false
                item.visual.object3D.traverse((child) =>
                {
                    if(child.name.toLowerCase().includes(replacement.search))
                        found = true
                })

                if(!found)
                    continue

                const original = item.visual.object3D

                // Capture original transform before hiding
                const origPos = original.position.clone()
                const origRot = original.rotation.clone()

                // Hide original statue
                original.visible = false
                if(item.physical && item.physical.body)
                    item.physical.body.setEnabled(false)
                const hideIndex = this.objects.hideable.indexOf(original)
                if(hideIndex !== -1)
                    this.objects.hideable.splice(hideIndex, 1)

                // Create replacement logo using the same material as existing statues
                const logo = replacement.createLogo(statueMaterial)

                // Override UVs to sample the same palette color as existing statues
                logo.traverse((child) =>
                {
                    if(child.isMesh)
                    {
                        const uvAttr = child.geometry.attributes.uv
                        if(uvAttr)
                        {
                            for(let i = 0; i < uvAttr.count; i++)
                                uvAttr.setXY(i, 0.421, 0.5)
                            uvAttr.needsUpdate = true
                        }
                    }
                })

                // Compute bounding box for collider size
                const bbox = new THREE.Box3().setFromObject(logo)
                const size = new THREE.Vector3()
                bbox.getSize(size)

                // Add as a physics-enabled object (like existing statues)
                const origQuat = new THREE.Quaternion().setFromEuler(origRot)
                const object = this.game.objects.add(
                    {
                        model: logo,
                        updateMaterials: false,
                        castShadow: true,
                        receiveShadow: true,
                    },
                    {
                        type: 'dynamic',
                        position: origPos,
                        rotation: origQuat,
                        sleeping: true,
                        mass: 0.5,
                        colliders: [{ shape: 'cuboid', parameters: [size.x * 0.5, size.y * 0.5, size.z * 0.5] }],
                    }
                )

                this.objects.items.push(object)
                this.objects.hideable.push(object.visual.object3D)

                break
            }
        }
    }

    createMediumLogo(mat)
    {
        // Medium icon: three descending circles/ellipsoids as 3D sculpture
        const group = new THREE.Group()

        // Large sphere (left) - full 3D
        const large = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), mat)
        large.scale.set(1, 1, 0.5)
        large.position.set(-0.42, 0, 0)
        group.add(large)

        // Medium ellipsoid (center)
        const med = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 32), mat)
        med.scale.set(0.55, 1, 0.5)
        med.position.set(0.1, 0, 0)
        group.add(med)

        // Small ellipsoid (right)
        const small = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 32), mat)
        small.scale.set(0.35, 1, 0.5)
        small.position.set(0.48, 0, 0)
        group.add(small)

        return group
    }

    createNpmLogo(mat)
    {
        // npm "n" letterform as 3D extruded sculpture
        const group = new THREE.Group()
        const depth = 0.4

        // Left column (full height)
        const leftCol = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, depth), mat)
        leftCol.position.set(-0.4, 0, 0)
        group.add(leftCol)

        // Top bar connecting columns
        const topBar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.3, depth), mat)
        topBar.position.set(0, 0.45, 0)
        group.add(topBar)

        // Right column (shorter, gap at bottom)
        const rightCol = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.85, depth), mat)
        rightCol.position.set(0.4, 0.175, 0)
        group.add(rightCol)

        return group
    }

    createPyPILogo(mat)
    {
        // Python logo: two interlocking L-shapes as 3D sculpture
        const group = new THREE.Group()
        const depth = 0.4

        // Upper-left L-shape
        const topHoriz = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.3, depth), mat)
        topHoriz.position.set(-0.05, 0.3, 0)
        group.add(topHoriz)

        const leftVert = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.7, depth), mat)
        leftVert.position.set(-0.25, 0.05, 0)
        group.add(leftVert)

        // Lower-right L-shape
        const bottomHoriz = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.3, depth), mat)
        bottomHoriz.position.set(0.05, -0.3, 0)
        group.add(bottomHoriz)

        const rightVert = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.7, depth), mat)
        rightVert.position.set(0.25, -0.05, 0)
        group.add(rightVert)

        // Eyes (raised spheres)
        const eyeTop = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), mat)
        eyeTop.position.set(-0.25, 0.3, depth * 0.5 + 0.04)
        group.add(eyeTop)

        const eyeBottom = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), mat)
        eyeBottom.position.set(0.25, -0.3, depth * 0.5 + 0.04)
        group.add(eyeBottom)

        return group
    }

    createContactLogo(mat)
    {
        // Person silhouette: circle head + half-circle shoulders as 3D sculpture
        const group = new THREE.Group()

        // Head (sphere, slightly flattened in Z for sculptural look)
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 32), mat)
        head.scale.set(1, 1, 0.6)
        head.position.set(0, 0.45, 0)
        group.add(head)

        // Shoulders/body (upper hemisphere, wider and flattened)
        const bodyGeo = new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5)
        const body = new THREE.Mesh(bodyGeo, mat)
        body.scale.set(1, 0.7, 0.6)
        body.position.set(0, -0.1, 0)
        group.add(body)

        return group
    }

    setFans()
    {
        const baseFan = this.references.items.get('fan')[0]
        baseFan.castShadow = true
        baseFan.receiveShadow = true

        baseFan.position.set(0, 0, 0)

        // Update materials 
        this.game.materials.updateObject(baseFan)

        baseFan.removeFromParent()
        
        this.fans = {}
        this.fans.spawnerPosition = this.references.items.get('onlyFans')[0].position
        this.fans.count = 30
        this.fans.visibleCount = 0
        this.fans.currentIndex = 0
        this.fans.mass = 0.02
        this.fans.objects = []

        const references = []

        for(let i = 0; i < this.fans.count; i++)
        {
            // Reference
            const reference = new THREE.Object3D()

            reference.position.copy(this.fans.spawnerPosition)
            reference.position.y += 99
            reference.needsUpdate = true
            references.push(reference)
            
            // Object
            const object = this.game.objects.add(
                {
                    model: reference,
                    updateMaterials: false,
                    castShadow: false,
                    receiveShadow: false,
                    parent: null,
                },
                {
                    type: 'dynamic',
                    position: reference.position,
                    rotation: reference.quaternion,
                    friction: 0.7,
                    mass: this.fans.mass,
                    sleeping: true,
                    enabled: false,
                    colliders: [ { shape: 'cuboid', parameters: [ 0.45, 0.65, 0.45 ], category: 'object' } ],
                    waterGravityMultiplier: - 1
                },
            )

            this.fans.objects.push(object)
        }

        this.fans.instancedGroup = new InstancedGroup(references, baseFan)

        this.fans.pop = () =>
        {
            const object = this.fans.objects[this.fans.currentIndex]

            const spawnPosition = this.fans.spawnerPosition.clone()
            spawnPosition.x += (Math.random() - 0.5) * 4
            spawnPosition.y += 4 * Math.random()
            spawnPosition.z += (Math.random() - 0.5) * 4
            object.physical.body.setTranslation(spawnPosition)
            object.physical.body.setEnabled(true)
            object.physical.body.setLinvel({ x: 0, y: 0, z: 0 })
            object.physical.body.setAngvel({ x: 0, y: 0, z: 0 })
            object.physical.body.wakeUp()
            // this.game.ticker.wait(1, () =>
            // {
            //     object.physical.body.applyImpulse({
            //         x: (Math.random() - 0.5) * this.fans.mass * 2,
            //         y: Math.random() * this.fans.mass * 3,
            //         z: this.fans.mass * 7
            //     }, true)
            //     object.physical.body.applyTorqueImpulse({ x: 0, y: 0, z: 0 }, true)
            // })

            this.fans.currentIndex = (this.fans.currentIndex + 1) % this.fans.count

            this.fans.visibleCount = Math.min(this.fans.visibleCount + 1, this.fans.count)

            // Sound
            this.game.audio.groups.get('click').play(true)

            // Achievement
            this.game.achievements.setProgress('fan', 1)
        }
    }

    setOnlyFans()
    {
        const interactiveArea = this.game.interactivePoints.create(
            this.references.items.get('onlyFans')[0].position,
            'OnlyFans',
            InteractivePoints.ALIGN_RIGHT,
            InteractivePoints.STATE_CONCEALED,
            () =>
            {
                this.fans.pop()
            },
            () =>
            {
                this.game.inputs.interactiveButtons.addItems(['interact'])
            },
            () =>
            {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            },
            () =>
            {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            }
        )
    }

    setStatue()
    {
        this.statue = {}
        this.statue.body = this.references.items.get('statue')[0].userData.object.physical.body
        this.statue.down = false
    }

    setFWA()
    {
        this.fwa = {}

        // Confetti
        let i = 0
        this.fwa.positions = [
            new THREE.Vector3(23.5, 0, -18.5),
            new THREE.Vector3(27, 0, -19.5),
        ]
        const pop = () =>
        {
            i++
            const position = this.fwa.positions[i % this.fwa.positions.length]
            this.game.world.confetti.pop(position)
            
            setTimeout(pop, 500 + Math.random() * 1500)
        }
        setTimeout(pop, 2000)
        
        // Interactive points
        game.interactivePoints.temporaryHide()

        // Input => start
        this.game.inputs.addActions([
            { name: 'startFWA', categories: [ 'intro', 'modal', 'menu', 'racing', 'cinematic', 'wandering' ], keys: [ 'Keyboard.k' ] },
            { name: 'winFWA', categories: [ 'intro', 'modal', 'menu', 'racing', 'cinematic', 'wandering' ], keys: [ 'Keyboard.j' ] },
        ])
        this.game.inputs.events.on('startFWA', (action) =>
        {
            if(action.active)
            {
                // View
                game.view.zoom.baseRatio = 0.55
                game.view.zoom.ratio = 0.55
                game.view.zoom.smoothedRatio = 0.55
                game.view.focusPoint.position.set(25, 0, -19.2)
                game.view.focusPoint.isTracking = false
                window.setTimeout(() =>
                {
                    this.game.view.setMode(View.MODE_FREE)
                }, 1000)

                // Weather
                this.game.weather.override.start(
                    {
                        humidity: 0,
                        electricField: 0,
                        clouds: 0,
                        wind: 0
                    },
                    0
                )
        
                // Day cycles
                this.game.dayCycles.override.start(
                    {
                        progress: 0.87
                    },
                    0
                )
                
                // Buttons
                document.querySelector('.js-menu-trigger').style.display = 'none'
                document.querySelector('.js-map-trigger').style.display = 'none'
            }
        })
        this.game.inputs.events.on('winFWA', (action) =>
        {
            if(action.active)
            {
                this.game.achievements.setProgress('foty', 1)
            }
        })
    }

    setAchievement()
    {
        this.events.on('boundingIn', () =>
        {
            this.game.achievements.setProgress('areas', 'social')
        })
    }

    update()
    {
        if(this.fans.visibleCount)
        {
            let allFansSleeping = true
            for(const fan of this.fans.objects)
                allFansSleeping = allFansSleeping && fan.physical.body.isSleeping()

            if(!allFansSleeping)
                this.fans.instancedGroup.updateBoundings()
        }
    
        if(this.statue && !this.statue.down && !this.statue.body.isSleeping())
        {
            const statueUp = new THREE.Vector3(0, 1, 0)
            statueUp.applyQuaternion(this.statue.body.rotation())
            if(statueUp.y < 0.25)
            {
                this.statue.down = true
                this.game.achievements.setProgress('statueDown', 1)
            }
        }

        for(const object of this.fans.objects)
        {
            if(!object.physical.body.isSleeping() && object.physical.body.isEnabled())
                object.visual.object3D.needsUpdate = true
        }
    }
}