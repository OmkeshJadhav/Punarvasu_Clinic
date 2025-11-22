import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DUMMY_DOCTORS, DUMMY_SERVICES, DUMMY_TESTIMONIALS, SPECIALITIES } from "@/const";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function Home() {
    const [doctorIndex, setDoctorIndex] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    const nextDoctor = () => {
        setDoctorIndex((prev) => (prev + 1) % DUMMY_DOCTORS.length);
    };

    const prevDoctor = () => {
        setDoctorIndex((prev) => (prev - 1 + DUMMY_DOCTORS.length) % DUMMY_DOCTORS.length);
    };

    const nextTestimonial = () => {
        setTestimonialIndex((prev) => (prev + 1) % DUMMY_TESTIMONIALS.length);
    };

    const prevTestimonial = () => {
        setTestimonialIndex((prev) => (prev - 1 + DUMMY_TESTIMONIALS.length) % DUMMY_TESTIMONIALS.length);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <motion.section
                className="relative h-screen bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=800&fit=crop')",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-center text-white max-w-2xl px-4">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Restore Balance. Heal Naturally.
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl mb-8 text-gray-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Personalized Ayurvedic care rooted in ancient wisdom for modern chronic ailments and holistic wellness.
                    </motion.p>
                    <motion.div
                        className="flex gap-4 justify-center flex-wrap"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <a href={getLoginUrl()}>
                            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg">
                                Schedule Your Assessment
                            </Button>
                        </a>
                        <Link href="/services">
                            <a>
                                <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg">
                                    What is Ayurveda?
                                </Button>
                            </a>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Introduction Section */}
            <motion.section
                className="py-16 bg-amber-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-4xl font-bold text-amber-900 mb-6">
                            Welcome to Punarvasu Clinic
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Personalized Ayurvedic care rooted in ancient wisdom for modern chronic ailments and holistic wellness. Our clinic combines traditional Ayurvedic knowledge with modern diagnostic techniques to provide comprehensive treatment plans tailored to your unique constitution.
                        </p>
                    </div>

                    {/* Specialities */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {SPECIALITIES.map((spec, idx) => (
                            <motion.div
                                key={idx}
                                className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                                whileHover={{ y: -5 }}
                            >
                                <div className="text-5xl mb-4">{spec.icon}</div>
                                <h3 className="text-xl font-bold text-amber-900 mb-3">{spec.title}</h3>
                                <p className="text-gray-600">{spec.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Services Showcase */}
            <motion.section
                className="py-16 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-amber-900 text-center mb-12">
                        Our Services & Therapies
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {DUMMY_SERVICES.map((service, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card className="overflow-hidden h-full hover:shadow-lg transition">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <p className="text-sm text-amber-600 font-semibold mb-2">
                                            {service.category}
                                        </p>
                                        <h3 className="text-xl font-bold text-amber-900 mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">{service.description}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/services">
                            <a>
                                <Button className="bg-amber-900 hover:bg-amber-800 text-white px-8 py-3">
                                    View All Services
                                </Button>
                            </a>
                        </Link>
                    </div>
                </div>
            </motion.section>

            {/* Meet Our Doctors */}
            <motion.section
                className="py-16 bg-amber-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-amber-900 text-center mb-12">
                        Meet Our Doctors
                    </h2>

                    {/* Carousel */}
                    <div className="flex items-center justify-center gap-8">
                        <button
                            onClick={prevDoctor}
                            className="p-2 rounded-full bg-amber-900 text-white hover:bg-amber-800 transition"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <motion.div
                            key={doctorIndex}
                            className="w-full max-w-md"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="overflow-hidden">
                                <img
                                    src={DUMMY_DOCTORS[doctorIndex].image}
                                    alt={DUMMY_DOCTORS[doctorIndex].name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-8 text-center">
                                    <h3 className="text-2xl font-bold text-amber-900 mb-2">
                                        {DUMMY_DOCTORS[doctorIndex].name}
                                    </h3>
                                    <p className="text-amber-600 font-semibold mb-4">
                                        {DUMMY_DOCTORS[doctorIndex].specialization}
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        {DUMMY_DOCTORS[doctorIndex].bio}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Experience: {DUMMY_DOCTORS[doctorIndex].experience} years
                                    </p>
                                    <a href={getLoginUrl()}>
                                        <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">
                                            Book Consultation
                                        </Button>
                                    </a>
                                </div>
                            </Card>
                        </motion.div>

                        <button
                            onClick={nextDoctor}
                            className="p-2 rounded-full bg-amber-900 text-white hover:bg-amber-800 transition"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {DUMMY_DOCTORS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setDoctorIndex(idx)}
                                className={`w-3 h-3 rounded-full transition ${idx === doctorIndex ? "bg-amber-900" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Testimonials */}
            <motion.section
                className="py-16 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-amber-900 text-center mb-12">
                        Healing Stories from Our Community
                    </h2>

                    <div className="flex items-center justify-center gap-8">
                        <button
                            onClick={prevTestimonial}
                            className="p-2 rounded-full bg-amber-900 text-white hover:bg-amber-800 transition hidden md:block"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <motion.div
                            key={testimonialIndex}
                            className="w-full max-w-2xl"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="p-8 text-center">
                                <div className="flex justify-center gap-1 mb-4">
                                    {[...Array(DUMMY_TESTIMONIALS[testimonialIndex].rating)].map((_, i) => (
                                        <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 text-lg mb-6 italic">
                                    "{DUMMY_TESTIMONIALS[testimonialIndex].text}"
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    <img
                                        src={DUMMY_TESTIMONIALS[testimonialIndex].image}
                                        alt={DUMMY_TESTIMONIALS[testimonialIndex].name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="text-left">
                                        <p className="font-bold text-amber-900">
                                            {DUMMY_TESTIMONIALS[testimonialIndex].name}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <button
                            onClick={nextTestimonial}
                            className="p-2 rounded-full bg-amber-900 text-white hover:bg-amber-800 transition hidden md:block"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {DUMMY_TESTIMONIALS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setTestimonialIndex(idx)}
                                className={`w-3 h-3 rounded-full transition ${idx === testimonialIndex ? "bg-amber-900" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                className="py-16 bg-amber-900 text-white text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Begin Your Healing Journey?
                    </h2>
                    <p className="text-xl mb-8 text-amber-100">
                        Book your consultation with our experienced Ayurvedic doctors today.
                    </p>
                    <a href={getLoginUrl()}>
                        <Button className="bg-white text-amber-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                            Book Now
                        </Button>
                    </a>
                </div>
            </motion.section>

            <Footer />
        </div>
    );
}
