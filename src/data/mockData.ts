import {
  AbsenceRecord,
  AgendaTask,
  DutySlot,
  EducationStage,
  InstitutionInfo,
  LegalDocument,
  PrintableTemplate,
  StaffRoleId,
  StaffRoleSpec,
  StageConfig,
  StudentRecord,
  SubjectConfig,
  TeacherOrStaffMember,
} from '../types';

export const DEFAULT_LOGO_URL = '/src/assets/images/emblem_educ_staff_snte_1793911089092.jpg';

export const STAFF_ROLES: Record<StaffRoleId, StaffRoleSpec> = {
  primary_specialized_educator: {
    id: 'primary_specialized_educator',
    title: 'مربي متخصص في المدارس الابتدائية',
    shortTitle: 'مربي متخصص (ابتدائي)',
    stages: ['primary'],
    category2554: 'الصنف 11 (المرسوم التنفيذي 25-54)',
    indexPoints: 580,
    weeklyHours: 32,
    coreMission:
      'تأطير ومرافقة تلاميذ المدرسة الابتدائية أثناء الدخول والخروج والاستراحة، الإشراف المباشر على المطعم المدرسي والنظافة والصحة المدرسية (UDS)، ومتابعة مواظبة التلاميذ والنشاطات الثقافية والرياضية.',
    keyDuties: [
      'استقبال التلاميذ عند البوابة وتنظيم حركة الاصطفاف والدخول إلى الأقسام صباحاً ومساءً',
      'ضبط غيابات وتأخرات التلاميذ بالفترات (الفترة الصباحية والفترة المسائية) وإبلاغ مدير المدرسة والأولياء',
      'المرافقة التربوية والصحية للتلاميذ في المطعم المدرسي ومراقبة الوجبات ونظافة اليدين',
      'تنشيط النوادي التربوية والثقافية والبيئية وحصص القراءة والمطالعة خارج أوقات التدريس',
      'مرافقة التلاميذ إلى وحدة الكشف والمتابعة الصحية (UDS) والتكفل بالحالات الاستعجالية الأولية',
    ],
    superiorAuthority: 'تحت السلطة المباشرة لمدير المدرسة الابتدائية وبالتنسيق مع ناظر المدرسة الابتدائية',
  },
  primary_principal_educator: {
    id: 'primary_principal_educator',
    title: 'مربي متخصص رئيسي في المدارس الابتدائية',
    shortTitle: 'مربي متخصص رئيسي (ابتدائي)',
    stages: ['primary'],
    category2554: 'الصنف 12 (المرسوم التنفيذي 25-54)',
    indexPoints: 635,
    weeklyHours: 30,
    coreMission:
      'تنسيق عمل المربين المتخصصين في المدرسة الابتدائية، مسك السجلات الرقمية للمواظبة والإطعام، وتنظيم النشاطات المكملة والمرافقة البيداغوجية والاجتماعية للتلاميذ.',
    keyDuties: [
      'تنسيق جداول المداومة والحراسة في الساحة والمطعم المدرسي بين المربين المتخصصين',
      'حجز ومراقبة الغيابات اليومية وقوائم المستفيدين من المطعم والمنحة في أرضية الرقمنة',
      'إعداد التقارير الدورية حول المواظبة والسلوك والصحة المدرسية لعرضها في مجلس الأساتذة',
      'تأطير التظاهرات الوطنية والمنافسات الثقافية والرياضية ما بين المدارس الابتدائية',
    ],
    superiorAuthority: 'تحت سلطة مدير المدرسة الابتدائية وبتنسيق مباشر مع ناظر المدرسة الابتدائية',
  },
  educational_supervisor: {
    id: 'educational_supervisor',
    title: 'مشرف التربية (متوسط / ثانوي)',
    shortTitle: 'مشرف التربية',
    stages: ['middle', 'secondary'],
    category2554: 'الصنف 11 (المرسوم التنفيذي 25-54)',
    indexPoints: 580,
    weeklyHours: 32,
    coreMission:
      'ضمان النظام والانضباط العام للتلاميذ في المتوسطة أو الثانوية، مراقبة مواظبة التلاميذ وحركتهم في الأجنحة والساحة والمطعم، ومسك سجلات الغيابات وبطاقات الدخول والاستدعاءات.',
    keyDuties: [
      'مراقبة حضور وغياب التلاميذ ساعة بساعة ومطابقة كراريس الغياب اليومية مع بطاقات التلاميذ',
      'تسليم أوراق السماح بالدخول للأقسام بعد التحقق من مبررات الغياب أو التأخر وحضور الأولياء',
      'تأطير حركة التلاميذ أثناء فترات الاستراحة وتغيير الحصص والمخابر والورشات',
      'المشاركة في حراسة التلاميذ في النظام نصف الداخلي والداخلي والمذاكرة المحروسة',
      'المساهمة في الأعمال الإدارية الخاصة بحجز النقاط والمعدلات الفصلية وتحضير مجالس الأقسام',
    ],
    superiorAuthority: 'تحت سلطة مستشار التربية وناظر المؤسسة (مدير الدراسات) ومدير المتوسطة/الثانوية',
  },
  principal_supervisor: {
    id: 'principal_supervisor',
    title: 'مشرف رئيسي للتربية (متوسط / ثانوي)',
    shortTitle: 'مشرف رئيسي للتربية',
    stages: ['middle', 'secondary'],
    category2554: 'الصنف 12 (المرسوم التنفيذي 25-54)',
    indexPoints: 635,
    weeklyHours: 32,
    coreMission:
      'تنسيق مهام مشرفي ومساعدي التربية في الأجنحة التربوية، تدقيق الإحصائيات الشهرية والفصلية للغيابات، والمساهمة المباشرة في الرقمنة واستقبال الأولياء.',
    keyDuties: [
      'مراقبة وتدقيق كراريس الغيابات اليومية وإعداد الحوصلة الشهرية للمواظبة حسب الأفواج التربوية',
      'مرافقة مستشار التربية في توزيع مهام المداومة التربوية والحراسة العامة للأجنحة',
      'استقبال أولياء التلاميذ بخصوص الغيابات المتكررة وتحرير محاضر التعهد والالتزام',
      'المشاركة الفعالة في تنظيم الامتحانات الفصلية والامتحانات الرسمية (BEM / BAC)',
    ],
    superiorAuthority: 'تحت سلطة مستشار التربية وناظر المؤسسة ومدير المؤسسة',
  },
  general_supervisor: {
    id: 'general_supervisor',
    title: 'مشرف عام للتربية (رتبة مستحدثة 25-54)',
    shortTitle: 'مشرف عام للتربية',
    stages: ['middle', 'secondary'],
    category2554: 'الصنف 13 (المرسوم التنفيذي 25-54)',
    indexPoints: 698,
    weeklyHours: 30,
    coreMission:
      'الإشراف الميداني على فرق المشرفين والمساعدين التربويين، متابعة مؤشرات الحياة المدرسية والانضباط، والنيابة عن مستشار التربية عند الاقتضاء في ضبط النظام العام.',
    keyDuties: [
      'تنسيق عمل فرق الاستشارة والمشرفين التربويين عبر مختلف أجنحة المتوسطة أو الثانوية',
      'تحليل مؤشرات الغياب والتسرب المدرسي واقتراح التدابير الوقائية لمجلس القسم ومجلس التأديب',
      'الإشراف على مطابقة بيانات الرقمنة (Amatti) المتعلقة بمواظبة التلاميذ والإعفاءات والمنح',
      'تأطير المشرفين التربويين المتربصين ومرافقتهم الميدانية في تسيير ملفات التلاميذ',
    ],
    superiorAuthority: 'تحت سلطة مدير المؤسسة وبالتنسيق المباشر مع الناظر ومستشار التربية',
  },
  educational_assistant: {
    id: 'educational_assistant',
    title: 'مساعد تربوي (متوسط / ثانوي)',
    shortTitle: 'مساعد تربوي',
    stages: ['middle', 'secondary'],
    category2554: 'الصنف 9 (المرسوم التنفيذي 25-54)',
    indexPoints: 472,
    weeklyHours: 36,
    coreMission:
      'مرافقة التلاميذ وحراستهم في الساحة، الأجنحة، قاعات المذاكرة، المطعم والمرقد، والسهر على وقايتهم وأمنهم وانضباطهم داخل المؤسسة التربوية.',
    keyDuties: [
      'المراقبة الفعلية للتلاميذ أثناء الدخول والخروج وفترات الاستراحة وفي قاعات المذاكرة',
      'جمع كراريس الغيابات من الأقسام في بداية كل حصة وتدوين الغيابات في السجل اليومي',
      'تأطير التلاميذ النصف داخليين والداخليين في المطعم المدرسي والنوادي الثقافية والرياضية',
      'تبليغ استدعاءات الأولياء وإشعارات الغياب المحررة في مكتب الاستشارة التربوية',
    ],
    superiorAuthority: 'تحت سلطة مستشار التربية والمشرف الرئيسي للتربية وإدارة المؤسسة',
  },
  principal_assistant: {
    id: 'principal_assistant',
    title: 'مساعد رئيسي للتربية (متوسط / ثانوي)',
    shortTitle: 'مساعد رئيسي للتربية',
    stages: ['middle', 'secondary'],
    category2554: 'الصنف 10 (المرسوم التنفيذي 25-54)',
    indexPoints: 523,
    weeklyHours: 34,
    coreMission:
      'المساهمة في تأطير التلاميذ ومسك البطاقيات والسجلات اليومية للغيابات، ومرافقة الأفواج التربوية أثناء غياب الأساتذة وفي النشاطات الثقافية والرياضية.',
    keyDuties: [
      'ضبط حركة التلاميذ في الأجنحة البيداغوجية وتأطير قاعات المداومة والمطالعة',
      'مساعدة المشرفين التربويين ومستشار التربية في مسك الملفات الإدارية والانضباطية للتلاميذ',
      'تأمين المداومة التربوية ومرافقة التلاميذ إلى العيادة أو وحدة الكشف الصحي عند الحاجة',
    ],
    superiorAuthority: 'تحت سلطة مستشار التربية ومشرفي التربية ومدير المؤسسة',
  },
};

