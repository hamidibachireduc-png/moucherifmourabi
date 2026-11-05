import React, { useState, useEffect } from 'react';
import {
  Scale,
  Search,
  BookOpen,
  Copy,
  Check,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Plus,
  Trash2,
  Download,
  Printer,
  Calendar,
  Clock,
  Save,
  FolderOpen,
} from 'lucide-react';
import {
  EducationStage,
  InstitutionInfo,
  LegalDocument,
  StaffRoleId,
} from '../types';
import {
  DEFAULT_INSTITUTIONS,
  LEGAL_DOCUMENTS,
  STAFF_ROLES,
  STAGE_CONFIGS,
} from '../data/mockData';

interface LegislationSectionProps {
  activeStage: EducationStage;
  institution?: InstitutionInfo;
}

export interface DailyMemoTaskItem {
  id: string;
  timeSlot: string;
  locationZone: string;
  activityTitle: string;
  legalBasis: string;
  status: 'completed' | 'in_progress' | 'observation';
  notes: string;
}

export interface SavedDailyMemo {
  id: string;
  memoNumber: string;
  memoDate: string;
  roleId: StaffRoleId;
  roleCustomTitle: string;
  staffName: string;
  schoolName: string;
  wilaya: string;
  wingOrSector: string;
  presentStudentsCount: string;
  recordedAbsencesCount: string;
  ticketsOrMealsCount: string;
  tasks: DailyMemoTaskItem[];
  generalConclusion: string;
}

const DEFAULT_ROLE_MEMO_TEMPLATES: Record<
  'supervisor' | 'assistant' | 'primary_educator',
  {
    wingDefault: string;
    ticketsLabel: string;
    ticketsDefault: string;
    tasks: Omit<DailyMemoTaskItem, 'id'>[];
    conclusionDefault: string;
  }
