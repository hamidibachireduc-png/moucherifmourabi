import React, { useState, useEffect } from 'react';
import {
  AbsenceRecord,
  AgendaTask,
  AppBackupData,
  DutySlot,
  EducationStage,
  InstitutionInfo,
  SectionId,
  StudentRecord,
  SubjectConfig,
  TeacherOrStaffMember,
} from './types';
import {
  DEFAULT_ABSENCES,
  DEFAULT_AGENDA,
  DEFAULT_DUTY_TIMETABLE,
  DEFAULT_INSTITUTIONS,
  DEFAULT_LOGO_URL,
  DEFAULT_STAFF_AND_TEACHERS,
  DEFAULT_STUDENTS,
  DEFAULT_SUBJECTS,
  STAFF_ROLES,
  STAGE_CONFIGS,
} from './data/mockData';
import { Header } from './components/Header';
import { SettingsModal } from './components/SettingsModal';
import { DashboardSection } from './components/DashboardSection';
import { AbsencesSection } from './components/AbsencesSection';
import { AveragesSection } from './components/AveragesSection';
import { AnalyticsSection } from './components/AnalyticsSection';
import { CouncilsSection } from './components/CouncilsSection';
import { AgendaSection } from './components/AgendaSection';
import { LegislationSection } from './components/LegislationSection';
import { DigitalizationSection } from './components/DigitalizationSection';
import { DocumentsSection } from './components/DocumentsSection';
import { TimetableSection } from './components/TimetableSection';
import { CommunitySection } from './components/CommunitySection';
import { InstitutesSection } from './components/InstitutesSection';
import { CareerSection } from './components/CareerSection';
import { CoordinationSection } from './components/CoordinationSection';

