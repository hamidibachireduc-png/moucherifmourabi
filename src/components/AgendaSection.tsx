import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Printer,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { AgendaTask, InstitutionInfo } from '../types';
import { STAFF_ROLES, STAGE_CONFIGS } from '../data/mockData';

interface AgendaSectionProps {
  institution: InstitutionInfo;
  agendaItems: AgendaTask[];
  onUpdateAgenda: (items: AgendaTask[]) => void;
}

const CATEGORY_LABELS: Record<AgendaTask['category'], string> = {
  daily_duty: 'المداومة التربوية اليومية',
  absence_followup: 'متابعة الغيابات واستدعاءات الأولياء',
  canteen_health: 'المطعم المدرسي والصحة المدرسية UDS',
  council_prep: 'التحضير لمجالس الأقسام والتأديب',
  exam_org: 'تنظيم الفروض والامتحانات الرسمية',
};

export const AgendaSection: React.FC<AgendaSectionProps> = ({
  institution,
  agendaItems,
  onUpdateAgenda,
}) => {
  const stageCfg = STAGE_CONFIGS[institution.stage];
  const activeRole =
    STAFF_ROLES[institution.activeRoleId] || STAFF_ROLES[stageCfg.defaultRole];
  const roleDisplayTitle = institution.customRoleTitle || activeRole.title;

  const stageTasks = agendaItems.filter(
    (t) => t.stage === institution.stage || t.stage === 'all'
  );

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] =
    useState<AgendaTask['category']>('daily_duty');
  const [newDueDate, setNewDueDate] = useState('2026-03-10');
  const [newLegalRef, setNewLegalRef] = useState(
    'المرسوم التنفيذي 25-54 والقرار 833'
  );

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const item: AgendaTask = {
      id: `ag-${Date.now()}`,
      stage: institution.stage,
      title: newTitle.trim(),
      category: newCategory,
      dueDate: newDueDate,
      targetRole: roleDisplayTitle,
      legalRef: newLegalRef,
      status: 'in_progress',
    };
    onUpdateAgenda([item, ...agendaItems]);
    setNewTitle('');
  };

  const handleCycleStatus = (id: string) => {
    onUpdateAgenda(
      agendaItems.map((t) => {
        if (t.id !== id) return t;
        const next =
          t.status === 'scheduled'
            ? 'in_progress'
            : t.status === 'in_progress'
            ? 'completed'
            : 'scheduled';
        return { ...t, status: next };
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white text-xs font-bold">
              الرزنامة المهنية والاستحقاقات الدورية ({stageCfg.name})
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1.5">
              <Calendar className="w-6 h-6 text-[#d4af37]" />
              <span>
                مفكرة {roleDisplayTitle} — المهام اليومية والأسبوعية والفصلية
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              تنظيم ومتابعة العمليات الميدانية والإدارية المسندة لموظفي التربية مع إمكانية طباعة المفكرة الرسمية مؤشرة ومعتمدة.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start lg:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة المفكرة الرسمية A4</span>
          </button>
        </div>
      </div>

      {/* نموذج إضافة مهمة جديدة في المفكرة */}
      <form
        onSubmit={handleAddTask}
        className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-3 no-print text-xs"
      >
        <h3 className="font-black text-white text-sm flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#d4af37]" />
          <span>إدراج استحقاق أو مهمة جديدة في مفكرة {roleDisplayTitle}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="عنوان المهمة (مثال: تفقد كراريس الغياب للأفواج المسندة / مرافقة المطعم)..."
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
              required
            />
          </div>
          <div>
            <select
              value={newCategory}
              onChange={(e) =>
                setNewCategory(e.target.value as AgendaTask['category'])
              }
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
            >
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] font-black cursor-pointer shrink-0"
            >
              إضافة
            </button>
          </div>
        </div>
      </form>

      {/* قائمة مهام المفكرة */}
      <div className="space-y-3">
        {stageTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-xl bg-[#081a12] border border-[#d4af37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="text-[#f5d77f] font-bold">
                  {CATEGORY_LABELS[task.category]}
                </span>
                <span>·</span>
                <span className="text-emerald-300 font-semibold">
                  {task.targetRole}
                </span>
                <span>·</span>
                <span className="text-slate-400 tabular-nums">
                  التاريخ: {task.dueDate}
                </span>
              </div>
              <h4 className="text-sm font-black text-white">{task.title}</h4>
              <div className="text-[11px] text-slate-400">
                المرجع القانوني: {task.legalRef}
              </div>
            </div>

            <button
              onClick={() => handleCycleStatus(task.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 ${
                task.status === 'completed'
                  ? 'bg-emerald-900/70 text-emerald-300 border border-emerald-500/50'
                  : task.status === 'in_progress'
                  ? 'bg-amber-900/70 text-amber-300 border border-amber-500/50'
                  : 'bg-slate-800 text-slate-300 border border-slate-600'
              }`}
            >
              {task.status === 'completed' ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>منجزة (انقر للتغيير)</span>
                </>
              ) : task.status === 'in_progress' ? (
                <>
                  <Clock className="w-4 h-4" />
                  <span>قيد التنفيذ</span>
                </>
              ) : (
                <span>مبرمجة</span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
