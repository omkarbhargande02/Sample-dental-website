import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUpRight, 
  Navigation, 
  CheckCircle, 
  ShieldAlert,
  Car,
  Calendar,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 relative pt-20 pb-12 overflow-hidden">
      {/* Top Pre-Footer Call to Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl bg-gradient-to-r from-teal-800 to-teal-950 p-8 sm:p-12 text-white shadow-2xl border border-teal-700/50 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Background subtle radial */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-xl text-center md:text-left z-10">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-600/40">
              <Sparkles className="w-3.5 h-3.5" />
              Begin Your Smile Journey Today
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready for Gentle, State-of-the-Art Dental Care?
            </h3>
            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
              Book your comprehensive exam and 3D digital scan online in under 60 seconds. New
              patient specials and flexible financing available.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full md:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-slate-900 bg-white hover:bg-teal-50 active:scale-98 rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-teal-700" />
              <span>Book Appointment Now</span>
            </button>
            <a
              href="tel:5553827400"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700/60 hover:bg-teal-700 border border-teal-500/40 rounded-xl transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>(555) 382-7400</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          {/* Brand & Clinic Mission (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center">
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
              <span className="text-xl font-bold tracking-tight text-white">SampleDental</span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Dedicated to compassionate, pain-free dentistry with computerized 3D planning, biological
              materials, and hospital-level sterilization standards.
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">SampleDental Health Pavilion</p>
                  <p className="text-slate-400">450 Medical Heights Blvd, Suite 300</p>
                  <p className="text-slate-400">Boston, MA 02115</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <div className="flex items-center gap-2">
                  <a href="tel:5553827400" className="text-slate-200 hover:text-white transition-colors">
                    (555) 382-7400
                  </a>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-emerald-400 font-medium">Main Office</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="flex items-center gap-2">
                  <a href="tel:5553827499" className="text-slate-200 hover:text-white transition-colors">
                    (555) 382-7499
                  </a>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-amber-300 font-medium">24/7 Dental Emergency</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:care@sampledental.com" className="text-slate-200 hover:text-white transition-colors">
                  care@sampledental.com
                </a>
              </div>
            </div>
          </div>

          {/* Clinic Hours & Quick Links (col-span-3) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Clinical Hours
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex justify-between pb-1.5 border-b border-slate-800">
                <span className="text-slate-400">Monday – Thursday</span>
                <span className="font-semibold text-white">8:00 AM – 6:30 PM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-slate-800">
                <span className="text-slate-400">Friday</span>
                <span className="font-semibold text-white">8:00 AM – 5:00 PM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-slate-800">
                <span className="text-slate-400">Saturday</span>
                <span className="font-semibold text-white">9:00 AM – 2:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Sunday</span>
                <span className="text-amber-400 font-medium">Emergency Call-In</span>
              </li>
            </ul>

            <div className="pt-2 space-y-2">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider">
                Patient Amenities
              </h5>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-teal-400" />
                  <span>Free validated covered parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                  <span>ADA wheelchair accessible entry</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Location Map (col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Location & Accessibility
              </h4>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Stylized Modern Interactive Map Card */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 h-56 group">
              {/* Stylized SVG Map Graphics representation */}
              <div className="absolute inset-0 bg-[#1e293b] opacity-90">
                <svg className="w-full h-full opacity-30" viewBox="0 0 500 250" preserveAspectRatio="none">
                  {/* Grid roads */}
                  <path d="M 0,50 L 500,50 M 0,110 L 500,110 M 0,180 L 500,180" stroke="#475569" strokeWidth="4" />
                  <path d="M 70,0 L 70,250 M 180,0 L 180,250 M 320,0 L 320,250 M 430,0 L 430,250" stroke="#475569" strokeWidth="4" />
                  {/* Secondary diagonal street */}
                  <path d="M 0,220 L 500,80" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6,4" />
                  <path d="M 120,0 L 380,250" stroke="#64748b" strokeWidth="2" />
                  {/* Park zone */}
                  <rect x="200" y="20" width="100" height="70" fill="#0f766e" opacity="0.3" rx="8" />
                  <text x="220" y="60" fill="#2dd4bf" fontSize="11" fontFamily="sans-serif">Medical Park</text>
                </svg>
              </div>

              {/* Pinpoint Location Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative">
                  <span className="absolute -inset-2 bg-teal-400/40 rounded-full animate-ping" />
                  <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-2 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10 shadow-md">
                  SampleDental Pavilion
                </div>
              </div>

              {/* Bottom Quick Directions Action Overlay */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/60 text-xs">
                <span className="text-slate-300">Corner of Medical Heights & Commonwealth Ave</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-teal-400 hover:text-teal-300"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Directions
                </a>
              </div>
            </div>

            {/* Newsletter Subscription input */}
            <div className="pt-2">
              <p className="text-xs text-slate-400 mb-2">Subscribe for quarterly dental wellness tips & whitening offers:</p>
              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Thank you for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs rounded-xl focus:outline-none focus:border-teal-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Quiet Footer Copyright & Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SampleDental Practice Group LLC. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#services" className="hover:text-slate-300 transition-colors">HIPAA Compliance</a>
            <span aria-hidden="true">·</span>
            <a href="#services" className="hover:text-slate-300 transition-colors">Accessibility Statement</a>
            <span aria-hidden="true">·</span>
            <a href="#services" className="hover:text-slate-300 transition-colors">Notice of Non-Discrimination</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