const STORAGE_KEYS = {
  ACTIVE_STAGE: 'snte_educ_staff_active_stage_2026_v1',
  INSTITUTIONS_BY_STAGE: 'snte_educ_staff_institutions_2026_v1',
  STUDENTS: 'snte_educ_staff_students_2026_v1',
  SUBJECTS: 'snte_educ_staff_subjects_2026_v1',
  ABSENCES: 'snte_educ_staff_absences_2026_v1',
  STAFF_MEMBERS: 'snte_educ_staff_members_2026_v1',
  TIMETABLE: 'snte_educ_staff_timetable_2026_v1',
  AGENDA: 'snte_educ_staff_agenda_2026_v1',
};

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('dashboard');

  const [activeStage, setActiveStage] = useState<EducationStage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_STAGE);
      return saved === 'primary' || saved === 'middle' || saved === 'secondary'
        ? saved
        : 'middle';
    } catch {
      return 'middle';
    }
  });

  const [institutionsByStage, setInstitutionsByStage] = useState<
    Record<EducationStage, InstitutionInfo>
  >(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSTITUTIONS_BY_STAGE);
      return saved ? JSON.parse(saved) : DEFAULT_INSTITUTIONS;
    } catch {
      return DEFAULT_INSTITUTIONS;
    }
  });

  const [students, setStudents] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  });

  const [subjects, setSubjects] = useState<SubjectConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
      return saved ? JSON.parse(saved) : DEFAULT_SUBJECTS;
    } catch {
      return DEFAULT_SUBJECTS;
    }
  });

  const [absences, setAbsences] = useState<AbsenceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ABSENCES);
      return saved ? JSON.parse(saved) : DEFAULT_ABSENCES;
    } catch {
      return DEFAULT_ABSENCES;
    }
  });

  const [staffMembers, setStaffMembers] = useState<TeacherOrStaffMember[]>(
    () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.STAFF_MEMBERS);
        return saved ? JSON.parse(saved) : DEFAULT_STAFF_AND_TEACHERS;
      } catch {
        return DEFAULT_STAFF_AND_TEACHERS;
      }
    }
  );

  const [timetable, setTimetable] = useState<DutySlot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TIMETABLE);
      return saved ? JSON.parse(saved) : DEFAULT_DUTY_TIMETABLE;
    } catch {
      return DEFAULT_DUTY_TIMETABLE;
    }
  });

  const [agenda, setAgenda] = useState<AgendaTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AGENDA);
      return saved ? JSON.parse(saved) : DEFAULT_AGENDA;
    } catch {
      return DEFAULT_AGENDA;
    }
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_STAGE, activeStage);
    } catch {
      // ignore storage errors
    }
  }, [activeStage]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.INSTITUTIONS_BY_STAGE,
        JSON.stringify(institutionsByStage)
      );
    } catch {
      // ignore
    }
  }, [institutionsByStage]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
    } catch {
      // ignore
    }
  }, [subjects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ABSENCES, JSON.stringify(absences));
    } catch {
      // ignore
    }
  }, [absences]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.STAFF_MEMBERS,
        JSON.stringify(staffMembers)
      );
    } catch {
      // ignore
    }
  }, [staffMembers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(timetable));
    } catch {
      // ignore
    }
  }, [timetable]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AGENDA, JSON.stringify(agenda));
    } catch {
      // ignore
    }
  }, [agenda]);

  const currentInstitution = institutionsByStage[activeStage];
  const stageCfg = STAGE_CONFIGS[activeStage];
  const activeRole =
    STAFF_ROLES[currentInstitution.activeRoleId] ||
    STAFF_ROLES[stageCfg.defaultRole];

  const handleUpdateInstitution = (updated: InstitutionInfo) => {
    setInstitutionsByStage((prev) => ({
      ...prev,
      [updated.stage]: updated,
    }));
    if (updated.stage !== activeStage) {
      setActiveStage(updated.stage);
    }
  };

  const handleExportBackup = (): AppBackupData => {
    return {
      version: 'snte-educ-staff-2026-v1',
      exportedAt: new Date().toISOString(),
      activeStage,
      institutionsByStage,
      students,
      subjects,
      absences,
      staffMembers,
      timetable,
      agenda,
    };
  };

  const handleImportBackup = (data: AppBackupData) => {
    if (
      data.activeStage === 'primary' ||
      data.activeStage === 'middle' ||
      data.activeStage === 'secondary'
    ) {
      setActiveStage(data.activeStage);
    }
    if (data.institutionsByStage) {
      setInstitutionsByStage(data.institutionsByStage);
    }
    if (Array.isArray(data.students)) {
      setStudents(data.students);
    }
    if (Array.isArray(data.subjects)) {
      setSubjects(data.subjects);
    }
    if (Array.isArray(data.absences)) {
      setAbsences(data.absences);
    }
    if (Array.isArray(data.staffMembers)) {
      setStaffMembers(data.staffMembers);
    }
    if (Array.isArray(data.timetable)) {
      setTimetable(data.timetable);
    }
    if (Array.isArray(data.agenda)) {
      setAgenda(data.agenda);
    }
  };

  const handleResetAllData = () => {
    setInstitutionsByStage(DEFAULT_INSTITUTIONS);
    setStudents(DEFAULT_STUDENTS);
    setSubjects(DEFAULT_SUBJECTS);
    setAbsences(DEFAULT_ABSENCES);
    setStaffMembers(DEFAULT_STAFF_AND_TEACHERS);
    setTimetable(DEFAULT_DUTY_TIMETABLE);
    setAgenda(DEFAULT_AGENDA);
  };

  const urgentAlertsCount = absences.filter(
    (a) =>
      a.stage === activeStage &&
      (a.status === 'unjustified' ||
        a.status === 'parent_summoned' ||
        a.status === 'warning_sent')
  ).length;

  const handleSelectSection = (sec: SectionId) => {
    setCurrentSection(sec);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDocumentGenerator = (docId: string) => {
    setSelectedDocId(docId);
    setCurrentSection('documents');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logoSrc = currentInstitution.logoUrl || DEFAULT_LOGO_URL;

  return (
    <div className="min-h-screen bg-[#071710] text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      <Header
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
        activeStage={activeStage}
        onSelectStage={setActiveStage}
        institution={currentInstitution}
        onUpdateInstitution={handleUpdateInstitution}
        onOpenSettings={() => setIsSettingsOpen(true)}
        urgentAlertsCount={urgentAlertsCount}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        {currentSection === 'dashboard' && (
          <DashboardSection
            institution={currentInstitution}
            activeStage={activeStage}
            onSelectStage={setActiveStage}
            onUpdateInstitution={handleUpdateInstitution}
            onNavigate={handleSelectSection}
            absences={absences}
            timetable={timetable}
            students={students}
            subjects={subjects}
            staffMembers={staffMembers}
            agendaItems={agenda}
            onOpenDocumentGenerator={handleOpenDocumentGenerator}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {currentSection === 'absences' && (
          <AbsencesSection
            institution={currentInstitution}
            activeStage={activeStage}
            onSelectStage={setActiveStage}
            absences={absences}
            onUpdateAbsences={setAbsences}
            students={students}
            onOpenDocumentGenerator={handleOpenDocumentGenerator}
          />
        )}

        {currentSection === 'averages' && (
          <AveragesSection
            institution={currentInstitution}
            activeStage={activeStage}
            onSelectStage={setActiveStage}
            students={students}
            onUpdateStudents={setStudents}
            subjects={subjects}
            absences={absences}
          />
        )}

        {currentSection === 'analytics' && (
          <AnalyticsSection
            institution={currentInstitution}
            activeStage={activeStage}
            onSelectStage={setActiveStage}
            students={students}
            subjects={subjects}
            absences={absences}
          />
        )}

        {currentSection === 'councils' && (
          <CouncilsSection
            institution={currentInstitution}
            activeStage={activeStage}
            onSelectStage={setActiveStage}
          />
        )}

        {currentSection === 'agenda' && (
          <AgendaSection
            institution={currentInstitution}
            agendaItems={agenda}
            onUpdateAgenda={setAgenda}
          />
        )}

        {currentSection === 'legislation' && (
          <LegislationSection
            activeStage={activeStage}
            institution={currentInstitution}
          />
        )}

        {currentSection === 'digitalization' && (
          <DigitalizationSection
            institution={currentInstitution}
            staffMembers={staffMembers}
            onUpdateStaff={setStaffMembers}
            students={students}
            absences={absences}
          />
        )}

        {currentSection === 'documents' && (
          <DocumentsSection
            institution={currentInstitution}
            initialSelectedDocId={selectedDocId}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {currentSection === 'timetable' && (
          <TimetableSection
            institution={currentInstitution}
            timetable={timetable}
            staffMembers={staffMembers}
            onUpdateTimetable={setTimetable}
          />
        )}

        {currentSection === 'community' && (
          <CommunitySection
            institution={currentInstitution}
            staffMembers={staffMembers}
          />
        )}

        {currentSection === 'institutes' && (
          <InstitutesSection institution={currentInstitution} />
        )}

        {currentSection === 'career' && (
          <CareerSection institution={currentInstitution} />
        )}

        {currentSection === 'coordination' && (
          <CoordinationSection institution={currentInstitution} />
        )}
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        institution={currentInstitution}
        onSave={handleUpdateInstitution}
        onSwitchStage={setActiveStage}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onResetAllData={handleResetAllData}
      />

      {/* التذييل الرسمي الموحد */}
      <footer className="mt-auto bg-[#040e0a] border-t border-[#d4af37]/30 py-8 text-xs text-slate-400 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#8f1414] via-[#d4af37] to-[#105e32] flex items-center justify-center bg-[#06150e] shrink-0">
                <img
                  src={logoSrc}
                  alt="SNTE Logo"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </div>
              <div>
                <div className="text-white font-bold text-sm">
                  البوابة الرقمية لـ {activeRole.title} · الأطوار الثلاثة (SNTE 2026)
                </div>
                <div className="text-[11px] text-[#d4af37] font-semibold">
                  الطور الحالي: {stageCfg.name} (سلم /{stageCfg.maxGradeScale}) · مربي متخصص في الابتدائي · مشرف ومساعد تربوي في المتوسط والثانوي
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium">
              <button
                onClick={() => handleSelectSection('dashboard')}
                className="hover:text-[#f5d77f] transition-colors cursor-pointer"
              >
                الداشبورد الشامل
              </button>
              <span>·</span>
              <button
                onClick={() => handleSelectSection('absences')}
                className="hover:text-[#f5d77f] transition-colors cursor-pointer font-bold text-[#f5d77f]"
              >
                متابعة الغيابات والانضباط
              </button>
              <span>·</span>
              <button
                onClick={() => handleSelectSection('averages')}
                className="hover:text-[#f5d77f] transition-colors cursor-pointer font-bold text-emerald-300"
              >
                الحساب التلقائي للمعدلات (/{stageCfg.maxGradeScale})
              </button>
              <span>·</span>
              <button
                onClick={() => handleSelectSection('councils')}
                className="hover:text-[#f5d77f] transition-colors cursor-pointer font-bold text-[#f5d77f]"
              >
                المجالس واللجان
              </button>
              <span>·</span>
              <button
                onClick={() => handleSelectSection('legislation')}
                className="hover:text-[#f5d77f] transition-colors cursor-pointer"
              >
                الركن التشريعي والمناشير
              </button>
              <span>·</span>
              <button
                onClick={() => handleSelectSection('documents')}
                className="hover:text-[#f5d77f] transition-colors cursor-pointer"
              >
                حقيبة الوثائق A4
              </button>
              <span>·</span>
              <button
                onClick={() => handleSelectSection('career')}
                className="hover:text-[#f5d77f] transition-colors cursor-pointer"
              >
                محاكي المنح والترقية والتقاعد
              </button>
            </div>

            <div className="text-center md:text-left text-[11px] text-slate-400">
              <div>المطابقة: المرسوم التنفيذي 25-54 والقرارات 65 و833 و157 و171 و173</div>
              <div className="text-[#d4af37]">
                سلك موظفي التربية (ابتدائي: مربي متخصص · متوسط وثانوي: مشرف ومساعد تربوي)
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
