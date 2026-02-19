import * as THREE from 'three/webgpu'
import { color, float, Fn, instancedArray, mix, normalWorld, positionGeometry, step, texture, uniform, uv, vec2, vec3, vec4 } from 'three/tsl'
import { Inputs } from '../../Inputs/Inputs.js'
import { InteractivePoints } from '../../InteractivePoints.js'
import { Area } from './Area.js'
import gsap from 'gsap'
import { MeshDefaultMaterial } from '../../Materials/MeshDefaultMaterial.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

export class LandingArea extends Area
{
    constructor(model)
    {
        super(model)

        this.localTime = uniform(0)

        this.setLetters()
        this.setKiosk()
        this.setControls()
        this.setBonfire()
        this.setAchievement()
    }

    setLetters()
    {
        const references = this.references.items.get('letters')

        this.letterObjects = []
        this._nameRevealed = false

        // Calculate center position from existing letters
        let centerX = 0
        let centerZ = 0

        for(const reference of references)
        {
            centerX += reference.position.x
            centerZ += reference.position.z

            // Disable original letter entirely (visual + physics)
            if(reference.userData.object)
            {
                if(reference.userData.object.visual)
                    reference.userData.object.visual.object3D.visible = false

                if(reference.userData.object.physical)
                    reference.userData.object.physical.body.setEnabled(false)
            }
        }

        centerX /= references.length
        centerZ /= references.length

        this._nameCenter = new THREE.Vector3(centerX, 0, centerZ)

        // Create individual 3D letter meshes with Rapier physics
        const fontLoader = new FontLoader()
        fontLoader.load('fonts/helvetiker_bold.typeface.json', (font) =>
        {
            const material = new THREE.MeshStandardMaterial({
                color: 0x5566cc,
                metalness: 0.3,
                roughness: 0.6
            })

            const textOptions = {
                font: font,
                size: 1.8,
                depth: 0.15,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.03,
                bevelSegments: 3
            }

            const letterSpacing = 0.12
            const spaceWidth = 0.8

            const createLetterRow = (word, rowCenterX, rowZ) =>
            {
                // First pass: compute letter widths
                const letters = []
                let totalWidth = 0

                for(const char of word)
                {
                    if(char === ' ')
                    {
                        letters.push({ char, geom: null, width: spaceWidth, height: 0, depth: 0 })
                        totalWidth += spaceWidth + letterSpacing
                        continue
                    }
                    const geom = new TextGeometry(char, textOptions)
                    geom.computeBoundingBox()
                    const bb = geom.boundingBox
                    const width = bb.max.x - bb.min.x
                    const height = bb.max.y - bb.min.y
                    const depth = bb.max.z - bb.min.z
                    letters.push({ char, geom, width, height, depth })
                    totalWidth += width + letterSpacing
                }
                totalWidth -= letterSpacing

                // Second pass: position and create physics objects
                let currentX = rowCenterX - totalWidth / 2

                for(const data of letters)
                {
                    // Skip spaces (just advance position)
                    if(data.char === ' ')
                    {
                        currentX += data.width + letterSpacing
                        continue
                    }

                    // Center geometry on X and Z, keep Y at bottom
                    data.geom.translate(-data.width / 2, 0, -data.depth / 2)

                    const mesh = new THREE.Mesh(data.geom, material.clone())
                    const posX = currentX + data.width / 2
                    const posY = 0.01
                    const posZ = rowZ

                    mesh.visible = false

                    // Create physics-enabled object (same system as stone bricks)
                    const object = this.game.objects.add(
                        {
                            model: mesh,
                            updateMaterials: false,
                            castShadow: true,
                            receiveShadow: true,
                        },
                        {
                            type: 'dynamic',
                            position: new THREE.Vector3(posX, posY, posZ),
                            enabled: false,
                            sleeping: true,
                            mass: 2,
                            friction: 0.7,
                            restitution: 0.15,
                            contactThreshold: 5,
                            onCollision: (force, position) =>
                            {
                                this.game.audio.groups.get('hitBrick').playRandomNext(force, position)
                            },
                            colliders: [
                                {
                                    shape: 'cuboid',
                                    parameters: [data.width / 2, data.height / 2, data.depth / 2],
                                    position: new THREE.Vector3(0, data.height / 2, 0),
                                }
                            ]
                        }
                    )

                    this.letterObjects.push({ mesh, object })

                    currentX += data.width + letterSpacing
                }
            }

            createLetterRow('NARESH SEKAR', centerX, centerZ + 1.5)
        })
    }

    /**
     * Called externally (from Reveal step 1) to show the name text
     */
    revealName()
    {
        if(this._nameRevealed) return
        this._nameRevealed = true

        for(let i = 0; i < this.letterObjects.length; i++)
        {
            const entry = this.letterObjects[i]

            // Enable physics body and keep sleeping until hit
            entry.object.physical.body.setEnabled(true)
            entry.object.physical.body.sleep()

            // Show with staggered scale-in animation
            entry.mesh.visible = true
            entry.mesh.scale.setScalar(0)
            gsap.to(entry.mesh.scale, {
                x: 1, y: 1, z: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: 0.2 + i * 0.05
            })
        }
    }

