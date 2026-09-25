import React from 'react';
import { 
  Award, 
  Users, 
  CalendarCheck, 
  ShieldCheck, 
  Smile, 
  Sparkles, 
  HeartHandshake, 
  Clock, 
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { IMAGES } from '../assets/images';

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenBooking }) => {
  const trustMetrics = [
    {
      value: '18+',
      unit: 'Years',
      label: 'Clinical Experience',
      desc: 'Serving our community since 2008 with advanced surgical standards.',
      icon: Award,
    },
    {
      value: '24,500+',
      unit: 'Smiles',
      label: 'Patients Treated',
      desc: 'Trusted by families, executives, and complex restorative cases.',
      icon: Users,
    },
    {
      value: '99.4%',
      unit: 'Rating',
      label: 'Patient Satisfaction',
      desc: 'Consistent 5-star clinical excellence and verified patient reviews.',
      icon: Smile,
    },
    {
      value: '0%',
      unit: 'Pain',
      label: 'Anxiety Sedation Protocol',
      desc: 'Gentle nitrous, oral sedation, and IV twilight sleep options.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 w-[600px] h-[600px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-teal-800 bg-teal-100/60 px-3.5 py-1.5 rounded-full border border-teal-200">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Why Patients Trust SampleDental</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Where Advanced Clinical Science Meets Genuine Human Warmth
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We understand dental visits can cause apprehension. That’s why we designed our entire
            practice around gentle protocols, biological materials, and empathetic care.
          </p>
        </div>

        {/* 4 Trust Metric Cards (Quantified Rigor & Tabular Numerals) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 border border-teal-200/60">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex items-baseline gap-1.5 font-bold tracking-tight text-slate-900 font-mono tabular-nums">
                  <span className="text-3xl sm:text-4xl">{metric.value}</span>
                </div>

                <h3 className="text-base font-bold text-slate-800 mt-1">
                  {metric.label}
                </h3>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bento Grid: Clinical Excellence & Warmth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Bento Card 1: Clinic Interior Photo Showcase (col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
              <img
                src={IMAGES.clinicInterior}
                alt="Modern luxury dental operatory with natural sunlight and ergonomic equipment"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                  Hospital-Grade Standards
                </span>
                <p className="text-lg font-bold">
                  Surgical Sterilization & Ultra-Quiet Ergonomic Suites
                </p>
              </div>
            </div>

            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-sm text-slate-600 leading-relaxed">
                Our operatory suites feature HEPA-14 medical air filtration, noiseless electric handpieces,
                and ceiling entertainment screens with noise-canceling headphones so you can relax
                to your favorite music or movie during treatments.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>3D Low-Dose CBCT Imaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Nitrous & Oral Conscious Sedation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Biocompatible Zirconia Restorations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Same-Day Emergency Relief</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Doctor Profile Spotlight (col-span-5) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-teal-900 to-slate-900 rounded-3xl p-7 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <img
                  src={IMAGES.leadDentist}
                  alt="Dr. Elena Vance, Lead Prosthodontist & Implantologist"
                  className="w-18 h-18 rounded-2xl object-cover ring-2 ring-teal-400/50 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xl font-bold">Dr. Elena Vance, DDS, FACP</h3>
                  <p className="text-xs font-medium text-teal-300">
                    Lead Prosthodontist & Implant Specialist
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Harvard School of Dental Medicine · 18 Years Experience
                  </p>
                </div>
              </div>

              <blockquote className="text-sm text-slate-200 italic leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                “Dentistry should never be intimidating. Our philosophy is rooted in listening first,
                explaining every detail clearly in 3D, and providing care so gentle you’ll wonder why you ever felt anxious.”
              </blockquote>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Diplomate, American Board of Oral Implantology</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Fellow, International Congress of Oral Implantologists</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
              <div className="text-xs text-teal-200">
                <span className="font-semibold">Next Available:</span> Today at 2:30 PM
              </div>

              <button
                onClick={onOpenBooking}
                className="px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-teal-50 rounded-xl transition-colors cursor-pointer"
              >
                Book with Dr. Vance
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
