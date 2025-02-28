import  { Job, JobQuestion } from '@/core/types/job'
import { Interview } from '../types/interview'



export const mockSentApplications: Job[] = [
  {
    jobTitle: 'Offre de Stage PFE ou Pré-Embauche – Développement Web et Maintenance Applicative',
    jobKey: '1',
    jobUrl: '#',
    company: {
      name: 'AB&MM Centre d\'affaire'
    },
    location: 'Tanger',
    jobExpired: true,
    jobReported: false,
    jobFraudulent: false,
    withdrawn: false,
    bookmarked: false,
    applyTime: new Date('2024-02-01').getTime(),
    statuses: {
      candidateStatus: {
        status: 'APPLIED',
        timestamp: new Date('2024-02-01').getTime()
      },
      selfReportedStatus: {
        status: 'APPLIED',
        timestamp: new Date('2024-02-01').getTime()
      },
      employerJobStatus: {
        status: 'EXPIRED',
        timestamp: new Date('2024-02-01').getTime()
      },
      userJobStatus: {
        status: 'POST_APPLY',
        timestamp: new Date('2024-02-01').getTime()
      }
    }
  },
  {
    jobTitle: 'Développeur full stack',
    jobKey: '2',
    jobUrl: '#',
    bookmarked: true,
    company: {
      name: 'Vinca digital'
    },
    location: 'Casablanca',
    jobExpired: true,
    jobReported: false,
    jobFraudulent: false,
    withdrawn: false,
    applyTime: new Date('2024-01-29').getTime(),
    statuses: {
      candidateStatus: {
        status: 'REJECTED',
        timestamp: new Date('2024-01-29').getTime()
      },
      selfReportedStatus: {
        status: 'APPLIED',
        timestamp: new Date('2024-01-29').getTime()
      },
      employerJobStatus: {
        status: 'EXPIRED',
        timestamp: new Date('2024-01-29').getTime()
      },
      userJobStatus: {
        status: 'POST_APPLY',
        timestamp: new Date('2024-01-29').getTime()
      }
    }
  },
  {
    jobTitle: 'Offre de stage PFE développeur Flutter',
    jobKey: '3',
    jobUrl: '#',
    bookmarked: false,
    company: {
      name: 'Logiciel Lab'
    },
    location: 'Tanger',
    jobExpired: false,
    jobReported: false,
    jobFraudulent: false,
    withdrawn: false,
    applyTime: new Date('2024-01-29').getTime(),
    statuses: {
      candidateStatus: {
        status: 'INTERVIEWED',
        timestamp: new Date('2024-01-29').getTime()
      },
      selfReportedStatus: {
        status: 'APPLIED',
        timestamp: new Date('2024-01-29').getTime()
      },
      employerJobStatus: {
        status: 'OPEN',
        timestamp: new Date('2024-01-29').getTime()
      },
      userJobStatus: {
        status: 'POST_APPLY',
        timestamp: new Date('2024-01-29').getTime()
      }
    }
  },
  {
    jobTitle: 'Développeur React.js / Node.js',
    jobKey: '4',
    jobUrl: '#',
    bookmarked: true,
    company: {
      name: 'MyTeam Solution'
    },
    location: 'Bouskoura',
    jobExpired: false,
    jobReported: false,
    jobFraudulent: false,
    withdrawn: false,
    applyTime: new Date('2024-01-28').getTime(),
    statuses: {
      candidateStatus: {
        status: 'APPLIED',
        timestamp: new Date('2024-01-28').getTime()
      },
      selfReportedStatus: {
        status: 'APPLIED',
        timestamp: new Date('2024-01-28').getTime()
      },
      employerJobStatus: {
        status: 'OPEN',
        timestamp: new Date('2024-01-28').getTime()
      },
      userJobStatus: {
        status: 'POST_APPLY',
        timestamp: new Date('2024-01-28').getTime()
      }
    }
  },
  {
    jobTitle: 'Développeur Full Stack',
    jobKey: '5',
    jobUrl: '#',
    bookmarked: false,
    company: {
      name: 'Tech Solutions'
    },
    location: 'Rabat',
    jobExpired: false,
    jobReported: false,
    jobFraudulent: false,
    withdrawn: false,
    applyTime: new Date('2024-01-27').getTime(),
    statuses: {
      candidateStatus: {
        status: 'ARCHIVED',
        timestamp: new Date('2024-01-27').getTime()
      },
      selfReportedStatus: {
        status: 'ARCHIVED',
        timestamp: new Date('2024-01-27').getTime()
      },
      employerJobStatus: {
        status: 'OPEN',
        timestamp: new Date('2024-01-27').getTime()
      },
      userJobStatus: {
        status: 'ARCHIVED',
        timestamp: new Date('2024-01-27').getTime()
      }
    }
  },
  {
    jobTitle: 'Développeur Backend',
    jobKey: '6',
    jobUrl: '#',
    bookmarked: false,
    company: {
      name: 'Backend Solutions'
    },
    location: 'Marrakech',
    jobExpired: false,
    jobReported: false,
    jobFraudulent: false,
    withdrawn: false,
    applyTime: new Date('2024-01-26').getTime(),
    statuses: {
      candidateStatus: {
        status: 'ARCHIVED',
        timestamp: new Date('2024-01-26').getTime()
      },
      selfReportedStatus: {
        status: 'ARCHIVED',
        timestamp: new Date('2024-01-26').getTime()
      },
      employerJobStatus: {
        status: 'OPEN',
        timestamp: new Date('2024-01-26').getTime()
      },
      userJobStatus: {
        status: 'ARCHIVED',
        timestamp: new Date('2024-01-26').getTime()
      }
    }
  }
]

