import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Award,
  UserCheck,
} from 'lucide-react';
import {
  AbsenceRecord,
  EducationStage,
  InstitutionInfo,
  StudentRecord,
  SubjectConfig,
} from '../types';
import {
  STAGE_CONFIGS,
  calculateStudentResults,
} from '../data/mockData';

interface AnalyticsSectionProps {
  institution: InstitutionInfo;
  activeStage: EducationStage;
  onSelectStage: (stage: EducationStage) => void;
  students: StudentRecord[];
  subjects: SubjectConfig[];
  absences: AbsenceRecord[];
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  institution,
  activeStage,
  onSelectStage,
  students,
  subjects,
  absences,
}) => {
  const stageCfg = STAGE_CONFIGS[activeStage];
  const stageStudents = students.filter((s) => s.stage === activeStage);
  const stageAbsences = absences.filter((a) => a.stage === activeStage);

  const results = calculateStudentResults(
    stageStudents,
    subjects,
    stageAbsences,
    'ministry_standard',
    true,
    activeStage
  );

  const totalMissedHours = results.reduce(
    (acc, r) => acc + r.totalMissedHours,
    0
  );
  const avgAttendanceScore =
    results.length > 0
      ? (
          results.reduce((acc, r) => acc + r.attendanceScore, 0) /
          results.length
        ).toFixed(2)
      : '0.00';

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white text-xs font-bold">
              لوحة التحليلات الإحصائية للمواظبة والسلوك والنتائج ({stageCfg.name})
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1.5">
              <BarChart3 className="w-6 h-6 text-[#d4af37]" />
              <span>
                التحليل البياني لمؤشرات الانضباط، الغيابات، والتحصيل الدراسي — {institution.schoolName}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              تقارير بيانية دقيقة يعدها سلك موظفي التربية (المربي المتخصص في الابتدائي، والمشرف والمساعد التربوي في المتوسط والثانوي) لعرضها في مجالس الأقسام ومجلس الأساتذة.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
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
          </div>
        </div>
      </div>

      {/* بطاقات ملخص المؤشرات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>معدل نقطة المواظبة والانضباط</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-1 tabular-nums">
            {avgAttendanceScore} / {stageCfg.maxGradeScale}
          </div>
          <div className="text-xs text-slate-300 mt-1">
            بناءً على سجل الغيابات والتأخرات الفعلي
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>مجموع الساعات الضائعة المسجلة</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400 mt-1 tabular-nums">
            {totalMissedHours} ساعة
          </div>
          <div className="text-xs text-slate-300 mt-1">
            موزعة على {stageAbsences.length} حالات غياب وتأخر
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>التلاميذ المقترحون للإجازات الشرفية</span>
            <Award className="w-4 h-4 text-[#f5d77f]" />
          </div>
          <div className="text-3xl font-black text-[#f5d77f] mt-1 tabular-nums">
            {
              results.filter(
                (r) =>
                  r.termAverage >= (stageCfg.maxGradeScale === 10 ? 7 : 12) &&
                  r.unjustifiedAbsencesCount <= 2
              ).length
            }{' '}
            تلاميذ
          </div>
          <div className="text-xs text-slate-300 mt-1">
            جمعوا بين التفوق الدراسي والانضباط المثالي
          </div>
        </div>
      </div>

      {/* مقارنة بيانية للمعدل ونقطة المواظبة لكل تلميذ */}
      <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-6 shadow-2xl space-y-4">
        <h3 className="text-base font-black text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>
            مخطط مقارنة التحصيل الدراسي مع نقطة المواظبة والانضباط ({stageCfg.name} — سلم /{stageCfg.maxGradeScale})
          </span>
        </h3>

        <div className="space-y-4">
          {results.map((res) => {
            const avgPercent = Math.round(
              (res.termAverage / stageCfg.maxGradeScale) * 100
            );
            const attPercent = Math.round(
              (res.attendanceScore / stageCfg.maxGradeScale) * 100
            );
            return (
              <div
                key={res.student.id}
                className="p-4 rounded-xl bg-[#06150e] border border-[#d4af37]/25 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-black text-white">
                      {res.student.fullName}
                    </span>
                    <span className="text-[#f5d77f] font-bold mr-2">
                      ({res.student.classGroup})
                    </span>
                  </div>
                  <div className="flex items-center gap-3 tabular-nums">
                    <span className="text-emerald-300 font-bold">
                      المعدل: {res.termAverage.toFixed(2)}/{stageCfg.maxGradeScale}
                    </span>
                    <span className="text-[#f5d77f] font-bold">
                      المواظبة: {res.attendanceScore.toFixed(2)}/{stageCfg.maxGradeScale}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-24 text-slate-400 shrink-0">المعدل الفصلي:</span>
                    <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-l from-emerald-400 to-[#105e32] rounded-full"
                        style={{ width: `${avgPercent}%` }}
                      />
                    </div>
                    <span className="w-10 text-left font-mono text-emerald-300 tabular-nums">
                      {avgPercent}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-24 text-slate-400 shrink-0">نقطة المواظبة:</span>
                    <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-l from-[#f5d77f] to-[#b58922] rounded-full"
                        style={{ width: `${attPercent}%` }}
                      />
                    </div>
                    <span className="w-10 text-left font-mono text-[#f5d77f] tabular-nums">
                      {attPercent}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
