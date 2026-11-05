import React, { useState } from 'react';
import {
  BookOpen,
  Printer,
  CheckCircle2,
} from 'lucide-react';
import { InstitutionInfo, TeacherOrStaffMember } from '../types';
import { STAFF_ROLES, STAGE_CONFIGS } from '../data/mockData';

interface CommunitySectionProps {
  institution: InstitutionInfo;
  staffMembers: TeacherOrStaffMember[];
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  institution,
  staffMembers,
}) => {
  const stageCfg = STAGE_CONFIGS[institution.stage];
  const activeRole =
    STAFF_ROLES[institution.activeRoleId] || STAFF_ROLES[stageCfg.defaultRole];
  const roleDisplayTitle = institution.customRoleTitle || activeRole.title;

  const stageStaff = staffMembers.filter((s) => s.stage === institution.stage);
  const [registerStatus, setRegisterStatus] = useState<Record<string, string>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const coordinationPartners =
    institution.stage === 'primary'
      ? [
          {
            role: 'مدير المدرسة الابتدائية',
            name: 'السلطة السلمية المباشرة',
            office: 'مكتب الإدارة',
            hours: 'طوال الدوام الرسمي',
            coord:
              'المصادقة على تقارير المواظبة اليومية، تعداد المطعم المدرسي، وتراخيص خروج التلاميذ الاستثنائية.',
          },
          {
            role: 'ناظر المدرسة الابتدائية / مساعد المدير',
            name: 'التنسيق التربوي والبيداغوجي',
            office: 'مكتب النظارة',
            hours: '08:00 - 16:00',
            coord:
              'تنسيق متابعة غيابات التلاميذ، تنظيم النشاطات المكملة، وضبط قوائم تقييم المكتسبات.',
          },
          {
            role: 'وحدة الكشف والمتابعة الصحية (UDS)',
            name: 'الفريق الطبي المدرسي',
            office: 'عيادة الصحة المدرسية',
            hours: 'حسب برنامج الفحوصات',
            coord:
              'مرافقة المربي المتخصص للتلاميذ لإجراء الفحوصات الطبية الدورية ومتابعة النظافة والتلقيح.',
          },
        ]
      : [
          {
            role: 'مستشار التربية',
            name: 'رئيس مصلحة الحياة المدرسية والانضباط',
            office: 'مكتب الاستشارة التربوية',
            hours: '08:00 - 16:30',
            coord:
              'الإشراف المباشر على توزيع أجنحة ومهام المشرفين والمساعدين التربويين واستقبال الأولياء.',
          },
          {
            role: stageCfg.counsellorTitle,
            name: 'مدير الدراسات / الناظر',
            office: 'مكتب النظارة والدراسات',
            hours: '08:00 - 16:30',
            coord:
              'التنسيق في ضبط جداول التوقيت، تغطية غيابات الأساتذة، وحجز نقاط المواظبة ومجالس الأقسام.',
          },
          {
            role: 'الأستاذ الرئيسي ومستشار التوجيه',
            name: 'المرافقة البيداغوجية والنفسية',
            office: 'مكتب التوجيه والإرشاد',
            hours: 'أيام الاستقبال الأسبوعية',
            coord:
              'التكفل المشترك بالتلاميذ المتأخرين أو كثيري الغياب المحالين من مكتب المشرف التربوي.',
          },
        ];

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-900/90 border border-[#d4af37] text-white text-xs font-bold flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-[#f5d77f]" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl">
        <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white text-xs font-bold">
          التنسيق داخل الجماعة التربوية ({stageCfg.name})
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1.5">
          <BookOpen className="w-6 h-6 text-[#d4af37]" />
          <span>
            فضاء الجماعة التربوية، دليل الاتصال، وسجل مراقبة{' '}
            {institution.stage === 'primary'
              ? 'سجلات المواظبة بالفترات والمطعم'
              : 'كراريس الغياب اليومية وحركة الأفواج'}
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
          تنسيق عمل {roleDisplayTitle} مع الطاقم الإداري والتربوي وأولياء التلاميذ، مرفق بسجل التأشير اليومي على كراريس الغياب.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coordinationPartners.map((partner, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#081a12] border border-[#d4af37]/30 space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#f5d77f]">
                {partner.role}
              </div>
              <h4 className="text-sm font-black text-white">{partner.name}</h4>
              <div className="text-[11px] text-emerald-300">
                {partner.office} · {partner.hours}
              </div>
              <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                {partner.coord}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* سجل مراقبة كراريس الغياب اليومية */}
      <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#06150e] border-b border-[#d4af37]/20 flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-black text-white">
              سجل الرقابة اليومية لكراريس الغيابات وحركة الأفواج ({stageCfg.shortName})
            </h3>
            <p className="text-[11px] text-slate-400">
              تأشيرة {roleDisplayTitle} اليومية على مطابقة كراريس الغياب وسجل المداومة
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-[#105e32] text-[#f5d77f] border border-[#d4af37]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة سجل المراقبة</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-[#05120c] text-[#f5d77f] border-b border-[#d4af37]/30">
                <th className="py-3 px-4 font-bold">المؤطر / الرتبة</th>
                <th className="py-3 px-3 font-bold">الأفواج المراقبة</th>
                <th className="py-3 px-3 font-bold">وضعية كراس الغياب والانضباط</th>
                <th className="py-3 px-4 font-bold text-center">
                  تأشيرة {roleDisplayTitle}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {stageStaff.map((member) => {
                const currentVal =
                  registerStatus[member.id] ||
                  'مطابق ومؤشر في جميع الحصص والفترات';
                return (
                  <tr key={member.id} className="hover:bg-[#0c261a]/60">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{member.name}</div>
                      <div className="text-[11px] text-[#d4af37]">
                        {member.roleTitle}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {member.assignedClasses.join(' ، ')}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={currentVal}
                        onChange={(e) =>
                          setRegisterStatus((prev) => ({
                            ...prev,
                            [member.id]: e.target.value,
                          }))
                        }
                        className="px-2.5 py-1.5 rounded bg-[#05140d] border border-[#d4af37]/40 text-white text-xs"
                      >
                        <option value="مطابق ومؤشر في جميع الحصص والفترات">
                          مطابق ومؤشر في جميع الحصص والفترات
                        </option>
                        <option value="تم استدراك توقيع حصة مسائية وتبرير الغيابات">
                          تم استدراك توقيع حصة مسائية وتبرير الغيابات
                        </option>
                        <option value="تمت مطابقة تعداد المطعم المدرسي والغيابات">
                          تمت مطابقة تعداد المطعم المدرسي والغيابات
                        </option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setToastMsg(
                            `تم تسجيل تأشيرة ${roleDisplayTitle} للأفواج المسندة لـ ${member.name}`
                          );
                          setTimeout(() => setToastMsg(null), 2500);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/40 font-bold cursor-pointer"
                      >
                        تسجيل تأشيرة المراقبة
                      </button>
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