    setKiosk()
    {
        // Interactive point
        const interactivePoint = this.game.interactivePoints.create(
            this.references.items.get('kioskInteractivePoint')[0].position,
            'Map',
            InteractivePoints.ALIGN_RIGHT,
            InteractivePoints.STATE_CONCEALED,
            () =>
            {
                this.game.inputs.interactiveButtons.clearItems()
                this.game.modals.open('map')
                // interactivePoint.hide()
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

        // this.game.map.items.get('map').events.on('close', () =>
        // {
        //     interactivePoint.show()
        // })
    }

    setControls()
    {
        // Interactive point
        const interactivePoint = this.game.interactivePoints.create(
            this.references.items.get('controlsInteractivePoint')[0].position,
            'Controls',
            InteractivePoints.ALIGN_RIGHT,
            InteractivePoints.STATE_CONCEALED,
            () =>
            {
                this.game.inputs.interactiveButtons.clearItems()
                this.game.menu.open('controls')
                interactivePoint.hide()
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

        // Menu instance
        const menuInstance = this.game.menu.items.get('controls')

        menuInstance.events.on('close', () =>
        {
            interactivePoint.show()
        })

        menuInstance.events.on('open', () =>
        {
            if(this.game.inputs.mode === Inputs.MODE_GAMEPAD)
                menuInstance.tabs.goTo('gamepad')
            else if(this.game.inputs.mode === Inputs.MODE_MOUSEKEYBOARD)
                menuInstance.tabs.goTo('mouse-keyboard')
            else if(this.game.inputs.mode === Inputs.MODE_TOUCH)
                menuInstance.tabs.goTo('touch')
        })
    }

    setBonfire()
    {
        const position = this.references.items.get('bonfireHashes')[0].position

        // Particles
        let particles = null
        {
            const emissiveMaterial = this.game.materials.getFromName('emissiveOrangeRadialGradient')
    
            const count = 30
            const elevation = uniform(5)
            const positions = new Float32Array(count * 3)
            const scales = new Float32Array(count)
    
    
            for(let i = 0; i < count; i++)
            {
                const i3 = i * 3
    
                const angle = Math.PI * 2 * Math.random()
                const radius = Math.pow(Math.random(), 1.5) * 1
                positions[i3 + 0] = Math.cos(angle) * radius
                positions[i3 + 1] = Math.random()
                positions[i3 + 2] = Math.sin(angle) * radius
    
                scales[i] = 0.02 + Math.random() * 0.06
            }
            
            const positionAttribute = instancedArray(positions, 'vec3').toAttribute()
            const scaleAttribute = instancedArray(scales, 'float').toAttribute()
    
            const material = new THREE.SpriteNodeMaterial()
            material.outputNode = emissiveMaterial.outputNode
    
            const progress = float(0).toVar()
    
            material.positionNode = Fn(() =>
            {
                const newPosition = positionAttribute.toVar()
                progress.assign(newPosition.y.add(this.localTime.mul(newPosition.y)).fract())
    
                newPosition.y.assign(progress.mul(elevation))
                newPosition.xz.addAssign(this.game.wind.direction.mul(progress))
    
                const progressHide = step(0.8, progress).mul(100)
                newPosition.y.addAssign(progressHide)
                
                return newPosition
            })()
            material.scaleNode = Fn(() =>
            {
                const progressScale = progress.remapClamp(0.5, 1, 1, 0)
                return scaleAttribute.mul(progressScale)
            })()
    
            const geometry = new THREE.CircleGeometry(0.5, 8)
    
            particles = new THREE.Mesh(geometry, material)
            particles.visible = false
            particles.position.copy(position)
            particles.count = count
            this.game.scene.add(particles)
        }

        // Hashes
        {
            const alphaNode = Fn(() =>
            {
                const baseUv = uv(1)
                const distanceToCenter = baseUv.sub(0.5).length()
    
                const voronoi = texture(
                    this.game.noises.voronoi,
                    baseUv
                ).g
    
                voronoi.subAssign(distanceToCenter.remap(0, 0.5, 0.3, 0))
    
                return voronoi
            })()
    
            const material = new MeshDefaultMaterial({
                colorNode: color(0x6F6A87),
                alphaNode: alphaNode,
                hasWater: false,
                hasLightBounce: false
            })
    
            const mesh = this.references.items.get('bonfireHashes')[0]
            mesh.material = material
        }

        // Burn
        const burn = this.references.items.get('bonfireBurn')[0]
        burn.visible = false

        // Interactive point
        this.game.interactivePoints.create(
            this.references.items.get('bonfireInteractivePoint')[0].position,
            'Res(e)t',
            InteractivePoints.ALIGN_RIGHT,
            InteractivePoints.STATE_CONCEALED,
            () =>
            {
                this.game.reset()

                gsap.delayedCall(2, () =>
                {
                    // Bonfire
                    particles.visible = true
                    burn.visible = true
                    this.game.ticker.wait(2, () =>
                    {
                        particles.geometry.boundingSphere.center.y = 2
                        particles.geometry.boundingSphere.radius = 2
                    })

                    // Sound
                    this.game.audio.groups.get('campfire').items[0].positions.push(position)
                })
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

    setAchievement()
    {
        this.events.on('boundingIn', () =>
        {
            this.game.achievements.setProgress('areas', 'landing')
        })
        this.events.on('boundingOut', () =>
        {
            this.game.achievements.setProgress('landingLeave', 1)
        })
    }

    update()
    {
        this.localTime.value += this.game.ticker.deltaScaled * 0.1
    }
}