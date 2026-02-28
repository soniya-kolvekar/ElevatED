"use client";

import { MagnifyingGlassIcon, FunnelIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function StudentsPage() {
    const students = [
        { id: "S1042", name: "Rahul Verma", branch: "CSE", cgpa: "9.2", atx: 840, status: "Placed" },
        { id: "S1043", name: "Priya Sharma", branch: "ECE", cgpa: "8.7", atx: 790, status: "Eligible" },
        { id: "S1044", name: "Arjun Singh", branch: "IT", cgpa: "7.9", atx: 710, status: "Eligible" },
        { id: "S1045", name: "Sneha Patel", branch: "Mechanical", cgpa: "8.1", atx: 650, status: "Pending" },
        { id: "S1046", name: "Vikram Gupta", branch: "CSE", cgpa: "6.8", atx: 520, status: "Not Eligible" },
    ];

    return (
        <div className="w-full pb-10 space-y-6">
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
                <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => alert("Opening filter options...")} className="px-4 py-2 bg-white border border-gray-200 rounded-[100px] text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                        <FunnelIcon className="w-4 h-4" /> Filter
                    </button>
                    <button onClick={() => alert("Opening Add Student modal...")} className="px-5 py-2.5 bg-[#457c5f] hover:bg-[#346048] text-white rounded-[100px] text-[13px] font-bold transition-colors shadow-sm shadow-[#457c5f]/20">
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
                            {students.map((student) => (
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
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Static) */}
                <div className="p-4 border-t border-[#f0f3f1] bg-white flex items-center justify-between">
                    <span className="text-[12px] font-medium text-gray-500">Showing 1 to 5 of 1,248 students</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1.5 border border-[#e9f0ec] rounded text-[12px] font-bold text-gray-400 cursor-not-allowed">Prev</button>
                        <button className="px-3 py-1.5 bg-[#457c5f] text-white rounded text-[12px] font-bold">1</button>
                        <button className="px-3 py-1.5 border border-[#e9f0ec] hover:bg-[#f4f7f5] rounded text-[12px] font-bold text-gray-600">2</button>
                        <button className="px-3 py-1.5 border border-[#e9f0ec] hover:bg-[#f4f7f5] rounded text-[12px] font-bold text-gray-600">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
