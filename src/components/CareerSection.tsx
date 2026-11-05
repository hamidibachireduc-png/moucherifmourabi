import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  ShieldCheck,
  Calculator,
  Calendar,
  Coins,
  Clock,
  CheckCircle2,
  Printer,
} from 'lucide-react';
import { InstitutionInfo, StaffRoleId } from '../types';
import { STAFF_ROLES, STAGE_CONFIGS } from '../data/mockData';

interface CareerSectionProps {
  institution: InstitutionInfo;
}

interface RankPromotionSpec {
  roleId: StaffRoleId;
  stageLabel: string;
  category: number;
  baseIndex: number;
  docAllowance: number;
  supervisionRate: number;
  qualificationRate: number;
  supportRate: number;
  promotionPath: string;
  nextRankCategory: number;
  nextRankIndex: number;
}

const RANK_PROMOTION_DATA: RankPromotionSpec[] = [
  {
    roleId: 'primary_specialized_educator',
    stageLabel: 'الطور الابتدائي',
    category: 11,
    baseIndex: 580,
    docAllowance: 3500,
    supervisionRate: 0.35,
    qualificationRate: 0.40,
    supportRate: 0.15,
    promotionPath: 'مربي متخصص رئيسي في المدارس الابتدائية (الصنف 12)',
    nextRankCategory: 12,
    nextRankIndex: 635,
  },
  {
    roleId: 'primary_principal_educator',
    stageLabel: 'الطور الابتدائي',
    category: 12,
    baseIndex: 635,
    docAllowance: 4000,
    supervisionRate: 0.38,
    qualificationRate: 0.42,
    supportRate: 0.15,
    promotionPath: 'ناظر مدرسة ابتدائية / مستشار التغذية المدرسية (الصنف 14)',
    nextRankCategory: 14,
    nextRankIndex: 767,
  },
  {
    roleId: 'educational_assistant',
    stageLabel: 'المتوسط والثانوي',
    category: 9,
    baseIndex: 472,
    docAllowance: 2500,
    supervisionRate: 0.30,
    qualificationRate: 0.35,
    supportRate: 0.15,
    promotionPath: 'مساعد رئيسي للتربية (الصنف 10) أو مشرف التربية (الصنف 11)',
    nextRankCategory: 10,
    nextRankIndex: 523,
  },
  {
    roleId: 'principal_assistant',
    stageLabel: 'المتوسط والثانوي',
    category: 10,
    baseIndex: 523,
    docAllowance: 3000,
    supervisionRate: 0.32,
    qualificationRate: 0.38,
    supportRate: 0.15,
    promotionPath: 'مشرف التربية (الصنف 11) بالامتحان المهني أو التأهيل أو الشهادة',
    nextRankCategory: 11,
    nextRankIndex: 580,
  },
  {
    roleId: 'educational_supervisor',
    stageLabel: 'المتوسط والثانوي',
    category: 11,
    baseIndex: 580,
    docAllowance: 3500,
    supervisionRate: 0.35,
    qualificationRate: 0.40,
    supportRate: 0.15,
    promotionPath: 'مشرف رئيسي للتربية (الصنف 12)',
    nextRankCategory: 12,
    nextRankIndex: 635,
  },
  {
    roleId: 'principal_supervisor',
    stageLabel: 'المتوسط والثانوي',
    category: 12,
    baseIndex: 635,
    docAllowance: 4000,
    supervisionRate: 0.38,
    qualificationRate: 0.42,
    supportRate: 0.15,
    promotionPath: 'مشرف عام للتربية (الصنف 13) أو مستشار التربية (الصنف 13/14)',
    nextRankCategory: 13,
    nextRankIndex: 698,
  },
  {
    roleId: 'general_supervisor',
    stageLabel: 'المتوسط والثانوي',
    category: 13,
    baseIndex: 698,
    docAllowance: 4500,
    supervisionRate: 0.40,
    qualificationRate: 0.45,
    supportRate: 0.15,
    promotionPath: 'مستشار التربية / مستشار رئيسي للتربية (الصنف 14/15)',
    nextRankCategory: 14,
    nextRankIndex: 767,
  },
];

function calculateDateDiff(fromDateStr: string, toDateStr: string) {
  const start = new Date(fromDateStr);
  const end = new Date(toDateStr);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return { years: 0, months: 0, days: 0, totalYearsDecimal: 0 };
  }
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += 30;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const totalYearsDecimal = Number((years + months / 12 + days / 365).toFixed(2));
  return { years, months, days, totalYearsDecimal };
}