export const STAGE_CONFIGS: Record<EducationStage, StageConfig> = {
  primary: {
    id: 'primary',
    name: 'الطور الابتدائي',
    shortName: 'ابتدائي',
    staffTitle: 'المربي المتخصص في المدارس الابتدائية',
    availableRoles: ['primary_specialized_educator', 'primary_principal_educator'],
    defaultRole: 'primary_specialized_educator',
    principalTitle: 'مدير المدرسة الابتدائية',
    counsellorTitle: 'ناظر المدرسة الابتدائية / مساعد المدير',
    inspectorTitle: 'مفتش التعليم الابتدائي (إدارة المدارس الابتدائية)',
    institutionLabel: 'المدرسة الابتدائية',
    maxGradeScale: 10,
    passingGrade: 5,
    hasSupervisedTest: false,
    hasCoefficients: false,
    nationalExamName: 'امتحان تقييم المكتسبات لمرحلة التعليم الابتدائي (5 ابتدائي)',
    staffWeeklyQuota: 32,
    classificationCategory: 'الصنف 11 / 12 (مربي متخصص / مربي متخصص رئيسي — المرسوم 25-54)',
    badgeText: 'مربي متخصص في الابتدائي · سلم /10 · تأطير التلاميذ والمطعم والصحة المدرسية UDS',
    description:
      'في الطور الابتدائي، يضطلع المربي المتخصص والمربي المتخصص الرئيسي بمرافقة التلاميذ وتأطيرهم في الساحة، البوابة، المطعم المدرسي، ووحدة الكشف الصحي (UDS)، ومتابعة الغيابات بالفترات (صباحاً/مساءً) بالتكامل مع سلم التقييم من 10 (/10) وتقييم المكتسبات.',
  },
  middle: {
    id: 'middle',
    name: 'الطور المتوسط',
    shortName: 'متوسط',
    staffTitle: 'المشرف التربوي والمساعد التربوي (التعليم المتوسط)',
    availableRoles: [
      'educational_supervisor',
      'principal_supervisor',
      'general_supervisor',
      'educational_assistant',
      'principal_assistant',
    ],
    defaultRole: 'educational_supervisor',
    principalTitle: 'مدير المتوسطة',
    counsellorTitle: 'مستشار التربية / ناظر المتوسطة',
    inspectorTitle: 'مفتش التعليم المتوسط (إدارة المتوسطات والحياة المدرسية)',
    institutionLabel: 'المتوسطة',
    maxGradeScale: 20,
    passingGrade: 10,
    hasSupervisedTest: true,
    hasCoefficients: true,
    nationalExamName: 'امتحان شهادة التعليم المتوسط (BEM 2026)',
    staffWeeklyQuota: 32,
    classificationCategory: 'الأصناف 9 إلى 13 (مساعد تربوي · مشرف تربوي · مشرف رئيسي · مشرف عام — 25-54)',
    badgeText: 'المشرف والمساعد التربوي في المتوسط · الانضباط وكراريس الغياب · سلم /20 · BEM 2026',
    description:
      'في الطور المتوسط، يسهر المشرف التربوي والمساعد التربوي على ضبط النظام والانضباط، مراقبة كراريس الغياب ساعة بساعة، تسليم بطاقات الدخول، مرافقة التلاميذ في النصف داخلي والمخابر، وحساب نقطة المواظبة والسلوك ضمن معدلات الفصل (/20).',
  },
  secondary: {
    id: 'secondary',
    name: 'الطور الثانوي',
    shortName: 'ثانوي',
    staffTitle: 'المشرف التربوي والمساعد التربوي (التعليم الثانوي)',
    availableRoles: [
      'educational_supervisor',
      'principal_supervisor',
      'general_supervisor',
      'educational_assistant',
      'principal_assistant',
    ],
    defaultRole: 'educational_supervisor',
    principalTitle: 'مدير الثانوية',
    counsellorTitle: 'مستشار التربية / ناظر الثانوية (مدير الدراسات)',
    inspectorTitle: 'مفتش التربية الوطنية (إدارة الثانويات)',
    institutionLabel: 'الثانوية',
    maxGradeScale: 20,
    passingGrade: 10,
    hasSupervisedTest: true,
    hasCoefficients: true,
    nationalExamName: 'امتحان شهادة البكالوريا (BAC 2026)',
    staffWeeklyQuota: 32,
    classificationCategory: 'الأصناف 9 إلى 13 (مشرف عام · مشرف رئيسي · مشرف تربوي · مساعد تربوي — 25-54)',
    badgeText: 'المشرف والمساعد التربوي في الثانوي · مواظبة الشعب والأفواج · سلم /20 · BAC 2026',
    description:
      'في الطور الثانوي، يتولى المشرف التربوي والمساعد التربوي تأطير الحياة المدرسية في الأجنحة البيداغوجية والمخابر، متابعة مواظبة تلاميذ الجذوع المشتركة والشعب وأقسام البكالوريا (BAC)، واستقبال الأولياء ومعالجة الغيابات وكشوف النقاط (/20).',
  },
};

export const QUICK_ROLE_TITLES: Record<EducationStage, string[]> = {
  primary: [
    'مربي متخصص في المدارس الابتدائية',
    'مربي متخصص رئيسي في الابتدائي',
    'مربي الحياة المدرسية والمطعم (ابتدائي)',
  ],
  middle: [
    'مشرف التربية (التعليم المتوسط)',
    'مشرف رئيسي للتربية (متوسط)',
    'مشرف عام للتربية (متوسط)',
    'مساعد تربوي (التعليم المتوسط)',
    'مساعد رئيسي للتربية (متوسط)',
  ],
  secondary: [
    'مشرف التربية (التعليم الثانوي)',
    'مشرف رئيسي للتربية (ثانوي)',
    'مشرف عام للتربية (ثانوي)',
    'مساعد تربوي (التعليم الثانوي)',
    'مساعد رئيسي للتربية (ثانوي)',
  ],
};

export const DEFAULT_INSTITUTIONS: Record<EducationStage, InstitutionInfo> = {
  primary: {
    stage: 'primary',
    schoolName: 'المدرسة الابتدائية الشهيد محمد العربي بن مهيدي',
    wilaya: 'ولاية قسنطينة (025)',
    staffName: 'الأستاذ(ة) ياسين بن يحيى (مربي متخصص)',
    activeRoleId: 'primary_specialized_educator',
    schoolYear: '2025 / 2026',
    currentTerm: 2,
    logoUrl: DEFAULT_LOGO_URL,
  },
  middle: {
    stage: 'middle',
    schoolName: 'متوسطة الشهيد العربي بن مهيدي',
    wilaya: 'ولاية قسنطينة (025)',
    staffName: 'الأستاذ كريم بومدين (مشرف تربوي)',
    activeRoleId: 'educational_supervisor',
    schoolYear: '2025 / 2026',
    currentTerm: 2,
    logoUrl: DEFAULT_LOGO_URL,
  },
  secondary: {
    stage: 'secondary',
    schoolName: 'ثانوية الشهيد زيغود يوسف',
    wilaya: 'ولاية قسنطينة (025)',
    staffName: 'الأستاذ سفيان مرابط (مشرف رئيسي للتربية)',
    activeRoleId: 'principal_supervisor',
    schoolYear: '2025 / 2026',
    currentTerm: 2,
    logoUrl: DEFAULT_LOGO_URL,
  },
};

export const CLASS_GROUPS = [
  { name: '5 إب 1', level: '5 ابتدائي', stage: 'primary' as EducationStage, label: 'السنة الخامسة ابتدائي — فوج 1 (قسم تقييم المكتسبات)' },
  { name: '4 إب 1', level: '4 ابتدائي', stage: 'primary' as EducationStage, label: 'السنة الرابعة ابتدائي — فوج 1' },
  { name: '3 إب 1', level: '3 ابتدائي', stage: 'primary' as EducationStage, label: 'السنة الثالثة ابتدائي — فوج 1' },
  { name: '2 إب 1', level: '2 ابتدائي', stage: 'primary' as EducationStage, label: 'السنة الثانية ابتدائي — فوج 1' },
  { name: '1 إب 1', level: '1 ابتدائي', stage: 'primary' as EducationStage, label: 'السنة الأولى ابتدائي — فوج 1 (الطور الأول التأسيسي)' },
  { name: '4 م 1', level: '4 متوسط', stage: 'middle' as EducationStage, label: 'السنة الرابعة متوسط — فوج 1 (قسم شهادة التعليم المتوسط BEM)' },
  { name: '4 م 2', level: '4 متوسط', stage: 'middle' as EducationStage, label: 'السنة الرابعة متوسط — فوج 2 (قسم شهادة التعليم المتوسط BEM)' },
  { name: '3 م 1', level: '3 متوسط', stage: 'middle' as EducationStage, label: 'السنة الثالثة متوسط — فوج 1' },
  { name: '2 م 1', level: '2 متوسط', stage: 'middle' as EducationStage, label: 'السنة الثانية متوسط — فوج 1' },
  { name: '1 م 1', level: '1 متوسط', stage: 'middle' as EducationStage, label: 'السنة الأولى متوسط — فوج 1' },
  { name: '3 ع ت 1', level: '3 علوم تجريبية', stage: 'secondary' as EducationStage, label: 'السنة الثالثة ثانوي — علوم تجريبية 1 (قسم البكالوريا BAC)' },
  { name: '3 ت ر 1', level: '3 تقني رياضي', stage: 'secondary' as EducationStage, label: 'السنة الثالثة ثانوي — تقني رياضي 1 (قسم البكالوريا BAC)' },
  { name: '3 آ ف 1', level: '3 آداب وفلسفة', stage: 'secondary' as EducationStage, label: 'السنة الثالثة ثانوي — آداب وفلسفة 1 (قسم البكالوريا BAC)' },
  { name: '2 ع ت 1', level: '2 علوم تجريبية', stage: 'secondary' as EducationStage, label: 'السنة الثانية ثانوي — علوم تجريبية 1' },
  { name: '1 ج م ع ت 1', level: '1 ج م ع ت', stage: 'secondary' as EducationStage, label: 'السنة الأولى ثانوي — جذع مشترك علوم وتكنولوجيا 1' },
];

export const DEFAULT_SUBJECTS: SubjectConfig[] = [
  {
    id: 'arabic',
    name: 'اللغة العربية وآدابها',
    shortName: 'لغة عربية',
    stages: ['primary', 'middle', 'secondary'],
    coefficients: {
      '1 ابتدائي': 1, '2 ابتدائي': 1, '3 ابتدائي': 1, '4 ابتدائي': 1, '5 ابتدائي': 1,
      '1 متوسط': 2, '2 متوسط': 3, '3 متوسط': 3, '4 متوسط': 5,
      '1 ج م ع ت': 3, '2 علوم تجريبية': 3, '3 علوم تجريبية': 3, '3 تقني رياضي': 3, '3 آداب وفلسفة': 6,
    },
  },
  {
    id: 'math',
    name: 'الرياضيات',
    shortName: 'رياضيات',
    stages: ['primary', 'middle', 'secondary'],
    coefficients: {
      '1 ابتدائي': 1, '2 ابتدائي': 1, '3 ابتدائي': 1, '4 ابتدائي': 1, '5 ابتدائي': 1,
      '1 متوسط': 2, '2 متوسط': 3, '3 متوسط': 3, '4 متوسط': 4,
      '1 ج م ع ت': 5, '2 علوم تجريبية': 5, '3 علوم تجريبية': 5, '3 تقني رياضي': 6, '3 آداب وفلسفة': 2,
    },
  },
  {
    id: 'physics',
    name: 'العلوم الفيزيائية والتكنولوجيا',
    shortName: 'فيزياء',
    stages: ['middle', 'secondary'],
    coefficients: {
      '1 متوسط': 1, '2 متوسط': 2, '3 متوسط': 2, '4 متوسط': 2,
      '1 ج م ع ت': 4, '2 علوم تجريبية': 5, '3 علوم تجريبية': 5, '3 تقني رياضي': 6, '3 آداب وفلسفة': 0,
    },
  },
  {
    id: 'science',
    name: 'علوم الطبيعة والحياة (التربية العلمية)',
    shortName: 'علوم / تربية علمية',
    stages: ['primary', 'middle', 'secondary'],
    coefficients: {
      '1 ابتدائي': 1, '2 ابتدائي': 1, '3 ابتدائي': 1, '4 ابتدائي': 1, '5 ابتدائي': 1,
      '1 متوسط': 1, '2 متوسط': 2, '3 متوسط': 2, '4 متوسط': 2,
      '1 ج م ع ت': 4, '2 علوم تجريبية': 6, '3 علوم تجريبية': 6, '3 تقني رياضي': 2, '3 آداب وفلسفة': 0,
    },
  },
  {
    id: 'french',
    name: 'اللغة الفرنسية',
    shortName: 'فرنسية',
    stages: ['primary', 'middle', 'secondary'],
    coefficients: {
      '1 ابتدائي': 1, '2 ابتدائي': 1, '3 ابتدائي': 1, '4 ابتدائي': 1, '5 ابتدائي': 1,
      '1 متوسط': 1, '2 متوسط': 2, '3 متوسط': 2, '4 متوسط': 3,
      '1 ج م ع ت': 2, '2 علوم تجريبية': 2, '3 علوم تجريبية': 2, '3 تقني رياضي': 2, '3 آداب وفلسفة': 3,
    },
  },
  {
    id: 'english',
    name: 'اللغة الإنجليزية',
    shortName: 'إنجليزية',
    stages: ['primary', 'middle', 'secondary'],
    coefficients: {
      '1 ابتدائي': 1, '2 ابتدائي': 1, '3 ابتدائي': 1, '4 ابتدائي': 1, '5 ابتدائي': 1,
      '1 متوسط': 1, '2 متوسط': 1, '3 متوسط': 1, '4 متوسط': 2,
      '1 ج م ع ت': 2, '2 علوم تجريبية': 2, '3 علوم تجريبية': 2, '3 تقني رياضي': 2, '3 آداب وفلسفة': 3,
    },
  },
  {
    id: 'hist_geo',
    name: 'التاريخ والجغرافيا',
    shortName: 'تاريخ وجغرافيا',
    stages: ['primary', 'middle', 'secondary'],
    coefficients: {
      '1 ابتدائي': 1, '2 ابتدائي': 1, '3 ابتدائي': 1, '4 ابتدائي': 1, '5 ابتدائي': 1,
      '1 متوسط': 2, '2 متوسط': 2, '3 متوسط': 2, '4 متوسط': 3,
      '1 ج م ع ت': 2, '2 علوم تجريبية': 2, '3 علوم تجريبية': 2, '3 تقني رياضي': 2, '3 آداب وفلسفة': 4,
    },
  },
  {
    id: 'islamic',
    name: 'التربية الإسلامية / العلوم الإسلامية',
    shortName: 'تربية إسلامية',
    stages: ['primary', 'middle', 'secondary'],
    coefficients: {
      '1 ابتدائي': 1, '2 ابتدائي': 1, '3 ابتدائي': 1, '4 ابتدائي': 1, '5 ابتدائي': 1,
      '1 متوسط': 1, '2 متوسط': 1, '3 متوسط': 1, '4 متوسط': 2,
      '1 ج م ع ت': 2, '2 علوم تجريبية': 2, '3 علوم تجريبية': 2, '3 تقني رياضي': 2, '3 آداب وفلسفة': 2,
    },
  },
  {
    id: 'civics',
    name: 'التربية المدنية / الفلسفة',
    shortName: 'مدنية / فلسفة',
    stages: ['primary', 'middle', 'secondary'],
    coefficients: {
      '1 ابتدائي': 1, '2 ابتدائي': 1, '3 ابتدائي': 1, '4 ابتدائي': 1, '5 ابتدائي': 1,
      '1 متوسط': 1, '2 متوسط': 1, '3 متوسط': 1, '4 متوسط': 1,
      '1 ج م ع ت': 1, '2 علوم تجريبية': 2, '3 علوم تجريبية': 2, '3 تقني رياضي': 2, '3 آداب وفلسفة': 6,
    },
  },
  {
    id: 'sports',
    name: 'التربية البدنية والرياضية',
    shortName: 'تربية بدنية',
    stages: ['primary', 'middle', 'secondary'],
    coefficients: {
      '1 ابتدائي': 1, '2 ابتدائي': 1, '3 ابتدائي': 1, '4 ابتدائي': 1, '5 ابتدائي': 1,
      '1 متوسط': 1, '2 متوسط': 1, '3 متوسط': 1, '4 متوسط': 1,
      '1 ج م ع ت': 1, '2 علوم تجريبية': 1, '3 علوم تجريبية': 1, '3 تقني رياضي': 1, '3 آداب وفلسفة': 1,
    },
  },
];

