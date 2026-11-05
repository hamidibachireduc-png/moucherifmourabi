import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Calculator,
  UserCheck,
  BarChart3,
  Users,
  Calendar,
  Scale,
  Database,
  FileText,
  Clock,
  BookOpen,
  Building2,
  Award,
  MessageSquare,
  Settings,
  ShieldCheck,
  Edit3,
  Check,
  RotateCcw,
  School,
  Layers,
  ExternalLink,
} from 'lucide-react';
import {
  EducationStage,
  InstitutionInfo,
  SectionId,
  StaffRoleId,
} from '../types';
import {
  DEFAULT_LOGO_URL,
  QUICK_ROLE_TITLES,
  STAFF_ROLES,
  STAGE_CONFIGS,
} from '../data/mockData';

interface HeaderProps {
  currentSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  activeStage: EducationStage;
  onSelectStage: (stage: EducationStage) => void;
  institution: InstitutionInfo;
  onUpdateInstitution: (inst: InstitutionInfo) => void;
  onOpenSettings: () => void;
  urgentAlertsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onSelectSection,
  activeStage,
  onSelectStage,
  institution,
  onUpdateInstitution,
  onOpenSettings,
  urgentAlertsCount,
}) => {
  const stageCfg = STAGE_CONFIGS[activeStage];
  const activeRoleSpec =
    STAFF_ROLES[institution.activeRoleId] || STAFF_ROLES[stageCfg.defaultRole];
  const currentRoleLabel =
    institution.customRoleTitle || activeRoleSpec.title || stageCfg.staffTitle;

  const [isEditingRole, setIsEditingRole] = useState(false);
  const [roleDraft, setRoleDraft] = useState(currentRoleLabel);
  const [imgError, setImgError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRoleDraft(
      institution.customRoleTitle ||
        (STAFF_ROLES[institution.activeRoleId]?.title ?? stageCfg.staffTitle)
    );
  }, [activeStage, institution.activeRoleId, institution.customRoleTitle, stageCfg.staffTitle]);

  useEffect(() => {
    if (isEditingRole && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingRole]);

  const handleSaveCustomTitle = (newTitle: string) => {
    const trimmed = newTitle.trim() || stageCfg.staffTitle;
    setRoleDraft(trimmed);
    onUpdateInstitution({
      ...institution,
      customRoleTitle: trimmed,
    });
    setIsEditingRole(false);
  };

  const handleSelectRoleRank = (roleId: StaffRoleId) => {
    const spec = STAFF_ROLES[roleId];
    onUpdateInstitution({
      ...institution,
      activeRoleId: roleId,
      customRoleTitle: spec.title,
    });
    setIsEditingRole(false);
  };

  const handleResetRole = () => {
    const defaultRole = stageCfg.defaultRole;
    const spec = STAFF_ROLES[defaultRole];
    setRoleDraft(spec.title);
    onUpdateInstitution({
      ...institution,
      activeRoleId: defaultRole,
      customRoleTitle: undefined,
    });
    setIsEditingRole(false);
  };

  const navItems: {
    id: SectionId;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'الداشبورد الشامل',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'absences',
      label: 'متابعة الغيابات والانضباط',
      icon: <UserCheck className="w-4 h-4" />,
      badge: urgentAlertsCount > 0 ? `${urgentAlertsCount} تنبيه` : 'مرن',
    },
    {
      id: 'averages',
      label: 'الحساب التلقائي للمعدلات',
      icon: <Calculator className="w-4 h-4" />,
      badge: `سلم /${stageCfg.maxGradeScale}`,
    },
    {
      id: 'analytics',
      label: 'تحليلات المواظبة والأداء',
      icon: <BarChart3 className="w-4 h-4" />,
      badge: 'بياني',
    },
    {
      id: 'councils',
      label: 'المجالس التربوية والإدارية واللجان',
      icon: <Users className="w-4 h-4" />,
      badge: '6 مجالس',
    },
    {
      id: 'agenda',
      label: 'مفكرة موظف التربية',
      icon: <Calendar className="w-4 h-4" />,
      badge: 'استحقاقات',
    },
    {
      id: 'legislation',
      label: 'الركن التشريعي والمناشير',
      icon: <Scale className="w-4 h-4" />,
      badge: 'تحيين 2026',
    },
    {
      id: 'digitalization',
      label: 'الربط مع الرقمنة',
      icon: <Database className="w-4 h-4" />,
      badge: 'Amatti',
    },
    {
      id: 'documents',
      label: 'حقيبة الوثائق والنماذج',
      icon: <FileText className="w-4 h-4" />,
      badge: 'نماذج A4',
    },
    {
      id: 'timetable',
      label: 'جداول المداومة والتوقيت',
      icon: <Clock className="w-4 h-4" />,
      badge: `${activeRoleSpec.weeklyHours} س`,
    },
    {
      id: 'community',
      label: 'الجماعة التربوية وكراريس الغياب',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'institutes',
      label: 'المعاهد والهيئات الوصية',
      icon: <Building2 className="w-4 h-4" />,
      badge: '5 هيئات',
    },
    {
      id: 'career',
      label: 'محاكي الدرجات والترقية',
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: 'coordination',
      label: 'فضاء التنسيق SNTE',
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  const logoSrc = institution.logoUrl || DEFAULT_LOGO_URL;

  return (
    <header className="sticky top-0 z-40 bg-[#071912]/95 backdrop-blur-md border-b border-[#c59a3f]/30 shadow-2xl no-print">
      {/* شريط الألوان الوطنية والذهبي */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#8f1414] via-[#d4af37] to-[#105e32]" />

      {/* الشريط العلوي لاختيار الطور التعليمي والرتبة الوظيفية */}
      <div className="bg-[#05120c] border-b border-[#d4af37]/25 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <Layers className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span className="font-bold text-slate-200">
                اختر الطور التعليمي والرتبة (مربي متخصص في الابتدائي · مشرف ومساعد تربوي في المتوسط والثانوي):
              </span>
            </div>
            <a
              href="https://hamidibachireduc-png.github.io/sntedz2026/"
              target="_top"
              className="lg:hidden px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#006633] to-[#004d26] text-white border border-[#FFD700] text-[11px] font-bold flex items-center gap-1 shrink-0"
            >
              <span>العودة للبوابة</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(['primary', 'middle', 'secondary'] as EducationStage[]).map((st) => {
              const cfg = STAGE_CONFIGS[st];
              const isSelected = activeStage === st;
              const stageSubLabel =
                st === 'primary'
                  ? 'مربي متخصص'
                  : 'مشرف + مساعد تربوي';
              return (
                <button
                  key={st}
                  onClick={() => onSelectStage(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] shadow-md'
                      : 'bg-[#0b2318] text-slate-300 hover:text-white border border-[#d4af37]/30'
                  }`}
                >
                  <span>{cfg.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isSelected
                        ? 'bg-[#071710]/20 text-[#071710]'
                        : 'bg-black/30 text-[#f5d77f]'
                    }`}
                  >
                    {stageSubLabel} · /{cfg.maxGradeScale}
                  </span>
                </button>
              );
            })}

            <a
              href="https://hamidibachireduc-png.github.io/sntedz2026/"
              target="_top"
              className="hidden lg:inline-flex px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#006633] to-[#004d26] hover:brightness-110 text-white border border-[#FFD700] text-xs font-bold items-center gap-1.5 shadow transition-all shrink-0 mr-2"
            >
              <span>العودة للبوابة ↩</span>
            </a>
          </div>
        </div>
      </div>

      {/* شريط اختيار الرتبة المباشر داخل الطور المختار */}
      <div className="bg-[#06160f] border-b border-[#d4af37]/15 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#d4af37]">
              الرتب المعتمدة في {stageCfg.name}:
            </span>
            {stageCfg.availableRoles.map((roleId) => {
              const rSpec = STAFF_ROLES[roleId];
              const isRoleActive = institution.activeRoleId === roleId;
              return (
                <button
                  key={roleId}
                  onClick={() => handleSelectRoleRank(roleId)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isRoleActive
                      ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]'
                      : 'bg-[#092016] text-slate-300 hover:text-white border border-transparent'
                  }`}
                >
                  {rSpec.title}
                </button>
              );
            })}
          </div>
          <div className="text-[11px] text-emerald-300 font-semibold tabular-nums">
            {activeRoleSpec.category2554} · النصاب الأسبوعي: {activeRoleSpec.weeklyHours} ساعة
          </div>
        </div>
      </div>

      {/* الهيدر الرئيسي وشعار المنصة */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="relative group cursor-pointer shrink-0"
              onClick={() => onSelectSection('dashboard')}
              title="العودة للداشبورد الشامل"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-tr from-[#8f1414] via-[#d4af37] to-[#105e32] shadow-lg flex items-center justify-center bg-[#06150e] overflow-hidden">
                {!imgError ? (
                  <img
                    src={logoSrc}
                    alt="شعار منصة موظفي التربية SNTE 2026"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover rounded-full filter drop-shadow hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#092216] flex items-center justify-center text-[#d4af37] font-black text-xs text-center">
                    SNTE
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider text-[#d4af37] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>
                    الجمهورية الجزائرية الديمقراطية الشعبية · {stageCfg.name}
                  </span>
                </span>
                <span className="hidden md:inline-block text-[10px] bg-[#8f1414] text-white px-2 py-0.5 rounded font-bold border border-[#f5d77f]/30">
                  SNTE 2026 · المرسوم 25-54
                </span>
              </div>

              <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight flex flex-wrap items-center gap-2 mt-0.5 relative">
                {isEditingRole ? (
                  <span className="inline-flex flex-col gap-2 bg-[#05140d] border border-[#d4af37] rounded-xl p-2.5 shadow-2xl z-50">
                    <span className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#d4af37] whitespace-nowrap">
                        منصة
                      </span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={roleDraft}
                        onChange={(e) => setRoleDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveCustomTitle(roleDraft);
                          if (e.key === 'Escape') setIsEditingRole(false);
                        }}
                        placeholder="أدخل اللقب الوظيفي..."
                        className="px-2.5 py-1 rounded-lg bg-[#092116] border border-[#d4af37]/60 text-white text-xs sm:text-sm font-bold focus:outline-none focus:border-[#f5d77f] min-w-[210px]"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveCustomTitle(roleDraft)}
                        title="تثبيت اللقب"
                        className="p-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] hover:brightness-110 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleResetRole}
                        title="استعادة اللقب الافتراضي للطور"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </span>
                    <span className="flex flex-wrap items-center gap-1">
                      <span className="text-[10px] text-slate-400 ml-1">
                        ألقاب سريعة ({stageCfg.shortName}):
                      </span>
                      {QUICK_ROLE_TITLES[activeStage].map((titleOpt) => (
                        <button
                          key={titleOpt}
                          type="button"
                          onClick={() => handleSaveCustomTitle(titleOpt)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                            roleDraft === titleOpt
                              ? 'bg-[#105e32] text-[#f5d77f] border border-[#d4af37]'
                              : 'bg-[#0b2318] text-slate-300 hover:text-white border border-[#d4af37]/30'
                          }`}
                        >
                          {titleOpt}
                        </button>
                      ))}
                    </span>
                  </span>
                ) : (
                  <span
                    onClick={() => setIsEditingRole(true)}
                    title="انقر لتعديل اللقب يدوياً أو اختيار الرتبة (مربي متخصص، مشرف تربوي، مساعد تربوي)"
                    className="text-white hover:text-[#f5d77f] cursor-pointer inline-flex items-center gap-1.5 border-b border-dashed border-[#d4af37]/60 hover:border-[#f5d77f] pb-0.5 transition-colors group"
                  >
                    <span>منصة {currentRoleLabel}</span>
                    <Edit3 className="w-3.5 h-3.5 text-[#d4af37] opacity-75 group-hover:opacity-100 transition-opacity" />
                  </span>
                )}
                <span className="text-[#d4af37] text-xs sm:text-base font-bold">
                  | المشرف التربوي · المربي المتخصص · المساعد التربوي
                </span>
              </h1>

              <p className="text-xs text-slate-300 hidden sm:block mt-0.5">
                {stageCfg.badgeText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden xl:flex flex-col items-end border-l border-[#d4af37]/20 pl-4 text-right">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                <School className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{institution.schoolName}</span>
              </div>
              <div className="text-[11px] text-slate-300 flex items-center gap-2">
                <span>{institution.wilaya}</span>
                <span>·</span>
                <span className="text-[#e5c158] font-medium">
                  {institution.staffName}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 tabular-nums">
                الموسم الدراسي: {institution.schoolYear} — الفصل {institution.currentTerm}
              </div>
            </div>

            <button
              onClick={onOpenSettings}
              className="px-3 py-2 rounded-xl bg-[#0b2318] hover:bg-[#103824] text-[#f5d77f] border border-[#d4af37]/40 text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer transition-all"
              title="إعدادات المؤسسة والرتبة والشعار"
            >
              <Settings className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline">بيانات المؤسسة والرتبة</span>
            </button>
          </div>
        </div>

        {/* شريط الأركان الـ 13 (نفس تصميم منصة الناظر) */}
        <nav className="flex items-center gap-1.5 py-2.5 overflow-x-auto scrollbar-none border-t border-[#d4af37]/20">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#105e32] to-[#0a3d20] text-[#f5d77f] border border-[#d4af37] shadow-lg'
                    : 'bg-[#081c13]/90 text-slate-300 hover:text-white hover:bg-[#0d2b1d] border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-[#f5d77f]' : 'text-emerald-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono tabular-nums ${
                      isActive
                        ? 'bg-[#d4af37] text-[#071710] font-black'
                        : 'bg-[#05120c] text-[#f5d77f] border border-[#d4af37]/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
