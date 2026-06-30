// ====== دوال مساعدة ======
class Utils {
    // ====== توليد رقم عشوائي ======
    static random(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomInt(min, max) {
        return Math.floor(Utils.random(min, max + 1));
    }

    // ====== اختيار عشوائي من مصفوفة ======
    static randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // ====== خلط مصفوفة ======
    static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // ====== مسافة بين نقطتين ======
    static distance(x1, y1, z1, x2, y2, z2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    // ====== تحويل الوقت ======
    static formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    // ====== تحويل الحجم ======
    static formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
        return (bytes / 1073741824).toFixed(1) + ' GB';
    }

    // ====== تحويل اللون ======
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    static rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(c => Math.round(c).toString(16).padStart(2, '0')).join('');
    }

    // ====== توليد لون عشوائي ======
    static randomColor() {
        return Utils.rgbToHex(
            Utils.randomInt(0, 255),
            Utils.randomInt(0, 255),
            Utils.randomInt(0, 255)
        );
    }

    // ====== مزج الألوان ======
    static blendColors(color1, color2, amount = 0.5) {
        const c1 = Utils.hexToRgb(color1);
        const c2 = Utils.hexToRgb(color2);
        const r = c1.r + (c2.r - c1.r) * amount;
        const g = c1.g + (c2.g - c1.g) * amount;
        const b = c1.b + (c2.b - c1.b) * amount;
        return Utils.rgbToHex(r, g, b);
    }

    // ====== تحويل الزوايا ======
    static degToRad(deg) {
        return deg * Math.PI / 180;
    }

    static radToDeg(rad) {
        return rad * 180 / Math.PI;
    }

    // ====== دوال الوقت ======
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ====== تجميد الكائن ======
    static deepFreeze(obj) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach(prop => {
            if (obj[prop] !== null && typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) {
                Utils.deepFreeze(obj[prop]);
            }
        });
        return obj;
    }

    // ====== نسخ عميق ======
    static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    // ====== تحقق من الكائن ======
    static isEmpty(obj) {
        return !obj || Object.keys(obj).length === 0;
    }

    // ====== تحقق من المتصفح ======
    static isMobile() {
        return /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    }

    static isDesktop() {
        return !Utils.isMobile();
    }

    // ====== توليد ID فريد ======
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    // ====== تقريب الرقم ======
    static roundTo(value, decimals = 0) {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }

    // ====== حساب المتوسط ======
    static average(array) {
        if (array.length === 0) return 0;
        return array.reduce((a, b) => a + b, 0) / array.length;
    }

    // ====== الحد الأقصى ======
    static max(array) {
        return Math.max(...array);
    }

    // ====== الحد الأدنى ======
    static min(array) {
        return Math.min(...array);
    }

    // ====== التحقق من القيمة ======
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    // ====== تحويل النص ======
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    static toSlug(str) {
        return str.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // ====== تنسيق التاريخ ======
    static formatDate(date) {
        return new Date(date).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    static formatDateTime(date) {
        return new Date(date).toLocaleString('ar-EG');
    }

    // ====== دوال الأرقام ======
    static padNumber(num, length = 2) {
        return String(num).padStart(length, '0');
    }

    static numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}