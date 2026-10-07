import { useAppData } from '../../context/AppDataContext.jsx';

const DAY_NAMES = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  te: ['ఆది', 'సోమ', 'మంగ', 'బుధ', 'గురు', 'శుక్ర', 'శని'],
  hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
};

export default function TaskCalendar({ tasks, view, cursor, onSelectDay }) {
  const { language = 'en' } = useAppData();
  const dayNames = DAY_NAMES[language] || DAY_NAMES.en;
  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  if (view === 'week') {
    const start = new Date(cursor);
    const day = start.getDay();
    start.setDate(start.getDate() - day);
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
    return (
      <div className="calendar-grid">
        {days.map((d) => (
          <DayCell key={d.toISOString()} date={d} tasks={tasks} onSelectDay={onSelectDay} />
        ))}
      </div>
    );
  }

  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startPad; i += 1) {
    const d = new Date(year, month, i - startPad + 1);
    cells.push({ date: d, muted: true });
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({ date: new Date(year, month, d), muted: false });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    const n = new Date(last);
    n.setDate(n.getDate() + 1);
    cells.push({ date: n, muted: true });
  }

  return (
    <div>
      <div className="calendar-grid" style={{ marginBottom: 6 }}>
        {dayNames.map((d) => (
          <strong key={d}>{d}</strong>
        ))}
      </div>
      <div className="calendar-grid">
        {cells.map((cell) => (
          <DayCell key={cell.date.toISOString()} date={cell.date} muted={cell.muted} tasks={tasks} onSelectDay={onSelectDay} />
        ))}
      </div>
    </div>
  );
}

function iso(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function DayCell({ date, muted, tasks, onSelectDay }) {
  const key = iso(date);
  const dayTasks = tasks.filter((t) => t.dueDate === key);
  return (
    <button type="button" className={`cal-cell ${muted ? 'muted' : ''}`} onClick={() => onSelectDay(key)}>
      <div>{date.getDate()}</div>
      {dayTasks.slice(0, 2).map((t) => (
        <div className="task-dot" key={t.id}>
          {t.name}
        </div>
      ))}
    </button>
  );
}
