import { Job } from "../interfaces";

export const mockJobsList: Job[] = [
  {
    id: "1",
    jobTitle: "Développeur Full Stack",
    city: "Rabat",
    companyName: "Tech Solutions",
    description: "We are looking for a full stack developer to join our team.",
    postedAt: "2024-01-15",
    applications: 10,
    keyWords: ["JavaScript", "React", "Node.js"],
  },
  {
    id: "2",
    jobTitle: "Développeur Frontend",
    city: "Casablanca",
    companyName: "Vinca Digital",
    description: "We are looking for a frontend developer to join our team.",
    postedAt: "2024-01-20",
    applications: 5,
    keyWords: ["HTML", "CSS", "Vue.js"],
  },
  {
    id: "3",
    jobTitle: "Développeur Backend",
    city: "Marrakech",
    companyName: "Backend Solutions",
    description: "We are looking for a backend developer to join our team.",
    postedAt: "2024-01-25",
    applications: 3,
    keyWords: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: "4",
    jobTitle: "Data Scientist",
    city: "Tanger",
    companyName: "Data Insights",
    description: "We are looking for a data scientist to join our team.",
    postedAt: "2024-01-10",
    applications: 8,
    keyWords: ["Python", "Machine Learning", "Data Analysis"],
  },
];
