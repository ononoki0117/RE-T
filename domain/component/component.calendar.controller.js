
const getMonthlycalendar = function (year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const weeks = [];
    let week = new Array(7).fill({ day: null });

    for (let day = 1; day <= daysInMonth; day++) {
        week[(firstDayOfMonth + day - 1) % 7] = { day: day };

        if ((firstDayOfMonth + day) % 7 === 0 || day === daysInMonth) {
            weeks.push(week);
            week = new Array(7).fill({ day: null });
        }
    }

    return weeks;
}

const getStringcalendar = function () {

}

const getWeeklycalendar = function () {

}

module.exports = { getMonthlycalendar, getStringcalendar, getWeeklycalendar };