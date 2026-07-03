import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import GalleryHero from '../Components/GalleryHero';

/* ═══════════════════════════════════════════════════════
   Full Destination Dataset — with URL-encoded paths
   ═══════════════════════════════════════════════════════ */
const allGalleryDestinations = [
	/* ── SIGIRIYA ── */
	{
		id: 'sigiriya-main',
		destinationId: 'sigiriya',
		title: 'Sigiriya Gardens (View 2)',
		category: 'Ancient',
		region: 'CENTRAL PROVINCE',
		image: '/assets/images/Sigiriya/Sigiriya%202.jpg',
		description: 'The lush terraced water gardens at the base of the rock, showing ancient hydraulic designs.',
		longDetails: 'Sigiriya is an ancient rock fortress and UNESCO World Heritage Site. The 200-metre high rock was converted into a royal palace by King Kashyapa in the 5th century. It features beautiful frescoes, a mirror wall, sophisticated water gardens, and the iconic Lion Gate.',
	},
	{
		id: 'sigiriya-day',
		destinationId: 'sigiriya',
		title: 'Lion Rock Climb (View 3)',
		category: 'Ancient',
		region: 'CENTRAL PROVINCE',
		image: '/assets/images/Sigiriya/Sigiriya%203.jpg',
		description: 'A beautiful perspective of the ascending staircase path to the summit palace ruins.',
		longDetails: 'The daylight reveals the detailed layout of the ancient landscaped water gardens at the base of the rock. These symmetrical pools and fountain structures are among the oldest in the world, demonstrating advanced hydraulic engineering from over 1,500 years ago.',
	},
	{
		id: 'sigiriya-night',
		destinationId: 'sigiriya',
		title: 'Summit Outlook (View 4)',
		category: 'Ancient',
		region: 'CENTRAL PROVINCE',
		image: '/assets/images/Sigiriya/4.jpg',
		description: 'A stunning high-altitude vista looking over the surrounding tropical valley forests.',
		longDetails: 'Under the starlight, the silhouette of the Lion Rock is a mystical sight. In ancient times, the rock was crowned with a multi-story palace that would glow with torchlight, standing as a brilliant beacon over the dark forests below.',
	},

	/* ── AMBULUWEWA ── */
	{
		id: 'ambuluwewa-main',
		destinationId: 'ambuluwewa',
		title: 'Ambuluwewa Spire (View 2)',
		category: 'Educational',
		region: 'HILL COUNTRY',
		image: '/assets/images/Ambuluwewa/2.jpg',
		description: 'The spiralling, snow-white spire of Ambuluwewa Tower reaching into the highland clouds.',
		longDetails: 'Ambuluwewa Tower is a unique biodiversity complex and tourist harbor located in Gampola, Sri Lanka. The tower rises dramatically above the surrounding hills, offering an adventurous climb with panoramic 360-degree views of the lush green mountain ranges.',
	},
	{
		id: 'ambuluwewa-day',
		destinationId: 'ambuluwewa',
		title: 'Ascending Walkway (View 3)',
		category: 'Educational',
		region: 'HILL COUNTRY',
		image: '/assets/images/Ambuluwewa/3.jpg',
		description: 'A breathtaking and narrow spiralling climb providing thrilling panoramic mountain views.',
		longDetails: 'Ambuluwewa is known for its narrow, winding staircase that clings to the exterior of the tower, providing a heart-racing experience for climbers as they get closer to the peak.',
	},
	{
		id: 'ambuluwewa-night',
		destinationId: 'ambuluwewa',
		title: 'Biodiversity Peak (View 4)',
		category: 'Educational',
		region: 'HILL COUNTRY',
		image: '/assets/images/Ambuluwewa/4.jpg',
		description: 'The surrounding multi-religious sanctuary and botanical gardens at the summit base.',
		longDetails: 'The Ambuluwewa peak is a unique multi-faith sanctuary featuring a temple, a mosque, a church, and a kovil, promoting unity and peace alongside nature and environmental education.',
	},

	/* ── YALA ── */
	{
		id: 'yala-leopard',
		destinationId: 'yala',
		title: 'Yala Wildlife (View 2)',
		category: 'Wildlife',
		region: 'SOUTHERN COAST',
		image: '/assets/images/Yala%20National%20Park/2.jpg',
		description: 'A close encounter with a resting leopard in the dense scrub jungle of Yala National Sanctuary.',
		longDetails: 'Yala National Park has one of the highest leopard densities in the world. Visitors on guided jeep safaris have a high chance of spotting these majestic big cats relaxing on rock outcrops or stalking prey through the dry scrub forests.',
	},
	{
		id: 'yala-coast',
		destinationId: 'yala',
		title: 'Elephant Crossing (View 3)',
		category: 'Wildlife',
		region: 'SOUTHERN COAST',
		image: '/assets/images/Yala%20National%20Park/3.jpg',
		description: 'Lush wilderness meeting the brackish lagoons and Indian Ocean beaches of the southern coast.',
		longDetails: 'Yala borders the Indian Ocean, providing a unique landscape where wild elephants and leopards can occasionally be seen walking on the beaches. The coastal lagoons host migrating birds, mugger crocodiles, and herds of wild water buffalo.',
	},
	{
		id: 'yala-safari',
		destinationId: 'yala',
		title: 'Lagoon Sanctuary (View 4)',
		category: 'Wildlife',
		region: 'SOUTHERN COAST',
		image: '/assets/images/Yala%20National%20Park/4.jpg',
		description: 'A beautiful perspective of the brackish lakes and coastal shrublands inside the national park.',
		longDetails: 'Guided jeep safaris run daily at sunrise and dusk, offering travelers close-up experiences with herds of Asian elephants, wild water buffaloes, spotted deer, and hundreds of tropical bird species.',
	},

	/* ── KALKUDAH ── */
	{
		id: 'kalkudah-beach',
		destinationId: 'kalkudah',
		title: 'Kalkudah Beach (View 2)',
		category: 'Beaches',
		region: 'EASTERN SHORE',
		image: '/assets/images/Kalkudah%20Beach/2.jpg',
		description: 'Pristine, untouched white sand beaches offering shallow turquoise waters for tropical relaxation.',
		longDetails: 'Kalkudah Beach is a secluded paradise with calm and shallow waters. It is protected by offshore reefs, making it an incredibly safe and peaceful location for swimming and sunbathing away from the busy tourist crowds.',
	},
	{
		id: 'kalkudah-trinco',
		destinationId: 'kalkudah',
		title: 'Trincomalee Coastline (View 3)',
		category: 'Beaches',
		region: 'EASTERN SHORE',
		image: '/assets/images/Kalkudah%20Beach/3.jpg',
		description: 'A beautiful perspective of the golden shores and crystal-clear waters in nearby Trincomalee.',
		longDetails: 'The eastern shores of Trincomalee feature pristine beaches like Nilaveli and Uppuveli. Known for shallow waters and crystal clear visibility, it is a world-class destination for snorkeling and dolphin watching.',
	},
	{
		id: 'kalkudah-resort',
		destinationId: 'kalkudah',
		title: 'Passekudah Bay (View 4)',
		category: 'Beaches',
		region: 'EASTERN SHORE',
		image: '/assets/images/Kalkudah%20Beach/4.webp',
		description: 'Clear blue waters with shallow sandy beds extending hundreds of metres from the shore.',
		longDetails: 'The shallow and reef-protected waters of Passekudah and Kalkudah allow visitors to wade hundreds of metres into the warm Indian Ocean, enjoying calm and flat conditions that feel like a giant natural swimming pool.',
	},
];

