const targetDate = new Date('2026-05-30T00:00:00-03:00');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const pad = (value) => String(value).padStart(2, '0');

const updateCountdown = () => {
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    daysElement.textContent = pad(days);
    hoursElement.textContent = pad(hours);
    minutesElement.textContent = pad(minutes);
    secondsElement.textContent = pad(seconds);
};

updateCountdown();
setInterval(updateCountdown, 1000);
