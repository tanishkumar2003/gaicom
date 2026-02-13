import Button from './Button';

const partners = [
  { name: 'TechForward Foundation', initials: 'TF' },
  { name: 'NJ Education Alliance', initials: 'EA' },
  { name: 'Community Digital Labs', initials: 'CD' },
  { name: 'Innovation Bridge', initials: 'IB' },
  { name: 'AI for Good Network', initials: 'AG' },
  { name: 'Livingston Chamber', initials: 'LC' },
];

const partnerDetails = [
  {
    name: 'TechForward Foundation',
    description:
      'Provides funding and technical resources to support GAICOM\'s educational workshops and community programs across New Jersey.',
  },
  {
    name: 'NJ Education Alliance',
    description:
      'Collaborates on curriculum development and teacher training programs that integrate generative AI into K-12 classrooms.',
  },
  {
    name: 'Community Digital Labs',
    description:
      'Offers hands-on lab space and technology infrastructure for GAICOM hackathons and community AI projects.',
  },
];

export default function PartnerList() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="bg-surface rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center text-center hover:border-accent/20 transition-colors duration-300 aspect-square"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent font-bold text-xl mb-3">
              {partner.initials}
            </div>
            <p className="text-white text-sm font-medium leading-tight">{partner.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {partnerDetails.map((partner) => (
          <div
            key={partner.name}
            className="bg-surface rounded-2xl border border-white/5 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-3">{partner.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{partner.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-accent/10 via-surface to-accent/10 rounded-2xl border border-accent/20 p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Become a Partner
        </h3>
        <p className="text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
          Partner with GAICOM to expand AI access in communities across the nation.
          Together we can build a more equitable AI future.
        </p>
        <Button href="mailto:partners@gaicom.org" size="large">
          Get in Touch
        </Button>
      </div>
    </div>
  );
}