/* ═══════════════════════════════════════════════════════
   Places Configuration
   ═══════════════════════════════════════════════════════ */
const GALLERY_PLACES = ['All', 'Sigiriya', 'Ambuluwewa', 'Yala', 'Kalkudah'];

/* ═══════════════════════════════════════════════════════
   Recommendations Resolver
   — All      → Featured cover from each place
   — Specific → Related images from that place ID
   ═══════════════════════════════════════════════════════ */
function resolveRecommendations(place) {
	if (!place || place === 'All') {
		return [
			allGalleryDestinations.find((d) => d.id === 'sigiriya-main'),
			allGalleryDestinations.find((d) => d.id === 'ambuluwewa-main'),
			allGalleryDestinations.find((d) => d.id === 'yala-leopard'),
			allGalleryDestinations.find((d) => d.id === 'kalkudah-beach'),
		].filter(Boolean);
	}
	return allGalleryDestinations.filter(
		(d) => d.destinationId.toLowerCase() === place.toLowerCase()
	);
}

/* ═══════════════════════════════════════════════════════
   Reusable Card Component
   ═══════════════════════════════════════════════════════ */
function EscapeCard({ item, onDetail, featured = false }) {
	return (
		<article
			className={`relative overflow-hidden rounded-3xl shadow-lg group ${
				featured ? 'h-[620px]' : 'min-h-[270px] h-full'
			}`}
		>
			<img
				src={item.image}
				alt={item.title}
				className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105"
			/>
			<div
				className={`absolute inset-0 ${
					featured
						? 'bg-gradient-to-t from-black/90 via-black/35 to-transparent'
						: 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'
				}`}
			/>
			<div className={`absolute bottom-0 left-0 right-0 ${featured ? 'p-8' : 'p-6'} text-white z-10`}>
				<span className="text-[10px] font-bold tracking-widest text-[#d66847] uppercase">
					{item.region}
				</span>
				<div className={`flex justify-between ${featured ? 'items-end' : 'items-center'} gap-4 mt-2`}>
					<h3
						className={`${
							featured ? 'text-2xl leading-tight' : 'text-lg'
						} font-bold tracking-tight text-white`}
					>
						{item.title}
					</h3>
					<button
						type="button"
						onClick={() => onDetail(item)}
						className={`flex ${
							featured ? 'h-10 w-10' : 'h-9 w-9'
						} shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-[#d66847] text-white border border-white/20 hover:border-transparent transition-all shadow-md`}
						title="View Details"
					>
						🔍
					</button>
				</div>
				{featured && (
					<p className="mt-3 text-xs leading-relaxed text-white/70 max-w-sm">
						{item.description}
					</p>
				)}
			</div>
		</article>
	);
}

