export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  accountType: "Candidat" | "Recruteur";
  address: string;
  birthDate: string;
  gender: string;
  resumePath: string;
  postulyCVPath: string;
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
  }[];
}
