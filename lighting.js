// ====== دورة نهار وليل ======
class Lighting {
    constructor() {
        this.time = 0; // 0-24000 دورة كاملة
        this.dayLength = 24000;
        this.dayStart = 1000;
        this.dayEnd = 13000;
        this.nightStart = 13000;
        this.nightEnd = 23000;
        this.sunAngle = 0;
        this.moonAngle = 0;
        this.isDay = true;
        this.tickSpeed = 1;
        this.weather = 'clear'; // clear, rain, thunder
        this.rainTimer = 0;
        this.thunderTimer = 0;
    }

    // ====== تحديث الوقت ======
    update() {
        this.time += this.tickSpeed;
        if (this.time >= this.dayLength) {
            this.time -= this.dayLength;
        }
        
        // تحديد وقت النهار والليل
        this.isDay = this.time >= this.dayStart && this.time < this.dayEnd;
        
        // حساب زوايا الشمس والقمر
        const progress = this.time / this.dayLength;
        this.sunAngle = progress * Math.PI * 2;
        this.moonAngle = (progress + 0.5) * Math.PI * 2;
        
        // تحديث الطقس
        this.updateWeather();
    }

    // ====== تحديث الطقس ======
    updateWeather() {
        this.rainTimer++;
        this.thunderTimer++;
        
        if (this.weather === 'clear') {
            if (this.rainTimer > 6000 && Math.random() < 0.001) {
                this.weather = 'rain';
                this.rainTimer = 0;
            }
        } else if (this.weather === 'rain') {
            if (this.rainTimer > 3000 && Math.random() < 0.001) {
                this.weather = 'clear';
                this.rainTimer = 0;
            }
            if (this.thunderTimer > 2000 && Math.random() < 0.01) {
                this.weather = 'thunder';
                this.thunderTimer = 0;
            }
        } else if (this.weather === 'thunder') {
            if (this.thunderTimer > 1000 && Math.random() < 0.001) {
                this.weather = 'rain';
                this.thunderTimer = 0;
            }
        }
    }

    // ====== الحصول على شدة الإضاءة ======
    getLightLevel() {
        if (this.weather === 'thunder') {
            return 7;
        } else if (this.weather === 'rain') {
            return 10;
        } else if (this.isDay) {
            return 15;
        } else {
            return 4;
        }
    }

    // ====== الحصول على لون السماء ======
    getSkyColor() {
        if (this.weather === 'thunder') {
            return '#1A1A2E';
        } else if (this.weather === 'rain') {
            return '#4A4A6E';
        } else if (this.isDay) {
            return '#87CEEB';
        } else {
            return '#0A0A1A';
        }
    }

    // ====== الحصول على لون الضوء ======
    getLightColor() {
        if (this.weather === 'thunder') {
            return '#4A4A5A';
        } else if (this.weather === 'rain') {
            return '#6A6A8A';
        } else if (this.isDay) {
            return '#FFFFFF';
        } else {
            return '#2A2A4A';
        }
    }

    // ====== التحقق من وجود مطر ======
    isRaining() {
        return this.weather === 'rain' || this.weather === 'thunder';
    }

    // ====== التحقق من وجود عاصفة ======
    isThundering() {
        return this.weather === 'thunder';
    }

    // ====== الحصول على وقت النهار ======
    getTimeOfDay() {
        const progress = this.time / this.dayLength;
        return progress;
    }

    // ====== الحصول على وقت النهار كنص ======
    getTimeString() {
        const progress = this.time / this.dayLength;
        const hours = Math.floor(progress * 24);
        const minutes = Math.floor((progress * 24 - hours) * 60);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
}