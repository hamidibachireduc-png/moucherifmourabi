export type EducationStage = 'primary' | 'middle' | 'secondary';

export type StaffRoleId =
  | 'primary_specialized_educator'
  | 'primary_principal_educator'
  | 'educational_supervisor'
  | 'principal_supervisor'
  | 'general_supervisor'
  | 'educational_assistant'
  | 'principal_assistant';

export type SectionId =
  | 'dashboard'
  | 'averages'
  | 'absences'
  | 'analytics'
  | 'councils'
  | 'agenda'
  | 'legislation'
  | 'digitalization'
  | 'documents'
  | 'timetable'
  | 'community'
  | 'institutes'
  | 'career'
  | 'coordination';

export interface AppBackupData {
  version: string;
  exportedAt: string;
  activeStage: EducationStage;
  institutionsByStage: Record<EducationStage, InstitutionInfo>;
  students: StudentRecord[];
  subjects: SubjectConfig[];
  absences: AbsenceRecord[];
  staffMembers: TeacherOrStaffMember[];
  timetable: DutySlot[];
  agenda: AgendaTask[];
}

export interface StaffRoleSpec {
  id: StaffRoleId;
  title: string;
  shortTitle: string;
  stages: EducationStage[];
  category2554: string;
  indexPoints: number;
  weeklyHours: number;
  coreMission: string;
  keyDuties: string[];
  superiorAuthority: string;
}

export interface StageConfig {
  id: EducationStage;
  name: string;
  shortName: string;
  staffTitle: string;
  availableRoles: StaffRoleId[];
  defaultRole: StaffRoleId;
  principalTitle: string;
  counsellorTitle: string;
  inspectorTitle: string;
  institutionLabel: string;
  maxGradeScale: number;
  passingGrade: number;
  hasSupervisedTest: boolean;
  hasCoefficients: boolean;
  nationalExamName: string;
  staffWeeklyQuota: number;
  classificationCategory: string;
  badgeText: string;
  description: string;
}

export interface InstitutionInfo {
  stage: EducationStage;
  schoolName: string;
  wilaya: string;
  staffName: string;
  activeRoleId: StaffRoleId;
  customRoleTitle?: string;
  schoolYear: string;
  currentTerm: 1 | 2 | 3;
  logoUrl: string;
}

export interface SubjectGrade {
  eval: number;
  test: number;
  exam: number;
  exempt?: boolean;
}

export interface StudentRecord {
  id: string;
  stage: EducationStage;
  matricule: string;
  fullName: string;
  birthDate: string;
  classGroup: string;
  level: string;
  parentName: string;
  parentPhone: string;
  canteenBeneficiary?: boolean;
  halfBoard?: boolean;
  isRepeater?: boolean;
  behaviorNote?: string;
  grades: Record<string, SubjectGrade>;
}

export interface SubjectConfig {
  id: string;
  name: string;
  shortName: string;
  stages: EducationStage[];
  coefficients: Record<string, number>;
}

export type AbsenceStatus =
  | 'unjustified'
  | 'justified'
  | 'late'
  | 'parent_summoned'
  | 'warning_sent'
  | 'pledge_signed'
  | 'council_referred'
  | 'health_uds';

export interface AbsenceRecord {
  id: string;
  stage: EducationStage;
  type: 'student' | 'staff';
  targetId: string;
  personName: string;
  classOrRole: string;
  date: string;
  period: 'morning' | 'afternoon' | 'full_day' | 'hourly';
  durationHours: number;
  status: AbsenceStatus;
  reason: string;
  recordedByRole: string;
  entryTicketIssued: boolean;
  parentNotified: boolean;
}

export interface TeacherOrStaffMember {
  id: string;
  stage: EducationStage;
  name: string;
  roleTitle: string;
  subjectOrZone: string;
  assignedClasses: string[];
  phone: string;
  amattiSynced: boolean;
  absenceRegisterChecked: boolean;
}

export interface DutySlot {
  id: string;
  stage: EducationStage;
  day: string;
  period: string;
  zone: string;
  assignedStaff: string;
  roleTitle: string;
  taskDescription: string;
  classGroup: string;
}

export interface AgendaTask {
  id: string;
  stage: EducationStage | 'all';
  title: string;
  category: 'daily_duty' | 'absence_followup' | 'canteen_health' | 'council_prep' | 'exam_org';
  dueDate: string;
  targetRole: string;
  legalRef: string;
  status: 'completed' | 'in_progress' | 'scheduled';
}

export interface LegalDocument {
  id: string;
  number: string;
  date: string;
  category: 'decree_2554' | 'tasks_decision' | 'discipline_171' | 'primary_educator' | 'digital_exams';
  title: string;
  description: string;
  isUpdated2026?: boolean;
  fullText: string;
  keyArticles: {
    articleNumber: string;
    summary: string;
    text: string;
  }[];
}

export interface PrintableTemplate {
  id: string;
  stage: EducationStage | 'all';
  category: 'absence_notice' | 'discipline' | 'daily_report' | 'canteen_uds' | 'staff_admin';
  title: string;
  roleBadge: string;
  description: string;
  legalHeader: string;
  fields: {
    key: string;
    label: string;
    defaultValue: string;
    multiline?: boolean;
  }[];
}
