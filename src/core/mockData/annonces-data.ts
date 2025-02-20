export interface Annonce {
  id: string;
  value: string;
  label: string;
  city: string;
}

export const mockAnnonces: Annonce[] = [
  {
    id: "1",
    value: "social-media-manager",
    label: "Social Media Manager",
    city: "Tanger",
  },
  {
    id: "2",
    value: "assistante-commerciale",
    label: "Assistante Commerciale",
    city: "Meknes",
  },
  {
    id: "3",
    value: "infographiste",
    label: "Infographiste",
    city: "Rabat",
  },
  {
    id: "4",
    value: "Developer",
    label: "Developer",
    city: "Rabat",
  },
  {
    id: "5",
    value: "Machine Learning",
    label: "Machine Learning",
    city: "Rabat",
  },
  {
    id: "6",
    value: "Data Scientist",
    label: "Data Scientist",
    city: "Rabat",
  },
];