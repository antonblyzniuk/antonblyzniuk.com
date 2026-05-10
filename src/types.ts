export interface Skill {
  name: string;
  category: string | null;
  level: string | null;
  order: number;
}

export interface Link {
  name: string;
  url: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface ExperienceUnit {
  id: number;
  title: string;
  organization: string | null;
  location: string | null;
  description: string | null;
  from_date: string;
  to_date: string | null;
  order: number;
}

export interface EducationUnit {
  id: number;
  institution: string;
  degree: string | null;
  field_of_study: string | null;
  location: string | null;
  description: string | null;
  from_date: string;
  to_date: string | null;
  image: string | null;
  order: number;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string | null;
  description: string | null;
  date: string | null;
  links: Link[];
  image: string | null;
  order: number;
}

export interface Certification {
  id: number;
  name: string;
  issuing_organization: string;
  issue_date: string | null;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  order: number;
}

export interface Award {
  id: number;
  title: string;
  issuer: string | null;
  date: string | null;
  description: string | null;
  order: number;
}

export interface Photo {
  id: number;
  image: string;
  is_main: boolean;
}

export interface CVData {
  unit_name: string;
  first_name: string;
  last_name: string;
  headline: string;
  email: string;
  phone: string | null;
  location: string | null;
  about: string | null;
  pdf_resume: string | null;
  photos: Photo[];
  skills: Skill[];
  links: Link[];
  languages: Language[];
  experience_units: ExperienceUnit[];
  education_units: EducationUnit[];
  portfolio_items: PortfolioItem[];
  certifications: Certification[];
  awards: Award[];
}
