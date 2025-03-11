interface User {
  id: string;
  name: string;
  email: string;
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

export const MOCK_USER: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+33612345678",
  accountType: "Candidat",
  address: "123 Rue de la Paix, 75000 Paris, France",
  birthDate: "1990-01-01",
  gender: "male",
  resumePath: "/cvs/mycv.pdf",
  postulyCVPath: "/cvs/sample.pdf",
  experience: [
    {
      company: "Google",
      position: "Software Engineer",
      startDate: "2020-01-01",
      endDate: "2021-01-01",
    },
  ],
};
