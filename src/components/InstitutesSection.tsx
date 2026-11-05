import React from 'react';
import { Building2 } from 'lucide-react';
import { InstitutionInfo } from '../types';
import { STAFF_ROLES, STAGE_CONFIGS } from '../data/mockData';

interface InstitutesSectionProps {
  institution: InstitutionInfo;
}

export const InstitutesSection: React.FC<InstitutesSectionProps> = ({
  institution,
}) => {
  const stageCfg = STAGE_CONFIGS[institution.stage];
  const activeRole =
    STAFF_ROLES[institution.activeRoleId] || STAFF_ROLES[stageCfg.defaultRole];
  const roleDisplayTitle = institution.customRoleTitle || activeRole.title;

  const institutes = [
    {
      code: 'INFP',
      name: 'المعهد الوطني لتكوين موظفي قطاع التربية الوطنية',
      role: `التكوين المتخصص والترقية لرتب ${stageCfg.staffTitle}`,
      tasks: `تأطير التكوين البيداغوجي التحضيري والتكوين التكميلي قبل الترقية لرتب مربي متخصص رئيسي، مشرف التربية، مشرف رئيسي، مشرف عام للتربية، ومستشار التربية.`,
      period: 'طوال السنة الدراسية',
    },
    {
      code: 'ONEC',
      name: 'الديوان الوطني للامتحانات والمسابقات',
      role: `تأطير وأمانة مراكز إجراء ${stageCfg.nationalExamName} والمسابقات المهنية`,
      tasks: `مشاركة موظفي التربية (المربي المتخصص، المشرف التربوي، المساعد التربوي) في أمانة مراكز الإجراء، ضبط حضور المترشحين، وتنظيم الأجنحة في الامتحانات الرسمية.`,
      period: 'أكتوبر - جوان',
    },
    {
      code: 'UDS',
      name: 'وحدات الكشف والمتابعة الصحية المدرسية',
      role: `الفحص الطبي الدوري والمتابعة الصحية لتلاميذ ${stageCfg.name}`,
      tasks: `تنسيق ${roleDisplayTitle} مع الطاقم الطبي في متابعة الدفاتر الصحية للتلاميذ، الإعفاءات الطبية، ومرافقة التلاميذ للفحص الدوري والتلقيح.`,
      period: 'دوري طوال الموسم',
    },
    {
      code: 'ONPS',
      name: 'الديوان الوطني للمطبوعات المدرسية',
      role: `توزيع الكتاب المدرسي ومجانية الكتاب لفائدة تلاميذ ${stageCfg.name}`,
      tasks: `مساهمة موظفي التربية في تنظيم عملية تسليم الكتب المدرسية للتلاميذ المعوزين والمستفيدين من المجانية وضبط قوائم الاستلام.`,
      period: 'سبتمبر - أكتوبر',
    },
    {
      code: 'CNAS / CWSL',
      name: 'هيئات الضمان الاجتماعي والخدمات الاجتماعية لعمال التربية',
      role: 'الحماية الاجتماعية والتأمين المدرسي والمهني',
      tasks: `متابعة ملفات التصريح بالحوادث المدرسية للتلاميذ، وملفات العطل المرضية والخدمات الاجتماعية لموظفي التربية.`,
      period: 'سنوي مستمر',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl">
        <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white text-xs font-bold">
          التنسيق المؤسساتي مع الهيئات الوطنية الوصية ({stageCfg.name})
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1.5">
          <Building2 className="w-6 h-6 text-[#d4af37]" />
          <span>
            دليل المعاهد والهيئات الوصية المرتبطة بمهام {roleDisplayTitle}
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
          جدول العمليات التربوية والإدارية والتكوينية التي يشارك فيها {roleDisplayTitle} بالتنسيق مع هيئات وزارة التربية الوطنية ({institution.schoolName}).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {institutes.map((inst) => (
          <div
            key={inst.code}
            className="p-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/30 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-[#105e32] text-[#f5d77f] font-mono font-bold text-xs border border-[#d4af37]/40">
                {inst.code}
              </span>
              <span className="text-xs text-emerald-300 font-semibold">
                {inst.period}
              </span>
            </div>
            <h3 className="text-base font-black text-white">{inst.name}</h3>
            <div className="text-xs font-bold text-[#d4af37]">{inst.role}</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {inst.tasks}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
