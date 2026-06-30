// ====== نظام الأصوات ======
class SoundManager {
    constructor() {
        this.sounds = {};
        this.masterVolume = 1;
        this.musicVolume = 0.5;
        this.soundVolume = 0.7;
        this.isMuted = false;
        this.currentMusic = null;
        this.musicLoaded = false;
    }

    // ====== تحميل الصوت ======
    loadSound(name, url) {
        return new Promise((resolve, reject) => {
            const audio = new Audio(url);
            audio.preload = 'auto';
            audio.onloadeddata = () => {
                this.sounds[name] = audio;
                resolve(audio);
            };
            audio.onerror = () => {
                reject(new Error(`فشل تحميل الصوت: ${name}`));
            };
            audio.load();
        });
    }

    // ====== تشغيل الصوت ======
    playSound(name, volume = 1, loop = false) {
        if (this.isMuted) return;
        const sound = this.sounds[name];
        if (!sound) return;
        
        try {
            const clone = sound.cloneNode();
            clone.volume = this.masterVolume * this.soundVolume * volume;
            clone.loop = loop;
            clone.play().catch(e => console.warn('فشل تشغيل الصوت:', e));
        } catch (e) {
            console.warn('فشل تشغيل الصوت:', e);
        }
    }

    // ====== تشغيل موسيقى ======
    playMusic(name, volume = 0.5, loop = true) {
        if (this.isMuted) return;
        const sound = this.sounds[name];
        if (!sound) return;
        
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
        
        try {
            const clone = sound.cloneNode();
            clone.volume = this.masterVolume * this.musicVolume * volume;
            clone.loop = loop;
            clone.play().catch(e => console.warn('فشل تشغيل الموسيقى:', e));
            this.currentMusic = clone;
        } catch (e) {
            console.warn('فشل تشغيل الموسيقى:', e);
        }
    }

    // ====== إيقاف الموسيقى ======
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
            this.currentMusic = null;
        }
    }

    // ====== كتم الصوت ======
    mute() {
        this.isMuted = true;
        if (this.currentMusic) {
            this.currentMusic.pause();
        }
    }

    // ====== إلغاء الكتم ======
    unmute() {
        this.isMuted = false;
        if (this.currentMusic) {
            this.currentMusic.play().catch(e => console.warn('فشل تشغيل الموسيقى:', e));
        }
    }

    // ====== تغيير مستوى الصوت ======
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        if (this.currentMusic) {
            this.currentMusic.volume = this.masterVolume * this.musicVolume;
        }
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.currentMusic) {
            this.currentMusic.volume = this.masterVolume * this.musicVolume;
        }
    }

    setSoundVolume(volume) {
        this.soundVolume = Math.max(0, Math.min(1, volume));
    }

    // ====== إنشاء أصوات افتراضية ======
    createDefaultSounds() {
        // أصوات اللاعب
        this.sounds['step'] = this.createBeepSound(200, 0.05);
        this.sounds['jump'] = this.createBeepSound(300, 0.1);
        this.sounds['break'] = this.createBeepSound(100, 0.1);
        this.sounds['place'] = this.createBeepSound(400, 0.1);
        this.sounds['damage'] = this.createBeepSound(150, 0.2);
        this.sounds['death'] = this.createBeepSound(80, 0.5);
        this.sounds['eat'] = this.createBeepSound(500, 0.1);
        this.sounds['level_up'] = this.createMelodySound([523, 659, 784]);
        
        // أصوات الكائنات
        this.sounds['zombie'] = this.createBeepSound(100, 0.3);
        this.sounds['skeleton'] = this.createBeepSound(200, 0.2);
        this.sounds['creeper'] = this.createBeepSound(50, 0.5);
        this.sounds['cow'] = this.createBeepSound(300, 0.15);
        this.sounds['sheep'] = this.createBeepSound(400, 0.12);
        this.sounds['pig'] = this.createBeepSound(250, 0.15);
        this.sounds['chicken'] = this.createBeepSound(500, 0.08);
        
        // موسيقى خلفية
        this.sounds['ambient'] = this.createAmbientSound();
        this.sounds['cave'] = this.createAmbientSound(0.3);
        
        this.musicLoaded = true;
    }

    // ====== توليد صوت بسيط ======
    createBeepSound(frequency, duration) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = Math.sin(i * 2 * Math.PI * frequency / audioContext.sampleRate) * 0.5;
        }
        const sound = new Audio();
        sound.src = URL.createObjectURL(new Blob([this.bufferToWav(buffer)], { type: 'audio/wav' }));
        return sound;
    }

    // ====== توليد لحن ======
    createMelodySound(notes) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const duration = 0.15;
        const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration * notes.length, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < notes.length; i++) {
            const start = i * audioContext.sampleRate * duration;
            const end = start + audioContext.sampleRate * duration;
            const freq = notes[i];
            for (let j = start; j < end && j < data.length; j++) {
                data[j] = Math.sin(j * 2 * Math.PI * freq / audioContext.sampleRate) * 0.3;
            }
        }
        const sound = new Audio();
        sound.src = URL.createObjectURL(new Blob([this.bufferToWav(buffer)], { type: 'audio/wav' }));
        return sound;
    }

    // ====== توليد صوت محيطي ======
    createAmbientSound(volume = 0.5) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const duration = 3;
        const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const noise = Math.random() * 2 - 1;
            const envelope = Math.sin(i / data.length * Math.PI) * volume;
            data[i] = noise * envelope * 0.3;
        }
        const sound = new Audio();
        sound.src = URL.createObjectURL(new Blob([this.bufferToWav(buffer)], { type: 'audio/wav' }));
        return sound;
    }

    // ====== تحويل Buffer إلى WAV ======
    bufferToWav(buffer) {
        const numChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const format = 1;
        const bitDepth = 16;
        const bytesPerSample = bitDepth / 8;
        const blockAlign = numChannels * bytesPerSample;
        const dataSize = buffer.length * numChannels * bytesPerSample;
        const headerSize = 44;
        const totalSize = headerSize + dataSize;

        const arrayBuffer = new ArrayBuffer(totalSize);
        const view = new DataView(arrayBuffer);

        // RIFF header
        this.writeString(view, 0, 'RIFF');
        view.setUint32(4, totalSize - 8, true);
        this.writeString(view, 8, 'WAVE');
        this.writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, format, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * blockAlign, true);
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitDepth, true);
        this.writeString(view, 36, 'data');
        view.setUint32(40, dataSize, true);

        // البيانات
        const offset = 44;
        for (let i = 0; i < buffer.length; i++) {
            for (let channel = 0; channel < numChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
                const value = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
                view.setInt16(offset + (i * numChannels + channel) * bytesPerSample, value, true);
            }
        }

        return arrayBuffer;
    }

    writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }
}