export const DEFAULT_STUDENTS: StudentRecord[] = [
  // Primary Stage (Supervised by Specialized Primary Educator - مربي متخصص في الابتدائي)
  {
    id: 'st-p1',
    stage: 'primary',
    matricule: '2026050101',
    fullName: 'نور اليقين بوعلام',
    birthDate: '2015-03-14',
    classGroup: '5 إب 1',
    level: '5 ابتدائي',
    parentName: 'حكيم بوعلام',
    parentPhone: '0551 10 20 30',
    canteenBeneficiary: true,
    behaviorNote: 'قدوة في الانضباط ونادي المطالعة',
    grades: {
      arabic: { eval: 9.5, test: 9.5, exam: 9.5 },
      math: { eval: 9.25, test: 9.25, exam: 9.5 },
      science: { eval: 9, test: 9, exam: 9.25 },
      french: { eval: 8.75, test: 8.75, exam: 9 },
      english: { eval: 9.5, test: 9.5, exam: 9.5 },
      hist_geo: { eval: 9, test: 9, exam: 9 },
      islamic: { eval: 10, test: 10, exam: 10 },
      civics: { eval: 9.5, test: 9.5, exam: 9.5 },
      sports: { eval: 9.5, test: 9.5, exam: 9.5 },
    },
  },
  {
    id: 'st-p2',
    stage: 'primary',
    matricule: '2026050102',
    fullName: 'آدم بن ساحلي',
    birthDate: '2015-07-22',
    classGroup: '5 إب 1',
    level: '5 ابتدائي',
    parentName: 'يوسف بن ساحلي',
    parentPhone: '0662 45 78 90',
    canteenBeneficiary: true,
    behaviorNote: 'مواظبة منتظمة في المطعم والساحة',
    grades: {
      arabic: { eval: 7.5, test: 7.5, exam: 8 },
      math: { eval: 8, test: 8, exam: 8.25 },
      science: { eval: 7.75, test: 7.75, exam: 8 },
      french: { eval: 6.5, test: 6.5, exam: 7 },
      english: { eval: 7.5, test: 7.5, exam: 8 },
      hist_geo: { eval: 7.5, test: 7.5, exam: 7.5 },
      islamic: { eval: 9, test: 9, exam: 9 },
      civics: { eval: 8.5, test: 8.5, exam: 8.5 },
      sports: { eval: 9, test: 9, exam: 9 },
    },
  },
  {
    id: 'st-p3',
    stage: 'primary',
    matricule: '2026050103',
    fullName: 'صهيب دردار',
    birthDate: '2015-11-04',
    classGroup: '5 إب 1',
    level: '5 ابتدائي',
    parentName: 'عمر دردار',
    parentPhone: '0773 88 12 44',
    canteenBeneficiary: false,
    behaviorNote: 'يحتاج مرافقة المربي المتخصص في الفترة المسائية',
    grades: {
      arabic: { eval: 5.5, test: 5.5, exam: 5 },
      math: { eval: 4.5, test: 4.5, exam: 4.5 },
      science: { eval: 6, test: 6, exam: 5.5 },
      french: { eval: 4, test: 4, exam: 4.5 },
      english: { eval: 5.5, test: 5.5, exam: 5.5 },
      hist_geo: { eval: 5.5, test: 5.5, exam: 5 },
      islamic: { eval: 7.5, test: 7.5, exam: 7 },
      civics: { eval: 6.5, test: 6.5, exam: 6 },
      sports: { eval: 8.5, test: 8.5, exam: 8.5 },
    },
  },
  {
    id: 'st-p4',
    stage: 'primary',
    matricule: '2026050104',
    fullName: 'جنى رحماني',
    birthDate: '2015-09-18',
    classGroup: '5 إب 1',
    level: '5 ابتدائي',
    parentName: 'سمير رحماني',
    parentPhone: '0557 33 21 09',
    canteenBeneficiary: true,
    behaviorNote: 'متابعة صحية دورية بوحدة الكشف UDS',
    grades: {
      arabic: { eval: 4.5, test: 4.5, exam: 4 },
      math: { eval: 3.5, test: 3.5, exam: 4 },
      science: { eval: 4.5, test: 4.5, exam: 4.5 },
      french: { eval: 3.5, test: 3.5, exam: 3.5 },
      english: { eval: 4.5, test: 4.5, exam: 4.5 },
      hist_geo: { eval: 4.5, test: 4.5, exam: 4 },
      islamic: { eval: 6.5, test: 6.5, exam: 6.5 },
      civics: { eval: 5.5, test: 5.5, exam: 5.5 },
      sports: { eval: 8, test: 8, exam: 8 },
    },
  },
  // Middle Stage (Supervised by Educational Supervisor & Assistant - المشرف التربوي والمساعد التربوي)
  {
    id: 'st-m1',
    stage: 'middle',
    matricule: '2026040101',
    fullName: 'آية الرحمان بن عيسى',
    birthDate: '2011-04-12',
    classGroup: '4 م 1',
    level: '4 متوسط',
    parentName: 'كمال بن عيسى',
    parentPhone: '0550 18 22 90',
    halfBoard: true,
    behaviorNote: 'انضباط مثالي ومندوبة القسم',
    grades: {
      arabic: { eval: 18, test: 17.5, exam: 18 },
      math: { eval: 19, test: 18.5, exam: 19 },
      physics: { eval: 17.5, test: 17, exam: 18 },
      science: { eval: 18, test: 17.5, exam: 17.5 },
      french: { eval: 16.5, test: 16, exam: 17 },
      english: { eval: 18, test: 18, exam: 18.5 },
      hist_geo: { eval: 17, test: 16.5, exam: 17.5 },
      islamic: { eval: 19, test: 19, exam: 19.5 },
      civics: { eval: 18, test: 18, exam: 18.5 },
      sports: { eval: 18, test: 18, exam: 18.5 },
    },
  },
  {
    id: 'st-m2',
    stage: 'middle',
    matricule: '2026040102',
    fullName: 'محمد أمين بوعزيز',
    birthDate: '2011-08-23',
    classGroup: '4 م 1',
    level: '4 متوسط',
    parentName: 'رشيد بوعزيز',
    parentPhone: '0661 44 12 77',
    halfBoard: true,
    behaviorNote: 'سلوك حسن ومواظبة منتظمة',
    grades: {
      arabic: { eval: 15.5, test: 15, exam: 16 },
      math: { eval: 16.5, test: 16, exam: 17 },
      physics: { eval: 15, test: 14.5, exam: 15.5 },
      science: { eval: 16, test: 15, exam: 15.5 },
      french: { eval: 14, test: 13.5, exam: 14.5 },
      english: { eval: 15, test: 15, exam: 16 },
      hist_geo: { eval: 15.5, test: 15, exam: 15.5 },
      islamic: { eval: 17, test: 16.5, exam: 17.5 },
      civics: { eval: 16, test: 15.5, exam: 16 },
      sports: { eval: 17, test: 17, exam: 17.5 },
    },
  },
  {
    id: 'st-m3',
    stage: 'middle',
    matricule: '2026040103',
    fullName: 'عبد الرحمان زروقي',
    birthDate: '2010-12-17',
    classGroup: '4 م 1',
    level: '4 متوسط',
    parentName: 'بلقاسم زروقي',
    parentPhone: '0663 87 45 12',
    halfBoard: false,
    isRepeater: true,
    behaviorNote: 'تأخرات صباحية متكررة — تحت متابعة المشرف التربوي',
    grades: {
      arabic: { eval: 10.5, test: 9.5, exam: 10 },
      math: { eval: 8.5, test: 7.5, exam: 8 },
      physics: { eval: 9.5, test: 9, exam: 9.5 },
      science: { eval: 11, test: 10, exam: 10.5 },
      french: { eval: 8, test: 7.5, exam: 8.5 },
      english: { eval: 10, test: 9.5, exam: 10 },
      hist_geo: { eval: 11.5, test: 11, exam: 11 },
      islamic: { eval: 13.5, test: 13, exam: 14 },
      civics: { eval: 12, test: 11.5, exam: 12 },
      sports: { eval: 16, test: 15.5, exam: 16.5 },
    },
  },
  {
    id: 'st-m4',
    stage: 'middle',
    matricule: '2026040104',
    fullName: 'أيمن بن طوبال',
    birthDate: '2011-03-28',
    classGroup: '4 م 1',
    level: '4 متوسط',
    parentName: 'حسان بن طوبال',
    parentPhone: '0790 22 49 81',
    halfBoard: false,
    behaviorNote: 'تم استدعاء الولي وتوقيع تعهد كتابي بمكتب الاستشارة',
    grades: {
      arabic: { eval: 9, test: 8.5, exam: 8 },
      math: { eval: 7, test: 6.5, exam: 7 },
      physics: { eval: 8.5, test: 8, exam: 8.5 },
      science: { eval: 9.5, test: 9, exam: 9 },
      french: { eval: 7.5, test: 7, exam: 7.5 },
      english: { eval: 8.5, test: 8, exam: 8.5 },
      hist_geo: { eval: 10, test: 9.5, exam: 9.5 },
      islamic: { eval: 12, test: 11.5, exam: 12 },
      civics: { eval: 11, test: 10.5, exam: 11 },
      sports: { eval: 15.5, test: 15, exam: 16 },
    },
  },
  // Secondary Stage (Supervised by Educational Supervisor & Assistant - المشرف والمساعد التربوي في الثانوي)
  {
    id: 'st-s1',
    stage: 'secondary',
    matricule: '2026030101',
    fullName: 'أمير بوعزيز',
    birthDate: '2008-05-11',
    classGroup: '3 ع ت 1',
    level: '3 علوم تجريبية',
    parentName: 'عبد القادر بوعزيز',
    parentPhone: '0550 91 82 73',
    halfBoard: true,
    behaviorNote: 'مترشح بكالوريا متفوق ومنضبط في الأعمال المخبرية',
    grades: {
      arabic: { eval: 16.5, test: 16, exam: 17 },
      math: { eval: 18, test: 17.5, exam: 18.5 },
      physics: { eval: 17.5, test: 17, exam: 18 },
      science: { eval: 18, test: 18, exam: 18.5 },
      french: { eval: 15.5, test: 15, exam: 16 },
      english: { eval: 17, test: 16.5, exam: 17.5 },
      hist_geo: { eval: 16, test: 15.5, exam: 16.5 },
      islamic: { eval: 18.5, test: 18, exam: 19 },
      civics: { eval: 15, test: 14.5, exam: 15.5 },
      sports: { eval: 18, test: 18, exam: 18 },
    },
  },
  {
    id: 'st-s2',
    stage: 'secondary',
    matricule: '2026030102',
    fullName: 'مريم بن شريف',
    birthDate: '2008-09-14',
    classGroup: '3 ع ت 1',
    level: '3 علوم تجريبية',
    parentName: 'إبراهيم بن شريف',
    parentPhone: '0661 32 54 76',
    halfBoard: true,
    behaviorNote: 'مواظبة جيدة مع إعفاء طبي في التربية البدنية',
    grades: {
      arabic: { eval: 14.5, test: 14, exam: 15 },
      math: { eval: 15, test: 14.5, exam: 15.5 },
      physics: { eval: 14, test: 13.5, exam: 14.5 },
      science: { eval: 15.5, test: 15, exam: 16 },
      french: { eval: 15, test: 14.5, exam: 15 },
      english: { eval: 16, test: 15.5, exam: 16.5 },
      hist_geo: { eval: 14.5, test: 14, exam: 15 },
      islamic: { eval: 17, test: 16.5, exam: 17.5 },
      civics: { eval: 13.5, test: 13, exam: 14 },
      sports: { eval: 10, test: 10, exam: 10, exempt: true },
    },
  },
  {
    id: 'st-s3',
    stage: 'secondary',
    matricule: '2026030103',
    fullName: 'وليد قاسمي',
    birthDate: '2007-11-30',
    classGroup: '3 ع ت 1',
    level: '3 علوم تجريبية',
    parentName: 'جمال قاسمي',
    parentPhone: '0770 98 11 23',
    halfBoard: false,
    behaviorNote: 'غيابات متكررة في الفترة المسائية — إشعار ثانٍ مرسل للولي',
    grades: {
      arabic: { eval: 9.5, test: 9, exam: 9.5 },
      math: { eval: 8, test: 7.5, exam: 8 },
      physics: { eval: 8.5, test: 8, exam: 8.5 },
      science: { eval: 9, test: 8.5, exam: 9 },
      french: { eval: 8, test: 7.5, exam: 8 },
      english: { eval: 9.5, test: 9, exam: 9.5 },
      hist_geo: { eval: 10.5, test: 10, exam: 10 },
      islamic: { eval: 12.5, test: 12, exam: 13 },
      civics: { eval: 10, test: 9.5, exam: 10 },
      sports: { eval: 16, test: 16, exam: 16.5 },
    },
  },
];

