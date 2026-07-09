import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Stars({ rating }) {
	return (
		<div className="flex text-[#d66847]">
			{[1, 2, 3, 4, 5].map((star) => (
				<span key={star} className={star <= rating ? "text-[#d66847]" : "text-slate-200"}>★</span>
			))}
		</div>
	);
}

export default function Testimonials() {
	const navigate = useNavigate();
	const [reviewsList, setReviewsList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				setLoading(true);
				const res = await fetch("http://localhost:5000/api/reviews");
				if (!res.ok) throw new Error("Failed");
				const data = await res.json();
				setReviewsList(data);
			} catch (err) {
				setError("Failed to load reviews.");
			} finally {
				setLoading(false);
			}
		};
		fetchReviews();
	}, []);

	return (
		<section className="bg-[#fdf4f0]">
			<div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-2xl font-black italic text-slate-900">What people say?</p>
						<p className="mt-2 text-sm text-slate-600">Community reviews from fellow explorers.</p>
					</div>
					<div className="flex gap-3">
						<button
							onClick={() => navigate('/all-reviews')}
							className="rounded-full border border-[#d66847]/25 bg-white px-5 py-2 text-sm font-semibold text-[#a65a3c] transition hover:border-[#d66847] hover:text-[#d66847]"
						>
							Explore All
						</button>
						<button
							onClick={() => navigate('/write-review')}
							className="rounded-full border border-[#d66847]/25 bg-white px-5 py-2 text-sm font-semibold text-[#a65a3c] transition hover:border-[#d66847] hover:text-[#d66847]"
						>
							Write a Review
						</button>
					</div>
				</div>

				<div className="mt-10">
					{loading ? (
						<p className="text-center text-slate-500 py-10 font-medium">Loading reviews...</p>
					) : error ? (
						<p className="text-center text-red-500 py-10 font-medium">{error}</p>
					) : reviewsList.length === 0 ? (
						<p className="text-center text-slate-500 py-10 font-medium">No approved reviews yet.</p>
					) : (
						<div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
							{reviewsList.map((review) => {
								const reviewerName = review.reviewerName || review.user?.name || "Anonymous Traveler";
								const rating = review.rating || 0;
								const reviewTitle = review.reviewTitle || "Travel Review";
								const reviewComment = review.reviewComment || review.comment || "";
								const journey = review.journey || "Explorer";

								return (
									<article key={review._id} className="min-w-[320px] sm:min-w-[360px] md:min-w-[400px] snap-start shrink-0 rounded-2xl border border-white bg-white p-6 shadow-sm flex flex-col justify-between">
										<div>
											<div className="flex justify-between items-center">
												<Stars rating={rating} />
												{review.createdAt && (
													<span className="text-xs text-slate-400 font-semibold">{new Date(review.createdAt).toLocaleDateString()}</span>
												)}
											</div>
											<h3 className="mt-4 font-bold text-slate-800 text-sm">{reviewTitle}</h3>
											<p className="mt-2 text-sm leading-7 text-slate-600 line-clamp-4">“{reviewComment}”</p>
										</div>
										<div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
											<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d66847]/10 text-sm font-bold text-[#d66847]">
												{reviewerName.slice(0, 1).toUpperCase()}
											</div>
											<div>
												<p className="font-semibold text-slate-900 line-clamp-1">{reviewerName}</p>
												<p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1 line-clamp-1">{journey}</p>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
