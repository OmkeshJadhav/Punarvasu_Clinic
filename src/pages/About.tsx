import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DUMMY_DOCTORS } from "@/const";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <motion.section
                className="bg-gradient-to-r from-amber-900 to-amber-700 text-white py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">About Punarvasu Clinic</h1>
                    <p className="text-xl text-amber-100 max-w-2xl mx-auto">
                        Dedicated to bringing authentic Ayurvedic healing to modern healthcare
                    </p>
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section
                className="py-16 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-amber-900 mb-6">
                            Our Story
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            Punarvasu Clinic was founded with a mission to bridge the gap between ancient Ayurvedic wisdom and modern healthcare. Our name "Punarvasu" means "return to wellness" in Sanskrit, reflecting our commitment to helping patients restore their health and vitality.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            With over 15 years of combined experience, our team of certified Ayurvedic doctors brings together traditional knowledge and contemporary clinical practice. We believe that true healing comes from understanding the root cause of illness and treating the whole person, not just the symptoms.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Our clinic is equipped with modern facilities while maintaining the authentic principles of Ayurvedic treatment. We are committed to providing personalized care, transparent communication, and measurable results for every patient.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Our Doctors */}
            <motion.section
                className="py-16 bg-amber-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-amber-900 mb-12 text-center">
                        Meet Our Doctors
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {DUMMY_DOCTORS.map((doctor, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card className="overflow-hidden h-full">
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-amber-900 mb-2">
                                            {doctor.name}
                                        </h3>
                                        <p className="text-amber-600 font-semibold mb-3">
                                            {doctor.specialization}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-2">
                                            <strong>Qualifications:</strong> {doctor.qualifications}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-4">
                                            <strong>Experience:</strong> {doctor.experience} years
                                        </p>
                                        <p className="text-gray-600 text-sm mb-6">
                                            {doctor.bio}
                                        </p>
                                        <a href={getLoginUrl()}>
                                            <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">
                                                Book with {doctor.name.split(",")[0]}
                                            </Button>
                                        </a>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Contact & Location */}
            <motion.section
                className="py-16 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-amber-900 mb-12 text-center">
                        Contact & Location
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-8">
                                <h3 className="text-2xl font-bold text-amber-900 mb-8">
                                    Get In Touch
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <MapPin className="text-amber-900 flex-shrink-0 mt-1" size={24} />
                                        <div>
                                            <h4 className="font-semibold text-amber-900 mb-2">
                                                Location
                                            </h4>
                                            <p className="text-gray-600">
                                                123 Wellness Street<br />
                                                Healing City, HC 12345<br />
                                                India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Phone className="text-amber-900 flex-shrink-0 mt-1" size={24} />
                                        <div>
                                            <h4 className="font-semibold text-amber-900 mb-2">
                                                Phone
                                            </h4>
                                            <p className="text-gray-600">(555) 123-4567</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Mail className="text-amber-900 flex-shrink-0 mt-1" size={24} />
                                        <div>
                                            <h4 className="font-semibold text-amber-900 mb-2">
                                                Email
                                            </h4>
                                            <p className="text-gray-600">info@punarvasu.com</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Clock className="text-amber-900 flex-shrink-0 mt-1" size={24} />
                                        <div>
                                            <h4 className="font-semibold text-amber-900 mb-2">
                                                Hours
                                            </h4>
                                            <p className="text-gray-600">
                                                Monday - Friday: 9:00 AM - 6:00 PM<br />
                                                Saturday: 10:00 AM - 4:00 PM<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <a href={getLoginUrl()} className="block mt-8">
                                    <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">
                                        Book an Appointment
                                    </Button>
                                </a>
                            </Card>
                        </motion.div>

                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-full h-full min-h-96 bg-gray-200 rounded-lg overflow-hidden">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.789519088272!2d77.20986!3d28.544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce62c62c62c63%3A0x1234567890abcdef!2sWellness%20Street!5e0!3m2!1sen!2sin!4v1234567890"
                                ></iframe>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Why Choose Us */}
            <motion.section
                className="py-16 bg-amber-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-amber-900 mb-12 text-center">
                        Why Choose Punarvasu Clinic
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Certified Doctors",
                                description: "All our doctors are certified Ayurvedic practitioners with years of experience.",
                            },
                            {
                                title: "Personalized Treatment",
                                description: "Each patient receives a customized treatment plan based on their unique constitution.",
                            },
                            {
                                title: "Modern Facilities",
                                description: "State-of-the-art equipment combined with traditional Ayurvedic practices.",
                            },
                            {
                                title: "Holistic Approach",
                                description: "We treat the root cause, not just the symptoms, for lasting wellness.",
                            },
                            {
                                title: "Patient Care",
                                description: "Compassionate care and transparent communication throughout your healing journey.",
                            },
                            {
                                title: "Proven Results",
                                description: "Thousands of satisfied patients who have experienced transformative healing.",
                            },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card className="p-6 text-center h-full">
                                    <h3 className="text-xl font-bold text-amber-900 mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <Footer />
        </div>
    );
}
