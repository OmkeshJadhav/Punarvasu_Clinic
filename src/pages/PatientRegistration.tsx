import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Upload } from "lucide-react";

export default function PatientRegistration() {
    const [, navigate] = useLocation();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "male",
        contactInfo: "",
        address: "",
        bloodGroup: "",
        medicalHistory: "",
        emergencyContact: "",
        emergencyContactName: "",
    });

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const registerMutation = trpc.patient.register.useMutation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUploadedFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerMutation.mutateAsync({
                name: formData.name,
                age: parseInt(formData.age) || undefined,
                gender: (formData.gender as "male" | "female" | "other") || undefined,
                contactInfo: formData.contactInfo || undefined,
                address: formData.address || undefined,
                bloodGroup: formData.bloodGroup || undefined,
                medicalHistory: formData.medicalHistory || undefined,
                emergencyContact: formData.emergencyContact || undefined,
                emergencyContactName: formData.emergencyContactName || undefined,
            });
            navigate("/patient-dashboard");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <motion.section
                className="py-16 bg-amber-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 max-w-2xl">
                    <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">
                        Patient Registration
                    </h1>

                    <Card className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-amber-900 mb-2">
                                    Full Name *
                                </label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your full name"
                                    className="w-full"
                                />
                            </div>

                            {/* Age and Gender */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                                        Age
                                    </label>
                                    <Input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        placeholder="Age"
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <label className="block text-sm font-semibold text-amber-900 mb-2">
                                    Contact Number
                                </label>
                                <Input
                                    type="tel"
                                    name="contactInfo"
                                    value={formData.contactInfo}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className="w-full"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-semibold text-amber-900 mb-2">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your address"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows={3}
                                />
                            </div>

                            {/* Blood Group */}
                            <div>
                                <label className="block text-sm font-semibold text-amber-900 mb-2">
                                    Blood Group
                                </label>
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>

                            {/* Medical History */}
                            <div>
                                <label className="block text-sm font-semibold text-amber-900 mb-2">
                                    Medical History (Allergies, Major Issues)
                                </label>
                                <textarea
                                    name="medicalHistory"
                                    value={formData.medicalHistory}
                                    onChange={handleInputChange}
                                    placeholder="Describe any allergies or major health issues"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows={4}
                                />
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-amber-900 mb-2">
                                    Upload Medical Reports (PDF, Images)
                                </label>
                                <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center cursor-pointer hover:bg-amber-50 transition">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileUpload}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <Upload className="mx-auto mb-2 text-amber-600" size={32} />
                                        <p className="text-gray-600">Click to upload files</p>
                                        <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB</p>
                                    </label>
                                </div>
                                {uploadedFiles.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-semibold text-amber-900 mb-2">
                                            Uploaded Files:
                                        </p>
                                        <ul className="space-y-1">
                                            {uploadedFiles.map((file, idx) => (
                                                <li key={idx} className="text-sm text-gray-600">
                                                    ✓ {file.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Emergency Contact */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                                        Emergency Contact Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="emergencyContactName"
                                        value={formData.emergencyContactName}
                                        onChange={handleInputChange}
                                        placeholder="Name"
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                                        Emergency Contact Number
                                    </label>
                                    <Input
                                        type="tel"
                                        name="emergencyContact"
                                        value={formData.emergencyContact}
                                        onChange={handleInputChange}
                                        placeholder="Phone"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={registerMutation.isPending}
                                className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3"
                            >
                                {registerMutation.isPending ? "Registering..." : "Complete Registration"}
                            </Button>
                        </form>
                    </Card>
                </div>
            </motion.section>

            <Footer />
        </div>
    );
}
