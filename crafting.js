// ====== نظام الكرافت ======
const CRAFTING_RECIPES = {
    // ====== أدوات خشبية ======
    'wooden_sword': {
        type: 'shaped',
        shape: [' x ', ' x ', ' y '],
        materials: { 'x': 'oak_planks', 'y': 'stick' },
        result: { id: 'wooden_sword', count: 1 }
    },
    'wooden_pickaxe': {
        type: 'shaped',
        shape: ['xxx', ' y ', ' y '],
        materials: { 'x': 'oak_planks', 'y': 'stick' },
        result: { id: 'wooden_pickaxe', count: 1 }
    },
    'wooden_axe': {
        type: 'shaped',
        shape: ['xx ', 'xy ', ' y '],
        materials: { 'x': 'oak_planks', 'y': 'stick' },
        result: { id: 'wooden_axe', count: 1 }
    },
    'wooden_shovel': {
        type: 'shaped',
        shape: [' x ', ' y ', ' y '],
        materials: { 'x': 'oak_planks', 'y': 'stick' },
        result: { id: 'wooden_shovel', count: 1 }
    },
    'wooden_hoe': {
        type: 'shaped',
        shape: ['xx ', ' y ', ' y '],
        materials: { 'x': 'oak_planks', 'y': 'stick' },
        result: { id: 'wooden_hoe', count: 1 }
    },

    // ====== أدوات حجرية ======
    'stone_sword': {
        type: 'shaped',
        shape: [' x ', ' x ', ' y '],
        materials: { 'x': 'cobblestone', 'y': 'stick' },
        result: { id: 'stone_sword', count: 1 }
    },
    'stone_pickaxe': {
        type: 'shaped',
        shape: ['xxx', ' y ', ' y '],
        materials: { 'x': 'cobblestone', 'y': 'stick' },
        result: { id: 'stone_pickaxe', count: 1 }
    },
    'stone_axe': {
        type: 'shaped',
        shape: ['xx ', 'xy ', ' y '],
        materials: { 'x': 'cobblestone', 'y': 'stick' },
        result: { id: 'stone_axe', count: 1 }
    },
    'stone_shovel': {
        type: 'shaped',
        shape: [' x ', ' y ', ' y '],
        materials: { 'x': 'cobblestone', 'y': 'stick' },
        result: { id: 'stone_shovel', count: 1 }
    },
    'stone_hoe': {
        type: 'shaped',
        shape: ['xx ', ' y ', ' y '],
        materials: { 'x': 'cobblestone', 'y': 'stick' },
        result: { id: 'stone_hoe', count: 1 }
    },

    // ====== أدوات حديدية ======
    'iron_sword': {
        type: 'shaped',
        shape: [' x ', ' x ', ' y '],
        materials: { 'x': 'iron_ingot', 'y': 'stick' },
        result: { id: 'iron_sword', count: 1 }
    },
    'iron_pickaxe': {
        type: 'shaped',
        shape: ['xxx', ' y ', ' y '],
        materials: { 'x': 'iron_ingot', 'y': 'stick' },
        result: { id: 'iron_pickaxe', count: 1 }
    },
    'iron_axe': {
        type: 'shaped',
        shape: ['xx ', 'xy ', ' y '],
        materials: { 'x': 'iron_ingot', 'y': 'stick' },
        result: { id: 'iron_axe', count: 1 }
    },
    'iron_shovel': {
        type: 'shaped',
        shape: [' x ', ' y ', ' y '],
        materials: { 'x': 'iron_ingot', 'y': 'stick' },
        result: { id: 'iron_shovel', count: 1 }
    },
    'iron_hoe': {
        type: 'shaped',
        shape: ['xx ', ' y ', ' y '],
        materials: { 'x': 'iron_ingot', 'y': 'stick' },
        result: { id: 'iron_hoe', count: 1 }
    },

    // ====== أدوات ألماس ======
    'diamond_sword': {
        type: 'shaped',
        shape: [' x ', ' x ', ' y '],
        materials: { 'x': 'diamond', 'y': 'stick' },
        result: { id: 'diamond_sword', count: 1 }
    },
    'diamond_pickaxe': {
        type: 'shaped',
        shape: ['xxx', ' y ', ' y '],
        materials: { 'x': 'diamond', 'y': 'stick' },
        result: { id: 'diamond_pickaxe', count: 1 }
    },
    'diamond_axe': {
        type: 'shaped',
        shape: ['xx ', 'xy ', ' y '],
        materials: { 'x': 'diamond', 'y': 'stick' },
        result: { id: 'diamond_axe', count: 1 }
    },
    'diamond_shovel': {
        type: 'shaped',
        shape: [' x ', ' y ', ' y '],
        materials: { 'x': 'diamond', 'y': 'stick' },
        result: { id: 'diamond_shovel', count: 1 }
    },
    'diamond_hoe': {
        type: 'shaped',
        shape: ['xx ', ' y ', ' y '],
        materials: { 'x': 'diamond', 'y': 'stick' },
        result: { id: 'diamond_hoe', count: 1 }
    },

    // ====== دروع ======
    'iron_helmet': {
        type: 'shaped',
        shape: ['xxx', 'x x', '   '],
        materials: { 'x': 'iron_ingot' },
        result: { id: 'iron_helmet', count: 1 }
    },
    'iron_chestplate': {
        type: 'shaped',
        shape: ['x x', 'xxx', 'xxx'],
        materials: { 'x': 'iron_ingot' },
        result: { id: 'iron_chestplate', count: 1 }
    },
    'iron_leggings': {
        type: 'shaped',
        shape: ['xxx', 'x x', 'x x'],
        materials: { 'x': 'iron_ingot' },
        result: { id: 'iron_leggings', count: 1 }
    },
    'iron_boots': {
        type: 'shaped',
        shape: ['x x', 'x x', '   '],
        materials: { 'x': 'iron_ingot' },
        result: { id: 'iron_boots', count: 1 }
    },

    'diamond_helmet': {
        type: 'shaped',
        shape: ['xxx', 'x x', '   '],
        materials: { 'x': 'diamond' },
        result: { id: 'diamond_helmet', count: 1 }
    },
    'diamond_chestplate': {
        type: 'shaped',
        shape: ['x x', 'xxx', 'xxx'],
        materials: { 'x': 'diamond' },
        result: { id: 'diamond_chestplate', count: 1 }
    },
    'diamond_leggings': {
        type: 'shaped',
        shape: ['xxx', 'x x', 'x x'],
        materials: { 'x': 'diamond' },
        result: { id: 'diamond_leggings', count: 1 }
    },
    'diamond_boots': {
        type: 'shaped',
        shape: ['x x', 'x x', '   '],
        materials: { 'x': 'diamond' },
        result: { id: 'diamond_boots', count: 1 }
    },

    // ====== أدوات ======
    'bow': {
        type: 'shaped',
        shape: [' xy', 'x y', ' xy'],
        materials: { 'x': 'stick', 'y': 'string' },
        result: { id: 'bow', count: 1 }
    },
    'shield': {
        type: 'shaped',
        shape: ['x x', 'xxx', 'xxx'],
        materials: { 'x': 'iron_ingot', 'y': 'oak_planks' },
        result: { id: 'shield', count: 1 }
    },

    // ====== أثاث ======
    'crafting_table': {
        type: 'shaped',
        shape: ['xx', 'xx'],
        materials: { 'x': 'oak_planks' },
        result: { id: 'crafting_table', count: 1 }
    },
    'furnace': {
        type: 'shaped',
        shape: ['xxx', 'x x', 'xxx'],
        materials: { 'x': 'cobblestone' },
        result: { id: 'furnace', count: 1 }
    },
    'chest': {
        type: 'shaped',
        shape: ['xxx', 'x x', 'xxx'],
        materials: { 'x': 'oak_planks' },
        result: { id: 'chest', count: 1 }
    },
    'bed': {
        type: 'shaped',
        shape: ['xxx', 'yyy', '   '],
        materials: { 'x': 'oak_planks', 'y': 'wool' },
        result: { id: 'bed', count: 1 }
    },

    // ====== طعام ======
    'bread': {
        type: 'shaped',
        shape: ['   ', 'xxx', '   '],
        materials: { 'x': 'wheat' },
        result: { id: 'bread', count: 1 }
    },
    'cake': {
        type: 'shaped',
        shape: ['xxx', 'yzy', '   '],
        materials: { 'x': 'wheat', 'y': 'sugar', 'z': 'egg' },
        result: { id: 'cake', count: 1 }
    },

    // ====== مواد ======
    'stick': {
        type: 'shaped',
        shape: [' x ', ' x ', '   '],
        materials: { 'x': 'oak_planks' },
        result: { id: 'stick', count: 4 }
    },
    'torch': {
        type: 'shaped',
        shape: [' x ', ' y ', '   '],
        materials: { 'x': 'coal', 'y': 'stick' },
        result: { id: 'torch', count: 4 }
    },
    'soul_torch': {
        type: 'shaped',
        shape: [' x ', ' y ', '   '],
        materials: { 'x': 'soul_sand', 'y': 'stick' },
        result: { id: 'soul_torch', count: 4 }
    },
};

