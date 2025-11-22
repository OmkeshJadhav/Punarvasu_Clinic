import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { DUMMY_DOCTORS } from "@/const";

export default function Appointments() {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const createAppointmentMutation = trpc.appointment.create.useMutation();
  const { data: doctors } = trpc.doctor.getAll.useQuery();

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  // Available time slots
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedDoctor || !selectedTime) {
      alert("Please select date, doctor, and time");
      return;
    }

    try {
      const appointmentDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":").map(Number);
      appointmentDateTime.setHours(hours, minutes);

      await createAppointmentMutation.mutateAsync({
        patientId: 1, // Would come from user context
        doctorId: selectedDoctor,
        appointmentDate: appointmentDateTime,
        notes: notes || undefined,
      });

      alert("Appointment booked successfully!");
      setSelectedDate(null);
      setSelectedDoctor(null);
      setSelectedTime(null);
      setNotes("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment");
    }
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
          <h1 className="text-4xl font-bold mb-2">Book an Appointment</h1>
          <p className="text-amber-100">
            Schedule your consultation with our experienced doctors
          </p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">
                Select Date
              </h2>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronLeft size={24} className="text-amber-900" />
                </button>
                <h3 className="text-xl font-bold text-amber-900">
                  {currentMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronRight size={24} className="text-amber-900" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-8">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center font-semibold text-gray-600 py-2"
                  >
                    {day}
                  </div>
                ))}

                {days.map((date, idx) => (
                  <button
                    key={idx}
                    onClick={() => date && handleSelectDate(date)}
                    disabled={!date || date < new Date()}
                    className={`p-3 rounded-lg font-semibold transition ${!date
                        ? "bg-gray-100 text-gray-400"
                        : date < new Date()
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : selectedDate?.toDateString() === date.toDateString()
                            ? "bg-amber-900 text-white"
                            : "bg-gray-100 text-gray-900 hover:bg-amber-100"
                      }`}
                  >
                    {date?.getDate()}
                  </button>
                ))}
              </div>

              {selectedDate && (
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Selected Date:</p>
                  <p className="font-bold text-amber-900">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">
                Booking Details
              </h2>

              <div className="space-y-6">
                {/* Doctor Selection */}
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-2">
                    Select Doctor
                  </label>
                  <select
                    value={selectedDoctor || ""}
                    onChange={(e) => setSelectedDoctor(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900"
                  >
                    <option value="">Choose a doctor</option>
                    {(doctors || DUMMY_DOCTORS).map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-2">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg font-semibold transition text-sm ${selectedTime === time
                            ? "bg-amber-900 text-white"
                            : "bg-gray-100 text-gray-900 hover:bg-amber-100"
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe your concerns or symptoms"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900"
                    rows={4}
                  />
                </div>

                {/* Summary */}
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Appointment Summary:</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Date:</strong>{" "}
                      {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "Not selected"}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedTime || "Not selected"}
                    </p>
                    <p>
                      <strong>Doctor:</strong>{" "}
                      {selectedDoctor
                        ? (doctors || DUMMY_DOCTORS).find(
                          (d) => d.id === selectedDoctor
                        )?.name || "Not selected"
                        : "Not selected"}
                    </p>
                  </div>
                </div>

                {/* Book Button */}
                <Button
                  onClick={handleBookAppointment}
                  disabled={
                    !selectedDate ||
                    !selectedDoctor ||
                    !selectedTime ||
                    createAppointmentMutation.isPending
                  }
                  className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3"
                >
                  <Calendar className="mr-2" size={20} />
                  {createAppointmentMutation.isPending
                    ? "Booking..."
                    : "Confirm Booking"}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 bg-gradient-to-r from-amber-50 to-amber-100">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              Appointment Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Calendar className="text-amber-900 mb-3" size={32} />
                <h3 className="font-bold text-amber-900 mb-2">Flexible Scheduling</h3>
                <p className="text-gray-700">
                  Book appointments at your convenience. Cancellations must be made
                  24 hours in advance.
                </p>
              </div>
              <div>
                <Clock className="text-amber-900 mb-3" size={32} />
                <h3 className="font-bold text-amber-900 mb-2">Consultation Duration</h3>
                <p className="text-gray-700">
                  Each consultation is typically 45-60 minutes, allowing our doctors
                  to provide thorough assessment.
                </p>
              </div>
              <div>
                <User className="text-amber-900 mb-3" size={32} />
                <h3 className="font-bold text-amber-900 mb-2">Confirmation</h3>
                <p className="text-gray-700">
                  You will receive a confirmation email and SMS with appointment
                  details and directions.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
