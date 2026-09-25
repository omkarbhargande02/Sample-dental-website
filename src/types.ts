export interface ServiceItem {
  id: string;
  title: string;
  category: 'cosmetic' | 'restorative' | 'preventive' | 'orthodontics';
  icon: string;
  tagline: string;
  description: string;
  benefits: string[];
  duration: string;
  recovery: string;
  priceEstimate: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  age: number;
  treatment: string;
  rating: number;
  quote: string;
  story: string;
  timeAgo: string;
  verified: boolean;
  avatarBg: string;
}

export interface DoctorProfile {
  name: string;
  role: string;
  credentials: string;
  specialty: string;
  yearsExperience: number;
  image: string;
  bio: string;
}

export interface BookingData {
  serviceId: string;
  date: string;
  timeSlot: string;
  doctor: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  dentalAnxiety: boolean;
  notes: string;
}
