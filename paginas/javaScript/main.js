document.addEventListener('DOMContentLoaded', function() {
    const currentMonthElement = document.getElementById('mes');
    const prevButton = document.getElementById('btn_prev');
    const nextButton = document.getElementById('btn_next');
    const daysContainer = document.getElementById('dias');

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function renderCalendar(month, year) {
        currentMonthElement.textContent = `${months[month]} ${year}`;

        daysContainer.innerHTML = '';

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let date = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                if (i === 0 && j < firstDayOfMonth) {
                    cell.classList.add('mes-anterior');
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.textContent = date;
                    if (date === currentDate.getDate() && 
                        month === currentDate.getMonth() && 
                        year === currentDate.getFullYear()) {
                        cell.classList.add('dia-atual');
                    }
                    row.appendChild(cell);
                    date++;
                }
            }

            daysContainer.appendChild(row);
        }
    }

    prevButton.addEventListener('click', function(event) {
        event.preventDefault();
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextButton.addEventListener('click', function(event) {
        event.preventDefault();
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
});
