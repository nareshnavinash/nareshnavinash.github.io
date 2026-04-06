/**
 * Surgical GLB editor using gltf-transform
 *
 * Removes old BRUNO SIMON letters and old social statues from areas-compressed.glb,
 * then merges in new NARESH SEKAR letters and replacement social logos.
 * Preserves all other objects, materials, userData, and hierarchy.
 */

import { NodeIO, Document } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { draco, prune } from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const STATIC = path.resolve('static/areas');

async function main() {
    const io = new NodeIO()
        .registerExtensions(ALL_EXTENSIONS)
        .registerDependencies({
            'draco3d.decoder': await draco3d.createDecoderModule(),
            'draco3d.encoder': await draco3d.createEncoderModule(),
        });

    // 1. Load the original compressed GLB (all metadata intact)
    console.log('Loading original areas-compressed.glb...');
    const doc = await io.read(path.join(STATIC, 'areas-compressed.glb'));
    const root = doc.getRoot();
    const scene = root.listScenes()[0];

    // 2. Find the 'landing' and 'social' parent nodes
    let landingNode = null;
    let socialNode = null;

    for (const node of scene.listChildren()) {
        if (node.getName() === 'landing') landingNode = node;
        if (node.getName() === 'social') socialNode = node;
    }

    console.log(`Found landing: ${!!landingNode}, social: ${!!socialNode}`);

    // 3. Remove old BRUNO SIMON letter nodes from landing
    const lettersToRemove = [];
    function findLetters(node) {
        if (node.getName().startsWith('refLettersPhysicalDynamic')) {
            lettersToRemove.push(node);
        }
        for (const child of node.listChildren()) {
            findLetters(child);
        }
    }
    if (landingNode) findLetters(landingNode);

    console.log(`Found ${lettersToRemove.length} letter nodes to remove`);
    for (const node of lettersToRemove) {
        console.log(`  Removing: ${node.getName()}`);
        node.dispose();
    }

    // 4. Remove old social statue nodes
    const statuesToRemove = [
        'blueskyPhysicalDynamic', 'youtubePhysicalDynamic', 'twitchPhysicalDynamic', 'discordPhysicalDynamic',
        'mediumPhysicalDynamic', 'npmPhysicalDynamic', 'pypiPhysicalDynamic', 'contactPhysicalDynamic'
    ];
    function findStatues(node) {
        const results = [];
        const name = node.getName().toLowerCase();
        for (const target of statuesToRemove) {
            if (name.startsWith(target.toLowerCase())) {
                results.push(node);
            }
        }
        for (const child of node.listChildren()) {
            results.push(...findStatues(child));
        }
        return results;
    }

    if (socialNode) {
        const found = findStatues(socialNode);
        console.log(`Found ${found.length} statue nodes to remove`);
        for (const node of found) {
            console.log(`  Removing: ${node.getName()}`);
            node.dispose();
        }
    }

    // 5. Find the existing 'palette' material to reuse
    let paletteMaterial = null;
    for (const material of root.listMaterials()) {
        if (material.getName() === 'palette') {
            paletteMaterial = material;
            break;
        }
    }
    console.log(`Found palette material: ${!!paletteMaterial}`);

    // 6. Load new letter meshes from separate GLB
    console.log('Loading naresh-sekar-letters.glb...');
    const lettersDoc = await io.read(path.join(STATIC, 'naresh-sekar-letters.glb'));
    const lettersScene = lettersDoc.getRoot().listScenes()[0];

    // Landing parent position in glTF space (Y-up)
    const landingPos = landingNode.getTranslation();

    // Original BRUNO SIMON letters were spread along a line in local space.
    // Original first letter (.010): local=(0.448, -2.528, 0.447)
    // Original last letter (.019): local=(-10.870, -2.528, 5.725)
    // Line direction in local XZ: from (0.448, 0.447) to (-10.870, 5.725)
    // All at Y = -2.528
    //
    // Our new letters are centered at origin along X axis in glTF space.
    // We need to map each letter's X position onto the same line.

    const origFirst = [0.448, -2.528, 0.447];   // RIGHT side
    const origLast = [-10.870, -2.528, 5.725];  // LEFT side

    // Line direction unit vector
    const lineDX = origLast[0] - origFirst[0];
    const lineDZ = origLast[2] - origFirst[2];
    const lineLen = Math.sqrt(lineDX * lineDX + lineDZ * lineDZ);
    const dirX = lineDX / lineLen;
    const dirZ = lineDZ / lineLen;

    // Collect and sort letter nodes
    const letterNodes = [];
    for (const letterNode of lettersScene.listChildren()) {
        const newNode = copyNodeToDocument(doc, letterNode, paletteMaterial, [0.548, 0.5]);
        const t = newNode.getTranslation();
        letterNodes.push({ node: newNode, x: t[0] });
    }
    letterNodes.sort((a, b) => a.x - b.x);

    const count = letterNodes.length;
    const letterY = origFirst[1];

    // Spacing: 1.5 units between letter centers, 2.0 extra for word gap
    const letterGap = 1.5;
    const wordGap = 2.0;
    const wordBreakAfterIndex = 5; // gap after H

    // Build cumulative offsets
    const offsets = [0];
    for (let i = 1; i < count; i++) {
        let gap = letterGap;
        if (i === wordBreakAfterIndex + 1) gap += wordGap;
        offsets.push(offsets[i - 1] + gap);
    }
    const totalLen = offsets[count - 1];

    // Center text on the midpoint of the original line, shifted left along the line
    const shiftLeft = 2;
    const midX = (origFirst[0] + origLast[0]) / 2 + shiftLeft * dirX;
    const midZ = (origFirst[2] + origLast[2]) / 2 + shiftLeft * dirZ;
    const startX = midX - (totalLen / 2) * dirX;
    const startZ = midZ - (totalLen / 2) * dirZ;

    for (let i = 0; i < count; i++) {
        const { node } = letterNodes[i];
        // Reverse: first letter (N) gets the largest offset (leftmost), last (R) gets 0 (rightmost)
        const reversedOffset = totalLen - offsets[i];
        const localX = startX + reversedOffset * dirX;
        const localZ = startZ + reversedOffset * dirZ;

        node.setTranslation([localX, letterY, localZ]);
        node.setRotation([0, 0.2164, 0, 0.9763]);

        if (landingNode) {
            addCuboidCollider(doc, node);
            landingNode.addChild(node);
            const lt = node.getTranslation();
            console.log(`  Added letter: ${node.getName()} local=(${lt.map(v=>v.toFixed(2)).join(', ')}) [+cuboid collider]`);
        }
    }

    // 7. Load new social logo meshes
    console.log('Loading social-logos.glb...');
    const logosDoc = await io.read(path.join(STATIC, 'social-logos.glb'));
    const logosScene = logosDoc.getRoot().listScenes()[0];

    // Social parent position in glTF space
    const socialPos = socialNode.getTranslation();

    for (const logoNode of logosScene.listChildren()) {
        const newNode = copyNodeToDocument(doc, logoNode, paletteMaterial);

        // Convert from Blender local (which was set relative to social parent in Blender)
        // Blender GLTF export applies Y-up conversion but positions are already local
        // since we set them as local coords in Blender. Keep as-is.
        // Actually: the social logos were created with local coords in Blender
        // (matching the original statue's local positions), so they should be correct.

        if (socialNode) {
            addCuboidCollider(doc, newNode);
            socialNode.addChild(newNode);
            const lt = newNode.getTranslation();
            console.log(`  Added logo: ${newNode.getName()} local=(${lt.map(v=>v.toFixed(2)).join(', ')}) [+cuboid collider]`);
        }
    }

    // 8. Skip prune — it removes reference empties that the code depends on

    // 9. Apply DRACO compression
    console.log('Applying DRACO compression...');
    await doc.transform(draco({ method: 'sequential' }));

    // 10. Write output
    const outputPath = path.join(STATIC, 'areas-compressed.glb');
    console.log(`Writing to ${outputPath}...`);
    await io.write(outputPath, doc);

    // Also write uncompressed version
    const uncompressedDoc = await io.read(outputPath);
    // Remove draco extension for uncompressed
    const outputUncompressed = path.join(STATIC, 'areas.glb');
    // Just copy the same to areas.glb for now
    writeFileSync(outputUncompressed, readFileSync(outputPath));

    console.log('Done!');
}