> = {
  primary_educator: {
    wingDefault: 'البوابة الرئيسية · الساحة · المطعم المدرسي · وحدة الكشف الصحي UDS',
    ticketsLabel: 'تعداد وجبات المطعم المدرسي المقدمة',
    ticketsDefault: '132 وجبة ساخنة (تم رفع الوجبة الشاهدة)',
    tasks: [
      {
        timeSlot: '07:45 - 08:15',
        locationZone: 'البوابة والساحة الرئيسية',
        activityTitle:
          'استقبال التلاميذ عند المدخل، تنظيم الصفوف، وتأطير تحية العلم الوطني والنشيد الرسمي',
        legalBasis: 'المادة 84 من المرسوم التنفيذي 25-54',
        status: 'completed',
        notes: 'دخول منتظم لجميع الأفواج التربوية (1 إب - 5 إب)',
      },
      {
        timeSlot: '08:15 - 10:00',
        locationZone: 'الأقسام والإدارة',
        activityTitle:
          'ضبط غيابات وتأخرات الفترة الصباحية ومطابقتها مع قائمة التلاميذ الحاضرين في المطعم المدرسي',
        legalBasis: 'القرار 833 والمنشور التنظيمي للمدارس الابتدائية',
        status: 'completed',
        notes: 'تسجيل 03 غيابات مبررة وإبلاغ السيد مدير المدرسة',
      },
      {
        timeSlot: '10:00 - 10:20',
        locationZone: 'ساحة المدرسة',
        activityTitle:
          'المرافقة التربوية والوقائية للتلاميذ خلال فترة الاستراحة الصباحية ومراقبة النظافة',
        legalBasis: 'المادة 84 من المرسوم 25-54 والقرار 171',
        status: 'completed',
        notes: 'انضباط تام وسير عادي للاستراحة دون حوادث',
      },
      {
        timeSlot: '11:15 - 13:00',
        locationZone: 'المطعم المدرسي',
        activityTitle:
          'الإشراف التربوي على الإطعام المدرسي، مراقبة غسل اليدين، وتوثيق الوجبة الشاهدة',
        legalBasis: 'المرسوم التنفيذي 18-03 المتضمن نظام المطاعم المدرسية',
        status: 'completed',
        notes: 'حفظ عينة الوجبة الشاهدة في الثلاجة لمدة 48 ساعة',
      },
      {
        timeSlot: '13:15 - 15:30',
        locationZone: 'الأقسام + نادي المطالعة / UDS',
        activityTitle:
          'مراقبة مواظبة الفترة المسائية، تنشيط حصة القراءة، وتأطير خروج التلاميذ بأمان',
        legalBasis: 'المرسوم التنفيذي 25-54 ومدونة مهام المربي المتخصص',
        status: 'completed',
        notes: 'تسليم التلاميذ لأوليائهم عند نهاية الدوام الرسمي',
      },
    ],
    conclusionDefault:
      'تم إنجاز جميع المهام التربوية والصحية والغذائية المبرمجة لليوم وفق أحكام المرسوم التنفيذي 25-54 والمرسوم 18-03، مع تسجيل انضباط تام في الساحة والمطعم المدرسي.',
  },
  supervisor: {
    wingDefault: 'الجناح البيداغوجي (أ) + مكتب الاستشارة والغيابات + المخابر',
    ticketsLabel: 'بطاقات السماح بالدخول واستدعاءات الأولياء',
    ticketsDefault: '09 بطاقات دخول مسلمة · 03 إشعارات غياب محررة',
    tasks: [
      {
        timeSlot: '07:45 - 08:30',
        locationZone: 'المدخل والساحة والجناح (أ)',
        activityTitle:
          'مراقبة حركة دخول التلاميذ، تأطير تحية العلم، وضبط التحاق الأفواج بالحجرات والمخابر',
        legalBasis: 'المادة 88 من المرسوم 25-54 والقرار الوزاري 65',
        status: 'completed',
        notes: 'معالجة التأخرات الصباحية وتسليم بطاقات الدخول',
      },
      {
        timeSlot: '08:30 - 10:00',
        locationZone: 'مكتب المشرف التربوي',
        activityTitle:
          'تدقيق كراريس الغيابات للحصتين 1 و2، مطابقتها مع البطاقيات، وحجز الغيابات في الرقمنة Amatti',
        legalBasis: 'المادة 14 من القرار 65 والقرار الوزاري 833',
        status: 'completed',
        notes: 'حجز الغيابات اليومية وإرسال الإشعارات الآلية للأولياء',
      },
      {
        timeSlot: '10:00 - 12:00',
        locationZone: 'مكتب الاستشارة + الأجنحة',
        activityTitle:
          'استقبال أولياء التلاميذ لتبرير الغيابات، تحرير محاضر التعهد والالتزام، ومراقبة حركة الاستراحة',
        legalBasis: 'القرار الوزاري 171 والقرار 833',
        status: 'completed',
        notes: 'استقبال 04 أولياء وتوقيع تعهدين كتابيين بالمواظبة',
      },
      {
        timeSlot: '12:00 - 13:30',
        locationZone: 'النظام نصف الداخلي / المطعم',
        activityTitle:
          'المشاركة في تأطير التلاميذ النصف داخليين وضبط النظام العام خلال فترة منتصف النهار',
        legalBasis: 'المادة 19 من القرار 65 والمرسوم 25-54',
        status: 'completed',
        notes: 'تفويج منظم للتلاميذ النصف داخليين',
      },
      {
        timeSlot: '13:30 - 16:30',
        locationZone: 'الأجنحة البيداغوجية والمخابر',
        activityTitle:
          'مراقبة مواظبة الفترة المسائية وحصص الأعمال المخبرية، وغلق السجل اليومي للغيابات',
        legalBasis: 'المادة 88 و91 من المرسوم التنفيذي 25-54',
        status: 'completed',
        notes: 'تأشير كراريس الغياب ورفع الحوصلة اليومية لمستشار التربية',
      },
    ],
    conclusionDefault:
      'سير حسن ومنتظم للدراسة والانضباط العام عبر الأجنحة البيداغوجية والمخابر، وتمت مطابقة كافة كراريس الغيابات اليومية وحجزها في الأرضية الرقمية.',
  },
  assistant: {
    wingDefault: 'الساحة الرئيسية · الأجنحة · قاعة المذاكرة والمداومة · المطعم',
    ticketsLabel: 'الأفواج المؤطرة في قاعة المداومة وكراريس الغياب',
    ticketsDefault: 'جمع 14 كراس غياب · تأطير فوجين في قاعة المذاكرة',
    tasks: [
      {
        timeSlot: '07:45 - 08:30',
        locationZone: 'البوابة والساحة والأروقة',
        activityTitle:
          'المراقبة الفعلية للتلاميذ عند الدخول، تنظيم الاصطفاف، ومرافقة الأفواج نحو الأقسام',
        legalBasis: 'المادة 94 من المرسوم 25-54 والقرار 65',
        status: 'completed',
        notes: 'مراقبة الهندام المدرسي وبطاقات التلاميذ عند المدخل',
      },
      {
        timeSlot: '08:30 - 10:00',
        locationZone: 'الأجنحة التربوية',
        activityTitle:
          'جمع كراريس الغيابات من الأقسام في بداية كل حصة وتدوين الغائبين في السجل اليومي',
        legalBasis: 'المادة 14 من القرار الوزاري 65',
        status: 'completed',
        notes: 'جمع ومطابقة جميع كراريس الغياب للأفواج المسندة',
      },
      {
        timeSlot: '10:00 - 12:00',
        locationZone: 'قاعة المداومة والمذاكرة المحروسة',
        activityTitle:
          'تأطير وحراسة التلاميذ في قاعة المذاكرة المحروسة أثناء غياب الأستاذ ومراقبة الاستراحة',
        legalBasis: 'المادة 94 من المرسوم التنفيذي 25-54',
        status: 'completed',
        notes: 'تأطير الفوج التربوي في قاعة المراجعة والهدوء التام',
      },
      {
        timeSlot: '12:00 - 13:30',
        locationZone: 'المطعم المدرسي والنادي',
        activityTitle:
          'مرافقة وحراسة التلاميذ النصف داخليين في المطعم المدرسي والساحة خلال فترة الراحة',
        legalBasis: 'المادة 19 من القرار 65',
        status: 'completed',
        notes: 'انضباط تام داخل قاعة الإطعام والساحة',
      },
      {
        timeSlot: '13:30 - 16:30',
        locationZone: 'الأجنحة والبوابة',
        activityTitle:
          'جمع كراريس الغياب للفترة المسائية، تبليغ استدعاءات الأولياء، ومراقبة خروج التلاميذ',
        legalBasis: 'المرسوم التنفيذي 25-54 والقرار 171',
        status: 'completed',
        notes: 'إرجاع الكراريس لخزانة الاستشارة وغلق الجناح بأمان',
      },
    ],
    conclusionDefault:
      'تمت المراقبة الفعلية للتلاميذ في الساحة والأجنحة وقاعة المداومة والمطعم، وجمع كافة كراريس الغيابات اليومية في الفترتين الصباحية والمسائية بانتظام.',
  },
};

function getTemplateCategoryForRole(
  roleId: StaffRoleId
): 'supervisor' | 'assistant' | 'primary_educator' {
  if (
    roleId === 'primary_specialized_educator' ||
    roleId === 'primary_principal_educator'
  ) {
    return 'primary_educator';
  }
  if (
    roleId === 'educational_assistant' ||
    roleId === 'principal_assistant'
  ) {
    return 'assistant';
  }
  return 'supervisor';
}

const DETAILED_DUTIES_BY_STAGE: Record<
  EducationStage,
  {
    daily: string[];
    weekly: string[];
    termly: string[];
    prohibited: string[];
  }