export const JobQuestions: JobQuestion[] = [
  {
    id: '1',
    question: 'How many years of experience do you have in the field of software development?',
    answer: '2'
  },
  {
    id: '2',
    question: 'What do you think is the most important aspect of software development?',
    answer: 'Quality and performance'
  },
  {
    id: '3',
    question: 'How would you describe your preferred working environment or culture?',
    answer: 'Collaborative and innovative'
  }
]

export const mockInterviews: Interview[] = [
  {
    jobTitle: 'Développeur Full Stack',
    jobKey: '7',
    jobUrl: '#',
    company: {
      name: 'Tech Solutions'
    },
    location: 'Rabat',
    interviewTime: "30 minutes",
    interviewDate: "2024-02-28",
    interviewType: "In-person",
    interviewAddressMap: "https://www.google.com/maps/place/Tanger",
    interviewAddress: "Tanger riad tetouan",
    interviewLocation: "Tanger",
    interviewStatus: "INVITED",
    fixedInterviewDate: "2024-02-28",
    fixedInterviewHour: "9:30-10:00",
  },
  {
    jobTitle: 'Développeur Frontend',
    jobKey: '8',
    jobUrl: '#',
    company: {
      name: 'Vinca digital'
    },
    location: 'Casablanca',
    interviewTime: "30 minutes",
    interviewDate: "2024-02-28",
    interviewType: "Video Call",
    interviewLink: "https://meet.google.com/new",
    interviewLocation: "Casablanca",
    interviewStatus: "PENDING",
  },
  {
    jobTitle: 'Développeur Backend',
    jobKey: '9',
    jobUrl: '#',
    company: {
      name: 'Backend Solutions'
    },
    location: 'Marrakech',
    interviewTime: "30 minutes",
    interviewDate: "2024-02-28",
    interviewType: "Phone Call",
    interviewPhone: "+212 625 106251",
    interviewLocation: "Marrakech",
    interviewStatus: "PASSED",
  },
  {
    jobTitle: 'Développeur Backend',
    jobKey: '10',
    jobUrl: '#',
    company: {
      name: 'Backend Solutions'
    },
    location: 'Marrakech',
    interviewTime: "30 minutes",
    interviewDate: "2024-02-28",
    interviewType: "Phone Call",
    interviewPhone: "+212 625 106251",
    interviewLocation: "Marrakech",
    interviewStatus: "INVITED",
  }
]
