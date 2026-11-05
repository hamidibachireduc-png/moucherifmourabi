import React from 'react';
import {
  Database,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import {
  AbsenceRecord,
  InstitutionInfo,
  StudentRecord,
  TeacherOrStaffMember,
} from '../types';
import { STAGE_CONFIGS } from '../data/mockData';

interface DigitalizationSectionProps {
  institution: InstitutionInfo;
  staffMembers: TeacherOrStaffMember[];
  onUpdateStaff: (updated: TeacherOrStaffMember[]) => void;
  students: StudentRecord[];
  absences: AbsenceRecord[];
}

export const DigitalizationSection: React.FC<DigitalizationSectionProps> = ({
  institution,
  staffMembers,
  onUpdateStaff,
  students,
  absences,
}) => {
  const stageCfg = STAGE_CONFIGS[institution.stage];
  const stageStaff = staffMembers.filter((s) => s.stage === institution.stage);
  const stageAbsences = absences.filter((a) => a.stage === institution.stage);
  const stageStudents = students.filter((s) => s.stage === institution.stage);

  const handleToggleSync = (id: string) => {
    onUpdateStaff(
      staffMembers.map((s) =>
        s.id === id ? { ...s, amattiSynced: !s.amattiSynced } : s
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl">
        <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white text-xs font-bold">
          التكامل مع الأرضية الرقمية لوزارة التربية الوطنية Amatti وفضاء الأولياء ({stageCfg.name})
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1.5">
          <Database className="w-6 h-6 text-[#d4af37]" />
          <span>
            مزامنة الغيابات اليومية، الإطعام المدرسي، وإشعارات الأولياء الرقمية
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
          متابعة حجز الغيابات والإعفاءات الطبية وقوائم المستفيدين من المطعم والنصف داخلي في الأرضية الرقمية من طرف المربي المتخصص في الابتدائي والمشرف والمساعد التربوي في المتوسط والثانوي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#081a12] border border-[#d4af37]/30">
          <div className="text-xs text-slate-400">حجز الغيابات اليومية في الرقمنة</div>
          <div className="text-2xl font-black text-emerald-400 mt-1 tabular-nums">
            {stageAbsences.length} / {stageAbsences.length} محجوزة
          </div>
          <div className="text-[11px] text-slate-300 mt-0.5">
            تم إرسال إشعارات آلية لحسابات الأولياء
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#081a12] border border-[#d4af37]/30">
          <div className="text-xs text-slate-400">مطابقة قوائم الإطعام / النصف داخلي</div>
          <div className="text-2xl font-black text-[#f5d77f] mt-1 tabular-nums">
            {
              stageStudents.filter((s) => s.canteenBeneficiary || s.halfBoard)
                .length
            }{' '}
            تلميذ مؤكد
          </div>
          <div className="text-[11px] text-slate-300 mt-0.5">
            قوائم مضبوطة ومؤشرة في الرقمنة
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#081a12] border border-[#d4af37]/30">
          <div className="text-xs text-slate-400">حالة تزامن الأجنحة التربوية</div>
          <div className="text-2xl font-black text-white mt-1 tabular-nums">
            {stageStaff.filter((s) => s.amattiSynced).length} / {stageStaff.length} مؤطرين
          </div>
          <div className="text-[11px] text-emerald-300 mt-0.5">
            ربط مباشر مع مكتب الاستشارة والناظر
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#06150e] border-b border-[#d4af37]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-sm sm:text-base font-black text-white">
              جدول متابعة الحجز الرقمي للغيابات والمواظبة حسب المؤطرين والأجنحة ({stageCfg.shortName})
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#05120c] text-[#f5d77f] border-b border-[#d4af37]/30">
                <th className="py-3 px-4 font-bold">الموظف المؤطر والرتبة</th>
                <th className="py-3 px-3 font-bold">الجناح / المرفق المسند</th>
                <th className="py-3 px-3 font-bold">الأفواج التربوية</th>
                <th className="py-3 px-4 font-bold text-center">حالة الحجز في الرقمنة Amatti</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {stageStaff.map((member) => (
                <tr key={member.id} className="hover:bg-[#0c261a]/60">
                  <td className="py-3 px-4">
                    <div className="font-black text-white">{member.name}</div>
                    <div className="text-[11px] text-[#d4af37]">
                      {member.roleTitle}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {member.subjectOrZone}
                  </td>
                  <td className="py-3 px-3 font-bold text-emerald-300">
                    {member.assignedClasses.join(' · ')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleSync(member.id)}
                      className={`px-3 py-1.5 rounded-lg font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                        member.amattiSynced
                          ? 'bg-emerald-900/70 text-emerald-300 border border-emerald-500/50'
                          : 'bg-amber-900/70 text-amber-300 border border-amber-500/50'
                      }`}
                    >
                      {member.amattiSynced ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>تم حجز ومطابقة الغيابات</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>قيد الحجز — انقر للتأكيد</span>
                        </>
                      )}
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
