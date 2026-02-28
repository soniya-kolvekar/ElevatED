import { create } from 'zustand';

// Types
export type AdminStudent = {
    id: string;
    name: string;
    branch: string;
    cgpa: string;
    atx: number;
    status: 'Placed' | 'Eligible' | 'Pending' | 'Not Eligible';
};

export type AuditLog = {
    id: string;
    timestamp: string;
    initials: string;
    user: string;
    role: string;
    category: 'POLICY_OVERRIDE' | 'RESUME_UPLOAD' | 'ACCESS_GRANT' | 'BATCH_UPDATE' | 'STUDENT_ADDED';
    categoryColor: string;
    target: string;
};

const initialStudents: AdminStudent[] = [
    { id: "S1042", name: "Rahul Verma", branch: "CSE", cgpa: "9.2", atx: 840, status: "Placed" },
    { id: "S1043", name: "Priya Sharma", branch: "ECE", cgpa: "8.7", atx: 790, status: "Eligible" },
    { id: "S1044", name: "Arjun Singh", branch: "IT", cgpa: "7.9", atx: 710, status: "Eligible" },
    { id: "S1045", name: "Sneha Patel", branch: "ME", cgpa: "8.1", atx: 650, status: "Pending" },
    { id: "S1046", name: "Vikram Gupta", branch: "CSE", cgpa: "6.8", atx: 520, status: "Not Eligible" },
    { id: "S1047", name: "Aisha Khan", branch: "IT", cgpa: "8.5", atx: 760, status: "Eligible" },
    { id: "S1048", name: "Devansh Mehta", branch: "CSE", cgpa: "9.5", atx: 910, status: "Placed" },
    { id: "S1049", name: "Kavya Iyer", branch: "CE", cgpa: "7.2", atx: 590, status: "Pending" },
    { id: "S1050", name: "Siddharth Rao", branch: "ECE", cgpa: "8.9", atx: 820, status: "Placed" },
    { id: "S1051", name: "Ananya Desai", branch: "CSE", cgpa: "7.5", atx: 680, status: "Eligible" },
];

const initialAuditLogs: AuditLog[] = [
    { id: "L1", timestamp: "2023-10-27 14:23:01", initials: "JD", user: "John Doe", role: "RECRUITER (MICROSOFT)", category: "POLICY_OVERRIDE", categoryColor: "bg-yellow-100/80 text-yellow-800", target: "Slot #42: Tech Interview" },
    { id: "L2", timestamp: "2023-10-27 14:15:45", initials: "AS", user: "Arjun Sharma", role: "STUDENT (CS-24)", category: "RESUME_UPLOAD", categoryColor: "bg-blue-100/80 text-blue-800", target: "v2_final_placement.pdf" },
    { id: "L3", timestamp: "2023-10-27 14:02:11", initials: "SA", user: "Super Admin", role: "ADMIN CONSOLE", category: "ACCESS_GRANT", categoryColor: "bg-red-100/80 text-red-800", target: "Role: TPO_JUNIOR" },
    { id: "L4", timestamp: "2023-10-27 13:58:30", initials: "ML", user: "Meta Labs", role: "RECRUITER BOT", category: "BATCH_UPDATE", categoryColor: "bg-purple-100/80 text-purple-800", target: "Student ATX Scores (542 records)" },
    { id: "L5", timestamp: "2023-10-27 13:45:12", initials: "PK", user: "Priya Kapoor", role: "STUDENT (EC-23)", category: "POLICY_OVERRIDE", categoryColor: "bg-yellow-100/80 text-yellow-800", target: "Late Registration: Google Inc." },
];

interface AdminState {
    students: AdminStudent[];
    auditLogs: AuditLog[];
    addStudent: (student: AdminStudent) => void;
    addAuditLog: (log: Omit<AuditLog, "id" | "timestamp">) => void;
}

export const useAdminStore = create<AdminState>()((set) => ({
    students: initialStudents,
    auditLogs: initialAuditLogs,
    addStudent: (student) => set((state) => ({
        students: [student, ...state.students]
    })),
    addAuditLog: (log) => set((state) => {
        const newLog: AuditLog = {
            ...log,
            id: `L${state.auditLogs.length + 1}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
        return { auditLogs: [newLog, ...state.auditLogs] };
    }),
}));
