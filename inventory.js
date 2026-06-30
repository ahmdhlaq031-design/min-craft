// ====== نظام المخزون ======
class Inventory {
    constructor() {
        this.slots = [];
        this.selectedSlot = 0;
        this.isOpen = false;
        this.size = 36; // 9x4
        this.hotbarSize = 9;
    }

    // ====== تهيئة المخزون ======
    init() {
        this.slots = [];
        for (let i = 0; i < this.size; i++) {
            this.slots.push(null);
        }
        // إضافة بعض العناصر الابتدائية
        this.addItem('stone', 64);
        this.addItem('dirt', 64);
        this.addItem('grass', 64);
        this.addItem('oak_log', 64);
        this.addItem('cobblestone', 64);
        this.addItem('oak_planks', 64);
        this.addItem('wooden_pickaxe', 1);
        this.addItem('wooden_sword', 1);
    }

    // ====== إضافة عنصر ======
    addItem(itemId, count = 1) {
        if (count <= 0) return false;
        
        // البحث عن كومة موجودة
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] && this.slots[i].id === itemId && this.slots[i].count < 64) {
                const space = 64 - this.slots[i].count;
                const add = Math.min(count, space);
                this.slots[i].count += add;
                count -= add;
                if (count === 0) return true;
            }
        }
        
        // إضافة في خانة فارغة
        if (count > 0) {
            for (let i = 0; i < this.slots.length; i++) {
                if (!this.slots[i]) {
                    this.slots[i] = { id: itemId, count: count };
                    return true;
                }
            }
        }
        
        return false; // المخزون ممتلئ
    }

    // ====== حذف عنصر ======
    removeItem(itemId, count = 1) {
        if (count <= 0) return false;
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] && this.slots[i].id === itemId) {
                const remove = Math.min(count, this.slots[i].count);
                this.slots[i].count -= remove;
                count -= remove;
                if (this.slots[i].count === 0) {
                    this.slots[i] = null;
                }
                if (count === 0) return true;
            }
        }
        return false;
    }

    // ====== التحقق من وجود عنصر ======
    hasItem(itemId, count = 1) {
        let total = 0;
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] && this.slots[i].id === itemId) {
                total += this.slots[i].count;
                if (total >= count) return true;
            }
        }
        return false;
    }

    // ====== الحصول على عدد العناصر ======
    getItemCount(itemId) {
        let total = 0;
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] && this.slots[i].id === itemId) {
                total += this.slots[i].count;
            }
        }
        return total;
    }

    // ====== الحصول على العنصر المحدد ======
    getSelectedItem() {
        return this.slots[this.selectedSlot] || null;
    }

    // ====== تبديل الخانة المحددة ======
    setSelectedSlot(index) {
        if (index >= 0 && index < this.hotbarSize) {
            this.selectedSlot = index;
        }
    }

    // ====== تبديل وضع المخزون ======
    toggle() {
        this.isOpen = !this.isOpen;
        return this.isOpen;
    }

    // ====== عرض المخزون (للتصحيح) ======
    display() {
        console.log('📦 المخزون:');
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i]) {
                console.log(`  ${i}: ${this.slots[i].id} x${this.slots[i].count}`);
            }
        }
    }
}