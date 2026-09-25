import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2, ArrowRight } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface CaseStudy {
  id: string;
  title: string;
  treatment: string;
  patient: string;
  duration: string;
  details: string;
}

const CASES: CaseStudy[] = [
  {
    id: 'whitening',
    title: '8-Shade In-Office Whitening',
    treatment: 'Cold-Blue Laser Whitening',
    patient: 'Marcus T., 34',
    duration: 'Single 60-min session',
    details: 'Removed 6 years of coffee and tea staining with zero post-op sensitivity.',
  },
  {
    id: 'implants',
    title: 'Upper Anterior Zirconia Implants',
    treatment: 'Dual Computer-Guided Implants',
    patient: 'Katherine W., 52',
    duration: '2 visits across 3 months',
    details: 'Restored missing front incisors with bone grafting and biological ceramic crowns.',
  },
  {
    id: 'aligners',
    title: 'Moderate Crowding & Overbite Correction',
    treatment: 'Clear Invisible Aligners',
    patient: 'Julian R., 28',
    duration: '8 months total wear',
    details: 'Broadened dental arch and aligned lower incisors without extractions.',
  },
];

export const BeforeAfterSlider: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCase, setActiveCase] = useState<string>('whitening');
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const currentCase = CASES.find((c) => c.id === activeCase) || CASES[0];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Real Patient Transformations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            See the Life-Changing Results of Precision Smile Design
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Drag the interactive slider to view the before-and-after transformations achieved by our
            cosmetic and restorative specialists.
          </p>

          {/* Case selector tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
              {CASES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCase(c.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    activeCase === c.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Interactive Slider & Case Context Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Interactive Split Image Frame */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-3xl overflow-hidden shadow-xl select-none cursor-ew-resize border border-slate-200"
            >
              {/* After Image (Full background) */}
              <img
                src={IMAGES.cosmeticSmile}
                alt="After cosmetic dental treatment radiant smile"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 z-10 bg-teal-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                After SampleDental
              </div>

              {/* Before Image (Clipped overlay with simulated natural pre-treatment tone) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={IMAGES.cosmeticSmile}
                  alt="Before treatment"
                  className="absolute inset-0 w-full h-full object-cover max-w-none filter brightness-90 sepia-25 contrast-95"
                  style={{ width: containerRef.current?.clientWidth || '100%' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md text-slate-200 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                  Initial Presentation
                </div>
              </div>

              {/* Slider Split Line & Draggable Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-9 h-9 rounded-full bg-white text-teal-700 shadow-xl border border-slate-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
              </div>

              {/* Helper Drag Instruction Bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-3.5 py-1.5 rounded-full pointer-events-none flex items-center gap-1.5">
                <MoveHorizontal className="w-3.5 h-3.5 text-teal-400" />
                <span>Drag slider left or right to compare</span>
              </div>
            </div>
          </div>

          {/* Case Study Details Panel */}
          <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                Case Documentation
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {currentCase.title}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                <span className="text-slate-500">Treatment:</span>
                <span className="font-semibold text-slate-800">{currentCase.treatment}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                <span className="text-slate-500">Patient:</span>
                <span className="font-semibold text-slate-800">{currentCase.patient}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                <span className="text-slate-500">Timeline:</span>
                <span className="font-semibold text-slate-800">{currentCase.duration}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200/60">
              “{currentCase.details}”
            </p>

            <button
              onClick={onOpenBooking}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Schedule Smile Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