> = {
  primary: {
    daily: [
      'استقبال تلاميذ المدرسة الابتدائية عند البوابة صباحاً ومساءً وتأطير تحية العلم الوطني',
      'ضبط غيابات وتأخرات التلاميذ بالفترات (الفترة الصباحية والفترة المسائية) وإبلاغ الإدارة',
      'تأطير التلاميذ المستفيدين من المطعم المدرسي، مراقبة نظافة اليدين، وتدوين التعداد اليومي الفعلي',
      'حفظ ومراقبة عينة الوجبة الشاهدة لمدة 48 ساعة بالتنسيق مع مدير المدرسة الابتدائية',
      'ضمان أمن وانضباط التلاميذ في الساحة خلال فترات الاستراحة وبين الفترتين',
    ],
    weekly: [
      'تنشيط النوادي الثقافية والتربوية (نادي القراءة والمطالعة، النادي البيئي، الرسم والمسرح)',
      'مرافقة الأفواج المبرمجة إلى وحدة الكشف والمتابعة الصحية (UDS) للفحص الطبي الدوري',
      'حجز ومطابقة الغيابات الأسبوعية وقوائم الإطعام المدرسي في الأرضية الرقمية',
    ],
    termly: [
      'إعداد الحصيلة الفصلية لمواظبة التلاميذ وتقديمها في جلسات مجلس الأساتذة',
      'المشاركة في التنظيم المادي والتربوي لاختبارات الفصل وتقييم المكتسبات (السنة 5 ابتدائي)',
      'جرد وضبط البطاقيات الصحية والاجتماعية للتلاميذ المعوزين والمستفيدين من المنحة والكتاب',
    ],
    prohibited: [
      'يمنع تكليف المربي المتخصص في الابتدائي بتدريس حصة بيداغوجية كاملة بدلاً عن الأستاذ الغائب (مهمته التأطير والمرافقة التربوية فقط)',
      'يمنع تكليفه بمهام الحجابة أو البواب أو تنظيف المرافق أو الطبخ في المطعم المدرسي',
      'يمنع إخراج أي تلميذ قبل نهاية الدوام الرسمي دون حضور الولي الشرعي شخصياً وتوقيع سجل الخروج',
    ],
  },
  middle: {
    daily: [
      'مراقبة حركة دخول وخروج التلاميذ وضمان النظام والانضباط في الأجنحة والساحة',
      'جمع كراريس الغيابات من الأقسام في الساعة الأولى من كل فترة وتفريغها في السجل اليومي',
      'تسليم بطاقات السماح بالدخول للأقسام بعد دراسة التبرير أو حضور الولي الشرعي',
      'تأطير التلاميذ في قاعات المذاكرة والمداومة التربوية ومطعم النظام نصف الداخلي',
      'تحرير الإشعارات الأولى والثانية بالغياب واستدعاءات الأولياء وتدوين محاضر التعهد',
    ],
    weekly: [
      'مطابقة كراريس الغيابات مع السجل اليومي وحجز الغيابات والتأخرات في الأرضية الرقمية Amatti',
      'استقبال أولياء التلاميذ في الأيام المحددة والتكفل بالحالات الانضباطية بالتنسيق مع مستشار التربية',
      'تأطير الأنشطة الثقافية والرياضية المدرسية في أمسية الثلاثاء',
    ],
    termly: [
      'حساب نقاط المواظبة والانضباط وإعداد القوائم الاسمية للتلاميذ المقترحين للإجازات (لوحة الشرف / تشجيع / تهنئة)',
      'المشاركة في تحضير ملفات مجالس الأقسام ومجلس التأديب (القراران 157 و173)',
      'المساهمة في تنظيم ومراقبة الفروض والاختبارات الفصلية وامتحان شهادة التعليم المتوسط BEM',
    ],
    prohibited: [
      'يمنع تكليف المشرف أو المساعد التربوي بمهام الحجابة أو الحراسة الليلية أو صيانة المؤسسة (المادة 25 من القرار 65)',
      'يمنع تكليفه بقبض الأموال النقدية أو التسيير المالي والمحاسبي التابع للمقتصدية',
      'يمنع تكليفه بتعويض الأستاذ في إلقاء الدروس المقررة في المنهاج الدراسي',
    ],
  },
  secondary: {
    daily: [
      'ضبط حركة التلاميذ بين الحجرات والمخابر العلمية والورشات حسب تفويج الشعب والجذوع',
      'مراقبة كراريس الغيابات ساعة بساعة ومتابعة مواظبة أقسام البكالوريا (3 ثانوي) بصرامة',
      'تسليم أوراق السماح بالدخول ومعالجة التأخرات الصباحية وإشعار الأولياء آنياً عبر الرقمنة',
      'تأطير قاعات المراجعة الحرة والمذاكرة المحروسة والنظام نصف الداخلي والداخلي',
    ],
    weekly: [
      'إعداد الحوصلة الأسبوعية لغيابات التلاميذ حسب الشعب وعرضها على مستشار التربية والناظر',
      'مرافقة الأساتذة الرئيسيين ومستشار التوجيه في متابعة التلاميذ المتأخرين أو المنقطعين',
      'تدقيق قوائم الإعفاءات الطبية في التربية البدنية ومطابقتها مع ملفات وحدة الكشف الصحي UDS',
    ],
    termly: [
      'حساب معدلات المواظبة وتحرير التقارير الفصلية المعروضة أمام مجالس الأقسام (القرار 157)',
      'تنظيم أمانة وحراسة مراكز إجراء الفروض والاختبارات الفصلية وشهادة البكالوريا BAC',
      'المشاركة في أشغال مجلس التوجيه والتسيير (COG) ومجلس التأديب عند الاقتضاء',
    ],
    prohibited: [
      'يمنع إسناد مهام الحراسة الليلية لغير المقيمين أو مهام البواب والحجابة لمشرفي ومساعدي التربية',
      'يمنع تكليف موظف التربية بأعمال المحاسبة المالية أو جرد المخازن التابعة للمصالح الاقتصادية',
      'يمنع تسليم وثائق مدرسية رسمية أو إخراج تلميذ قاصر دون ترخيص قانوني وحضور الولي',
    ],
  },
};

const MEMOS_STORAGE_KEY = 'snte_educ_staff_daily_memos_2026_v1';

