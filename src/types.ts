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
  description: string;
  from_date: string;
  to_date: string;
}

export interface EducationUnit {
  name: string;
  description: string;
  from_date: string;
  to_date: string;
  image: string;
}

export interface Project {
  name: string;
  description: string;
  links: Link[];
  image: string;
}

export interface Photo {
  image: string;
  is_main: boolean;
}

export interface CVData {
  frist_name: string;
  last_name: string;
  profession: string;
  email: string;
  about: string;
  pdf_resume: string;
  skills: Skill[];
  links: Link[];
  languages: Language[];
  experience_units: ExperienceUnit[];
  education_units: EducationUnit[];
  projects: Project[];
  photos: Photo[];
}
