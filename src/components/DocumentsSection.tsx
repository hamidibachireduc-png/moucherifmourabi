import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Settings,
} from 'lucide-react';
import { InstitutionInfo, PrintableTemplate } from '../types';
import {
  PRINTABLE_TEMPLATES,
  STAFF_ROLES,
  STAGE_CONFIGS,
} from '../data/mockData';

interface DocumentsSectionProps {
  institution: InstitutionInfo;
  initialSelectedDocId: string | null;
  onOpenSettings: () => void;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  institution,
  initialSelectedDocId,
  onOpenSettings,
}) => {
  const stageCfg = STAGE_CONFIGS[institution.stage];
  const activeRole =
    STAFF_ROLES[institution.activeRoleId] || STAFF_ROLES[stageCfg.defaultRole];
  const roleDisplayTitle = institution.customRoleTitle || activeRole.title;

  const availableTemplates = PRINTABLE_TEMPLATES.filter(
    (t) => t.stage === institution.stage || t.stage === 'all'
  );

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<PrintableTemplate>(
    availableTemplates[0] || PRINTABLE_TEMPLATES[0]
  );
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialSelectedDocId) {
      const found = PRINTABLE_TEMPLATES.find((d) => d.id === initialSelectedDocId);
      if (found) setSelectedDoc(found);
    }
  }, [initialSelectedDocId]);

  useEffect(() => {
    const initialFields: Record<string, string> = {};
    selectedDoc.fields.forEach((f) => {
      initialFields[f.key] = f.defaultValue;
    });
    setFieldValues(initialFields);
  }, [selectedDoc]);

  const filteredDocs = availableTemplates.filter(
    (d) => categoryFilter === 'all' || d.category === categoryFilter
  );

  const handleCopyDocText = () => {
    const lines = [
      'الجمهورية الجزائرية الديمقراطية الشعبية',
      'وزارة التربية الوطنية',
      `${institution.wilaya} — ${institution.schoolName}`,
      `مكتب: ${roleDisplayTitle}`,
      `الموسم الدراسي: ${institution.schoolYear}`,
      '----------------------------------------',
      selectedDoc.title,
      selectedDoc.legalHeader,
      '',
      ...selectedDoc.fields.map(
        (f) => `${f.label}:\n${fieldValues[f.key] || ''}`
      ),
      '',
      `حرر بـ ${institution.schoolName}، بتاريخ: ${new Date().toLocaleDateString('ar-DZ')}`,
      `توقيع ${roleDisplayTitle}: ${institution.staffName}`,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* ترويسة حقيبة الوثائق والنماذج الرسمية */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs mb-1.5">
              <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white font-bold">
                حقيبة الوثائق والنماذج الرسمية الجاهزة للطباعة A4 ({stageCfg.name})
              </span>
              <span className="text-[#d4af37] font-semibold">
                مخصصة لـ: {roleDisplayTitle}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#d4af37]" />
              <span>
                مولد الوثائق الإدارية والتربوية لموظفي التربية (المربي المتخصص · المشرف · المساعد التربوي)
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              اختر النموذج الرسمي، عدل البيانات مباشرة في الحقول، ثم اطبع الوثيقة بمقاس A4 الرسمي متضمنة ترويسة الجمهورية وبيانات المؤسسة وتوقيع {roleDisplayTitle}.
            </p>
          </div>

          <button
            onClick={onOpenSettings}
            className="px-4 py-2 rounded-xl bg-[#105e32] hover:bg-[#14753e] text-[#f5d77f] border border-[#d4af37]/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start lg:self-auto"
          >
            <Settings className="w-4 h-4" />
            <span>تعديل ترويسة المؤسسة والمؤطر</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-[#d4af37]/20">
          {[
            { id: 'all', label: `جميع النماذج (${availableTemplates.length})` },
            { id: 'absence_notice', label: 'إشعارات الغياب وبطاقة الدخول' },
            { id: 'discipline', label: 'محاضر التعهد والالتزام' },
            { id: 'daily_report', label: 'التقرير اليومي للمداومة' },
            { id: 'canteen_uds', label: 'المطعم المدرسي والصحة UDS والحوادث' },
            { id: 'staff_admin', label: 'وثائق موظف التربية (رخص الغياب)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#d4af37] text-[#071710] font-black'
                  : 'bg-[#06150e] text-slate-300 hover:text-white border border-[#d4af37]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* قائمة النماذج وتعديل الحقول */}
        <div className="lg:col-span-5 space-y-4 no-print">
          <div className="space-y-2.5">
            {filteredDocs.map((doc) => {
              const active = selectedDoc.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    active
                      ? 'bg-[#103824] border-[#d4af37] shadow-lg'
                      : 'bg-[#081a12] border-[#d4af37]/25 hover:border-[#d4af37]/60'
                  }`}
                >
                  <div className="text-[10px] font-bold text-[#f5d77f] mb-0.5">
                    {doc.roleBadge}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white">
                    {doc.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {doc.description}
                  </div>
                </div>
              );
            })}
          </div>

          {/* حقول تحرير الوثيقة */}
          <div className="rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-4 space-y-3 text-xs">
            <h4 className="font-black text-[#f5d77f] border-b border-[#d4af37]/20 pb-2">
              تحرير بيانات النموذج المحدد:
            </h4>
            {selectedDoc.fields.map((field) => (
              <div key={field.key}>
                <label className="block font-bold text-slate-300 mb-1">
                  {field.label}:
                </label>
                {field.multiline ? (
                  <textarea
                    rows={3}
                    value={fieldValues[field.key] || ''}
                    onChange={(e) =>
                      setFieldValues({
                        ...fieldValues,
                        [field.key]: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white leading-relaxed"
                  />
                ) : (
                  <input
                    type="text"
                    value={fieldValues[field.key] || ''}
                    onChange={(e) =>
                      setFieldValues({
                        ...fieldValues,
                        [field.key]: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
                  />
                )}
              </div>
            ))}

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] font-black flex items-center justify-center gap-1.5 shadow cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الوثيقة الرسمية A4</span>
              </button>
              <button
                onClick={handleCopyDocText}
                className="px-3.5 py-2.5 rounded-xl bg-[#105e32] text-[#f5d77f] font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copied ? 'تم النسخ' : 'نسخ النص'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* معاينة الورقة الرسمية A4 */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white text-black p-6 sm:p-8 shadow-2xl border-2 border-[#d4af37] space-y-6 font-['Amiri',serif]">
            <div className="text-center border-b-2 border-black pb-4 space-y-1">
              <div className="text-base sm:text-lg font-bold">
                الجمهورية الجزائرية الديمقراطية الشعبية
              </div>
              <div className="text-sm sm:text-base font-bold">
                وزارة التربية الوطنية
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold pt-2 font-['Cairo',sans-serif]">
                <div className="text-right space-y-0.5">
                  <div>{institution.wilaya}</div>
                  <div>{institution.schoolName}</div>
                  <div>مكتب: {roleDisplayTitle}</div>
                </div>
                <div className="text-left space-y-0.5">
                  <div>السنة الدراسية: {institution.schoolYear}</div>
                  <div>الفصل الدراسي: {institution.currentTerm}</div>
                  <div>الرقم: ....... / 2026</div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg sm:text-xl font-black underline decoration-2 underline-offset-4 font-['Cairo',sans-serif]">
                {selectedDoc.title}
              </h3>
              <p className="text-xs font-bold text-slate-700 font-['Cairo',sans-serif]">
                ({selectedDoc.legalHeader})
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base font-['Cairo',sans-serif]">
              {selectedDoc.fields.map((field) => (
                <div
                  key={field.key}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-300 space-y-1"
                >
                  <div className="text-xs font-black text-slate-700">
                    {field.label}:
                  </div>
                  <div className="text-sm font-semibold text-black whitespace-pre-line leading-relaxed">
                    {fieldValues[field.key] || ''}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 text-center text-xs sm:text-sm font-bold font-['Cairo',sans-serif]">
              <div>
                <div>{roleDisplayTitle}</div>
                <div className="text-slate-700 mt-0.5">({institution.staffName})</div>
                <div className="mt-10 text-slate-500">[الإمضاء والختم]</div>
              </div>
              <div>
                <div>إطلاع ومصادقة {stageCfg.principalTitle}</div>
                <div className="text-slate-700 mt-0.5">({institution.schoolName})</div>
                <div className="mt-10 text-slate-500">[الختم والتوقيع الرسمي]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