function addMonthsToDate(dateStr: string, monthsToAdd: number): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '—';
  d.setMonth(d.getMonth() + monthsToAdd);
  return d.toISOString().slice(0, 10);
}

export const CareerSection: React.FC<CareerSectionProps> = ({
  institution,
}) => {
  const stageCfg = STAGE_CONFIGS[institution.stage];
  const [activeTab, setActiveTab] = useState<
    'salary_allowances' | 'promotion_seniority' | 'retirement_2026' | 'echelon_table'
  >('salary_allowances');

  const [selectedRoleId, setSelectedRoleId] = useState<StaffRoleId>(
    institution.activeRoleId
  );
  const [echelon, setEchelon] = useState<number>(6);
  const [pace, setPace] = useState<'min' | 'med' | 'max'>('min');

  // تواريخ الأقدمية والترقية
  const [firstHireDate, setFirstHireDate] = useState<string>('2012-09-01');
  const [currentRankDate, setCurrentRankDate] = useState<string>('2019-09-01');
  const [lastEchelonDate, setLastEchelonDate] = useState<string>('2024-03-01');
  const [referenceCalcDate, setReferenceCalcDate] = useState<string>('2026-11-05');

  // المنح العائلية والمنطقة والمردودية
  const [childrenCount, setChildrenCount] = useState<number>(2);
  const [singleIncomeSpouse, setSingleIncomeSpouse] = useState<boolean>(true);
  const [zoneBonusRate, setZoneBonusRate] = useState<number>(0); // 0%, 10% هضاب, 25% جنوب
  const [yieldRate, setYieldRate] = useState<number>(30); // 30% أو 40%
  const [inspectorNote, setInspectorNote] = useState<number>(19); // نقطة التفتيش /20

  // معطيات التقاعد بالقوانين الجديدة
  const [birthDate, setBirthDate] = useState<string>('1974-05-15');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [use3YearEducReduction, setUse3YearEducReduction] = useState<boolean>(true);
  const [maternityChildrenReduction, setMaternityChildrenReduction] = useState<number>(2);

  const currentRank =
    RANK_PROMOTION_DATA.find((r) => r.roleId === selectedRoleId) ||
    RANK_PROMOTION_DATA[0];
  const roleSpec = STAFF_ROLES[currentRank.roleId];

  // 1. حسابات الراتب والمنح والعلاوات
  const pointValueDZD = 45;
  const echelonPoints = Math.round(currentRank.baseIndex * 0.05 * echelon);
  const totalIndexPoints = currentRank.baseIndex + echelonPoints;

  const baseSalary = totalIndexPoints * pointValueDZD;
  const rawBaseOnly = currentRank.baseIndex * pointValueDZD;
  const iepBonus = echelonPoints * pointValueDZD;

  // العلاوات والتعويضات الخاصة بسلك موظفي التربية
  const supervisionAllowance = Math.round(baseSalary * currentRank.supervisionRate);
  const qualificationAllowance = Math.round(baseSalary * currentRank.qualificationRate);
  const supportAllowance = Math.round(baseSalary * currentRank.supportRate);
  const documentationAllowance = currentRank.docAllowance;
  const zoneAllowance = Math.round(rawBaseOnly * (zoneBonusRate / 100));

  const grossSubjectToSS =
    baseSalary +
    supervisionAllowance +
    qualificationAllowance +
    supportAllowance +
    documentationAllowance +
    zoneAllowance;

  const socialSecurityDeduction = Math.round(grossSubjectToSS * 0.09);
  const taxableIncome = grossSubjectToSS - socialSecurityDeduction;

  // حساب تقريبي للضريبة على الدخل الإجمالي IRG وفق السلم الجزائري
  const estimateIRG = (taxable: number) => {
    if (taxable <= 30000) return 0;
    if (taxable <= 35000) return Math.round((taxable - 30000) * 0.23 * 0.6);
    return Math.round(2500 + (taxable - 35000) * 0.23);
  };
  const irgDeduction = estimateIRG(taxableIncome);

  const familyAllowance =
    childrenCount * 300 + (singleIncomeSpouse ? 800 : 0);

  const netMonthlySalary =
    grossSubjectToSS -
    socialSecurityDeduction -
    irgDeduction +
    familyAllowance;

  // منحة المردودية وتسيير الحياة المدرسية (ثلاثية كل 3 أشهر)
  const quarterlyYieldGross = Math.round(
    baseSalary * 3 * (yieldRate / 100)
  );
  const quarterlyYieldNet = Math.round(quarterlyYieldGross * 0.819); // بعد اقتطاع 9% ض.اجتماعي و 10% ضريبة

  // 2. حسابات الأقدمية والترقية في الدرجة والرتبة
  const generalSeniority = calculateDateDiff(firstHireDate, referenceCalcDate);
  const rankSeniority = calculateDateDiff(currentRankDate, referenceCalcDate);

  const paceMonths = pace === 'min' ? 30 : pace === 'med' ? 36 : 42;
  const nextEchelonDate = addMonthsToDate(lastEchelonDate, paceMonths);
  const nextEchelonNumber = Math.min(12, echelon + 1);
  const nextEchelonPoints = Math.round(
    currentRank.baseIndex * 0.05 * nextEchelonNumber
  );
  const netGainNextEchelon = Math.round(
    (nextEchelonPoints - echelonPoints) *
      pointValueDZD *
      (1 +
        currentRank.supervisionRate +
        currentRank.qualificationRate +
        currentRank.supportRate) *
      0.78
  );

  // شروط الترقية في الرتبة (5 سنوات للامتحان المهني، 10 سنوات للتسجيل على قوائم التأهيل)
  const examEligibleDate = addMonthsToDate(currentRankDate, 60);
  const listEligibleDate = addMonthsToDate(currentRankDate, 120);
  const isExamEligible = rankSeniority.totalYearsDecimal >= 5;
  const isListEligible = rankSeniority.totalYearsDecimal >= 10;

  // حساب مجموع نقاط ملف الترقية الاختيارية (قوائم التأهيل)
  const promotionFileScore = Number(
    (
      rankSeniority.totalYearsDecimal * 2 +
      (generalSeniority.totalYearsDecimal - rankSeniority.totalYearsDecimal) * 1 +
      echelon * 1.5 +
      inspectorNote * 2
    ).toFixed(2)
  );

  // 3. حسابات التقاعد بالقوانين الجديدة (تخفيض 3 سنوات لقطاع التربية + تخفيض الأمومة)
  const currentAge = calculateDateDiff(birthDate, referenceCalcDate);
  const standardLegalAge = gender === 'male' ? 60 : 55;
  const educReductionYears = use3YearEducReduction ? 3 : 0;
  const maternityReductionYears =
    gender === 'female' ? Math.min(3, maternityChildrenReduction) : 0;
  const effectiveRetirementAge =
    standardLegalAge - educReductionYears - maternityReductionYears;

  const retirementEligibilityDate = addMonthsToDate(
    birthDate,
    effectiveRetirementAge * 12
  );
  const totalServiceAtRetirement = Math.max(
    generalSeniority.totalYearsDecimal,
    calculateDateDiff(firstHireDate, retirementEligibilityDate).totalYearsDecimal
  );
  const pensionRate = Math.min(
    80,
    Number((totalServiceAtRetirement * 2.5).toFixed(1))
  );
  const referenceMonthlyPensionBase = Math.round(
    grossSubjectToSS * 0.91 + quarterlyYieldNet / 3
  );
  const estimatedNetPension = Math.round(
    referenceMonthlyPensionBase * (pensionRate / 100) * 0.96
  );

  return (
    <div className="space-y-6">
      {/* الترويسة الرئيسية لمحاكي المسار المهني الشامل */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white text-xs font-bold">
              محاكي المسار المهني، المنح والعلاوات، الأقدمية، والتقاعد (المرسوم 25-54 — تحيين 2026)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1.5">
              <Award className="w-6 h-6 text-[#d4af37]" />
              <span>
                المحاكي الشامل للدرجات، الترقية، العلاوات، الأقدمية والتقاعد ({stageCfg.name})
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              حاسبة دقيقة مخصصة لسلك موظفي التربية (المربي المتخصص في الابتدائي، والمشرف التربوي والمساعد التربوي في المتوسط والثانوي) تشمل كشف الراتب والمنح، حساب الأقدمية والترقية في الدرجة والرتبة، وحساب التقاعد بتخفيض 3 سنوات الجديد.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start lg:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة بطاقة المحاكاة وكشف الراتب</span>
          </button>
        </div>

        {/* شريط اختيار الرتبة والدرجة السريع */}
        <div className="mt-4 pt-4 border-t border-[#d4af37]/20 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-bold text-[#f5d77f] mb-1">
              الرتبة الوظيفية (المرسوم 25-54):
            </label>
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value as StaffRoleId)}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/50 text-white font-bold"
            >
              {RANK_PROMOTION_DATA.map((r) => (
                <option key={r.roleId} value={r.roleId}>
                  {STAFF_ROLES[r.roleId].title} — الصنف {r.category} ({r.stageLabel})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-300">
                الدرجة الحالية (1 إلى 12):
              </label>
              <span className="font-black text-[#f5d77f] tabular-nums">
                الدرجة {echelon} (+{echelonPoints} نقطة)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={echelon}
              onChange={(e) => setEchelon(Number(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer mt-1"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              وتيرة الترقية في الدرجات:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'min', label: 'دنيا (2.5 س)' },
                { id: 'med', label: 'متوسطة (3 س)' },
                { id: 'max', label: 'قصوى (3.5 س)' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPace(p.id as 'min' | 'med' | 'max')}
                  className={`py-1.5 px-2 rounded-lg border font-bold cursor-pointer ${
                    pace === p.id
                      ? 'bg-[#105e32] text-[#f5d77f] border-[#d4af37]'
                      : 'bg-[#05140d] text-slate-300 border-[#d4af37]/25'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* تبويبات المحاكي الأربعة */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#d4af37]/20">
          {[
            {
              id: 'salary_allowances',
              label: '1. حساب المنح والعلاوات وكشف الراتب والمردودية',
              icon: <Coins className="w-4 h-4" />,
            },
            {
              id: 'promotion_seniority',
              label: '2. حساب الأقدمية والترقية في الدرجة والرتبة',
              icon: <TrendingUp className="w-4 h-4" />,
            },
            {
              id: 'retirement_2026',
              label: '3. حاسبة التقاعد بالقوانين الجديدة (-3 سنوات)',
              icon: <Clock className="w-4 h-4" />,
            },
            {
              id: 'echelon_table',
              label: '4. الشبكة الاستدلالية وجدول الدرجات (1 - 12)',
              icon: <Calculator className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as
                    | 'salary_allowances'
                    | 'promotion_seniority'
                    | 'retirement_2026'
                    | 'echelon_table'
                )
              }
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] shadow-md'
                  : 'bg-[#05140d] text-slate-300 hover:text-white border border-[#d4af37]/30'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* التبويب الأول: حساب المنح والعلاوات وكشف الراتب التفصيلي */}
      {activeTab === 'salary_allowances' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4 text-xs">
            <h3 className="text-sm sm:text-base font-black text-white border-b border-[#d4af37]/20 pb-2.5">
              معطيات المنح العائلية، المنطقة، والمردودية:
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  عدد الأولاد المتمدرسين:
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={childrenCount}
                  onChange={(e) => setChildrenCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  منحة الأجر الوحيد:
                </label>
                <select
                  value={singleIncomeSpouse ? 'yes' : 'no'}
                  onChange={(e) => setSingleIncomeSpouse(e.target.value === 'yes')}
                  className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
                >
                  <option value="yes">نعم (+800 دج)</option>
                  <option value="no">لا (0 دج)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  منحة المنطقة الجغرافية:
                </label>
                <select
                  value={zoneBonusRate}
                  onChange={(e) => setZoneBonusRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
                >
                  <option value={0}>الشمال (0%)</option>
                  <option value={10}>الهضاب العليا (10%)</option>
                  <option value={25}>الجنوب (25%)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  نسبة منحة المردودية (ثلاثية):
                </label>
                <select
                  value={yieldRate}
                  onChange={(e) => setYieldRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
                >
                  <option value={30}>30% (تسيير ومواظبة)</option>
                  <option value={40}>40% (الحد الأقصى للامتياز)</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#06150e] border border-[#d4af37]/30 space-y-2">
              <div className="text-[#f5d77f] font-black">
                ملخص الصنف والنقاط الاستدلالية ({roleSpec.shortTitle}):
              </div>
              <div className="flex justify-between text-slate-300">
                <span>الصنف والرقم الاستدلالي القاعدي:</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  الصنف {currentRank.category} ({currentRank.baseIndex} نقطة)
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>نقاط الدرجة {echelon}:</span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums">
                  +{echelonPoints} نقطة
                </span>
              </div>
              <div className="flex justify-between text-slate-300 border-t border-[#d4af37]/20 pt-1.5">
                <span className="font-bold text-white">المجموع الاستدلالي (× 45 دج):</span>
                <span className="font-mono font-black text-[#f5d77f] tabular-nums">
                  {totalIndexPoints} نقطة
                </span>
              </div>
            </div>
          </div>

          {/* كشف الراتب التفصيلي والمنح */}
          <div className="lg:col-span-7 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d4af37]/20 pb-3">
              <div>
                <h3 className="text-base font-black text-white">
                  كشف الراتب الشهري التفصيلي ومختلف المنح والعلاوات ({roleSpec.title})
                </h3>
                <p className="text-[11px] text-slate-400">
                  الصنف {currentRank.category} · الدرجة {echelon} · قيمة النقطة الاستدلالية: 45 دج
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] font-black text-sm tabular-nums shadow">
                الصافي الشهري: {netMonthlySalary.toLocaleString('fr-DZ')} دج
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#05120c] text-[#f5d77f] border-b border-[#d4af37]/30">
                    <th className="py-2.5 px-3 font-bold">بيان الراتب والمنح والعلاوات</th>
                    <th className="py-2.5 px-3 font-bold text-center">النسبة / الأساس</th>
                    <th className="py-2.5 px-3 font-bold text-left">المبلغ الشهري (دج)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 tabular-nums">
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">الأجر القاعدي (الصنف {currentRank.category})</td>
                    <td className="py-2 px-3 text-center text-slate-300">{currentRank.baseIndex} × 45 دج</td>
                    <td className="py-2 px-3 text-left font-mono font-bold text-white">{rawBaseOnly.toLocaleString('fr-DZ')} دج</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-emerald-300">تعويض الخبرة المهنية (IEP — الدرجة {echelon})</td>
                    <td className="py-2 px-3 text-center text-slate-300">{echelonPoints} × 45 دج</td>
                    <td className="py-2 px-3 text-left font-mono font-bold text-emerald-300">+{iepBonus.toLocaleString('fr-DZ')} دج</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-slate-200">تعويض التأطير والمتابعة التربوية</td>
                    <td className="py-2 px-3 text-center text-slate-300">{Math.round(currentRank.supervisionRate * 100)}%</td>
                    <td className="py-2 px-3 text-left font-mono text-slate-200">+{supervisionAllowance.toLocaleString('fr-DZ')} دج</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-slate-200">تعويض التأهيل التربوي والإداري</td>
                    <td className="py-2 px-3 text-center text-slate-300">{Math.round(currentRank.qualificationRate * 100)}%</td>
                    <td className="py-2 px-3 text-left font-mono text-slate-200">+{qualificationAllowance.toLocaleString('fr-DZ')} دج</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-slate-200">تعويض الدعم المدرسي والمعالجة</td>
                    <td className="py-2 px-3 text-center text-slate-300">{Math.round(currentRank.supportRate * 100)}%</td>
                    <td className="py-2 px-3 text-left font-mono text-slate-200">+{supportAllowance.toLocaleString('fr-DZ')} دج</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-slate-200">منحة التوثيق التربوي</td>
                    <td className="py-2 px-3 text-center text-slate-300">مبلغ جزافي</td>
                    <td className="py-2 px-3 text-left font-mono text-slate-200">+{documentationAllowance.toLocaleString('fr-DZ')} دج</td>
                  </tr>
                  {zoneAllowance > 0 && (
                    <tr>
                      <td className="py-2 px-3 text-amber-300">منحة المنطقة الجغرافية</td>
                      <td className="py-2 px-3 text-center text-slate-300">{zoneBonusRate}%</td>
                      <td className="py-2 px-3 text-left font-mono text-amber-300">+{zoneAllowance.toLocaleString('fr-DZ')} دج</td>
                    </tr>
                  )}
                  <tr className="bg-[#05140d]">
                    <td className="py-2 px-3 font-black text-[#f5d77f]">الراتب الخام الخاضع للاقتطاع</td>
                    <td className="py-2 px-3 text-center text-slate-400">100%</td>
                    <td className="py-2 px-3 text-left font-mono font-black text-[#f5d77f]">{grossSubjectToSS.toLocaleString('fr-DZ')} دج</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-rose-300">اقتطاع الضمان الاجتماعي والتقاعد (CNAS/CNR)</td>
                    <td className="py-2 px-3 text-center text-rose-300">-9%</td>
                    <td className="py-2 px-3 text-left font-mono text-rose-300">-{socialSecurityDeduction.toLocaleString('fr-DZ')} دج</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-rose-300">اقتطاع الضريبة على الدخل الإجمالي (IRG)</td>
                    <td className="py-2 px-3 text-center text-rose-300">سلم IRG</td>
                    <td className="py-2 px-3 text-left font-mono text-rose-300">-{irgDeduction.toLocaleString('fr-DZ')} دج</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-emerald-300">المنح العائلية + الأجر الوحيد</td>
                    <td className="py-2 px-3 text-center text-slate-300">{childrenCount} أولاد</td>
                    <td className="py-2 px-3 text-left font-mono text-emerald-300">+{familyAllowance.toLocaleString('fr-DZ')} دج</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#06150e] border border-emerald-600/50 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">الأجر الصافي الشهري</div>
                  <div className="text-lg font-black text-emerald-400 tabular-nums">
                    {netMonthlySalary.toLocaleString('fr-DZ')} دج
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="p-3.5 rounded-xl bg-[#06150e] border border-[#d4af37]/50 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">
                    منحة المردودية الصافية (كل 3 أشهر — {yieldRate}%)
                  </div>
                  <div className="text-lg font-black text-[#f5d77f] tabular-nums">
                    {quarterlyYieldNet.toLocaleString('fr-DZ')} دج
                  </div>
                </div>
                <Award className="w-6 h-6 text-[#d4af37]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* التبويب الثاني: حساب الأقدمية العامة، الأقدمية في الرتبة، والترقية */}
      {activeTab === 'promotion_seniority' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4 text-xs">
            <h3 className="text-sm sm:text-base font-black text-white border-b border-[#d4af37]/20 pb-2.5 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#d4af37]" />
              <span>تواريخ السريان لحساب الأقدمية والترقية:</span>
            </h3>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                تاريخ أول توظيف في القطاع (الأقدمية العامة):
              </label>
              <input
                type="date"
                value={firstHireDate}
                onChange={(e) => setFirstHireDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                تاريخ التعيين في الرتبة الحالية ({roleSpec.shortTitle}):
              </label>
              <input
                type="date"
                value={currentRankDate}
                onChange={(e) => setCurrentRankDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                تاريخ سريان آخر درجة (الدرجة {echelon}):
              </label>
              <input
                type="date"
                value={lastEchelonDate}
                onChange={(e) => setLastEchelonDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  تاريخ الحساب المرجعي:
                </label>
                <input
                  type="date"
                  value={referenceCalcDate}
                  onChange={(e) => setReferenceCalcDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  نقطة التفتيش / الإشراف (/20):
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="10"
                  max="20"
                  value={inspectorNote}
                  onChange={(e) => setInspectorNote(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {/* بطاقات الأقدمية المحسوبة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#081a12] border border-[#d4af37]/40">
                <div className="text-xs text-slate-400">الأقدمية العامة في التربية الوطنية</div>
                <div className="text-2xl font-black text-white mt-1 tabular-nums">
                  {generalSeniority.years} سنة و {generalSeniority.months} شهر و{' '}
                  {generalSeniority.days} يوم
                </div>
                <div className="text-[11px] text-emerald-300 mt-1 tabular-nums">
                  المعادل العشري: {generalSeniority.totalYearsDecimal} سنة خدمة
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#081a12] border border-[#d4af37]/40">
                <div className="text-xs text-slate-400">
                  الأقدمية في الرتبة الحالية ({roleSpec.shortTitle})
                </div>
                <div className="text-2xl font-black text-[#f5d77f] mt-1 tabular-nums">
                  {rankSeniority.years} سنة و {rankSeniority.months} شهر و{' '}
                  {rankSeniority.days} يوم
                </div>
                <div className="text-[11px] text-slate-300 mt-1 tabular-nums">
                  مجموع نقاط ملف التأهيل التقديري: {promotionFileScore} نقطة
                </div>
              </div>
            </div>

            {/* الترقية في الدرجة القادمة */}
            <div className="p-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-emerald-300">
                  1. استحقاق الترقية في الدرجة (من الدرجة {echelon} إلى الدرجة{' '}
                  {nextEchelonNumber}):
                </h4>
                <span className="px-3 py-1 rounded-lg bg-[#105e32] text-[#f5d77f] font-black tabular-nums">
                  تاريخ السريان القادم: {nextEchelonDate}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                بناءً على وتيرة الترقية المختارة ({pace === 'min' ? 'المدة الدنيا: 30 شهراً' : pace === 'med' ? 'المدة المتوسطة: 36 شهراً' : 'المدة القصوى: 42 شهراً'})، تستحق الدرجة {nextEchelonNumber} بتاريخ{' '}
                <span className="font-bold text-white tabular-nums">{nextEchelonDate}</span> بزيادة صافية شهرية تقدر بـ{' '}
                <span className="font-bold text-emerald-400 tabular-nums">
                  +{netGainNextEchelon.toLocaleString('fr-DZ')} دج/شهرياً
                </span>
                .
              </p>
            </div>

            {/* الترقية في الرتبة الأعلى وفق المرسوم 25-54 */}
            <div className="p-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 space-y-3 text-xs">
              <h4 className="text-sm font-black text-[#f5d77f]">
                2. حساب أهلية الترقية للرتبة الأعلى: {currentRank.promotionPath}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#06150e] border border-[#d4af37]/30 space-y-1">
                  <div className="font-bold text-white">
                    أ) الترقية عن طريق الامتحان المهني (5 سنوات):
                  </div>
                  <div className="text-[11px] text-slate-300 tabular-nums">
                    تاريخ استيفاء شرط 5 سنوات: {examEligibleDate}
                  </div>
                  <div
                    className={`font-black mt-1 ${
                      isExamEligible ? 'text-emerald-400' : 'text-amber-300'
                    }`}
                  >
                    {isExamEligible
                      ? 'مستوفٍ للشرط القانوني للمشاركة في الامتحان المهني'
                      : `يتبقى ${(5 - rankSeniority.totalYearsDecimal).toFixed(1)} سنة لاستيفاء الشرط`}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#06150e] border border-[#d4af37]/30 space-y-1">
                  <div className="font-bold text-white">
                    ب) الترقية عن طريق قوائم التأهيل (10 سنوات):
                  </div>
                  <div className="text-[11px] text-slate-300 tabular-nums">
                    تاريخ استيفاء شرط 10 سنوات: {listEligibleDate}
                  </div>
                  <div
                    className={`font-black mt-1 ${
                      isListEligible ? 'text-emerald-400' : 'text-amber-300'
                    }`}
                  >
                    {isListEligible
                      ? 'مستوفٍ لشرط التسجيل على قوائم التأهيل (الاختيار)'
                      : `يتبقى ${(10 - rankSeniority.totalYearsDecimal).toFixed(1)} سنة لاستيفاء الشرط`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* التبويب الثالث: حساب التقاعد بالقوانين الجديدة لقطاع التربية */}
      {activeTab === 'retirement_2026' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-4 text-xs">
            <h3 className="text-sm sm:text-base font-black text-white border-b border-[#d4af37]/20 pb-2.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <span>معطيات حساب التقاعد بالقوانين الجديدة 2026:</span>
            </h3>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                تاريخ الميلاد:
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">الجنس:</label>
                <select
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value as 'male' | 'female')
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
                >
                  <option value="male">رجل (السن العادي 60 سنة)</option>
                  <option value="female">امرأة (السن العادي 55 سنة)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  تخفيض 3 سنوات لأسلاك التربية:
                </label>
                <select
                  value={use3YearEducReduction ? 'yes' : 'no'}
                  onChange={(e) =>
                    setUse3YearEducReduction(e.target.value === 'yes')
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
                >
                  <option value="yes">الاستفادة من تخفيض (-3 سنوات)</option>
                  <option value="no">السن القانوني العادي</option>
                </select>
              </div>
            </div>

            {gender === 'female' && (
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  تخفيض سنوات الأمومة (سنة عن كل طفل بحد أقصى 3 سنوات):
                </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={maternityChildrenReduction}
                  onChange={(e) =>
                    setMaternityChildrenReduction(Number(e.target.value))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white tabular-nums"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-7 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-6 shadow-2xl space-y-4">
            <div className="border-b border-[#d4af37]/20 pb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-black text-white">
                  نتيجة محاكاة التقاعد ومعاش التقاعد التقديري ({roleSpec.title})
                </h3>
                <p className="text-[11px] text-slate-400">
                  السن الحالي: {currentAge.years} سنة و {currentAge.months} شهر · سنوات الخدمة الحالية: {generalSeniority.years} سنة
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#105e32] text-[#f5d77f] border border-[#d4af37]/50 text-xs font-black tabular-nums">
                سن التقاعد المخفض: {effectiveRetirementAge} سنة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[#05140d] border border-[#d4af37]/25">
                <div className="text-slate-400">تاريخ استحقاق التقاعد القانوني</div>
                <div className="text-lg font-black text-white mt-1 tabular-nums">
                  {retirementEligibilityDate}
                </div>
                <div className="text-[10px] text-emerald-300 mt-0.5">
                  بعد تطبيق تخفيض قانون التربية الجديد
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#05140d] border border-[#d4af37]/25">
                <div className="text-slate-400">نسبة معاش التقاعد المحسوبة</div>
                <div className="text-2xl font-black text-[#f5d77f] mt-1 tabular-nums">
                  {pensionRate}%
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5 tabular-nums">
                  ({totalServiceAtRetirement.toFixed(1)} سنة × 2.5% — سقف 80%)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#05140d] border border-emerald-600/40">
                <div className="text-slate-400">معاش التقاعد الصافي التقديري</div>
                <div className="text-xl font-black text-emerald-400 mt-1 tabular-nums">
                  {estimatedNetPension.toLocaleString('fr-DZ')} دج
                </div>
                <div className="text-[10px] text-emerald-300 mt-0.5">
                  شهرياً (صافي CNR)
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#06150e] border border-[#d4af37]/30 text-xs text-slate-200 leading-relaxed">
              <span className="font-black text-[#f5d77f]">تذكير قانوني: </span>
              يستفيد موظفو الأسلاك الخاصة بالتربية الوطنية (بما فيهم المربي المتخصص في الابتدائي، والمشرف التربوي والمساعد التربوي في المتوسط والثانوي) من تخفيض اختياري في سن التقاعد بـ 3 سنوات وفق التشريع الجديد، ليصبح 57 سنة للرجال و52 سنة للنساء (قبل احتساب تخفيض الأمومة).
            </div>
          </div>
        </div>
      )}

      {/* التبويب الرابع: جدول الدرجات 1 إلى 12 وجدول تصنيف الرتب */}
      {activeTab === 'echelon_table' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#06150e] border-b border-[#d4af37]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-sm sm:text-base font-black text-white">
                  جدول الدرجات الاستدلالية الكامل (من الدرجة 1 إلى 12) لرتبة: {roleSpec.title} (الصنف {currentRank.category})
                </h3>
              </div>
              <span className="text-xs font-bold text-[#f5d77f] tabular-nums">
                الرقم الاستدلالي القاعدي: {currentRank.baseIndex}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#05120c] text-[#f5d77f] border-b border-[#d4af37]/30">
                    <th className="py-2.5 px-3 font-bold text-center">الدرجة</th>
                    <th className="py-2.5 px-3 font-bold text-center">نقاط الدرجة</th>
                    <th className="py-2.5 px-3 font-bold text-center">المجموع الاستدلالي</th>
                    <th className="py-2.5 px-3 font-bold text-center">تعويض الخبرة الخام (دج)</th>
                    <th className="py-2.5 px-3 font-bold text-center">الأجر القاعدي + الخبرة (دج)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 tabular-nums">
                  {Array.from({ length: 12 }, (_, idx) => idx + 1).map((deg) => {
                    const degPts = Math.round(currentRank.baseIndex * 0.05 * deg);
                    const totPts = currentRank.baseIndex + degPts;
                    const degAmount = degPts * pointValueDZD;
                    const totAmount = totPts * pointValueDZD;
                    const isCurrent = deg === echelon;
                    return (
                      <tr
                        key={deg}
                        onClick={() => setEchelon(deg)}
                        className={`cursor-pointer ${
                          isCurrent
                            ? 'bg-[#103824] font-black text-[#f5d77f]'
                            : 'hover:bg-[#0c261a]/60 text-slate-200'
                        }`}
                      >
                        <td className="py-2 px-3 text-center">
                          الدرجة {deg} {isCurrent ? '(الحالية)' : ''}
                        </td>
                        <td className="py-2 px-3 text-center font-mono text-emerald-300">
                          +{degPts}
                        </td>
                        <td className="py-2 px-3 text-center font-mono">
                          {totPts}
                        </td>
                        <td className="py-2 px-3 text-center font-mono text-emerald-400">
                          {degAmount.toLocaleString('fr-DZ')} دج
                        </td>
                        <td className="py-2 px-3 text-center font-mono text-white">
                          {totAmount.toLocaleString('fr-DZ')} دج
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#06150e] border-b border-[#d4af37]/20 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              <h3 className="text-sm sm:text-base font-black text-white">
                جدول تصنيف كافة رتب سلك موظفي التربية في الأطوار الثلاثة (المرسوم التنفيذي 25-54)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#05120c] text-[#f5d77f] border-b border-[#d4af37]/30">
                    <th className="py-3 px-4 font-bold">الرتبة الوظيفية</th>
                    <th className="py-3 px-3 font-bold">الطور التعليمي</th>
                    <th className="py-3 px-3 font-bold text-center">الصنف</th>
                    <th className="py-3 px-3 font-bold text-center">الرقم الاستدلالي</th>
                    <th className="py-3 px-4 font-bold">رتبة الترقية الموالية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {RANK_PROMOTION_DATA.map((item) => (
                    <tr
                      key={item.roleId}
                      onClick={() => setSelectedRoleId(item.roleId)}
                      className="hover:bg-[#0c261a]/60 cursor-pointer"
                    >
                      <td className="py-3 px-4 font-black text-white">
                        {STAFF_ROLES[item.roleId].title}
                      </td>
                      <td className="py-3 px-3 text-emerald-300 font-bold">
                        {item.stageLabel}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-black text-[#f5d77f] tabular-nums">
                        الصنف {item.category}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-white tabular-nums">
                        {item.baseIndex}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {item.promotionPath}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
