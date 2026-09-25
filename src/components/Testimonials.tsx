import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TestimonialItem } from '../types';

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    age: 42,
    treatment: 'Full Upper Dental Implants',
    rating: 5,
    quote: 'I had severe dental anxiety for 15 years. Dr. Vance and her gentle sedation team completely turned my fear into confidence. I can eat apples and steak again without a second thought.',
    story: 'Replaced a failing bridge with 3D-guided ceramic implants in two seamless visits.',
    timeAgo: '2 weeks ago',
    verified: true,
    avatarBg: 'bg-teal-100 text-teal-800',
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    age: 31,
    treatment: 'Clear Aligners & Laser Whitening',
    rating: 5,
    quote: 'The 3D tooth scan on day one showed me exactly how my teeth would shift month by month. 8 months later, my wedding photos turned out breathtaking thanks to SampleDental.',
    story: 'Aligned crowded lower incisors and lifted shade from A3 to B1.',
    timeAgo: '1 month ago',
    verified: true,
    avatarBg: 'bg-sky-100 text-sky-800',
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    age: 58,
    treatment: 'Porcelain Smile Rehabilitation',
    rating: 5,
    quote: 'The clinic feels like a peaceful luxury spa rather than a clinical dental office. There is zero drilling noise, no harsh chemical smell, and the staff treats you like beloved family.',
    story: 'Restored fractured anterior enamel with handcrafted feldspathic veneers.',
    timeAgo: '3 weeks ago',
    verified: true,
    avatarBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 't4',
    name: 'David O’Connor',
    age: 39,
    treatment: 'Same-Day Emergency Root Canal',
    rating: 5,
    quote: 'Woke up at 2 AM with unbearable tooth pain. SampleDental fit me into their emergency schedule by 8:30 AM. Dr. Vance numbed it completely with their computer anesthetic pen — literally felt nothing!',
    story: 'Painless micro-endodontic treatment with immediate symptom resolution.',
    timeAgo: 'Just yesterday',
    verified: true,
    avatarBg: 'bg-teal-100 text-teal-800',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-teal-800 bg-teal-100/60 px-3.5 py-1.5 rounded-full border border-teal-200">
            <Quote className="w-3.5 h-3.5 text-teal-600" />
            <span>Verified Patient Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Real Stories of Comfort, Confidence, and Radiant Smiles
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Read candid experiences from our patients who discovered that advanced dentistry can truly be
            gentle, calm, and pain-free.
          </p>
        </div>

        {/* Testimonials Grid (Rounded Cards with subtle shadows and zero-pill discipline) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-xs text-slate-400">{t.timeAgo}</span>
                </div>

                {/* Patient Quote */}
                <p className="text-base text-slate-700 leading-relaxed italic">
                  “{t.quote}”
                </p>

                {/* Treatment context summary */}
                <div className="pt-2 text-xs text-teal-800 font-medium">
                  Outcome: <span className="text-slate-600">{t.story}</span>
                </div>
              </div>

              {/* Author Footer: Unboxed metadata with typographic separators */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl ${t.avatarBg} font-bold text-sm flex items-center justify-center`}
                  >
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                      {t.verified && (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      )}
                    </div>
                    {/* Zero-Pill text metadata with separators */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <span>Age {t.age}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-teal-700 font-medium">{t.treatment}</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block text-[11px] text-slate-400 font-mono">
                  Verified Patient
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregated Rating Bar */}
        <div className="mt-14 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="text-3xl font-bold text-slate-900 font-mono tabular-nums">4.9 / 5.0</div>
            <div className="border-l border-slate-200 pl-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculated across 1,240+ Google & Healthgrades reviews
              </p>
            </div>
          </div>

          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-teal-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
          >
            Read All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};
