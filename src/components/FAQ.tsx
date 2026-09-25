import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'Does dental implant placement hurt?',
    a: 'Not at all. Most patients report that implant placement is significantly easier than a routine extraction! We use computer-guided micro-incisions and advanced local anesthesia (plus twilight sedation if desired). Discomfort following the procedure is typically very mild and managed with over-the-counter pain relievers for 1–2 days.',
  },
  {
    q: 'How long does professional laser teeth whitening last?',
    a: 'In-office laser whitening results typically last 18 to 24 months, depending on lifestyle habits (such as coffee, tea, or red wine consumption). We include a custom molded take-home maintenance kit with professional touch-up gel to keep your smile permanently radiant.',
  },
  {
    q: 'Do you offer sedation for patients with severe dental anxiety or fear?',
    a: 'Yes, absolutely. Over 40% of our new patients come to us with dental anxiety. We offer gentle laughing gas (nitrous oxide), prescription oral conscious relaxation, and full IV twilight sleep monitored by certified anesthesiologists. You can comfortably snooze through your entire appointment.',
  },
  {
    q: 'How do clear aligners compare to traditional metal braces?',
    a: 'Clear aligners are virtually invisible, removable for eating and hygiene, and apply gentle, uniform pressure without painful wire adjustments. Most adult cases achieve ideal alignment in 6 to 12 months. With our 3D digital scanner, you can see a simulation of your finished smile before you even start.',
  },
  {
    q: 'What dental insurance plans do you accept?',
    a: 'We are in-network with most major PPO dental plans including Delta Dental, Cigna, Aetna, MetLife, Guardian, and Humana. Our billing team directly files claims on your behalf. For uninsured patients, we offer our SampleDental In-House Wellness Membership and 0% interest financing through CareCredit and Sunbit.',
  },
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Common Patient Inquiries</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Frequently Asked Questions
          </h2>

          <p className="text-base text-slate-600">
            Clear, transparent answers about procedures, safety protocols, sedation, and insurance.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-800 pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-teal-100 text-teal-700' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