/**
 * Compute an axis-aligned bounding box from a mesh's POSITION attributes.
 */
function computeBoundingBox(mesh) {
    let min = [Infinity, Infinity, Infinity];
    let max = [-Infinity, -Infinity, -Infinity];

    for (const prim of mesh.listPrimitives()) {
        const posAccessor = prim.getAttribute('POSITION');
        if (!posAccessor) continue;
        const arr = posAccessor.getArray();
        for (let i = 0; i < arr.length; i += 3) {
            min[0] = Math.min(min[0], arr[i]);
            min[1] = Math.min(min[1], arr[i + 1]);
            min[2] = Math.min(min[2], arr[i + 2]);
            max[0] = Math.max(max[0], arr[i]);
            max[1] = Math.max(max[1], arr[i + 1]);
            max[2] = Math.max(max[2], arr[i + 2]);
        }
    }
    return { min, max };
}

/**
 * Add a cuboid collider child node to a PhysicalDynamic node.
 * The cuboid dimensions are derived from the mesh's bounding box.
 * At runtime, Objects.getFromModel() reads scale * 0.5 as half-extents.
 */
function addCuboidCollider(targetDoc, parentNode) {
    const mesh = parentNode.getMesh();
    if (!mesh) return;

    const bbox = computeBoundingBox(mesh);
    if (!isFinite(bbox.min[0])) return; // no geometry

    const sizeX = bbox.max[0] - bbox.min[0];
    const sizeY = bbox.max[1] - bbox.min[1];
    const sizeZ = bbox.max[2] - bbox.min[2];

    const cx = (bbox.max[0] + bbox.min[0]) / 2;
    const cy = (bbox.max[1] + bbox.min[1]) / 2;
    const cz = (bbox.max[2] + bbox.min[2]) / 2;

    const cuboid = targetDoc.createNode('cuboid');
    cuboid.setScale([sizeX, sizeY, sizeZ]);

    // Offset the collider if the mesh isn't centered at the node origin
    if (Math.abs(cx) > 0.001 || Math.abs(cy) > 0.001 || Math.abs(cz) > 0.001) {
        cuboid.setTranslation([cx, cy, cz]);
    }

    parentNode.addChild(cuboid);
}

