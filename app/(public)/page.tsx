import Link from "next/link";
import {
    Play, ArrowRight, Hourglass, TrendingUp, EyeOff,
    CloudUpload, BarChart2, Target, RefreshCcw,
    CheckCircle2, GraduationCap, Briefcase, ShieldCheck, Settings
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import * as motion from "framer-motion/client";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#f8f6f0] font-sans text-gray-900 overflow-x-hidden selection:bg-jungle selection:text-white">

            {/* Header / Navbar */}
            <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-[#faf3dd]/80 border-b border-gray-200 transition-all duration-300">
                <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between px-8 py-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 text-jungle">
                            <div className="w-6 h-6 flex flex-wrap gap-0.5 relative">
                                <div className="w-2.5 h-2.5 bg-jungle rounded-sm"></div>
                                <div className="w-2.5 h-2.5 bg-jungle rounded-sm opacity-60"></div>
                                <div className="w-2.5 h-2.5 bg-jungle rounded-sm opacity-80"></div>
                                <div className="w-2.5 h-2.5 bg-tropicalTeal rounded-sm"></div>
                            </div>
                            <span className="text-xl font-black tracking-tight">ElevatED</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-12">
                        <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-gray-700 tracking-wide">
                            <Link href="#challenge" className="hover:text-jungle transition-colors">The Challenge</Link>
                            <Link href="#process" className="hover:text-jungle transition-colors">Process</Link>
                            <Link href="#intelligence" className="hover:text-jungle transition-colors">Intelligence</Link>
                            <Link href="#impact" className="hover:text-jungle transition-colors">Impact</Link>
                        </nav>

                        <div className="flex items-center gap-6">
                            <Link href="/auth?type=login" className="text-sm font-bold text-gray-800 hover:text-jungle transition-colors">
                                Portal Login
                            </Link>
                            <Link href="/auth?type=login">
                                <button className="bg-jungle/90 hover:bg-jungle text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-transform hover:scale-105">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-36 pb-20 px-8 max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start z-10 lg:pr-12"
                >
                    <div className="flex flex-wrap gap-3 mb-8">
                        <span className="inline-flex items-center gap-2 bg-jungle/10 text-jungle text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase">
                            <SparkleIcon /> AI Resume Intelligence
                        </span>
                        <span className="inline-flex items-center gap-2 bg-jungle/10 text-jungle text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase">
                            <ChartIcon /> Predictive Readiness Scoring
                        </span>
                        <span className="inline-flex items-center gap-2 bg-jungle/10 text-jungle text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase">
                            <ShieldIcon /> Transparent Policy Enforcement
                        </span>
                    </div>

                    <h1 className="text-6xl lg:text-[5.5rem] font-black leading-[0.9] tracking-tighter text-[#1C2924] mb-8">
                        Elevate<br />
                        Your<br />
                        Placement<br />
                        <span className="text-jungle">Journey</span>
                    </h1>

                    <p className="text-xl text-gray-700 font-medium max-w-lg mb-12 leading-relaxed">
                        Predict your placement readiness. Improve it strategically. Track it transparently.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link href="/auth?type=register">
                            <button className="flex items-center gap-2 bg-[#528a7e] hover:bg-jungle text-white px-8 py-4 rounded-full text-sm font-bold shadow-lg transition-transform hover:scale-105">
                                Launch My Career <ArrowRight size={16} />
                            </button>
                        </Link>
                        <Link href="/simulator">
                            <button className="flex items-center gap-3 bg-white hover:bg-gray-50 text-[#1C2924] px-8 py-4 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
                                <div className="w-6 h-6 rounded-full bg-jungle/10 flex items-center justify-center">
                                    <Play fill="#4a7c59" className="text-jungle w-3 h-3 ml-0.5" />
                                </div>
                                Experience ATX
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Right UI Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative z-10 flex justify-start lg:justify-end mt-12 lg:mt-0"
                >
                    <div className="bg-white rounded-[2rem] p-8 shadow-2xl w-full max-w-[28rem] border border-gray-100 rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="font-bold text-[#1C2924] text-lg">Candidate ATX Intelligence</h3>
                                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">Session ID: 884-PL-2024</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <Settings size={14} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 items-center">
                            {/* ATX Score Circle */}
                            <div className="relative flex flex-col items-center justify-center p-6 pb-8 bg-gray-50 rounded-2xl">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200" />
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="351.8" strokeDashoffset="42.2" className="text-jungle" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-[#1C2924]">882</span>
                                    <span className="text-[10px] font-bold text-gray-400 tracking-wider">ATX INDEX</span>
                                </div>
                                <div className="absolute bottom-4 bg-white px-3 py-1 rounded-full text-[9px] font-black text-jungle uppercase tracking-widest shadow-sm border border-gray-100 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-jungle"></div>
                                    Top 2% Talent Tier
                                </div>
                            </div>

                            {/* Progress Bars */}
                            <div className="flex flex-col gap-6">
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold text-[#1C2924] uppercase tracking-wider mb-2">
                                        <span>Tech Proficiency</span>
                                        <span>96%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                                        <div className="h-full bg-jungle rounded-full" style={{ width: '96%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold text-[#1C2924] uppercase tracking-wider mb-2">
                                        <span>Cognitive Aptitude</span>
                                        <span>84%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                                        <div className="h-full bg-jungle rounded-full opacity-60" style={{ width: '84%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold text-[#1C2924] uppercase tracking-wider mb-2">
                                        <span>Soft Skills Index</span>
                                        <span>91%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                                        <div className="h-full bg-jungle rounded-full opacity-80" style={{ width: '91%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* The Challenge Section */}
            <section id="challenge" className="bg-[#212b27] py-24 px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="max-w-[1200px] mx-auto"
                >
                    <p className="text-[#4a7c59] text-[10px] font-black tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-jungle"></span> The Challenge
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-2xl leading-tight">
                        Current systems are reactive, fragmented, and opaque.
                    </h2>
                    <p className="text-gray-400 text-lg mb-16 max-w-2xl">
                        Disconnected data and manual processes create a "black box" where neither students nor recruiters know where they truly stand.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Hourglass, title: "Inefficient Screening", desc: "HR teams lose thousands of manual hours filtering resumes that don't reflect current project-ready skills." },
                            { icon: TrendingUp, title: "Skill Disconnect", desc: "Standard CGPA fails to predict actual industry performance, causing high attrition and mismatch." },
                            { icon: EyeOff, title: "Zero Transparency", desc: "Opaque shortlisting policies leave students demotivated and placement cells overwhelmed with queries." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                                className="bg-[#2a3631] border border-[#35433d] p-8 rounded-3xl"
                            >
                                <item.icon className="text-jungle w-10 h-10 mb-6" strokeWidth={1.5} />
                                <h3 className="text-white text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* The Placement Lifecycle */}
            <section id="process" className="py-24 px-8 bg-white overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-[1200px] mx-auto text-center"
                >
                    <h2 className="text-4xl font-black text-[#1C2924] mb-4">The Placement Lifecycle</h2>
                    <p className="text-gray-500 font-medium mb-20">A seamless 4-step intelligence loop for institutional success.</p>

                    <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-gray-200 -z-10"></div>

                        {[
                            { icon: CloudUpload, title: "Upload Resume", desc: "Sync historical academic data and latest project portfolios via ERP." },
                            { icon: BarChart2, title: "Get ATX Score", desc: "Our AI benchmarks your profile against industry standards instantly." },
                            { icon: Target, title: "Discover Best-Fit", desc: "AI identifies target roles and companies where you have a 90%+ match." },
                            { icon: RefreshCcw, title: "Simulate & Improve", desc: "Bridge gaps with gamified assessments and AI mock interviews." }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                className="flex flex-col items-center text-center w-full md:w-1/4 px-4 bg-white"
                            >
                                <div className="w-20 h-20 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-jungle mb-6 relative hover:scale-110 transition-transform">
                                    <step.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-[#1C2924] mb-3">{step.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* The Solution */}
            <section id="intelligence" className="py-24 px-8 bg-[#f8f6f0]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="max-w-[1200px] mx-auto text-center mb-16"
                >
                    <p className="text-jungle text-[10px] font-black tracking-[0.2em] uppercase mb-4">THE SOLUTION</p>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1C2924] leading-tight max-w-2xl mx-auto">
                        Architecting Success with AI Intelligence.
                    </h2>
                </motion.div>

                <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8">
                    {/* Solution Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[2rem] p-10 shadow-soft transition-transform hover:-translate-y-1"
                    >
                        <h3 className="text-2xl font-black text-[#1C2924] mb-8">Smarter Profile Building</h3>

                        {/* Mock Graphic */}
                        <div className="h-48 bg-gray-50 rounded-2xl mb-8 flex items-end justify-between px-8 pt-8 relative overflow-hidden">
                            <span className="absolute top-4 left-6 text-[8px] font-black text-jungle tracking-widest uppercase">MATCH ANALYSIS BAR CHART</span>
                            <motion.div initial={{ height: 0 }} whileInView={{ height: '30%' }} transition={{ duration: 1, delay: 0.2 }} className="w-[15%] bg-[#d1e0d7] rounded-t-lg"></motion.div>
                            <motion.div initial={{ height: 0 }} whileInView={{ height: '60%' }} transition={{ duration: 1, delay: 0.3 }} className="w-[15%] bg-[#a3c2b0] rounded-t-lg"></motion.div>
                            <motion.div initial={{ height: 0 }} whileInView={{ height: '40%' }} transition={{ duration: 1, delay: 0.4 }} className="w-[15%] bg-jungle rounded-t-lg"></motion.div>
                            <motion.div initial={{ height: 0 }} whileInView={{ height: '75%' }} transition={{ duration: 1, delay: 0.5 }} className="w-[15%] bg-[#c3d9cc] rounded-t-lg"></motion.div>
                            <motion.div initial={{ height: 0 }} whileInView={{ height: '50%' }} transition={{ duration: 1, delay: 0.6 }} className="w-[15%] bg-[#8fac9a] rounded-t-lg"></motion.div>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex gap-3 items-start">
                                <CheckCircle2 className="text-jungle w-5 h-5 shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-gray-600">Real-time keyword gap analysis based on 10,000+ industry job descriptions.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <CheckCircle2 className="text-jungle w-5 h-5 shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-gray-600">ATS compatibility engine that ensures your profile is recruiter-ready.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <CheckCircle2 className="text-jungle w-5 h-5 shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-gray-600">Automated LinkedIn and portfolio sync for a unified digital identity.</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Solution Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-[2rem] p-10 shadow-soft transition-transform hover:-translate-y-1"
                    >
                        <h3 className="text-2xl font-black text-[#1C2924] mb-8">Gamified Intelligence</h3>

                        {/* Mock Graphic */}
                        <div className="h-48 bg-gray-50 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden">
                            <span className="absolute top-4 right-6 text-[8px] font-black text-jungle tracking-widest uppercase">SKILL RADAR CHART</span>
                            <div className="relative w-24 h-24">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-gray-200" style={{ rotate: 45 }}></motion.div>
                                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-2 border border-gray-100" style={{ rotate: 45 }}></motion.div>
                                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 0.75 }} transition={{ duration: 0.8, type: "spring" }} className="absolute inset-0 bg-jungle/20 border-2 border-jungle shadow-[0_0_15px_rgba(74,124,89,0.3)] origin-center" style={{ rotate: 45 }}></motion.div>
                                <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-jungle rounded-full -translate-x-1/2 -translate-y-1.5 z-10"></div>
                                <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-jungle rounded-full -translate-x-1/2 translate-y-1.5 z-10"></div>
                                <div className="absolute left-0 top-1/2 w-1.5 h-1.5 bg-jungle rounded-full -translate-x-1.5 -translate-y-1/2 z-10"></div>
                                <div className="absolute right-0 top-1/2 w-1.5 h-1.5 bg-jungle rounded-full translate-x-1.5 -translate-y-1/2 z-10"></div>
                            </div>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex gap-3 items-start">
                                <CheckCircle2 className="text-jungle w-5 h-5 shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-gray-600">Proprietary ATX scoring combining tech, behavioral, and academic data.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <CheckCircle2 className="text-jungle w-5 h-5 shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-gray-600">Comparative benchmarking against 500+ global university cohorts.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <CheckCircle2 className="text-jungle w-5 h-5 shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-gray-600">Personalized "Road to 1000" skill-building quests and rewards.</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Built for Measurable Impact Section */}
            <section id="impact" className="bg-[#4a7c59] py-24 px-8 text-center text-white overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="max-w-[1200px] mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6">Built for Measurable Impact</h2>
                    <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-sm mb-16 shadow-sm">
                        Institutional Performance Metrics 2024
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 border-b border-white/10 pb-20">
                        {/* Stat 1 */}
                        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                            <div className="text-7xl font-black mb-4 tracking-tighter">92%</div>
                            <h4 className="text-sm font-bold tracking-widest uppercase mb-4 opacity-90">Match Accuracy</h4>
                            <p className="text-xs opacity-70 leading-relaxed font-medium max-w-[250px] mx-auto">Candidates hired for roles aligned with their technical profile.</p>
                        </motion.div>
                        {/* Stat 2 */}
                        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                            <div className="text-7xl font-black mb-4 tracking-tighter">40%</div>
                            <h4 className="text-sm font-bold tracking-widest uppercase mb-4 opacity-90">Faster Shortlisting</h4>
                            <p className="text-xs opacity-70 leading-relaxed font-medium max-w-[250px] mx-auto">Reduction in time-to-hire through automated ATX screening.</p>
                        </motion.div>
                        {/* Stat 3 */}
                        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
                            <div className="text-7xl font-black mb-4 tracking-tighter">100%</div>
                            <h4 className="text-sm font-bold tracking-widest uppercase mb-4 opacity-90">Policy Transparency</h4>
                            <p className="text-xs opacity-70 leading-relaxed font-medium max-w-[250px] mx-auto">Auditable selection logs providing zero-bias recruitment data.</p>
                        </motion.div>
                    </div>

                    {/* Target Audience Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mt-20 text-left">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
                            className="bg-white rounded-[2rem] p-10 text-[#1C2924] relative shadow-2xl transition-transform hover:-translate-y-2"
                        >
                            <div className="absolute top-0 left-10 right-10 h-1.5 bg-jungle rounded-b-md"></div>
                            <GraduationCap className="text-jungle w-8 h-8 mb-6" />
                            <h3 className="text-xl font-black mb-4">For Students</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">Access career roadmaps, ATX scoring, and personalized job matching for your dream career.</p>
                            <Link href="/auth?type=register" className="inline-flex items-center gap-2 text-jungle text-xs font-black uppercase tracking-wider group hover:text-tropicalTeal transition-colors">
                                Get Your Score <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
                            className="bg-white rounded-[2rem] p-10 text-[#1C2924] relative shadow-2xl transition-transform hover:-translate-y-2"
                        >
                            <div className="absolute top-0 left-10 right-10 h-1.5 bg-jungle rounded-b-md"></div>
                            <Briefcase className="text-jungle w-8 h-8 mb-6" />
                            <h3 className="text-xl font-black mb-4">For Recruiters</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">Identify top talent effortlessly with pre-verified profiles and AI-driven skill mapping.</p>
                            <Link href="/auth?type=register&role=recruiter" className="inline-flex items-center gap-2 text-jungle text-xs font-black uppercase tracking-wider group hover:text-tropicalTeal transition-colors">
                                Build Your Pipeline <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}
                            className="bg-white rounded-[2rem] p-10 text-[#1C2924] relative shadow-2xl transition-transform hover:-translate-y-2"
                        >
                            <div className="absolute top-0 left-10 right-10 h-1.5 bg-jungle rounded-b-md"></div>
                            <ShieldCheck className="text-jungle w-8 h-8 mb-6" />
                            <h3 className="text-xl font-black mb-4">For Admin</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">Full-suite ERP to manage placement calendars, student data, and company logistics.</p>
                            <Link href="/auth?type=login" className="inline-flex items-center gap-2 text-jungle text-xs font-black uppercase tracking-wider group hover:text-tropicalTeal transition-colors">
                                Request Demo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Final CTA Box */}
            <section className="bg-[#f8f6f0] py-24 px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="max-w-[1200px] mx-auto bg-[#598365] rounded-[2.5rem] p-16 text-center shadow-xl relative overflow-hidden"
                >
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Ready to Elevate Your<br />Campus Placements?
                        </h2>
                        <p className="text-white/90 text-sm md:text-base font-medium max-w-xl mx-auto mb-10 leading-relaxed">
                            Join the elite network of universities transforming recruitment with AI-driven transparency.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link href="/auth?type=register">
                                <button className="bg-white hover:bg-gray-50 text-jungle px-8 py-4 rounded-full text-sm font-bold shadow-lg transition-transform hover:scale-105">
                                    Join the Waitlist
                                </button>
                            </Link>
                            <Link href="#contact">
                                <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-full text-sm font-bold transition-all hover:border-white">
                                    Consult our Experts
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1f2924] text-white py-16 px-8 border-t border-[#2a3631]">
                <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Column 1 - Brand */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 text-white mb-6 hover:opacity-80 transition-opacity">
                            <div className="w-5 h-5 flex flex-wrap gap-[1px] relative">
                                <div className="w-2 h-2 bg-jungle rounded-[1px]"></div>
                                <div className="w-2 h-2 bg-jungle rounded-[1px] opacity-60"></div>
                                <div className="w-2 h-2 bg-jungle rounded-[1px] opacity-80"></div>
                                <div className="w-2 h-2 bg-tropicalTeal rounded-[1px]"></div>
                            </div>
                            <span className="text-lg font-black tracking-tight">ElevatED</span>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed max-w-xs font-medium">
                            The future of talent acquisition and placement management powered by advanced AI and ATX scoring protocols.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-widest uppercase mb-6 opacity-60">Intelligence</h4>
                        <ul className="space-y-4 text-xs font-bold text-gray-300">
                            <li><Link href="#" className="hover:text-jungle transition-colors">ATX Methodology</Link></li>
                            <li><Link href="#" className="hover:text-jungle transition-colors">ERP Connect</Link></li>
                            <li><Link href="#" className="hover:text-jungle transition-colors">Bias Auditing</Link></li>
                            <li><Link href="#" className="hover:text-jungle transition-colors">Skill Radar</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-widest uppercase mb-6 opacity-60">Institution</h4>
                        <ul className="space-y-4 text-xs font-bold text-gray-300">
                            <li><Link href="#" className="hover:text-jungle transition-colors">About Authority</Link></li>
                            <li><Link href="#" className="hover:text-jungle transition-colors">Partnerships</Link></li>
                            <li><Link href="#" className="hover:text-jungle transition-colors">Case Studies</Link></li>
                            <li><Link href="#" className="hover:text-jungle transition-colors">Press Kit</Link></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-widest uppercase mb-6 opacity-60">Contact</h4>
                        <ul className="space-y-4 text-xs font-bold text-gray-300">
                            <li><Link href="#" className="hover:text-jungle transition-colors">Direct Support</Link></li>
                            <li><Link href="#" className="hover:text-jungle transition-colors">Enterprise Sales</Link></li>
                            <li><Link href="#" className="hover:text-jungle transition-colors">Documentation</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-[#2a3631] flex flex-col md:flex-row items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <p>© 2026 ELEVATED AUTHORITY PLATFORM. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">LINKEDIN</Link>
                        <Link href="#" className="hover:text-white transition-colors">TWITTER</Link>
                        <Link href="#" className="hover:text-white transition-colors">INSTAGRAM</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Inline Icon Components for Hero
function SparkleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
    );
}

function ChartIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
    );
}

function ShieldIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    );
}
