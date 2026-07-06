import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

/* ═══════════════════════════════════════════════════════
   Destination Data — 18 entries across 5 categories
   All image paths point to /assets/images/<clean-name>
   ═══════════════════════════════════════════════════════ */
const allDestinations = [
	/* ── Page 1 ── */
	{
		id: 1,
		title: 'Sigiriya',
		category: 'Ancient Heritage',
		badge: 'ANCIENT HERITAGE',
		image: '/assets/images/sigiriya.jpg',
		description:
			'The ancient lion rock fortress, a marvel of 5th-century engineering and art, rising dramatically above the central plains.',
	},
	{
		id: 2,
		title: 'Ambuluwewa Tower',
		category: 'Educational',
		badge: 'SCENIC HILL COUNTRY',
		image: '/assets/images/Ambuluwewa/1.jpg',
		description:
			'A unique biodiversity complex and tourist harbor rising dramatically above Gampola with panoramic 360-degree views.',
	},
	{
		id: 3,
		title: 'Kalkudah Beach',
		category: 'Golden Beaches',
		badge: 'GOLDEN BEACHES',
		image: '/assets/images/kalkudah.jpg',
		description:
			'A secluded stretch of white sand on the east coast, offering calm waters and untouched tropical serenity.',
	},
	{
		id: 4,
		title: 'Yala National Park',
		category: 'Wildlife',
		badge: 'WILDLIFE',
		image: '/assets/images/yala.jpg',
		description:
			"Sri Lanka's premier wildlife sanctuary, home to a high density of leopards and over 200 bird species.",
	},
	{
		id: 5,
		title: 'Galle Fort',
		category: 'Cultural',
		badge: 'CULTURAL',
		image: '/assets/images/galle.jpg',
		description:
			'A UNESCO World Heritage site where 17th-century Dutch architecture meets vibrant coastal living.',
	},
	{
		id: 6,
		title: 'Kandy',
		category: 'Cultural',
		badge: 'CULTURAL',
		image: '/assets/images/kandy.jpg',
		description:
			'The spiritual heart of the island, a sacred city surrounded by hills and home to the Temple of the Tooth.',
	},

	/* ── Page 2 ── */
	{
		id: 7,
		title: 'Trincomalee',
		category: 'Golden Beaches',
		badge: 'GOLDEN BEACHES',
		image: '/assets/images/trincomalee.jpg',
		description:
			'A harbour city blessed with pristine beaches and coral reefs on the northeastern coast of the island.',
	},
	{
		id: 8,
		title: 'Polonnaruwa',
		category: 'Ancient Heritage',
		badge: 'ANCIENT HERITAGE',
		image: '/assets/images/Polonnaruwa1.jpg',
		description:
			'The medieval capital of Sri Lanka with well-preserved ruins of an ancient civilization dating back centuries.',
	},
	{
		id: 9,
		title: 'Nuwara Eliya',
		category: 'Educational',
		badge: 'SCENIC HILL COUNTRY',
		image: '/assets/images/nuwareliya.jpg',
		description:
			'Known as "Little England", this charming hill station features colonial architecture amid misty tea gardens.',
	},
	{
		id: 10,
		title: 'Mirissa',
		category: 'Wildlife',
		badge: 'WILDLIFE',
		image: '/assets/images/mirissa.jpg',
		description:
			'A prime whale watching destination where blue whales and dolphins dance along the deep southern waters.',
	},
	{
		id: 11,
		title: 'Dambulla Cave Temple',
		category: 'Ancient Heritage',
		badge: 'ANCIENT HERITAGE',
		image: '/assets/images/dambulla_cave.webp',
		description:
			'A UNESCO World Heritage site with five caves adorned with 150 Buddha statues and sacred murals.',
	},
	{
		id: 12,
		title: 'Bentota',
		category: 'Golden Beaches',
		badge: 'GOLDEN BEACHES',
		image: '/assets/images/bentota.jpg',
		description:
			'A sun-kissed beach paradise on the southwest coast, renowned for water sports and luxury resorts.',
	},

	/* ── Page 3 ── */
	{
		id: 13,
		title: 'Anuradhapura',
		category: 'Ancient Heritage',
		badge: 'ANCIENT HERITAGE',
		image: '/assets/images/Anuradhapura.jpg',
		description:
			'The first ancient capital of Sri Lanka, home to sacred Buddhist temples and the revered Sri Maha Bodhi tree.',
	},
	{
		id: 14,
		title: 'Arugam Bay',
		category: 'Golden Beaches',
		badge: 'GOLDEN BEACHES',
		image: '/assets/images/arugambay.jpg',
		description:
			'A world-class surfing destination on the east coast with golden sands and an irresistible laid-back vibe.',
	},
	{
		id: 15,
		title: 'Pinnawala',
		category: 'Wildlife',
		badge: 'WILDLIFE',
		image: '/assets/images/pinnawala.jpg',
		description:
			'Home to the famous elephant orphanage where herds roam freely and bathe together in the Ma Oya river.',
	},
	{
		id: 16,
		title: 'Unawatuna',
		category: 'Golden Beaches',
		badge: 'GOLDEN BEACHES',
		image: '/assets/images/unawatuna.jpg',
		description:
			'A crescent-shaped bay with calm turquoise waters, vibrant coral reefs, and charming beachside cafés.',
	},
	{
		id: 17,
		title: "Adam's Peak",
		category: 'Educational',
		badge: 'SCENIC HILL COUNTRY',
		image: '/assets/images/adams_peak.webp',
		description:
			'A sacred pilgrimage mountain rising 2,243 m, crowned by the legendary Sri Pada footprint at the summit.',
	},
	{
		id: 18,
		title: 'Jaffna',
		category: 'Cultural',
		badge: 'CULTURAL',
		image: '/assets/images/jaffna.jpg',
		description:
			'A vibrant Tamil cultural capital in the far north, brimming with Hindu temples and colonial heritage charm.',
	},
];

