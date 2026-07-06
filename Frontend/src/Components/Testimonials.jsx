import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultReviews = [
	{
		quote:
			'The Ella trip was magical. Travelarch handled everything from the luxury train tickets to the boutique villa booking. Highly recommend!',
		name: 'Amara Perera',
		role: 'Verified Explorer',
	},
	{
		quote:
			'Yala safari was breathtaking. We saw three leopards! The guide provided by Travelarch was extremely knowledgeable.',
		name: 'James Wilson',
		role: 'Wildlife Photographer',
	},
	{
		quote:
			'The attention to detail in our cultural tour of Sigiriya and Kandy was impressive. Every accommodation was a gem.',
		name: 'Sophie Chen',
		role: 'Cultural Enthusiast',
	},
];

function Stars() {
	return <div className="text-[#d66847]">★★★★★</div>;
}

export default function Testimonials() {
	const navigate = useNavigate();
	const [reviewsList, setReviewsList] = useState(defaultReviews);

	useEffect(() => {
		const stored = localStorage.getItem('gamanaya_reviews');
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) {
					// Append custom user reviews to the top of the display grid list
					setReviewsList([...parsed, ...defaultReviews]);
				}
			} catch (e) {
				console.error("Failed to parse reviews from localStorage:", e);
			}
		}
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
							onClick={() => navigate('/destinations')}
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

				<div className="mt-10 grid gap-6 lg:grid-cols-3">
					{reviewsList.map((review, idx) => (
						<article key={`${review.name}-${idx}`} className="rounded-2xl border border-white bg-white p-6 shadow-sm">
							<Stars />
							<p className="mt-4 text-sm leading-7 text-slate-600">“{review.quote}”</p>
							<div className="mt-6 flex items-center gap-3">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d66847]/10 text-sm font-bold text-[#d66847]">
									{review.name.slice(0, 1).toUpperCase()}
								</div>
								<div>
									<p className="font-semibold text-slate-900">{review.name}</p>
									<p className="text-xs text-slate-500">{review.role}</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
