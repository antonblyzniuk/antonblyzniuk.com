export interface Skill {
  name: string;
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
  description: string;
  from_date: string;
  to_date: string;
}

export interface EducationUnit {
  name: string;
  degree: string | null;
  field_of_study: string | null;
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
}
