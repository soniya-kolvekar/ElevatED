"use client";

import { useState, useMemo } from "react";
import { MagnifyingGlassIcon, FunnelIcon, EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAdminStore, AdminStudent } from "@/store/useAdminStore";

export default function StudentsPage() {
    const { students, addStudent, addAuditLog } = useAdminStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterBranch, setFilterBranch] = useState("All");
    const [filterCgpa, setFilterCgpa] = useState("");
    const [filterAtx, setFilterAtx] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form State
    const [newStudent, setNewStudent] = useState({
        name: "",
        id: "",
        branch: "CSE",
        cgpa: "",
        atx: "",
        status: "Eligible" as AdminStudent["status"]
    });

    // Derived Data
    const filteredStudents = useMemo(() => {
        return students.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesBranch = filterBranch === "All" || s.branch === filterBranch;
            const matchesCgpa = filterCgpa === "" || parseFloat(s.cgpa) >= parseFloat(filterCgpa);
            const matchesAtx = filterAtx === "" || s.atx >= parseInt(filterAtx);
            return matchesSearch && matchesBranch && matchesCgpa && matchesAtx;
        });
    }, [students, searchQuery, filterBranch, filterCgpa, filterAtx]);

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const cgpaFloat = parseFloat(newStudent.cgpa);
        const atxInt = parseInt(newStudent.atx);

        if (!newStudent.name || !newStudent.id || isNaN(cgpaFloat) || isNaN(atxInt)) {
            alert("Please fill all fields correctly.");
            return;
        }

        const studentToAdd: AdminStudent = {
            id: newStudent.id,
            name: newStudent.name,
            branch: newStudent.branch,
            cgpa: cgpaFloat.toFixed(1),
            atx: atxInt,
            status: newStudent.status
        };

        addStudent(studentToAdd);
        addAuditLog({
            initials: "SA",
            user: "Super Admin",
            role: "ADMIN CONSOLE",
            category: "STUDENT_ADDED",
            categoryColor: "bg-green-100/80 text-green-800",
            target: `Added Student: ${studentToAdd.name} (${studentToAdd.id})`
        });

        setIsAddModalOpen(false);
        setNewStudent({ name: "", id: "", branch: "CSE", cgpa: "", atx: "", status: "Eligible" });
    };

    return (
        <div className="w-full pb-10 space-y-6 relative">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 mt-2">
                <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#457c5f] font-bold mb-2 flex items-center gap-2">
                        <span className="text-gray-400">ADMIN CONSOLE</span>
                        <span className="text-gray-300">›</span>
                        <span>DIRECTORY</span>
                    </div>
                    <h1 className="text-[28px] leading-tight font-extrabold text-[#0a192f] mb-1.5 tracking-tight">
                        Student Master Data
                    </h1>
                    <p className="text-[14px] text-gray-500 font-medium">
                        Manage and review student profiles, academic records, and real-time eligibility status.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <select
                        value={filterBranch}
                        onChange={(e) => setFilterBranch(e.target.value)}
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm outline-none cursor-pointer"
                    >
                        <option value="All">All Branches</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="IT">IT</option>
                        <option value="CE">CE</option>
                        <option value="ME">ME</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Min CGPA"
                        value={filterCgpa}
                        onChange={(e) => setFilterCgpa(e.target.value)}
                        className="w-28 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm outline-none placeholder:font-medium"
                    />
                    <input
                        type="number"
                        placeholder="Min ATX"
                        value={filterAtx}
                        onChange={(e) => setFilterAtx(e.target.value)}
                        className="w-28 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm outline-none placeholder:font-medium"
                    />
                    <button onClick={() => setIsAddModalOpen(true)} className="px-5 py-2.5 bg-[#457c5f] hover:bg-[#346048] text-white rounded-full text-[13px] font-bold transition-colors shadow-sm shadow-[#457c5f]/20">
                        Add Student
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[20px] shadow-sm border border-[#f0f3f1] overflow-hidden">
                {/* Search Bar */}
                <div className="p-4 border-b border-[#f0f3f1] flex items-center gap-3 bg-[#f8fbfa]">
                    <div className="relative flex-1 max-w-md">
                        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by student name, ID, or branch..."
                            className="w-full bg-white border border-[#e9f0ec] rounded-full pl-9 pr-4 py-2 text-[13px] font-medium focus:outline-none focus:border-[#457c5f] focus:ring-1 focus:ring-[#457c5f] transition-all"
                        />
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-[#f0f3f1] text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                                <th className="px-6 py-4">Student Info</th>
                                <th className="px-6 py-4">Branch</th>
                                <th className="px-6 py-4">CGPA</th>
                                <th className="px-6 py-4">ATX Score</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f0f3f1]">
                            {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-[#f4f7f5] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#f8fbfa] border border-[#e9f0ec] flex items-center justify-center text-[12px] font-bold text-[#457c5f]">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-[13px] font-bold text-[#0a192f]">{student.name}</div>
                                                <div className="text-[11px] text-gray-500 font-medium">{student.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] font-bold text-gray-600">{student.branch}</td>
                                    <td className="px-6 py-4 text-[13px] font-bold text-[#0a192f]">{student.cgpa}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded text-[11px] font-bold bg-[#f8fbfa] text-[#457c5f] border border-[#e9f0ec]">
                                            {student.atx}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${student.status === 'Placed' ? 'bg-[#eef5ef] text-[#1eb463]' :
                                            student.status === 'Eligible' ? 'bg-[#ebf4ff] text-[#3b82f6]' :
                                                student.status === 'Pending' ? 'bg-[#fff8e1] text-[#f59e0b]' :
                                                    'bg-red-50 text-red-600'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => alert(`Viewing details for ${student.name}...`)} className="text-gray-400 hover:text-[#457c5f] transition-colors p-1">
                                            <EllipsisHorizontalIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium text-[13px]">
                                        No students found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Static) */}
                <div className="p-4 border-t border-[#f0f3f1] bg-white flex items-center justify-between">
                    <span className="text-[12px] font-medium text-gray-500">Showing {filteredStudents.length} students</span>
                </div>
            </div>

            {/* Add Student Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[24px] w-full max-w-lg shadow-2xl overflow-hidden border border-[#e8e4db] animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-[#f0f3f1] flex justify-between items-center bg-[#f8fbfa]">
                            <div>
                                <h3 className="text-[18px] font-extrabold text-[#0a192f]">Add New Student</h3>
                                <p className="text-[12px] font-medium text-gray-500 mt-1">Enter student academic details manually.</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-8 h-8 rounded-full bg-white border border-[#e9f0ec] flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                    <input required type="text" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} className="w-full px-4 py-2.5 bg-[#f8fbfa] border border-[#e9f0ec] rounded-xl text-[13px] font-bold text-[#0a192f] focus:outline-none focus:border-[#457c5f]" placeholder="eg. Rahul Verma" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Student ID</label>
                                    <input required type="text" value={newStudent.id} onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })} className="w-full px-4 py-2.5 bg-[#f8fbfa] border border-[#e9f0ec] rounded-xl text-[13px] font-bold text-[#0a192f] focus:outline-none focus:border-[#457c5f]" placeholder="eg. S1052" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Branch</label>
                                    <select value={newStudent.branch} onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })} className="w-full px-4 py-2.5 bg-[#f8fbfa] border border-[#e9f0ec] rounded-xl text-[13px] font-bold text-[#0a192f] focus:outline-none focus:border-[#457c5f]">
                                        <option value="CSE">CSE</option>
                                        <option value="ECE">ECE</option>
                                        <option value="IT">IT</option>
                                        <option value="CE">CE</option>
                                        <option value="ME">ME</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">CGPA</label>
                                    <input required type="number" step="0.1" max="10" value={newStudent.cgpa} onChange={(e) => setNewStudent({ ...newStudent, cgpa: e.target.value })} className="w-full px-4 py-2.5 bg-[#f8fbfa] border border-[#e9f0ec] rounded-xl text-[13px] font-bold text-[#0a192f] focus:outline-none focus:border-[#457c5f]" placeholder="eg. 8.5" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">ATX Score</label>
                                    <input required type="number" value={newStudent.atx} onChange={(e) => setNewStudent({ ...newStudent, atx: e.target.value })} className="w-full px-4 py-2.5 bg-[#f8fbfa] border border-[#e9f0ec] rounded-xl text-[13px] font-bold text-[#0a192f] focus:outline-none focus:border-[#457c5f]" placeholder="eg. 750" />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</label>
                                    <select value={newStudent.status} onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value as AdminStudent["status"] })} className="w-full px-4 py-2.5 bg-[#f8fbfa] border border-[#e9f0ec] rounded-xl text-[13px] font-bold text-[#0a192f] focus:outline-none focus:border-[#457c5f]">
                                        <option value="Eligible">Eligible</option>
                                        <option value="Placed">Placed</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Not Eligible">Not Eligible</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-[#f0f3f1] flex justify-end gap-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2.5 bg-[#457c5f] hover:bg-[#346048] text-white rounded-full text-[13px] font-bold transition-colors shadow-sm">
                                    Save Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
