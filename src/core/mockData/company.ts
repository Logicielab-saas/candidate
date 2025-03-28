import { Company, CompanyDetails, CompanyReview } from "../interfaces";

export const companies: Company[] = [
  {
    id: "1",
    name: "Tech Solutions",
    location: "Rabat",
    avatarUrl: "https://placehold.co/150",
    description:
      "Tech Solutions is a leading provider of technology solutions, offering innovative products and services to businesses and individuals.",
    industry: "Technology",
    salaryRange: "100,000 - 150,000",
    rating: 3.7,
    reviewsNum: 3,
    jobsTotal: 80,
  },
  {
    id: "2",
    name: "Vinca Digital",
    location: "Casablanca",
    avatarUrl: "https://placehold.co/150",
    description:
      "Vinca Digital is a digital marketing agency that specializes in creating effective online strategies for businesses.",
    industry: "Technology",
    salaryRange: "100,000 - 150,000",
    rating: 5.0,
    reviewsNum: 1,
    jobsTotal: 60,
  },
  {
    id: "3",
    name: "Backend Solutions",
    location: "Marrakech",
    avatarUrl: "https://placehold.co/150",
    description:
      "Backend Solutions is a software development company that specializes in creating custom software solutions for businesses.",
    industry: "Technology",
    salaryRange: "100,000 - 150,000",
    rating: 4.5,
    reviewsNum: 150,
    jobsTotal: 120,
  },
  {
    id: "4",
    name: "Data Insights",
    location: "Tanger",
    avatarUrl: "https://placehold.co/150",
    description:
      "Data Insights is a data analytics company that specializes in providing data-driven insights to businesses.",
    industry: "Technology",
    salaryRange: "100,000 - 150,000",
    rating: 4.5,
    reviewsNum: 80,
    jobsTotal: 40,
  },
  {
    id: "5",
    name: "Creative Minds",
    location: "Fès",
    avatarUrl: "https://placehold.co/150",
    description:
      "Creative Minds is a creative agency that specializes in creating innovative design solutions for businesses.",
    industry: "Technology",
    salaryRange: "100,000 - 150,000",
    rating: 4.5,
    reviewsNum: 110,
    jobsTotal: 90,
  },
  {
    id: "6",
    name: "Innovative Solutions",
    location: "Agadir",
    avatarUrl: "https://placehold.co/150",
    description:
      "Innovative Solutions is a technology consulting company that specializes in providing innovative solutions to businesses.",
    industry: "Technology",
    salaryRange: "100,000 - 150,000",
    rating: 4.5,
    reviewsNum: 75,
    jobsTotal: 50,
  },
  {
    id: "7",
    name: "Future Tech",
    location: "Oujda",
    avatarUrl: "https://placehold.co/150",
    description:
      "Future Tech is a technology consulting company that specializes in providing innovative solutions to businesses.",
    industry: "Technology",
    salaryRange: "100,000 - 150,000",
    rating: 4.5,
    reviewsNum: 130,
    jobsTotal: 70,
  },
  {
    id: "8",
    name: "NextGen Innovations",
    location: "Tétouan",
    avatarUrl: "https://placehold.co/150",
    description:
      "NextGen Innovations is a technology consulting company that specializes in providing innovative solutions to businesses.",
    industry: "Technology",
    salaryRange: "100,000 - 150,000",
    rating: 4.5,
    reviewsNum: 90,
    jobsTotal: 30,
  },
];

/**
 * A diverse list of company details demonstrating different scenarios.
 * Some entries include all optional fields while others omit a few.
 */
