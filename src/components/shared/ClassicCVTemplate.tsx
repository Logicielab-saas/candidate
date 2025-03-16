import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { sampleDataCV } from '@/core/mockData/simple-data-cv'

interface ClassicCVProps {
  primaryColor: string
  accentColor: string
  setImageLoaded: (loaded: boolean) => void
  setImageError: (error: boolean) => void
}

export function ClassicCVTemplate({
  primaryColor,
  accentColor,
  setImageLoaded,
  setImageError
}: ClassicCVProps) {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg" style={{ padding: '0' }}>
      {/* Left Sidebar */}
      <div className="md:w-1/3 text-white p-6 space-y-6" style={{ backgroundColor: primaryColor, minHeight: '296.86mm' }}>
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-48 h-48 rounded-full mb-4" style={{ borderColor: accentColor, borderWidth: '4px' }}>
            <AvatarImage
              src={sampleDataCV.personalInfo.avatar}
              className="rounded-full"
              onLoad={() => {
                setImageLoaded(true)
                setImageError(false)
              }}
              onError={() => {
                setImageLoaded(false)
                setImageError(true)
              }}
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>

        {/* Contact Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor }}>
            CONTACT
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span style={{ color: accentColor }}>📱</span>
              <span>{sampleDataCV.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ color: accentColor }}>✉️</span>
              <span>{sampleDataCV.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ color: accentColor }}>📍</span>
              <span>{sampleDataCV.personalInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor }}>
            SKILLS
          </h3>
          <ul className="space-y-2">
            {sampleDataCV.skills.map((skill) => (
              <li key={skill} className="flex items-center gap-2">
                <span style={{ color: accentColor }}>•</span>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Languages Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor }}>
            LANGUAGES
          </h3>
          <div className="space-y-3">
            {sampleDataCV.languages.map((language) => (
              <div key={language.name} className="space-y-1">
                <div className="flex justify-between">
                  <span>{language.name}</span>
                  <span>{language.level}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      backgroundColor: accentColor,
                      width: language.level === 'Native' ? '100%' :
                             language.level === 'Professional' ? '80%' : '60%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold border-b-2 pb-2" style={{ color: accentColor, borderColor: accentColor }}>
            HOBBIES
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span style={{ color: accentColor }}>•</span>
              Reading
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: accentColor }}>•</span>
              Music
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: accentColor }}>•</span>
              Travel
            </li>
          </ul>
        </div>
      </div>

      {/* Right Content */}
      <div className="md:w-2/3 p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold" style={{ color: primaryColor }}>{sampleDataCV.personalInfo.name}</h1>
          <h2 className="text-2xl" style={{ color: accentColor }}>{sampleDataCV.personalInfo.title}</h2>
          <p className="text-gray-600 mt-4">{sampleDataCV.personalInfo.about}</p>
        </div>

        {/* Work Experience */}
        <div className="space-y-6 page-break">
          <h3 className="text-2xl font-semibold border-b-2 pb-2"
            style={{ color: primaryColor, borderColor: accentColor }}>
            WORK EXPERIENCE
          </h3>
          <div className="space-y-6">
            {sampleDataCV.experience.map((exp) => (
              <div key={exp.company} className="relative pl-6" style={{ borderLeft: `2px solid ${accentColor}` }}>
                <div className="absolute w-3 h-3 rounded-full -left-[7px] top-2"
                  style={{ backgroundColor: accentColor }}></div>
                <h4 className="text-xl font-semibold" style={{ color: primaryColor }}>{exp.role}</h4>
                <div className="flex justify-between" style={{ color: accentColor }}>
                  <span>{exp.company}</span>
                  <span>{exp.period}</span>
                </div>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold border-b-2 pb-2"
            style={{ color: primaryColor, borderColor: accentColor }}>
            EDUCATION
          </h3>
          <div className="space-y-6">
            {sampleDataCV.education.map((edu) => (
              <div key={edu.degree} className="relative pl-6" style={{ borderLeft: `2px solid ${accentColor}` }}>
                <div className="absolute w-3 h-3 rounded-full -left-[7px] top-2"
                  style={{ backgroundColor: accentColor }}></div>
                <h4 className="text-xl font-semibold" style={{ color: primaryColor }}>{edu.degree}</h4>
                <div className="flex justify-between" style={{ color: accentColor }}>
                  <span>{edu.institution}</span>
                  <span>{edu.period}</span>
                </div>
                <p className="mt-2 text-gray-600">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}