export const DEFAULT_ABSENCES: AbsenceRecord[] = [
  {
    id: 'abs-p1',
    stage: 'primary',
    type: 'student',
    targetId: 'st-p3',
    personName: 'صهيب دردار',
    classOrRole: '5 إب 1',
    date: '2026-03-04',
    period: 'afternoon',
    durationHours: 2.5,
    status: 'parent_summoned',
    reason: 'غياب في الفترة المسائية بعد وجبة المطعم دون إشعار مسبق من الولي',
    recordedByRole: 'مربي متخصص في الابتدائي (أ. ياسين بن يحيى)',
    entryTicketIssued: false,
    parentNotified: true,
  },
  {
    id: 'abs-p2',
    stage: 'primary',
    type: 'student',
    targetId: 'st-p4',
    personName: 'جنى رحماني',
    classOrRole: '5 إب 1',
    date: '2026-03-03',
    period: 'morning',
    durationHours: 3,
    status: 'health_uds',
    reason: 'مرافقة التلميذة إلى وحدة الكشف والمتابعة الصحية UDS (فحص طبي دوري)',
    recordedByRole: 'مربي متخصص رئيسي (أ. سهام قوري)',
    entryTicketIssued: true,
    parentNotified: true,
  },
  {
    id: 'abs-m1',
    stage: 'middle',
    type: 'student',
    targetId: 'st-m4',
    personName: 'أيمن بن طوبال',
    classOrRole: '4 م 1',
    date: '2026-03-04',
    period: 'hourly',
    durationHours: 2,
    status: 'warning_sent',
    reason: 'غياب غير مبرر في حصة الرياضيات والفيزياء (08:00 - 10:00) — الإشعار الثاني',
    recordedByRole: 'مشرف التربية (أ. كريم بومدين)',
    entryTicketIssued: false,
    parentNotified: true,
  },
  {
    id: 'abs-m2',
    stage: 'middle',
    type: 'student',
    targetId: 'st-m3',
    personName: 'عبد الرحمان زروقي',
    classOrRole: '4 م 1',
    date: '2026-03-04',
    period: 'morning',
    durationHours: 1,
    status: 'late',
    reason: 'تأخر صباحي عن تحية العلم والحصة الأولى بـ 20 دقيقة — تم تسليم بطاقة دخول بتعهد',
    recordedByRole: 'مساعد تربوي (أ. نبيل خضراوي)',
    entryTicketIssued: true,
    parentNotified: true,
  },
  {
    id: 'abs-s1',
    stage: 'secondary',
    type: 'student',
    targetId: 'st-s3',
    personName: 'وليد قاسمي',
    classOrRole: '3 ع ت 1',
    date: '2026-03-04',
    period: 'afternoon',
    durationHours: 3,
    status: 'unjustified',
    reason: 'غياب غير مبرر عن حصة الأعمال المخبرية (علوم الطبيعة والحياة) في الجناح العلمي',
    recordedByRole: 'مشرف رئيسي للتربية (أ. سفيان مرابط)',
    entryTicketIssued: false,
    parentNotified: true,
  },
  {
    id: 'abs-s2',
    stage: 'secondary',
    type: 'student',
    targetId: 'st-s2',
    personName: 'مريم بن شريف',
    classOrRole: '3 ع ت 1',
    date: '2026-03-02',
    period: 'morning',
    durationHours: 2,
    status: 'justified',
    reason: 'مبرر بشهادة طبية مسلمة لمكتب المشرف التربوي (تم تسليم ورقة السماح بالدخول)',
    recordedByRole: 'مشرف التربية (أ. ليلى بن عمارة)',
    entryTicketIssued: true,
    parentNotified: true,
  },
];

export const DEFAULT_STAFF_AND_TEACHERS: TeacherOrStaffMember[] = [
  // Primary
  {
    id: 'stf-p1',
    stage: 'primary',
    name: 'أ. ياسين بن يحيى',
    roleTitle: 'مربي متخصص في المدارس الابتدائية',
    subjectOrZone: 'الساحة · البوابة · المطعم المدرسي · نادي القراءة',
    assignedClasses: ['5 إب 1', '4 إب 1', '3 إب 1'],
    phone: '0552 11 22 33',
    amattiSynced: true,
    absenceRegisterChecked: true,
  },
  {
    id: 'stf-p2',
    stage: 'primary',
    name: 'أ. سهام قوري',
    roleTitle: 'مربي متخصص رئيسي في المدارس الابتدائية',
    subjectOrZone: 'تنسيق المواظبة · الصحة المدرسية UDS · الطور التأسيسي',
    assignedClasses: ['2 إب 1', '1 إب 1'],
    phone: '0661 88 77 66',
    amattiSynced: true,
    absenceRegisterChecked: true,
  },
  {
    id: 'stf-p3',
    stage: 'primary',
    name: 'أ. سميرة بن نوار',
    roleTitle: 'أستاذة مدرسة ابتدائية (قسم تقييم المكتسبات)',
    subjectOrZone: 'اللغة العربية والرياضيات والتربية العلمية',
    assignedClasses: ['5 إب 1'],
    phone: '0771 33 44 55',
    amattiSynced: true,
    absenceRegisterChecked: true,
  },
  // Middle
  {
    id: 'stf-m1',
    stage: 'middle',
    name: 'أ. كريم بومدين',
    roleTitle: 'مشرف التربية (التعليم المتوسط)',
    subjectOrZone: 'الجناح التربوي أ (أقسام 4 متوسط) + مكتب الغيابات',
    assignedClasses: ['4 م 1', '4 م 2'],
    phone: '0550 44 55 66',
    amattiSynced: true,
    absenceRegisterChecked: true,
  },
  {
    id: 'stf-m2',
    stage: 'middle',
    name: 'أ. نبيل خضراوي',
    roleTitle: 'مساعد تربوي (التعليم المتوسط)',
    subjectOrZone: 'البوابة الرئيسية · قاعة المذاكرة · النصف داخلي',
    assignedClasses: ['3 م 1', '2 م 1', '1 م 1'],
    phone: '0663 22 33 44',
    amattiSynced: true,
    absenceRegisterChecked: true,
  },
  {
    id: 'stf-m3',
    stage: 'middle',
    name: 'أ. حليمة زواوي',
    roleTitle: 'مشرف رئيسي للتربية (التعليم المتوسط)',
    subjectOrZone: 'تنسيق كراريس الغياب والرقمنة واستقبال الأولياء',
    assignedClasses: ['4 م 1', '4 م 2', '3 م 1'],
    phone: '0770 12 34 56',
    amattiSynced: true,
    absenceRegisterChecked: true,
  },
  // Secondary
  {
    id: 'stf-s1',
    stage: 'secondary',
    name: 'أ. سفيان مرابط',
    roleTitle: 'مشرف رئيسي للتربية (التعليم الثانوي)',
    subjectOrZone: 'جناح أقسام البكالوريا (3 ع ت / 3 ت ر / 3 آ ف)',
    assignedClasses: ['3 ع ت 1', '3 ت ر 1', '3 آ ف 1'],
    phone: '0555 66 77 88',
    amattiSynced: true,
    absenceRegisterChecked: true,
  },
  {
    id: 'stf-s2',
    stage: 'secondary',
    name: 'أ. ليلى بن عمارة',
    roleTitle: 'مشرف التربية (التعليم الثانوي)',
    subjectOrZone: 'الجناح العلمي والمخابر (السنة 1 و 2 ثانوي)',
    assignedClasses: ['2 ع ت 1', '1 ج م ع ت 1'],
    phone: '0664 99 88 77',
    amattiSynced: true,
    absenceRegisterChecked: true,
  },
  {
    id: 'stf-s3',
    stage: 'secondary',
    name: 'أ. طارق بلقاسم',
    roleTitle: 'مساعد رئيسي للتربية (التعليم الثانوي)',
    subjectOrZone: 'مراقبة الأجنحة · قاعة المداومة · المطعم المدرسي',
    assignedClasses: ['1 ج م ع ت 1', '2 ع ت 1'],
    phone: '0775 43 21 09',
    amattiSynced: false,
    absenceRegisterChecked: true,
  },
];

