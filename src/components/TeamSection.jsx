const teamMembers = [
  {
    name: 'Dr. Sarah Martinez',
    role: 'Executive Director',
    bio: 'AI researcher and educator with 15 years of experience in community technology initiatives.',
    initials: 'SM',
  },
  {
    name: 'David Okonkwo',
    role: 'Head of Programs',
    bio: 'Former nonprofit director passionate about leveraging AI for social impact and community development.',
    initials: 'DO',
  },
  {
    name: 'Rachel Kim',
    role: 'Director of Partnerships',
    bio: 'Strategic partnerships expert with deep ties to education, nonprofit, and technology sectors.',
    initials: 'RK',
  },
  {
    name: 'Marcus Johnson',
    role: 'Lead AI Trainer',
    bio: 'Full-stack developer and AI specialist who makes complex technology accessible to all audiences.',
    initials: 'MJ',
  },
  {
    name: 'Priya Sharma',
    role: 'Community Manager',
    bio: 'Community organizer focused on building inclusive spaces for learning and collaboration.',
    initials: 'PS',
  },
  {
    name: 'Alex Rivera',
    role: 'Content & Communications',
    bio: 'Digital storyteller creating compelling narratives around AI education and community impact.',
    initials: 'AR',
  },
];

export default function TeamSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamMembers.map((member) => (
        <div
          key={member.name}
          className="bg-surface rounded-2xl border border-white/5 p-6 text-center hover:border-accent/20 transition-all duration-300"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-accent font-bold text-2xl mb-4">
            {member.initials}
          </div>
          <h3 className="text-lg font-semibold text-white">{member.name}</h3>
          <p className="text-accent text-sm font-medium mb-3">{member.role}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
        </div>
      ))}
    </div>
  );
}
