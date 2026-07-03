import { useNavigate } from 'react-router-dom';

const categories = [
	{ name: 'Educational', icon: '🎓' },
	{ name: 'Cultural', icon: '🏛️' },
	{ name: 'Wildlife', icon: '🐾' },
	{ name: 'Beaches', icon: '🏖️' },
	{ name: 'Ancient', icon: '⛩️' },
];

const categoryMap = {
	'Educational': 'Educational',
	'Cultural': 'Cultural',
	'Wildlife': 'Wildlife',
	'Beaches': 'Golden Beaches',
	'Ancient': 'Ancient Heritage'
};

export default function Categories() {
	const navigate = useNavigate();

	const handleCategoryClick = (categoryName) => {
		const targetCategory = categoryMap[categoryName] || categoryName;
		navigate(`/destinations?category=${encodeURIComponent(targetCategory)}`);
	};

	return (
		<section className="border-y border-slate-100 bg-white">
			<div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
				<div className="text-center">
					<p className="text-xs font-bold uppercase tracking-[0.35em] text-[#d66847]">Curated Interests</p>
					<h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Explore By Category</h2>
				</div>

				<div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
					{categories.map((category) => (
						<button
							key={category.name}
							type="button"
							onClick={() => handleCategoryClick(category.name)}
							className="group w-full rounded-2xl border border-slate-100 bg-[#fffaf8] p-6 text-center shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:scale-102 hover:shadow-lg hover:border-[#d66847]/25 active:scale-98 focus:outline-none"
						>
							<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d66847]/15 bg-white text-2xl shadow-sm transition-all duration-300 group-hover:border-[#d66847]/40 group-hover:bg-[#fffcfb] group-hover:scale-110">
								{category.icon}
							</div>
							<p className="mt-4 font-semibold text-slate-700 transition-colors duration-300 group-hover:text-[#d66847]">{category.name}</p>
						</button>
					))}
				</div>
			</div>
		</section>
	);
}
