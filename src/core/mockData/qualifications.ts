import { Experience } from "../interfaces/experience.interface";
import { Education } from "../interfaces/education.interface";
import { Skill } from "../types/skill";
import { Certification } from "../interfaces/certification.interface";
import { Language } from "../interfaces/language.interface";
import { Project } from "../types/project";
import { Course } from "../types/course";
interface QualificationsData {
  aboutme: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  projects: Project[];
  course: Course[];
}

export const mockQualifications: QualificationsData = {
  aboutme:
    "Développeur Mobile et Web dynamique et innovant, avec une solide expérience dans le développement d'applications mobiles et de sites web. Compétent dans la création d'applications et de sites web réactifs et conviviaux, offrant des expériences utilisateur fluides. Avec une capacité démontrée à s'adapter et à apprendre de nouvelles technologies.",
  experiences: [
    {
      id: "1",
      title: "Développeur Full Stack Senior",
      company: "TechCorp Solutions",
      startDate: "Janvier 2022",
      current: true,
      description:
        "Développement d'applications web modernes avec React, Node.js et TypeScript. Lead technique sur plusieurs projets majeurs.",
    },
    {
      id: "2",
      title: "Développeur Front-end",
      company: "Digital Agency",
      startDate: "Mars 2020",
      endDate: "Décembre 2021",
      current: false,
      description:
        "Création d'interfaces utilisateur réactives et optimisation des performances des applications web.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Master en Informatique",
      school: "Université de Paris",
      field: "Développement Web et Mobile",
      startDate: "Septembre 2018",
      endDate: "Juin 2020",
      current: false,
      description:
        "Spécialisation en développement d'applications web et architectures modernes",
    },
    {
      id: "2",
      degree: "Licence en Informatique",
      school: "Université Lyon 2",
      field: "Sciences Informatiques",
      startDate: "Septembre 2015",
      endDate: "Juin 2018",
      current: false,
    },
  ],
  skills: [
    {
      id: "1",
      name: "React.js",
    },
    {
      id: "2",
      name: "TypeScript",
    },
    {
      id: "3",
      name: "Node.js",
    },
    {
      id: "4",
      name: "PostgreSQL",
    },
    {
      id: "5",
      name: "AWS",
    },
    {
      id: "6",
      name: "Docker",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Developer",
      issueDate: "Juin 2023",
      description: "Certification en développement d'applications web avec AWS",
    },
    {
      id: "2",
      name: "Professional Scrum Master I",
      issueDate: "Janvier 2022",
      description: "Certification en gestion de projet avec Scrum",
    },
  ],
  languages: [
    {
      id: "1",
      name: "Français",
      level: "Basic",
    },
    {
      id: "2",
      name: "Anglais",
      level: "Conversational",
    },
    {
      id: "3",
      name: "Espagnol",
      level: "Fluent",
    },
  ],
  projects: [
    {
      id: "1",
      name: "Projet 1",
      description: "Description du projet 1",
      startDate: "Juin 2023",
      link: "https://www.example.com",
    },
    {
      id: "2",
      name: "Projet 2",
      description: "Description du projet 2",
      startDate: "Janvier 2024",
      link: "https://www.example.com",
    },
  ],
  course: [
    {
      id: "1",
      name: "Laravel 10",
      completion: "30%",
      startDate: "Janvier 2024",
    },
    {
      id: "2",
      name: "React 18",
      completion: "49%",
      startDate: "Février 2024",
    },
    {
      id: "3",
      name: "Next.js 15",
      completion: "100%",
      startDate: "Mars 2024",
    },
  ],
};
