import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Printer,
  Trash2,
  ShieldCheck,
} from 'lucide-react';
import {
  DutySlot,
  InstitutionInfo,
  TeacherOrStaffMember,
} from '../types';
import {
  STAFF_ROLES,
  STAGE_CONFIGS,
} from '../data/mockData';

interface TimetableSectionProps {
  institution: InstitutionInfo;
  timetable: DutySlot[];
  staffMembers: TeacherOrStaffMember[];
  onUpdateTimetable: (updated: DutySlot[]) => void;
}

export const TimetableSection: React.FC<TimetableSectionProps> = ({
  institution,
  timetable,
  staffMembers,
  onUpdateTimetable,
}) => {
  const stageCfg = STAGE_CONFIGS[institution.stage];
  const activeRole =
    STAFF_ROLES[institution.activeRoleId] || STAFF_ROLES[stageCfg.defaultRole];

  const stageSlots = timetable.filter((t) => t.stage === institution.stage);
  const stageStaff = staffMembers.filter((s) => s.stage === institution.stage);

  const [day, setDay] = useState('الأحد');
  const [period, setPeriod] = useState('08:00 - 10:00');
  const [zone, setZone] = useState(
    institution.stage === 'primary'
      ? 'الساحة والمطعم المدرسي'
      : 'الجناح التربوي (أ) + مكتب الغيابات'
  );
  const [assignedStaff, setAssignedStaff] = useState(
    stageStaff[0]?.name || institution.staffName
  );
  const [taskDescription, setTaskDescription] = useState('');
  const [classGroup, setClassGroup] = useState('جميع الأفواج المسندة');

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: DutySlot = {
      id: `dt-${Date.now()}`,
      stage: institution.stage,
      day,
      period,
      zone,
      assignedStaff,
      roleTitle: activeRole.shortTitle,
      taskDescription:
        taskDescription.trim() ||
        (institution.stage === 'primary'
          ? 'مرافقة التلاميذ في الساحة والمطعم ومتابعة مواظبة الفترات'
          : 'مراقبة حركة التلاميذ في الجناح، جمع كراريس الغياب، وتسليم بطاقات الدخول'),
      classGroup,
    };
    onUpdateTimetable([...timetable, newSlot]);
    setTaskDescription('');
  };

  const handleDeleteSlot = (id: string) => {
    onUpdateTimetable(timetable.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* ترويسة جداول التوقيت والمداومة التربوية */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs mb-1.5">
              <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white font-bold">
                التنظيم الأسبوعي للمداومة التربوية وتوزيع الأجنحة ({stageCfg.name})
              </span>
              <span className="text-[#d4af37] font-semibold">
                الحجم الساعي القانوني لـ {activeRole.shortTitle}: {activeRole.weeklyHours} ساعة/أسبوع
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-[#d4af37]" />
              <span>
                {institution.stage === 'primary'
                  ? 'جدول التوقيت الأسبوعي للمربي المتخصص (البوابة · الساحة · المطعم · النشاط الثقافي)'
                  : 'جدول المداومة التربوية وتوزيع الأجنحة والمخابر (المشرف التربوي · المساعد التربوي)'}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              يضبط هذا الجدول توزيع المهام اليومية والأجنحة البيداغوجية وقاعات المذاكرة والمطعم المدرسي بين موظفي التربية وفق المرسوم التنفيذي 25-54.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start lg:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة جدول المداومة الرسمي A4</span>
          </button>
        </div>
      </div>

      {/* نموذج إضافة فترة مداومة جديدة */}
      <form
        onSubmit={handleAddSlot}
        className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4 no-print"
      >
        <h3 className="text-sm font-black text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#d4af37]" />
          <span>إضافة فترة مداومة / تأطير جناح في الجدول الأسبوعي</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">اليوم:</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
            >
              {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">الفترة الزمنية:</label>
            <input
              type="text"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">الجناح / المرفق:</label>
            <input
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">المؤطر المكلف:</label>
            <input
              type="text"
              value={assignedStaff}
              onChange={(e) => setAssignedStaff(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] font-black flex items-center justify-center gap-1.5 shadow cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة للجدول</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">الأفواج المعنية:</label>
            <input
              type="text"
              value={classGroup}
              onChange={(e) => setClassGroup(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-300 mb-1">المهمة التربوية والإدارية:</label>
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="مثال: مراقبة دخول التلاميذ وجمع كراريس الغياب وتأطير قاعة المداومة..."
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
            />
          </div>
        </div>
      </form>

      {/* جدول المداومة الأسبوعي */}
      <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#06150e] border-b border-[#d4af37]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-sm sm:text-base font-black text-white">
              جدول توزيع المهام والمداومة التربوية المعتمد — {institution.schoolName}
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-300 tabular-nums">
            إجمالي الفترات: {stageSlots.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#05120c] text-[#f5d77f] border-b border-[#d4af37]/30">
                <th className="py-3 px-4 font-bold">اليوم والتوقيت</th>
                <th className="py-3 px-3 font-bold">الجناح / المرفق</th>
                <th className="py-3 px-3 font-bold">الموظف المكلف والرتبة</th>
                <th className="py-3 px-3 font-bold">الأفواج المعنية</th>
                <th className="py-3 px-3 font-bold">المهام المسندة</th>
                <th className="py-3 px-3 font-bold text-center no-print">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {stageSlots.map((slot) => (
                <tr key={slot.id} className="hover:bg-[#0c261a]/60">
                  <td className="py-3 px-4">
                    <div className="font-black text-white">{slot.day}</div>
                    <div className="text-[11px] text-[#f5d77f] font-mono tabular-nums">
                      {slot.period}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-bold text-emerald-300">
                    {slot.zone}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-white">{slot.assignedStaff}</div>
                    <div className="text-[11px] text-[#d4af37]">{slot.roleTitle}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-semibold">
                    {slot.classGroup}
                  </td>
                  <td className="py-3 px-3 text-slate-200 max-w-xs leading-relaxed">
                    {slot.taskDescription}
                  </td>
                  <td className="py-3 px-3 text-center no-print">
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900 cursor-pointer"
                      title="حذف الفترة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
