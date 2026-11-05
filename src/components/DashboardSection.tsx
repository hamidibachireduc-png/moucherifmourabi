import React, { useState } from 'react';
import {
  UserCheck,
  Calculator,
  Database,
  Clock,
  Calendar,
  BookOpen,
  Scale,
  FileText,
  Award,
  BarChart3,
  MessageSquare,
  Settings,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Users,
} from 'lucide-react';
import {
  AbsenceRecord,
  AgendaTask,
  DutySlot,
  EducationStage,
  InstitutionInfo,
  SectionId,
  StudentRecord,
  SubjectConfig,
  TeacherOrStaffMember,
} from '../types';
import {
  CLASS_GROUPS,
  STAFF_ROLES,
  STAGE_CONFIGS,
  calculateStudentResults,
} from '../data/mockData';

interface DashboardSectionProps {
  institution: InstitutionInfo;
  activeStage: EducationStage;
  onSelectStage: (stage: EducationStage) => void;
  onUpdateInstitution: (inst: InstitutionInfo) => void;
  onNavigate: (section: SectionId) => void;
  absences: AbsenceRecord[];
  timetable: DutySlot[];
  students: StudentRecord[];
  subjects: SubjectConfig[];
  staffMembers: TeacherOrStaffMember[];
  agendaItems: AgendaTask[];
  onOpenDocumentGenerator: (docId: string) => void;
  onOpenSettings: () => void;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  institution,
  activeStage,
  onSelectStage,
  onUpdateInstitution,
  onNavigate,
  absences,
  timetable,
  students,
  subjects,
  staffMembers,
  agendaItems,
  onOpenDocumentGenerator,
  onOpenSettings,
}) => {
  const stageCfg = STAGE_CONFIGS[activeStage];
  const activeRole =
    STAFF_ROLES[institution.activeRoleId] || STAFF_ROLES[stageCfg.defaultRole];
  const roleDisplayTitle = institution.customRoleTitle || activeRole.title;

  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');

  const stageStudents = students.filter((s) => s.stage === activeStage);
  const stageAbsences = absences.filter((a) => a.stage === activeStage);
  const stageStaff = staffMembers.filter((t) => t.stage === activeStage);
  const stageTimetable = timetable.filter((t) => t.stage === activeStage);
  const stageAgenda = agendaItems.filter(
    (a) => a.stage === activeStage || a.stage === 'all'
  );
  const stageClasses = CLASS_GROUPS.filter((c) => c.stage === activeStage);

  const computedResults = calculateStudentResults(
    stageStudents,
    subjects,
    stageAbsences,
    'ministry_standard',
    true,
    activeStage
  );

  const passingCount = computedResults.filter(
    (r) => r.termAverage >= stageCfg.passingGrade
  ).length;
  const passRate =
    computedResults.length > 0
      ? Math.round((passingCount / computedResults.length) * 100)
      : 0;
  const overallAvg =
    computedResults.length > 0
      ? (
          computedResults.reduce((acc, r) => acc + r.termAverage, 0) /
          computedResults.length
        ).toFixed(2)
      : '0.00';

  const syncedStaffCount = stageStaff.filter((s) => s.amattiSynced).length;
  const syncRate =
    stageStaff.length > 0
      ? Math.round((syncedStaffCount / stageStaff.length) * 100)
      : 100;

  const urgentAbsencesCount = stageAbsences.filter(
    (a) =>
      a.status === 'unjustified' ||
      a.status === 'parent_summoned' ||
      a.status === 'warning_sent'
  ).length;

  const completedAgendaCount = stageAgenda.filter(
    (a) => a.status === 'completed'
  ).length;
  const agendaProgress =
    stageAgenda.length > 0
      ? Math.round((completedAgendaCount / stageAgenda.length) * 100)
      : 100;

  // توليد الإحصائيات البيانية التفصيلية لمختلف الأقسام والأفواج في الطور الحالي
  const classAnalyticsList = stageClasses.map((cls, idx) => {
    const clsStudents = computedResults.filter(
      (r) => r.student.classGroup === cls.name
    );
    const clsAbsences = stageAbsences.filter(
      (a) => a.classOrRole === cls.name
    );

    const studentCount = clsStudents.length > 0 ? clsStudents.length : 32 - idx * 2;
    const avgScore =
      clsStudents.length > 0
        ? Number(
            (
              clsStudents.reduce((acc, r) => acc + r.termAverage, 0) /
              clsStudents.length
            ).toFixed(2)
          )
        : Number(
            (
              stageCfg.maxGradeScale === 10
                ? 7.8 - idx * 0.35
                : 13.8 - idx * 0.65
            ).toFixed(2)
          );

    const passPercentage =
      clsStudents.length > 0
        ? Math.round(
            (clsStudents.filter((r) => r.termAverage >= stageCfg.passingGrade)
              .length /
              clsStudents.length) *
              100
          )
        : Math.max(68, 92 - idx * 5);

    const attendancePercentage =
      clsStudents.length > 0
        ? Math.round(
            (clsStudents.reduce((acc, r) => acc + r.attendanceScore, 0) /
              (clsStudents.length * stageCfg.maxGradeScale)) *
              100
          )
        : Math.max(84, 97 - idx * 3);

    const absencesCount =
      clsAbsences.length > 0 ? clsAbsences.length : Math.max(1, idx + 1);
    const canteenCount =
      clsStudents.length > 0
        ? clsStudents.filter(
            (r) => r.student.canteenBeneficiary || r.student.halfBoard
          ).length
        : Math.round(studentCount * 0.65);

    const honorCount =
      clsStudents.length > 0
        ? clsStudents.filter(
            (r) =>
              r.termAverage >= (stageCfg.maxGradeScale === 10 ? 7 : 12) &&
              r.unjustifiedAbsencesCount <= 2
          ).length
        : Math.round(studentCount * 0.42);

    return {
      name: cls.name,
      label: cls.label,
      level: cls.level,
      studentCount,
      avgScore,
      passPercentage,
      attendancePercentage,
      absencesCount,
      canteenCount,
      honorCount,
    };
  });

  const displayedClasses =
    selectedClassFilter === 'all'
      ? classAnalyticsList
      : classAnalyticsList.filter((c) => c.name === selectedClassFilter);

  const platformPillars: {
    id: SectionId;
    title: string;
    badge: string;
    description: string;
    metric: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'absences',
      title: 'متابعة الغيابات والانضباط',
      badge: `${stageAbsences.length} سجلات`,
      description:
        activeStage === 'primary'
          ? 'ضبط غيابات الفترات (صباحاً/مساءً)، تعداد المطعم المدرسي، ومرافقة الصحة المدرسية UDS.'
          : 'مسك كراريس الغياب بالساعة، تسليم بطاقات السماح بالدخول، واستدعاء الأولياء لمكتب المشرف.',
      metric: `${urgentAbsencesCount} حالات تتطلب متابعة الولي`,
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      id: 'averages',
      title: 'الحساب التلقائي للمعدلات',
      badge: `سلم /${stageCfg.maxGradeScale}`,
      description:
        activeStage === 'primary'
          ? 'حساب معدلات التلاميذ من 10 وتحديد مستويات التحكم (أ، ب، ج، د) وتقييم المكتسبات.'
          : 'حساب المعدلات الفصلية من 20 مع إدماج نقطة المواظبة والسلوك آلياً وإعداد قوائم الإجازات.',
      metric: `نسبة التحكم/النجاح: ${passRate}%`,
      icon: <Calculator className="w-5 h-5" />,
    },
    {
      id: 'councils',
      title: 'المجالس التربوية والإدارية واللجان',
      badge: '6 مجالس ولجان',
      description:
        'مجلس القسم (157)، مجلس التأديب (173)، التنسيق الإداري، ومجلس التسيير ولجنة المطعم والصحة.',
      metric: 'محاضر وتقارير جاهزة للطباعة A4',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'legislation',
      title: 'الركن التشريعي والمناشير والمهام',
      badge: 'تحيين 2026',
      description:
        'المرسوم 25-54، القرار 65، القرارات 833 و171، المناشير الوزارية، ومدونة المهام والممنوعات.',
      metric: 'نسخ فوري للمواد القانونية',
      icon: <Scale className="w-5 h-5" />,
    },
    {
      id: 'career',
      title: 'محاكي الدرجات، المنح، والتقاعد',
      badge: activeRole.category2554.split(' ')[0] + ' ' + activeRole.category2554.split(' ')[1],
      description:
        'حساب الراتب الصافي، العلاوات والمردودية، الأقدمية، الترقية في الرتبة والدرجة، والتقاعد (-3 سنوات).',
      metric: `النقطة الاستدلالية: ${activeRole.indexPoints}`,
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: 'documents',
      title: 'حقيبة الوثائق الرسمية A4',
      badge: '7 نماذج رسمية',
      description:
        'إشعارات الغياب، بطاقة السماح بالدخول، تعهد الولي، التقرير اليومي للمداومة، وتقرير المطعم والحوادث.',
      metric: 'طباعة فورية بمعلومات المؤسسة',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 'timetable',
      title: 'جداول المداومة وتوزيع الأجنحة',
      badge: `${activeRole.weeklyHours} س/أسبوع`,
      description:
        activeStage === 'primary'
          ? 'توزيع فترات المرافقة في البوابة، الساحة، المطعم المدرسي، والنوادي الثقافية للمربي المتخصص.'
          : 'توزيع المداومة التربوية للمشرفين والمساعدين عبر الأجنحة، قاعات المذاكرة، المخابر، والنصف داخلي.',
      metric: `${stageTimetable.length} فترات مداومة مبرمجة`,
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: 'digitalization',
      title: 'الربط مع الرقمنة Amatti',
      badge: `${syncRate}% مكتمل`,
      description:
        'مراقبة حجز الغيابات اليومية، الإعفاءات الطبية، وقوائم الإطعام وإشعارات الأولياء عبر الأرضية الرقمية.',
      metric: `${syncedStaffCount}/${stageStaff.length} أجنحة متزامنة`,
      icon: <Database className="w-5 h-5" />,
    },
    {
      id: 'agenda',
      title: 'مفكرة موظف التربية',
      badge: `${stageAgenda.length} استحقاقات`,
      description:
        'الرزنامة اليومية والفصلية للمداومة، مراقبة الكراريس، المطعم المدرسي، والتحضير لمجالس الأقسام.',
      metric: `نسبة الإنجاز: ${agendaProgress}%`,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: 'coordination',
      title: 'فضاء التنسيق الوطني SNTE',
      badge: 'تفاعلي',
      description:
        'منبر التواصل المهني والنقابي بين المربين المتخصصين والمشرفين والمساعدين التربويين عبر الوطن.',
      metric: 'انشغالات ومقترحات الميدان',
      icon: <MessageSquare className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* البانر الرئيسي للداشبورد الشامل */}
      <div className="rounded-2xl bg-gradient-to-l from-[#0e3523] via-[#092317] to-[#06170f] border border-[#d4af37]/50 p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white font-bold">
                البوابة الموحدة لسلك موظفي التربية ({stageCfg.name})
              </span>
              <span className="text-[#f5d77f] font-bold">
                {activeRole.category2554} · النصاب القانوني: {activeRole.weeklyHours} س/أسبوع
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
              الفضاء الرقمي لـ {roleDisplayTitle} — {institution.schoolName}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeRole.coreMission}
            </p>

            {/* بطاقة التأكيد على اختصاص كل طور ورتبة */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div
                onClick={() => onSelectStage('primary')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  activeStage === 'primary'
                    ? 'bg-[#105e32]/80 border-[#d4af37] shadow-md'
                    : 'bg-[#06150e]/80 border-[#d4af37]/25 hover:border-[#d4af37]/60'
                }`}
              >
                <div className="text-[11px] font-black text-[#f5d77f]">
                  1. الطور الابتدائي (سلم /10)
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
                  مربي متخصص / مربي رئيسي
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  تأطير التلاميذ · المطعم المدرسي · الصحة UDS · مواظبة الفترات
                </div>
              </div>

              <div
                onClick={() => onSelectStage('middle')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  activeStage === 'middle'
                    ? 'bg-[#105e32]/80 border-[#d4af37] shadow-md'
                    : 'bg-[#06150e]/80 border-[#d4af37]/25 hover:border-[#d4af37]/60'
                }`}
              >
                <div className="text-[11px] font-black text-[#f5d77f]">
                  2. الطور المتوسط (سلم /20)
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
                  المشرف التربوي والمساعد التربوي
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  الانضباط · كراريس الغياب · بطاقات الدخول · النصف داخلي · BEM
                </div>
              </div>

              <div
                onClick={() => onSelectStage('secondary')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  activeStage === 'secondary'
                    ? 'bg-[#105e32]/80 border-[#d4af37] shadow-md'
                    : 'bg-[#06150e]/80 border-[#d4af37]/25 hover:border-[#d4af37]/60'
                }`}
              >
                <div className="text-[11px] font-black text-[#f5d77f]">
                  3. الطور الثانوي (سلم /20)
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
                  المشرف التربوي والمساعد التربوي
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  مواظبة الشعب والأفواج · المخابر · استدعاءات الأولياء · BAC
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => onNavigate('absences')}
                className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] font-black text-xs flex items-center gap-1.5 shadow hover:brightness-110 transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>فتح سجل الغيابات وبطاقات الدخول ({stageCfg.shortName})</span>
              </button>
              <button
                onClick={() => onNavigate('councils')}
                className="px-3.5 py-2 rounded-lg bg-[#105e32] hover:bg-[#14753e] text-white border border-[#d4af37]/50 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#f5d77f]" />
                <span>المجالس التربوية والإدارية واللجان</span>
              </button>
              <button
                onClick={() => onNavigate('career')}
                className="px-3.5 py-2 rounded-lg bg-[#081a12] hover:bg-[#0d2b1d] text-[#f5d77f] border border-[#d4af37]/40 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>حاسبة الراتب والمنح والتقاعد 25-54</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <div className="bg-[#06170f]/90 border border-[#d4af37]/30 rounded-xl p-3.5 flex items-center gap-3.5 shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#aa771c] text-[#082014] flex items-center justify-center font-black text-lg shadow-lg tabular-nums">
                فـ{institution.currentTerm}
              </div>
              <div>
                <div className="text-[11px] text-slate-400 tabular-nums">
                  الموسم الدراسي: {institution.schoolYear}
                </div>
                <div className="text-xs font-bold text-white">
                  الفصل الدراسي {institution.currentTerm} ({stageCfg.name})
                </div>
                <div className="text-[11px] text-[#e5c158] font-medium tabular-nums">
                  مزامنة الغيابات بالرقمنة: {syncRate}%
                </div>
              </div>
            </div>

            <button
              onClick={onOpenSettings}
              className="px-4 py-2.5 rounded-xl bg-[#105e32] hover:bg-[#157841] text-[#f5d77f] border border-[#d4af37]/50 text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
            >
              <Settings className="w-4 h-4 text-emerald-300" />
              <span>الإعدادات والنسخ الاحتياطي (JSON)</span>
            </button>
          </div>
        </div>
      </div>

      {/* شريط المؤشرات السريعة الـ 6 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          onClick={() => onNavigate('absences')}
          className="p-3.5 rounded-xl bg-[#081a12] border border-rose-800/60 hover:border-[#d4af37] cursor-pointer transition-all shadow-md"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>غيابات التلاميذ ({stageCfg.shortName})</span>
            <UserCheck className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 mt-1 tabular-nums">
            {stageAbsences.length} حالات
          </div>
          <div className="text-[10px] text-slate-300 mt-0.5 tabular-nums">
            {urgentAbsencesCount} تتطلب استدعاء ولي أو تعهد
          </div>
        </div>

        <div
          onClick={() => onNavigate('averages')}
          className="p-3.5 rounded-xl bg-[#081a12] border border-emerald-700/50 hover:border-[#d4af37] cursor-pointer transition-all shadow-md"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>المعدلات والمواظبة</span>
            <Calculator className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1 tabular-nums">
            {passRate}%
          </div>
          <div className="text-[10px] text-slate-300 mt-0.5 tabular-nums">
            المعدل العام: {overallAvg} / {stageCfg.maxGradeScale}
          </div>
        </div>

        <div
          onClick={() => onNavigate('councils')}
          className="p-3.5 rounded-xl bg-[#081a12] border border-purple-800/50 hover:border-[#d4af37] cursor-pointer transition-all shadow-md"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>المجالس واللجان</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1 tabular-nums">
            6 مجالس
          </div>
          <div className="text-[10px] text-purple-300 mt-0.5">
            مجلس القسم · التأديب · المطعم
          </div>
        </div>

        <div
          onClick={() => onNavigate('timetable')}
          className="p-3.5 rounded-xl bg-[#081a12] border border-blue-800/50 hover:border-[#d4af37] cursor-pointer transition-all shadow-md"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>تغطية المداومة والأجنحة</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1 tabular-nums">
            {stageTimetable.length} فترات
          </div>
          <div className="text-[10px] text-blue-300 mt-0.5 tabular-nums">
            النصاب القانوني: {activeRole.weeklyHours} س/أسبوع
          </div>
        </div>

        <div
          onClick={() => onNavigate('digitalization')}
          className="p-3.5 rounded-xl bg-[#081a12] border border-[#d4af37]/40 hover:border-[#d4af37] cursor-pointer transition-all shadow-md"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>مزامنة الرقمنة Amatti</span>
            <Database className="w-4 h-4 text-[#f5d77f]" />
          </div>
          <div className="text-2xl font-black text-[#f5d77f] mt-1 tabular-nums">
            {syncRate}%
          </div>
          <div className="text-[10px] text-slate-300 mt-0.5 tabular-nums">
            {syncedStaffCount}/{stageStaff.length} مؤطرين أتموا المطابقة
          </div>
        </div>

        <div
          onClick={() => onNavigate('career')}
          className="p-3.5 rounded-xl bg-[#081a12] border border-amber-700/50 hover:border-[#d4af37] cursor-pointer transition-all shadow-md"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>المحاكي والمنح والتقاعد</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 mt-1 tabular-nums">
            {activeRole.indexPoints} ن
          </div>
          <div className="text-[10px] text-slate-300 mt-0.5">
            الترقية · الأقدمية · التقاعد (-3 س)
          </div>
        </div>
      </div>

      {/* اللوح الإحصائي البياني الاحترافي لمختلف الأقسام والأفواج التربوية */}
      <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/50 p-5 sm:p-6 shadow-2xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#d4af37]/25 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#d4af37]" />
              <h3 className="text-base sm:text-lg font-black text-white">
                اللوح الإحصائي البياني التفاعلي لمختلف الأقسام والأفواج التربوية ({stageCfg.name})
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              مقارنة بيانية شاملة بين جميع الأقسام المسندة لـ {roleDisplayTitle} من حيث نسب المواظبة والانضباط، التحصيل الدراسي، الإجازات الشرفية، وتعداد الإطعام المدرسي
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedClassFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                selectedClassFilter === 'all'
                  ? 'bg-[#d4af37] text-[#071710] font-black'
                  : 'bg-[#05140d] text-slate-300 hover:text-white border border-[#d4af37]/30'
              }`}
            >
              جميع الأقسام ({classAnalyticsList.length})
            </button>
            {classAnalyticsList.map((cls) => (
              <button
                key={cls.name}
                onClick={() => setSelectedClassFilter(cls.name)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  selectedClassFilter === cls.name
                    ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]'
                    : 'bg-[#05140d] text-slate-300 hover:text-white border border-[#d4af37]/25'
                }`}
              >
                {cls.name}
              </button>
            ))}
          </div>
        </div>

        {/* المخطط البياني بالأعمدة المزدوجة لجميع الأقسام */}
        <div className="p-4 rounded-xl bg-[#05140d] border border-[#d4af37]/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-black text-white">
              المخطط المقارن لمؤشري المواظبة والانضباط (%) ونسبة النجاح والتحكم (%) حسب الأقسام:
            </span>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" />
                <span>نسبة المواظبة والانضباط</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#f5d77f] font-bold">
                <span className="w-3 h-3 rounded-sm bg-[#d4af37] inline-block" />
                <span>نسبة النجاح والتحكم الفصلي</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
            {displayedClasses.map((cls) => (
              <div
                key={cls.name}
                className="p-3.5 rounded-xl bg-[#081a12] border border-[#d4af37]/25 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <div className="text-sm font-black text-white">{cls.name}</div>
                    <div className="text-[10px] text-slate-400">{cls.level}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#105e32]/60 text-[#f5d77f] text-[10px] font-bold tabular-nums">
                    {cls.studentCount} تلميذ
                  </span>
                </div>

                {/* أعمدة بيانية عمودية متناسقة */}
                <div className="h-28 flex items-end justify-center gap-4 px-2 pt-2 border-b border-slate-800/80">
                  <div className="flex flex-col items-center gap-1 w-10">
                    <span className="text-[10px] font-mono font-bold text-emerald-300 tabular-nums">
                      {cls.attendancePercentage}%
                    </span>
                    <div className="w-7 bg-slate-900 rounded-t-md h-20 flex items-end overflow-hidden">
                      <div
                        className="w-full bg-gradient-to-t from-[#105e32] to-emerald-400 rounded-t-md"
                        style={{ height: `${cls.attendancePercentage}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-slate-400">المواظبة</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 w-10">
                    <span className="text-[10px] font-mono font-bold text-[#f5d77f] tabular-nums">
                      {cls.passPercentage}%
                    </span>
                    <div className="w-7 bg-slate-900 rounded-t-md h-20 flex items-end overflow-hidden">
                      <div
                        className="w-full bg-gradient-to-t from-[#9a7418] to-[#f5d77f] rounded-t-md"
                        style={{ height: `${cls.passPercentage}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-slate-400">النجاح</span>
                  </div>
                </div>

                {/* تفاصيل إحصائية للقسم */}
                <div className="space-y-1 text-[11px] tabular-nums">
                  <div className="flex justify-between">
                    <span className="text-slate-400">معدل القسم:</span>
                    <span className="font-mono font-bold text-white">
                      {cls.avgScore} / {stageCfg.maxGradeScale}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">الغيابات المسجلة:</span>
                    <span className="font-mono font-bold text-rose-400">
                      {cls.absencesCount} حالات
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">لوحة الشرف والامتياز:</span>
                    <span className="font-mono font-bold text-emerald-300">
                      {cls.honorCount} تلميذ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      {activeStage === 'primary' ? 'المطعم المدرسي:' : 'النصف داخلي:'}
                    </span>
                    <span className="font-mono font-bold text-[#f5d77f]">
                      {cls.canteenCount} مستفيد
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* بطاقة المهام القانونية للرتبة النشطة */}
      <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#d4af37]/20 pb-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              <h3 className="text-base sm:text-lg font-black text-white">
                مدونة المهام الرسمية لرتبة: {activeRole.title}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeRole.superiorAuthority} — يمكنك تبديل الرتبة لمعاينة مهام كل رتبة
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {stageCfg.availableRoles.map((rId) => {
              const r = STAFF_ROLES[rId];
              const isSelected = institution.activeRoleId === rId;
              return (
                <button
                  key={rId}
                  onClick={() =>
                    onUpdateInstitution({
                      ...institution,
                      activeRoleId: rId,
                      customRoleTitle: r.title,
                    })
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]'
                      : 'bg-[#05140d] text-slate-300 hover:text-white border border-[#d4af37]/25'
                  }`}
                >
                  {r.shortTitle}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeRole.keyDuties.map((duty, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#06150e] border border-[#d4af37]/25 flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-200 leading-relaxed font-medium">
                {duty}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* شبكة الأركان العشرة الشاملة */}
      <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d4af37]/20 pb-3">
          <div>
            <h3 className="text-lg font-black text-white">
              لوحة الأركان الشاملة لمنصة موظفي التربية — مخصصة لـ ({stageCfg.name})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              اضغط على أي ركن للانتقال المباشر إليه ومعاينة السجلات، الحسابات التلقائية، المجالس، والوثائق الخاصة بـ {roleDisplayTitle}
            </p>
          </div>
          <span className="text-xs font-bold bg-[#05140d] text-[#f5d77f] px-3 py-1 rounded-lg border border-[#d4af37]/30 self-start sm:self-auto">
            المرسوم التنفيذي 25-54 · SNTE 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {platformPillars.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => onNavigate(pillar.id)}
              className="cursor-pointer rounded-xl bg-gradient-to-b from-[#0c2419] to-[#05140d] border border-[#d4af37]/30 hover:border-[#d4af37] p-4 transition-all hover:scale-[1.01] shadow-md flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#105e32]/50 border border-[#d4af37]/40 flex items-center justify-center text-[#f5d77f] group-hover:bg-[#8f1414] transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-bold bg-[#081a12] text-[#f5d77f] px-2 py-0.5 rounded border border-[#d4af37]/30">
                    {pillar.badge}
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-white text-sm group-hover:text-[#f5d77f] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#d4af37]/20 flex items-center justify-between text-[11px]">
                <span className="text-emerald-300 font-bold">{pillar.metric}</span>
                <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37] group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* قسم المتابعة الميدانية السريعة: الغيابات اليومية + المداومة التربوية */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="text-sm sm:text-base font-black text-white">
                آخر حالات الغياب والتأخر المسجلة ({stageCfg.name})
              </h3>
            </div>
            <button
              onClick={() => onNavigate('absences')}
              className="text-xs font-bold text-[#f5d77f] hover:underline cursor-pointer"
            >
              عرض سجل المواظبة الكامل ←
            </button>
          </div>

          <div className="space-y-2.5">
            {stageAbsences.map((abs) => (
              <div
                key={abs.id}
                className="p-3.5 rounded-xl bg-[#06150e] border border-[#d4af37]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-white">
                      {abs.personName}
                    </span>
                    <span className="text-[11px] text-[#f5d77f] font-bold">
                      ({abs.classOrRole})
                    </span>
                    <span className="text-[10px] text-slate-400 tabular-nums">
                      · {abs.date} ({abs.durationHours} س)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{abs.reason}</p>
                  <div className="text-[10px] text-emerald-300 font-semibold">
                    المؤطر المسجل: {abs.recordedByRole}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onOpenDocumentGenerator('doc-abs-notice-1')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/40 text-[11px] font-bold cursor-pointer whitespace-nowrap"
                  >
                    استدعاء الولي A4
                  </button>
                  <button
                    onClick={() => onOpenDocumentGenerator('doc-entry-ticket')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#0b2318] hover:bg-[#103824] text-white border border-[#d4af37]/30 text-[11px] font-bold cursor-pointer whitespace-nowrap"
                  >
                    بطاقة دخول
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#d4af37]" />
              <h3 className="text-sm sm:text-base font-black text-white">
                توزيع المداومة التربوية والأجنحة ({stageCfg.shortName})
              </h3>
            </div>
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs font-bold text-[#f5d77f] hover:underline cursor-pointer"
            >
              تعديل الجدول ←
            </button>
          </div>

          <div className="space-y-2.5">
            {stageTimetable.map((slot) => (
              <div
                key={slot.id}
                className="p-3.5 rounded-xl bg-[#06150e] border border-[#d4af37]/25 space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-[#f5d77f]">
                    {slot.day} · {slot.period}
                  </span>
                  <span className="text-[11px] text-emerald-300 font-bold">
                    {slot.roleTitle}
                  </span>
                </div>
                <div className="text-xs font-bold text-white">
                  {slot.zone} — ({slot.assignedStaff})
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {slot.taskDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
