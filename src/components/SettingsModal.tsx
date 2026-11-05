import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Save,
  School,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Database,
} from 'lucide-react';
import {
  AppBackupData,
  EducationStage,
  InstitutionInfo,
  StaffRoleId,
} from '../types';
import {
  DEFAULT_LOGO_URL,
  STAFF_ROLES,
  STAGE_CONFIGS,
} from '../data/mockData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  institution: InstitutionInfo;
  onSave: (updated: InstitutionInfo) => void;
  onSwitchStage: (stage: EducationStage) => void;
  onExportBackup: () => AppBackupData;
  onImportBackup: (data: AppBackupData) => void;
  onResetAllData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  institution,
  onSave,
  onSwitchStage,
  onExportBackup,
  onImportBackup,
  onResetAllData,
}) => {
  const [form, setForm] = useState<InstitutionInfo>(institution);
  const [backupMessage, setBackupMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(institution);
    setBackupMessage(null);
  }, [institution, isOpen]);

  if (!isOpen) return null;

  const stageCfg = STAGE_CONFIGS[form.stage];

  const handleStageChange = (newStage: EducationStage) => {
    const newStageCfg = STAGE_CONFIGS[newStage];
    const defaultRole = newStageCfg.defaultRole;
    setForm((prev) => ({
      ...prev,
      stage: newStage,
      activeRoleId: defaultRole,
      customRoleTitle: STAFF_ROLES[defaultRole].title,
    }));
  };

  const handleRoleChange = (roleId: StaffRoleId) => {
    setForm((prev) => ({
      ...prev,
      activeRoleId: roleId,
      customRoleTitle: STAFF_ROLES[roleId].title,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    if (form.stage !== institution.stage) {
      onSwitchStage(form.stage);
    }
    onClose();
  };

  const handleExportJSON = () => {
    try {
      const data = onExportBackup();
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStamp = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.download = `snte_educ_staff_backup_${dateStamp}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setBackupMessage({
        type: 'success',
        text: 'تم تصدير النسخة الاحتياطية لبيانات المنصة بصيغة JSON بنجاح.',
      });
    } catch {
      setBackupMessage({
        type: 'error',
        text: 'تعذر تصدير ملف النسخة الاحتياطية.',
      });
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content) as AppBackupData;
        if (
          !parsed ||
          typeof parsed !== 'object' ||
          !parsed.institutionsByStage ||
          !Array.isArray(parsed.students) ||
          !Array.isArray(parsed.absences)
        ) {
          setBackupMessage({
            type: 'error',
            text: 'ملف JSON غير صالح أو لا يطابق بنية النسخة الاحتياطية للمنصة.',
          });
          return;
        }
        onImportBackup(parsed);
        setBackupMessage({
          type: 'success',
          text: `تم استيراد واستعادة جميع البيانات بنجاح (${parsed.students.length} تلميذ، ${parsed.absences.length} سجل غياب).`,
        });
      } catch {
        setBackupMessage({
          type: 'error',
          text: 'حدث خطأ أثناء قراءة ملف JSON. تأكد من صحة صيغة الملف.',
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-[#081a12] border border-[#d4af37] shadow-2xl overflow-hidden my-auto">
        <div className="p-4 bg-gradient-to-r from-[#0d2e1f] to-[#081a12] border-b border-[#d4af37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-base font-black text-white">
              إعدادات المؤسسة والرتبة والنسخ الاحتياطي (JSON)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#05140d] text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs max-h-[85vh] overflow-y-auto">
          <div>
            <label className="block font-bold text-[#f5d77f] mb-1.5">
              الطور التعليمي:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['primary', 'middle', 'secondary'] as EducationStage[]).map((st) => {
                const cfg = STAGE_CONFIGS[st];
                const active = form.stage === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleStageChange(st)}
                    className={`p-2.5 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                      active
                        ? 'bg-[#105e32] text-[#f5d77f] border-[#d4af37]'
                        : 'bg-[#05140d] text-slate-300 border-[#d4af37]/25'
                    }`}
                  >
                    <div>{cfg.name}</div>
                    <div className="text-[10px] text-emerald-300 mt-0.5">
                      {st === 'primary'
                        ? 'مربي متخصص (/10)'
                        : 'مشرف + مساعد تربوي (/20)'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#f5d77f] mb-1.5">
              الرتبة الوظيفية المعتمدة (المرسوم التنفيذي 25-54):
            </label>
            <select
              value={form.activeRoleId}
              onChange={(e) => handleRoleChange(e.target.value as StaffRoleId)}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white font-bold"
            >
              {stageCfg.availableRoles.map((roleId) => {
                const r = STAFF_ROLES[roleId];
                return (
                  <option key={roleId} value={roleId}>
                    {r.title} — {r.category2554}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                تسمية {stageCfg.institutionLabel}:
              </label>
              <input
                type="text"
                value={form.schoolName}
                onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                مديرية التربية (الولاية):
              </label>
              <input
                type="text"
                value={form.wilaya}
                onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-300 mb-1">
                اسم ولقب موظف التربية (يظهر في التقارير والوثائق الرسمية):
              </label>
              <input
                type="text"
                value={form.staffName}
                onChange={(e) => setForm({ ...form, staffName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                الفصل الدراسي:
              </label>
              <select
                value={form.currentTerm}
                onChange={(e) =>
                  setForm({
                    ...form,
                    currentTerm: Number(e.target.value) as 1 | 2 | 3,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
              >
                <option value={1}>الفصل الأول</option>
                <option value={2}>الفصل الثاني</option>
                <option value={3}>الفصل الثالث</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-300">
                رابط الشعار المخصص (اختياري):
              </label>
              <button
                type="button"
                onClick={() => setForm({ ...form, logoUrl: DEFAULT_LOGO_URL })}
                className="text-[11px] text-[#f5d77f] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>استعادة الشعار الرسمي</span>
              </button>
            </div>
            <input
              type="text"
              value={form.logoUrl}
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white font-mono text-[11px]"
            />
          </div>

          {/* قسم النسخ الاحتياطي وتصدير واستيراد البيانات بصيغة JSON */}
          <div className="p-4 rounded-xl bg-[#05140d] border border-[#d4af37]/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#d4af37]" />
                <span className="font-black text-[#f5d77f] text-xs">
                  النسخ الاحتياطي المحلي وتصدير/استيراد البيانات (JSON)
                </span>
              </div>
              <span className="text-[10px] text-emerald-300 font-semibold">
                حفظ واسترجاع فوري
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              يمكنك تحميل نسخة احتياطية كاملة من جميع بياناتك (المؤسسات، قوائم التلاميذ ونقاطهم، سجلات الغيابات، جداول المداومة، والمفكرة) بصيغة <span className="font-mono text-[#f5d77f]">JSON</span> على جهازك، أو استعادتها في أي وقت.
            </p>

            {backupMessage && (
              <div
                className={`p-2.5 rounded-lg border flex items-center gap-2 text-[11px] font-bold ${
                  backupMessage.type === 'success'
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500/60 text-rose-200'
                }`}
              >
                {backupMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{backupMessage.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleExportJSON}
                className="px-3 py-2 rounded-xl bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/50 font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تصدير البيانات (JSON)</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-xl bg-[#0b2318] hover:bg-[#123826] text-white border border-[#d4af37]/40 font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>استيراد ملف (JSON)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onResetAllData();
                  setBackupMessage({
                    type: 'success',
                    text: 'تمت استعادة البيانات النموذجية الافتراضية للمنصة.',
                  });
                }}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/70 text-slate-300 hover:text-rose-200 border border-slate-700 font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة الافتراضي</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </div>

          <div className="pt-3 border-t border-[#d4af37]/20 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
            >
              إغلاق
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] font-black flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ وتطبيق الإعدادات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