export const LegislationSection: React.FC<LegislationSectionProps> = ({
  activeStage,
  institution,
}) => {
  const stageCfg = STAGE_CONFIGS[activeStage];
  const currentInst = institution || DEFAULT_INSTITUTIONS[activeStage];

  const [activeViewTab, setActiveViewTab] = useState<
    'texts' | 'duties_matrix' | 'daily_memo'
  >('daily_memo');

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument>(
    LEGAL_DOCUMENTS[0]
  );
  const [selectedRoleForDuties, setSelectedRoleForDuties] =
    useState<StaffRoleId>(currentInst.activeRoleId || stageCfg.defaultRole);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // حالة منشئ مذكرة المهام اليومية (PDF)
  const [memoRoleId, setMemoRoleId] = useState<StaffRoleId>(
    currentInst.activeRoleId || stageCfg.defaultRole
  );
  const [memoDate, setMemoDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [memoNumber, setMemoNumber] = useState<string>('م.ي / 042 / 2026');
  const [memoStaffName, setMemoStaffName] = useState<string>(
    currentInst.staffName
  );
  const [memoSchoolName, setMemoSchoolName] = useState<string>(
    currentInst.schoolName
  );
  const [memoWilaya, setMemoWilaya] = useState<string>(currentInst.wilaya);
  const [memoWing, setMemoWing] = useState<string>(
    DEFAULT_ROLE_MEMO_TEMPLATES[
      getTemplateCategoryForRole(currentInst.activeRoleId || stageCfg.defaultRole)
    ].wingDefault
  );
  const [presentStudentsCount, setPresentStudentsCount] =
    useState<string>('412 تلميذاً حاضراً');
  const [recordedAbsencesCount, setRecordedAbsencesCount] =
    useState<string>('08 غيابات · 03 تأخرات');
  const [ticketsOrMealsCount, setTicketsOrMealsCount] = useState<string>(
    DEFAULT_ROLE_MEMO_TEMPLATES[
      getTemplateCategoryForRole(currentInst.activeRoleId || stageCfg.defaultRole)
    ].ticketsDefault
  );
  const [memoTasks, setMemoTasks] = useState<DailyMemoTaskItem[]>(() => {
    const cat = getTemplateCategoryForRole(
      currentInst.activeRoleId || stageCfg.defaultRole
    );
    return DEFAULT_ROLE_MEMO_TEMPLATES[cat].tasks.map((t, idx) => ({
      ...t,
      id: `task-init-${idx}`,
    }));
  });
  const [memoConclusion, setMemoConclusion] = useState<string>(
    DEFAULT_ROLE_MEMO_TEMPLATES[
      getTemplateCategoryForRole(currentInst.activeRoleId || stageCfg.defaultRole)
    ].conclusionDefault
  );

  // حقول إضافة بند نشاط جديد للمذكرة اليومية
  const [newTimeSlot, setNewTimeSlot] = useState('10:15 - 11:15');
  const [newLocationZone, setNewLocationZone] = useState('الجناح التربوي / الساحة');
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newLegalBasis, setNewLegalBasis] = useState(
    'المرسوم التنفيذي 25-54 والقرار 65'
  );
  const [newTaskNotes, setNewTaskNotes] = useState('أنجزت بانتظام');

  // سجل المذكرات اليومية المحفوظة محلياً
  const [savedMemos, setSavedMemos] = useState<SavedDailyMemo[]>(() => {
    try {
      const raw = localStorage.getItem(MEMOS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [saveToast, setSaveToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(MEMOS_STORAGE_KEY, JSON.stringify(savedMemos));
    } catch {
      // ignore storage errors
    }
  }, [savedMemos]);

  // تحديث بيانات المؤسسة عند تغيير الطور
  useEffect(() => {
    setMemoStaffName(currentInst.staffName);
    setMemoSchoolName(currentInst.schoolName);
    setMemoWilaya(currentInst.wilaya);
    handleSelectMemoRole(currentInst.activeRoleId || stageCfg.defaultRole);
  }, [activeStage, currentInst.schoolName, currentInst.staffName, currentInst.wilaya, currentInst.activeRoleId, stageCfg.defaultRole]);

  const handleSelectMemoRole = (roleId: StaffRoleId) => {
    setMemoRoleId(roleId);
    const cat = getTemplateCategoryForRole(roleId);
    const tpl = DEFAULT_ROLE_MEMO_TEMPLATES[cat];
    setMemoWing(tpl.wingDefault);
    setTicketsOrMealsCount(tpl.ticketsDefault);
    setMemoTasks(
      tpl.tasks.map((t, i) => ({
        ...t,
        id: `task-${roleId}-${Date.now()}-${i}`,
      }))
    );
    setMemoConclusion(tpl.conclusionDefault);
  };

  const handleAddMemoTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityTitle.trim()) return;
    const item: DailyMemoTaskItem = {
      id: `task-${Date.now()}`,
      timeSlot: newTimeSlot,
      locationZone: newLocationZone,
      activityTitle: newActivityTitle.trim(),
      legalBasis: newLegalBasis,
      status: 'completed',
      notes: newTaskNotes,
    };
    setMemoTasks([...memoTasks, item]);
    setNewActivityTitle('');
  };

  const handleDeleteMemoTask = (id: string) => {
    setMemoTasks(memoTasks.filter((t) => t.id !== id));
  };

  const handleUpdateMemoTaskStatus = (
    id: string,
    status: DailyMemoTaskItem['status']
  ) => {
    setMemoTasks(
      memoTasks.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const handleSaveCurrentMemoToArchive = () => {
    const roleSpec = STAFF_ROLES[memoRoleId];
    const entry: SavedDailyMemo = {
      id: `memo-${Date.now()}`,
      memoNumber,
      memoDate,
      roleId: memoRoleId,
      roleCustomTitle: roleSpec.title,
      staffName: memoStaffName,
      schoolName: memoSchoolName,
      wilaya: memoWilaya,
      wingOrSector: memoWing,
      presentStudentsCount,
      recordedAbsencesCount,
      ticketsOrMealsCount,
      tasks: memoTasks,
      generalConclusion: memoConclusion,
    };
    setSavedMemos([entry, ...savedMemos]);
    setSaveToast(
      `تم حفظ مذكرة المهام اليومية ليوم ${memoDate} (${roleSpec.shortTitle}) في الأرشيف المحلي.`
    );
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleLoadSavedMemo = (memo: SavedDailyMemo) => {
    setMemoNumber(memo.memoNumber);
    setMemoDate(memo.memoDate);
    setMemoRoleId(memo.roleId);
    setMemoStaffName(memo.staffName);
    setMemoSchoolName(memo.schoolName);
    setMemoWilaya(memo.wilaya);
    setMemoWing(memo.wingOrSector);
    setPresentStudentsCount(memo.presentStudentsCount);
    setRecordedAbsencesCount(memo.recordedAbsencesCount);
    setTicketsOrMealsCount(memo.ticketsOrMealsCount);
    setMemoTasks(memo.tasks);
    setMemoConclusion(memo.generalConclusion);
    setSaveToast(`تم استرجاع مذكرة يوم ${memo.memoDate} للمعاينة والتصدير PDF.`);
    setTimeout(() => setSaveToast(null), 2500);
  };

  const handleExportMemoPDF = () => {
    const roleSpec = STAFF_ROLES[memoRoleId];
    const prevTitle = document.title;
    const cleanRole = roleSpec.shortTitle.replace(/\s+/g, '_');
    document.title = `مذكرة_المهام_اليومية_${cleanRole}_${memoDate}`;
    window.print();
    setTimeout(() => {
      document.title = prevTitle;
    }, 1000);
  };

  const filteredDocs = LEGAL_DOCUMENTS.filter((doc) => {
    if (categoryFilter !== 'all' && doc.category !== categoryFilter)
      return false;
    if (
      searchQuery.trim() &&
      !doc.title.includes(searchQuery.trim()) &&
      !doc.description.includes(searchQuery.trim()) &&
      !doc.fullText.includes(searchQuery.trim())
    ) {
      return false;
    }
    return true;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const stageDuties = DETAILED_DUTIES_BY_STAGE[activeStage];
  const currentRoleSpec =
    STAFF_ROLES[selectedRoleForDuties] || STAFF_ROLES[stageCfg.defaultRole];
  const activeMemoRoleSpec =
    STAFF_ROLES[memoRoleId] || STAFF_ROLES[stageCfg.defaultRole];
  const activeMemoCategory = getTemplateCategoryForRole(memoRoleId);

  return (
    <div className="space-y-6">
      {/* ترويسة الركن التشريعي ومدونة المهام ومولد المذكرة اليومية PDF */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl no-print">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs mb-1.5">
              <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white font-bold">
                الركن التشريعي، مدونة المهام، ومولد مذكرة المهام اليومية PDF ({stageCfg.name})
              </span>
              <span className="text-[#d4af37] font-semibold">
                المرسوم 25-54 · القرار 65 · القرارات 833 و171 و157 · المرسوم 18-03
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#d4af37]" />
              <span>
                الركن التشريعي وتوثيق مذكرة المهام اليومية (مشرف · مساعد · مربي متخصص)
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              موسوعة النصوص والمناشير الوزارية، مدونة المهام الرسمية، ومنشئ مذكرات المهام اليومية الخاصة بكل رتبة مع إمكانية الحفظ والتصدير المباشر كملف PDF بمقاس A4 الرسمي.
            </p>
          </div>

          {/* أزرار التبديل بين التبويبات الثلاثة */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0 bg-[#05140d] p-1.5 rounded-xl border border-[#d4af37]/40">
            <button
              onClick={() => setActiveViewTab('daily_memo')}
              className={`px-3.5 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
                activeViewTab === 'daily_memo'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>مذكرة المهام اليومية (تصدير PDF)</span>
            </button>
            <button
              onClick={() => setActiveViewTab('texts')}
              className={`px-3.5 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
                activeViewTab === 'texts'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>المراسيم والمناشير ({LEGAL_DOCUMENTS.length})</span>
            </button>
            <button
              onClick={() => setActiveViewTab('duties_matrix')}
              className={`px-3.5 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
                activeViewTab === 'duties_matrix'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>مدونة المهام والضمانات المهنية</span>
            </button>
          </div>
        </div>
      </div>

      {/* التبويب الجديد: منشئ مذكرة المهام اليومية الخاصة بكل رتبة وتصديرها PDF */}
      {activeViewTab === 'daily_memo' && (
        <div className="space-y-6">
          {saveToast && (
            <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-[#d4af37] text-white text-xs font-bold flex items-center gap-2 shadow-lg no-print">
              <CheckCircle2 className="w-4 h-4 text-[#f5d77f] shrink-0" />
              <span>{saveToast}</span>
            </div>
          )}

          {/* شريط اختيار الرتبة لتحميل قالب المهام اليومية الخاص بها */}
          <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4 no-print">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#d4af37]/20 pb-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                  <span>
                    1. اختر الرتبة الوظيفية لتوليد مذكرة المهام اليومية المطابقة (مشرف · مساعد · مربي متخصص):
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  يتم تلقائياً تحميل المهام اليومية القانونية والمراجع التشريعية الخاصة بالرتبة المختارة مع إمكانية التعديل والإضافة
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCurrentMemoToArchive}
                  className="px-3.5 py-2 rounded-xl bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ المذكرة في السجل</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportMemoPDF}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-lg hover:brightness-110"
                >
                  <Download className="w-4 h-4" />
                  <span>تصدير مذكرة المهام كملف PDF (A4)</span>
                </button>
              </div>
            </div>

            {/* أزرار الفئات الثلاث الكبرى + الرتب الـ 7 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                onClick={() => handleSelectMemoRole('primary_specialized_educator')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  activeMemoCategory === 'primary_educator'
                    ? 'bg-[#103824] border-[#d4af37] shadow-md'
                    : 'bg-[#05140d] border-[#d4af37]/25 hover:border-[#d4af37]/60'
                }`}
              >
                <div className="text-xs font-black text-[#f5d77f]">
                  أ) سلك المربين المتخصصين (الطور الابتدائي)
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  مربي متخصص / مربي متخصص رئيسي: البوابة، الساحة، المطعم المدرسي، الوجبة الشاهدة، والصحة المدرسية UDS.
                </div>
              </div>

              <div
                onClick={() => handleSelectMemoRole('educational_supervisor')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  activeMemoCategory === 'supervisor'
                    ? 'bg-[#103824] border-[#d4af37] shadow-md'
                    : 'bg-[#05140d] border-[#d4af37]/25 hover:border-[#d4af37]/60'
                }`}
              >
                <div className="text-xs font-black text-[#f5d77f]">
                  ب) سلك مشرفي التربية (المتوسط والثانوي)
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  مشرف التربية / مشرف رئيسي / مشرف عام: ضبط الأجنحة، تدقيق كراريس الغياب، بطاقات الدخول، واستقبال الأولياء والرقمنة.
                </div>
              </div>

              <div
                onClick={() => handleSelectMemoRole('educational_assistant')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  activeMemoCategory === 'assistant'
                    ? 'bg-[#103824] border-[#d4af37] shadow-md'
                    : 'bg-[#05140d] border-[#d4af37]/25 hover:border-[#d4af37]/60'
                }`}
              >
                <div className="text-xs font-black text-[#f5d77f]">
                  ج) سلك المساعدين التربويين (المتوسط والثانوي)
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  مساعد تربوي / مساعد رئيسي للتربية: المراقبة الفعلية، جمع كراريس الغياب، تأطير قاعة المداومة، ومرافقة النصف داخلي.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#d4af37]">
                تخصيص الرتبة الدقيقة للمذكرة:
              </span>
              {(Object.keys(STAFF_ROLES) as StaffRoleId[]).map((rId) => {
                const r = STAFF_ROLES[rId];
                const isSelected = memoRoleId === rId;
                return (
                  <button
                    key={rId}
                    type="button"
                    onClick={() => handleSelectMemoRole(rId)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]'
                        : 'bg-[#05140d] text-slate-300 hover:text-white border border-[#d4af37]/20'
                    }`}
                  >
                    {r.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* العمود الأيمن: تحرير بيانات المذكرة وإضافة الأنشطة الميدانية */}
            <div className="lg:col-span-5 space-y-4 no-print">
              <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-3 text-xs">
                <h4 className="font-black text-[#f5d77f] text-sm border-b border-[#d4af37]/20 pb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>بيانات ترويسة المذكرة اليومية وإحصاء اليوم:</span>
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      تاريخ المذكرة اليومية:
                    </label>
                    <input
                      type="date"
                      value={memoDate}
                      onChange={(e) => setMemoDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      رقم المذكرة:
                    </label>
                    <input
                      type="text"
                      value={memoNumber}
                      onChange={(e) => setMemoNumber(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      اسم ولقب الموظف المؤطر:
                    </label>
                    <input
                      type="text"
                      value={memoStaffName}
                      onChange={(e) => setMemoStaffName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      المؤسسة التربوية:
                    </label>
                    <input
                      type="text"
                      value={memoSchoolName}
                      onChange={(e) => setMemoSchoolName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    الجناح التربوي / القطاع المؤطر:
                  </label>
                  <input
                    type="text"
                    value={memoWing}
                    onChange={(e) => setMemoWing(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      التعداد الحاضر:
                    </label>
                    <input
                      type="text"
                      value={presentStudentsCount}
                      onChange={(e) => setPresentStudentsCount(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      الغيابات والتأخرات:
                    </label>
                    <input
                      type="text"
                      value={recordedAbsencesCount}
                      onChange={(e) => setRecordedAbsencesCount(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      المطعم / بطاقات الدخول:
                    </label>
                    <input
                      type="text"
                      value={ticketsOrMealsCount}
                      onChange={(e) => setTicketsOrMealsCount(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    الحوصلة الختامية والملاحظات المسجلة:
                  </label>
                  <textarea
                    rows={2}
                    value={memoConclusion}
                    onChange={(e) => setMemoConclusion(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white leading-relaxed"
                  />
                </div>
              </div>

              {/* إضافة نشاط يومي جديد إلى جدول المذكرة */}
              <form
                onSubmit={handleAddMemoTask}
                className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-3 text-xs"
              >
                <h4 className="font-black text-emerald-300 text-sm border-b border-[#d4af37]/20 pb-2 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>إدراج نشاط ميداني أو مهمة إضافية في مذكرة اليوم:</span>
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      الفترة / التوقيت:
                    </label>
                    <input
                      type="text"
                      value={newTimeSlot}
                      onChange={(e) => setNewTimeSlot(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      المكان / المرفق:
                    </label>
                    <input
                      type="text"
                      value={newLocationZone}
                      onChange={(e) => setNewLocationZone(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    وصف النشاط التربوي / الإداري المنجز:
                  </label>
                  <input
                    type="text"
                    value={newActivityTitle}
                    onChange={(e) => setNewActivityTitle(e.target.value)}
                    placeholder="مثال: مرافقة التلاميذ لوحدة الكشف الصحي UDS / تأطير قاعة المداومة..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      السند التشريعي:
                    </label>
                    <input
                      type="text"
                      value={newLegalBasis}
                      onChange={(e) => setNewLegalBasis(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      الملاحظة الميدانية:
                    </label>
                    <input
                      type="text"
                      value={newTaskNotes}
                      onChange={(e) => setNewTaskNotes(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/50 font-black flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة البند إلى جدول المذكرة اليومية</span>
                </button>
              </form>

              {/* أرشيف المذكرات اليومية المحفوظة */}
              {savedMemos.length > 0 && (
                <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-4 shadow-2xl space-y-2.5 text-xs">
                  <div className="font-black text-[#f5d77f] flex items-center gap-1.5">
                    <FolderOpen className="w-4 h-4" />
                    <span>المذكرات اليومية الموثقة والمحفوظة ({savedMemos.length}):</span>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {savedMemos.map((sm) => (
                      <div
                        key={sm.id}
                        className="p-2.5 rounded-xl bg-[#05140d] border border-[#d4af37]/25 flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="font-bold text-white">
                            {sm.memoDate} — {sm.roleCustomTitle}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            رقم: {sm.memoNumber} · ({sm.tasks.length} مهام موثقة)
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleLoadSavedMemo(sm)}
                          className="px-2.5 py-1 rounded-lg bg-[#105e32] text-[#f5d77f] text-[11px] font-bold cursor-pointer"
                        >
                          فتح وتصدير PDF
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* العمود الأيسر: معاينة الوثيقة الرسمية A4 الجاهزة للتصدير كملف PDF */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-2xl bg-white text-black p-6 sm:p-8 shadow-2xl border-2 border-[#d4af37] space-y-5 font-['Cairo',sans-serif]">
                {/* ترويسة الجمهورية والمؤسسة */}
                <div className="text-center border-b-2 border-black pb-3 space-y-0.5">
                  <div className="text-base sm:text-lg font-black">
                    الجمهورية الجزائرية الديمقراطية الشعبية
                  </div>
                  <div className="text-sm sm:text-base font-bold">
                    وزارة التربية الوطنية
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold pt-2">
                    <div className="text-right space-y-0.5">
                      <div>{memoWilaya}</div>
                      <div>{memoSchoolName}</div>
                      <div>الرتبة: {activeMemoRoleSpec.title}</div>
                    </div>
                    <div className="text-left space-y-0.5 tabular-nums">
                      <div>الموسم الدراسي: {currentInst.schoolYear}</div>
                      <div>رقم المذكرة: {memoNumber}</div>
                      <div>التاريخ: {memoDate}</div>
                    </div>
                  </div>
                </div>

                {/* عنوان المذكرة اليومية */}
                <div className="text-center space-y-1">
                  <h3 className="text-base sm:text-xl font-black underline decoration-2 underline-offset-4">
                    مذكرة توثيق المهام والأنشطة اليومية لـ {activeMemoRoleSpec.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-700">
                    السند القانوني: {activeMemoRoleSpec.category2554} · القرار الوزاري 65 · القراران 833 و171
                  </div>
                </div>

                {/* شريط بيانات المؤطر وإحصاء اليوم */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-lg bg-slate-100 border border-black text-xs">
                  <div>
                    <span className="font-black">اسم ولقب الموظف: </span>
                    <span className="font-semibold">{memoStaffName}</span>
                  </div>
                  <div>
                    <span className="font-black">الجناح / المرفق المؤطر: </span>
                    <span className="font-semibold">{memoWing}</span>
                  </div>
                  <div>
                    <span className="font-black">وضعية الحضور والغياب: </span>
                    <span className="font-semibold">
                      {presentStudentsCount} ({recordedAbsencesCount})
                    </span>
                  </div>
                  <div>
                    <span className="font-black">الإطعام / بطاقات الدخول: </span>
                    <span className="font-semibold">{ticketsOrMealsCount}</span>
                  </div>
                </div>

                {/* الجدول التفصيلي للأنشطة اليومية الموثقة */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-right border-collapse border border-black">
                    <thead>
                      <tr className="bg-slate-200 text-black">
                        <th className="border border-black py-2 px-2 font-black w-24">
                          التوقيت
                        </th>
                        <th className="border border-black py-2 px-2 font-black w-28">
                          المرفق / الجناح
                        </th>
                        <th className="border border-black py-2 px-2.5 font-black">
                          النشاط التربوي والإداري المنجز والسند القانوني
                        </th>
                        <th className="border border-black py-2 px-2 font-black w-28">
                          الملاحظة / الإنجاز
                        </th>
                        <th className="border border-black py-2 px-1.5 font-black text-center w-12 no-print">
                          حذف
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {memoTasks.map((task) => (
                        <tr key={task.id} className="align-top">
                          <td className="border border-black py-2 px-2 font-mono font-bold tabular-nums">
                            {task.timeSlot}
                          </td>
                          <td className="border border-black py-2 px-2 font-bold">
                            {task.locationZone}
                          </td>
                          <td className="border border-black py-2 px-2.5 space-y-0.5">
                            <div className="font-bold text-black leading-snug">
                              {task.activityTitle}
                            </div>
                            <div className="text-[10px] text-slate-700 font-semibold">
                              المرجع: {task.legalBasis}
                            </div>
                          </td>
                          <td className="border border-black py-2 px-2">
                            <select
                              value={task.status}
                              onChange={(e) =>
                                handleUpdateMemoTaskStatus(
                                  task.id,
                                  e.target.value as DailyMemoTaskItem['status']
                                )
                              }
                              className="w-full text-[11px] font-bold bg-transparent border-b border-slate-400 pb-0.5 mb-1 focus:outline-none"
                            >
                              <option value="completed">✓ منجز بانتظام</option>
                              <option value="in_progress">⟳ قيد المتابعة</option>
                              <option value="observation">! ملاحظة مسجلة</option>
                            </select>
                            <div className="text-[10px] text-slate-800 leading-tight">
                              {task.notes}
                            </div>
                          </td>
                          <td className="border border-black py-2 px-1.5 text-center no-print">
                            <button
                              type="button"
                              onClick={() => handleDeleteMemoTask(task.id)}
                              className="p-1 rounded text-rose-700 hover:bg-rose-100 cursor-pointer"
                              title="حذف البند"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* الحوصلة الختامية لليوم */}
                <div className="p-3 rounded-lg bg-slate-50 border border-black text-xs space-y-1">
                  <div className="font-black text-black">
                    الحوصلة اليومية والملاحظات التربوية والأمنية الختامية:
                  </div>
                  <p className="text-slate-900 leading-relaxed whitespace-pre-line">
                    {memoConclusion}
                  </p>
                </div>

                {/* إمضاءات الوثيقة الرسمية */}
                <div className="grid grid-cols-3 gap-4 pt-4 text-center text-xs font-bold">
                  <div>
                    <div>إمضاء {activeMemoRoleSpec.shortTitle}</div>
                    <div className="text-slate-700 mt-0.5">({memoStaffName})</div>
                    <div className="mt-8 text-slate-500">[التوقيع]</div>
                  </div>
                  <div>
                    <div>تأشيرة {stageCfg.counsellorTitle}</div>
                    <div className="text-slate-700 mt-0.5">(المراقبة اليومية)</div>
                    <div className="mt-8 text-slate-500">[التأشيرة]</div>
                  </div>
                  <div>
                    <div>مصادقة {stageCfg.principalTitle}</div>
                    <div className="text-slate-700 mt-0.5">({memoSchoolName})</div>
                    <div className="mt-8 text-slate-500">[الختم والتوقيع]</div>
                  </div>
                </div>
              </div>

              {/* شريط أزرار التصدير السريع أسفل المعاينة */}
              <div className="flex flex-wrap items-center justify-end gap-3 no-print">
                <button
                  type="button"
                  onClick={handleSaveCurrentMemoToArchive}
                  className="px-4 py-2.5 rounded-xl bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/50 text-xs font-bold flex items-center gap-2 cursor-pointer shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ في سجل المذكرات اليومية</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportMemoPDF}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] text-xs font-black flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-110"
                >
                  <Printer className="w-4 h-4" />
                  <span>تصدير وحفظ كملف PDF (طباعة A4 رسمية)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeViewTab === 'texts' && (
        <>
          {/* شريط التصنيف والبحث في النصوص والمناشير */}
          <div className="p-4 rounded-xl bg-[#091e14] border border-[#d4af37]/30 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                {
                  id: 'all',
                  label: `جميع النصوص والمناشير (${LEGAL_DOCUMENTS.length})`,
                },
                {
                  id: 'decree_2554',
                  label: 'المرسوم التنفيذي 25-54 (التصنيف والرتب)',
                },
                {
                  id: 'tasks_decision',
                  label: 'القرار 65 ومدونة المهام والمداومة',
                },
                {
                  id: 'discipline_171',
                  label: 'المواظبة والمجالس (833 / 171 / 157 / 173)',
                },
                {
                  id: 'primary_educator',
                  label: 'المربي المتخصص والمطاعم (18-03)',
                },
                {
                  id: 'digital_exams',
                  label: 'الرقمنة والامتحانات الرسمية',
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    categoryFilter === tab.id
                      ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]/50'
                      : 'bg-[#06150e] text-slate-300 hover:text-white'
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
                placeholder="ابحث في المراسيم والمناشير والمواد..."
                className="pr-8 pl-3 py-1.5 rounded-lg bg-[#05140d] border border-[#d4af37]/40 text-white text-xs w-full sm:w-64"
              />
            </div>
          </div>

          {/* عرض النصوص والمواد القانونية */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              {filteredDocs.map((doc) => {
                const isSelected = selectedDoc.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-l from-[#103824] to-[#081a12] border-[#d4af37] shadow-lg'
                        : 'bg-[#081a12] border-[#d4af37]/25 hover:border-[#d4af37]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#d4af37] font-bold mb-1">
                      <span>{doc.number}</span>
                      {doc.isUpdated2026 && (
                        <span className="text-emerald-300 font-semibold">
                          تحيين 2026
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-black text-white leading-snug">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                      {doc.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-7 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-6 shadow-2xl space-y-5">
              <div className="border-b border-[#d4af37]/20 pb-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#f5d77f]">
                    {selectedDoc.number}
                  </span>
                  <span className="text-xs text-slate-400">
                    {selectedDoc.date}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">
                  {selectedDoc.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedDoc.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#d4af37] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>النص القانوني المرجعي الكامل</span>
                  </h4>
                  <button
                    onClick={() => handleCopy(selectedDoc.fullText, 'fullText')}
                    className="px-3 py-1 rounded-lg bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === 'fullText' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {copiedId === 'fullText'
                        ? 'تم النسخ!'
                        : 'نسخ النص للاستدلال الإداري'}
                    </span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-[#05140d] border border-[#d4af37]/30 text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                  {selectedDoc.fullText}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-black text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    أبرز المواد الإجرائية الخاصة بموظفي التربية ({stageCfg.name}):
                  </span>
                </h4>
                <div className="space-y-2.5">
                  {selectedDoc.keyArticles.map((art) => (
                    <div
                      key={art.articleNumber}
                      className="p-3.5 rounded-xl bg-[#06150e] border border-[#d4af37]/25 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#f5d77f]">
                          {art.articleNumber} — {art.summary}
                        </span>
                        <button
                          onClick={() =>
                            handleCopy(
                              `${art.articleNumber}: ${art.text}`,
                              art.articleNumber
                            )
                          }
                          className="text-[11px] text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>
                            {copiedId === art.articleNumber
                              ? 'تم النسخ'
                              : 'نسخ المادة'}
                          </span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {art.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeViewTab === 'duties_matrix' && (
        /* مصفوفة المهام الرسمية والضمانات المهنية */
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#d4af37]/20 pb-3">
              <div>
                <h3 className="text-base font-black text-white">
                  البطاقة الوصفية لمهام الرتب السبع لسلك موظفي التربية (المرسوم 25-54 والقرار 65)
                </h3>
                <p className="text-xs text-slate-400">
                  اختر أي رتبة لمعاينة الصلاحيات القانونية، الحجم الساعي، أو توليد مذكرة مهام يومية PDF لها
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {(Object.keys(STAFF_ROLES) as StaffRoleId[]).map((rId) => {
                  const r = STAFF_ROLES[rId];
                  const active = selectedRoleForDuties === rId;
                  return (
                    <button
                      key={rId}
                      onClick={() => setSelectedRoleForDuties(rId)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        active
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

            <div className="p-4 rounded-xl bg-[#05140d] border border-[#d4af37]/30 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-black text-[#f5d77f]">
                  {currentRoleSpec.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-300 tabular-nums">
                    {currentRoleSpec.category2554} · النصاب الأسبوعي:{' '}
                    {currentRoleSpec.weeklyHours} ساعة
                  </span>
                  <button
                    onClick={() => {
                      handleSelectMemoRole(selectedRoleForDuties);
                      setActiveViewTab('daily_memo');
                    }}
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] text-xs font-black flex items-center gap-1 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>إنشاء مذكرة يومية PDF لهذه الرتبة</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentRoleSpec.coreMission}
              </p>
              <div className="text-[11px] text-[#d4af37] font-semibold">
                الإشراف السلمي: {currentRoleSpec.superiorAuthority}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentRoleSpec.keyDuties.map((d, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#06150e] border border-[#d4af37]/25 flex items-start gap-2 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* تقسيم المهام الدورية (يومية / أسبوعية / فصلية) والمهام الممنوعة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/30 space-y-3">
              <h4 className="text-sm font-black text-[#f5d77f] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1. المهام اليومية الثابتة ({stageCfg.name})</span>
              </h4>
              <div className="space-y-2">
                {stageDuties.daily.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#06150e] border border-[#d4af37]/20 text-xs text-slate-200 leading-relaxed"
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/30 space-y-3">
              <h4 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span>2. المهام الأسبوعية والفصلية ({stageCfg.name})</span>
              </h4>
              <div className="space-y-2">
                {[...stageDuties.weekly, ...stageDuties.termly].map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#06150e] border border-[#d4af37]/20 text-xs text-slate-200 leading-relaxed"
                    >
                      • {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* المهام غير المسندة والممنوعة قانوناً */}
          <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-700/50 space-y-3">
            <h4 className="text-sm font-black text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>
                الضمانات القانونية: الأعمال غير المسندة والممنوع تكليف موظف التربية بها ({stageCfg.name})
              </span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {stageDuties.prohibited.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#081a12]/90 border border-rose-700/40 text-xs text-slate-200 leading-relaxed"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
