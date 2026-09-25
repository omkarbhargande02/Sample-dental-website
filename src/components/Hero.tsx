import React from 'react';
import { Calendar, Phone, Star, ShieldCheck, CheckCircle2, Sparkles, ArrowRight, HeartPulse } from 'lucide-react';
import { ThreeToothViewer } from './ThreeToothViewer';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      {/* Background soft ambient gradient blobs */}
      <div className="absolute top-0 right-1/4 -z-10 w-[550px] h-[550px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 left-1/10 -z-10 w-[450px] h-[450px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Value Proposition & CTA */}
          <div className="lg:col-span-6 space-y-6">
            {/* Subtle editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Modern Gentle & Precision Dentistry</span>
            </div>

            {/* Primary Headline with balance wrapping */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Exceptional Smiles, Crafted with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
                Gentle Precision.
              </span>
            </h1>

            {/* Value Proposition Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Experience modern dental care tailored for your comfort. From painless ceramic implants
              and invisible aligners to gentle preventative wellness, our team combines 3D digital
              diagnostics with compassionate, anxiety-free care.
            </p>

            {/* Clean unboxed trust badges with typographic separators */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm font-medium text-slate-600 pt-1">
              <span className="flex items-center gap-1.5 text-teal-900">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                Zero-Pain Sedation Options
              </span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-teal-900">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                Same-Day Emergency Relief
              </span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-teal-900">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                Major Insurances Accepted
              </span>
            </div>

            {/* CTA Decision Island */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-teal-600 hover:bg-teal-700 active:scale-98 rounded-2xl shadow-lg shadow-teal-600/25 transition-all whitespace-nowrap cursor-pointer group"
              >
                <Calendar className="w-5 h-5 text-teal-100 group-hover:scale-110 transition-transform" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-slate-700 hover:text-teal-800 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl shadow-xs transition-colors whitespace-nowrap"
              >
                <span>Explore Treatments</span>
              </a>
            </div>

            {/* Patient Ratings Social Proof strip */}
            <div className="pt-4 border-t border-slate-200/70 flex items-center gap-5">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  referrerPolicy="no-referrer"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Patient Maya S."
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <img
                  referrerPolicy="no-referrer"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Patient David K."
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <img
                  referrerPolicy="no-referrer"
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Patient Sarah L."
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-white bg-teal-100 text-teal-800 text-xs font-bold">
                  +1.2k
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-sm font-bold text-slate-900">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-slate-500">
                  Over <span className="font-semibold text-slate-700">1,240+ verified</span> patient reviews on Google
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Three.js Tooth / Jaw Model */}
          <div id="scan-model" className="lg:col-span-6 relative">
            <div className="relative">
              {/* Outer soft halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-3xl blur-xl opacity-75" />

              {/* Three.js Viewer Canvas */}
              <ThreeToothViewer />
            </div>

            {/* Feature caption notes beneath 3D viewport */}
            <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
                Live 3D Biomechanical Simulation
              </span>
              <span>Rotate, inspect anatomical layers or implant anatomy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
