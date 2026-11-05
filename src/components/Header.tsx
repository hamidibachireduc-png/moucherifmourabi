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
    <div className="no-print">
      {/* شريط الألوان الوطنية والذهبي الرفيع */}
      <div className="h-1 w-full bg-gradient-to-r from-[#8f1414] via-[#d4af37] to-[#105e32]" />

      {/* القسم العلوي المدمج (غير مثبت حتى لا يغطي شاشة التطبيق عند التصفح) */}
      <header className="bg-[#071912] border-b border-[#c59a3f]/25">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* الشعار وعنوان المنصة المختصر */}
            <div className="flex items-center gap-2.5">
              <div
                className="relative group cursor-pointer shrink-0"
                onClick={() => onSelectSection('dashboard')}
                title="العودة للداشبورد الشامل"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#8f1414] via-[#d4af37] to-[#105e32] shadow flex items-center justify-center bg-[#06150e] overflow-hidden">
                  {!imgError ? (
                    <img
                      src={logoSrc}
                      alt="شعار منصة موظفي التربية SNTE 2026"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#092216] flex items-center justify-center text-[#d4af37] font-black text-[9px] text-center">
                      SNTE
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <h1 className="text-sm sm:text-base font-black text-white tracking-tight flex flex-wrap items-center gap-1.5 relative">
                    {isEditingRole ? (
                      <span className="inline-flex flex-col gap-1.5 bg-[#05140d] border border-[#d4af37] rounded-xl p-2 shadow-2xl z-50">
                        <span className="flex items-center gap-1">
                          <span className="text-[11px] font-bold text-[#d4af37] whitespace-nowrap">
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
                            className="px-2 py-0.5 rounded bg-[#092116] border border-[#d4af37]/60 text-white text-xs font-bold focus:outline-none focus:border-[#f5d77f] min-w-[170px]"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveCustomTitle(roleDraft)}
                            title="تثبيت اللقب"
                            className="p-1 rounded bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] hover:brightness-110 cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={handleResetRole}
                            title="استعادة اللقب الافتراضي للطور"
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        </span>
                        <span className="flex flex-wrap items-center gap-1">
                          {QUICK_ROLE_TITLES[activeStage].map((titleOpt) => (
                            <button
                              key={titleOpt}
                              type="button"
                              onClick={() => handleSaveCustomTitle(titleOpt)}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
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
                        title="انقر لتعديل اللقب يدوياً"
                        className="text-white hover:text-[#f5d77f] cursor-pointer inline-flex items-center gap-1 border-b border-dashed border-[#d4af37]/50 hover:border-[#f5d77f] transition-colors group"
                      >
                        <span>منصة {currentRoleLabel}</span>
                        <Edit3 className="w-3 h-3 text-[#d4af37] opacity-75 group-hover:opacity-100" />
                      </span>
                    )}
                    <span className="text-[#d4af37] text-[11px] sm:text-xs font-bold hidden md:inline">
                      · SNTE 2026 (المرسوم 25-54)
                    </span>
                  </h1>
                </div>
                <div className="text-[10px] text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#10b981] shrink-0" />
                  <span className="truncate max-w-[220px] sm:max-w-none">
                    {institution.schoolName} ({institution.wilaya}) · {activeRoleSpec.category2554} ({activeRoleSpec.weeklyHours} س/أسبوع)
                  </span>
                </div>
              </div>
            </div>

            {/* اختيار الطور والرتبة والإعدادات في سطر مدمج */}
            <div className="flex flex-wrap items-center gap-1.5">
              {/* أزرار الأطوار الثلاثة المدمجة */}
              <div className="flex items-center bg-[#05120c] p-0.5 rounded-lg border border-[#d4af37]/30">
                {(['primary', 'middle', 'secondary'] as EducationStage[]).map((st) => {
                  const cfg = STAGE_CONFIGS[st];
                  const isSelected = activeStage === st;
                  return (
                    <button
                      key={st}
                      onClick={() => onSelectStage(st)}
                      className={`px-2 py-1 rounded-md text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] shadow'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>{cfg.shortName}</span>
                      <span className="text-[9px] opacity-80">/{cfg.maxGradeScale}</span>
                    </button>
                  );
                })}
              </div>

              {/* قائمة اختيار الرتبة داخل الطور */}
              <select
                value={institution.activeRoleId}
                onChange={(e) => handleSelectRoleRank(e.target.value as StaffRoleId)}
                aria-label="اختيار الرتبة"
                className="px-2 py-1 rounded-lg bg-[#0b2318] border border-[#d4af37]/40 text-[#f5d77f] text-[11px] font-bold focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                {stageCfg.availableRoles.map((roleId) => {
                  const rSpec = STAFF_ROLES[roleId];
                  return (
                    <option key={roleId} value={roleId} className="bg-[#071710] text-white">
                      {rSpec.title}
                    </option>
                  );
                })}
              </select>

              <button
                onClick={onOpenSettings}
                className="px-2.5 py-1 rounded-lg bg-[#0b2318] hover:bg-[#103824] text-[#f5d77f] border border-[#d4af37]/40 text-[11px] font-bold flex items-center gap-1 shadow cursor-pointer transition-all"
                title="إعدادات المؤسسة والنسخ الاحتياطي"
              >
                <Settings className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="hidden sm:inline">الإعدادات</span>
              </button>

              <a
                href="https://hamidibachireduc-png.github.io/sntedz2026/"
                target="_top"
                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#006633] to-[#004d26] hover:brightness-110 text-white border border-[#FFD700]/70 text-[11px] font-bold flex items-center gap-1 shadow transition-all shrink-0"
              >
                <span>البوابة</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* شريط التنقل الرشيق فقط هو المثبت أعلى الشاشة بحجم صغير جداً */}
      <div className="sticky top-0 z-40 bg-[#06160f]/95 backdrop-blur-md border-b border-[#d4af37]/25 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 py-1.5 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#105e32] to-[#0a3d20] text-[#f5d77f] border border-[#d4af37] shadow'
                      : 'bg-[#081c13]/80 text-slate-300 hover:text-white hover:bg-[#0d2b1d] border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-[#f5d77f]' : 'text-emerald-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-mono tabular-nums ${
                        isActive
                          ? 'bg-[#d4af37] text-[#071710] font-black'
                          : 'bg-[#05120c] text-[#f5d77f] border border-[#d4af37]/25'
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
      </div>
    </div>
  );
};