export const DEFAULT_DUTY_TIMETABLE: DutySlot[] = [
  // Primary (مربي متخصص في الابتدائي)
  {
    id: 'dt-p1',
    stage: 'primary',
    day: 'الأحد',
    period: '07:45 - 08:15',
    zone: 'البوابة والساحة الرئيسية',
    assignedStaff: 'أ. ياسين بن يحيى',
    roleTitle: 'مربي متخصص في الابتدائي',
    taskDescription: 'استقبال التلاميذ، تأطير تحية العلم الوطني، وتنظيم دخول الأفواج إلى الحجرات',
    classGroup: 'جميع الأفواج (1 إب - 5 إب)',
  },
  {
    id: 'dt-p2',
    stage: 'primary',
    day: 'الأحد',
    period: '11:15 - 13:00',
    zone: 'المطعم المدرسي والساحة',
    assignedStaff: 'أ. ياسين بن يحيى + أ. سهام قوري',
    roleTitle: 'مربي متخصص / مربي رئيسي',
    taskDescription: 'مرافقة التلاميذ المستفيدين من الإطعام، مراقبة غسل اليدين، وتأطير استراحة منتصف النهار',
    classGroup: 'المستفيدون من المطعم (128 تلميذ)',
  },
  {
    id: 'dt-p3',
    stage: 'primary',
    day: 'الثلاثاء',
    period: '13:00 - 15:30',
    zone: 'نادي المطالعة والنشاط الثقافي',
    assignedStaff: 'أ. سهام قوري',
    roleTitle: 'مربي متخصص رئيسي',
    taskDescription: 'تنشيط ورشة القراءة والرسم ومرافقة التلاميذ في الأنشطة اللاصفية المسائية',
    classGroup: '4 إب 1 + 5 إب 1',
  },
  // Middle (المشرف التربوي والمساعد التربوي في المتوسط)
  {
    id: 'dt-m1',
    stage: 'middle',
    day: 'الأحد',
    period: '07:45 - 10:00',
    zone: 'الجناح البيداغوجي (أ) + مكتب الغيابات',
    assignedStaff: 'أ. كريم بومدين',
    roleTitle: 'مشرف التربية',
    taskDescription: 'مراقبة دخول التلاميذ، جمع كراريس الغياب للحصة 1 و2، وتسليم أوراق السماح بالدخول',
    classGroup: 'أقسام 4 م 1 · 4 م 2 · 3 م 1',
  },
  {
    id: 'dt-m2',
    stage: 'middle',
    day: 'الأحد',
    period: '10:00 - 12:00',
    zone: 'قاعة المذاكرة المحروسة والساحة',
    assignedStaff: 'أ. نبيل خضراوي',
    roleTitle: 'مساعد تربوي',
    taskDescription: 'تأطير الاستراحة الصباحية ومرافقة الفوج التربوي في قاعة المداومة عند غياب الأستاذ',
    classGroup: 'أقسام 1 م 1 · 2 م 1',
  },
  {
    id: 'dt-m3',
    stage: 'middle',
    day: 'الإثنين',
    period: '12:00 - 13:30',
    zone: 'النظام نصف الداخلي (المطعم والنادي)',
    assignedStaff: 'أ. نبيل خضراوي + أ. كريم بومدين',
    roleTitle: 'مشرف تربوي + مساعد تربوي',
    taskDescription: 'تنظيم تفويج التلاميذ النصف داخليين في المطعم وحراسة الساحة قبل الفترة المسائية',
    classGroup: 'تلاميذ النصف داخلي (185 تلميذ)',
  },
  // Secondary (المشرف التربوي والمساعد التربوي في الثانوي)
  {
    id: 'dt-s1',
    stage: 'secondary',
    day: 'الأحد',
    period: '08:00 - 11:00',
    zone: 'جناح أقسام البكالوريا (الطابق الأول)',
    assignedStaff: 'أ. سفيان مرابط',
    roleTitle: 'مشرف رئيسي للتربية',
    taskDescription: 'ضبط مواظبة أقسام النهائي، مطابقة كراريس الغياب، وإصدار إشعارات الغياب الفورية للأولياء',
    classGroup: '3 ع ت 1 · 3 ت ر 1 · 3 آ ف 1',
  },
  {
    id: 'dt-s2',
    stage: 'secondary',
    day: 'الإثنين',
    period: '13:30 - 16:30',
    zone: 'جناح المخابر العلمية والورشات',
    assignedStaff: 'أ. ليلى بن عمارة',
    roleTitle: 'مشرف التربية',
    taskDescription: 'تأمين حركة التفويج بين القاعات والمخابر العلمية وضبط حضور الأفواج (فوج 1 / فوج 2)',
    classGroup: '2 ع ت 1 · 1 ج م ع ت 1',
  },
  {
    id: 'dt-s3',
    stage: 'secondary',
    day: 'الأربعاء',
    period: '08:00 - 12:00',
    zone: 'البوابة وقاعة المداومة والمطالعة',
    assignedStaff: 'أ. طارق بلقاسم',
    roleTitle: 'مساعد رئيسي للتربية',
    taskDescription: 'مراقبة بطاقات التلاميذ عند المدخل وتأطير قاعة المراجعة الحرة لتلاميذ البكالوريا',
    classGroup: 'جميع الشعب والمستويات',
  },
];

