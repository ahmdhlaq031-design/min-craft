// ====== توليد العالم (تدريجي) مع رسم البلوكات ======
class World {
    constructor(scene) {
        this.scene = scene;
        this.blocks = {};
        this.entities = [];
        this.blockMeshes = {};
        this.seed = Math.floor(Math.random() * 999999);
        this.worldSize = 200;
        this.maxHeight = 128;
        this.seaLevel = 62;
        this.generated = false;
        this.spawnPoint = { x: 0, y: 10, z: 0 };
        this.loadedChunks = new Set();
        this.playerChunkX = 0;
        this.playerChunkZ = 0;
        this.renderDistance = 4;
        this.blockSize = 1;
        this.textureLoader = new THREE.TextureLoader();
    }

    // ====== توليد العالم تدريجياً ======
    generate() {
        console.log('🌍 جاري توليد العالم تدريجياً...');
        this.generated = true;
        this.generateChunksAround(0, 0, 2);
        console.log('✅ تم توليد المنطقة الأولية (3x3 قطع)');
    }

    // ====== توليد قطع حول موقع معين ======
    generateChunksAround(cx, cz, radius = 4) {
        const start = Date.now();
        let count = 0;
        
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dz = -radius; dz <= radius; dz++) {
                const chunkX = cx + dx;
                const chunkZ = cz + dz;
                const key = `${chunkX},${chunkZ}`;
                
                if (!this.loadedChunks.has(key)) {
                    this.generateChunk(chunkX, chunkZ);
                    this.loadedChunks.add(key);
                    count++;
                }
            }
        }
        
        const elapsed = ((Date.now() - start) / 1000).toFixed(2);
        console.log(`✅ تم توليد ${count} قطعة في ${elapsed} ثانية`);
    }

    // ====== توليد قطعة واحدة (16x16) ======
    generateChunk(cx, cz) {
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                const wx = cx * 16 + x;
                const wz = cz * 16 + z;
                const height = this.getHeight(wx, wz);
                
                for (let y = 0; y <= height; y++) {
                    let blockType = 'stone';
                    if (y === height) {
                        blockType = height > this.seaLevel ? 'grass' : 'sand';
                    } else if (y > height - 4) {
                        blockType = 'dirt';
                    }
                    this.setBlock(wx, y, wz, blockType);
                }
            }
        }
        
        // أشجار في هذه القطعة
        if (Math.random() < 0.3) {
            for (let i = 0; i < 3; i++) {
                const x = cx * 16 + Math.floor(Math.random() * 16);
                const z = cz * 16 + Math.floor(Math.random() * 16);
                const height = this.getHeight(x, z);
                if (height > 5 && height < 80) {
                    this.generateTree(x, height + 1, z);
                }
            }
        }
    }

    // ====== رسم البلوك في المشهد ======
    addBlockMesh(x, y, z, blockType) {
        const key = `${x},${y},${z}`;
        if (this.blockMeshes[key]) return;
        
        const color = this.getBlockColor(blockType);
        const geometry = new THREE.BoxGeometry(this.blockSize, this.blockSize, this.blockSize);
        const material = new THREE.MeshLambertMaterial({ color: color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x + 0.5, y + 0.5, z + 0.5);
        
        this.scene.add(mesh);
        this.blockMeshes[key] = mesh;
        return mesh;
    }

    // ====== حذف البلوك من المشهد ======
    removeBlockMesh(x, y, z) {
        const key = `${x},${y},${z}`;
        if (this.blockMeshes[key]) {
            this.scene.remove(this.blockMeshes[key]);
            delete this.blockMeshes[key];
            return true;
        }
        return false;
    }

    // ====== الحصول على لون البلوك ======
    getBlockColor(blockType) {
        const colors = {
            'air': 0x000000,
            'grass': 0x4CAF50,
            'dirt': 0x8D6E63,
            'stone': 0x9E9E9E,
            'cobblestone': 0x8A8A8A,
            'stone_bricks': 0xA0A0A0,
            'oak_log': 0x8B6B4D,
            'oak_planks': 0xD2B48C,
            'leaves': 0x2E7D32,
            'sand': 0xF5DEB3,
            'water': 0x0000FF,
            'lava': 0xFF4500,
            'coal_ore': 0x505050,
            'iron_ore': 0xD2B48C,
            'gold_ore': 0xFFD700,
            'diamond_ore': 0x00FFFF,
            'redstone_ore': 0xFF0000,
            'lapis_ore': 0x4169E1,
            'emerald_ore': 0x00FF7F,
            'netherrack': 0x8B0000,
            'soul_sand': 0x4A2F1A,
            'crafting_table': 0xD2B48C,
            'furnace': 0x8B8B8B,
            'chest': 0xD2B48C,
            'glass': 0xFFFFFF,
            'torch': 0xFFA500,
            'bedrock': 0x404040,
            'spawner': 0x4A4A5A,
            'dragon_egg': 0x2F2F5A,
        };
        return colors[blockType] || 0x808080;
    }

    // ====== إدارة البلوكات (تخزين + رسم) ======
    setBlock(x, y, z, type) {
        const key = `${x},${y},${z}`;
        this.blocks[key] = type;
        this.addBlockMesh(x, y, z, type);
    }

    getBlock(x, y, z) {
        const key = `${x},${y},${z}`;
        return this.blocks[key] || 'air';
    }

    removeBlock(x, y, z) {
        const key = `${x},${y},${z}`;
        if (this.blocks[key]) {
            delete this.blocks[key];
            this.removeBlockMesh(x, y, z);
            return true;
        }
        return false;
    }

    isSolid(x, y, z) {
        const block = this.getBlock(x, y, z);
        return block !== 'air' && block !== 'water' && block !== 'lava';
    }

    // ====== حساب ارتفاع التضاريس ======
    getHeight(x, z) {
        const h1 = Math.sin(x * 0.02) * Math.cos(z * 0.025) * 8;
        const h2 = Math.sin(x * 0.04 + z * 0.03) * 4;
        const h3 = Math.sin(x * 0.01) * Math.sin(z * 0.01) * 10;
        let height = h1 + h2 + h3 + this.seaLevel;
        
        const mountainX = Math.sin(this.seed) * 60;
        const mountainZ = Math.cos(this.seed) * 60;
        const dist = Math.sqrt((x - mountainX) ** 2 + (z - mountainZ) ** 2);
        if (dist < 30) {
            height += (30 - dist) * 0.8;
        }
        
        return Math.max(1, Math.min(Math.round(height), this.maxHeight));
    }

    // ====== توليد شجرة ======
    generateTree(x, y, z) {
        const height = 4 + Math.floor(Math.random() * 3);
        for (let i = 0; i < height; i++) {
            this.setBlock(x, y + i, z, 'oak_log');
        }
        for (let dx = -2; dx <= 2; dx++) {
            for (let dz = -2; dz <= 2; dz++) {
                for (let dy = height - 1; dy <= height + 1; dy++) {
                    if (Math.abs(dx) === 2 && Math.abs(dz) === 2 && dy === height + 1) continue;
                    if (Math.abs(dx) === 2 && Math.abs(dz) === 2 && dy === height) continue;
                    this.setBlock(x + dx, y + dy, z + dz, 'leaves');
                }
            }
        }
    }

    // ====== تحديث القطع عند حركة اللاعب ======
    updateChunks(playerX, playerZ) {
        const chunkX = Math.floor(playerX / 16);
        const chunkZ = Math.floor(playerZ / 16);
        
        if (chunkX !== this.playerChunkX || chunkZ !== this.playerChunkZ) {
            this.playerChunkX = chunkX;
            this.playerChunkZ = chunkZ;
            this.generateChunksAround(chunkX, chunkZ, this.renderDistance);
            this.unloadFarChunks(chunkX, chunkZ, this.renderDistance + 2);
        }
    }

    // ====== إزالة القطع البعيدة ======
    unloadFarChunks(cx, cz, radius) {
        const toRemove = [];
        for (const key of this.loadedChunks) {
            const [chunkX, chunkZ] = key.split(',').map(Number);
            const dx = chunkX - cx;
            const dz = chunkZ - cz;
            if (dx * dx + dz * dz > radius * radius) {
                toRemove.push(key);
            }
        }
        
        for (const key of toRemove) {
            this.loadedChunks.delete(key);
            const [chunkX, chunkZ] = key.split(',').map(Number);
            for (let x = 0; x < 16; x++) {
                for (let z = 0; z < 16; z++) {
                    for (let y = 0; y < this.maxHeight; y++) {
                        const wx = chunkX * 16 + x;
                        const wz = chunkZ * 16 + z;
                        const blockKey = `${wx},${y},${wz}`;
                        if (this.blocks[blockKey]) {
                            delete this.blocks[blockKey];
                            this.removeBlockMesh(wx, y, wz);
                        }
                    }
                }
            }
        }
    }

    // ====== حفظ وتحميل العالم ======
    save() {
        const data = {
            blocks: this.blocks,
            entities: this.entities,
            seed: this.seed,
            spawnPoint: this.spawnPoint
        };
        localStorage.setItem('minecraft_world', JSON.stringify(data));
        console.log('💾 تم حفظ العالم!');
    }

    load() {
        const data = localStorage.getItem('minecraft_world');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                this.blocks = parsed.blocks || {};
                this.entities = parsed.entities || [];
                this.seed = parsed.seed || 0;
                this.spawnPoint = parsed.spawnPoint || { x: 0, y: 10, z: 0 };
                this.generated = true;
                
                // إعادة رسم البلوكات
                for (const key in this.blocks) {
                    const [x, y, z] = key.split(',').map(Number);
                    const blockType = this.blocks[key];
                    this.addBlockMesh(x, y, z, blockType);
                }
                
                console.log('✅ تم تحميل العالم!');
                return true;
            } catch (e) {
                console.error('❌ فشل تحميل العالم:', e);
                return false;
            }
        }
        return false;
    }
}
