import { type Experience } from '../types/experience'
import { type Education } from '../types/education'
import { type Skill } from '../types/skill'
import { type License } from '../types/license'
import { type Certification } from '../types/certification'
import { type Language } from '../types/language'

interface QualificationsData {
	experiences: Experience[]
	education: Education[]
	skills: Skill[]
	licenses: License[]
	certifications: Certification[]
	languages: Language[]
}

export const mockQualifications: QualificationsData = {
	experiences: [
		{
			id: '1',
			title: 'Développeur Full Stack Senior',
			company: 'TechCorp Solutions',
			location: 'Paris, France',
			startDate: 'Janvier 2022',
			current: true,
			description: 'Développement d\'applications web modernes avec React, Node.js et TypeScript. Lead technique sur plusieurs projets majeurs.'
		},
		{
			id: '2',
			title: 'Développeur Front-end',
			company: 'Digital Agency',
			location: 'Lyon, France',
			startDate: 'Mars 2020',
			endDate: 'Décembre 2021',
			current: false,
			description: 'Création d\'interfaces utilisateur réactives et optimisation des performances des applications web.'
		}
	],
	education: [
		{
			id: '1',
			degree: 'Master en Informatique',
			school: 'Université de Paris',
			field: 'Développement Web et Mobile',
			location: 'Paris, France',
			startDate: 'Septembre 2018',
			endDate: 'Juin 2020',
			current: false,
			description: 'Spécialisation en développement d\'applications web et architectures modernes'
		},
		{
			id: '2',
			degree: 'Licence en Informatique',
			school: 'Université Lyon 2',
			field: 'Sciences Informatiques',
			location: 'Lyon, France',
			startDate: 'Septembre 2015',
			endDate: 'Juin 2018',
			current: false
		}
	],
	skills: [
		{
			id: '1',
			name: 'React.js',
		},
		{
			id: '2',
			name: 'TypeScript',
		},
		{
			id: '3',
			name: 'Node.js',
		},
		{
			id: '4',
			name: 'PostgreSQL',
		},
		{
			id: '5',
			name: 'AWS',
		},
		{
			id: '6',
			name: 'Docker',
		}
	],
	licenses: [
		{
			id: '1',
			name: 'Permis B',
			number: '12345678',
			issueDate: 'Janvier 2015',
			issuingAuthority: 'Préfecture de Police',
		},
		{
			id: '2',
			name: 'Permis Moto A2',
			number: '87654321',
			issueDate: 'Mars 2020',
			issuingAuthority: 'Préfecture de Police',
		}
	],
	certifications: [
		{
			id: '1',
			name: 'AWS Certified Developer',
			organization: 'Amazon Web Services',
			issueDate: 'Juin 2023',
			expiryDate: 'Juin 2026',
			credentialId: 'AWS-DEV-123456',
			credentialUrl: 'https://aws.amazon.com/verification',
		},
		{
			id: '2',
			name: 'Professional Scrum Master I',
			organization: 'Scrum.org',
			issueDate: 'Janvier 2022',
			credentialId: 'PSM-I-123456',
			credentialUrl: 'https://scrum.org/certificates',
		}
	],
	languages: [
		{
			id: '1',
			name: 'Français',
			certification: 'Langue maternelle'
		},
		{
			id: '2',
			name: 'Anglais',
			certification: 'TOEIC 945'
		},
		{
			id: '3',
			name: 'Espagnol',
			certification: 'DELE B2'
		}
	]
}