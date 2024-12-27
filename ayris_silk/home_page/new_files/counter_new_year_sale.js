
function startCountdown(targetDate) {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const daysLabel = document.getElementById('days-label');
    const hoursLabel = document.getElementById('hours-label');
    const minutesLabel = document.getElementById('minutes-label');
    const secondsLabel = document.getElementById('seconds-label');

    function updateCountdown() {
        const now = new Date();
        const moscowTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
        const timeDifference = targetDate - moscowTime;

        if (timeDifference <= 0) {
            clearInterval(interval);
            daysElement.textContent = 0;
            hoursElement.textContent = 0;
            minutesElement.textContent = 0;
            secondsElement.textContent = 0;
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;

        daysLabel.textContent = decline(days, ['день', 'дня', 'дней']);
        hoursLabel.textContent = decline(hours, ['час', 'часа', 'часов']);
        minutesLabel.textContent = decline(minutes, ['минута', 'минуты', 'минут']);
        secondsLabel.textContent = decline(seconds, ['секунда', 'секунды', 'секунд']);
    }

    function decline(number, forms) {
        const n = Math.abs(number) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) return forms[2];
        if (n1 > 1 && n1 < 5) return forms[1];
        if (n1 === 1) return forms[0];
        return forms[2];
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

const targetDate = new Date('2024-12-31T00:00:00+03:00');
startCountdown(targetDate);