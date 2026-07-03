const features = [
	{
		title: 'Verified Agencies',
		description: 'Handpicked travel partners with proven track records.',
		icon: '🛡️',
	},
	{
		title: '24/7 Concierge',
		description: 'Round-the-clock assistance for all your travel needs.',
		icon: '🎧',
	},
	{
		title: 'Best Price Guarantee',
		description: 'Transparent pricing with no hidden surcharges.',
		icon: '🏷️',
	},
	{
		title: 'Custom Itineraries',
		description: 'Tailor-made journeys that suit your personal taste.',
		icon: '✨',
	},
];

export default function WhyChooseUs() {
	return (
		<section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
			<div className="text-center">
				<h2 className="text-3xl font-black tracking-tight text-slate-900">Why Choose Us?</h2>
			</div>

			<div className="mt-14 grid gap-6 lg:grid-cols-4">
				{features.map((feature) => (
					<div
						key={feature.title}
						className="rounded-3xl border border-slate-100 border-t-4 border-t-[#d66847] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
					>
						<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d66847]/10 text-2xl text-[#d66847]">
							{feature.icon}
						</div>
						<h3 className="mt-6 text-lg font-bold text-slate-900">{feature.title}</h3>
						<p className="mt-3 text-sm leading-7 text-slate-500">{feature.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
