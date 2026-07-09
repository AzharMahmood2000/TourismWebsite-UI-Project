import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

import API_BASE_URL from '../api/api';

const normalizeCategory = (value) => {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
/* Helper to render SVG amenity icons dynamically */
function renderAmenityIcon(type) {
	switch (type) {
		case 'bed':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Accommodation Included">
					<path d="M2 4v16M2 8h20M2 17h20M22 4v16M2 12h20M6 8v4" />
				</svg>
			);
		case 'car':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Transfers Included">
					<rect x="3" y="11" width="18" height="8" rx="2" />
					<path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5M8 19v2M16 19v2" />
				</svg>
			);
		case 'shield':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Verified Guide & Insurance">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
					<path d="m9 11 2 2 4-4" />
				</svg>
			);
		case 'ship':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Coastal Cruise / Boat Activity">
					<path d="M2 17.5h20M4 17.5 5 11h14l1 6.5" />
					<path d="M12 11V4M12 7h4" />
				</svg>
			);
		case 'meals':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Meals Included">
					<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M12 15V3a6 6 0 0 1 6 6v6m0 0v6M18 15h-6" />
				</svg>
			);
		case 'monument':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Historical Landmarks">
					<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5V4.5z" />
				</svg>
			);
		case 'paw':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Wildlife Safari">
					<circle cx="12" cy="14" r="4" />
					<circle cx="6.5" cy="8.5" r="2" />
					<circle cx="10" cy="5.5" r="2" />
					<circle cx="14" cy="5.5" r="2" />
					<circle cx="17.5" cy="8.5" r="2" />
				</svg>
			);
		case 'binoculars':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Wildlife & Scenic Sightseeing">
					<circle cx="6" cy="12" r="4" />
					<circle cx="18" cy="12" r="4" />
					<path d="M10 12h4M12 10v4" />
					<path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
				</svg>
			);
		case 'tent':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Luxury Camping">
					<path d="m12 3 10 16H2L12 3z" />
					<path d="M12 3v16" />
					<path d="M10 14h4" />
				</svg>
			);
		case 'hiking':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Hiking & Trekking">
					<circle cx="13" cy="4" r="2" />
					<path d="m11 10 2-2 3 4M13 14v4M10 15v5M17 10v11" />
				</svg>
			);
		case 'pin':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Map Navigation Included">
					<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
					<circle cx="12" cy="10" r="3" />
				</svg>
			);
		case 'temple':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Sacred Temples & Shrines">
					<path d="M12 2s-3 6-3 10a3 3 0 0 0 6 0c0-4-3-10-3-10z" />
					<path d="M12 6s3 4 3 6M12 6s-3 4-3 6" />
					<path d="M9 16c-3 0-5 2-5 5h16c0-3-2-5-5-5" />
				</svg>
			);
		case 'bag':
			return (
				<svg key={type} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-500" title="Shopping / Souvenir Hunt">
					<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" />
					<path d="M16 10a4 4 0 0 1-8 0" />
				</svg>
			);
		default:
			return null;
	}
}

