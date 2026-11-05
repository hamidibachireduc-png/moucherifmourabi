import React, { useState } from 'react';
import {
  Calculator,
  Printer,
  Award,
  CheckCircle2,
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

interface AveragesSectionProps {
  institution: InstitutionInfo;
  activeStage: EducationStage;
  onSelectStage: (stage: EducationStage) => void;
  students: StudentRecord[];
  onUpdateStudents: (students: StudentRecord[]) => void;
  subjects: SubjectConfig[];
  absences: AbsenceRecord[];
}

export const AveragesSection: React.FC<AveragesSectionProps> = ({
  institution,
  activeStage,
  onSelectStage,
  students,
  onUpdateStudents,
  subjects,
  absences,
}) => {
  const stageCfg = STAGE_CONFIGS[activeStage];
  const stageStudents = students.filter((s) => s.stage === activeStage);
  const stageAbsences = absences.filter((a) => a.stage === activeStage);
  const stageSubjects = subjects.filter((s) => s.stages.includes(activeStage));

  const [formulaMode, setFormulaMode] = useState<
    'ministry_standard' | 'four_divisor' | 'primary_exam_only'
  >('ministry_standard');
  const [includeAttendanceInEval, setIncludeAttendanceInEval] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    stageStudents[0]?.id || ''
  );

  const results = calculateStudentResults(
    stageStudents,
    subjects,
    stageAbsences,
    formulaMode,
    includeAttendanceInEval,
    activeStage
  );

  const selectedResult =
    results.find((r) => r.student.id === selectedStudentId) || results[0];

  const handleGradeChange = (
    studentId: string,
    subjectId: string,
    field: 'eval' | 'test' | 'exam',
    value: number
  ) => {
    const clamped = Math.min(
      stageCfg.maxGradeScale,
      Math.max(0, Number.isNaN(value) ? 0 : value)
    );
    onUpdateStudents(
      students.map((st) => {
        if (st.id !== studentId) return st;
        const existing = st.grades[subjectId] || {
          eval: stageCfg.maxGradeScale === 10 ? 6 : 10,
          test: stageCfg.maxGradeScale === 10 ? 6 : 10,
          exam: stageCfg.maxGradeScale === 10 ? 6 : 10,
        };
        return {
          ...st,
          grades: {
            ...st.grades,
            [subjectId]: {
              ...existing,
              [field]: clamped,
            },
          },
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* ترويسة الحاسبة الآلية للمعدلات ونقطة المواظبة */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white font-bold">
                الحساب الآلي للمعدلات ونقطة المواظبة ({stageCfg.name} — سلم /{stageCfg.maxGradeScale})
              </span>
              <span className="text-[#d4af37] font-semibold">
                القرار 157 (مجالس الأقسام) · المنشور الوزاري للتقويم المستمر 2026
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-[#d4af37]" />
              <span>
                {activeStage === 'primary'
                  ? 'حاسبة معدلات الطور الابتدائي (/10) ومستويات التحكم (أ، ب، ج، د) — المربي المتخصص'
                  : `حاسبة المعدلات الفصلية (/${stageCfg.maxGradeScale}) وإدماج نقطة المواظبة والانضباط — المشرف والمساعد التربوي`}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              تربط هذه الحاسبة تلقائياً بين سجل الغيابات والتأخرات الممسوك من طرف موظفي التربية (المربي المتخصص / المشرف التربوي / المساعد التربوي) وبين نقطة المواظبة وقرارات مجلس القسم (تهنئة، تشجيع، لوحة شرف، أو تحفظ بسبب الغياب).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {(['primary', 'middle', 'secondary'] as EducationStage[]).map((st) => (
              <button
                key={st}
                onClick={() => {
                  onSelectStage(st);
                  const firstSt = students.find((s) => s.stage === st);
                  if (firstSt) setSelectedStudentId(firstSt.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  activeStage === st
                    ? 'bg-[#d4af37] text-[#071710] font-black'
                    : 'bg-[#06150e] text-slate-300 border border-[#d4af37]/30'
                }`}
              >
                {STAGE_CONFIGS[st].name} (/{STAGE_CONFIGS[st].maxGradeScale})
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#d4af37]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[#f5d77f]">معادلة الحساب المعتمدة:</span>
            {activeStage === 'primary' ? (
              <>
                <button
                  onClick={() => setFormulaMode('ministry_standard')}
                  className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                    formulaMode === 'ministry_standard'
                      ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]'
                      : 'bg-[#05140d] text-slate-300'
                  }`}
                >
                  (التقويم المستمر + الاختبار) ÷ 2 [سلم /10]
                </button>
                <button
                  onClick={() => setFormulaMode('primary_exam_only')}
                  className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                    formulaMode === 'primary_exam_only'
                      ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]'
                      : 'bg-[#05140d] text-slate-300'
                  }`}
                >
                  نقطة الاختبار الفصلي فقط (/10)
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setFormulaMode('ministry_standard')}
                  className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                    formulaMode === 'ministry_standard'
                      ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]'
                      : 'bg-[#05140d] text-slate-300'
                  }`}
                >
                  [(التقويم + الفرض)/2 + الاختبار×2] ÷ 3
                </button>
                <button
                  onClick={() => setFormulaMode('four_divisor')}
                  className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                    formulaMode === 'four_divisor'
                      ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]'
                      : 'bg-[#05140d] text-slate-300'
                  }`}
                >
                  (التقويم + الفرض + الاختبار×2) ÷ 4
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setIncludeAttendanceInEval(!includeAttendanceInEval)}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer border ${
              includeAttendanceInEval
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                : 'bg-[#05140d] text-slate-400 border-slate-700'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>
              إدماج نقطة المواظبة والسلوك آلياً (20% من التقويم):{' '}
              {includeAttendanceInEval ? 'مفعل' : 'غير مفعل'}
            </span>
          </button>
        </div>
      </div>

      {/* جدول الترتيب العام ومؤشرات المواظبة والإجازات */}
      <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 overflow-hidden shadow-2xl no-print">
        <div className="p-4 bg-[#06150e] border-b border-[#d4af37]/20 flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-black text-white">
              الجدول الجامع للنتائج الفصلية، نقطة المواظبة، وقرارات مجلس القسم ({stageCfg.name})
            </h3>
            <p className="text-[11px] text-slate-400">
              انقر على أي تلميذ لتعديل نقاطه ومعاينة كشف النقاط التفصيلي القابل للطباعة
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-[#105e32] text-[#f5d77f] border border-[#d4af37]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة كشف التلميذ المحدد A4</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#05120c] text-[#f5d77f] border-b border-[#d4af37]/30">
                <th className="py-3 px-3 font-bold text-center">الرتبة</th>
                <th className="py-3 px-4 font-bold">التلميذ(ة) والفوج</th>
                <th className="py-3 px-3 font-bold text-center">الغيابات غير المبررة</th>
                <th className="py-3 px-3 font-bold text-center">نقطة المواظبة</th>
                <th className="py-3 px-3 font-bold text-center">
                  المعدل الفصلي (/{stageCfg.maxGradeScale})
                </th>
                <th className="py-3 px-3 font-bold">الإجازة المقترحة</th>
                <th className="py-3 px-4 font-bold">ملاحظة المواظبة ومجلس القسم</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {results.map((res) => {
                const isSelected = selectedResult?.student.id === res.student.id;
                const isPassing = res.termAverage >= stageCfg.passingGrade;
                return (
                  <tr
                    key={res.student.id}
                    onClick={() => setSelectedStudentId(res.student.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#103824]/90 border-r-2 border-[#d4af37]'
                        : 'hover:bg-[#0c261a]/60'
                    }`}
                  >
                    <td className="py-3 px-3 text-center font-black text-[#f5d77f] tabular-nums">
                      #{res.rank}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-black text-white">{res.student.fullName}</div>
                      <div className="text-[11px] text-slate-400">
                        {res.student.classGroup} · {res.student.behaviorNote}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center tabular-nums">
                      <span
                        className={`font-bold ${
                          res.unjustifiedAbsencesCount > 0
                            ? 'text-rose-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {res.unjustifiedAbsencesCount} غياب ({res.lateCount} تأخر)
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-emerald-300 tabular-nums">
                      {res.attendanceScore.toFixed(2)} / {stageCfg.maxGradeScale}
                    </td>
                    <td className="py-3 px-3 text-center tabular-nums">
                      <span
                        className={`text-sm font-black ${
                          isPassing ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {res.termAverage.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-[#f5d77f] flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{res.honorRoll}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 text-[11px]">
                      {res.councilDecision}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* بطاقة تعديل النقاط وكشف النقاط القابل للطباعة للتلميذ المحدد */}
      {selectedResult && (
        <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/50 p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d4af37]/30 pb-4">
            <div>
              <div className="text-xs font-bold text-[#d4af37]">
                {institution.schoolName} — {institution.wilaya} ({institution.schoolYear})
              </div>
              <h3 className="text-lg font-black text-white mt-0.5">
                كشف النقاط والمواظبة الفصلي للتلميذ(ة): {selectedResult.student.fullName} ({selectedResult.student.classGroup})
              </h3>
              <div className="text-xs text-emerald-300 mt-0.5">
                نقطة المواظبة والانضباط: {selectedResult.attendanceScore} / {stageCfg.maxGradeScale} · القرار المقترح: {selectedResult.honorRoll}
              </div>
            </div>
            <div className="text-left bg-[#05140d] border border-[#d4af37]/40 rounded-xl px-4 py-2.5">
              <div className="text-[11px] text-slate-400">المعدل الفصلي العام</div>
              <div className="text-2xl font-black text-[#f5d77f] tabular-nums">
                {selectedResult.termAverage.toFixed(2)} / {stageCfg.maxGradeScale}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-[#05120c] text-[#f5d77f] border-b border-[#d4af37]/30">
                  <th className="py-2.5 px-3 font-bold">المادة التعليمية</th>
                  {stageCfg.hasCoefficients && (
                    <th className="py-2.5 px-2 font-bold text-center">المعامل</th>
                  )}
                  <th className="py-2.5 px-2 font-bold text-center">
                    التقويم المستمر (/{stageCfg.maxGradeScale})
                  </th>
                  {stageCfg.hasSupervisedTest && (
                    <th className="py-2.5 px-2 font-bold text-center">
                      الفرض المحروس (/{stageCfg.maxGradeScale})
                    </th>
                  )}
                  <th className="py-2.5 px-2 font-bold text-center">
                    الاختبار الفصلي (/{stageCfg.maxGradeScale})
                  </th>
                  <th className="py-2.5 px-2 font-bold text-center">معدل المادة</th>
                  <th className="py-2.5 px-3 font-bold">التقدير البيداغوجي / التحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {selectedResult.subjectResults.map((sr) => {
                  const rawGrades = selectedResult.student.grades[sr.subjectId] || {
                    eval: sr.eval,
                    test: sr.test,
                    exam: sr.exam,
                  };
                  return (
                    <tr key={sr.subjectId} className="hover:bg-[#0c261a]/40">
                      <td className="py-2.5 px-3 font-bold text-white">
                        {sr.subjectName}
                      </td>
                      {stageCfg.hasCoefficients && (
                        <td className="py-2.5 px-2 text-center font-mono font-bold text-[#f5d77f] tabular-nums">
                          {sr.coefficient}
                        </td>
                      )}
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          max={stageCfg.maxGradeScale}
                          value={rawGrades.eval}
                          onChange={(e) =>
                            handleGradeChange(
                              selectedResult.student.id,
                              sr.subjectId,
                              'eval',
                              parseFloat(e.target.value)
                            )
                          }
                          disabled={sr.exempt}
                          className="w-16 px-2 py-1 rounded bg-[#05140d] border border-[#d4af37]/30 text-white text-center font-mono tabular-nums"
                        />
                      </td>
                      {stageCfg.hasSupervisedTest && (
                        <td className="py-2.5 px-2 text-center">
                          <input
                            type="number"
                            step="0.25"
                            min="0"
                            max={stageCfg.maxGradeScale}
                            value={rawGrades.test}
                            onChange={(e) =>
                              handleGradeChange(
                                selectedResult.student.id,
                                sr.subjectId,
                                'test',
                                parseFloat(e.target.value)
                              )
                            }
                            disabled={sr.exempt}
                            className="w-16 px-2 py-1 rounded bg-[#05140d] border border-[#d4af37]/30 text-white text-center font-mono tabular-nums"
                          />
                        </td>
                      )}
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          max={stageCfg.maxGradeScale}
                          value={rawGrades.exam}
                          onChange={(e) =>
                            handleGradeChange(
                              selectedResult.student.id,
                              sr.subjectId,
                              'exam',
                              parseFloat(e.target.value)
                            )
                          }
                          disabled={sr.exempt}
                          className="w-16 px-2 py-1 rounded bg-[#05140d] border border-[#d4af37]/30 text-white text-center font-mono tabular-nums"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono font-black text-emerald-400 tabular-nums">
                        {sr.exempt ? 'معفى' : sr.subjectAvg.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        {sr.competencyBadge ? (
                          <span className="text-[#f5d77f] font-bold">
                            {sr.competencyBadge} — {sr.appreciation}
                          </span>
                        ) : (
                          sr.appreciation
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
