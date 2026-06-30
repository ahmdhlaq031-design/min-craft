// ====== إعدادات اللعبة ======
const CONFIG = {
    // ====== إعدادات العالم ======
    world: {
        size: 200,
        maxHeight: 128,
        seaLevel: 62,
        renderDistance: 8,
        seed: Math.floor(Math.random() * 999999),
        generateTrees: true,
        generateOres: true,
        generateCaves: true,
        generateStructures: true,
        generateEntities: true,
        saveInterval: 60000, // 1 دقيقة
    },

    // ====== إعدادات اللاعب ======
    player: {
        speed: 4.3,
        jumpPower: 0.5,
        health: 20,
        maxHealth: 20,
        hunger: 20,
        maxHunger: 20,
        reach: 5,
        attackDamage: 1,
        attackCooldown: 0.5,
        regenerationRate: 0.1,
        hungerRate: 0.01,
        sprintMultiplier: 1.3,
        sneakMultiplier: 0.5,
        swimMultiplier: 0.8,
    },

    // ====== إعدادات الشبكة ======
    network: {
        serverUrl: 'wss://minecraft-server.example.com',
        maxPlayers: 8,
        roomCodeLength: 6,
        syncInterval: 100,
        timeout: 5000,
    },

    // ====== إعدادات الرسوم ======
    graphics: {
        renderDistance: 8,
        shadowQuality: 'medium',
        antiAliasing: true,
        vsync: true,
        fpsLimit: 60,
        textureQuality: 'high',
        particles: true,
        clouds: true,
        smoothLighting: true,
        ambientOcclusion: true,
    },

    // ====== إعدادات الصوت ======
    audio: {
        masterVolume: 0.7,
        musicVolume: 0.5,
        soundVolume: 0.8,
        ambientVolume: 0.3,
        voiceVolume: 0.6,
    },

    // ====== إعدادات التحكم ======
    controls: {
        sensitivity: 0.5,
        invertY: false,
        autoJump: false,
        touchControls: true,
        gamepadEnabled: true,
    },

    // ====== إعدادات الكرافت ======
    crafting: {
        enableRecipes: true,
        enableSmelting: true,
        enableEnchanting: true,
        enableBrewing: true,
    },

    // ====== إعدادات المعارك ======
    combat: {
        enablePvP: true,
        enablePvE: true,
        difficulty: 'normal', // peaceful, easy, normal, hard
        keepInventory: false,
        respawnTime: 3,
    },

    // ====== إعدادات الأداء ======
    performance: {
        chunkLoadRadius: 4,
        chunkUnloadRadius: 6,
        entityLimit: 100,
        particleLimit: 500,
        maxFramerate: 60,
        useThreading: true,
    },
};

// ====== حفظ الإعدادات ======
function saveConfig() {
    try {
        localStorage.setItem('minecraft_config', JSON.stringify(CONFIG));
        console.log('💾 تم حفظ الإعدادات!');
    } catch (e) {
        console.warn('فشل حفظ الإعدادات:', e);
    }
}

// ====== تحميل الإعدادات ======
function loadConfig() {
    try {
        const saved = localStorage.getItem('minecraft_config');
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.assign(CONFIG, parsed);
            console.log('✅ تم تحميل الإعدادات!');
            return true;
        }
    } catch (e) {
        console.warn('فشل تحميل الإعدادات:', e);
    }
    return false;
}

// ====== إعادة تعيين الإعدادات ======
function resetConfig() {
    localStorage.removeItem('minecraft_config');
    location.reload();
}