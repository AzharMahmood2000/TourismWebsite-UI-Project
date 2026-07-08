import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../api/api';

export default function PopularDestinations() {
	const [destinations, setDestinations] = useState([]);
	const [loading, setLoading] = useState(true);
	
	const getImageSrc = (img) => {
		if (!img || typeof img !== 'string') return '';
		if (img.startsWith('http') || img.startsWith('data:')) return img;
		return `${API_BASE_URL}${img.startsWith('/') ? img : `/${img}`}`;
	};

	useEffect(() => {
		const fetchDestinations = async () => {
			try {
				setLoading(true);
				const res = await fetch(`${API_BASE_URL}/api/destinations`);
				const data = await res.json();
				if (res.ok) {
					// Extract only the destinations flagged to show on home and inherently active
					const filtered = data.filter((d) => d.isPopular === true);
					setDestinations(filtered.slice(0, 5));
				}
			} catch (error) {
				console.error('Failed to fetch destinations:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchDestinations();
	}, []);

	return (
		<section id="destinations" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
			<div className="mb-10 flex items-end justify-between gap-4">
				<div>
					<p className="text-xs font-bold uppercase tracking-[0.35em] text-[#d66847]">
						Unforgettable Experiences
					</p>
					<h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Popular Destinations</h2>
				</div>
				<Link to="/destinations" className="text-sm font-semibold text-slate-500 transition hover:text-[#d66847]">
					View All →
				</Link>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
				{loading ? (
					<p className="col-span-full text-center text-slate-500 font-semibold py-8">Loading popular destinations...</p>
				) : destinations.map((destination) => {
					return (
						<Link
							key={destination._id}
							to={`/destination/${destination._id}`}
							aria-label={`View details for ${destination.title}`}
							className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)] cursor-pointer block"
						>
							<article>
								<div className="relative h-72 overflow-hidden">
									<img
										src={getImageSrc(destination.image)}
										alt={destination.title}
										className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
									/>
									<span className="absolute bottom-4 left-4 rounded-full bg-[#d66847]/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
										{destination.category}
									</span>
								</div>
								<div className="p-4">
									<h3 className="font-semibold text-slate-900 group-hover:text-[#d66847] transition-colors truncate">{destination.title}</h3>
									<p className="mt-1 text-sm text-slate-500">{destination.region}</p>
								</div>
							</article>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
