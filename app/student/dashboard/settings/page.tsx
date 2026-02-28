"use client";
import { useAuthStore } from "@/store/useAuthStore";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { User, Bell, Shield, LogOut } from "lucide-react";

export default function SettingsPage() {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        document.cookie = "auth-role=; path=/; max-age=0";
        logout();
        window.location.href = "/";
    };

    return (
        <div className="space-y-8 pb-12">
            <h1 className="text-3xl font-black text-gray-900">Settings</h1>

            <div className="max-w-2xl space-y-6">
                <Card className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-jungle/10 flex items-center justify-center text-jungle font-black text-2xl">
                            {user?.name?.charAt(0) || "S"}
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-gray-900">{user?.name}</h3>
                            <p className="text-sm text-gray-500 font-medium">{user?.email}</p>
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-gray-50">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-all">
                            <div className="flex items-center gap-3">
                                <User className="text-gray-400" size={20} />
                                <span className="text-sm font-bold text-gray-700">Profile Information</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-all">
                            <div className="flex items-center gap-3">
                                <Bell className="text-gray-400" size={20} />
                                <span className="text-sm font-bold text-gray-700">Notifications</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-all">
                            <div className="flex items-center gap-3">
                                <Shield className="text-gray-400" size={20} />
                                <span className="text-sm font-bold text-gray-700">Privacy & Security</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-red-100 text-red-500 hover:bg-red-50 font-black gap-2"
                >
                    <LogOut size={20} /> Logout Account
                </Button>
            </div>
            
        </div>
    );
}
