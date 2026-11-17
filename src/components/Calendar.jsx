// src/components/Calendar/Calendar.jsx

import React from 'react';
import { format } from 'date-fns'; // Для работы с датами
import ruLocale from 'date-fns/locale/ru'; // Русская локаль

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function Calendar({ date }) {
  const year = date.getFullYear();
  const month = date.getMonth(); // Месяцы в JS от 0 до 11!

  // Получаем первую дату месяца
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0); // Последнее число текущего месяца

  // Вычисляем дни для сетки
  let daysInGrid = [];

  // Добавим даты предыдущего месяца слева
  for (
    let i = firstDayOfMonth.getDay() - 1;
    i >= 0;
    i--
  ) {
    daysInGrid.push(new Date(firstDayOfMonth).setDate(-i));
  }

  // Добавим текущий месяц
  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    daysInGrid.push(new Date(year, month, d));
  }

  // Добавим даты следующего месяца справа
  while (daysInGrid.length % 7 !== 0) {
    daysInGrid.push(
      new Date(lastDayOfMonth).setTime(
        lastDayOfMonth.getTime() + 86400000 /* 24 часа */
      )
    );
  }

  return (
    <div className="ui-datepicker">
      {/* Верхняя часть */}
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">
          {format(date, 'cccc', { locale: ruLocale }).toUpperCase()}
        </div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
          <div className="ui-datepicker-material-month">
            {format(date, 'MMMM', { locale: ruLocale }).toUpperCase()}
          </div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>

      {/* Заголовок таблицы */}
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">
            {format(date, 'MMMM', { locale: ruLocale })}
          </span>{' '}
          &nbsp;<span className="ui-datepicker-year">{year}</span>
        </div>
      </div>

      {/* Таблица */}
      <table className="ui-datepicker-calendar">
        <colgroup>
          {weekdays.map((_, idx) => (
            <col key={idx} className={idx > 4 ? 'ui-datepicker-week-end' : ''}></col>
          ))}
        </colgroup>
        <thead>
          <tr>
            {weekdays.map((wd, idx) => (
              <th scope="col" title={wd} key={idx}>
                {wd}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysInGrid.reduce(
            (rows, day, index) => {
              if (index % 7 === 0) rows.push([]);
              rows[Math.floor(index / 7)].push(day);
              return rows;
            },
            []
          ).map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((day, cellIdx) => {
                const isCurrent =
                  day.getFullYear() === year &&
                  day.getMonth() === month &&
                  day.getDate() === date.getDate();

                const isOtherMonth =
                  day.getMonth() !== month || day.getFullYear() !== year;

                return (
                  <td
                    key={`${rowIdx}-${cellIdx}`}
                    className={
                      `${isOtherMonth && 'ui-datepicker-other-month'} ${
                        isCurrent && 'ui-datepicker-today'
                      }`.trim()
                    }
                  >
                    {day.getDate()}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