export const DEFAULT_AGENDA: AgendaTask[] = [
  {
    id: 'ag-1',
    stage: 'primary',
    title: 'ضبط قائمة التلاميذ الحاضرين في المطعم المدرسي ومطابقتها مع غيابات الفترة الصباحية',
    category: 'canteen_health',
    dueDate: '2026-03-05',
    targetRole: 'مربي متخصص في الابتدائي',
    legalRef: 'المرسوم التنفيذي 25-54 + المنشور الإطاري للمطاعم المدرسية',
    status: 'completed',
  },
  {
    id: 'ag-2',
    stage: 'primary',
    title: 'مرافقة أفواج السنة الخامسة ابتدائي إلى وحدة الكشف والمتابعة الصحية (UDS) للفحص الدوري',
    category: 'canteen_health',
    dueDate: '2026-03-09',
    targetRole: 'مربي متخصص رئيسي في الابتدائي',
    legalRef: 'الاتفاقية المشتركة للصحة المدرسية 2026',
    status: 'in_progress',
  },
  {
    id: 'ag-3',
    stage: 'middle',
    title: 'تفريغ كراريس الغيابات اليومية وتحرير الإشعارات الأولى والثانية للتلاميذ المتغيبين',
    category: 'absence_followup',
    dueDate: '2026-03-05',
    targetRole: 'مشرف التربية + مساعد تربوي (متوسط)',
    legalRef: 'القرار الوزاري 833 المتعلق بمواظبة التلاميذ والقرار 171',
    status: 'completed',
  },
  {
    id: 'ag-4',
    stage: 'middle',
    title: 'حساب نقاط المواظبة والانضباط وتحضير قوائم التلاميذ المقترحين للإجازات (لوحة الشرف / تشجيع / تهنئة)',
    category: 'council_prep',
    dueDate: '2026-03-14',
    targetRole: 'مشرف رئيسي للتربية (متوسط)',
    legalRef: 'القرار الوزاري 157 المتضمن مجالس الأقسام',
    status: 'in_progress',
  },
  {
    id: 'ag-5',
    stage: 'secondary',
    title: 'مراقبة مواظبة أقسام البكالوريا (3 ثانوي) في حصص الأعمال المخبرية وتبليغ الأولياء عبر الرقمنة',
    category: 'absence_followup',
    dueDate: '2026-03-06',
    targetRole: 'مشرف رئيسي للتربية + مشرف التربية (ثانوي)',
    legalRef: 'المنشور الوزاري لتأطير أقسام الامتحانات الرسمية 2026',
    status: 'in_progress',
  },
  {
    id: 'ag-6',
    stage: 'all',
    title: 'تحديث جداول المداومة التربوية والحراسة العامة خلال فترة اختبارات الفصل الثاني',
    category: 'exam_org',
    dueDate: '2026-03-12',
    targetRole: 'جميع رتب موظفي التربية (ابتدائي · متوسط · ثانوي)',
    legalRef: 'المرسوم التنفيذي 25-54 والقرار الوزاري لمهام موظفي التربية',
    status: 'scheduled',
  },
];

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'leg-2554',
    number: 'المرسوم التنفيذي رقم 25-54',
    date: 'تحيين 2025 / 2026',
    category: 'decree_2554',
    title: 'القانون الأساسي الخاص بالموظفين المنتمين للأسلاك الخاصة بالتربية الوطنية (سلك موظفي التربية)',
    description:
      'النص التشريعي المرجعي الجديد المؤطر لرتب وتصنيفات ومهام موظفي التربية في الأطوار الثلاثة: المربي المتخصص في الابتدائي، المساعد التربوي، ومشرف التربية.',
    isUpdated2026: true,
    fullText: `يحدد المرسوم التنفيذي رقم 25-54 الأحكام الخاصة المطبقة على سلك موظفي التربية في المدارس الابتدائية والمتوسطات والثانويات، ويكرس استحداث وتثمين الرتب التالية:
1. في مرحلة التعليم الابتدائي: سلك المربين المتخصصين في المدارس الابتدائية (رتبة مربي متخصص في المدارس الابتدائية - الصنف 11، ورتبة مربي متخصص رئيسي في المدارس الابتدائية - الصنف 12).
2. في مرحلتي التعليم المتوسط والثانوي:
   - سلك المساعدين التربويين (مساعد تربوي - الصنف 9، ومساعد رئيسي للتربية - الصنف 10).
   - سلك مشرفي التربية (مشرف التربية - الصنف 11، مشرف رئيسي للتربية - الصنف 12، والرتبة المستحدثة: مشرف عام للتربية - الصنف 13).
ويضمن المرسوم مسارات ترقية مهنية واضحة نحو رتب مستشار التربية وناظر المدرسة الابتدائية عبر الامتحان المهني أو التسجيل على قوائم التأهيل.`,
    keyArticles: [
      {
        articleNumber: 'المادة 84 (مربي متخصص في الابتدائي)',
        summary: 'مهام المربي المتخصص في المدارس الابتدائية',
        text: 'يكلف المربي المتخصص في المدارس الابتدائية بمرافقة التلاميذ وتأطيرهم أثناء الدخول والخروج والاستراحة، والإشراف التربوي على المطعم المدرسي، ومتابعة مواظبة التلاميذ وصحتهم المدرسية بالتنسيق مع مدير المدرسة وناظرها.',
      },
      {
        articleNumber: 'المادة 88 (مشرف التربية ومشرف رئيسي)',
        summary: 'مهام مشرف التربية والمشرف الرئيسي في المتوسط والثانوي',
        text: 'يكلف مشرفو التربية بضمان النظام والانضباط داخل المتوسطة أو الثانوية، مراقبة حضور التلاميذ ومواظبتهم، تسليم بطاقات الدخول، المشاركة في تأطير التلاميذ في النظام نصف الداخلي والداخلي، والمساهمة في الأعمال الإدارية والرقمنة.',
      },
      {
        articleNumber: 'المادة 91 (مشرف عام للتربية - رتبة مستحدثة)',
        summary: 'صلاحيات المشرف العام للتربية (الصنف 13)',
        text: 'يكلف المشرف العام للتربية بتنسيق عمل فرق المشرفين والمساعدين التربويين عبر الأجنحة البيداغوجية، وتحليل حصائل المواظبة والسلوك، ومرافقة المشرفين المتربصين تحت سلطة مدير المؤسسة ومستشار التربية.',
      },
      {
        articleNumber: 'المادة 94 (المساعد التربوي والمساعد الرئيسي)',
        summary: 'مهام المساعد التربوي والمساعد الرئيسي للتربية',
        text: 'يسهر المساعد التربوي والمساعد الرئيسي للتربية على المراقبة الفعلية للتلاميذ في الساحة والأجنحة وقاعات المذاكرة والمطعم، وجمع كراريس الغيابات اليومية وتأطير الأنشطة الثقافية والرياضية.',
      },
    ],
  },
  {
    id: 'leg-tasks',
    number: 'القرار الوزاري المحدد لمهام موظفي التربية',
    date: 'تحيين مدونة المهام 2026',
    category: 'tasks_decision',
    title: 'مدونة المهام الرسمية لمشرفي التربية والمساعدين التربويين والمربين المتخصصين وحدود التدخل',
    description:
      'تفصيل الصلاحيات اليومية والتربوية والإدارية لكل رتبة، مع الفصل الواضح بين المهام التربوية الأصيلة والأعمال غير المسندة قانوناً.',
    isUpdated2026: true,
    fullText: `تحدد مدونة المهام الرسمية لموظفي التربية (ابتدائي، متوسط، ثانوي) الواجبات المهنية في ثلاثة محاور كبرى:
أولاً: المحور التربوي والبيداغوجي (مرافقة التلاميذ، تأطير قاعات المداومة والمذاكرة، تنشيط النوادي الثقافية، ومراقبة السلوك والهندام).
ثانياً: محور المواظبة والانضباط (مسك كراريس وسجلات الغيابات اليومية، معالجة التأخرات، تحرير إشعارات الغياب واستدعاءات الأولياء، وإعداد الحصائل الشهرية والفصلية).
ثالثاً: محور الحياة المدرسية والرقمنة (تأطير المطعم المدرسي والنصف داخلي، مرافقة التلاميذ لوحدات الكشف الصحي UDS، والمساهمة في حجز الغيابات والنقاط على الأرضية الرقمية).`,
    keyArticles: [
      {
        articleNumber: 'البند 04 (الحجم الساعي والمداومة)',
        summary: 'تنظيم التوقيت الأسبوعي لموظفي التربية',
        text: 'يضبط جدول عمل موظفي التربية في بداية السنة الدراسية بالتنسيق مع مستشار التربية والناظر ومصادقة مدير المؤسسة، مع احترام الحجم الساعي القانوني لكل رتبة وفترات الراحة القانونية.',
      },
      {
        articleNumber: 'البند 09 (حماية التلاميذ في الابتدائي)',
        summary: 'خصوصية مهام المربي المتخصص في المدرسة الابتدائية',
        text: 'يمنع إخراج أي تلميذ في الطور الابتدائي من المدرسة قبل انتهاء الدوام الرسمي إلا بحضور وليه الشرعي وتوقيعه في سجل الخروج الاستثنائي لدى المربي المتخصص أو إدارة المدرسة.',
      },
    ],
  },
  {
    id: 'leg-833-171',
    number: 'القراران الوزاريان 833 و 171',
    date: 'النظام الداخلي والمواظبة',
    category: 'discipline_171',
    title: 'مواظبة التلاميذ، الإجراءات التدريجية لمعالجة الغيابات، ومجلس التأديب',
    description:
      'الإجراءات القانونية التي يباشرها المشرف التربوي والمساعد التربوي والمربي المتخصص عند تسجيل غيابات أو تأخرات التلاميذ.',
    isUpdated2026: true,
    fullText: `تخضع مواظبة التلاميذ في الأطوار التعليمية الثلاثة لرقابة يومية صارمة يسهر عليها سلك موظفي التربية:
1. يسجل الغياب في كراس الغيابات في بداية كل حصة (في المتوسط والثانوي) أو بداية كل فترة صباحية ومسائية (في الابتدائي).
2. لا يسمح للتلميذ المتغيب أو المتأخر بالدخول إلى القسم إلا ببطاقة سماح بالدخول مؤشرة من المشرف التربوي أو مستشار التربية.
3. عند تكرر الغياب غير المبرر: يرسل الإشعار الأول للولي (بعد 3 غيابات أو 48 ساعة)، ثم الإشعار الثاني والاستدعاء المباشر (بعد 7 أيام)، ثم الإعذار الرسمي والتعهد الكتابي.`,
    keyArticles: [
      {
        articleNumber: 'المادة 12 من القرار 833',
        summary: 'إلزامية بطاقة السماح بالدخول للقسم',
        text: 'يتعين على كل تلميذ تغيب عن حصة واحدة أو أكثر تقديم مبرر قانوني لمكتب المشرف التربوي قبل استلام بطاقة السماح بالدخول إلى حجرة الدرس.',
      },
      {
        articleNumber: 'المادة 21 من القرار 171',
        summary: 'الإجازات والعقوبات المعنوية ومجلس التأديب',
        text: 'تمنح إجازات التسجيل في لوحة الشرف والتشجيع والتهنئة بناءً على النتائج الدراسية وسلامة السلوك والمواظبة التي يوثقها تقرير موظفي التربية أمام مجلس القسم.',
      },
    ],
  },
  {
    id: 'leg-primary-educator',
    number: 'المنشور التنظيمي للمدارس الابتدائية 2026',
    date: 'تحيين 2026',
    category: 'primary_educator',
    title: 'تنظيم عمل المربي المتخصص في المدارس الابتدائية وتأطير المطعم والصحة المدرسية',
    description:
      'التأطير التربوي للتلاميذ في الساحة والمطعم المدرسي والوقاية الصحية (UDS) والنشاطات اللاصفية بالطور الابتدائي.',
    isUpdated2026: true,
    fullText: `يعد المربي المتخصص والمربي المتخصص الرئيسي في المدرسة الابتدائية الركيزة الأساسية لتأطير الحياة المدرسية خارج حجرة الدرس، حيث يتكفل بـ:
- تنظيم دخول وخروج التلاميذ عبر البوابة وضمان أمنهم في الساحة.
- التسيير التربوي للمطعم المدرسي: تفويج التلاميذ، مراقبة الوجبة الشاهدة بالتنسيق مع المدير، وغرس عادات النظافة والتغذية السليمة.
- مسك البطاقية الصحية للتلاميذ ومتابعة فحوصات الكشف المدرسي (UDS) والتلقيحات الدورية.`,
    keyArticles: [
      {
        articleNumber: 'المادة 05 (التأطير التربوي للمطعم)',
        summary: 'دور المربي المتخصص أثناء فترة الإطعام المدرسي',
        text: 'يشرف المربي المتخصص في المدرسة الابتدائية على التعداد اليومي الفعلي للتلاميذ الحاضرين في المطعم المدرسي ويبلغ الإدارة بأي غياب متكرر للمستفيدين.',
      },
    ],
  },
  {
    id: 'leg-digital-2026',
    number: 'المنشور الوزاري 112/2026 (الرقمنة والامتحانات)',
    date: 'فيثري 2026',
    category: 'digital_exams',
    title: 'رقمنة متابعة المواظبة وإشعارات الأولياء الآلية وتنظيم الامتحانات الرسمية (مكتسبات / BEM / BAC)',
    description:
      'ضوابط الحجز الآني للغيابات والإعفاءات في الأرضية الرقمية ومهام موظفي التربية في أمانة وحراسة مراكز الامتحانات.',
    isUpdated2026: true,
    fullText: `تعتمد وزارة التربية الوطنية الحجز اليومي للغيابات والتأخرات عبر الأرضية الرقمية لتبليغ الأولياء آنياً عبر فضاء الأولياء (Awlyaa):
- يتولى موظفو التربية (المربي المتخصص في الابتدائي، والمشرف التربوي في المتوسط والثانوي) مطابقة السجل الورقي مع الحجز الرقمي.
- في الامتحانات الرسمية (تقييم المكتسبات، BEM، BAC)، يشارك مشرفو ومساعدو التربية والمربون المتخصصون في أمانة مراكز الإجراء وتأطير المترشحين والنظام العام.`,
    keyArticles: [
      {
        articleNumber: 'البند 03 (الإشعار الرقمي للأولياء)',
        summary: 'تزامن إشعار الولي الورقي والرقمي',
        text: 'كل غياب غير مبرر يحجز في النظام المعلوماتي يولد إشعاراً في حساب الولي، مع الاحتفاظ بنسخة ورقية من الاستدعاءات والتعهدات في ملف التلميذ بمكتب الاستشارة.',
      },
    ],
  },
  {
    id: 'leg-decision-65',
    number: 'القرار الوزاري رقم 65 المؤرخ في 12 جويلية 2018 (ومطابقته مع 25-54)',
    date: 'تحيين وتكييف 2026',
    category: 'tasks_decision',
    title: 'تحديد كيفيات تنظيم الجماعة التربوية ومهام مشرفي التربية والمساعدين التربويين بدقة',
    description:
      'المرجع التفصيلي المحدد للمهام التربوية والبيداغوجية والإدارية والمالية الممنوعة أو المسندة لموظفي التربية داخل المؤسسات التعليمية.',
    isUpdated2026: true,
    fullText: `يحدد القرار الوزاري رقم 65 المعدل والمكيف مع أحكام المرسوم التنفيذي 25-54 مهام سلك موظفي التربية (المشرف العام، المشرف الرئيسي، مشرف التربية، المساعد الرئيسي، والمساعد التربوي) وفق مبدأ التدرج في المسؤولية والتكامل مع مستشار التربية والناظر:
1. المهام التربوية: المرافقة الميدانية للتلاميذ عند الدخول والخروج، تأطير قاعات المذاكرة والمداومة، تنشيط النوادي الثقافية والرياضية، والسهر على احترام الهندام والنظام الداخلي.
2. المهام الإدارية: مسك السجلات اليومية للغيابات، مطابقة كراريس الغياب في كل حصة، تحرير إشعارات الغياب واستدعاءات الأولياء، والمساهمة في تحضير مجالس الأقسام وحجز النقاط والغيابات في الأرضية الرقمية.
3. الضمانات المهنية: لا يمكن إسناد مهام الحجابة أو الحراسة الليلية أو الأعمال المحاسبية الخاصة بالمقتصدية لموظفي التربية.`,
    keyArticles: [
      {
        articleNumber: 'المادة 14 (ضبط كراريس الغياب)',
        summary: 'المراقبة الساعية لحضور التلاميذ',
        text: 'يقوم المساعد التربوي ومشرف التربية بجمع ومراقبة كراريس الغيابات في الساعة الأولى من كل فترة صباحية ومسائية وتدوين الغيابات في السجل اليومي وتبليغ مستشار التربية.',
      },
      {
        articleNumber: 'المادة 19 (تأطير التلاميذ نصف الداخليين)',
        summary: 'تنظيم المطعم وقاعات المذاكرة',
        text: 'يشارك مشرفو ومساعدو التربية في تأطير التلاميذ النصف داخليين والداخليين أثناء تناول الوجبات الغذائية وفي فترات المذاكرة المحروسة وفق جدول توزيع المهام الأسبوعي.',
      },
      {
        articleNumber: 'المادة 25 (حظر الأعمال غير القانونية)',
        summary: 'حماية موظف التربية من المهام الخارجة عن اختصاصه',
        text: 'يمنع تكليف مشرفي ومساعدي التربية والمربين المتخصصين بمهام البواب أو الصيانة أو قبض الأموال النقدية، وتنحصر مهامهم في التأطير التربوي والإداري للتلاميذ.',
      },
    ],
  },
  {
    id: 'leg-157-173',
    number: 'القراران الوزاريان 157 و 173 (مجالس الأقسام ومجلس التأديب)',
    date: 'التنظيم التربوي للمجالس',
    category: 'discipline_171',
    title: 'تنظيم وسير مجالس الأقسام ومجلس التأديب ودور موظفي التربية في إعداد التقارير الانضباطية',
    description:
      'تحديد صلاحيات مجلس القسم ومجلس التأديب، وكيفية إعداد الحوصلة الفصلية للمواظبة والسلوك التي يقدمها مكتب الاستشارة والمشرفون.',
    isUpdated2026: true,
    fullText: `ينظم القرار 157 سير مجالس الأقسام في نهاية كل فصل دراسي، بينما يحدد القرار 173 إنشاء وتشكيل وسير مجلس التأديب في المتوسطات والثانويات:
- قبل انعقاد مجلس القسم: يعد المشرف الرئيسي ومشرفو التربية قائمة التلاميذ المتغيبين، مجموع الساعات الضائعة، عدد التأخرات، والعقوبات أو التعهدات المسجلة في ملف كل تلميذ.
- في مجلس التأديب: يوثق المشرف التربوي أو المربي المتخصص التقرير المفصل حول المخالفة المسجلة في الساحة أو الجناح أو المطعم مرفقاً بشهادات الشهود وتاريخ إشعار الولي.`,
    keyArticles: [
      {
        articleNumber: 'المادة 08 من القرار 157',
        summary: 'معايير منح الإجازات والجزاءات المدرسية',
        text: 'تمنح إجازات لوحة الشرف والتشجيع والتهنئة للتلاميذ المتفوقين الذين لم تسجل ضدهم غيابات غير مبررة أو مخالفات انضباطية في سجل المشرف التربوي.',
      },
      {
        articleNumber: 'المادة 15 من القرار 173',
        summary: 'تصنيف العقوبات من الدرجة الأولى إلى الثالثة',
        text: 'لا يمكن إحالة أي تلميذ على مجلس التأديب إلا بناءً على ملف قانوني متكامل يتضمن التقرير المفصل للواقعة، سجل المواظبة، واستدعاء الولي الشرعي قبل الجلسة بـ 8 أيام على الأقل.',
      },
    ],
  },
  {
    id: 'leg-canteen-18-03',
    number: 'المرسوم التنفيذي 18-03 والمنشور الوزاري للمطاعم المدرسية',
    date: 'تحيين 2026',
    category: 'primary_educator',
    title: 'الأحكام المطبقة على المطاعم المدرسية ودور المربي المتخصص في الابتدائي',
    description:
      'تنظيم الإطعام المدرسي في الطور الابتدائي، مراقبة النظافة والوجبة الشاهدة، والتنسيق بين مدير المدرسة والمربي المتخصص.',
    isUpdated2026: true,
    fullText: `يحدد المرسوم التنفيذي 18-03 والمنشور التطبيقي له قواعد التسيير التربوي والصحي للمطاعم المدرسية في المدارس الابتدائية:
- يتولى المربي المتخصص في المدارس الابتدائية مرافقة التلاميذ المستفيدين من الإطعام المدرسي من خروجهم من الأقسام على الساعة 11:15 إلى غاية عودتهم للفترة المسائية.
- يضبط المربي المتخصص يومياً سجل حضور التلاميذ في المطعم، ويسهر على غسل أيدي التلاميذ، والهدوء والانضباط داخل قاعة الإطعام، وإبلاغ المدير فوراً عن أي ملاحظة تتعلق بنوعية الوجبة.`,
    keyArticles: [
      {
        articleNumber: 'المادة 16 (الوجبة الشاهدة والوقاية الصحية)',
        summary: 'الرقابة الصحية اليومية في المطعم المدرسي',
        text: 'يتم الاحتفاظ بعينة من الوجبة المقدمة (الوجبة الشاهدة) لمدة 48 ساعة في ثلاجة مخصصة تحت إشراف مدير المدرسة وبحضور المربي المتخصص ومسؤول المطعم.',
      },
    ],
  },
  {
    id: 'leg-holiday-duty',
    number: 'المنشور الوزاري الخاص بالمداومة الإدارية والتربوية',
    date: 'المنشور الإطاري 2025 / 2026',
    category: 'tasks_decision',
    title: 'تنظيم جدول المداومة الإدارية خلال العطل المدرسية وفترات الامتحانات الرسمية',
    description:
      'ضوابط إعداد جدول المداومة بالتناوب العادل بين موظفي الإدارة والتربية واحترام العطل القانونية.',
    isUpdated2026: true,
    fullText: `تخضع المداومة الإدارية خلال العطل المدرسية (الشتاء، الربيع، الصيف) لمبدأ التناوب العادل بين أعضاء الطاقم الإداري والتربوي المعنيين قانوناً:
- تضبط قائمة المداومين مسبقاً وتبلغ للمعنيين قبل خروج التلاميذ للعطلة بـ 72 ساعة على الأقل.
- تقتصر المداومة خلال العطل على ضمان استمرارية المرفق العام واستلام البريد الرسمي، ولا تتجاوز الفترة الصباحية من 08:30 إلى 12:00.`,
    keyArticles: [
      {
        articleNumber: 'البند 02 (التناوب والإنصاف في جدول المداومة)',
        summary: 'توزيع أيام المداومة بالتساوي',
        text: 'يراعى في إعداد جدول المداومة التوزيع المتوازن والعادل بين جميع الموظفين المعنيين مع إعفاء الموظفين الموجودين في عطلة مرضية أو أمومة.',
      },
    ],
  },
];

