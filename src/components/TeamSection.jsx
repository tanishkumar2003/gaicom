import { useState } from 'react';

const teamMembers = [
  {
    name: 'Srinivas Salandra',
    initials: 'SS',
    image: '/team/srinivas-salandra.jpg',
    bio: 'Technology Program Manager with deep experience in seamless execution and delivery in the financial services industry managing Risk and Control functions, Cloud Transformation, and leading cross-functional projects driving innovation and business growth.',
  },
  {
    name: 'Shiva Nistala',
    initials: 'SN',
    image: '/team/shiva-nistala.jpg',
    bio: 'Data leader with over 15 years of experience advancing analytics, data strategy, and AI solutions in the financial industry. Passionate about innovation and building forward-looking data capabilities while empowering local communities in an AI-driven world.',
  },
  {
    name: 'Rakesh Tiwary',
    initials: 'RT',
    image: '/team/rakesh-tiwary.jpg',
    bio: 'Senior technology leader with 20+ years of experience in software engineering, enterprise architecture, and digital transformation. Heads Enterprise Architecture for Treasury and Risk, driving AI/ML, data strategy, cloud enablement, and SaaS modernization.',
  },
  {
    name: 'Vishwas Kulkarni',
    initials: 'VK',
    image: '/team/vishwas-kulkarni.jpg',
    bio: 'Engineer by training, Technologist by passion, and Quantitative Strategist by vocation with multi-decade experience in global financial services.',
  },
  {
    name: 'Ishani Juneja',
    initials: 'IJ',
    image: '/team/ishani-juneja.jpg',
    bio: 'Recent graduate and passionate designer focused on making emerging technologies, particularly AI, more accessible and inclusive. Aims to bridge innovation and real-world impact through design.',
  },
  {
    name: 'Komal Misra',
    initials: 'KM',
    image: '/team/komal-misra.jpg',
    bio: 'Passionate about changing how the world views AI. Dedicated to helping the Livingston community better understand AI concepts and implement solutions for local improvement.',
  },
  {
    name: 'Lalit Hingorani',
    initials: 'LH',
    image: '/team/lalit-hingorani.jpg',
    bio: 'AI enthusiast with 20 years of experience leading full-stack web projects at investment banks and financial institutions. Focused on improving efficiency and innovation through AI.',
  },
  {
    name: 'Vishwajeet Niradi',
    initials: 'VN',
    image: '/team/vishwajeet-niradi.jpg',
    bio: 'Data Science graduate student and AI enthusiast passionate about leveraging AI to drive meaningful societal impact and create innovative solutions.',
  },
];

function TeamAvatar({ member }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-accent/40 transition-all duration-300">
      {!imgError ? (
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-accent font-bold text-2xl">
          {member.initials}
        </div>
      )}
    </div>
  );
}

export default function TeamSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamMembers.map((member, i) => (
        <div
          key={member.name}
          className="group bg-surface rounded-2xl border border-white/5 p-8 text-center hover:border-accent/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="mb-5">
            <TeamAvatar member={member} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-3">{member.name}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
        </div>
      ))}
    </div>
  );
}