// ====== دوال الكرافت ======
class Crafting {
    constructor(inventory) {
        this.inventory = inventory;
        this.grid = [];
        this.result = null;
        this.isOpen = false;
        this.recipeCache = {};
    }

    // ====== البحث عن وصفة ======
    findRecipe(materials) {
        for (let key in CRAFTING_RECIPES) {
            const recipe = CRAFTING_RECIPES[key];
            if (recipe.type === 'shaped') {
                if (this.matchShaped(recipe, materials)) {
                    return recipe;
                }
            } else if (recipe.type === 'shapeless') {
                if (this.matchShapeless(recipe, materials)) {
                    return recipe;
                }
            }
        }
        return null;
    }

    // ====== مطابقة وصفة مصفوفة ======
    matchShaped(recipe, materials) {
        const shape = recipe.shape;
        const recipeMaterials = recipe.materials;
        
        // حساب عدد الصفوف والأعمدة
        const rows = shape.length;
        const cols = shape[0].length;
        
        // تحويل المواد إلى مصفوفة
        const matArray = [];
        for (let r = 0; r < rows; r++) {
            matArray[r] = [];
            for (let c = 0; c < cols; c++) {
                const key = shape[r][c];
                matArray[r][c] = key !== ' ' ? recipeMaterials[key] : null;
            }
        }
        
        // التحقق من وجود المواد
        for (let key in recipeMaterials) {
            if (!this.inventory.hasItem(recipeMaterials[key], 1)) {
                return false;
            }
        }
        
        return true;
    }

    // ====== تنفيذ الكرافت ======
    craft(recipeId) {
        const recipe = CRAFTING_RECIPES[recipeId];
        if (!recipe) return false;
        
        // التحقق من المواد
        for (let key in recipe.materials) {
            const material = recipe.materials[key];
            if (!this.inventory.hasItem(material, 1)) {
                return false;
            }
        }
        
        // حذف المواد
        for (let key in recipe.materials) {
            this.inventory.removeItem(recipe.materials[key], 1);
        }
        
        // إضافة النتيجة
        const result = recipe.result;
        return this.inventory.addItem(result.id, result.count);
    }

    // ====== تبديل وضع الكرافت ======
    toggle() {
        this.isOpen = !this.isOpen;
        return this.isOpen;
    }
}