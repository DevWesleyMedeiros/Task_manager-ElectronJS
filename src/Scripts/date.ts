class CurrentDate {
    private currentTime: HTMLDivElement;
    private currentDay: HTMLDivElement;
    private currentDate: HTMLDivElement;

    constructor() {
        this.initializeClockElements();
        this.startClock();
    }

    private initializeClockElements(): void {
        // Pega os elementos do HTML
        this.currentTime = document.getElementById("clockCurrentTime") as HTMLDivElement;
        this.currentDay = document.getElementById("clockCurrentDay") as HTMLDivElement;
        this.currentDate = document.getElementById("clockCurrentDate") as HTMLDivElement;

        // Atualiza os elementos inicialmente
        this.updateClock();
    }

    // Função que formata hora atual
    private formatTime(date: Date): string {
        const hours: string = date.getHours().toString().padStart(2, '0');
        const minutes: string = date.getMinutes().toString().padStart(2, '0');
        const seconds: string = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    // Função que obtém o nome do dia da semana
    private getCurrentDayOfWeek(): string {
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
    private formatDate(date: Date): string {
        const day: string = date.getDate().toString().padStart(2, '0');
        const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
        const year: string = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }

    // Função que atualiza o relógio
    private updateClock(): void {
        const now = new Date();
        this.currentTime.textContent = this.formatTime(now);
        this.currentDay.textContent = this.getCurrentDayOfWeek();
        this.currentDate.textContent = this.formatDate(now);
    }

    // Função que inicia o relógio
    private startClock(): void {
        // Atualiza a cada segundo
        setInterval(() => this.updateClock(), 1000);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new CurrentDate();
});