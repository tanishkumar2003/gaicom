export default function EventCard({ event }) {
  return (
    <div className="group bg-surface/60 backdrop-blur-sm rounded-2xl border border-white/5 p-6 hover:border-accent/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
      <span className="inline-block text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
        {event.date}
      </span>
      <h3 className="text-lg font-semibold text-white mb-3 leading-snug group-hover:text-accent transition-colors duration-200">
        {event.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
    </div>
  );
}