export const PRINTABLE_TEMPLATES: PrintableTemplate[] = [
  {
    id: 'doc-abs-notice-1',
    stage: 'all',
    category: 'absence_notice',
    title: 'إشعار أول بغياب تلميذ واستدعاء الولي للتبرير',
    roleBadge: 'مشرف تربوي · مساعد تربوي · مربي متخصص',
    description: 'وثيقة رسمية توجه لولي التلميذ عند تسجيل غياب غير مبرر لتقديم التبرير القانوني وحضور الولي.',
    legalHeader: 'تطبيقاً لأحكام القرار الوزاري رقم 833 المتعلق بمواظبة التلاميذ والنظام الداخلي للمؤسسة',
    fields: [
      { key: 'studentName', label: 'اسم ولقب التلميذ(ة)', defaultValue: 'أيمن بن طوبال' },
      { key: 'classGroup', label: 'القسم / الفوج التربوي', defaultValue: '4 م 1' },
      { key: 'parentName', label: 'إلى السيد(ة) ولي أمر التلميذ', defaultValue: 'حسان بن طوبال' },
      { key: 'absenceDates', label: 'تاريخ ومدة الغياب المسجل', defaultValue: 'يوم الأربعاء 04 مارس 2026 (من الساعة 08:00 إلى 10:00 — حصتان)' },
      {
        key: 'noticeBody',
        label: 'مضمون الإشعار والدعوة للحضور',
        defaultValue:
          'ننهي إلى علمكم أن ابنكم المذكور أعلاه قد تغيب عن الدراسة دون مبرر مسبق. وعليه نطلب منكم الحضور شخصياً إلى مكتب الاستشارة التربوية لتبرير هذا الغياب واستلام بطاقة السماح بالدخول في أقرب الآجال حرصاً على مصلحته الدراسية.',
        multiline: true,
      },
    ],
  },
  {
    id: 'doc-entry-ticket',
    stage: 'all',
    category: 'absence_notice',
    title: 'بطاقة سماح بالدخول إلى القسم (بعد غياب أو تأخر)',
    roleBadge: 'مشرف التربية · المساعد التربوي · المربي المتخصص',
    description: 'بطاقة رسمية يسلمها المشرف أو المساعد التربوي للتلميذ لتقديمها للأستاذ عند الدخول إلى الحجرة.',
    legalHeader: 'الجمهورية الجزائرية الديمقراطية الشعبية — مكتب المشرف التربوي والحياة المدرسية',
    fields: [
      { key: 'studentName', label: 'اسم ولقب التلميذ(ة)', defaultValue: 'عبد الرحمان زروقي' },
      { key: 'classGroup', label: 'القسم / الفوج', defaultValue: '4 م 1' },
      { key: 'dateAndHour', label: 'تاريخ وتوقيت تسليم البطاقة', defaultValue: 'يوم 04 مارس 2026 على الساعة 09:00 صباحاً' },
      { key: 'justificationType', label: 'طبيعة التبرير المسجل', defaultValue: 'حضور الولي شخصياً وتوقيع تعهد بالالتزام بالمواقيت الرسمية' },
      {
        key: 'supervisorNote',
        label: 'تأشيرة موظف التربية للسيد(ة) الأستاذ(ة)',
        defaultValue: 'يسمح للتلميذ(ة) المذكور أعلاه بالالتحاق بمقعد الدراسة ابتداءً من هذه الحصة بعد تسوية وضعيته الإدارية بمكتب المشرف التربوي.',
        multiline: true,
      },
    ],
  },
  {
    id: 'doc-pledge-form',
    stage: 'all',
    category: 'discipline',
    title: 'محضر تعهد والتزام كتابي للتلميذ ووليه (المواظبة والسلوك)',
    roleBadge: 'مشرف رئيسي · مشرف تربوي · مربي متخصص',
    description: 'محضر رسمي يوقعه التلميذ ووليه الشرعي بحضور موظف التربية للالتزام بالنظام الداخلي وعدم تكرار الغياب أو الإخلال بالانضباط.',
    legalHeader: 'مرجع: القرار الوزاري رقم 171 المتضمن النظام الداخلي للمؤسسات التربوية',
    fields: [
      { key: 'studentName', label: 'اسم ولقب التلميذ(ة)', defaultValue: 'وليد قاسمي' },
      { key: 'classGroup', label: 'القسم / الشعبة', defaultValue: '3 علوم تجريبية 1' },
      { key: 'parentName', label: 'اسم ولقب الولي ورقم بطاقة التعريف', defaultValue: 'جمال قاسمي — ب.ت.و رقم: 109283745' },
      { key: 'subjectViolation', label: 'موضوع المخالفة أو الغياب المتكرر', defaultValue: 'تكرر الغيابات غير المبررة في الفترة المسائية والتأخر عن حصص الأعمال المخبرية' },
      {
        key: 'pledgeText',
        label: 'نص التعهد والالتزام',
        defaultValue:
          'أشهد أنا الموقع أسفله ولي أمر التلميذ المذكور أعلاه، وبحضور ابني، أننا اطلعنا على مقتضيات النظام الداخلي للمؤسسة، ونتعهد التزاماً تاماً باحترام أوقات الدراسة والمواظبة التامة وحسن السلوك، وفي حال التكرار يتحمل التلميذ الإجراءات التأديبية القانونية المعمول بها.',
        multiline: true,
      },
    ],
  },
  {
    id: 'doc-daily-duty-report',
    stage: 'all',
    category: 'daily_report',
    title: 'التقرير اليومي للمداومة التربوية وحركة التلاميذ والأفواج',
    roleBadge: 'مشرف عام · مشرف رئيسي · مشرف ومساعد تربوي · مربي متخصص',
    description: 'تقرير يومي شامل يدون فيه موظف التربية تعداد الغيابات، غيابات الأساتذة، حالة المطعم، والحوادث أو الملاحظات المسجلة.',
    legalHeader: 'سجل المداومة التربوية والانضباط العام — المرسوم التنفيذي 25-54',
    fields: [
      { key: 'dutyDate', label: 'اليوم والتاريخ', defaultValue: 'الأربعاء 04 مارس 2026' },
      { key: 'wingOrZone', label: 'الجناح التربوي / المرفق المؤطر', defaultValue: 'الجناح البيداغوجي (أ) + الساحة الرئيسية + المطعم المدرسي' },
      { key: 'attendanceSummary', label: 'حوصلة تعداد حضور وغياب التلاميذ', defaultValue: 'التعداد الإجمالي: 420 تلميذ | الحاضرون: 412 | الغائبون: 08 (منهم 05 مبررون و03 تم إشعار أوليائهم)' },
      { key: 'canteenAndStudyHall', label: 'وضعية قاعات المداومة والمطعم المدرسي', defaultValue: 'سير عادي ومنتظم لعملية الإطعام (185 وجبة مقدمة)، وتأطير الفوج 2 م 1 في قاعة المذاكرة من 10:00 إلى 11:00.' },
      {
        key: 'generalObservations',
        label: 'الملاحظات التربوية والأمنية المسجلة',
        defaultValue: 'انضباط تام أثناء تحية العلم الوطني وفترات الاستراحة، وتمت مطابقة كافة كراريس الغيابات اليومية وحجزها في الأرضية الرقمية.',
        multiline: true,
      },
    ],
  },
  {
    id: 'doc-primary-canteen-uds',
    stage: 'primary',
    category: 'canteen_uds',
    title: 'تقرير المربي المتخصص حول المطعم المدرسي والمتابعة الصحية (UDS)',
    roleBadge: 'خاص بالمربي المتخصص في المدارس الابتدائية',
    description: 'نموذج رسمي خاص بالمربي المتخصص في الابتدائي لتوثيق التعداد اليومي للمطعم والوجبة الشاهدة ومرافقة التلاميذ لوحدة الكشف UDS.',
    legalHeader: 'الطور الابتدائي — مصلحة الحياة المدرسية والإطعام والصحة المدرسية',
    fields: [
      { key: 'reportDate', label: 'تاريخ المعاينة والمرافقة', defaultValue: 'الأربعاء 04 مارس 2026' },
      { key: 'registeredCount', label: 'عدد المسجلين في المطعم / الحاضرين فعلياً', defaultValue: 'المسجلون: 135 تلميذ | الحاضرون المستفيدون: 131 تلميذ | الغائبون: 04 تلاميذ' },
      { key: 'mealMenu', label: 'قائمة الوجبة المقدمة والاحتفاظ بالوجبة الشاهدة', defaultValue: 'شوربة خضر + عدس باللحم + فاكهة موسمية (تم رفع عينة الوجبة الشاهدة في الثلاجة لمدة 48 ساعة).' },
      {
        key: 'udsFollowup',
        label: 'متابعة النظافة والصحة المدرسية (UDS)',
        defaultValue:
          'تمت مرافقة التلاميذ لغسل اليدين بالماء والصابون قبل وبعد الأكل، ومرافقة 06 تلاميذ من قسم 5 إب 1 إلى وحدة الكشف والمتابعة الصحية لإجراء الفحص الطبي الدوري.',
        multiline: true,
      },
    ],
  },
  {
    id: 'doc-school-accident',
    stage: 'all',
    category: 'canteen_uds',
    title: 'تقرير أولي عن حادث مدرسي في الساحة أو المطعم أو الورشة',
    roleBadge: 'مربي متخصص · مشرف تربوي · مساعد تربوي',
    description: 'تقرير ميداني فوري يحرره موظف التربية الحاضر أثناء وقوع حادث جسدي لتلميذ قصد إرفاقه بملف التصريح بالحادث المدرسي.',
    legalHeader: 'ملف التأمين المدرسي والتكفل الصحي الاستعجالي بالتلاميذ',
    fields: [
      { key: 'studentName', label: 'اسم ولقب التلميذ(ة) المصاب والـقسم', defaultValue: 'آدم بن ساحلي — قسم 5 إب 1' },
      { key: 'accidentTimePlace', label: 'تاريخ وساعة ومكان وقوع الحادث بدقة', defaultValue: 'يوم 04 مارس 2026 على الساعة 10:15 صباحاً في الساحة الشرقية أثناء فترة الاستراحة' },
      { key: 'witnesses', label: 'الشهود الحاضرون ومؤطر الساحة', defaultValue: 'المؤطر المداوم بالساحة + التلميذان نور اليقين بوعلام وإياد بوقرة' },
      {
        key: 'incidentDetails',
        label: 'ظروف الحادث والإسعافات الأولية المقدمة',
        defaultValue:
          'أثناء فترة الاستراحة تعثر التلميذ وسقط على ذراعه اليمنى. تم التدخل الفوري وتقديم الإسعافات الأولية، وإبلاغ السيد مدير المؤسسة وولي أمر التلميذ هاتفياً ومرافقته للمعاينة الطبية.',
        multiline: true,
      },
    ],
  },
  {
    id: 'doc-staff-leave',
    stage: 'all',
    category: 'staff_admin',
    title: 'طلب رخصة غياب استثنائية لموظف التربية (مشرف / مربي / مساعد)',
    roleBadge: 'الوثائق المهنية لموظفي التربية',
    description: 'نموذج إداري رسمي لطلب ترخيص بالغياب مرفق بتنظيم التغطية والمداومة التربوية بين الزملاء.',
    legalHeader: 'تطبيقاً لأحكام الأمر 06-03 والمرسوم التنفيذي 25-54',
    fields: [
      { key: 'staffFullName', label: 'الاسم واللقب والرتبة الوظيفية', defaultValue: 'كريم بومدين — مشرف التربية' },
      { key: 'leaveDate', label: 'تاريخ ومدة الرخصة المطلوبة', defaultValue: 'يوم الخميس 05 مارس 2026 (الفترة الصباحية من 08:00 إلى 12:00)' },
      { key: 'substituteColleague', label: 'الزميل المكلف بالتغطية والمداومة في الجناح', defaultValue: 'الأستاذ نبيل خضراوي (مساعد تربوي) بالتنسيق مع مكتب الاستشارة' },
      {
        key: 'leaveReason',
        label: 'السبب المبرر للطلب والمرفقات الثبوتية',
        defaultValue: 'ظرف عائلي طارئ / موعد طبي متخصص (مرفق بوثيقة الموعد الطبي).',
        multiline: true,
      },
    ],
  },
];

