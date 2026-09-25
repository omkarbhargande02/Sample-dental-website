import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceId(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-teal-500 selection:text-white">
      {/* Sticky Shrinking Navigation Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Single-Page Content Flow */}
      <main className="flex-1">
        {/* 1. Hero Section with Headline, CTA & 3D Interactive Tooth / Jaw Model */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Services Section (Implants, Whitening, Braces, Checkups — Icon Cards) */}
        <Services onSelectService={(serviceId) => handleOpenBooking(serviceId)} />

        {/* 3. Why Choose Us Section (Trust Badges: Years of Experience, Patients Treated) */}
        <WhyChooseUs onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Interactive Before / After Smile Transformation Slider */}
        <BeforeAfterSlider onOpenBooking={() => handleOpenBooking('whitening')} />

        {/* 5. Verified Patient Testimonials Section */}
        <Testimonials />

        {/* 6. Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* 7. Footer with Full Contact Info + Interactive Location Map */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Online Appointment Booking Drawer/Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedServiceId={selectedServiceId}
      />
    </div>
  );
}
