import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: '3D Anatomy', href: '#scan-model' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Smile Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact & Map', href: '#contact' },
  ];

  return (
    <>
      {/* Emergency & Working Hours Notice Header Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Accepting New Patients & Emergency Cases
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Mon–Fri 8:00 AM – 6:30 PM · Sat 9:00 AM – 2:00 PM
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:5553827400"
              className="flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>(555) 382-7400</span>
            </a>
            <span className="hidden md:inline-block text-slate-500">·</span>
            <span className="hidden md:inline-block text-slate-400">450 Medical Heights Blvd, Suite 300</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar with Scroll-Shrink Transition */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-200/80'
            : 'py-5 bg-white/60 backdrop-blur-xs border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single element brand wordmark */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M12 2C7.5 2 4 4.5 4 8c0 3.5 1.5 5 2.5 9 1 3.5 2 5 3.5 5 1.5 0 2-2 2-3s.5-3 2-3 0.5 2 2 3 2 3 3.5 3c1.5 0 2.5-1.5 3.5-5 1-4 2.5-5.5 2.5-9 0-3.5-3.5-6-8-6z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                SampleDental
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Text with clean hover underlines) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-teal-700 transition-colors relative py-1 hover:underline underline-offset-8 decoration-teal-500 decoration-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action Controls */}
          <div className="flex items-center gap-3">
            <a
              href="tel:5553827400"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-800 bg-slate-100 hover:bg-teal-50 rounded-xl transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>(555) 382-7400</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:scale-98 rounded-xl shadow-sm shadow-teal-600/25 transition-all whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-slate-700 hover:text-teal-700 hover:bg-teal-50/60 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="tel:5553827400"
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                Call (555) 382-7400
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-xl shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment Online
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
