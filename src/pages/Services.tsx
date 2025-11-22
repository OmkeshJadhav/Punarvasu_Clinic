import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DUMMY_SERVICES } from "@/const";
import { getLoginUrl } from "@/const";

export default function Services() {
    const externalTherapies = DUMMY_SERVICES.filter((s) => s.category === "External Therapies");
    const internalMedicine = DUMMY_SERVICES.filter((s) => s.category === "Internal Medicine");
    const detoxification = DUMMY_SERVICES.filter((s) => s.category === "Detoxification");
    const lifestyle = DUMMY_SERVICES.filter((s) => s.category === "Lifestyle");

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
                    <h1 className="text-5xl font-bold mb-6">Our Services & Therapies</h1>
                    <p className="text-xl text-amber-100 max-w-2xl mx-auto">
                        Comprehensive Ayurvedic treatments designed to restore balance and promote holistic wellness
                    </p>
                </div>
            </motion.section>

            {/* External Therapies */}
            <motion.section
                className="py-16 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-amber-900 mb-12">
                        Rejuvenation & Stress Relief (External Therapies)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {externalTherapies.map((service, idx) => (
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
                                        <h3 className="text-xl font-bold text-amber-900 mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                        <a href={getLoginUrl()}>
                                            <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">
                                                Learn More
                                            </Button>
                                        </a>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Panchakarma & Detoxification */}
            <motion.section
                className="py-16 bg-amber-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-amber-900 mb-12">
                        Panchakarma & Detoxification
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {detoxification.map((service, idx) => (
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
                                        <h3 className="text-xl font-bold text-amber-900 mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                        <a href={getLoginUrl()}>
                                            <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">
                                                Learn More
                                            </Button>
                                        </a>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Inner Healing */}
            <motion.section
                className="py-16 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-amber-900 mb-12">
                        Inner Healing: Herbology & Dietetics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {internalMedicine.map((service, idx) => (
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
                                        <h3 className="text-xl font-bold text-amber-900 mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                        <a href={getLoginUrl()}>
                                            <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">
                                                Learn More
                                            </Button>
                                        </a>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Lifestyle */}
            <motion.section
                className="py-16 bg-amber-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-amber-900 mb-12">
                        Lifestyle & Wellness
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lifestyle.map((service, idx) => (
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
                                        <h3 className="text-xl font-bold text-amber-900 mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                        <a href={getLoginUrl()}>
                                            <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white">
                                                Learn More
                                            </Button>
                                        </a>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA */}
            <motion.section
                className="py-16 bg-amber-900 text-white text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">
                        Unsure Which Therapy is Right For You?
                    </h2>
                    <p className="text-xl mb-8 text-amber-100 max-w-2xl mx-auto">
                        Our experienced doctors can help determine the best treatment plan for your unique needs.
                    </p>
                    <a href={getLoginUrl()}>
                        <Button className="bg-white text-amber-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                            Schedule Consultation
                        </Button>
                    </a>
                </div>
            </motion.section>

            <Footer />
        </div>
    );
}