/* ─── filter pill labels ─── */
const categories = [
	'All',
	'Educational',
	'Cultural',
	'Wildlife',
	'Golden Beaches',
	'Ancient Heritage',
];

/* ─── badge colours per category ─── */
const badgeColorMap = {
	'Ancient Heritage': 'bg-rose-700/85',
	Educational: 'bg-emerald-700/85',
	'Golden Beaches': 'bg-sky-700/85',
	Wildlife: 'bg-orange-700/85',
	Cultural: 'bg-teal-700/85',
};

const ITEMS_PER_PAGE = 6;

// Helper to resolve clean URL slug IDs matching the destinationRegistry
const getSlug = (title) => {
	const t = title.toLowerCase();
	if (t.includes('sigiriya')) return 'sigiriya';
	if (t.includes('ella') || t.includes('ambuluwewa')) return 'ambuluwewa';
	if (t.includes('kalkudah')) return 'kalkudah';
	if (t.includes('yala')) return 'yala';
	return t.replace(/\s+/g, '-');
};

/* ═══════════════════════════════════════════════════════
   DestinationPage Component
   ═══════════════════════════════════════════════════════ */
export default function DestinationPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(1);

	const categoryQuery = searchParams.get('category');
	
	// Normalize and match category from query parameter case-insensitively
	const activeCategory = (() => {
		if (!categoryQuery) return 'All';
		const matched = categories.find(
			(cat) => cat.toLowerCase() === categoryQuery.toLowerCase()
		);
		return matched || 'All';
	})();

	/* Scroll to top on activeCategory change */
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [activeCategory]);

	/* ─── filtering ─── */
	const filtered =
		activeCategory === 'All'
			? allDestinations
			: allDestinations.filter((d) => d.category === activeCategory);

	/* ─── pagination ─── */
	const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
	const safePage = Math.min(currentPage, totalPages);
	const startIdx = (safePage - 1) * ITEMS_PER_PAGE;
	const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

	const handleCategoryChange = (cat) => {
		setCurrentPage(1);
		if (cat === 'All') {
			setSearchParams({});
		} else {
			setSearchParams({ category: cat });
		}
	};

	/* ═══════════════════════════════════════════════════════
	   Render
	   ═══════════════════════════════════════════════════════ */
	return (
		<div className="min-h-screen bg-white relative w-full block">
			<Navbar />

			{/* ════════════════════════════════════════════
			    HERO BANNER
			    ════════════════════════════════════════════ */}
			<section
				className="relative w-full h-[520px] bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: "url('/assets/images/destination-hero.png')",
				}}
			>
				{/* Gradient overlay — dark left, transparent right */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />

				<div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
					{/* ── Left: Hero Copy ── */}
					<div className="max-w-lg text-white">
						<p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.4em] text-white/75">
							<span className="text-base leading-none">🌿</span>
							Uncover the Island
						</p>

						<h1 className="mt-5 text-4xl font-extrabold leading-[1.15] sm:text-5xl lg:text-[3.4rem]">
							Beyond the
							<br />
							<span className="font-['Playfair_Display',_serif] italic font-bold">
								Horizon
							</span>{' '}
							of{' '}
							<span className="font-['Playfair_Display',_serif] italic font-bold">
								Wonder
							</span>
						</h1>

						{/* Accent separator */}
						<div className="mt-5 h-[3px] w-16 rounded-full bg-[#d66847]" />

						<p className="mt-5 max-w-md text-[15px] leading-7 text-white/75">
							From mist-shrouded peaks to sun-drenched shores, explore a
							curated collection of Sri Lanka's most captivating destinations.
						</p>
					</div>

					{/* ── Right: Stat Badges ── */}
					<div className="hidden flex-col gap-4 md:flex">
						{/* Badge 1 */}
						<div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-lg">
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d66847] text-xl shadow-lg shadow-[#d66847]/30">
								🌍
							</div>
							<div>
								<p className="text-[15px] font-bold text-white">
									150+ Destinations
								</p>
								<p className="text-xs text-white/55">Across Sri Lanka</p>
							</div>
						</div>

						{/* Badge 2 */}
						<div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-lg">
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d66847] text-xl shadow-lg shadow-[#d66847]/30">
								⭐
							</div>
							<div>
								<p className="text-[15px] font-bold text-white">
									4.9 / 5.0 Rating
								</p>
								<p className="text-xs text-white/55">From 8,500+ Travelers</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ════════════════════════════════════════════
			    MAIN CONTENT
			    ════════════════════════════════════════════ */}
			<main className="relative z-10 w-full bg-white">
				{/* ── Category Filter Pills ── */}
				<div className="mx-auto max-w-7xl px-4 pt-14 pb-2 sm:px-6 lg:px-8">
					<div className="flex flex-wrap gap-3">
						{categories.map((cat) => (
							<button
								key={cat}
								type="button"
								onClick={() => handleCategoryChange(cat)}
								className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
									activeCategory === cat
										? 'bg-[#d66847] text-white shadow-lg shadow-[#d66847]/25'
										: 'border border-slate-200 bg-white text-slate-600 hover:border-[#d66847]/50 hover:text-[#d66847]'
								}`}
							>
								{cat}
							</button>
						))}
					</div>
				</div>

				{/* ── Destination Card Grid ── */}
				<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					{paginated.length === 0 ? (
						<div className="py-24 text-center">
							<p className="text-lg font-medium text-slate-400">
								No destinations found in this category yet.
							</p>
						</div>
					) : (
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{paginated.map((dest) => (
								<article
									key={dest.id}
									className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
								>
									{/* Card image */}
									<div className="relative overflow-hidden">
										<img
											src={dest.image}
											alt={dest.title}
											loading="lazy"
											className="w-full h-48 md:h-52 object-cover block transition-transform duration-500 group-hover:scale-105"
										/>
										{/* Category badge */}
										<span
											className={`absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm ${
												badgeColorMap[dest.category] || 'bg-slate-700/85'
											}`}
										>
											{dest.badge}
										</span>
									</div>

									{/* Card body */}
									<div className="p-6">
										<h3 className="text-lg font-bold text-slate-900">
											{dest.title}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-slate-500">
											{dest.description}
										</p>
										<Link
											to={`/destination/${getSlug(dest.title)}`}
											className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#d66847] transition-all duration-200 hover:gap-3"
										>
											Discover more{' '}
											<span className="text-base leading-none">→</span>
										</Link>
									</div>
								</article>
							))}
						</div>
					)}
				</section>

				{/* ── Pagination ── */}
				{totalPages > 1 && (
					<div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
						<nav
							aria-label="Pagination"
							className="flex items-center justify-center gap-2"
						>
							{/* Previous */}
							<button
								type="button"
								onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
								disabled={safePage === 1}
								aria-label="Previous page"
								className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-400 transition hover:border-[#d66847] hover:text-[#d66847] disabled:cursor-not-allowed disabled:opacity-40"
							>
								‹
							</button>

							{/* Page numbers */}
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(page) => (
									<button
										key={page}
										type="button"
										onClick={() => setCurrentPage(page)}
										aria-label={`Page ${page}`}
										aria-current={safePage === page ? 'page' : undefined}
										className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
											safePage === page
												? 'bg-[#d66847] text-white shadow-md shadow-[#d66847]/30'
												: 'border border-slate-200 text-slate-500 hover:border-[#d66847] hover:text-[#d66847]'
										}`}
									>
										{page}
									</button>
								),
							)}

							{/* Next */}
							<button
								type="button"
								onClick={() =>
									setCurrentPage((p) => Math.min(totalPages, p + 1))
								}
								disabled={safePage === totalPages}
								aria-label="Next page"
								className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg text-slate-400 transition hover:border-[#d66847] hover:text-[#d66847] disabled:cursor-not-allowed disabled:opacity-40"
							>
								›
							</button>
						</nav>
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
}
