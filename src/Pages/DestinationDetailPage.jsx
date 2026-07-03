import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { destinationRegistry } from '../data';

export default function DestinationDetailPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [activeTab, setActiveTab] = useState('Overview');
	const [isExpanded, setIsExpanded] = useState(false);

	const activePlace = destinationRegistry.find(place => place.id.toLowerCase() === id?.toLowerCase());
	const currentDestination = activePlace || destinationRegistry[0];

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [id]);

	const handleBookingClick = () => {
		navigate('/booking', {
			state: {
				title: currentDestination.title.toUpperCase(),
				price: 'Rs. 25,000',
				location: currentDestination.region
			}
		});
	};

	const tabs = ['Overview', "What's included", 'FAQs'];

	const [openFaq, setOpenFaq] = useState(null);

	const facilities = [
		{ name: 'Virtual Reality (VR)', icon: '🕶️' },
		{ name: 'Tour Guide', icon: '👤' },
		{ name: 'Free Wifi', icon: '📶' },
		{ name: '06:00 - 18:00', icon: '⏰' },
		{ name: 'Lounge bar & cafe', icon: '☕' },
		{ name: 'Wide parking', icon: '🚗' },
	];

	const faqs = [
		{
			question: "What is the best time of year to visit?",
			answer: `The best time to visit ${currentDestination.title} is during the dry season, which is generally from ${currentDestination.bestTime}. This offers optimal weather conditions for sightseeing and outdoor activities.`
		},
		{
			question: "Is a professional tour guide recommended?",
			answer: "Yes, hiring a certified local guide is highly recommended to fully appreciate the historical significance, cultural context, or ecological diversity of the site. They also assist with navigation."
		},
		{
			question: "Are entry passes or tickets included in the package?",
			answer: "Individual entry permits are required at the gate. If you book an All-inclusive Tour Package through Gamanaya, all entry tickets and site permits will be pre-purchased and managed by your coordinator."
		},
		{
			question: "What safety or health guidelines should I follow?",
			answer: "We advise staying hydrated, wearing sun protection, and dressing respectfully if visiting religious or sacred cultural landmarks. Always follow guidelines provided by local naturalists during wildlife trails."
		}
	];

	return (
		<div className="min-h-screen bg-white relative w-full block">
			<Navbar />

			<section
				className="relative w-full h-64 md:h-[600px] lg:h-[700px] bg-cover bg-center bg-no-repeat transition-all duration-1000"
				style={{ backgroundImage: `url('${currentDestination.dayBgUrl}')` }}
			>
				<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />

				<div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="absolute bottom-8 left-4 right-4 md:bottom-16 md:left-8 md:right-auto z-20 w-full max-w-[92%] md:max-w-sm rounded-3xl border border-white/20 bg-white/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300">
						
						<div className="flex items-start justify-between gap-4">
							<h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
								{currentDestination.title}
							</h1>
							<button
								type="button"
								className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-[#d66847] hover:text-white"
								aria-label="Share destination"
							>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4.5 w-4.5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
								</svg>
							</button>
						</div>

						<p className="mt-2 text-xs leading-relaxed text-slate-500">
							{currentDestination.tagline}
						</p>

						<div className="my-4 border-t border-slate-100" />

						<div className="space-y-2.5">
							<div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
								<span className="text-base text-[#d66847]" aria-hidden="true">📍</span>
								<span>{currentDestination.region}, Sri Lanka</span>
							</div>

							<div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
								<span className="text-base text-amber-500" aria-hidden="true">☀️</span>
								<span>Best Time: {currentDestination.bestTime}</span>
							</div>

							<div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
								<span className="text-base text-[#d66847]" aria-hidden="true">🛡️</span>
								<span>Guided Expedition Available</span>
							</div>
						</div>

						<div className="my-4 border-t border-slate-100" />

						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
									Price
								</p>
								<p className="text-xl font-black text-slate-900">
									Rs. 25,000 <span className="text-[11px] font-normal text-slate-400">/Person</span>
								</p>
							</div>
							<button
								type="button"
								onClick={handleBookingClick}
								className="rounded-full bg-[#d66847] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-[#d66847]/30 transition-all hover:bg-[#c55b3b] hover:shadow-xl active:scale-95"
							>
								Booking Now
							</button>
						</div>
					</div>
				</div>
			</section>

			<main className="mx-auto max-w-7xl px-4 py-8 md:py-16 sm:px-6 lg:px-8 bg-white">
				<div className="grid gap-8 md:gap-12 lg:grid-cols-[1.8fr_1fr]">
					<div className="space-y-10">
						{/* Tab navigation bar - distributed cleanly with active line indicator */}
						<div className="flex items-center gap-8 md:gap-12 border-b border-slate-100 pb-4 overflow-x-auto scrollbar-none">
							{tabs.map((tab) => {
								const isActive = activeTab === tab;
								return (
									<button
										key={tab}
										type="button"
										onClick={() => setActiveTab(tab)}
										className={`relative pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300 ${
											isActive ? 'text-[#d66847]' : 'text-slate-400 hover:text-slate-700'
										}`}
									>
										{tab}
										{isActive && (
											<span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#d66847] rounded-full" />
										)}
									</button>
								);
							})}
						</div>

						{/* Conditionally rendered content panels */}
						{activeTab === 'Overview' && (
							<div className="space-y-10 animate-fade-in">
								{/* About section */}
								<div className="space-y-4">
									<h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
										About This Destination
									</h2>

									<div className="relative">
										<p className="text-sm leading-relaxed text-slate-600 font-normal">
											{currentDestination.description}
										</p>

										{isExpanded && (
											<div className="mt-4 pt-4 border-t border-slate-100">
												<h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">Key Highlights:</h4>
												<ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
													{currentDestination.highlights.map((highlight, index) => (
														<li key={index} className="flex items-center gap-2">
															<span className="text-[#d66847] text-lg leading-none">•</span>
															{highlight}
														</li>
													))}
												</ul>
											</div>
										)}

										<button
											type="button"
											onClick={() => setIsExpanded(!isExpanded)}
											className="mt-4 block text-xs font-bold uppercase tracking-wider text-[#d66847] hover:underline transition"
										>
											{isExpanded ? 'Read Less ↑' : 'Read More →'}
										</button>
									</div>
								</div>

								{/* Location map section (now nested directly in Overview for clean structural aesthetic) */}
								<div className="space-y-6">
									<h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
										The location you are going to
									</h3>

									<div className="relative group rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-50">
										<iframe
											title="Google Maps Location"
											src={`https://maps.google.com/maps?q=${encodeURIComponent(currentDestination.title + ' Sri Lanka')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
											className="w-full h-[300px] border-0 relative z-10 pointer-events-none"
											loading="lazy"
										></iframe>

										<a
											href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentDestination.title + ' Sri Lanka')}`}
											target="_blank"
											rel="noopener noreferrer"
											className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 text-center cursor-pointer"
										>
											<div className="bg-white/95 text-slate-800 px-6 py-3 rounded-full text-xs font-bold shadow-xl tracking-wider uppercase flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
												<span>📍 Open Live Map Directions</span>
												<span className="text-base text-[#d66847]">→</span>
											</div>
										</a>

										<div className="absolute bottom-4 left-4 right-4 z-15 bg-white/95 border border-slate-100 px-4 py-2.5 rounded-2xl text-[11px] font-bold text-slate-700 shadow-md flex items-center justify-between pointer-events-none group-hover:opacity-0 transition-all duration-200">
											<span>Click to explore {currentDestination.title} on Google Maps</span>
											<span className="text-[#d66847] text-sm animate-pulse">→</span>
										</div>
									</div>
								</div>
							</div>
						)}

						{activeTab === "What's included" && (
							<div className="space-y-6 animate-fade-in">
								<h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
									Our best facilities
								</h3>
								<div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
									{facilities.map((fac) => (
										<div
											key={fac.name}
											className="flex items-center gap-3.5 rounded-2xl bg-[#fffcfb] border border-[#d66847]/5 p-4 shadow-sm transition hover:shadow-md hover:border-[#d66847]/10"
										>
											<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d66847]/10 text-xl">
												{fac.icon}
											</div>
											<span className="text-xs font-bold text-slate-700">
												{fac.name}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{activeTab === 'FAQs' && (
							<div className="space-y-4 animate-fade-in">
								<h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
									Frequently Asked Questions
								</h3>
								<div className="space-y-3.5">
									{faqs.map((faq, index) => {
										const isOpen = openFaq === index;
										return (
											<div 
												key={index} 
												className="border border-slate-100 rounded-2xl bg-[#fffcfb] overflow-hidden transition-all duration-300"
											>
												<button
													type="button"
													onClick={() => setOpenFaq(isOpen ? null : index)}
													className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-800 text-xs sm:text-sm hover:bg-slate-50/50 transition-colors"
												>
													<span>{faq.question}</span>
													<span className={`text-base font-bold text-[#d66847] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
														▾
													</span>
												</button>
												<div 
													className={`transition-all duration-300 ease-in-out ${
														isOpen ? 'max-h-40 border-t border-slate-50' : 'max-h-0'
													} overflow-hidden`}
												>
													<p className="p-5 text-xs sm:text-sm text-slate-500 leading-relaxed bg-white">
														{faq.answer}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</div>

					<div className="space-y-8">
						<div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
							<h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
								Reviews and ratings
							</h3>

							<div className="mt-6 flex items-baseline gap-2">
								<span className="text-5xl font-black tracking-tight text-slate-900">
									4.7
								</span>
								<div className="space-y-1">
									<div className="text-amber-500 text-sm">★★★★★</div>
									<p className="text-[10px] font-semibold text-slate-400">
										Based on 1,390 reviews
									</p>
								</div>
							</div>

							<div className="mt-8 space-y-4">
								<div className="space-y-1.5">
									<div className="flex justify-between text-xs font-bold text-slate-700">
										<span>Comfort</span>
										<span>4.8</span>
									</div>
									<div className="h-1.5 w-full rounded-full bg-slate-100">
										<div className="h-full rounded-full bg-[#d66847]" style={{ width: '96%' }} />
									</div>
								</div>

								<div className="space-y-1.5">
									<div className="flex justify-between text-xs font-bold text-slate-700">
										<span>Cleanliness</span>
										<span>4.9</span>
									</div>
									<div className="h-1.5 w-full rounded-full bg-slate-100">
										<div className="h-full rounded-full bg-[#d66847]" style={{ width: '98%' }} />
									</div>
								</div>

								<div className="space-y-1.5">
									<div className="flex justify-between text-xs font-bold text-slate-700">
										<span>Facilities</span>
										<span>4.7</span>
									</div>
									<div className="h-1.5 w-full rounded-full bg-slate-100">
										<div className="h-full rounded-full bg-[#d66847]" style={{ width: '94%' }} />
									</div>
								</div>
							</div>

							<button
								type="button"
								onClick={() => navigate('/all-reviews')}
								className="mt-8 w-full rounded-xl border border-slate-200 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:bg-[#d66847] hover:text-white hover:border-[#d66847] shadow-sm active:scale-95"
							>
								See all reviews
							</button>
						</div>

						<div
							className="relative overflow-hidden rounded-3xl h-80 bg-cover bg-center bg-no-repeat shadow-[0_12px_40px_rgba(0,0,0,0.15)] group cursor-pointer"
							style={{ backgroundImage: "url('/assets/images/ella_promo.jpg')" }}
							onClick={() => navigate('/destination/ella')}
						>
							<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-300 group-hover:opacity-95" />

							<div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
								<span className="text-[10px] font-bold tracking-widest text-[#d66847] uppercase">
									Featured Trip
								</span>
								<h4 className="mt-2 text-xl font-bold tracking-tight">
									Must Visit Destination
								</h4>
								<p className="mt-2 text-xs text-white/70 leading-relaxed max-w-xs">
									Discover the iconic Nine Arch Bridge in Ella, a masterpiece of colonial-era railway.
								</p>
								<button
									type="button"
									className="mt-4 w-fit rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white hover:text-slate-900"
								>
									Explore Now
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
