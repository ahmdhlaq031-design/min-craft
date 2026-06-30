// ====== 40+ كائن حي ======
const ENTITIES = {
    // أعداء
    'zombie': {
        id: 1, name: 'زومبي', health: 20, speed: 0.5, damage: 3, scale: 0.6, color: '#2E8B57', hostile: true,
        drops: [{ id: 'rotten_flesh', chance: 0.8, count: 1 }]
    },
    'skeleton': {
        id: 2, name: 'هيكل عظمي', health: 20, speed: 0.3, damage: 2, scale: 0.6, color: '#C0C0C0', hostile: true,
        drops: [{ id: 'bone', chance: 0.5, count: 1 }, { id: 'arrow', chance: 0.5, count: 1 }]
    },
    'creeper': {
        id: 3, name: 'زاحف', health: 20, speed: 0.4, damage: 10, scale: 0.6, color: '#00FF00', hostile: true,
        drops: [{ id: 'gunpowder', chance: 0.5, count: 1 }]
    },
    'spider': {
        id: 4, name: 'عنكبوت', health: 16, speed: 0.6, damage: 2, scale: 0.7, color: '#2F2F2F', hostile: true,
        drops: [{ id: 'string', chance: 0.5, count: 1 }, { id: 'spider_eye', chance: 0.3, count: 1 }]
    },
    'witch': {
        id: 5, name: 'ساحرة', health: 26, speed: 0.4, damage: 3, scale: 0.6, color: '#800080', hostile: true,
        drops: [{ id: 'glass_bottle', chance: 0.3, count: 1 }]
    },
    'enderman': {
        id: 6, name: 'إندرمان', health: 40, speed: 0.6, damage: 5, scale: 0.7, color: '#1A1A1A', hostile: true,
        drops: [{ id: 'ender_pearl', chance: 0.5, count: 1 }]
    },
    'blaze': {
        id: 7, name: 'بليز', health: 20, speed: 0.3, damage: 4, scale: 0.6, color: '#FFD700', hostile: true,
        drops: [{ id: 'blaze_rod', chance: 0.5, count: 1 }]
    },
    'ghast': {
        id: 8, name: 'غاست', health: 10, speed: 0.2, damage: 6, scale: 0.8, color: '#F5F5F5', hostile: true,
        drops: [{ id: 'ghast_tear', chance: 0.5, count: 1 }, { id: 'gunpowder', chance: 0.5, count: 1 }]
    },
    'magma_cube': {
        id: 9, name: 'مكعب ماغما', health: 16, speed: 0.3, damage: 4, scale: 0.6, color: '#FF4500', hostile: true,
        drops: [{ id: 'magma_cream', chance: 0.5, count: 1 }]
    },
    'slime': {
        id: 10, name: 'سلايم', health: 10, speed: 0.2, damage: 2, scale: 0.5, color: '#32CD32', hostile: true,
        drops: [{ id: 'slime_ball', chance: 0.5, count: 1 }]
    },
    'phantom': {
        id: 11, name: 'فانتوم', health: 20, speed: 0.5, damage: 3, scale: 0.6, color: '#B0E0E6', hostile: true,
        drops: [{ id: 'phantom_membrane', chance: 0.5, count: 1 }]
    },
    'shulker': {
        id: 12, name: 'شولكر', health: 30, speed: 0, damage: 4, scale: 0.6, color: '#800080', hostile: true,
        drops: [{ id: 'shulker_shell', chance: 0.5, count: 1 }]
    },
    'vex': {
        id: 13, name: 'فيكس', health: 14, speed: 0.5, damage: 2, scale: 0.4, color: '#FF69B4', hostile: true
    },
    'vindicator': {
        id: 14, name: 'فينديكيتور', health: 24, speed: 0.5, damage: 5, scale: 0.6, color: '#8B4513', hostile: true,
        drops: [{ id: 'emerald', chance: 0.3, count: 1 }]
    },
    'evoker': {
        id: 15, name: 'إيفوكر', health: 24, speed: 0.4, damage: 4, scale: 0.6, color: '#8B008B', hostile: true,
        drops: [{ id: 'totem_of_undying', chance: 1, count: 1 }]
    },
    'pillager': {
        id: 16, name: 'بيلاجر', health: 24, speed: 0.5, damage: 4, scale: 0.6, color: '#808080', hostile: true,
        drops: [{ id: 'emerald', chance: 0.3, count: 1 }]
    },
    'ravager': {
        id: 17, name: 'رافاجر', health: 100, speed: 0.3, damage: 7, scale: 1.2, color: '#8B4513', hostile: true
    },
    'wither_skeleton': {
        id: 18, name: 'هيكل عظمي ويذر', health: 20, speed: 0.4, damage: 4, scale: 0.6, color: '#2F2F2F', hostile: true,
        drops: [{ id: 'bone', chance: 0.5, count: 1 }, { id: 'coal', chance: 0.3, count: 1 }]
    },
    'stray': {
        id: 19, name: 'ضال', health: 20, speed: 0.3, damage: 2, scale: 0.6, color: '#87CEEB', hostile: true,
        drops: [{ id: 'bone', chance: 0.5, count: 1 }, { id: 'arrow', chance: 0.5, count: 1 }]
    },
    'husk': {
        id: 20, name: 'هسك', health: 20, speed: 0.4, damage: 3, scale: 0.6, color: '#D2B48C', hostile: true,
        drops: [{ id: 'rotten_flesh', chance: 0.8, count: 1 }]
    },
    'drowned': {
        id: 21, name: 'غريق', health: 20, speed: 0.4, damage: 3, scale: 0.6, color: '#2E8B57', hostile: true,
        drops: [{ id: 'rotten_flesh', chance: 0.8, count: 1 }]
    },
    'zombie_villager': {
        id: 22, name: 'زومبي فلاح', health: 20, speed: 0.4, damage: 3, scale: 0.6, color: '#2E8B57', hostile: true
    },

    // مسالمون
    'cow': {
        id: 50, name: 'بقرة', health: 10, speed: 0.3, damage: 0, scale: 0.8, color: '#8B4513', hostile: false,
        drops: [{ id: 'beef', chance: 0.8, count: 1 }, { id: 'leather', chance: 0.5, count: 1 }]
    },
    'sheep': {
        id: 51, name: 'خروف', health: 8, speed: 0.3, damage: 0, scale: 0.7, color: '#FFFFFF', hostile: false,
        drops: [{ id: 'mutton', chance: 0.8, count: 1 }, { id: 'wool', chance: 0.5, count: 1 }]
    },
    'pig': {
        id: 52, name: 'خنزير', health: 10, speed: 0.3, damage: 0, scale: 0.7, color: '#FF69B4', hostile: false,
        drops: [{ id: 'porkchop', chance: 0.8, count: 1 }]
    },
    'chicken': {
        id: 53, name: 'دجاجة', health: 4, speed: 0.4, damage: 0, scale: 0.5, color: '#F5F5DC', hostile: false,
        drops: [{ id: 'chicken', chance: 0.8, count: 1 }, { id: 'feather', chance: 0.5, count: 1 }]
    },
    'rabbit': {
        id: 54, name: 'أرنب', health: 3, speed: 0.5, damage: 0, scale: 0.4, color: '#D2B48C', hostile: false,
        drops: [{ id: 'rabbit', chance: 0.5, count: 1 }, { id: 'rabbit_hide', chance: 0.5, count: 1 }]
    },
    'fox': {
        id: 55, name: 'ثعلب', health: 10, speed: 0.4, damage: 0, scale: 0.5, color: '#FF8C00', hostile: false
    },
    'wolf': {
        id: 56, name: 'ذئب', health: 8, speed: 0.4, damage: 2, scale: 0.6, color: '#808080', hostile: true,
        drops: [{ id: 'bone', chance: 0.5, count: 1 }]
    },
    'cat': {
        id: 57, name: 'قطة', health: 10, speed: 0.4, damage: 0, scale: 0.5, color: '#FF8C00', hostile: false
    },
    'horse': {
        id: 58, name: 'حصان', health: 15, speed: 0.4, damage: 0, scale: 0.9, color: '#8B4513', hostile: false,
        drops: [{ id: 'leather', chance: 0.5, count: 1 }]
    },
    'donkey': {
        id: 59, name: 'حمار', health: 15, speed: 0.3, damage: 0, scale: 0.9, color: '#808080', hostile: false
    },
    'mule': {
        id: 60, name: 'بغل', health: 15, speed: 0.3, damage: 0, scale: 0.9, color: '#8B4513', hostile: false
    },
    'skeleton_horse': {
        id: 61, name: 'حصان هيكل عظمي', health: 15, speed: 0.4, damage: 0, scale: 0.9, color: '#C0C0C0', hostile: true
    },
    'zombie_horse': {
        id: 62, name: 'حصان زومبي', health: 15, speed: 0.4, damage: 0, scale: 0.9, color: '#2E8B57', hostile: true
    },
    'turtle': {
        id: 63, name: 'سلحفاة', health: 30, speed: 0.1, damage: 0, scale: 0.6, color: '#2E8B57', hostile: false,
        drops: [{ id: 'scute', chance: 0.5, count: 1 }]
    },
    'dolphin': {
        id: 64, name: 'دولفين', health: 10, speed: 0.5, damage: 0, scale: 0.7, color: '#4682B4', hostile: false
    },
    'fish': {
        id: 65, name: 'سمكة', health: 3, speed: 0.3, damage: 0, scale: 0.3, color: '#FFD700', hostile: false,
        drops: [{ id: 'fish', chance: 0.8, count: 1 }]
    },
    'squid': {
        id: 66, name: 'حبار', health: 10, speed: 0.2, damage: 0, scale: 0.6, color: '#1A1A5A', hostile: false,
        drops: [{ id: 'ink_sac', chance: 0.5, count: 1 }]
    },
    'glow_squid': {
        id: 67, name: 'حبار مضيء', health: 10, speed: 0.2, damage: 0, scale: 0.6, color: '#00FFFF', hostile: false,
        drops: [{ id: 'glow_ink_sac', chance: 0.5, count: 1 }]
    },

    // فلاحون
    'villager': {
        id: 80, name: 'فلاح', health: 20, speed: 0.3, damage: 0, scale: 0.6, color: '#D2B48C', hostile: false,
        profession: ['farmer', 'librarian', 'cleric', 'blacksmith', 'butcher', 'toolsmith']
    },
    'wandering_trader': {
        id: 81, name: 'تاجر متجول', health: 20, speed: 0.3, damage: 0, scale: 0.6, color: '#F5F5DC', hostile: false
    },

    // غولم
    'iron_golem': {
        id: 90, name: 'غولم حديدي', health: 100, speed: 0.3, damage: 15, scale: 1.2, color: '#C0C0C0', hostile: false,
        drops: [{ id: 'iron_ingot', chance: 0.5, count: 3 }]
    },
    'snow_golem': {
        id: 91, name: 'غولم ثلجي', health: 4, speed: 0.2, damage: 0, scale: 0.8, color: '#FFFFFF', hostile: false,
        drops: [{ id: 'snowball', chance: 0.5, count: 3 }]
    },
};

// ====== دوال مساعدة للكائنات ======
function getEntity(name) {
    return ENTITIES[name] || null;
}

function getEntityId(name) {
    return ENTITIES[name] ? ENTITIES[name].id : 0;
}

function getEntityName(id) {
    for (let key in ENTITIES) {
        if (ENTITIES[key].id === id) return key;
    }
    return null;
}

function getRandomEntity() {
    const keys = Object.keys(ENTITIES);
    return keys[Math.floor(Math.random() * keys.length)];
}

function getHostileEntities() {
    const result = [];
    for (let key in ENTITIES) {
        if (ENTITIES[key].hostile) result.push(key);
    }
    return result;
}

function getPassiveEntities() {
    const result = [];
    for (let key in ENTITIES) {
        if (!ENTITIES[key].hostile) result.push(key);
    }
    return result;
}