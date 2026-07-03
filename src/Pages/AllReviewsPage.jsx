import { useState, useMemo } from 'react';

/* ═══════════════════════════════════════════════════════
   Mock Data — Curated Product Reviews
   ═══════════════════════════════════════════════════════ */
const mockReviews = [
	{
		id: 1,
		reviewerName: 'Sarah Jenkins',
		rating: 5,
		date: '2026-06-28',
		reviewTitle: 'Exceeded my expectations!',
		reviewComment: 'The build quality is exceptional, and it feels incredibly premium. Shipping was super fast too. Highly recommended!',
		isVerifiedBuyer: true,
	},
	{
		id: 2,
		reviewerName: 'Michael Chen',
		rating: 4,
		date: '2026-06-25',
		reviewTitle: 'Solid performance, minor nitpick',
		reviewComment: 'Really pleased with this purchase. The battery life is stellar. My only issue is that the charging cable is a bit short.',
		isVerifiedBuyer: true,
	},
	{
		id: 3,
		reviewerName: 'Elena Rostova',
		rating: 5,
		date: '2026-06-22',
		reviewTitle: 'Absolutely beautiful design',
		reviewComment: 'Minimalist, sleek, and works exactly as described. It fits perfectly on my desk. Definitely worth the price.',
		isVerifiedBuyer: false,
	},
	{
		id: 4,
		reviewerName: 'David K.',
		rating: 3,
		date: '2026-06-18',
		reviewTitle: 'Good but has room for improvement',
		reviewComment: 'It does the job, but the setup process was slightly frustrating. Once configured, it operates smoothly.',
		isVerifiedBuyer: true,
	},
	{
		id: 5,
		reviewerName: 'Aisha Rahman',
		rating: 5,
		date: '2026-06-14',
		reviewTitle: 'Best customer service ever',
		reviewComment: 'I had an issue with sizing, and they exchanged it immediately without any hassle. The quality of materials is top-tier.',
		isVerifiedBuyer: true,
	},
	{
		id: 6,
		reviewerName: 'Marcus Miller',
		rating: 2,
		date: '2026-06-10',
		reviewTitle: 'Disappointed with the durability',
		reviewComment: 'Showed signs of wear and tear after just a week of normal usage. Hoping customer support can help with a replacement.',
		isVerifiedBuyer: false,
	},
	{
		id: 7,
		reviewerName: 'Chuyi Wang',
		rating: 4,
		date: '2026-06-05',
		reviewTitle: 'Very solid and reliable',
		reviewComment: 'I have been using this daily for a month now. Extremely stable and performant. Highly recommended for professionals.',
		isVerifiedBuyer: true,
	},
	{
		id: 8,
		reviewerName: 'Olivia Smith',
		rating: 5,
		date: '2026-06-01',
		reviewTitle: 'Perfect in every way',
		reviewComment: 'Everything from the unboxing experience to the daily operation is flawless. Will buy more as gifts!',
		isVerifiedBuyer: true,
	},
];

/* ═══════════════════════════════════════════════════════
   Star Icons Renderer Helper
   ═══════════════════════════════════════════════════════ */
function StarRating({ rating, starSize = "w-4 h-4" }) {
	return (
		<div className="flex items-center gap-0.5 text-amber-500">
			{[1, 2, 3, 4, 5].map((star) => (
				<svg
					key={star}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className={`${starSize} ${star <= rating ? 'opacity-100' : 'text-slate-200'}`}
				>
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			))}
		</div>
	);
}

/* ═══════════════════════════════════════════════════════
   Main Component: AllReviewsPage
   ═══════════════════════════════════════════════════════ */
