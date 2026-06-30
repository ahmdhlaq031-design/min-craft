// ====== نظام اللعب الجماعي ======
class Multiplayer {
    constructor() {
        this.socket = null;
        this.roomId = null;
        this.playerId = null;
        this.players = {};
        this.isConnected = false;
        this.isHost = false;
        this.roomCode = '';
        this.maxPlayers = 8;
        this.playersInRoom = 0;
        this.messages = [];
        this.onPlayerJoin = null;
        this.onPlayerLeave = null;
        this.onMessage = null;
        this.onUpdate = null;
    }

    // ====== إنشاء غرفة ======
    createRoom() {
        this.roomCode = this.generateRoomCode();
        this.isHost = true;
        this.roomId = this.roomCode;
        this.playersInRoom = 1;
        this.isConnected = true;
        this.playerId = 'host_' + Date.now();
        this.players[this.playerId] = {
            name: 'المضيف',
            x: 0,
            y: 10,
            z: 0,
            health: 20,
            color: '#FFD700'
        };
        console.log(`🚀 تم إنشاء الغرفة: ${this.roomCode}`);
        return this.roomCode;
    }

    // ====== الانضمام إلى غرفة ======
    joinRoom(roomCode, playerName = 'لاعب') {
        this.roomCode = roomCode;
        this.isHost = false;
        this.roomId = roomCode;
        this.isConnected = true;
        this.playerId = 'player_' + Date.now();
        this.players[this.playerId] = {
            name: playerName,
            x: 0,
            y: 10,
            z: 0,
            health: 20,
            color: '#00BFFF'
        };
        this.playersInRoom = 2;
        console.log(`🔗 تم الانضمام إلى الغرفة: ${roomCode}`);
        return true;
    }

    // ====== توليد رمز الغرفة ======
    generateRoomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    }

    // ====== إرسال رسالة ======
    sendMessage(message) {
        if (!this.isConnected) return false;
        const msg = {
            id: Date.now(),
            playerId: this.playerId,
            playerName: this.players[this.playerId]?.name || 'مجهول',
            message: message,
            time: new Date().toISOString()
        };
        this.messages.push(msg);
        if (this.onMessage) this.onMessage(msg);
        
        // محاكاة إرسال للآخرين
        if (this.isHost) {
            this.broadcastMessage(msg);
        }
        return true;
    }

    // ====== بث رسالة للجميع (المضيف) ======
    broadcastMessage(message) {
        // محاكاة البث للاعبين الآخرين
        console.log(`📨 بث رسالة: ${message.message}`);
    }

    // ====== تحديث موقع اللاعب ======
    updatePlayerPosition(x, y, z) {
        if (!this.isConnected || !this.players[this.playerId]) return;
        this.players[this.playerId].x = x;
        this.players[this.playerId].y = y;
        this.players[this.playerId].z = z;
        if (this.onUpdate) this.onUpdate(this.players);
        
        // محاكاة إرسال التحديث للآخرين
        if (this.isHost) {
            this.broadcastUpdate();
        }
    }

    // ====== بث تحديث المواقع (المضيف) ======
    broadcastUpdate() {
        // محاكاة بث مواقع جميع اللاعبين
    }

    // ====== إضافة لاعب ======
    addPlayer(playerId, playerData) {
        if (this.players[playerId]) return false;
        this.players[playerId] = playerData;
        this.playersInRoom++;
        if (this.onPlayerJoin) this.onPlayerJoin(playerId, playerData);
        return true;
    }

    // ====== حذف لاعب ======
    removePlayer(playerId) {
        if (!this.players[playerId]) return false;
        delete this.players[playerId];
        this.playersInRoom--;
        if (this.onPlayerLeave) this.onPlayerLeave(playerId);
        return true;
    }

    // ====== الحصول على قائمة اللاعبين ======
    getPlayers() {
        return this.players;
    }

    // ====== الحصول على لاعب ======
    getPlayer(playerId) {
        return this.players[playerId] || null;
    }

    // ====== ترك الغرفة ======
    leaveRoom() {
        this.isConnected = false;
        this.roomId = null;
        this.playerId = null;
        this.players = {};
        this.playersInRoom = 0;
        this.messages = [];
        console.log('🚪 تم ترك الغرفة');
    }

    // ====== الحصول على حالة الغرفة ======
    getRoomStatus() {
        return {
            roomCode: this.roomCode,
            isHost: this.isHost,
            isConnected: this.isConnected,
            playersInRoom: this.playersInRoom,
            maxPlayers: this.maxPlayers,
            playerId: this.playerId,
            players: this.players,
            messages: this.messages
        };
    }
}

// ====== محاكاة خادم للألعاب الجماعية ======
class GameServer {
    constructor() {
        this.rooms = {};
        this.players = {};
        this.maxRooms = 100;
    }

    // ====== إنشاء غرفة ======
    createRoom(hostId, hostName) {
        const roomCode = this.generateRoomCode();
        this.rooms[roomCode] = {
            id: roomCode,
            host: hostId,
            players: { [hostId]: { name: hostName, x: 0, y: 10, z: 0, health: 20 } },
            createdAt: Date.now(),
            gameStarted: false,
            maxPlayers: 8,
            messages: []
        };
        return roomCode;
    }

    // ====== الانضمام إلى غرفة ======
    joinRoom(roomCode, playerId, playerName) {
        const room = this.rooms[roomCode];
        if (!room) return null;
        if (Object.keys(room.players).length >= room.maxPlayers) return null;
        room.players[playerId] = { name: playerName, x: 0, y: 10, z: 0, health: 20 };
        return room;
    }

    // ====== توليد رمز غرفة ======
    generateRoomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    }

    // ====== ترك الغرفة ======
    leaveRoom(roomCode, playerId) {
        const room = this.rooms[roomCode];
        if (!room) return false;
        delete room.players[playerId];
        if (Object.keys(room.players).length === 0) {
            delete this.rooms[roomCode];
        } else if (room.host === playerId) {
            // اختيار مضيف جديد
            const newHost = Object.keys(room.players)[0];
            room.host = newHost;
        }
        return true;
    }

    // ====== إرسال رسالة ======
    sendMessage(roomCode, playerId, message) {
        const room = this.rooms[roomCode];
        if (!room) return false;
        const player = room.players[playerId];
        if (!player) return false;
        room.messages.push({
            playerId: playerId,
            playerName: player.name,
            message: message,
            time: Date.now()
        });
        return true;
    }

    // ====== تحديث موقع اللاعب ======
    updatePlayer(roomCode, playerId, x, y, z) {
        const room = this.rooms[roomCode];
        if (!room) return false;
        const player = room.players[playerId];
        if (!player) return false;
        player.x = x;
        player.y = y;
        player.z = z;
        return true;
    }

    // ====== الحصول على معلومات الغرفة ======
    getRoomInfo(roomCode) {
        const room = this.rooms[roomCode];
        if (!room) return null;
        return {
            id: room.id,
            host: room.host,
            players: room.players,
            playersCount: Object.keys(room.players).length,
            maxPlayers: room.maxPlayers,
            gameStarted: room.gameStarted,
            messages: room.messages.slice(-50) // آخر 50 رسالة
        };
    }

    // ====== بدء اللعبة ======
    startGame(roomCode) {
        const room = this.rooms[roomCode];
        if (!room) return false;
        if (Object.keys(room.players).length < 2) return false;
        room.gameStarted = true;
        return true;
    }
}