import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  FileText,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Search,
  Ticket,
  Utensils,
} from 'lucide-react';
import {
  AbsenceRecord,
  AbsenceStatus,
  EducationStage,
  InstitutionInfo,
  StudentRecord,
} from '../types';
import {
  CLASS_GROUPS,
  STAFF_ROLES,
  STAGE_CONFIGS,
} from '../data/mockData';

interface AbsencesSectionProps {
  institution: InstitutionInfo;
  activeStage: EducationStage;
  onSelectStage: (stage: EducationStage) => void;
  absences: AbsenceRecord[];
  onUpdateAbsences: (updated: AbsenceRecord[]) => void;
  students: StudentRecord[];
  onOpenDocumentGenerator: (docId: string) => void;
}

const STATUS_LABELS: Record<AbsenceStatus, { label: string; colorClass: string }> = {
  unjustified: {
    label: 'غياب غير مبرر (ينتظر التبرير)',
    colorClass: 'text-rose-400 bg-rose-950/50 border-rose-700/50',
  },
  justified: {
    label: 'غياب مبرر قانوناً (شهادة/حضور الولي)',
    colorClass: 'text-emerald-300 bg-emerald-950/50 border-emerald-700/50',
  },
  late: {
    label: 'تأخر صباحي / عن الحصة',
    colorClass: 'text-amber-300 bg-amber-950/50 border-amber-700/50',
  },
  parent_summoned: {
    label: 'تم إرسال استدعاء الولي (إشعار 1)',
    colorClass: 'text-orange-300 bg-orange-950/50 border-orange-700/50',
  },
  warning_sent: {
    label: 'إنذار وإشعار ثانٍ بالغياب',
    colorClass: 'text-rose-300 bg-rose-950/60 border-rose-600/60',
  },
  pledge_signed: {
    label: 'تم توقيع تعهد كتابي مع الولي',
    colorClass: 'text-blue-300 bg-blue-950/50 border-blue-700/50',
  },
  council_referred: {
    label: 'محال على مجلس القسم / التأديب',
    colorClass: 'text-purple-300 bg-purple-950/50 border-purple-700/50',
  },
  health_uds: {
    label: 'متابعة صحية (وحدة الكشف UDS)',
    colorClass: 'text-teal-300 bg-teal-950/50 border-teal-700/50',
  },
};

