// ====== تحكم اللاعب ======
class Player {
    constructor() {
        this.position = { x: 0, y: 10, z: 0 };
        this.rotation = { yaw: 0, pitch: 0 };
        this.health = 20;
        this.maxHealth = 20;
        this.hunger = 20;
        this.maxHunger = 20;
        this.experience = 0;
        this.level = 0;
        this.gamemode = 'survival';
        this.inventory = [];
        this.selectedSlot = 0;
        this.armor = { helmet: null, chestplate: null, leggings: null, boots: null };
        this.isOnGround = false;
        this.isSneaking = false;
        this.isSprinting = false;
        this.attackCooldown = 0;
        this.lastDamage = 0;
        this.deathTime = 0;
        this.isAlive = true;
        this.hungerTimer = 0;
        this.healthTimer = 0;
        this.speed = 4.3;
        this.jumpPower = 0.5;
        this.reach = 5;
        this.breakingProgress = 0;
        this.currentBlock = null;
    }

    // ====== إدارة المخزون ======
    getSelectedItem() {
        return this.inventory[this.selectedSlot] || null;
    }

    addItem(item, count = 1) {
        // البحث عن كومة موجودة
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] && this.inventory[i].id === item && this.inventory[i].count < 64) {
                this.inventory[i].count += count;
                return true;
            }
        }
        // إضافة كومة جديدة
        if (this.inventory.length < 36) {
            this.inventory.push({ id: item, count: count });
            return true;
        }
        return false;
    }

    removeItem(item, count = 1) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] && this.inventory[i].id === item) {
                this.inventory[i].count -= count;
                if (this.inventory[i].count <= 0) {
                    this.inventory.splice(i, 1);
                }
                return true;
            }
        }
        return false;
    }

    hasItem(item, count = 1) {
        let total = 0;
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] && this.inventory[i].id === item) {
                total += this.inventory[i].count;
                if (total >= count) return true;
            }
        }
        return false;
    }

    // ====== إدارة الصحة والجوع ======
    takeDamage(amount) {
        if (!this.isAlive) return;
        this.health -= amount;
        this.lastDamage = Date.now();
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
    }

    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    eat(foodValue) {
        this.hunger = Math.min(this.maxHunger, this.hunger + foodValue);
    }

    updateHunger() {
        if (this.gamemode !== 'survival') return;
        this.hungerTimer++;
        if (this.hungerTimer >= 100) {
            this.hungerTimer = 0;
            this.hunger = Math.max(0, this.hunger - 0.5);
            if (this.hunger === 0) {
                this.takeDamage(0.5);
            } else if (this.hunger > 18 && this.health < this.maxHealth) {
                this.heal(0.5);
            }
        }
    }

    die() {
        this.isAlive = false;
        this.deathTime = Date.now();
        // إسقاط العناصر
        console.log('💀 لقد مت!');
    }

    respawn() {
        this.isAlive = true;
        this.health = this.maxHealth;
        this.hunger = this.maxHunger;
        this.position = { x: 0, y: 20, z: 0 };
        console.log('🔄 تم إعادة الظهور!');
    }

    // ====== الحركة ======
    move(dx, dy, dz) {
        const speed = this.isSprinting ? this.speed * 1.3 : this.isSneaking ? this.speed * 0.5 : this.speed;
        this.position.x += dx * speed;
        this.position.y += dy * speed;
        this.position.z += dz * speed;
    }

    jump() {
        if (this.isOnGround) {
            this.position.y += this.jumpPower;
            this.isOnGround = false;
        }
    }

    // ====== كسر البلوك ======
    breakBlock(world) {
        const block = this.getTargetBlock(world);
        if (!block) return;
        this.breakingProgress += 0.05;
        if (this.breakingProgress >= 1) {
            world.removeBlock(block.x, block.y, block.z);
            this.breakingProgress = 0;
            // إسقاط العنصر
            const blockName = world.getBlock(block.x, block.y, block.z);
            this.addItem(blockName, 1);
        }
    }

    getTargetBlock(world) {
        // محاكاة راي كاستر مبسط
        const dir = this.getDirection();
        for (let d = 0; d < this.reach; d += 0.1) {
            const x = this.position.x + dir.x * d;
            const y = this.position.y + dir.y * d;
            const z = this.position.z + dir.z * d;
            const blockX = Math.floor(x);
            const blockY = Math.floor(y);
            const blockZ = Math.floor(z);
            if (world.isSolid(blockX, blockY, blockZ)) {
                return { x: blockX, y: blockY, z: blockZ };
            }
        }
        return null;
    }

    getDirection() {
        const yawRad = this.rotation.yaw * Math.PI / 180;
        const pitchRad = this.rotation.pitch * Math.PI / 180;
        return {
            x: -Math.sin(yawRad) * Math.cos(pitchRad),
            y: -Math.sin(pitchRad),
            z: -Math.cos(yawRad) * Math.cos(pitchRad)
        };
    }
}