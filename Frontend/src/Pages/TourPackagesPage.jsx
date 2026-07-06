import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

/* ═══════════════════════════════════════════════════════
   Curated Tour Packages Dataset
   Using slugs as IDs for clean and SEO-friendly routing.
   ═══════════════════════════════════════════════════════ */
const packages = [
	{
		id: 'tea-country-trails',
		title: 'Tea Country Trails',
		badge: 'MOUNTAINS',
		category: 'Mountains',
		image: '/assets/images/ella.jpg',
		duration: '3N / 4D',
		price: 'LKR 45,000',
		amenities: ['bed', 'car', 'shield'],
		description: 'Explore the misty tea trails and scenic highlands of Ella. Includes luxury accommodation, plantation tours, and hiking expeditions.',
		lat: '6.8768',
		lng: '81.0498',
		details: {
			tagline: 'Misty Peaks & Sacred Green Trails',
			highlights: [
				'Guided walking tour through historic tea estates',
				'Scenic train ride across the Nine Arch Bridge',
				'Sunrise hike to Little Adam’s Peak',
				'Premium stay at a colonial-era tea bungalow'
			],
			inclusions: '3 Nights accommodation, Daily breakfast & dinner, Private AC transfers, English-speaking guide, All entrance fees.'
		}
	},
	{
		id: 'southern-coastal-escape',
		title: 'Southern Coastal Escape',
		badge: 'BEACHES',
		category: 'Beaches',
		image: '/assets/images/trincomalee.jpg',
		duration: '5N / 6D',
		price: 'LKR 82,000',
		amenities: ['bed', 'ship', 'meals'],
		description: 'Relax by the pristine beaches and tropical waters. Swim with marine life and explore the historic forts along the coast.',
		lat: '8.5711',
		lng: '81.2335',
		details: {
			tagline: 'Sun-kissed Sands & Ocean Adventures',
			highlights: [
				'Snorkeling expedition at Pigeon Island marine sanctuary',
				'Dolphin & whale watching boat cruise',
				'Historical walking tour of Trincomalee Dutch Fort',
				'Beachside candlelit seafood dinner'
			],
			inclusions: '5 Nights beachfront luxury resort stay, Half-board meals, Boat tours and snorkeling gear, Airport pick-and-drop.'
		}
	},
	{
		id: 'ancient-kingdom-tour',
		title: 'Ancient Kingdom Tour',
		badge: 'HISTORICAL & CULTURAL',
		category: 'Historical & Cultural',
		image: '/assets/images/sigiriya.jpg',
		duration: '4N / 5D',
		price: 'LKR 65,000',
		amenities: ['monument', 'bed', 'shield'],
		description: 'Visit the 5th-century Sigiriya rock fortress, ancient monasteries, and majestic archaeological complexes.',
		lat: '7.9570',
		lng: '80.7600',
		details: {
			tagline: 'Chronicles of Kings & Rock Citadels',
			highlights: [
				'Climb the UNESCO World Heritage Sigiriya Lion Rock',
				'Explore the ancient ruins of Polonnaruwa kingdom',
				'Guided evening safari at Minneriya National Park',
				'Traditional village lunch experience'
			],
			inclusions: '4 Nights boutique villa stays, Daily breakfast, VIP fortress entry passes, Private vehicle transport, Professional guide.'
		}
	},
	{
		id: 'wildheart-of-yala',
		title: 'Wildheart of Yala',
		badge: 'NATURE',
		category: 'Historical & Cultural',
		image: '/assets/images/yala.jpg',
		duration: '2N / 3D',
		price: 'LKR 55,000',
		amenities: ['paw', 'binoculars', 'tent'],
		description: 'Embark on a wild safari adventure in Yala National Park. Sleep under the stars in premium safari tents and track leopards.',
		lat: '6.3768',
		lng: '81.5208',
		details: {
			tagline: 'Untamed Wilderness & Leopard Tracks',
			highlights: [
				'Two half-day 4x4 jeep safaris in Yala National Park',
				'Guided evening bird watching and bush walks',
				'Luxury camping experience with gourmet BBQ dinners',
				'Stargazing camp bonfire sessions'
			],
			inclusions: '2 Nights luxury tented camp accommodation, All meals & snacks, Jeep safari fees, Wildlife tracker guides.'
		}
	},
	{
		id: 'central-highlands-secret',
		title: 'Central Highlands Secret',
		badge: 'EXPEDITION',
		category: 'Mountains',
		image: '/assets/images/ella_promo.jpg',
		duration: '3N / 4D',
		price: 'LKR 42,000',
		amenities: ['hiking', 'pin'],
		description: 'Trek the secret paths of the central highlands. Discover hidden waterfalls, misty valleys, and breathtaking lookout cliffs.',
		lat: '6.8012',
		lng: '80.8115',
		details: {
			tagline: 'Secret Waterfalls & Panoramic Horizons',
			highlights: [
				'Hike to Diyaluma and Ravana waterfalls',
				'Wander through Horton Plains and World’s End cliff',
				'Local organic farm-to-table culinary workshop',
				'Scenic drive through the winding mountain passes'
			],
			inclusions: '3 Nights cozy mountain lodge stays, Breakfast and lunches, Private trekking guides, Entrance permits.'
		}
	},
	{
		id: 'soul-of-kandy',
		title: 'Soul of Kandy',
		badge: 'SPIRITUALITY',
		category: 'Historical & Cultural',
		image: '/assets/images/kandy.jpg',
		duration: '2N / 3D',
		price: 'LKR 38,000',
		amenities: ['temple', 'bag'],
		description: 'Immerse in the spiritual and cultural heart of Kandy. Visit the sacred Temple of the Tooth and witness cultural dance displays.',
		lat: '7.2906',
		lng: '80.6337',
		details: {
			tagline: 'Spiritual Heritage & Traditional Rhythms',
			highlights: [
				'VIP entry to the sacred Temple of the Tooth Relic',
				'Traditional Kandyan cultural drumming & dance show',
				'Stroll through the Royal Botanical Gardens of Peradeniya',
				'Local gemstone and spice market shopping trail'
			],
			inclusions: '2 Nights premium city hotel stays, Daily breakfasts, All tickets & tour transport, Local shopping assistant guide.'
		}
	}
];

