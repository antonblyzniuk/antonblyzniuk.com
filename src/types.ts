export interface Skill {
  name: string;
  level: string | null;
  category: string | null;
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
  name: string;
  organization: string | null;
  location: string | null;
  description: string;
  from_date: string;
  to_date: string;
}

export interface EducationUnit {
  name: string;
  degree: string | null;
  field_of_study: string | null;
  location: string | null;
  description: string;
  from_date: string;
  to_date: string;
  image: string | null;
}

export interface Project {
  name: string;
  description: string;
  links: Link[];
  image: string | null;
}

export interface Photo {
  id: number;
  image: string;
  is_main: boolean;
}

export interface Certification {
  name: string;
  issuing_organization: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
}

export interface Award {
  title: string;
  issuer: string | null;
  date: string | null;
  description: string;
}

export interface CustomSectionItem {
  title: string;
  subtitle: string | null;
  from_date: string | null;
  to_date: string | null;
  description: string;
  url: string | null;
}

export interface CustomSection {
  title: string;
  items: CustomSectionItem[];
}

export interface CVData {
  first_name: string;
  last_name: string;
  profession: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  about: string;
  pdf_resume: string | null;
  skills: Skill[];
  links: Link[];
  languages: Language[];
  experience_units: ExperienceUnit[];
  education_units: EducationUnit[];
  projects: Project[];
  photos: Photo[];
  certifications: Certification[];
  awards: Award[];
  custom_sections: CustomSection[];
}
