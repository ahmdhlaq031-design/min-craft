// ====== توليد العالم ======
class World {
    constructor() {
        this.blocks = {};
        this.entities = [];
        this.chunks = {};
        this.seed = Math.floor(Math.random() * 999999);
        this.worldSize = 200;
        this.maxHeight = 128;
        this.seaLevel = 62;
        this.generated = false;
        this.spawnPoint = { x: 0, y: 10, z: 0 };
    }

    // ====== توليد العالم بالكامل ======
    generate() {
        console.log('🌍 جاري توليد العالم...');
        const start = Date.now();

        // توليد التضاريس
        for (let x = -this.worldSize / 2; x < this.worldSize / 2; x++) {
            for (let z = -this.worldSize / 2; z < this.worldSize / 2; z++) {
                const height = this.getHeight(x, z);
                for (let y = 0; y <= height; y++) {
                    let blockType = 'stone';
                    if (y === height) {
                        blockType = height > this.seaLevel ? 'grass' : 'sand';
                    } else if (y > height - 4) {
                        blockType = 'dirt';
                    }
                    this.setBlock(x, y, z, blockType);
                }
            }
        }

        // توليد الأشجار
        for (let i = 0; i < 50; i++) {
            const x = Math.floor(Math.random() * this.worldSize) - this.worldSize / 2;
            const z = Math.floor(Math.random() * this.worldSize) - this.worldSize / 2;
            const height = this.getHeight(x, z);
            if (height > 5 && height < 80 && Math.random() < 0.3) {
                this.generateTree(x, height + 1, z);
            }
        }

        // توليد الكائنات
        for (let i = 0; i < 30; i++) {
            const x = Math.floor(Math.random() * this.worldSize) - this.worldSize / 2;
            const z = Math.floor(Math.random() * this.worldSize) - this.worldSize / 2;
            const height = this.getHeight(x, z);
            if (height > 0) {
                const entityType = Math.random() < 0.3 ? 
                    ['zombie', 'skeleton', 'creeper', 'spider'][Math.floor(Math.random() * 4)] :
                    ['cow', 'sheep', 'pig', 'chicken'][Math.floor(Math.random() * 4)];
                this.addEntity(entityType, x, height + 1, z);
            }
        }

        this.generated = true;
        const elapsed = ((Date.now() - start) / 1000).toFixed(2);
        console.log(`✅ تم توليد العالم في ${elapsed} ثانية`);
    }

    // ====== حساب ارتفاع التضاريس ======
    getHeight(x, z) {
        // استخدام دالة تضاريس بسيطة
        const h1 = Math.sin(x * 0.02) * Math.cos(z * 0.025) * 8;
        const h2 = Math.sin(x * 0.04 + z * 0.03) * 4;
        const h3 = Math.sin(x * 0.01) * Math.sin(z * 0.01) * 10;
        let height = h1 + h2 + h3 + this.seaLevel;
        
        // جبال عشوائية
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
        // الجذع
        for (let i = 0; i < height; i++) {
            this.setBlock(x, y + i, z, 'oak_log');
        }
        // الأوراق
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

    // ====== إدارة البلوكات ======
    setBlock(x, y, z, type) {
        const key = `${x},${y},${z}`;
        this.blocks[key] = type;
    }

    getBlock(x, y, z) {
        const key = `${x},${y},${z}`;
        return this.blocks[key] || 'air';
    }

    removeBlock(x, y, z) {
        const key = `${x},${y},${z}`;
        if (this.blocks[key]) {
            delete this.blocks[key];
            return true;
        }
        return false;
    }

    isSolid(x, y, z) {
        const block = this.getBlock(x, y, z);
        return isSolid(block);
    }

    // ====== إدارة الكائنات ======
    addEntity(type, x, y, z) {
        const entity = getEntity(type);
        if (!entity) return;
        this.entities.push({
            type: type,
            x: x,
            y: y,
            z: z,
            health: entity.health,
            maxHealth: entity.health,
            speed: entity.speed,
            damage: entity.damage,
            hostile: entity.hostile,
            scale: entity.scale,
            color: entity.color,
            id: Date.now() + Math.random() * 1000,
            state: 'idle',
            target: null,
            attackCooldown: 0,
            deathTime: 0,
            isAlive: true
        });
    }

    removeEntity(id) {
        this.entities = this.entities.filter(e => e.id !== id);
    }

    getEntity(id) {
        return this.entities.find(e => e.id === id);
    }

    getEntitiesInRange(x, y, z, radius) {
        return this.entities.filter(e => {
            const dx = e.x - x;
            const dy = e.y - y;
            const dz = e.z - z;
            return dx * dx + dy * dy + dz * dz < radius * radius;
        });
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