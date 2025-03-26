var CurrentDate = /** @class */ (function () {
    function CurrentDate() {
        this.initializeClockElements();
        this.startClock();
    }
    CurrentDate.prototype.initializeClockElements = function () {
        // Pega os elementos do HTML
        this.currentTime = document.getElementById("clockCurrentTime");
        this.currentDay = document.getElementById("clockCurrentDay");
        this.currentDate = document.getElementById("clockCurrentDate");
        // Atualiza os elementos inicialmente
        this.updateClock();
    };
    // Função que formata hora atual
    CurrentDate.prototype.formatTime = function (date) {
        var hours = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2, '0');
        var seconds = date.getSeconds().toString().padStart(2, '0');
        return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
    };
    // Função que obtém o nome do dia da semana
    CurrentDate.prototype.getCurrentDayOfWeek = function () {
        var days = [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado'
        ];
        return days[new Date().getDay()];
    };
    // Função que cria data atual
    CurrentDate.prototype.formatDate = function (date) {
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear().toString();
        return "".concat(day, "/").concat(month, "/").concat(year);
    };
    // Função que atualiza o relógio
    CurrentDate.prototype.updateClock = function () {
        var now = new Date();
        this.currentTime.textContent = this.formatTime(now);
        this.currentDay.textContent = this.getCurrentDayOfWeek();
        this.currentDate.textContent = this.formatDate(now);
    };
    // Função que inicia o relógio
    CurrentDate.prototype.startClock = function () {
        var _this = this;
        // Atualiza a cada segundo
        setInterval(function () { return _this.updateClock(); }, 1000);
    };
    return CurrentDate;
}());
document.addEventListener('DOMContentLoaded', function () {
    new CurrentDate();
});
