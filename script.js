const calendar = new Date(); // текущая дата и время.
const events = []; //массив событий.

const renderCalendar = () => { // отвечает за отображение календаря.
    calendar.setDate(1); //Устанавливается день месяца в 1 для объекта calendar
    // Получение ссылок на DOM элементы, такие как заголовок месяца, заголовок года и сетку дней:
    const titleMonth = document.querySelector('.month');
    const titleYears = document.querySelector('.years');
    const boardDays = document.querySelector('.days');

    const month = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // Устанавливаем текст для заголовка месяца и года.
    titleMonth.innerHTML = month[calendar.getMonth()];
    const years = calendar.getFullYear(); // текущий год
    titleYears.innerHTML = years;

    const lastDays = new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0).getDate(); //последний день текущего месяца
    const lastDaysGet = new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0).getDay(); // последний день недели

    const firstDays = calendar.getDay(); // день недели первого дня текущего месяца.
    const firstDaysget = new Date(calendar.getFullYear(), calendar.getMonth(), 0).getDate(); // количество дней в предыдущем месяце.
    const nextDays = 7 - lastDaysGet - 1; // количество дней следующего месяца, 

    var days = '';

    // добавление дней предыдущего месяца в календарь
    for (let x = firstDays; x > 0; x--) {
        days += `<div class="prev-date">${firstDaysget - x + 1}</div>`;
    }

    // добавление дней текущего месяца в календарь.
    for (let i = 1; i <= lastDays; i++) {
        if (i === new Date().getDate() && calendar.getMonth() === new Date().getMonth() && calendar.getFullYear() === new Date().getFullYear()) {
            days += `<div class="today" data-date="${i}">${i}</div>`;
        } else {
            days += `<div data-date="${i}">${i}</div>`;
        }
    }

    // добавление дней следующего месяца в календарь:
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
    }

    boardDays.innerHTML = days;

    // Очистить выделение текущего дня в календаре
    const todayCell = document.querySelector('.today');
    if (todayCell != null) {
        todayCell.classList.remove('selected');
    }
};

const monthLeft = document.querySelector('.month-left');
const monthRight = document.querySelector('.month-right');
const yearsLeft = document.querySelector('.years-left');
const yearsRight = document.querySelector('.years-right');

monthLeft.addEventListener('click', () => {
    calendar.setMonth(calendar.getMonth() - 1);
    renderCalendar();
});

monthRight.addEventListener('click', () => {
    calendar.setMonth(calendar.getMonth() + 1);
    renderCalendar();
});

yearsLeft.addEventListener('click', () => {
    calendar.setFullYear(calendar.getFullYear() - 1);
    renderCalendar();
});

yearsRight.addEventListener('click', () => {
    calendar.setFullYear(calendar.getFullYear() + 1);
    renderCalendar();
});

// Обработчик клика по дню календаря
document.querySelector('.days').addEventListener('click', (e) => {
    const dateCell = e.target; // Получаем элемент, на котором был клик.
    if (dateCell.getAttribute('data-date')) {
        const selectedDate = new Date(calendar);
        selectedDate.setDate(parseInt(dateCell.getAttribute('data-date')));

        const event = prompt(`Enter an event for ${selectedDate.toLocaleDateString()}:`); // date в строку
        if (event) { // если пользователь нажал ОК
            addEvent(selectedDate, event);
            dateCell.classList.add('selected');
        }
    }
});

const renderEvents = () => {
    const eventsList = document.querySelector('.events-list');
    eventsList.innerHTML = '';

    // Сортируем события от старых к новым
    events.sort((a, b) => a.date - b.date);

    for (const event of events) {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.innerHTML = `${event.date.toLocaleDateString()} - ${event.event}`;
        eventsList.append(eventElement);
    }
};

const addEvent = (date, event) => {
    events.push({ date, event });
    renderEvents();
};

renderCalendar();
