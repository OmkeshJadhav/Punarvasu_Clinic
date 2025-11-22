import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Calendar, FileText, User, Phone, MapPin, Droplet } from "lucide-react";
import { Link } from "wouter";

export default function PatientDashboard() {
    const { user } = useAuth();
    const { data: patientProfile, isLoading: profileLoading } = trpc.patient.getProfile.useQuery();
    const { data: appointments, isLoading: appointmentsLoading } = trpc.patient.getAppointments.useQuery();
    const { data: medicalHistory, isLoading: historyLoading } = trpc.patient.getMedicalHistory.useQuery();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Please log in to access your dashboard.</p>
            </div>
        );
    }

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
                    <h1 className="text-4xl font-bold mb-2">Welcome, {patientProfile?.name || user.name}!</h1>
                    <p className="text-amber-100">Your health journey at Punarvasu Clinic</p>
                </div>
            </motion.section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar - Patient Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-amber-900 mb-6">Your Profile</h2>

                            {profileLoading ? (
                                <p className="text-gray-600">Loading profile...</p>
                            ) : patientProfile ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <User size={20} className="text-amber-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Name</p>
                                            <p className="font-semibold text-gray-900">{patientProfile.name}</p>
                                        </div>
                                    </div>

                                    {patientProfile.age && (
                                        <div className="flex items-center gap-3">
                                            <User size={20} className="text-amber-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Age</p>
                                                <p className="font-semibold text-gray-900">{patientProfile.age}</p>
                                            </div>
                                        </div>
                                    )}

                                    {patientProfile.gender && (
                                        <div className="flex items-center gap-3">
                                            <User size={20} className="text-amber-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Gender</p>
                                                <p className="font-semibold text-gray-900 capitalize">
                                                    {patientProfile.gender}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {patientProfile.contactInfo && (
                                        <div className="flex items-center gap-3">
                                            <Phone size={20} className="text-amber-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Contact</p>
                                                <p className="font-semibold text-gray-900">{patientProfile.contactInfo}</p>
                                            </div>
                                        </div>
                                    )}

                                    {patientProfile.bloodGroup && (
                                        <div className="flex items-center gap-3">
                                            <Droplet size={20} className="text-amber-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Blood Group</p>
                                                <p className="font-semibold text-gray-900">{patientProfile.bloodGroup}</p>
                                            </div>
                                        </div>
                                    )}

                                    {patientProfile.address && (
                                        <div className="flex items-start gap-3">
                                            <MapPin size={20} className="text-amber-600 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-600">Address</p>
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    {patientProfile.address}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 mb-4">Complete your profile</p>
                                    <Link href="/patient-registration">
                                        <a>
                                            <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">
                                                Complete Profile
                                            </Button>
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </Card>
                    </motion.div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Appointments */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Card className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Calendar size={24} className="text-amber-900" />
                                    <h2 className="text-2xl font-bold text-amber-900">Your Appointments</h2>
                                </div>

                                {appointmentsLoading ? (
                                    <p className="text-gray-600">Loading appointments...</p>
                                ) : appointments && appointments.length > 0 ? (
                                    <div className="space-y-4">
                                        {appointments.map((apt, idx) => (
                                            <div
                                                key={idx}
                                                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            Appointment #{apt.id}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(apt.appointmentDate).toLocaleDateString("en-US", {
                                                                weekday: "long",
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
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
                                                {apt.notes && (
                                                    <p className="text-sm text-gray-600 mt-2">Notes: {apt.notes}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-600 mb-4">No appointments scheduled yet</p>
                                        <Link href="/appointments">
                                            <a>
                                                <Button className="bg-amber-900 hover:bg-amber-800 text-white">
                                                    Book an Appointment
                                                </Button>
                                            </a>
                                        </Link>
                                    </div>
                                )}
                            </Card>
                        </motion.div>

                        {/* Medical History */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Card className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <FileText size={24} className="text-amber-900" />
                                    <h2 className="text-2xl font-bold text-amber-900">Medical History</h2>
                                </div>

                                {historyLoading ? (
                                    <p className="text-gray-600">Loading medical history...</p>
                                ) : medicalHistory && medicalHistory.length > 0 ? (
                                    <div className="space-y-4">
                                        {medicalHistory.map((record, idx) => (
                                            <div
                                                key={idx}
                                                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="font-semibold text-gray-900 capitalize">
                                                            {record.recordType}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(record.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    {record.fileUrl && (
                                                        <a
                                                            href={record.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-amber-600 hover:text-amber-800 text-sm font-semibold"
                                                        >
                                                            View File
                                                        </a>
                                                    )}
                                                </div>
                                                {record.content && (
                                                    <p className="text-sm text-gray-600 mt-2">{record.content}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-600 py-8">
                                        No medical records available yet
                                    </p>
                                )}
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