export default function AllReviewsPage() {
	// Sort state: 'newest' | 'highest' | 'lowest'
	const [sortBy, setSortBy] = useState('newest');
	// Filter state: verified purchases only
	const [verifiedOnly, setVerifiedOnly] = useState(false);
	// Loaded reviews count state (pagination)
	const [visibleCount, setVisibleCount] = useState(3);

	/* ─── 1. Calculating dynamic rating summaries based on mock reviews ─── */
	const { averageRating, totalCount, starsDistribution } = useMemo(() => {
		const total = mockReviews.length;
		if (total === 0) {
			return { averageRating: 0, totalCount: 0, starsDistribution: {} };
		}
		const sum = mockReviews.reduce((acc, curr) => acc + curr.rating, 0);
		const avg = (sum / total).toFixed(1);

		// Initialize counters
		const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
		mockReviews.forEach((r) => {
			if (counts[r.rating] !== undefined) {
				counts[r.rating] += 1;
			}
		});

		// Calculate percentages
		const distribution = {};
		for (let s = 5; s >= 1; s--) {
			distribution[s] = {
				count: counts[s],
				percentage: Math.round((counts[s] / total) * 100),
			};
		}

		return {
			averageRating: parseFloat(avg),
			totalCount: total,
			starsDistribution: distribution,
		};
	}, []);

	/* ─── 2. Filtering & Sorting Local Data States ─── */
	const filteredAndSortedReviews = useMemo(() => {
		let list = [...mockReviews];

		// Filter
		if (verifiedOnly) {
			list = list.filter((r) => r.isVerifiedBuyer);
		}

		// Sort
		list.sort((a, b) => {
			if (sortBy === 'highest') {
				return b.rating - a.rating;
			}
			if (sortBy === 'lowest') {
				return a.rating - b.rating;
			}
			// Default: newest date first
			return new Date(b.date) - new Date(a.date);
		});

		return list;
	}, [sortBy, verifiedOnly]);

	const totalFiltered = filteredAndSortedReviews.length;
	const paginatedReviews = filteredAndSortedReviews.slice(0, visibleCount);

	const handleLoadMore = () => {
		setVisibleCount((prev) => Math.min(prev + 3, totalFiltered));
	};

	return (
		<div className="min-h-screen bg-[#fafafa] font-sans antialiased text-slate-800">
			{/* Container wrapper */}
			<div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
				
				{/* Page Header */}
				<header className="border-b border-slate-200 pb-8 mb-12">
					<span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Customer Feedback</span>
					<h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">Product Reviews</h1>
					<p className="text-sm text-slate-500 mt-2 font-medium">Read honest experiences shared by our community of verified travellers.</p>
				</header>

				{/* ════════════════════════════════════════════
				    RATING SUMMARY BOX (TOP PANEL)
				    ════════════════════════════════════════════ */}
				<section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-8 md:gap-12 items-center mb-10">
					
					{/* Left column: Avg score */}
					<div className="text-center md:text-left flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-12">
						<span className="text-6xl font-black text-slate-900 tracking-tight">{averageRating}</span>
						<div className="mt-3">
							<StarRating rating={Math.round(averageRating)} starSize="w-5.5 h-5.5" />
						</div>
						<span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-2.5">
							Based on {totalCount} reviews
						</span>
					</div>

					{/* Right column: Distribution bars */}
					<div className="space-y-3">
						{Object.entries(starsDistribution)
							.reverse()
							.map(([stars, data]) => (
								<div key={stars} className="flex items-center gap-4 text-xs font-semibold text-slate-600">
									<span className="w-12 text-right tracking-wide">{stars} Stars</span>
									
									{/* Progress bar container */}
									<div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
										<div
											className="h-full bg-slate-800 rounded-full transition-all duration-500"
											style={{ width: `${data.percentage}%` }}
										/>
									</div>

									{/* Count percentage */}
									<span className="w-10 text-right text-slate-400 font-bold">{data.percentage}%</span>
								</div>
							))}
					</div>
				</section>

				{/* ════════════════════════════════════════════
				    FILTER & SORT CONTROLS (MIDDLE SECTION)
				    ════════════════════════════════════════════ */}
				<section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
					{/* Left: Verified buyer toggle */}
					<div className="flex items-center">
						<label htmlFor="verified-filter" className="inline-flex items-center cursor-pointer group select-none">
							<input
								type="checkbox"
								id="verified-filter"
								checked={verifiedOnly}
								onChange={(e) => {
									setVerifiedOnly(e.target.checked);
									setVisibleCount(3); // Reset visible count to initial
								}}
								className="sr-only peer"
							/>
							<span className="flex h-5 w-5 items-center justify-center rounded border-2 border-slate-300 bg-white transition-all duration-200 peer-checked:border-slate-800 peer-checked:bg-slate-800 group-hover:border-slate-800">
								{verifiedOnly && (
									<svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 12 10">
										<path d="M1 5l3 4 7-8" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								)}
							</span>
							<span className="ml-3 text-xs font-bold uppercase tracking-wider text-slate-600 group-hover:text-slate-800 transition-colors">
								Verified Travellers Only
							</span>
						</label>
					</div>

					{/* Right: Sort Selection */}
					<div className="flex items-center gap-3">
						<label htmlFor="reviews-sort" className="text-xs font-bold uppercase tracking-wider text-slate-400">
							Sort By
						</label>
						<select
							id="reviews-sort"
							value={sortBy}
							onChange={(e) => {
								setSortBy(e.target.value);
								setVisibleCount(3); // Reset visible count on sorting change
							}}
							className="border border-slate-200 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700 focus:border-slate-800 focus:outline-none transition-colors shadow-sm"
						>
							<option value="newest">Newest First</option>
							<option value="highest">Highest Rating</option>
							<option value="lowest">Lowest Rating</option>
						</select>
					</div>
				</section>

				{/* ════════════════════════════════════════════
				    REVIEWS LIST (MAIN GRID VIEW)
				    ════════════════════════════════════════════ */}
				<section className="space-y-6">
					{paginatedReviews.length === 0 ? (
						<div className="text-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm">
							<p className="text-sm font-medium text-slate-400">No reviews found matching the filters.</p>
						</div>
					) : (
						paginatedReviews.map((review) => (
							<article
								key={review.id}
								className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col transition-all duration-300 hover:shadow-md"
							>
								{/* Top row metadata info */}
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
									<div className="flex items-center gap-3">
										<span className="text-sm font-bold text-slate-900">{review.reviewerName}</span>
										{review.isVerifiedBuyer && (
											<span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider">
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
													<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
												</svg>
												Verified Traveller
											</span>
										)}
									</div>
									<span className="text-xs text-slate-400 font-semibold">{review.date}</span>
								</div>

								{/* Star rating alignment */}
								<div className="mt-3">
									<StarRating rating={review.rating} />
								</div>

								{/* Review Content */}
								<div className="mt-4">
									<h3 className="text-sm font-bold text-slate-900">{review.reviewTitle}</h3>
									<p className="text-sm text-slate-500 leading-relaxed mt-2 font-normal">
										{review.reviewComment}
									</p>
								</div>
							</article>
						))
					)}
				</section>

				{/* ════════════════════════════════════════════
				    LOAD MORE FUNCTIONALITY (BOTTOM ACTION)
				    ════════════════════════════════════════════ */}
				{totalFiltered > 0 && (
					<footer className="mt-12 text-center">
						<button
							type="button"
							disabled={visibleCount >= totalFiltered}
							onClick={handleLoadMore}
							className={`px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 border shadow-sm ${
								visibleCount >= totalFiltered
									? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
									: 'bg-slate-900 border-transparent hover:bg-slate-800 text-white active:scale-95'
							}`}
						>
							{visibleCount >= totalFiltered ? 'All reviews loaded' : 'Load More Reviews'}
						</button>
						{visibleCount < totalFiltered && (
							<p className="text-[10px] text-slate-400 mt-3 font-semibold uppercase tracking-wider">
								Showing {visibleCount} of {totalFiltered} Reviews
							</p>
						)}
					</footer>
				)}

			</div>
		</div>
	);
}
