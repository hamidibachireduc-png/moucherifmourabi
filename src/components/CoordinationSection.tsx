import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  ThumbsUp,
} from 'lucide-react';
import { InstitutionInfo } from '../types';
import { STAFF_ROLES, STAGE_CONFIGS } from '../data/mockData';

interface CoordinationSectionProps {
  institution: InstitutionInfo;
}

interface CoordinationPost {
  id: string;
  author: string;
  school: string;
  tag: string;
  time: string;
  title: string;
  body: string;
  likes: number;
}

export const CoordinationSection: React.FC<CoordinationSectionProps> = ({
  institution,
}) => {
  const stageCfg = STAGE_CONFIGS[institution.stage];
  const activeRole =
    STAFF_ROLES[institution.activeRoleId] || STAFF_ROLES[stageCfg.defaultRole];
  const roleDisplayTitle = institution.customRoleTitle || activeRole.title;

  const [posts, setPosts] = useState<CoordinationPost[]>([
    {
      id: 'p-1',
      author: 'أ. ياسين بن يحيى (مربي متخصص في الابتدائي)',
      school: 'ابتدائية الشهيد العربي بن مهيدي — قسنطينة',
      tag: 'الطور الابتدائي · مربي متخصص',
      time: 'منذ ساعتين',
      title: 'توحيد سجل المتابعة اليومية للمطعم المدرسي والصحة المدرسية UDS',
      body: 'نقترح تعميم النموذج الرقمي الموحد لتوثيق تعداد الحاضرين في المطعم المدرسي وربطه مباشرة بغيابات الفترة الصباحية لتسهيل عمل المربي المتخصص في المدارس الابتدائية.',
      likes: 28,
    },
    {
      id: 'p-2',
      author: 'أ. كريم بومدين (مشرف التربية — متوسط)',
      school: 'متوسطة الشهيد العربي بن مهيدي — قسنطينة',
      tag: 'الطور المتوسط · مشرف ومساعد تربوي',
      time: 'منذ 4 ساعات',
      title: 'تثمين رتبة مشرف عام للتربية ومشرف رئيسي في المرسوم التنفيذي 25-54',
      body: 'يمثل استحداث رتبة مشرف عام للتربية (الصنف 13) مكسباً مهماً لسلك موظفي التربية في المتوسط والثانوي، مع التأكيد على ضبط مدونة المهام وتوزيع الأجنحة بعدالة بين المشرفين والمساعدين التربويين.',
      likes: 42,
    },
    {
      id: 'p-3',
      author: 'أ. سفيان مرابط (مشرف رئيسي للتربية — ثانوي)',
      school: 'ثانوية الشهيد زيغود يوسف — قسنطينة',
      tag: 'الطور الثانوي · أقسام البكالوريا',
      time: 'أمس',
      title: 'آلية متابعة غيابات أقسام البكالوريا (BAC 2026) في حصص الأعمال المخبرية',
      body: 'وضعنا بطاقة متابعة خاصة بتفويج مخابر العلوم والفيزياء بالتنسيق مع الناظر والأساتذة الرئيسيين لضمان الانضباط التام لتلاميذ الأقسام النهائية.',
      likes: 35,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;
    const item: CoordinationPost = {
      id: `p-${Date.now()}`,
      author: `${institution.staffName} (${roleDisplayTitle})`,
      school: `${institution.schoolName} — ${institution.wilaya}`,
      tag: `${stageCfg.name} · ${activeRole.shortTitle}`,
      time: 'الآن',
      title: newTitle.trim(),
      body: newBody.trim(),
      likes: 1,
    };
    setPosts([item, ...posts]);
    setNewTitle('');
    setNewBody('');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#0d2e1f] via-[#092216] to-[#123b28] border border-[#d4af37]/50 p-6 shadow-2xl">
        <span className="px-2.5 py-0.5 rounded bg-[#8f1414] text-white text-xs font-bold">
          فضاء التنسيق الوطني والنقابي لموظفي التربية (SNTE 2026)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1.5">
          <MessageSquare className="w-6 h-6 text-[#d4af37]" />
          <span>
            منبر التنسيق وتبادل الخبرات (المربي المتخصص في الابتدائي · المشرف والمساعد التربوي في المتوسط والثانوي)
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
          فضاء تفاعلي لتقاسم التجارب الميدانية، المبادرات التربوية، والانشغالات المهنية والنقابية لسلك موظفي التربية عبر ولايات الوطن.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={handlePublish}
          className="lg:col-span-5 rounded-2xl bg-[#081a12] border border-[#d4af37]/40 p-5 shadow-2xl space-y-3 self-start text-xs"
        >
          <h3 className="text-sm font-black text-white">
            نشر مبادرة ميدانية أو انشغال مهني باسم {roleDisplayTitle}
          </h3>
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              عنوان المساهمة أو المقترح:
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="مثال: تنظيم المداومة التربوية / تأطير المطعم المدرسي..."
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              نص المساهمة التفصيلي:
            </label>
            <textarea
              rows={4}
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="اكتب تفاصيل التجربة الميدانية أو المقترح التنظيمي..."
              className="w-full px-3 py-2 rounded-xl bg-[#05140d] border border-[#d4af37]/40 text-white leading-relaxed"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#071710] font-black flex items-center justify-center gap-1.5 shadow cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>نشر في فضاء التنسيق الوطني</span>
          </button>
        </form>

        <div className="lg:col-span-7 space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-2xl bg-[#081a12] border border-[#d4af37]/30 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#f5d77f]">{post.author}</span>
                <span className="text-slate-400">{post.time}</span>
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold">
                {post.school} · {post.tag}
              </div>
              <h4 className="text-sm sm:text-base font-black text-white">
                {post.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {post.body}
              </p>
              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={() =>
                    setPosts(
                      posts.map((p) =>
                        p.id === post.id ? { ...p, likes: p.likes + 1 } : p
                      )
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-[#06150e] hover:bg-[#103824] text-[#f5d77f] border border-[#d4af37]/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer tabular-nums"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>تأييد ({post.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