export interface StudentComputedResult {
  student: StudentRecord;
  subjectResults: {
    subjectId: string;
    subjectName: string;
    coefficient: number;
    eval: number;
    test: number;
    continuousAvg: number;
    exam: number;
    subjectAvg: number;
    weightedScore: number;
    exempt: boolean;
    appreciation: string;
    competencyBadge?: string;
  }[];
  totalCoefficients: number;
  totalWeightedScore: number;
  termAverage: number;
  maxScale: number;
  passingThreshold: number;
  rank: number;
  honorRoll: string;
  councilDecision: string;
  unjustifiedAbsencesCount: number;
  justifiedAbsencesCount: number;
  lateCount: number;
  totalMissedHours: number;
  attendanceScore: number;
  weakSubjects: string[];
}

function getPrimaryCompetency(avg: number) {
  if (avg >= 8.5) return { badge: 'أ (تحكم أقصى)', appreciation: 'تحكم أقصى في الكفاءات المستهدفة' };
  if (avg >= 6.5) return { badge: 'ب (تحكم مقبول)', appreciation: 'تحكم مقبول وجيد في التعلمات' };
  if (avg >= 5) return { badge: 'ج (تحكم جزئي)', appreciation: 'تحكم جزئي — يحتاج تثبيت المكتسبات' };
  return { badge: 'د (تحكم أدنى)', appreciation: 'تحكم أدنى — يدرج في المعالجة البيداغوجية' };
}

function getMiddleSecondaryAppreciation(avg: number) {
  if (avg >= 18) return 'امتياز وتفوق باهر';
  if (avg >= 16) return 'نتائج ممتازة جداً';
  if (avg >= 14) return 'عمل جيد ومثمر';
  if (avg >= 12) return 'نتائج حسنة ومقبولة';
  if (avg >= 10) return 'متوسط — بإمكانك التحسن';
  if (avg >= 8) return 'دون المتوسط — ضاعف المجهود';
  return 'ضعيف جداً — يحتاج مرافقة فورية';
}

function getHonorAndCouncilDecision(avg: number, unjustifiedCount: number, stage: EducationStage) {
  if (stage === 'primary') {
    if (avg >= 8.5)
      return {
        honorRoll: 'امتياز · تحكم أقصى (أ)',
        councilDecision: 'تحكم أقصى في الكفاءات ومواظبة ممتازة — تهنئة وتشجيع',
      };
    if (avg >= 7)
      return {
        honorRoll: 'جدير بالتشجيع · تحكم مقبول (ب)',
        councilDecision: 'تحصيل جيد وانضباط في المدرسة والمطعم — لوحة شرف وتشجيع',
      };
    if (avg >= 5)
      return {
        honorRoll: 'متحكم جزئياً (ج) · ناجح',
        councilDecision: 'مكتسبات مقبولة تسمح بمواصلة التعلمات مع تعزيز القراءة والحساب',
      };
    return {
      honorRoll: 'تحكم أدنى (د) · معالجة بيداغوجية',
      councilDecision: 'إدراج التلميذ في حصص المعالجة التربوية ومرافقة المربي المتخصص والولي',
    };
  }

  if (avg >= 16 && unjustifiedCount === 0)
    return {
      honorRoll: 'تهنئة مجلس القسم',
      councilDecision: 'نتائج ممتازة ومواظبة مثالية موثقة من المشرف التربوي — تهنئة رسمية',
    };
  if (avg >= 14 && unjustifiedCount <= 1)
    return {
      honorRoll: 'تشجيع مجلس القسم',
      councilDecision: 'نتائج جيدة جداً وانضباط منتظم — تشجيع من مجلس القسم',
    };
  if (avg >= 12 && unjustifiedCount <= 2)
    return {
      honorRoll: 'لوحة شرف',
      councilDecision: 'تحصيل حسن وسلوك منضبط — يسجل في لوحة الشرف للفصل',
    };
  if (avg >= 10)
    return {
      honorRoll: unjustifiedCount >= 3 ? 'تحفظ بسبب الغياب' : 'ناجح متوسط',
      councilDecision:
        unjustifiedCount >= 3
          ? 'نتائج مقبولة لكن كثرة الغيابات غير المبررة المسجلة بمكتب المشرف التربوي حرمت التلميذ من الإجازة'
          : 'نتائج متوسطة مقبولة — يوصى بمضاعفة التركيز والمواظبة',
    };
  if (avg >= 8)
    return {
      honorRoll: 'إنذار بالتقصير + متابعة',
      councilDecision: 'دون المعدل — إدراج في حصص الدعم واستدعاء الولي لمكتب المشرف التربوي',
    };
  return {
    honorRoll: 'خطر تعثر — مرافقة عاجلة',
    councilDecision: 'تعثر شديد — تفعيل مخطط المرافقة الفردية مع المشرف التربوي ومستشار التوجيه',
  };
}

export function calculateStudentResults(
  students: StudentRecord[],
  subjects: SubjectConfig[],
  absences: AbsenceRecord[],
  formulaMode: 'ministry_standard' | 'four_divisor' | 'primary_exam_only' = 'ministry_standard',
  includeAttendanceInEval = true,
  stage: EducationStage = 'middle'
): StudentComputedResult[] {
  const stageCfg = STAGE_CONFIGS[stage];
  const maxScale = stageCfg.maxGradeScale;
  const passingThreshold = stageCfg.passingGrade;
  const stageSubjects = subjects.filter((s) => s.stages.includes(stage));

  const computed = students.map((student) => {
    const stAbsences = absences.filter(
      (a) => a.type === 'student' && (a.targetId === student.id || a.personName === student.fullName)
    );
    const unjustifiedAbsencesCount = stAbsences.filter(
      (a) =>
        a.status === 'unjustified' ||
        a.status === 'parent_summoned' ||
        a.status === 'warning_sent' ||
        a.status === 'council_referred'
    ).length;
    const justifiedAbsencesCount = stAbsences.filter(
      (a) => a.status === 'justified' || a.status === 'pledge_signed' || a.status === 'health_uds'
    ).length;
    const lateCount = stAbsences.filter((a) => a.status === 'late').length;
    const totalMissedHours = stAbsences.reduce((acc, a) => acc + (a.durationHours || 0), 0);

    const penaltyPerAbsence = maxScale === 10 ? 0.5 : 1.5;
    const penaltyPerLate = maxScale === 10 ? 0.25 : 0.5;
    const rawAttendanceScore = Math.max(
      0,
      maxScale - unjustifiedAbsencesCount * penaltyPerAbsence - lateCount * penaltyPerLate
    );
    const attendanceScore = Number(rawAttendanceScore.toFixed(2));

    let totalCoefficients = 0;
    let totalWeightedScore = 0;
    const weakSubjects: string[] = [];

    const subjectResults = stageSubjects
      .filter((subj) => {
        const coeff = stage === 'primary' ? 1 : subj.coefficients[student.level] ?? 1;
        return coeff > 0;
      })
      .map((subj) => {
        const coefficient = stage === 'primary' ? 1 : subj.coefficients[student.level] ?? 1;
        const defaultGrade = maxScale === 10 ? 6 : 10;
        const gradeObj = student.grades[subj.id] || {
          eval: defaultGrade,
          test: defaultGrade,
          exam: defaultGrade,
          exempt: false,
        };

        if (gradeObj.exempt) {
          return {
            subjectId: subj.id,
            subjectName: subj.name,
            coefficient,
            eval: gradeObj.eval,
            test: gradeObj.test,
            continuousAvg: 0,
            exam: gradeObj.exam,
            subjectAvg: 0,
            weightedScore: 0,
            exempt: true,
            appreciation: 'معفى طبياً (لا يحتسب في المعامل)',
            competencyBadge: 'معفى',
          };
        }

        const evalClamped = Math.min(maxScale, Math.max(0, gradeObj.eval));
        const testClamped = Math.min(maxScale, Math.max(0, gradeObj.test));
        const examClamped = Math.min(maxScale, Math.max(0, gradeObj.exam));

        const adjustedEval = includeAttendanceInEval
          ? Number((evalClamped * 0.8 + attendanceScore * 0.2).toFixed(2))
          : evalClamped;

        let continuousAvg = adjustedEval;
        let subjectAvg = 0;

        if (stage === 'primary') {
          continuousAvg = adjustedEval;
          subjectAvg = Number(
            (formulaMode === 'primary_exam_only' ? examClamped : (adjustedEval + examClamped) / 2).toFixed(2)
          );
        } else {
          continuousAvg = Number(((adjustedEval + testClamped) / 2).toFixed(2));
          if (formulaMode === 'four_divisor') {
            subjectAvg = Number(((adjustedEval + testClamped + examClamped * 2) / 4).toFixed(2));
          } else {
            subjectAvg = Number(((continuousAvg + examClamped * 2) / 3).toFixed(2));
          }
        }

        const weightedScore = Number((subjectAvg * coefficient).toFixed(2));
        totalCoefficients += coefficient;
        totalWeightedScore += weightedScore;

        if (subjectAvg < passingThreshold) {
          weakSubjects.push(subj.shortName);
        }

        if (stage === 'primary') {
          const comp = getPrimaryCompetency(subjectAvg);
          return {
            subjectId: subj.id,
            subjectName: subj.name,
            coefficient: 1,
            eval: adjustedEval,
            test: testClamped,
            continuousAvg,
            exam: examClamped,
            subjectAvg,
            weightedScore,
            exempt: false,
            appreciation: comp.appreciation,
            competencyBadge: comp.badge,
          };
        }

        return {
          subjectId: subj.id,
          subjectName: subj.name,
          coefficient,
          eval: adjustedEval,
          test: testClamped,
          continuousAvg,
          exam: examClamped,
          subjectAvg,
          weightedScore,
          exempt: false,
          appreciation: getMiddleSecondaryAppreciation(subjectAvg),
        };
      });

    const termAverage = totalCoefficients > 0 ? Number((totalWeightedScore / totalCoefficients).toFixed(2)) : 0;
    const { honorRoll, councilDecision } = getHonorAndCouncilDecision(termAverage, unjustifiedAbsencesCount, stage);

    return {
      student,
      subjectResults,
      totalCoefficients,
      totalWeightedScore: Number(totalWeightedScore.toFixed(2)),
      termAverage,
      maxScale,
      passingThreshold,
      rank: 1,
      honorRoll,
      councilDecision,
      unjustifiedAbsencesCount,
      justifiedAbsencesCount,
      lateCount,
      totalMissedHours,
      attendanceScore,
      weakSubjects,
    };
  });

  computed.sort((a, b) => b.termAverage - a.termAverage);
  computed.forEach((item, index) => {
    item.rank = index + 1;
  });

  return computed;
}