/* ═══════════════════════════════════════════════════════
   CuratedGrid — Responsive Layout Builder
   ═══════════════════════════════════════════════════════ */
function CuratedGrid({ items, onDetail }) {
	if (items.length === 0) {
		return (
			<div className="py-24 text-center">
				<p className="text-lg font-medium text-slate-400">No destinations found for this selection.</p>
			</div>
		);
	}
	if (items.length === 1) {
		return <EscapeCard item={items[0]} onDetail={onDetail} featured />;
	}
	if (items.length === 2) {
		return (
			<div className="grid gap-6 sm:grid-cols-2">
				{items.map((item) => (
					<EscapeCard key={item.id} item={item} onDetail={onDetail} featured />
				))}
			</div>
		);
	}
	if (items.length === 3) {
		return (
			<div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
				<EscapeCard item={items[0]} onDetail={onDetail} featured />
				<div className="grid gap-6 grid-rows-2 lg:h-[620px]">
					<EscapeCard item={items[1]} onDetail={onDetail} />
					<EscapeCard item={items[2]} onDetail={onDetail} />
				</div>
			</div>
		);
	}
	return (
		<div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
			<EscapeCard item={items[0]} onDetail={onDetail} featured />
			<div className="grid gap-6 grid-rows-[1.2fr_1.3fr] lg:h-[620px]">
				<EscapeCard item={items[1]} onDetail={onDetail} />
				<div className="grid gap-6 sm:grid-cols-2 h-full">
					<EscapeCard item={items[2]} onDetail={onDetail} />
					<EscapeCard item={items[3]} onDetail={onDetail} />
				</div>
			</div>
		</div>
	);
}

/* ═══════════════════════════════════════════════════════
   GalleryPage Component
   ═══════════════════════════════════════════════════════ */
