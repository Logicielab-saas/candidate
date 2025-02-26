import { type Experience } from '../types/experience'
import { type Education } from '../types/education'
import { type Skill } from '../types/skill'
import { type Certification } from '../types/certification'
import { type Language } from '../types/language'

interface QualificationsData {
	experiences: Experience[]
	education: Education[]
	skills: Skill[]
	certifications: Certification[]
	languages: Language[]
}

export const mockQualifications: QualificationsData = {
	experiences: [
		{
			id: '1',
			title: 'Développeur Full Stack Senior',
			company: 'TechCorp Solutions',
			startDate: 'Janvier 2022',
			current: true,
			description: 'Développement d\'applications web modernes avec React, Node.js et TypeScript. Lead technique sur plusieurs projets majeurs.'
		},
		{
			id: '2',
			title: 'Développeur Front-end',
			company: 'Digital Agency',
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
	certifications: [
		{
			id: '1',
			name: 'AWS Certified Developer',
			issueDate: 'Juin 2023',
			description: 'Certification en développement d\'applications web avec AWS',
		},
		{
			id: '2',
			name: 'Professional Scrum Master I',
			issueDate: 'Janvier 2022',
			description: 'Certification en gestion de projet avec Scrum',
		}
	],
	languages: [
		{
			id: '1',
			name: 'Français',
			level: 'Natif'
		},
		{
			id: '2',
			name: 'Anglais',
			level: 'C1'
		},
		{
			id: '3',
			name: 'Espagnol',
			level: 'C2'
		}
	]
}