export const AbsencesSection: React.FC<AbsencesSectionProps> = ({
  institution,
  activeStage,
  onSelectStage,
  absences,
  onUpdateAbsences,
  students,
  onOpenDocumentGenerator,
}) => {
  const stageCfg = STAGE_CONFIGS[activeStage];
  const activeRole =
    STAFF_ROLES[institution.activeRoleId] || STAFF_ROLES[stageCfg.defaultRole];

  const stageAbsences = absences.filter((a) => a.stage === activeStage);
  const stageStudents = students.filter((s) => s.stage === activeStage);
  const stageClasses = CLASS_GROUPS.filter((c) => c.stage === activeStage);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newStudentId, setNewStudentId] = useState(stageStudents[0]?.id || '');
  const [newPeriod, setNewPeriod] = useState<'morning' | 'afternoon' | 'full_day' | 'hourly'>(
    activeStage === 'primary' ? 'morning' : 'hourly'
  );
  const [newDuration, setNewDuration] = useState<number>(activeStage === 'primary' ? 2.5 : 1);
  const [newStatus, setNewStatus] = useState<AbsenceStatus>('unjustified');
  const [newReason, setNewReason] = useState('');

  const filteredAbsences = stageAbsences.filter((abs) => {
    if (statusFilter !== 'all' && abs.status !== statusFilter) return false;
    if (
      searchQuery.trim() &&
      !abs.personName.includes(searchQuery.trim()) &&
      !abs.classOrRole.includes(searchQuery.trim()) &&
      !abs.reason.includes(searchQuery.trim())
    ) {
      return false;
    }
    return true;
  });

  const handleAddAbsence = (e: React.FormEvent) => {
    e.preventDefault();
    const targetSt = stageStudents.find((s) => s.id === newStudentId) || stageStudents[0];
    if (!targetSt) return;

    const newRecord: AbsenceRecord = {
      id: `abs-${Date.now()}`,
      stage: activeStage,
      type: 'student',
      targetId: targetSt.id,
      personName: targetSt.fullName,
      classOrRole: targetSt.classGroup,
      date: new Date().toISOString().slice(0, 10),
      period: newPeriod,
      durationHours: Number(newDuration) || 1,
      status: newStatus,
      reason:
        newReason.trim() ||
        (activeStage === 'primary'
          ? 'غياب مسجل في الفترة الصباحية/المسائية من طرف المربي المتخصص'
          : 'غياب مسجل في كراس الغيابات اليومي من طرف المشرف/المساعد التربوي'),
      recordedByRole: `${activeRole.shortTitle} (${institution.staffName})`,
      entryTicketIssued: newStatus === 'justified' || newStatus === 'pledge_signed',
      parentNotified: true,
    };

    onUpdateAbsences([newRecord, ...absences]);
    setNewReason('');
  };

  const handleToggleEntryTicket = (id: string) => {
    onUpdateAbsences(
      absences.map((a) =>
        a.id === id ? { ...a, entryTicketIssued: !a.entryTicketIssued } : a
      )
    );
  };

  const handleChangeStatus = (id: string, status: AbsenceStatus) => {
    onUpdateAbsences(
      absences.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              entryTicketIssued:
                status === 'justified' || status === 'pledge_signed'
                  ? true
                  : a.entryTicketIssued,
            }
          : a
      )
    );
  };

  const canteenPresentCount = stageStudents.filter((s) => s.canteenBeneficiary || s.halfBoard).length;

  return (
    <div className="space-y-6">
      {/* ترويسة ركن متابعة الغيابات والانضباط */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white font-bold">
                الركن المحوري لسلك موظفي التربية ({stageCfg.name})
              </span>
              <span className="text-[#d4af37] font-semibold">
                القرار 833 (المواظبة) · القرار 171 (النظام الداخلي) · المرسوم 25-54
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-[#d4af37]" />
              <span>
                {activeStage === 'primary'
                  ? 'سجل مواظبة التلاميذ بالفترات، المطعم المدرسي، والصحة المدرسية (للمربي المتخصص)'
                  : 'سجل متابعة غيابات التلاميذ، كراريس الغياب، وبطاقات السماح بالدخول (للمشرف والمساعد التربوي)'}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              {activeStage === 'primary'
                ? 'خاص بالمربي المتخصص في المدارس الابتدائية: تسجيل الغيابات بالفترات (صباحاً/مساءً)، ضبط التعداد الفعلي للمطعم المدرسي، ومرافقة التلاميذ لوحدة الكشف UDS.'
                : 'خاص بالمشرف التربوي والمساعد التربوي في المتوسط والثانوي: تفريغ كراريس الغياب بالساعة، تسليم بطاقات السماح بالدخول، وإصدار استدعاءات الأولياء ومحاضر التعهد.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {(['primary', 'middle', 'secondary'] as EducationStage[]).map((st) => (
              <button
                key={st}
                onClick={() => onSelectStage(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  activeStage === st
                    ? 'bg-[#d4af37] text-[#071710] font-black'
                    : 'bg-[#06150e] text-slate-300 border border-[#d4af37]/30'
                }`}
              >
                {STAGE_CONFIGS[st].name}
              </button>
            ))}
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة السجل اليومي</span>
            </button>
          </div>
        </div>
      </div>

      {/* مؤشرات المواظبة والإطعام */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 no-print">
        <div className="p-4 rounded-xl bg-[#081a12] border border-[#d4af37]/30">
          <div className="text-xs text-slate-400">إجمالي الحالات المسجلة ({stageCfg.shortName})</div>
          <div className="text-2xl font-black text-white mt-1 tabular-nums">
            {stageAbsences.length} سجلات
          </div>
          <div className="text-[11px] text-[#f5d77f] mt-0.5">
            تؤثر آلياً في حساب نقطة المواظبة والسلوك
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#081a12] border border-rose-800/50">
          <div className="text-xs text-slate-400">غيابات غير مبررة / إنذارات</div>
          <div className="text-2xl font-black text-rose-400 mt-1 tabular-nums">
            {
              stageAbsences.filter(
                (a) =>
                  a.status === 'unjustified' ||
                  a.status === 'parent_summoned' ||
                  a.status === 'warning_sent'
              ).length
            }{' '}
            حالات
          </div>
          <div className="text-[11px] text-rose-300 mt-0.5">
            تستوجب حضور الولي لتسليم بطاقة الدخول
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#081a12] border border-emerald-700/50">
          <div className="text-xs text-slate-400">بطاقات السماح بالدخول المسلمة</div>
          <div className="text-2xl font-black text-emerald-400 mt-1 tabular-nums">
            {stageAbsences.filter((a) => a.entryTicketIssued).length} بطاقات
          </div>
          <div className="text-[11px] text-emerald-300 mt-0.5">
            مؤشرة من {activeRole.shortTitle}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#081a12] border border-amber-700/50">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              {activeStage === 'primary'
                ? 'مستفيدو المطعم المدرسي (ابتدائي)'
                : 'تلاميذ النظام نصف الداخلي'}
            </span>
            <Utensils className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 mt-1 tabular-nums">
            {canteenPresentCount} / {stageStudents.length} تلاميذ
          </div>
          <div className="text-[11px] text-slate-300 mt-0.5">
            تحت تأطير {activeRole.shortTitle}
          </div>
        </div>
      </div>

      {/* نموذج تسجيل غياب أو تأخر جديد */}
      <form
        onSubmit={handleAddAbsence}
        className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4 no-print"
      >
        <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
          <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#d4af37]" />
            <span>
              تسجيل غياب أو تأخر جديد في السجل اليومي — ({activeRole.title})
            </span>
          </h3>
          <span className="text-[11px] text-emerald-300 font-bold">
            الأفواج المتاحة: {stageClasses.map((c) => c.name).join(' · ')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              التلميذ(ة) والفوج:
            </label>
            <select
              value={newStudentId}
              onChange={(e) => setNewStudentId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white font-bold"
            >
              {stageStudents.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.fullName} ({st.classGroup})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              طبيعة الفترة الزمنية:
            </label>
            <select
              value={newPeriod}
              onChange={(e) =>
                setNewPeriod(
                  e.target.value as 'morning' | 'afternoon' | 'full_day' | 'hourly'
                )
              }
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
            >
              <option value="morning">الفترة الصباحية (08:00 - 12:00)</option>
              <option value="afternoon">الفترة المسائية (13:30 - 16:30)</option>
              <option value="hourly">حصة ساعية محددة (كراس الغياب)</option>
              <option value="full_day">يوم دراسي كامل</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              عدد الساعات الضائعة:
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="8"
              value={newDuration}
              onChange={(e) => setNewDuration(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              الوضعية الإدارية للغياب:
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as AbsenceStatus)}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
            >
              {Object.entries(STATUS_LABELS).map(([k, val]) => (
                <option key={k} value={k}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] font-black flex items-center justify-center gap-1.5 shadow cursor-pointer hover:brightness-110"
            >
              <Plus className="w-4 h-4" />
              <span>إدراج في السجل اليومي</span>
            </button>
          </div>
        </div>

        <div>
          <input
            type="text"
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            placeholder={
              activeStage === 'primary'
                ? 'ملاحظة المربي المتخصص (مثال: غياب بعد وجبة المطعم / مرافقة لوحدة الكشف UDS / تأخر صباحي)...'
                : 'ملاحظة المشرف أو المساعد التربوي (مثال: غياب في حصة الفيزياء / حضور الولي وتوقيع تعهد / شهادة طبية)...'
            }
            className="w-full px-3.5 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/30 text-white text-xs"
          />
        </div>
      </form>

      {/* شريط التصفية والبحث وجدول المواظبة */}
      <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#06150e] border-b border-[#d4af37]/20 flex flex-col md:flex-row md:items-center justify-between gap-3 no-print">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: `الكل (${stageAbsences.length})` },
              { id: 'unjustified', label: 'غير مبرر' },
              { id: 'parent_summoned', label: 'استدعاء ولي' },
              { id: 'late', label: 'تأخرات' },
              { id: 'justified', label: 'مبرر' },
              { id: 'health_uds', label: 'صحة مدرسية UDS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]/50'
                    : 'bg-[#081a12] text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم التلميذ أو القسم..."
              className="pr-8 pl-3 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white text-xs w-full sm:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#05120c] text-[#f5d77f] border-b border-[#d4af37]/30">
                <th className="py-3 px-4 font-bold">التلميذ(ة) والفوج</th>
                <th className="py-3 px-3 font-bold">التاريخ والفترة</th>
                <th className="py-3 px-3 font-bold">الوضعية والإجراء القانوني</th>
                <th className="py-3 px-3 font-bold">الملاحظة والمؤطر المسجل</th>
                <th className="py-3 px-3 font-bold text-center">بطاقة الدخول</th>
                <th className="py-3 px-4 font-bold text-center no-print">إصدار وثيقة A4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredAbsences.map((abs) => {
                const stInfo = STATUS_LABELS[abs.status];
                return (
                  <tr key={abs.id} className="hover:bg-[#0c261a]/60">
                    <td className="py-3 px-4">
                      <div className="font-black text-white">{abs.personName}</div>
                      <div className="text-[11px] text-[#d4af37] font-bold">
                        القسم: {abs.classOrRole}
                      </div>
                    </td>
                    <td className="py-3 px-3 tabular-nums">
                      <div className="font-bold text-slate-200">{abs.date}</div>
                      <div className="text-[11px] text-slate-400">
                        {abs.period === 'morning'
                          ? 'الفترة الصباحية'
                          : abs.period === 'afternoon'
                          ? 'الفترة المسائية'
                          : abs.period === 'hourly'
                          ? 'حصة ساعية'
                          : 'يوم كامل'}{' '}
                        ({abs.durationHours} س)
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={abs.status}
                        onChange={(e) =>
                          handleChangeStatus(abs.id, e.target.value as AbsenceStatus)
                        }
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold ${stInfo.colorClass}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([k, val]) => (
                          <option key={k} value={k} className="bg-[#071710] text-white">
                            {val.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="text-slate-200 leading-relaxed">{abs.reason}</div>
                      <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                        {abs.recordedByRole}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleToggleEntryTicket(abs.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer ${
                          abs.entryTicketIssued
                            ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600/50'
                            : 'bg-rose-950/60 text-rose-300 border border-rose-700/50'
                        }`}
                      >
                        {abs.entryTicketIssued ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>سُلّمت البطاقة</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>ممنوع قبل التبرير</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center no-print">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onOpenDocumentGenerator('doc-abs-notice-1')}
                          title="طباعة إشعار بالغياب واستدعاء الولي"
                          className="px-2.5 py-1 rounded-lg bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>إشعار ولي</span>
                        </button>
                        <button
                          onClick={() => onOpenDocumentGenerator('doc-entry-ticket')}
                          title="طباعة بطاقة السماح بالدخول للقسم"
                          className="px-2.5 py-1 rounded-lg bg-[#0b2318] hover:bg-[#103824] text-white border border-[#d4af37]/30 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Ticket className="w-3 h-3 text-[#d4af37]" />
                          <span>بطاقة دخول</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
