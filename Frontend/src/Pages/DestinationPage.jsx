import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

/* ═══════════════════════════════════════════════════════
   Destination Data — 18 entries across 5 categories
   All image paths point to /assets/images/<clean-name>
   ═══════════════════════════════════════════════════════ */
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
import API_BASE_URL from '../api/api';

/* ═══════════════════════════════════════════════════════
   DestinationPage Component
   ═══════════════════════════════════════════════════════ */
export default function DestinationPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [allDestinations, setAllDestinations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const categoryQuery = searchParams.get('category');
	
	// Normalize and match category from query parameter case-insensitively
	const activeCategory = (() => {
		if (!categoryQuery) return 'All';
		const matched = categories.find(
			(cat) => cat.toLowerCase() === categoryQuery.toLowerCase()
		);
		return matched || 'All';
	})();

	useEffect(() => {
		const fetchDestinations = async () => {
			try {
				setLoading(true);
				const res = await fetch(`${API_BASE_URL}/api/destinations`);
				if (!res.ok) throw new Error('Failed to fetch destinations');
				const data = await res.json();
				setAllDestinations(data.filter((d) => d.isActive !== false));
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchDestinations();
	}, []);

	/* Scroll to top on activeCategory change */
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [activeCategory]);

	/* ─── filtering ─── */
	const filtered =
		activeCategory === 'All'
			? allDestinations
			: allDestinations.filter((d) => d.category && d.category.toLowerCase() === activeCategory.toLowerCase());

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

	const getImageSrc = (img) => {
		if (!img || typeof img !== 'string') return '';
		if (img.startsWith('http') || img.startsWith('data:')) return img;
		return `${API_BASE_URL}${img.startsWith('/') ? img : `/${img}`}`;
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
					{loading ? (
						<div className="py-24 text-center">
							<p className="text-lg font-medium text-slate-400">
								Loading destinations...
							</p>
						</div>
					) : error ? (
						<div className="py-24 text-center">
							<p className="text-lg font-medium text-red-500">
								{error}
							</p>
						</div>
					) : paginated.length === 0 ? (
						<div className="py-24 text-center">
							<p className="text-lg font-medium text-slate-400">
								No destinations found in this category yet.
							</p>
						</div>
					) : (
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{paginated.map((dest) => (
								<article
									key={dest._id || dest.id}
									className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
								>
									{/* Card image */}
									<div className="relative overflow-hidden">
										<img
											src={getImageSrc(dest.image)}
											alt={dest.title}
											loading="lazy"
											className="w-full h-48 md:h-52 object-cover block transition-transform duration-500 group-hover:scale-105"
										/>
										{/* Category badge */}
										<span
											className={`absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm ${
												badgeColorMap[dest.category] || 'bg-[#d66847]/90'
											}`}
										>
											{dest.category}
										</span>
									</div>

									{/* Card body */}
									<div className="p-6">
										<h3 className="text-lg font-bold text-slate-900">
											{dest.title}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-3">
											{dest.description}
										</p>
										<Link
											to={`/destination/${dest._id}`}
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
