import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Printer,
  CheckCircle2,
  FileText,
  Scale,
  Calendar,
} from 'lucide-react';
import { EducationStage, InstitutionInfo } from '../types';
import { STAFF_ROLES, STAGE_CONFIGS } from '../data/mockData';

interface CouncilsSectionProps {
  institution: InstitutionInfo;
  activeStage: EducationStage;
  onSelectStage: (stage: EducationStage) => void;
}

interface CouncilItem {
  id: string;
  title: string;
  legalRef: string;
  periodicity: string;
  stages: EducationStage[];
  presidency: string;
  staffMembershipRole: string;
  agendaTopics: string[];
  requiredDocumentsFromStaff: string[];
}

const COUNCILS_AND_COMMITTEES: CouncilItem[] = [
  {
    id: 'council-class',
    title: 'مجلس القسم (أقسام الابتدائي · المتوسط · الثانوي)',
    legalRef: 'القرار الوزاري رقم 157 المؤرخ في 26 فيفري 1991',
    periodicity: 'في نهاية كل فصل دراسي (3 دورات عادية سنوياً)',
    stages: ['primary', 'middle', 'secondary'],
    presidency: 'مدير المؤسسة أو الناظر / مستشار التربية بتفويض',
    staffMembershipRole:
      'يعد المشرف التربوي (أو المربي المتخصص في الابتدائي) البطاقة الإحصائية لمواظبة وسلوك كل تلميذ ويقترح قائمة المستفيدين من الإجازات (لوحة شرف، تشجيع، تهنئة) أو الإنذارات.',
    agendaTopics: [
      'دراسة الحصيلة الفصلية لنتائج التلاميذ ومقارنتها مع معدلات المواظبة والانضباط',
      'منح المكافآت المعنوية (لوحة الشرف، التشجيع، التهنئة) للتلاميذ المنضبطين والمتفوقين',
      'دراسة حالات التلاميذ كثيري الغياب أو المتأخرين واقتراح تدابير المرافقة والاستدراك',
      'في نهاية السنة: البت في قرارات الانتقال، الإعادة، أو التوجيه في الجذوع والشعب',
    ],
    requiredDocumentsFromStaff: [
      'الجدول الإحصائي الفصلي للغيابات والتأخرات حسب التلاميذ (مبررة / غير مبررة)',
      'قائمة التلاميذ الذين وقع أولياؤهم تعهدات كتابية أو وجهت لهم إشعارات غياب',
      'كشف نقاط المواظبة والسلوك المدمج في التقويم المستمر',
    ],
  },
  {
    id: 'council-discipline',
    title: 'مجلس التأديب (الانضباط والنظام الداخلي)',
    legalRef: 'القرار الوزاري رقم 173 المؤرخ في 02 مارس 1991 والقرار 171',
    periodicity: 'يجتمع في دورات استثنائية عند إحالة تلميذ ارتكب خطأ من الدرجة 3',
    stages: ['middle', 'secondary'],
    presidency: 'مدير المتوسطة أو الثانوية (بحضور الناظر ومستشار التربية وممثلي الأساتذة والأولياء)',
    staffMembershipRole:
      'يتولى المشرف العام أو المشرف الرئيسي ومشرف التربية تحضير الملف الانضباطي الكامل للتلميذ المحال، وتوثيق التقرير الميداني للواقعة وتبليغ الاستدعاء الرسمي للولي قبل 8 أيام.',
    agendaTopics: [
      'تلاوة التقرير المفصل حول المخالفة المسجلة وسجل سوابق التلميذ في المواظبة والسلوك',
      'الاستماع للتلميذ المعني ووليه الشرعي والمدافع عنه من التلاميذ أو الأساتذة',
      'تصنيف الخطأ (درجة 1، درجة 2، أو درجة 3) والتداول السري لإصدار العقوبة التربوية المناسبة',
    ],
    requiredDocumentsFromStaff: [
      'التقرير اليومي المفصل للمشرف التربوي أو المساعد التربوي المعاين للواقعة',
      'بطاقة المتابعة الفردية لغيابات وسلوك التلميذ منذ بداية السنة الدراسية',
      'نسخة من الاستدعاء الرسمي المرسل للولي الشرعي مع وصل الاستلام',
    ],
  },
  {
    id: 'council-admin-coord',
    title: 'مجلس التنسيق الإداري (خلية القيادة والمداومة)',
    legalRef: 'القرار الوزاري رقم 156 المؤرخ في 26 فيفري 1991',
    periodicity: 'اجتماع أسبوعي دوري (كل يوم أحد أو خميس)',
    stages: ['primary', 'middle', 'secondary'],
    presidency: 'مدير المؤسسة (بحضور الناظر، مستشار التربية، المقتصد، وممثل المشرفين/المربين)',
    staffMembershipRole:
      'عرض وضعية الانضباط العام في الأجنحة والساحة والمطعم المدرسي، وضبط جدول المداومة الأسبوعي وتوزيع المهام التربوية والإدارية.',
    agendaTopics: [
      'تقييم سير الأسبوع المنصرم من حيث مواظبة التلاميذ وتغطية الأجنحة وقاعات المداومة',
      'ضبط التعداد الفعلي للتلاميذ في المطعم المدرسي والنصف داخلي ومطابقته مع الرقمنة',
      'التحضير المادي والتنظيمي للفروض والاختبارات الفصلية والامتحانات الرسمية',
      'برمجة زيارات وحدات الكشف الصحي (UDS) والنشاطات الثقافية والرياضية',
    ],
    requiredDocumentsFromStaff: [
      'الحوصلة الأسبوعية لحركة التلاميذ والغيابات في الأجنحة التربوية',
      'تقرير سير المطعم المدرسي وقاعات المذاكرة المحروسة',
    ],
  },
  {
    id: 'council-cet-cog',
    title: 'مجلس التربية والتسيير (CET) / مجلس التوجيه والتسيير (COG)',
    legalRef: 'المرسوم التنفيذي 16-226 والمرسوم 16-227',
    periodicity: '3 دورات عادية في السنة (أكتوبر، ديسمبر، جوان) ودورات استثنائية',
    stages: ['middle', 'secondary'],
    presidency: 'مدير المتوسطة أو الثانوية (أعضاء بحكم القانون وأعضاء منتخبون)',
    staffMembershipRole:
      'ينتخب ممثل عن سلك موظفي التربية والإداريين عضواً كامل العضوية في المجلس للدفاع عن ظروف العمل، النظام الداخلي، وتجهيزات الحياة المدرسية.',
    agendaTopics: [
      'المصادقة على النظام الداخلي للمؤسسة ومشروع المؤسسة السنوي',
      'دراسة مشروع الميزانية والحساب المالي وتخصيص اعتمادات النشاط الثقافي والرياضي والوسائل',
      'تقييم ظروف الإطعام المدرسي (النصف داخلي) والنظافة والأمن داخل المؤسسة',
    ],
    requiredDocumentsFromStaff: [
      'قائمة الحاجيات من السجلات، المطبوعات الرسمية، ووسائل العمل لمكتب الاستشارة والمشرفين',
      'مقترحات سلك موظفي التربية لتحسين النظام الداخلي وتأطير التلاميذ',
    ],
  },
  {
    id: 'committee-canteen-health',
    title: 'لجنة المطعم المدرسي والوقاية الصحية والأمن (UDS)',
    legalRef: 'المرسوم التنفيذي 18-03 والمنشور الوزاري للصحة المدرسية',
    periodicity: 'معاينة يومية واجتماع تقييمي شهري',
    stages: ['primary', 'middle', 'secondary'],
    presidency: 'مدير المدرسة / المؤسسة بمشاركة المربي المتخصص أو المشرف التربوي',
    staffMembershipRole:
      'في الابتدائي: يشرف المربي المتخصص مباشرة على تفويج التلاميذ، مراقبة غسل اليدين، رفع الوجبة الشاهدة، ومرافقة التلاميذ لوحدة الكشف UDS. وفي المتوسط والثانوي: يؤطر المشرف والمساعد التربوي قاعة الإطعام.',
    agendaTopics: [
      'مراقبة جودة الوجبات الغذائية المقدمة واحترام الجدول الأسبوعي للوجبات',
      'حفظ عينة الوجبة الشاهدة لمدة 48 ساعة في الثلاجة المخصصة',
      'متابعة الفحوصات الطبية الدورية (الأسنان، البصر، التلقيح) بالتنسيق مع أطباء UDS',
      'مراقبة نظافة الساحة، دورات المياه، وتوفر حقيبة الإسعافات الأولية',
    ],
    requiredDocumentsFromStaff: [
      'سجل التعداد اليومي للتلاميذ الحاضرين في المطعم المدرسي',
      'دفتر المتابعة الصحية وقائمة التلاميذ المعفيين أو ذوي الأمراض المزمنة',
    ],
  },
  {
    id: 'committee-cultural-sport',
    title: 'الجمعية الثقافية والرياضية المدرسية والنوادي التربوية',
    legalRef: 'القرار الوزاري رقم 153 المؤرخ في 26 فيفري 1991',
    periodicity: 'نشاط أسبوعي (أمسية الثلاثاء ونهاية الأسبوع) ومناسبات وطنية',
    stages: ['primary', 'middle', 'secondary'],
    presidency: 'مدير المؤسسة (بمشاركة المربي المتخصص في الابتدائي والمشرفين والمساعدين التربويين)',
    staffMembershipRole:
      'يساهم المربي المتخصص في الابتدائي والمشرف التربوي والمساعد التربوي في تنشيط النوادي الثقافية، نادي المطالعة، النادي البيئي، وتأطير الدورات الرياضية وإحياء الأيام الوطنية.',
    agendaTopics: [
      'تأسيس النوادي التربوية (نادي القراءة، المسرح، البيئة، الإعلام الآلي، الشطرنج)',
      'تنظيم منافسات ما بين الأقسام في الفكر والثقافة والرياضة المدرسية',
      'إحياء الأعياد والمناسبات الوطنية والدينية (أول نوفمبر، يوم العلم 16 أفريل، عيد الاستقلال)',
    ],
    requiredDocumentsFromStaff: [
      'قائمة التلاميذ المنخرطين في النوادي الثقافية والرياضية',
      'البرنامج السنوي للنشاطات اللاصفية والتظاهرات المدرسية',
    ],
  },
];