const categoryPills = [
	'All Packages',
	'Beaches',
	'Mountains',
	'Historical & Cultural'
];

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

	// If paramId exists, load dynamic detail view, passing state or matching slug
	const detailPkg = location.state?.pkg || packages.find(p => p.id === paramId);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [paramId]);

	// Live filtering (only applicable in list view)
	const filteredPackages = packages.filter((pkg) => {
		const matchesCategory =
			activeCategory === 'All Packages' || pkg.category === activeCategory;
		
		const matchesSearch =
			pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			pkg.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
			pkg.description.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesCategory && matchesSearch;
	});

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
	   1. DETAIL PAGE RENDER VIEW
	   If URL path is /tour-packages/:id and ID matches a tour slug
	   ═══════════════════════════════════════════════════════ */
	if (paramId && detailPkg) {
		return (
			<div className="min-h-screen bg-[#fffaf8] relative w-full block">
				<Navbar />

				{/* Hero Section */}
				<section
					className="relative w-full h-[550px] md:h-[650px] bg-cover bg-center bg-no-repeat transition-all duration-1000"
					style={{
						backgroundImage: `url(${detailPkg.image})`,
					}}
				>
					{/* Dark overlay gradient */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

					<div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
						{/* Back Button */}
						<Link
							to="/tour-packages"
							className="absolute top-6 left-6 z-25 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-[#d66847] text-white border border-white/20 hover:border-transparent transition-all shadow-md active:scale-90"
							title="Back to Packages List"
						>
							<span className="text-lg font-bold">←</span>
						</Link>

						{/* Booking & Overview Floating Info Card (Bottom Left) */}
						<div className="absolute bottom-8 left-4 right-4 md:bottom-16 md:left-8 md:right-auto z-20 w-full max-w-[92%] md:max-w-sm rounded-3xl border border-white/10 bg-white/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.15)] backdrop-blur-md">
							<div className="flex items-start justify-between gap-4">
								<h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
									{detailPkg.title}
								</h1>
								<span className="rounded-full bg-[#d66847]/10 text-[#d66847] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider shrink-0">
									{detailPkg.badge}
								</span>
							</div>

							<p className="mt-2 text-xs leading-relaxed text-slate-500">
								{detailPkg.details.tagline}
							</p>

							<div className="my-4 border-t border-slate-100" />

							<div className="space-y-2.5">
								<div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
									<span className="text-base text-[#d66847]">📍</span>
									<span>Sri Lanka Expedition</span>
								</div>

								<div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
									<span className="text-base text-[#d66847]">⏳</span>
									<span>Duration: {detailPkg.duration}</span>
								</div>

								<div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
									<span className="text-base text-[#d66847]">🛡️</span>
									<span>Premium Private Guide Included</span>
								</div>
							</div>

							<div className="my-4 border-t border-slate-100" />

							<div className="flex items-center justify-between gap-4">
								<div>
									<p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
										Price
									</p>
									<p className="text-lg font-black text-slate-900">
										{detailPkg.price}{' '}
										<span className="text-[11px] font-normal text-slate-400">
											/Person
										</span>
									</p>
								</div>
								<a
									href="#booking-inquiry"
									className="rounded-full bg-[#d66847] hover:bg-[#c55b3b] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all active:scale-95 text-center"
								>
									Inquire Now
								</a>
							</div>
						</div>
					</div>
				</section>

				{/* Detail Page Main Content */}
				<main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white mt-12 rounded-[2rem] shadow-[0_8px_30px_rgba(15,23,42,0.02)] border border-slate-50">
					<div className="grid gap-12 lg:grid-cols-[1.8fr_1fr]">
						
						{/* Left Column - highlights, inclusions, and map */}
						<div className="space-y-10">
							<div>
								<h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-l-3 border-[#d66847] pl-3">
									Itinerary Highlights
								</h2>
								<ul className="mt-6 space-y-4">
									{detailPkg.details.highlights.map((highlight, index) => (
										<li key={index} className="flex items-start text-sm text-slate-600 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
											<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d66847]/10 text-[#d66847] text-xs font-bold mr-3.5 mt-0.5">
												{index + 1}
											</span>
											<span className="leading-relaxed">{highlight}</span>
										</li>
									))}
								</ul>
							</div>

							<div className="pt-4">
								<h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-l-3 border-[#d66847] pl-3">
									What's Included
								</h3>
								<div className="mt-4 p-5 rounded-2xl bg-[#fffdfb] border border-[#d66847]/10 shadow-sm leading-relaxed text-sm text-slate-600 italic">
									{detailPkg.details.inclusions}
								</div>
							</div>

							{/* Interactive Google Map directions */}
							<div className="pt-4">
								<h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-l-3 border-[#d66847] pl-3 mb-6">
									Journey Location
								</h3>
								<div className="relative group rounded-3xl overflow-hidden border border-slate-200 shadow-md">
									<iframe
										title="Google Maps Route"
										src={`https://maps.google.com/maps?q=${detailPkg.lat},${detailPkg.lng}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
										className="w-full h-[320px] rounded-2xl border-none relative z-10 pointer-events-none"
									></iframe>
									
									<a
										href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(detailPkg.title + ' Sri Lanka')}`}
										target="_blank"
										rel="noopener noreferrer"
										className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 text-center cursor-pointer"
									>
										<div className="bg-white/95 text-slate-800 px-6 py-3 rounded-full text-xs font-bold shadow-xl tracking-wider uppercase flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
											<span>Get Live GPS directions</span>
											<span className="text-[#d66847] text-base">→</span>
										</div>
									</a>
								</div>
							</div>
						</div>

						{/* Right Column - Booking Inquiry Box */}
						<div id="booking-inquiry" className="space-y-8">
							<div className="rounded-3xl border border-slate-100 bg-[#fffcfb] p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
								<h3 className="text-base font-extrabold text-slate-900 uppercase tracking-widest">
									Request Booking Info
								</h3>
								<p className="text-xs text-slate-400 mt-1 mb-6">
									Submit your contact info, and our local travel designer will build a tailored itinerary package for you.
								</p>

								{isBooked ? (
									<div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold py-6 px-4 rounded-xl text-center shadow-sm">
										<span className="text-2xl block mb-2">🎉</span>
										Inquiry Received!
										<p className="text-[10px] text-emerald-600 font-medium mt-1">We will reach out within 24 hours.</p>
									</div>
								) : (
									<form onSubmit={handleBookSubmit} className="space-y-4">
										<div>
											<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
												Your Name
											</label>
											<input
												type="text"
												required
												placeholder="Alex Smith"
												className="w-full rounded border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#d66847] focus:outline-none transition-colors"
											/>
										</div>

										<div>
											<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
												Email Address
											</label>
											<input
												type="email"
												required
												placeholder="alex@example.com"
												className="w-full rounded border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#d66847] focus:outline-none transition-colors"
											/>
										</div>

										<div>
											<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
												Travelers count
											</label>
											<select className="w-full rounded border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#d66847] focus:outline-none transition-colors">
												<option>1 Person</option>
												<option selected>2 Persons</option>
												<option>3 - 5 Persons</option>
												<option>6+ Persons</option>
											</select>
										</div>

										<button
											type="submit"
											className="w-full rounded bg-[#d66847] hover:bg-[#c55b3b] py-3.5 mt-2 text-xs font-extrabold uppercase tracking-widest text-white shadow-md transition-all active:scale-95"
										>
											Submit Booking Inquiry
										</button>
									</form>
								)}
							</div>

							{/* Side Promo Container */}
							<div
								className="relative overflow-hidden rounded-3xl h-80 bg-cover bg-center bg-no-repeat shadow-md group"
								style={{
									backgroundImage: "url('/assets/images/yala_gallery.jpg')",
								}}
							>
								<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
								<div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
									<span className="text-[10px] font-bold tracking-widest text-[#d66847] uppercase">
										Sri Lanka Wildlife
									</span>
									<h4 className="mt-2 text-lg font-bold tracking-tight">
										Yala Safari Add-on
									</h4>
									<p className="mt-2 text-[11px] text-white/70 leading-relaxed max-w-xs">
										Upgrade any mountain trails package to include a 2-day wild elephant safari.
									</p>
								</div>
							</div>
						</div>
					</div>
				</main>

				<Footer />
			</div>
		);
	}

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
					<div className="flex flex-wrap gap-2.5">
						{categoryPills.map((pill) => {
							const isActive = activeCategory === pill;
							return (
								<button
									key={pill}
									type="button"
									onClick={() => setActiveCategory(pill)}
									className={`rounded px-5 py-2 text-xs font-bold transition-all duration-200 ${
										isActive
											? 'bg-[#1b1b1b] text-white shadow-sm border border-transparent'
											: 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
									}`}
								>
									{pill}
								</button>
							);
						})}
					</div>
				</div>
			</section>

			{/* ════════════════════════════════════════════
			    PACKAGE CARDS GRID CONTAINER
			    Refactored dynamic routing event loop & buttons container
			    ════════════════════════════════════════════ */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				{filteredPackages.length === 0 ? (
					<div className="py-24 text-center">
						<p className="text-lg font-medium text-slate-400">
							No matching travel packages found. Try adjusting your search query.
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
										src={pkg.image}
										alt={pkg.title}
										loading="lazy"
										className="w-full h-48 md:h-52 object-cover block transition-transform duration-500 group-hover:scale-105"
									/>
									{/* Category Badge overlay */}
									<span className="absolute left-4 top-4 rounded bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-600 shadow-sm border border-white/40">
										{pkg.badge}
									</span>
								</div>

								{/* Card Body content */}
								<div className="p-6 flex flex-col flex-1">
									<h3 className="text-lg font-bold text-slate-900 group-hover:text-[#d66847] transition-colors duration-250">
										{pkg.title}
									</h3>
									
									<p className="mt-2.5 text-xs leading-relaxed text-slate-500 flex-1">
										{pkg.description}
									</p>

									{/* Duration & Amenities Row */}
									<div className="mt-4 flex items-center justify-between border-t border-slate-50/50 pt-4">
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

										<div className="flex items-center gap-2.5">
											{pkg.amenities.map(renderAmenityIcon)}
										</div>
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
												{pkg.price} <span className="text-xs font-medium text-slate-500">/ person</span>
											</span>
										</div>

										<button
											type="button"
											onClick={() => {
												navigate('/booking', {
													state: {
														title: pkg.title.toUpperCase(),
														price: pkg.price,
														location: pkg.badge,
														isPackage: true
													}
												});
											}}
											className="px-5 py-2.5 bg-[#1e1e1e] hover:bg-[#d66847] text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-md active:scale-95 whitespace-nowrap"
										>
											View Journey
										</button>
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