export const companyDetails: CompanyDetails[] = [
  {
    id: "1",
    name: "Tech Solutions",
    slug: "tech-solutions-1",
    location: "Rabat",
    avatarUrl: "https://placehold.co/150",
    emloyers: 100,
    dateFounded: "2020-01-01",
    siteUrl: "https://www.techsolutions.com",
    description:
      "Tech Solutions excels in delivering comprehensive and innovative technology solutions, focusing on advanced software development, robust cloud computing infrastructures, and effective cybersecurity measures. Our expertise extends to digital transformation consulting, where we guide businesses through their technological evolution. With a proven history of successful project implementations across diverse sectors, we provide enterprise-level solutions designed to empower organizations to grow and succeed in the digital landscape. Our dedicated team of skilled engineers and consultants is committed to ensuring that our clients receive tailored, high-quality technological solutions that meet their unique requirements.",
    industry: "Technology",
    salaryRange: "100,000 - 150,000",
    rating: 3.7,
    reviewsNum: 3,
    jobsTotal: 80,
  },
  {
    id: "2",
    name: "Vinca Digital",
    slug: "vinca-digital-2",
    location: "Casablanca",
    // Omitting avatarUrl and salaryRange
    emloyers: 150,
    dateFounded: "2018-05-15",
    siteUrl: "https://www.vincadigital.com",
    description:
      "Vinca Digital is a leading agency focused on crafting innovative digital marketing strategies that enhance online visibility and foster brand growth. Our team of experts leverages data-driven insights to create tailored campaigns that resonate with target audiences. We specialize in search engine optimization (SEO), pay-per-click (PPC) advertising, social media marketing, and content creation, ensuring a comprehensive approach to digital branding. By utilizing the latest tools and technologies, we help businesses navigate the complexities of the digital landscape, driving engagement and conversions. Our commitment to excellence and client satisfaction sets us apart in the competitive marketing industry.",
    industry: "Marketing",
    rating: 5.0,
    reviewsNum: 1,
    jobsTotal: 60,
  },
  {
    id: "3",
    name: "Backend Solutions",
    slug: "backend-solutions-3",
    location: "Marrakech",
    avatarUrl: "https://placehold.co/150",
    // Omitting description and siteUrl
    emloyers: 50,
    dateFounded: "2015-07-20",
    industry: "Renewable Energy",
    rating: 4.2,
    reviewsNum: 80,
    jobsTotal: 45,
  },
  {
    id: "4",
    name: "Data Insights",
    slug: "data-insights-4",
    location: "Tanger",
    avatarUrl: "https://placehold.co/150",
    emloyers: 200,
    dateFounded: "2010-03-10",
    siteUrl: "https://www.healthconnect.com",
    description:
      "Health Connect delivers cutting-edge solutions in healthcare connectivity and logistics.",
    industry: "Healthcare",
    salaryRange: "90,000 - 140,000",
    rating: 4.8,
    reviewsNum: 150,
    jobsTotal: 110,
  },
  {
    id: "5",
    name: "Creative Minds",
    slug: "creative-minds-5",
    location: "Fès",
    // Omitting multiple optional fields (avatarUrl, description, siteUrl, salaryRange, reviewsNum, jobsTotal)
    emloyers: 80,
    dateFounded: "2012-09-25",
    industry: "Finance",
    rating: 4.0,
  },
  {
    id: "7",
    name: "Innovative Solutions",
    slug: "innovative-solutions-7",
    location: "Oujda",
    avatarUrl: "https://placehold.co/150",
    emloyers: 120,
    dateFounded: "2019-11-30",
    siteUrl: "https://www.futuretech.com",
    description:
      "Future Tech is at the forefront of emerging technologies, specializing in AI, machine learning, and blockchain solutions. Our innovative approach helps businesses leverage cutting-edge technology to stay ahead of the competition.",
    industry: "Technology",
    salaryRange: "110,000 - 160,000",
    rating: 4.6,
    reviewsNum: 130,
    jobsTotal: 70,
  },
  {
    id: "8",
    name: "Future Tech",
    slug: "future-tech-8",
    location: "Tétouan",
    avatarUrl: "https://placehold.co/150",
    emloyers: 75,
    dateFounded: "2021-03-15",
    siteUrl: "https://www.nextgeninnovations.com",
    description:
      "NextGen Innovations focuses on developing next-generation software solutions and digital transformation services. We help businesses modernize their technology stack and improve operational efficiency.",
    industry: "Technology",
    salaryRange: "95,000 - 145,000",
    rating: 4.3,
    reviewsNum: 90,
    jobsTotal: 30,
  },
  {
    id: "9",
    name: "NextGen Innovations",
    slug: "next-gen-innovations-9",
    location: "Kenitra",
    // Omitting some optional fields to maintain diversity
    emloyers: 60,
    dateFounded: "2022-01-10",
    industry: "Technology",
    rating: 4.1,
    reviewsNum: 45,
    jobsTotal: 25,
  },
];

export const companyReviews: CompanyReview[] = [
  {
    id: "1",
    companySlug: "tech-solutions-1",
    userId: "1",
    rating: 4.5,
    summary: "A fantastic workplace with a supportive atmosphere.",
    comment:
      "Tech Solutions fosters a collaborative environment that encourages growth. The team is always ready to help each other, and the management is very approachable. Employees feel valued and appreciated, which contributes to a positive work culture. The company also invests in employee development, providing various training programs and opportunities for career advancement. Overall, it's a place where you can grow both personally and professionally.",
    positivePoints: ["Supportive management", "Collaborative team"],
    negativePoints: ["Occasional tight deadlines", "High expectations"],
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    companySlug: "tech-solutions-1",
    userId: "2",
    rating: 4.0,
    summary: "Great place for software developers to thrive.",
    comment:
      "The company offers a solid work-life balance and a positive culture. Employees are encouraged to take breaks and maintain a healthy work-life balance. The office environment is friendly and inclusive, making it easy to collaborate with colleagues. There are also regular team-building activities that help strengthen relationships among team members. However, during peak project times, the workload can become intense, which may lead to longer hours. Overall, it's a great place for developers to enhance their skills and work on exciting projects.",
    createdAt: "2025-02-22",
  },
  {
    id: "3",
    companySlug: "tech-solutions-1",
    userId: "3",
    rating: 2.5,
    summary: "An average experience with room for improvement.",
    comment:
      "While the work culture is decent, there are significant areas that need attention. Communication between departments can be lacking, leading to misunderstandings and delays in project timelines. Additionally, some employees feel that their contributions are not recognized, which can affect morale. The company has potential, but it needs to address these issues to create a more cohesive and supportive environment for all employees.",
    positivePoints: ["Decent work culture", "Good team spirit"],
    negativePoints: ["High stress levels", "Lack of clear direction"],
    createdAt: "2025-03-14",
  },
  {
    id: "4",
    companySlug: "vinca-digital-2",
    userId: "4",
    rating: 5.0,
    summary: "An exemplary company with a vibrant culture.",
    comment:
      "Vinca Digital stands out for its innovative approach and employee satisfaction. The company fosters creativity and encourages employees to think outside the box. There are numerous opportunities for professional development, and the leadership team is genuinely invested in the well-being of their staff. The collaborative atmosphere and the focus on innovation make it a fantastic place to work. Employees feel empowered to share their ideas and contribute to the company's success.",
    createdAt: "2024-11-11",
  },
];
