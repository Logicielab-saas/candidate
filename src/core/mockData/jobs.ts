import type { Job } from '@/core/types/job'
import type { SavedJob } from '@/core/types/saved-job'

export const mockSavedJobs: SavedJob[] = [
  {
    id: '1',
    title: 'développement web',
    company: {
      name: 'TECHWEB'
    },
    location: 'Tanger',
    savedDate: "aujourd'hui",
    jobUrl: '#'
  },
  {
    id: '2',
    title: 'Développeur Frontend React',
    company: {
      name: 'Digital Agency'
    },
    location: 'Casablanca',
    savedDate: 'hier',
    jobUrl: '#'
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: {
      name: 'Tech Solutions'
    },
    location: 'Rabat',
    savedDate: '20 Feb 2024',
    jobUrl: '#'
  }
]

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