export default function TourPackagesPage() {
	const { id: paramId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const [searchQuery, setSearchQuery] = useState('');
	const [activeCategory, setActiveCategory] = useState('All Packages');
	
	// Modals & custom builder form state
	const [isCustomJourneyOpen, setIsCustomJourneyOpen] = useState(false);
	const [isBooked, setIsBooked] = useState(false);
	const [customJourneySubmitted, setCustomJourneySubmitted] = useState(false);
	const [customFormData, setCustomFormData] = useState({
		name: '',
		email: '',
		days: 5,
		budget: 'Standard',
		interests: []
	});

	const [packages, setPackages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [packageDetail, setPackageDetail] = useState(null);
	const [detailLoading, setDetailLoading] = useState(false);
	const [detailError, setDetailError] = useState(null);

	useEffect(() => {
		if (paramId) {
			const fetchDetail = async () => {
				setDetailLoading(true);
				try {
					const res = await fetch(`${API_BASE_URL}/api/packages/${paramId}`);
					if (!res.ok) throw new Error("Failed to load tour packages.");
					const data = await res.json();
					setPackageDetail(data);
				} catch (err) {
					setDetailError(err.message);
				} finally {
					setDetailLoading(false);
				}
			};
			fetchDetail();
		} else {
			const fetchList = async () => {
				setLoading(true);
				try {
					const res = await fetch(`${API_BASE_URL}/api/packages`);
					if (!res.ok) throw new Error("Failed to load tour packages.");
					const data = await res.json();
					setPackages(data);
				} catch (err) {
					setError(err.message);
				} finally {
					setLoading(false);
				}
			};
			fetchList();
		}
	}, [paramId]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [paramId]);

	// Live filtering (only applicable in list view)
	const filteredPackages = packages.filter((pkg) => {
		const matchesSearch =
			(pkg.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
			(pkg.description || '').toLowerCase().includes(searchQuery.toLowerCase());
			
		const matchesCategory =
			activeCategory === 'All Packages' ||
			activeCategory === 'All' ||
			normalizeCategory(pkg.category || "") === activeCategory;
			
		return matchesSearch && matchesCategory;
	});

	const categories = [
		"All Packages",
		...new Map(
			packages
				.map((pkg) => pkg.category)
				.filter(Boolean)
				.map((cat) => [cat.trim().toLowerCase(), normalizeCategory(cat)])
		).values()
	];

	// Handle Booking Form in Detail View
	const handleBookSubmit = (e) => {
		e.preventDefault();
		setIsBooked(true);
		setTimeout(() => {
			setIsBooked(false);
			navigate('/tour-packages');
		}, 3000);
	};

	// Handle custom journey form
	const handleCustomSubmit = (e) => {
		e.preventDefault();
		setCustomJourneySubmitted(true);
		setTimeout(() => {
			setCustomJourneySubmitted(false);
			setIsCustomJourneyOpen(false);
			setCustomFormData({ name: '', email: '', days: 5, budget: 'Standard', interests: [] });
		}, 3500);
	};

	const handleInterestToggle = (interest) => {
		setCustomFormData(prev => {
			const activeInterests = prev.interests.includes(interest)
				? prev.interests.filter(i => i !== interest)
				: [...prev.interests, interest];
			return { ...prev, interests: activeInterests };
		});
	};

	/* ═══════════════════════════════════════════════════════
	   2. DEFAULT LIST VIEW
	   If URL path is /tour-packages and no paramId matches
	   ═══════════════════════════════════════════════════════ */
	return (
		<div className="min-h-screen bg-[#fffaf8] relative w-full block">
			<Navbar />

			{/* Hero Intro section */}
			<section className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
				<div className="max-w-3xl">
					<h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
						Curated Travel Packages
					</h1>
					<p className="mt-4 text-sm leading-relaxed text-slate-500 max-w-2xl">
						Explore our handpicked native itineraries designed for safe, comfortable, and
						unforgettable Sri Lankan journeys. Experience the soul of the island through expert local
						curation.
					</p>
				</div>
			</section>

			{/* Search & filters controls */}
			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-slate-100">
					
					{/* Left: Search input field */}
					<div className="flex flex-col max-w-sm w-full">
						<span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
							Search Journeys
						</span>
						<div className="relative flex items-center">
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								className="w-4 h-4 text-slate-400 absolute left-0"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.3-4.3" />
							</svg>
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search packages by keywords..."
								className="w-full pl-7 pb-2 border-b border-slate-200 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d66847] transition-colors bg-transparent"
							/>
						</div>
					</div>

					{/* Right: Category filter pills */}
					<div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setActiveCategory(cat)}
								className={`rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
									activeCategory === cat
										? 'bg-[#d66847] text-white shadow-md'
										: 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-slate-200'
								}`}
							>
								{cat}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* ════════════════════════════════════════════
			    PACKAGE CARDS GRID CONTAINER
			    Refactored dynamic routing event loop & buttons container
			    ════════════════════════════════════════════ */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="py-24 text-center">
                        <p className="text-lg font-medium text-slate-400">Loading tour packages...</p>
                    </div>
                ) : error ? (
                    <div className="py-24 text-center">
                        <p className="text-lg font-medium text-red-500">{error}</p>
                    </div>
                ) : filteredPackages.length === 0 ? (
					<div className="py-24 text-center">
						<p className="text-lg font-medium text-slate-400">
							No tour packages available.
						</p>
					</div>
				) : (
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{filteredPackages.map((pkg) => (
							<article
								key={pkg.id}
								className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] border border-slate-100 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] flex flex-col h-full"
							>
								{/* Card Image area */}
								<div className="relative overflow-hidden shrink-0">
									<img
										src={(pkg.coverImage || pkg.image)?.startsWith('http') ? (pkg.coverImage || pkg.image) : `${API_BASE_URL}${(pkg.coverImage || pkg.image)?.startsWith('/') ? '' : '/'}${pkg.coverImage || pkg.image}`}
										alt={pkg.title}
										loading="lazy"
										className="w-full h-48 md:h-52 object-cover block transition-transform duration-500 group-hover:scale-105"
									/>
								</div>

								{/* Card Body content */}
								<div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#d66847] transition-colors duration-250">
                                            {pkg.title}
                                        </h3>
                                        {pkg.category && <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{pkg.category}</span>}
                                    </div>
									
									<p className="mt-2.5 text-xs leading-relaxed text-slate-500 flex-1">
										{pkg.shortDescription || pkg.description?.substring(0, 75) + '...'}
									</p>

									{/* Duration Row */}
									<div className="mt-4 flex flex-wrap gap-4 items-center border-t border-slate-50/50 pt-4">
										<div className="flex items-center text-slate-500">
											<svg
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-4 h-4 text-slate-400"
											>
												<circle cx="12" cy="12" r="10" />
												<polyline points="12 6 12 12 16 14" />
											</svg>
											<span className="text-xs font-semibold ml-1.5">{pkg.duration}</span>
										</div>
                                        {pkg.location && (
                                            <div className="flex items-center text-slate-500 text-xs font-semibold">
                                                📍 {pkg.location}
                                            </div>
                                        )}
									</div>

									{/* Bottom Divider */}
									<div className="my-5 border-t border-slate-100" />

									{/* Footer Pricing & Button Row */}
									<div className="flex items-center justify-between mt-auto">
										<div className="flex flex-col">
											<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
												From
											</span>
											<span className="text-[15px] font-extrabold text-[#d66847] mt-1.5 whitespace-nowrap">
												${pkg.pricePerPerson || pkg.price} <span className="text-xs font-medium text-slate-500">/ person</span>
											</span>
										</div>

										<Link
											to={`/tour-packages/${pkg.slug}`}
											className="px-5 py-2.5 bg-[#1e1e1e] hover:bg-[#d66847] text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-md active:scale-95 whitespace-nowrap"
										>
											View Details
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				)}
			</section>

			{/* Custom itinerary builder CTA section */}
			<section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
				<div className="bg-[#fdf0ea] py-16 px-6 sm:px-12 lg:px-20 text-center rounded-[2rem] border border-[#fce4d6]/60 shadow-sm">
					<h2 className="text-2xl sm:text-3xl font-extrabold text-[#2d201c] tracking-tight">
						Can't find what you're looking for?
					</h2>
					<p className="mt-3 text-sm text-[#7f645a] max-w-xl mx-auto leading-relaxed">
						Our travel specialists can design a custom itinerary tailored specifically to your
						preferences, budget, and pace.
					</p>
					<button
						type="button"
						onClick={() => setIsCustomJourneyOpen(true)}
						className="mt-8 inline-block rounded bg-[#8f3316] hover:bg-[#72270f] px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest text-white shadow-md hover:shadow-lg transition-all active:scale-95"
					>
						Design My Custom Journey
					</button>
				</div>
			</section>

			{/* ════════════════════════════════════════════
			    CUSTOM JOURNEY DESIGNER MODAL
			    ════════════════════════════════════════════ */}
			{isCustomJourneyOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300"
					onClick={() => setIsCustomJourneyOpen(false)}
				>
					<div
						className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl p-8 md:p-10 transform transition-all duration-300 scale-100"
						style={{ animation: 'zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							onClick={() => setIsCustomJourneyOpen(false)}
							className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
							aria-label="Close"
						>
							✕
						</button>

						<div className="text-center">
							<span className="text-[2rem]">🎨</span>
							<h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-3">
								Design Your Custom Itinerary
							</h3>
							<p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto">
								Tell us about your dream Sri Lankan vacation, and we’ll customize the perfect trip.
							</p>
						</div>

						{customJourneySubmitted ? (
							<div className="my-10 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold py-8 px-6 rounded-2xl text-center shadow-sm">
								<span className="text-2xl block mb-2">🎉</span>
								<h4 className="font-extrabold text-sm mb-1">Itinerary Request Received!</h4>
								<p className="text-xs text-emerald-600 font-medium">Our travel designers are working on your request. Check your inbox soon!</p>
							</div>
						) : (
							<form onSubmit={handleCustomSubmit} className="mt-8 space-y-5">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
											Your Name
										</label>
										<input
											type="text"
											required
											value={customFormData.name}
											onChange={(e) => setCustomFormData({ ...customFormData, name: e.target.value })}
											placeholder="Jane Doe"
											className="w-full rounded border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#d66847] focus:outline-none transition-colors"
										/>
									</div>

									<div>
										<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
											Email Address
										</label>
										<input
											type="email"
											required
											value={customFormData.email}
											onChange={(e) => setCustomFormData({ ...customFormData, email: e.target.value })}
											placeholder="jane@example.com"
											className="w-full rounded border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#d66847] focus:outline-none transition-colors"
										/>
									</div>
								</div>

								{/* Duration Range Slider */}
								<div>
									<div className="flex justify-between items-center mb-1.5">
										<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
											Trip Duration
										</label>
										<span className="text-xs font-extrabold text-[#d66847]">{customFormData.days} Days</span>
									</div>
									<input
										type="range"
										min="3"
										max="21"
										value={customFormData.days}
										onChange={(e) => setCustomFormData({ ...customFormData, days: parseInt(e.target.value) })}
										className="w-full accent-[#d66847]"
									/>
								</div>

								{/* Budget Choices */}
								<div>
									<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
										Preferred Budget Level
									</label>
									<div className="grid grid-cols-3 gap-2.5">
										{['Budget-Friendly', 'Standard', 'Premium Luxury'].map((level) => (
											<button
												key={level}
												type="button"
												onClick={() => setCustomFormData({ ...customFormData, budget: level })}
												className={`rounded border py-2.5 text-[11px] font-bold transition-all ${
													customFormData.budget === level
														? 'border-[#d66847] bg-[#d66847]/5 text-[#d66847]'
														: 'border-slate-200 hover:border-slate-300 text-slate-600'
												}`}
											>
												{level}
											</button>
										))}
									</div>
								</div>

								{/* Holiday interests */}
								<div>
									<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
										Select Interests
									</label>
									<div className="flex flex-wrap gap-2">
										{['Beaches', 'Hiking', 'Wild Safaris', 'Historical Temples', 'Local Cuisine', 'Surfing'].map((interest) => {
											const isSelected = customFormData.interests.includes(interest);
											return (
												<button
													key={interest}
													type="button"
													onClick={() => handleInterestToggle(interest)}
													className={`rounded-full px-3.5 py-1.5 text-[10px] font-semibold tracking-wider transition-all ${
														isSelected
															? 'bg-[#1b1b1b] text-white'
															: 'bg-slate-100 hover:bg-slate-200 text-slate-600'
													}`}
												>
													{isSelected ? '✓ ' : ''}{interest}
												</button>
											);
										})}
									</div>
								</div>

								{/* Submit CTA */}
								<div className="pt-2">
									<button
										type="submit"
										className="w-full rounded bg-[#8f3316] hover:bg-[#72270f] py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all active:scale-95"
									>
										Build Custom Itinerary
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			)}

			<style dangerouslySetInnerHTML={{__html: `
				@keyframes zoomIn {
					from { opacity: 0; transform: scale(0.96); }
					to { opacity: 1; transform: scale(1); }
				}
			`}} />

			<Footer />
		</div>
	);
}
