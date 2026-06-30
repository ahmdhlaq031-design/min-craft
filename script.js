// ====== اللعبة الرئيسية ======
let scene, camera, renderer;
let world, player;
let keys = {};
let isPointerLocked = false;
let crosshair;

// ====== تهيئة المشهد ======
function init() {
    // المشهد
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.Fog(0x87CEEB, 50, 100);
    
    // الكاميرا
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 10, 15);
    
    // المُعرض
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('gameCanvas').appendChild(renderer.domElement);
    
    // إضاءة
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(30, 40, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -60;
    sunLight.shadow.camera.right = 60;
    sunLight.shadow.camera.top = 60;
    sunLight.shadow.camera.bottom = -60;
    scene.add(sunLight);
    
    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x3a7d44, 0.6);
    scene.add(hemiLight);
    
    // الصليب في المنتصف
    crosshair = document.getElementById('crosshair');
    
    // ====== إنشاء العالم (مع scene) ======
    world = new World(scene);
    world.generate();
    
    // ====== إنشاء اللاعب ======
    player = new Player();
    player.position = { x: 0, y: 15, z: 0 };
    
    // ====== أحداث ======
    document.addEventListener('keydown', (e) => {
        keys[e.key.toLowerCase()] = true;
        if (e.key === ' ') {
            e.preventDefault();
            player.jump();
        }
        if (e.key === 'e') {
            // فتح المخزون
        }
        if (e.key === 'q') {
            world.save();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.key.toLowerCase()] = false;
    });
    
    renderer.domElement.addEventListener('click', () => {
        renderer.domElement.requestPointerLock();
    });
    
    document.addEventListener('pointerlockchange', () => {
        isPointerLocked = document.pointerLockElement === renderer.domElement;
    });
    
    renderer.domElement.addEventListener('mousemove', (e) => {
        if (!isPointerLocked) return;
        const sensitivity = 0.002;
        player.rotation.yaw -= e.movementX * sensitivity;
        player.rotation.pitch -= e.movementY * sensitivity;
        player.rotation.pitch = Math.max(-0.8, Math.min(0.8, player.rotation.pitch));
    });
    
    renderer.domElement.addEventListener('mousedown', (e) => {
        if (!isPointerLocked) return;
        if (e.button === 0) {
            // وضع بلوك
            placeBlock();
        } else if (e.button === 2) {
            // كسر بلوك
            breakBlock();
        }
    });
    
    renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // ====== بدء الحلقة ======
    animate();
}

// ====== وضع بلوك ======
function placeBlock() {
    const target = getTargetBlock();
    if (!target) return;
    
    const blockType = 'grass'; // يمكن تغييره حسب المخزون
    const nx = target.x + target.normal.x;
    const ny = target.y + target.normal.y;
    const nz = target.z + target.normal.z;
    
    if (world.getBlock(nx, ny, nz) === 'air') {
        world.setBlock(nx, ny, nz, blockType);
    }
}

// ====== كسر بلوك ======
function breakBlock() {
    const target = getTargetBlock();
    if (!target) return;
    
    world.removeBlock(target.x, target.y, target.z);
}

// ====== الحصول على البلوك المستهدف ======
function getTargetBlock() {
    const direction = new THREE.Vector3(
        -Math.sin(player.rotation.yaw) * Math.cos(player.rotation.pitch),
        -Math.sin(player.rotation.pitch),
        -Math.cos(player.rotation.yaw) * Math.cos(player.rotation.pitch)
    );
    
    const origin = new THREE.Vector3(
        player.position.x,
        player.position.y,
        player.position.z
    );
    
    const raycaster = new THREE.Raycaster(origin, direction, 0, player.reach);
    const intersects = raycaster.intersectObjects(Object.values(world.blockMeshes));
    
    if (intersects.length > 0) {
        const hit = intersects[0];
        const mesh = hit.object;
        const pos = mesh.position;
        const normal = hit.face.normal;
        
        return {
            x: Math.round(pos.x - 0.5),
            y: Math.round(pos.y - 0.5),
            z: Math.round(pos.z - 0.5),
            normal: normal
        };
    }
    return null;
}

// ====== حلقة اللعبة ======
function animate() {
    requestAnimationFrame(animate);
    
    // تحديث حركة اللاعب
    updatePlayer();
    
    // تحديث العالم (توليد قطع جديدة)
    world.updateChunks(player.position.x, player.position.z);
    
    // تحديث الكاميرا
    updateCamera();
    
    renderer.render(scene, camera);
}

// ====== تحديث حركة اللاعب ======
function updatePlayer() {
    const speed = keys['shift'] ? 0.2 : 0.1;
    const forward = new THREE.Vector3(
        -Math.sin(player.rotation.yaw),
        0,
        -Math.cos(player.rotation.yaw)
    );
    const right = new THREE.Vector3(
        Math.cos(player.rotation.yaw),
        0,
        -Math.sin(player.rotation.yaw)
    );
    
    if (keys['w']) {
        player.position.x += forward.x * speed;
        player.position.z += forward.z * speed;
    }
    if (keys['s']) {
        player.position.x -= forward.x * speed;
        player.position.z -= forward.z * speed;
    }
    if (keys['a']) {
        player.position.x -= right.x * speed;
        player.position.z -= right.z * speed;
    }
    if (keys['d']) {
        player.position.x += right.x * speed;
        player.position.z += right.z * speed;
    }
}

// ====== تحديث الكاميرا ======
function updateCamera() {
    const euler = new THREE.Euler(
        player.rotation.pitch,
        player.rotation.yaw,
        0,
        'YXZ'
    );
    camera.quaternion.setFromEuler(euler);
    camera.position.set(
        player.position.x,
        player.position.y + 1.6,
        player.position.z
    );
}

// ====== بدء التشغيل ======
init();
