import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake, 
  Phone, 
  Mail, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { BookingData } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

const AVAILABLE_TIMES = [
  '08:30 AM',
  '09:45 AM',
  '11:15 AM',
  '01:30 PM',
  '02:45 PM',
  '04:00 PM',
  '05:15 PM',
];

const SERVICES_LIST = [
  { id: 'checkups', name: 'Comprehensive Checkup & Cleaning', duration: '45 min' },
  { id: 'implants', name: 'Dental Implant Consultation & 3D Scan', duration: '60 min' },
  { id: 'whitening', name: 'Laser Teeth Whitening (In-Office)', duration: '60 min' },
  { id: 'braces', name: 'Clear Aligners & Ortho Assessment', duration: '45 min' },
  { id: 'veneers', name: 'Cosmetic Veneers Smile Design', duration: '60 min' },
  { id: 'root-canal', name: 'Urgent Pain Relief / Root Canal', duration: '60 min' },
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<BookingData>({
    serviceId: preselectedServiceId || 'checkups',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: '09:45 AM',
    doctor: 'Dr. Elena Vance, DDS',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    dentalAnxiety: false,
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'AD-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  const selectedService = SERVICES_LIST.find((s) => s.id === formData.serviceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Schedule Your Visit · SampleDental
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                  Appointment Confirmed
                </span>
                <h4 className="text-2xl font-bold text-slate-900 mt-1">
                  We Look Forward to Seeing You!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Confirmation reference:{' '}
                  <span className="font-mono font-bold text-slate-800">{bookingRef}</span>
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 text-left text-xs sm:text-sm text-slate-700 space-y-2.5 border border-slate-200/80 max-w-md mx-auto">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-900">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-semibold text-slate-900">
                    {formData.date} at {formData.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-900">{formData.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900">Suite 300, 450 Medical Heights</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                A calendar invite and SMS confirmation have been sent to{' '}
                <span className="font-medium text-slate-700">{formData.patientEmail}</span>. Free
                parking validation will be provided at the reception desk.
              </p>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span className="font-medium text-teal-800">
                  Step {step} of 3: {step === 1 ? 'Select Treatment' : step === 2 ? 'Date & Time' : 'Patient Details'}
                </span>
                <span className="text-slate-400">Takes less than 1 minute</span>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    What service can we provide for you?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES_LIST.map((srv) => (
                      <button
                        type="button"
                        key={srv.id}
                        onClick={() => setFormData({ ...formData, serviceId: srv.id })}
                        className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                          formData.serviceId === srv.id
                            ? 'bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-900">{srv.name}</p>
                        <span className="text-[11px] text-teal-700 font-medium">{srv.duration}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Continue to Schedule →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Choose Your Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {AVAILABLE_TIMES.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setFormData({ ...formData, timeSlot: time })}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                            formData.timeSlot === time
                              ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Patient Details →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jane Doe"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane@example.com"
                          value={formData.patientEmail}
                          onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="(555) 000-0000"
                          value={formData.patientPhone}
                          onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    {/* Dental Anxiety Toggle Reassurance */}
                    <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="anxiety"
                        checked={formData.dentalAnxiety}
                        onChange={(e) => setFormData({ ...formData, dentalAnxiety: e.target.checked })}
                        className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
                      />
                      <label htmlFor="anxiety" className="text-xs text-slate-700 cursor-pointer">
                        <span className="font-semibold text-teal-900 block">
                          I experience dental anxiety or fear
                        </span>
                        We will prepare nitrous oxide or calming sedation protocols and allow extra time
                        for your complete peace of mind.
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Insurance Provider or Notes (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Delta Dental PPO, or special requests"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Confirm Appointment
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