export const CouncilsSection: React.FC<CouncilsSectionProps> = ({
  institution,
  activeStage,
  onSelectStage,
}) => {
  const stageCfg = STAGE_CONFIGS[activeStage];
  const activeRole =
    STAFF_ROLES[institution.activeRoleId] || STAFF_ROLES[stageCfg.defaultRole];
  const roleDisplayTitle = institution.customRoleTitle || activeRole.title;

  const stageCouncils = COUNCILS_AND_COMMITTEES.filter((c) =>
    c.stages.includes(activeStage)
  );

  const [selectedCouncil, setSelectedCouncil] = useState<CouncilItem>(
    stageCouncils[0] || COUNCILS_AND_COMMITTEES[0]
  );
  const [meetingDate, setMeetingDate] = useState('2026-03-15');
  const [classOrGroup, setClassOrGroup] = useState(
    activeStage === 'primary'
      ? 'قسم 5 ابتدائي 1'
      : activeStage === 'middle'
      ? 'قسم 4 متوسط 1'
      : 'قسم 3 علوم تجريبية 1'
  );
  const [customSummary, setCustomSummary] = useState(
    'تمت دراسة حصيلة المواظبة والانضباط المقدمة من طرف موظف التربية، والمصادقة على قائمة التلاميذ المستفيدين من إجازات لوحة الشرف والتشجيع والتهنئة، وتحديد قائمة التلاميذ المعنيين بالمرافقة البيداغوجية.'
  );

  return (
    <div className="space-y-6">
      {/* ترويسة قسم المجالس التربوية والإدارية واللجان */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs mb-1.5">
              <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white font-bold">
                المجالس التربوية والإدارية واللجان الرسمية ({stageCfg.name})
              </span>
              <span className="text-[#d4af37] font-semibold">
                القرارات 153 · 156 · 157 · 173 · المرسوم 18-03 · المرسوم 25-54
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-[#d4af37]" />
              <span>
                دليل المجالس التربوية والإدارية واللجان — مهام وتقارير {roleDisplayTitle}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              التأطير القانوني الشامل لجميع المجالس واللجان في {stageCfg.institutionLabel}، مع تحديد دور المربي المتخصص في الابتدائي والمشرف والمساعد التربوي في المتوسط والثانوي، ومولد محاضر وتقارير المجالس الجاهز للطباعة A4.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {(['primary', 'middle', 'secondary'] as EducationStage[]).map((st) => (
              <button
                key={st}
                onClick={() => {
                  onSelectStage(st);
                  const first = COUNCILS_AND_COMMITTEES.find((c) =>
                    c.stages.includes(st)
                  );
                  if (first) setSelectedCouncil(first);
                }}
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

      {/* شبكة اختيار المجلس أو اللجنة وتفاصيل المهام */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-3 no-print">
          {stageCouncils.map((council) => {
            const isSelected = selectedCouncil.id === council.id;
            return (
              <div
                key={council.id}
                onClick={() => setSelectedCouncil(council)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-l from-[#103824] to-[#081a12] border-[#d4af37] shadow-lg'
                    : 'bg-[#081a12] border-[#d4af37]/25 hover:border-[#d4af37]/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-[#f5d77f] font-bold mb-1">
                  <span>{council.legalRef}</span>
                </div>
                <h3 className="text-sm font-black text-white">{council.title}</h3>
                <div className="text-[11px] text-emerald-300 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{council.periodicity}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-7 space-y-5">
          {/* بطاقة التفاصيل القانونية والمهام */}
          <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-6 shadow-2xl space-y-4 no-print">
            <div className="border-b border-[#d4af37]/20 pb-3 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-[#f5d77f]">
                  {selectedCouncil.legalRef}
                </span>
                <span className="text-emerald-300 font-semibold">
                  {selectedCouncil.periodicity}
                </span>
              </div>
              <h3 className="text-lg font-black text-white">
                {selectedCouncil.title}
              </h3>
              <div className="text-xs text-slate-300">
                <span className="font-bold text-[#d4af37]">رئاسة وتشكيلة المجلس: </span>
                {selectedCouncil.presidency}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#05140d] border border-[#d4af37]/30 space-y-1.5">
              <div className="text-xs font-black text-[#f5d77f] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>دور ومهام {roleDisplayTitle} في هذا المجلس / اللجنة:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedCouncil.staffMembershipRole}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  <span>جدول الأعمال والصلاحيات القانونية:</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedCouncil.agendaTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-[#06150e] border border-[#d4af37]/20 text-[11px] text-slate-200 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#f5d77f] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>الوثائق والسجلات المطلوب تحضيرها:</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedCouncil.requiredDocumentsFromStaff.map((doc, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-[#06150e] border border-[#d4af37]/20 text-[11px] text-slate-200 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* حقول تخصيص تقرير/محضر المجلس للطباعة */}
            <div className="pt-3 border-t border-[#d4af37]/20 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-white">
                  تخصيص وطباعة تقرير {roleDisplayTitle} الموجه لـ ({selectedCouncil.title}):
                </span>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] font-black flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة التقرير الرسمي A4</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    تاريخ انعقاد الجلسة:
                  </label>
                  <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    الفوج التربوي / المرفق المعني:
                  </label>
                  <input
                    type="text"
                    value={classOrGroup}
                    onChange={(e) => setClassOrGroup(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  ملخص تقرير المواظبة والانضباط والتوصيات المسجلة:
                </label>
                <textarea
                  rows={2}
                  value={customSummary}
                  onChange={(e) => setCustomSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* معاينة التقرير الرسمي A4 للمجلس أو اللجنة */}
          <div className="rounded-2xl bg-white text-black p-6 sm:p-8 shadow-2xl border-2 border-[#d4af37] space-y-5 font-['Cairo',sans-serif]">
            <div className="text-center border-b-2 border-black pb-3 space-y-0.5">
              <div className="text-base font-bold">
                الجمهورية الجزائرية الديمقراطية الشعبية
              </div>
              <div className="text-sm font-bold">وزارة التربية الوطنية</div>
              <div className="flex items-center justify-between text-xs font-bold pt-2">
                <div className="text-right">
                  <div>{institution.wilaya}</div>
                  <div>{institution.schoolName}</div>
                  <div>مكتب: {roleDisplayTitle}</div>
                </div>
                <div className="text-left">
                  <div>الموسم الدراسي: {institution.schoolYear}</div>
                  <div>الفصل الدراسي: {institution.currentTerm}</div>
                  <div>التاريخ: {meetingDate}</div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base sm:text-lg font-black underline">
                تقرير المواظبة والحياة المدرسية المقدم أمام: {selectedCouncil.title}
              </h3>
              <div className="text-xs font-bold text-slate-700">
                المرجع القانوني: {selectedCouncil.legalRef} · المعني: {classOrGroup}
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-300">
                <div className="font-black text-slate-800 mb-1">
                  1. عرض موظف التربية ({roleDisplayTitle}):
                </div>
                <p className="text-slate-900 leading-relaxed">
                  {selectedCouncil.staffMembershipRole}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-300">
                <div className="font-black text-slate-800 mb-1">
                  2. الحوصلة المسجلة والتوصيات المعتمدة:
                </div>
                <p className="text-slate-900 leading-relaxed whitespace-pre-line">
                  {customSummary}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 text-center text-xs font-bold">
              <div>
                <div>{roleDisplayTitle}</div>
                <div className="text-slate-700 mt-0.5">({institution.staffName})</div>
                <div className="mt-8 text-slate-500">[الإمضاء]</div>
              </div>
              <div>
                <div>رئيس المجلس ({stageCfg.principalTitle})</div>
                <div className="text-slate-700 mt-0.5">({institution.schoolName})</div>
                <div className="mt-8 text-slate-500">[الختم والتوقيع الرسمي]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
