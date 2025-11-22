import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { FileText, Send, Printer } from "lucide-react";
import { useParams } from "wouter";

export default function PatientAnalysis() {
    const { user } = useAuth();
    const params = useParams();
    const patientId = parseInt(params?.patientId || "0");

    const [prescription, setPrescription] = useState({
        medicines: "",
        therapies: "",
        recommendations: "",
        nextSteps: "",
    });

    const [consultationNotes, setConsultationNotes] = useState("");
    const createPrescriptionMutation = trpc.prescription.create.useMutation();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Please log in to access this page.</p>
            </div>
        );
    }

    const handlePrescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setPrescription((prev) => ({ ...prev, [name]: value }));
    };

    const handleSavePrescription = async () => {
        try {
            // This would need the appointment ID and doctor ID
            // For now, we'll use placeholder values
            await createPrescriptionMutation.mutateAsync({
                appointmentId: 1, // Would come from context/params
                patientId: patientId,
                doctorId: 1, // Would come from user context
                medicines: prescription.medicines,
                therapies: prescription.therapies,
                recommendations: prescription.recommendations,
                nextSteps: prescription.nextSteps,
            });
            alert("Prescription saved successfully!");
            setPrescription({ medicines: "", therapies: "", recommendations: "", nextSteps: "" });
        } catch (error) {
            console.error("Error saving prescription:", error);
            alert("Failed to save prescription");
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSendWhatsApp = () => {
        const message = `Prescription for Patient #${patientId}:\n\nMedicines:\n${prescription.medicines}\n\nTherapies:\n${prescription.therapies}\n\nRecommendations:\n${prescription.recommendations}\n\nNext Steps:\n${prescription.nextSteps}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
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
                    <h1 className="text-4xl font-bold mb-2">Patient Analysis & Treatment</h1>
                    <p className="text-amber-100">Patient ID: #{patientId}</p>
                </div>
            </motion.section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Patient Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-amber-900 mb-6">
                                Patient Information
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Patient ID</p>
                                    <p className="font-semibold text-gray-900">#{patientId}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Name</p>
                                    <p className="font-semibold text-gray-900">Patient Name</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Age</p>
                                    <p className="font-semibold text-gray-900">35 years</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Gender</p>
                                    <p className="font-semibold text-gray-900">Male</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Blood Group</p>
                                    <p className="font-semibold text-gray-900">O+</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Contact</p>
                                    <p className="font-semibold text-gray-900">(555) 987-6543</p>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-sm font-semibold text-amber-900 mb-2">
                                        Medical History
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Chronic stress, occasional migraines, digestive issues
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Current Visit Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="p-6">
                                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                                    Current Visit Details
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-amber-900 mb-2">
                                            Consultation Notes & Assessment
                                        </label>
                                        <textarea
                                            value={consultationNotes}
                                            onChange={(e) => setConsultationNotes(e.target.value)}
                                            placeholder="Document patient interaction, symptoms, assessment findings..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900"
                                            rows={6}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Prescription - Medicines */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <Card className="p-6">
                                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                                    Prescription - Medicines
                                </h2>

                                <div>
                                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                                        Medicines & Dosage
                                    </label>
                                    <textarea
                                        name="medicines"
                                        value={prescription.medicines}
                                        onChange={handlePrescriptionChange}
                                        placeholder="e.g., Ashwagandha 500mg - 2 tablets twice daily with warm milk&#10;Triphala Churna 5g - once daily at bedtime"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900"
                                        rows={5}
                                    />
                                </div>
                            </Card>
                        </motion.div>

                        {/* Prescription - Therapies */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Card className="p-6">
                                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                                    Prescription - Therapies
                                </h2>

                                <div>
                                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                                        Recommended Therapies
                                    </label>
                                    <textarea
                                        name="therapies"
                                        value={prescription.therapies}
                                        onChange={handlePrescriptionChange}
                                        placeholder="e.g., Abhyanga massage - 3 times per week&#10;Shirodhara - 1 session per week for 4 weeks&#10;Steam bath - 2 times per week"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900"
                                        rows={5}
                                    />
                                </div>
                            </Card>
                        </motion.div>

                        {/* Recommendations & Next Steps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Card className="p-6">
                                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                                    General Recommendations & Next Steps
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-amber-900 mb-2">
                                            Lifestyle Recommendations
                                        </label>
                                        <textarea
                                            name="recommendations"
                                            value={prescription.recommendations}
                                            onChange={handlePrescriptionChange}
                                            placeholder="e.g., Maintain regular sleep schedule (10 PM - 6 AM)&#10;Avoid caffeine and processed foods&#10;Practice meditation for 20 minutes daily&#10;Increase water intake to 3 liters per day"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900"
                                            rows={5}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-amber-900 mb-2">
                                            Next Steps & Follow-up
                                        </label>
                                        <textarea
                                            name="nextSteps"
                                            value={prescription.nextSteps}
                                            onChange={handlePrescriptionChange}
                                            placeholder="e.g., Follow-up appointment in 2 weeks&#10;Monitor symptoms and report any changes&#10;Repeat blood tests after 1 month"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900"
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Button
                                onClick={handleSavePrescription}
                                disabled={createPrescriptionMutation.isPending}
                                className="flex-1 bg-amber-900 hover:bg-amber-800 text-white py-3"
                            >
                                <FileText className="mr-2" size={20} />
                                {createPrescriptionMutation.isPending ? "Saving..." : "Save Prescription"}
                            </Button>

                            <Button
                                onClick={handlePrint}
                                variant="outline"
                                className="flex-1 border-amber-900 text-amber-900 hover:bg-amber-50 py-3"
                            >
                                <Printer className="mr-2" size={20} />
                                Print
                            </Button>

                            <Button
                                onClick={handleSendWhatsApp}
                                variant="outline"
                                className="flex-1 border-green-600 text-green-600 hover:bg-green-50 py-3"
                            >
                                <Send className="mr-2" size={20} />
                                Send via WhatsApp
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
