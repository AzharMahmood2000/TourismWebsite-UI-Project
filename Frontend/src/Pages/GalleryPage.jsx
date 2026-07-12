import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import GalleryHero from '../Components/GalleryHero';
import API_BASE_URL from '../api/api';

/* ═══════════════════════════════════════════════════════
   Places Configuration
   ═══════════════════════════════════════════════════════ */
const GALLERY_PLACES = ['All', 'Sigiriya', 'Ambuluwewa', 'Yala', 'Kalkudah'];

/* ═══════════════════════════════════════════════════════
   Recommendations Resolver
   — All      → Featured cover from each place
   — Specific → Related images from that place ID
   ═══════════════════════════════════════════════════════ */
function resolveRecommendations(place, allItems) {
	if (!place || place === 'All') {
		return allItems.slice(0, 4);
	}
	return allItems.filter(
		(d) => 
			(d.title && d.title.toLowerCase().includes(place.toLowerCase())) || 
			(d.badge && d.badge.toLowerCase().includes(place.toLowerCase())) ||
			(d.category && d.category.toLowerCase().includes(place.toLowerCase())) || 
			(d.region && d.region.toLowerCase().includes(place.toLowerCase()))
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
					{item.badge}
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
	const navigate                                          = useNavigate();
	const [activeHeroDestination, setActiveHeroDestination] = useState(null);
	const [subscribed, setSubscribed]                       = useState(false);
	const [selectedDetail, setSelectedDetail]               = useState(null);
	const [isModalOpen, setIsModalOpen]                     = useState(false);
	const [isVisible, setIsVisible]                         = useState(true);
	const [syncFlash, setSyncFlash]                         = useState(false);
	
	const [curatedEscapes, setCuratedEscapes] = useState([]);
	const [curatedLoading, setCuratedLoading] = useState(false);
	const [curatedError, setCuratedError] = useState("");

	const fadeTimer = useRef(null);
	const galleryRef = useRef(null);

	const getImageSrc = (image) => {
		if (!image || typeof image !== "string") return "/fallback-image.jpg";
		if (image.startsWith("http") || image.startsWith("data:")) return image;
		return `${API_BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });

		const fetchGalleryData = async () => {
			try {
				setCuratedLoading(true);
				const res = await fetch(`${API_BASE_URL}/api/gallery/curated-escapes`);
				if (!res.ok) throw new Error("Failed to load curated escapes.");
				const data = await res.json();
				
				console.log("Curated Escapes API response:", data);
				
				let escapesArray = [];
				if (Array.isArray(data)) {
					escapesArray = data;
				} else if (data.curatedEscapes || data.data) {
					escapesArray = data.curatedEscapes || data.data || [];
				}
				
				const mappedData = escapesArray.map(item => ({
					...item,
					id: item._id,
					title: item.title || item.sourceId?.title || item.sourceId?.name || "Untitled Escape",
					description: item.description || item.sourceId?.description || item.sourceId?.shortDescription || "",
					badge: item.badge || item.sourceId?.category || "Featured",
					image: getImageSrc(item.image || item.sourceId?.image || item.sourceId?.coverImage || ""),
					linkSourceId: item.sourceId?._id || item.sourceId || ""
				}));
				
				setCuratedEscapes(mappedData);
				console.log("Curated Escapes state:", mappedData);
			} catch (error) {
				console.error("Error fetching gallery items", error);
				setCuratedError("Error fetching gallery items");
			} finally {
				setCuratedLoading(false);
			}
		};
		fetchGalleryData();
	}, []);

	/* ── Resolve active place from URL parameters ── */
	const placeQuery = searchParams.get('place') || 'All';
	const activePlace = GALLERY_PLACES.find(
		(p) => p.toLowerCase() === placeQuery.toLowerCase()
	) || 'All';

	const recommendations = resolveRecommendations(activePlace, curatedEscapes);

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
					{curatedEscapes.length === 0 ? (
						<div className="py-24 text-center">
							<p className="text-lg font-medium text-slate-400">No curated escapes available yet.</p>
						</div>
					) : (
						<CuratedGrid items={recommendations} onDetail={triggerModal} />
					)}
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
								{selectedDetail.badge}
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
									{selectedDetail.badge} · Featured
								</p>
								{!selectedDetail.linkSourceId ? (
									<button
										type="button"
										disabled
										className="rounded-full bg-slate-300 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 cursor-not-allowed"
									>
										Booking details unavailable
									</button>
								) : (
									<button
										type="button"
										onClick={() => {
											if (selectedDetail.sourceType === 'destination') {
												navigate(`/booking?type=single&destinationId=${selectedDetail.linkSourceId}`);
											} else if (selectedDetail.sourceType === 'package') {
												navigate(`/booking?type=package&packageId=${selectedDetail.linkSourceId}`);
											}
										}}
										className="rounded-full bg-[#d66847] px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-[#c55b3b]"
									>
										Book Experience
									</button>
								)}
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
