import { useEffect, useMemo, useState } from 'react';
import TaskForm from './planner/TaskForm.jsx';
import TaskCalendar from './planner/TaskCalendar.jsx';
import WeatherTab from './planner/WeatherTab.jsx';
import SoilForm from './planner/SoilForm.jsx';
import WaterForm from './planner/WaterForm.jsx';
import Button from '../components/Button.jsx';
import Badge from '../components/Badge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import FormField from '../components/FormField.jsx';
import StatCard from '../components/StatCard.jsx';
import EasyModeBanner from '../components/EasyModeBanner.jsx';
import { useAppData } from '../context/AppDataContext.jsx';
import { useToast } from '../components/Toast.jsx';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant.js';
import { validateTask } from '../utils/validation.js';
import { todayISO, uid, formatDate } from '../utils/format.js';

const EMPTY_TASK = {
  name: '',
  crop: '',
  dueDate: todayISO(),
  priority: 'Medium',
  notes: '',
  status: 'pending',
};

export default function FarmPlanner() {
  const {
    tasks,
    setTasks,
    soilRecords,
    setSoilRecords,
    irrigationRecords,
    setIrrigationRecords,
    district,
    setDistrict,
    logActivity,
    selectedCropId,
    language,
    easyMode,
    t,
  } = useAppData();
  const toast = useToast();
  const [tab, setTab] = useState('planner');
  const [form, setForm] = useState(EMPTY_TASK);
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [view, setView] = useState('month');
  const [cursor, setCursor] = useState(() => new Date());
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const { speak, isSpeaking, stopSpeaking } = useVoiceAssistant({ language });

  useEffect(() => {
    document.title =
      language === 'te'
        ? 'రైతు క్యాలెండర్, వాతావరణం & నేల డైరీ — అగ్రిమిత్ర'
        : language === 'hi'
        ? 'खेत प्लानर, मौसम, मिट्टी और पानी डायरी — एग्रीमित्र'
        : 'Farm Planner, Weather & Soil Log — AgriMitra';
  }, [language]);

  const today = todayISO();
  const pendingCount = tasks.filter((task) => task.status !== 'completed' && task.dueDate >= today).length;
  const overdueCount = tasks.filter((task) => task.status !== 'completed' && task.dueDate < today).length;
  const completedCount = tasks.filter((task) => task.status === 'completed').length;

  const TABS = [
    { id: 'planner', label: t('planner.pendingTab'), badge: tasks.length },
    { id: 'weather', label: t('planner.weatherTab') },
    { id: 'soil', label: t('planner.soilTab'), badge: soilRecords.length },
    { id: 'water', label: t('planner.waterTab'), badge: irrigationRecords.length },
  ];

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const overdue = task.status !== 'completed' && task.dueDate < today;
      const status = task.status === 'completed' ? 'completed' : overdue ? 'overdue' : 'pending';
      const stOk = statusFilter === 'All' || statusFilter === status;
      const prOk = priorityFilter === 'All' || task.priority === priorityFilter;
      return stOk && prOk;
    });
  }, [tasks, statusFilter, priorityFilter, today]);

  function change(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submitTask() {
    const next = validateTask(form);
    setErrors(next);
    if (Object.keys(next).length) {
      toast('Please complete the task form with valid details.', 'error');
      return;
    }
    if (editId) {
      setTasks((prev) => prev.map((item) => (item.id === editId ? { ...item, ...form } : item)));
      toast(language === 'te' ? 'పని సవరించబడింది.' : language === 'hi' ? 'कार्य अपडेट किया गया।' : 'Task updated successfully.', 'success');
      setEditId(null);
    } else {
      setTasks((prev) => [{ id: uid('task'), ...form, status: 'pending' }, ...prev]);
      logActivity(`Added farm task: ${form.name}`);
      toast(language === 'te' ? 'క్యాలెండర్‌లో పని జోడించబడింది.' : language === 'hi' ? 'कार्य प्लानर में जोड़ा गया।' : 'Task scheduled in farm calendar.', 'success');
    }
    setForm({ ...EMPTY_TASK, dueDate: todayISO() });
  }

  function statusOf(task) {
    if (task.status === 'completed') return 'completed';
    if (task.dueDate < today) return 'overdue';
    return 'pending';
  }

  function deleteTask() {
    if (!deleteId) return;
    const taskToDelete = tasks.find((item) => item.id === deleteId);
    setTasks((prev) => prev.filter((item) => item.id !== deleteId));
    if (taskToDelete) logActivity(`Removed task: ${taskToDelete.name}`);
    toast('Task removed.', 'info');
    setDeleteId(null);
  }

  function exportTasksCsv() {
    if (tasks.length === 0) {
      toast('No tasks to export.', 'info');
      return;
    }
    const headers = 'Task Name,Crop,Due Date,Priority,Status,Notes';
    const rows = tasks.map((task) =>
      `"${task.name || ''}","${task.crop || ''}","${task.dueDate || ''}","${task.priority || ''}","${task.status || ''}","${(task.notes || '').replace(/"/g, '""')}"`
    );
    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agrimitra-tasks-${today}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // 1-Tap Quick Farm Operation Scheduler for Farmers
  const QUICK_TASKS = [
    { name: language === 'te' ? 'నీరు పెట్టడం (Irrigation)' : language === 'hi' ? 'सिंचाई (Watering)' : 'Field Irrigation', priority: 'High', notes: 'Scheduled irrigation round' },
    { name: language === 'te' ? 'ఎరువులు వేయుట (Fertilizer)' : language === 'hi' ? 'खाद डालना (Fertilizer)' : 'Fertilizer Application', priority: 'Medium', notes: 'Top dressing application' },
    { name: language === 'te' ? 'కలుపు తీయుట (Weeding)' : language === 'hi' ? 'निराई-गुड़ाई (Weeding)' : 'Weeding & Interculture', priority: 'Medium', notes: 'Manual weeding of plot' },
    { name: language === 'te' ? 'సస్యరక్షణ / మందులు పిచికారీ' : language === 'hi' ? 'कीटनाशक स्प्रे (Spray)' : 'Crop Protection Spray', priority: 'High', notes: 'Preventive pest spray' },
  ];

  function addQuickTask(qt) {
    const newTask = {
      id: uid('task'),
      name: qt.name,
      crop: selectedCropId || '',
      dueDate: todayISO(),
      priority: qt.priority,
      notes: qt.notes,
      status: 'pending',
    };
    setTasks((prev) => [newTask, ...prev]);
    logActivity(`Added quick task: ${qt.name}`);
    toast(`${qt.name} added for today!`, 'success');
  }

  function speakTasksSummary() {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const text =
      language === 'te'
        ? `రైతు క్యాలెండర్: మీకు ${pendingCount} మిగిలిన పనులు, ${overdueCount} గడువు దాటిన పనులు మరియు ${completedCount} పూర్తయిన పనులు ఉన్నాయి.`
        : language === 'hi'
        ? `खेत प्लानर: आपके पास ${pendingCount} बाकी काम, ${overdueCount} देरी से चल रहे काम और ${completedCount} पूरे हो चुके काम हैं।`
        : `Farm Planner summary: You have ${pendingCount} pending tasks, ${overdueCount} overdue tasks, and ${completedCount} completed tasks.`;
    speak(text);
  }

  const easySteps = [
    {
      icon: '⚡',
      label: language === 'te' ? '1-క్లిక్ పని నమోదు' : language === 'hi' ? '1-क्लिक काम जोड़ें' : '1-Click Add',
      desc: language === 'te' ? 'నీరు, ఎరువులు, కలుపు' : language === 'hi' ? 'सिंचाई, खाद, निराई' : 'Watering, fertilizer, weeding',
    },
    {
      icon: '📅',
      label: language === 'te' ? 'తేదీ క్యాలెండర్' : language === 'hi' ? 'कैलेंडर तारीख' : 'Calendar View',
      desc: language === 'te' ? 'ఏ రోజు ఏ పని చేయాలో చూడండి' : language === 'hi' ? 'दिन के अनुसार काम' : 'Month & week schedule',
    },
    {
      icon: '✅',
      label: language === 'te' ? 'పూర్తయింది నొక్కండి' : language === 'hi' ? 'पूरा हुआ बटन' : 'Mark Done',
      desc: language === 'te' ? 'పని పూర్తయితే టిక్ చేయండి' : language === 'hi' ? 'काम पूरा करने पर दबाएं' : 'Tracks field operations',
    },
  ];

  return (
    <div className="planner-page">
      {/* Easy Mode Banner */}
      <EasyModeBanner
        title={t('easyModeView.badge')}
        speakText={
          language === 'te'
            ? 'రైతు క్యాలెండర్ మరియు వాతావరణం. ఇక్కడ మీరు మీ రోజువారీ పనులు, నీటి తడులు మరియు భూసార పరీక్ష వివరాలు భద్రపరచవచ్చు.'
            : language === 'hi'
            ? 'खेत प्लानर और मौसम। यहां आप अपने दैनिक काम, सिंचाई और मिट्टी जांच के रिकॉर्ड सुरक्षित रख सकते हैं।'
            : 'Farm Planner and Weather log. Track daily operations, soil test reports, and irrigation schedules.'
        }
        steps={easySteps}
      />

      <div className="section-title">
        <div>
          <h1>{t('planner.title')}</h1>
          <p className="muted">{t('planner.subtitle')}</p>
        </div>
        <Button size="sm" variant="ghost" onClick={speakTasksSummary}>
          🔊 {t('common.readAloud')}
        </Button>
      </div>

      {/* Top Planner Stats */}
      <div className="grid-4" style={{ marginBottom: '1.25rem' }}>
        <StatCard
          label={t('home.pendingTasksStat')}
          value={pendingCount}
          tone="default"
          note={language === 'te' ? 'రాబోయే పనులు' : language === 'hi' ? 'आगामी कार्य' : 'Scheduled ahead'}
        />
        <StatCard
          label={language === 'te' ? 'గడువు దాటినవి' : language === 'hi' ? 'देरी वाले काम' : 'Overdue tasks'}
          value={overdueCount}
          tone={overdueCount > 0 ? 'warn' : 'default'}
          note={language === 'te' ? 'వెంటనే పూర్తి చేయండి' : language === 'hi' ? 'तुरंत ध्यान दें' : 'Requires action'}
        />
        <StatCard
          label={language === 'te' ? 'పూర్తయినవి' : language === 'hi' ? 'पूरे हुए काम' : 'Completed tasks'}
          value={completedCount}
          tone="success"
          note={language === 'te' ? 'పూర్తయిన వ్యవసాయ పనులు' : language === 'hi' ? 'पूरे किए गए कार्य' : 'Finished operations'}
        />
        <StatCard
          label={language === 'te' ? 'నేల & నీటి రికార్డులు' : language === 'hi' ? 'मिट्टी व पानी रिकॉर्ड' : 'Soil & Water logs'}
          value={soilRecords.length + irrigationRecords.length}
          tone="info"
          note={language === 'te' ? 'క్షేత్రస్థాయి పరీక్షల రికార్డు' : language === 'hi' ? 'खेत के रिकॉर्ड' : 'Field tests recorded'}
        />
      </div>

      {/* 1-Tap Quick Task Buttons for Easy Mode / Fast Entry */}
      <div className="card" style={{ marginBottom: '1.25rem', background: 'var(--surface-2)', padding: '0.85rem' }}>
        <strong style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.4rem' }}>
          ⚡ {language === 'te' ? 'త్వరిత పనుల నమోదు (1-ట్యాప్):' : language === 'hi' ? 'तुरंत काम जोड़ें (1-टैप):' : '1-Tap Quick Task Presets:'}
        </strong>
        <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
          {QUICK_TASKS.map((qt, idx) => (
            <Button key={idx} size="sm" variant="secondary" onClick={() => addQuickTask(qt)}>
              + {qt.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="tabs" role="tablist" aria-label="Planner sections" style={{ marginBottom: '1.25rem' }}>
        {TABS.map((tabItem) => (
          <button
            key={tabItem.id}
            type="button"
            role="tab"
            className="tab"
            aria-selected={tab === tabItem.id}
            onClick={() => setTab(tabItem.id)}
          >
            {tabItem.label}
            {tabItem.badge !== undefined && (
              <span style={{ marginLeft: '0.4rem', opacity: 0.8, fontSize: '0.85em' }}>
                ({tabItem.badge})
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'planner' ? (
        <div>
          <div className="grid-2">
            <article className="card paper-card">
              <p className="hand-label">{t('planner.planWeek')}</p>
              <TaskForm
                form={form}
                errors={errors}
                onChange={change}
                onSubmit={submitTask}
                isEdit={Boolean(editId)}
                onCancel={
                  editId
                    ? () => {
                        setEditId(null);
                        setForm({ ...EMPTY_TASK, dueDate: todayISO() });
                      }
                    : undefined
                }
              />
            </article>

            <article className="card">
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h2 style={{ margin: 0 }}>
                  {cursor.toLocaleString(language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="row" style={{ gap: '0.35rem' }}>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const n = new Date(cursor);
                      n.setMonth(n.getMonth() - 1);
                      setCursor(n);
                    }}
                  >
                    {language === 'te' ? 'గత నెల' : language === 'hi' ? 'पिछला' : 'Prev'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const n = new Date(cursor);
                      n.setMonth(n.getMonth() + 1);
                      setCursor(n);
                    }}
                  >
                    {language === 'te' ? 'తదుపరి' : language === 'hi' ? 'अगला' : 'Next'}
                  </Button>
                  <Button
                    variant={view === 'month' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setView('month')}
                  >
                    {language === 'te' ? 'నెల' : language === 'hi' ? 'महीना' : 'Month'}
                  </Button>
                  <Button
                    variant={view === 'week' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setView('week')}
                  >
                    {language === 'te' ? 'వారం' : language === 'hi' ? 'सप्ताह' : 'Week'}
                  </Button>
                </div>
              </div>
              <TaskCalendar
                tasks={tasks}
                view={view}
                cursor={cursor}
                onSelectDay={(iso) => setForm((prev) => ({ ...prev, dueDate: iso }))}
              />
            </article>
          </div>

          {/* Filters & Actions bar */}
          <div className="card" style={{ marginTop: '1.25rem', padding: '1rem' }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div className="row" style={{ gap: '1rem', flex: 1, flexWrap: 'wrap' }}>
                <FormField
                  id="st"
                  label={t('planner.filterStatus')}
                  as="select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">{t('common.all')} ({tasks.length})</option>
                  <option value="pending">{t('common.pending')} ({pendingCount})</option>
                  <option value="overdue">{t('common.overdue')} ({overdueCount})</option>
                  <option value="completed">{t('common.completed')} ({completedCount})</option>
                </FormField>
                <FormField
                  id="pr"
                  label={t('planner.filterPriority')}
                  as="select"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="All">{t('common.all')}</option>
                  <option value="High">{t('common.high')}</option>
                  <option value="Medium">{t('common.medium')}</option>
                  <option value="Low">{t('common.low')}</option>
                </FormField>
              </div>

              <div className="row no-print" style={{ gap: '0.5rem' }}>
                <Button variant="secondary" size="sm" onClick={exportTasksCsv}>
                  {t('common.exportCsv')}
                </Button>
              </div>
            </div>
          </div>

          {/* Task cards list */}
          {filtered.length === 0 ? (
            <EmptyState
              title={t('planner.noTasksFound')}
              text={t('planner.noTasksDesc')}
              actionLabel={language === 'te' ? 'అన్ని పనులు చూడండి' : language === 'hi' ? 'सभी कार्य देखें' : 'Show all tasks'}
              onAction={() => {
                setStatusFilter('All');
                setPriorityFilter('All');
              }}
            />
          ) : (
            <div className="grid-2" style={{ marginTop: '1.25rem' }}>
              {filtered.map((item) => {
                const st = statusOf(item);
                const stLabel =
                  st === 'overdue'
                    ? (language === 'te' ? 'గడువు దాటింది' : language === 'hi' ? 'देरी' : 'OVERDUE')
                    : st === 'completed'
                    ? (language === 'te' ? 'పూర్తయింది' : language === 'hi' ? 'पूरा हुआ' : 'COMPLETED')
                    : (language === 'te' ? 'మిగిలి ఉంది' : language === 'hi' ? 'बाकी' : 'PENDING');
                const prLabel =
                  item.priority === 'High'
                    ? t('common.high')
                    : item.priority === 'Medium'
                    ? t('common.medium')
                    : t('common.low');
                return (
                  <article key={item.id} className="card" style={{ borderLeft: st === 'overdue' ? '4px solid var(--accent-orange)' : st === 'completed' ? '4px solid var(--primary)' : '4px solid var(--border)' }}>
                    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, textDecoration: st === 'completed' ? 'line-through' : 'none' }}>
                        {item.name}
                      </h3>
                      <div className="row" style={{ gap: '0.35rem' }}>
                        <Badge tone={st === 'overdue' ? 'high' : st === 'completed' ? 'low' : 'medium'}>
                          {stLabel}
                        </Badge>
                        <Badge tone={item.priority.toLowerCase()}>{prLabel}</Badge>
                      </div>
                    </div>

                    <p style={{ margin: '0.5rem 0' }}>
                      {item.crop ? <strong>{item.crop}</strong> : <span className="muted">{t('planner.generalOp')}</span>} · {t('common.due')}: {formatDate(item.dueDate)}
                    </p>
                    {item.notes && <p className="muted" style={{ margin: '0.25rem 0 0.75rem', fontSize: '0.9rem' }}>{item.notes}</p>}

                    <div className="row" style={{ marginTop: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {item.status !== 'completed' ? (
                        <Button
                          size="sm"
                          onClick={() => {
                            setTasks((prev) => prev.map((x) => (x.id === item.id ? { ...x, status: 'completed' } : x)));
                            logActivity(`Completed task: ${item.name}`);
                            toast(language === 'te' ? 'పని పూర్తయింది!' : language === 'hi' ? 'कार्य पूरा हुआ!' : 'Task marked complete!', 'success');
                          }}
                        >
                          ✓ {t('common.markDone')}
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setTasks((prev) => prev.map((x) => (x.id === item.id ? { ...x, status: 'pending' } : x)));
                            toast(language === 'te' ? 'పని మిగిలిన వాటిలోకి మార్చబడింది.' : language === 'hi' ? 'कार्य बाकी सूची में भेजा गया।' : 'Task marked as pending.', 'info');
                          }}
                        >
                          {t('common.reopen')}
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setEditId(item.id);
                          setForm(item);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        {t('common.edit')}
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => setDeleteId(item.id)}>
                        {t('common.delete')}
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      ) : null}

      {tab === 'weather' ? <WeatherTab district={district} setDistrict={setDistrict} language={language} /> : null}
      {tab === 'soil' ? (
        <SoilForm records={soilRecords} setRecords={setSoilRecords} logActivity={logActivity} toast={toast} />
      ) : null}
      {tab === 'water' ? (
        <WaterForm records={irrigationRecords} setRecords={setIrrigationRecords} logActivity={logActivity} toast={toast} />
      ) : null}

      {deleteId && (
        <ConfirmDialog
          title={language === 'te' ? 'పనిని తొలగించు' : language === 'hi' ? 'कार्य हटाएं' : 'Delete Farm Task'}
          message={language === 'te' ? 'మీరు ఖచ్చితంగా ఈ షెడ్యూల్ చేసిన పనిని తొలగించాలనుకుంటున్నారా?' : language === 'hi' ? 'क्या आप वाकई इस कार्य को हटाना चाहते हैं?' : 'Are you sure you want to delete this scheduled task? This operation cannot be undone.'}
          confirmLabel={t('common.delete')}
          cancelLabel={t('common.cancel')}
          danger
          onConfirm={deleteTask}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