/**
 * Copy a node (and its mesh/geometry) from one Document into another.
 * Replaces any material with the target document's palette material.
 */
function copyNodeToDocument(targetDoc, sourceNode, paletteMaterial, paletteUV = [0.421, 0.5]) {
    const root = targetDoc.getRoot();

    // Create new node in target document
    const newNode = targetDoc.createNode(sourceNode.getName());

    // Copy transform
    newNode.setTranslation(sourceNode.getTranslation());
    newNode.setRotation(sourceNode.getRotation());
    newNode.setScale(sourceNode.getScale());

    // Copy extras (userData)
    if (sourceNode.getExtras()) {
        newNode.setExtras(sourceNode.getExtras());
    }

    // Copy mesh if present
    const sourceMesh = sourceNode.getMesh();
    if (sourceMesh) {
        const newMesh = targetDoc.createMesh(sourceMesh.getName());

        for (const prim of sourceMesh.listPrimitives()) {
            const newPrim = targetDoc.createPrimitive();

            // Copy geometry accessors, overriding UVs to match palette
            for (const semantic of prim.listSemantics()) {
                const accessor = prim.getAttribute(semantic);
                if (accessor) {
                    const newAccessor = targetDoc.createAccessor(accessor.getName());
                    newAccessor.setType(accessor.getType());

                    if (semantic === 'TEXCOORD_0') {
                        // Override all UVs to sample the correct palette color
                        const arr = new Float32Array(accessor.getArray().length);
                        for (let i = 0; i < arr.length; i += 2) {
                            arr[i] = paletteUV[0];
                            arr[i + 1] = paletteUV[1];
                        }
                        newAccessor.setArray(arr);
                    } else {
                        newAccessor.setArray(accessor.getArray().slice()); // Deep copy
                    }

                    newPrim.setAttribute(semantic, newAccessor);
                }
            }

            // Copy indices
            const indices = prim.getIndices();
            if (indices) {
                const newIndices = targetDoc.createAccessor(indices.getName());
                newIndices.setType(indices.getType());
                newIndices.setArray(indices.getArray().slice());
                newPrim.setIndices(newIndices);
            }

            // Ensure TEXCOORD_0 exists (create if Blender didn't export one)
            if (!newPrim.getAttribute('TEXCOORD_0')) {
                const posAccessor = newPrim.getAttribute('POSITION');
                if (posAccessor) {
                    const vertCount = posAccessor.getCount();
                    const uvArray = new Float32Array(vertCount * 2);
                    for (let i = 0; i < uvArray.length; i += 2) {
                        uvArray[i] = paletteUV[0];
                        uvArray[i + 1] = paletteUV[1];
                    }
                    const uvAccessor = targetDoc.createAccessor();
                    uvAccessor.setType('VEC2');
                    uvAccessor.setArray(uvArray);
                    newPrim.setAttribute('TEXCOORD_0', uvAccessor);
                }
            }

            // Assign palette material from target document
            if (paletteMaterial) {
                newPrim.setMaterial(paletteMaterial);
            }

            newMesh.addPrimitive(newPrim);
        }

        newNode.setMesh(newMesh);
    }

    // Recursively copy children
    for (const child of sourceNode.listChildren()) {
        const newChild = copyNodeToDocument(targetDoc, child, paletteMaterial, paletteUV);
        newNode.addChild(newChild);
    }

    return newNode;
}

main().catch(console.error);
