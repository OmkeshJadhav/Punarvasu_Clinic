import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Calendar, Users, TrendingUp, Search } from "lucide-react";
import { Link } from "wouter";

export default function DoctorDashboard() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const { data: doctorProfile, isLoading: profileLoading } = trpc.doctor.getProfile.useQuery();
    const { data: appointments, isLoading: appointmentsLoading } = trpc.doctor.getAppointments.useQuery();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Please log in to access the doctor dashboard.</p>
            </div>
        );
    }

    // Filter appointments
    const todayAppointments = appointments?.filter((apt) => {
        const aptDate = new Date(apt.appointmentDate);
        const today = new Date();
        return (
            aptDate.getDate() === today.getDate() &&
            aptDate.getMonth() === today.getMonth() &&
            aptDate.getFullYear() === today.getFullYear()
        );
    }) || [];

    const upcomingAppointments = appointments?.filter((apt) => {
        const aptDate = new Date(apt.appointmentDate);
        const today = new Date();
        return aptDate > today;
    }) || [];

    const completedAppointments = appointments?.filter((apt) => apt.status === "completed") || [];

    // Analytics
    const appointmentStats = {
        total: appointments?.length || 0,
        today: todayAppointments.length,
        upcoming: upcomingAppointments.length,
        completed: completedAppointments.length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <motion.section
                className="py-12 bg-amber-900 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">
                        Welcome, {doctorProfile?.name || user.name}!
                    </h1>
                    <p className="text-amber-100">
                        {doctorProfile?.specialization || "Ayurvedic Doctor"}
                    </p>
                </div>
            </motion.section>

            <div className="container mx-auto px-4 py-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        {
                            label: "Total Appointments",
                            value: appointmentStats.total,
                            icon: Calendar,
                            color: "bg-blue-100 text-blue-600",
                        },
                        {
                            label: "Today's Appointments",
                            value: appointmentStats.today,
                            icon: Users,
                            color: "bg-green-100 text-green-600",
                        },
                        {
                            label: "Upcoming",
                            value: appointmentStats.upcoming,
                            icon: TrendingUp,
                            color: "bg-purple-100 text-purple-600",
                        },
                        {
                            label: "Completed",
                            value: appointmentStats.completed,
                            icon: Calendar,
                            color: "bg-amber-100 text-amber-600",
                        },
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                            >
                                <Card className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                        <div className={`p-3 rounded-lg ${stat.color}`}>
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Today's Appointments */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-6">
                            <h2 className="text-2xl font-bold text-amber-900 mb-6">
                                Today's Appointments
                            </h2>

                            {appointmentsLoading ? (
                                <p className="text-gray-600">Loading appointments...</p>
                            ) : todayAppointments.length > 0 ? (
                                <div className="space-y-4">
                                    {todayAppointments.map((apt, idx) => (
                                        <div
                                            key={idx}
                                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        Appointment #{apt.id}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(apt.appointmentDate).toLocaleTimeString("en-US", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${apt.status === "scheduled"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : apt.status === "completed"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                >
                                                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                                </span>
                                            </div>
                                            <Link href={`/patient-analysis/${apt.patientId}`}>
                                                <a>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full border-amber-900 text-amber-900 hover:bg-amber-50"
                                                    >
                                                        View Patient & Add Prescription
                                                    </Button>
                                                </a>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-600 py-8">
                                    No appointments scheduled for today
                                </p>
                            )}
                        </Card>
                    </motion.div>

                    {/* Quick Search */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-amber-900 mb-6">
                                Quick Patient Search
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                                        Search by Name or Mobile
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                                        <Input
                                            type="text"
                                            placeholder="Enter name or mobile"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {searchTerm && (
                                    <div className="bg-amber-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Search results for "{searchTerm}"
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Integration with patient database will show results here
                                        </p>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-amber-900 mb-4">
                                        Upcoming Appointments
                                    </h3>
                                    <div className="space-y-3">
                                        {upcomingAppointments.slice(0, 5).map((apt, idx) => (
                                            <div
                                                key={idx}
                                                className="text-sm p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                                            >
                                                <p className="font-semibold text-gray-900">Apt #{apt.id}</p>
                                                <p className="text-xs text-gray-600">
                                                    {new Date(apt.appointmentDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* All Appointments */}
                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="p-6">
                        <h2 className="text-2xl font-bold text-amber-900 mb-6">
                            All Appointments
                        </h2>

                        {appointmentsLoading ? (
                            <p className="text-gray-600">Loading appointments...</p>
                        ) : appointments && appointments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">
                                                ID
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">
                                                Patient ID
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">
                                                Date & Time
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">
                                                Status
                                            </th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-900">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((apt, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4 text-gray-900">#{apt.id}</td>
                                                <td className="py-3 px-4 text-gray-900">#{apt.patientId}</td>
                                                <td className="py-3 px-4 text-gray-600">
                                                    {new Date(apt.appointmentDate).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${apt.status === "scheduled"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : apt.status === "completed"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                    >
                                                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Link href={`/patient-analysis/${apt.patientId}`}>
                                                        <a className="text-amber-600 hover:text-amber-800 font-semibold">
                                                            View
                                                        </a>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center text-gray-600 py-8">
                                No appointments available
                            </p>
                        )}
                    </Card>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