export default function GalleryPage() {
	const [searchParams, setSearchParams]                   = useSearchParams();
	const [activeHeroDestination, setActiveHeroDestination] = useState(null);
	const [subscribed, setSubscribed]                       = useState(false);
	const [selectedDetail, setSelectedDetail]               = useState(null);
	const [isModalOpen, setIsModalOpen]                     = useState(false);
	const [isVisible, setIsVisible]                         = useState(true);
	const [syncFlash, setSyncFlash]                         = useState(false);
	const fadeTimer = useRef(null);
	const galleryRef = useRef(null);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	/* ── Resolve active place from URL parameters ── */
	const placeQuery = searchParams.get('place') || 'All';
	const activePlace = GALLERY_PLACES.find(
		(p) => p.toLowerCase() === placeQuery.toLowerCase()
	) || 'All';

	const recommendations = resolveRecommendations(activePlace);

	/* ── Fade transition on filter change ── */
	useEffect(() => {
		clearTimeout(fadeTimer.current);
		setIsVisible(false);
		fadeTimer.current = setTimeout(() => setIsVisible(true), 280);
		return () => clearTimeout(fadeTimer.current);
	}, [activePlace]);

	/* ── Hero Carousel Place Click Sync ── */
	const handleHeroDestinationChange = (destination) => {
		setActiveHeroDestination(destination);

		// Set place query parameter based on selection
		const targetPlace = destination.id || 'All';
		if (targetPlace === 'All') {
			setSearchParams({});
		} else {
			setSearchParams({ place: targetPlace });
		}

		// Animation flash
		setSyncFlash(true);
		setTimeout(() => setSyncFlash(false), 1800);
	};

	const handlePlaceChange = (place) => {
		setActiveHeroDestination(null);
		if (place === 'All') {
			setSearchParams({});
		} else {
			setSearchParams({ place: place.toLowerCase() });
		}
	};

	const handleSubscribe = (e) => {
		e.preventDefault();
		setSubscribed(true);
	};

	const triggerModal = (escape) => { setSelectedDetail(escape); setIsModalOpen(true); };
	const closeModal   = ()       => setIsModalOpen(false);

	const isTrending = activePlace === 'All';

	return (
		<div className="min-h-screen bg-white relative w-full block">
			<Navbar />

			{/* Hero sync listener */}
			<GalleryHero onDestinationChange={handleHeroDestinationChange} />

			{/* ════════════════════════════════════════════
			    CURATED ESCAPES GRID SECTION
			    ════════════════════════════════════════════ */}
			<section
				ref={galleryRef}
				className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-white"
			>
				{/* Section Header */}
				<div className="border-b border-slate-100 pb-8 mb-10">
					<div className="max-w-lg">
						{activeHeroDestination && (
							<div
								className={`inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
									syncFlash
										? 'bg-[#d66847] text-white shadow-md shadow-[#d66847]/30'
										: 'bg-[#d66847]/10 text-[#d66847]'
								}`}
							>
								<span className={`w-1.5 h-1.5 rounded-full ${syncFlash ? 'bg-white animate-pulse' : 'bg-[#d66847]'}`} />
								Synced from Hero · {activeHeroDestination.title}
							</div>
						)}

						<p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d66847] mb-2">
							{isTrending ? '🔥 Top Featured' : `Filtered — ${activePlace}`}
						</p>
						<h2 className="text-3xl font-black text-slate-900 tracking-tight">
							Curated Escapes
						</h2>
						<p className="mt-2 text-xs leading-relaxed text-slate-500">
							{isTrending
								? 'Explore our hand-picked selection of local heritage sites, architectural wonders, and hidden natural sanctuaries across Sri Lanka.'
								: `Showing hand-picked gallery views for ${activePlace} — click the zoom icon to discover more.`}
						</p>
					</div>
				</div>

				{/* Result count label */}
				<p className="mb-6 text-xs font-semibold text-slate-400 uppercase tracking-widest">
					{recommendations.length} view{recommendations.length !== 1 ? 's' : ''} · {activePlace}
				</p>

				{/* Dynamic Grid with fade transition */}
				<div
					className="transition-all duration-300 ease-in-out"
					style={{
						opacity: isVisible ? 1 : 0,
						transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
					}}
				>
					<CuratedGrid items={recommendations} onDetail={triggerModal} />
				</div>
			</section>

			{/* ════════════════════════════════════════════
			    PREMIUM ZOOM-IN DETAILS MODAL
			    ════════════════════════════════════════════ */}
			{isModalOpen && selectedDetail && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
					onClick={closeModal}
				>
					<div
						className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
						style={{ animation: 'zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="md:w-1/2 h-64 md:h-[480px] relative overflow-hidden">
							<img
								src={selectedDetail.image}
								alt={selectedDetail.title}
								className="w-full h-full object-cover block"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
							<span className="absolute left-6 bottom-6 rounded-full bg-[#d66847] px-4 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-white">
								{selectedDetail.region}
							</span>
						</div>

						<div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
							<div>
								<div className="flex justify-between items-start gap-4">
									<h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
										{selectedDetail.title}
									</h2>
									<button
										type="button"
										onClick={closeModal}
										className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
										aria-label="Close details"
									>
										✕
									</button>
								</div>

								<div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#d66847]">
									<span>📍</span>
									<span>Sri Lanka Expedition</span>
								</div>

								<div className="mt-6 space-y-4">
									<p className="text-xs leading-relaxed text-slate-500">
										{selectedDetail.description}
									</p>
									<p className="text-xs leading-relaxed text-slate-600 font-semibold border-l-2 border-[#d66847] pl-3">
										{selectedDetail.longDetails}
									</p>
								</div>
							</div>

							<div className="mt-8 border-t border-slate-100 pt-6 flex items-center justify-between gap-4">
								<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
									{selectedDetail.category} · Featured
								</p>
								<button
									type="button"
									onClick={closeModal}
									className="rounded-full bg-[#d66847] px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-[#c55b3b]"
								>
									Explore Expedition
								</button>
							</div>
						</div>
					</div>

					<style dangerouslySetInnerHTML={{__html: `
						@keyframes zoomIn {
							from { opacity: 0; transform: scale(0.95); }
							to   { opacity: 1; transform: scale(1); }
						}
					`}} />
				</div>
			)}

			{/* ════════════════════════════════════════════
			    STAY INSPIRED NEWSLETTER MODULE
			    ════════════════════════════════════════════ */}
			<section className="w-full bg-[#fdf4f0] py-16 md:py-20">
				<div className="mx-auto max-w-4xl px-4 text-center">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-2xl text-[#d66847] mb-6">
						✉️
					</div>

					<h2 className="text-3xl font-black text-slate-900 tracking-tight">
						Stay Inspired
					</h2>

					<p className="mt-3 text-xs leading-relaxed text-slate-500 max-w-md mx-auto">
						Join our travel newsletter for monthly curations of the finest Sri Lankan
						destinations and hand-crafted sensory itineraries.
					</p>

					{subscribed ? (
						<div className="mt-8 mx-auto max-w-md bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold py-4 rounded-xl shadow-sm">
							✓ Thank you for subscribing! Keep an eye on your inbox.
						</div>
					) : (
						<form
							onSubmit={handleSubscribe}
							className="mt-8 mx-auto max-w-md flex flex-col sm:flex-row gap-3 rounded-2xl overflow-hidden"
						>
							<input
								type="email"
								required
								placeholder="Email Address"
								className="flex-1 rounded-xl sm:rounded-r-none border border-slate-200 bg-white px-5 py-3.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:border-[#d66847] focus:outline-none shadow-sm"
							/>
							<button
								type="submit"
								className="rounded-xl sm:rounded-l-none bg-[#d66847] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md shadow-[#d66847]/20 transition-all hover:bg-[#c55b3b] hover:shadow-lg active:scale-95"
							>
								SUBSCRIBE
							</button>
						</form>
					)}
				</div>
			</section>

			<Footer />
		</div>
	);
}
