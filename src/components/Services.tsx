import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Clock, 
  Award,
  Smile,
  CircleDot,
  Activity,
  Layers,
  Search
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'implants',
    title: 'Dental Implants',
    category: 'restorative',
    icon: 'implant',
    tagline: 'Permanent, natural-looking tooth replacements with 98.7% success',
    description: 'Precision 3D computer-guided implant placement using medical-grade titanium fixtures and custom handcrafted zirconia crowns that match your natural bite seamlessly.',
    benefits: [
      'Lifetime titanium fixture warranty',
      'Computer-guided flapless micro-surgery',
      'Preserves jawbone density and facial structure',
      'Feels, bites, and flosses like natural teeth'
    ],
    duration: '45–60 min per arch',
    recovery: '1–2 days mild recovery',
    priceEstimate: 'Consultation & 3D Scan included',
  },
  {
    id: 'whitening',
    title: 'Laser Teeth Whitening',
    category: 'cosmetic',
    icon: 'whitening',
    tagline: 'Brighten up to 8 shades in a single comfortable 60-minute visit',
    description: 'Advanced in-office cold-blue LED laser whitening with gentle desensitizing enamel serum that erases years of coffee, tea, and aging stains without lingering sensitivity.',
    benefits: [
      'Up to 8 shades lighter in 1 appointment',
      'Proprietary zero-sensitivity enamel shield',
      'Custom take-home touch-up kit included',
      'Safe for enamel and existing restorations'
    ],
    duration: '60 minutes',
    recovery: 'Immediate results',
    priceEstimate: 'From $299 with home kit',
  },
  {
    id: 'braces',
    title: 'Clear Braces & Aligners',
    category: 'orthodontics',
    icon: 'braces',
    tagline: 'Discreet, removable clear aligners tailored to your lifestyle',
    description: 'Custom 3D scanned orthodontic aligners that gently guide teeth into optimal alignment without metal brackets, food restrictions, or painful monthly wire tightening.',
    benefits: [
      'Virtually invisible crystal-clear polymer',
      'Removable for eating, brushing, and flossing',
      '3D outcome preview before treatment begins',
      'Average treatment time: 6–12 months'
    ],
    duration: 'Bi-weekly aligner swap',
    recovery: 'No downtime',
    priceEstimate: 'Flexible 0% APR plans',
  },
  {
    id: 'checkups',
    title: 'Preventive Care & Checkups',
    category: 'preventive',
    icon: 'checkup',
    tagline: 'Comprehensive wellness exams, ultrasonic cleanings, and digital scans',
    description: 'Gentle ultrasonic scaling that removes calculus without scraping enamel, paired with ultra-low radiation HD panoramic X-rays and early cavity laser detection.',
    benefits: [
      'Ultrasonic pain-free calculus removal',
      'Digital oral cancer screening included',
      'Fluoride remineralization & polish',
      'Personalized preventive oral health roadmap'
    ],
    duration: '45 minutes',
    recovery: 'Walk out refreshed',
    priceEstimate: '100% covered by most insurance',
  },
  {
    id: 'veneers',
    title: 'Porcelain Veneers',
    category: 'cosmetic',
    icon: 'veneers',
    tagline: 'Ultra-thin handcrafted ceramic facings for instant smile transformation',
    description: 'Custom ceramic shells designed to correct discoloration, chipped edges, minor gaps, and uneven lengths for a symmetrical, photogenic smile.',
    benefits: [
      'Ultra-thin 0.3mm minimally invasive prep',
      'Stain-resistant high-luster porcelain',
      'Custom digital smile simulation',
      'Durability lasting 15–20+ years'
    ],
    duration: '2 visits',
    recovery: 'Minimal to none',
    priceEstimate: 'Custom treatment plan',
  },
  {
    id: 'root-canal',
    title: 'Gentle Root Canal Therapy',
    category: 'restorative',
    icon: 'therapy',
    tagline: 'Immediate pain relief and tooth preservation with modern micro-rotary files',
    description: 'Endodontic therapy using high-magnification surgical microscopes and rotary nickel-titanium instruments to eliminate infection while saving your natural tooth root.',
    benefits: [
      'Immediate relief from acute dental pain',
      'High-magnification 3D apex locator',
      'Saves your natural tooth and bone',
      '99% done in a single painless session'
    ],
    duration: '60–75 minutes',
    recovery: 'Back to work next day',
    priceEstimate: 'Covered by major PPO insurance',
  },
];

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredServices = activeTab === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeTab);

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'implant':
        return (
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/80 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M12 2v20" />
              <path d="M7 5h10" />
              <path d="M8 9h8" />
              <path d="M8 13h8" />
              <path d="M9 17h6" />
              <path d="M10 21h4" />
            </svg>
          </div>
        );
      case 'whitening':
        return (
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-200/80 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
            <Sparkles className="w-6 h-6" />
          </div>
        );
      case 'braces':
        return (
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200/80 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
            <Smile className="w-6 h-6" />
          </div>
        );
      case 'checkup':
        return (
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
        );
      case 'veneers':
        return (
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/80 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
            <Layers className="w-6 h-6" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/80 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
            <Activity className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80">
            <span>Specialized Clinical Offerings</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Comprehensive Dental Services for Every Stage of Life
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From routine preventive checkups to complex full-arch implant restorations, our specialized
            dentists employ minimally invasive protocols for optimal clinical outcomes.
          </p>

          {/* Interactive Filter Control Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Services
              </button>
              <button
                onClick={() => setActiveTab('restorative')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'restorative'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Implants & Restorative
              </button>
              <button
                onClick={() => setActiveTab('cosmetic')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'cosmetic'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Whitening & Cosmetic
              </button>
              <button
                onClick={() => setActiveTab('orthodontics')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'orthodontics'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Clear Braces & Aligners
              </button>
              <button
                onClick={() => setActiveTab('preventive')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'preventive'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Preventive Care
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid with Rounded Cards & Subtle Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-slate-50/70 hover:bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Header with Icon & Category */}
                <div className="flex items-start justify-between">
                  {getServiceIcon(service.icon)}
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60">
                    {service.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-teal-700 mt-1">
                    {service.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Clinical Benefits Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <p className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                    Treatment Highlights
                  </p>
                  <ul className="space-y-2">
                    {service.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Meta & Action */}
              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.duration}</span>
                  </div>
                  <p className="text-xs font-semibold text-teal-800">
                    {service.priceEstimate}
                  </p>
                </div>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white rounded-xl transition-all cursor-pointer group-hover:translate-x-0.5"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Insurance & Transparency Footnote */}
        <div className="mt-14 p-6 bg-teal-50/70 rounded-3xl border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Transparent Pricing & Direct Insurance Billing
              </p>
              <p className="text-xs text-slate-600">
                We accept Delta Dental, Cigna, MetLife, Aetna, Guardian, and offer zero-interest financing.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectService('checkups')}
            className="px-5 py-2.5 text-xs font-semibold text-teal-800 bg-white hover:bg-teal-100/50 rounded-xl border border-teal-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            Verify My Insurance
          </button>
        </div>
      </div>
    </section>
  );
};
