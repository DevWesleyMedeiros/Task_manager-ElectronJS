"use strict";
class CurrentDate {
    constructor() {
        this.initializeClockElements();
        this.startClock();
    }
    initializeClockElements() {
        // Pega os elementos do HTML
        this.currentTime = document.getElementById("clockCurrentTime");
        this.currentDay = document.getElementById("clockCurrentDay");
        this.currentDate = document.getElementById("clockCurrentDate");
        // Atualiza os elementos inicialmente
        this.updateClock();
    }
    // Função que formata hora atual
    formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
    // Função que obtém o nome do dia da semana
    getCurrentDayOfWeek() {
        const days = [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado'
        ];
        return days[new Date().getDay()];
    }
    // Função que cria data atual
    formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }
    // Função que atualiza o relógio
    updateClock() {
        const now = new Date();
        this.currentTime.textContent = this.formatTime(now);
        this.currentDay.textContent = this.getCurrentDayOfWeek();
        this.currentDate.textContent = this.formatDate(now);
    }
    // Função que inicia o relógio
    startClock() {
        // Atualiza a cada segundo
        setInterval(() => this.updateClock(), 1000);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new CurrentDate();
});
