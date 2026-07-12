import { useEffect, useState } from 'react';
import API_BASE_URL from '../api/api';

export default function GalleryHero({ onDestinationChange }) {
	const [isNightView, setIsNightView] = useState(false);
	const [heroQueue, setHeroQueue] = useState([]);
	const [loading, setLoading] = useState(true);

	const getImageSrc = (img) => {
		if (!img || typeof img !== 'string') return '/fallback-image.jpg';
		if (img.startsWith('http') || img.startsWith('data:')) return img;
		return `${API_BASE_URL}${img.startsWith('/') ? img : `/${img}`}`;
	};

	useEffect(() => {
		const fetchHeroSlides = async () => {
			try {
				setLoading(true);
				const res = await fetch(`${API_BASE_URL}/api/gallery/hero-slides`);
				const data = await res.json();
				if (res.ok && data.length > 0) {
					// Backend sorts by displayOrder natively, but ensure array exists
					setHeroQueue(data);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchHeroSlides();
	}, []);

	useEffect(() => {
		const syncSystemTime = () => {
			const currentHour = new Date().getHours();
			setIsNightView(currentHour >= 18 || currentHour < 6);
		};
		
		syncSystemTime();
		const timerId = setInterval(syncSystemTime, 60000);
		return () => clearInterval(timerId);
	}, []);



	const handleNext = () => {
		setHeroQueue((prev) => {
			if (prev.length <= 1) return prev;
			return [...prev.slice(1), prev[0]];
		});
	};

	const handlePrev = () => {
		setHeroQueue((prev) => {
			if (prev.length <= 1) return prev;
			return [prev[prev.length - 1], ...prev.slice(0, -1)];
		});
	};

	const handleThumbnailClick = (clickedIndex) => {
		if (clickedIndex === 0) return;
		
		setHeroQueue((prev) => {
			const clickedItem = prev[clickedIndex];
			const previousFirst = prev[0];
			const middleItems = prev.filter((_, index) => index !== 0 && index !== clickedIndex);
			
			return [clickedItem, ...middleItems, previousFirst];
		});
	};

	// Propagate active destination change to parent (GalleryPage)
	useEffect(() => {
		if (heroQueue.length > 0 && onDestinationChange) {
			// We try to mimic the old location object, or just pass the full object so the parent can extract location info.
			onDestinationChange(heroQueue[0]);
		}
	}, [heroQueue[0]]);


	if (loading) return <div className="h-[100dvh] bg-black flex items-center justify-center text-white">Loading Gallery...</div>;
	if (heroQueue.length === 0) return <div className="h-[100dvh] bg-black flex items-center justify-center text-white">No gallery hero images available yet.</div>;

	const activeHero = heroQueue[0];

	return (
		<header className="relative isolate w-full h-[100dvh] min-h-[600px] overflow-hidden bg-black">
			{/* Big Background - Fading active hero */}
			<div className="absolute inset-0 z-0">
				{heroQueue.map((hero, idx) => (
					<div
						key={hero._id}
						className={`absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out ${
							idx === 0 ? 'opacity-80' : 'opacity-0'
						}`}
						style={{ backgroundImage: `url('${getImageSrc(hero.image)}')` }}
					/>
				))}
			</div>

			<div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
			<div className="absolute inset-x-0 bottom-0 h-48 sm:h-56 z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
			{isNightView && <div className="absolute inset-0 z-10 pointer-events-none bg-indigo-950/15" />}

			<div className="relative z-20 flex flex-col justify-between h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-12 pb-48 md:pt-20 md:pb-64">
				
				<div className="flex flex-col items-start max-w-2xl mt-4">
					<span className="mb-4 inline-block text-[10px] font-extrabold uppercase tracking-[0.45em] text-[#d66847]">
						{activeHero.category || 'THE MAJESTY OF SRI LANKA'}
					</span>

					<h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.7)] drop-shadow-xl transition-all duration-700">
						{activeHero.title}
					</h1>

					<p className="max-w-lg mt-6 text-sm lg:text-base leading-relaxed text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-700">
						{activeHero.subtitle}
					</p>

					{activeHero.location && (
						<div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
							<span className="text-[#d66847]">📍</span>
							<span className="text-xs font-bold text-white uppercase tracking-widest">{activeHero.location}</span>
						</div>
					)}
				</div>
			</div>

			{/* Thumbnail Queue Overlay */}
			<div className="absolute z-20 bottom-6 md:bottom-10 right-4 md:right-8 lg:right-12 flex flex-col items-end gap-4 max-w-full">
				
				{heroQueue.length > 1 && (
					<div className="flex items-center gap-3 mb-2 z-30">
						<button 
							onClick={handlePrev}
							className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
							</svg>
						</button>
						<button 
							onClick={handleNext}
							className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
							</svg>
						</button>
					</div>
				)}

				<div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 snap-x max-w-[90vw] md:max-w-2xl custom-scrollbar scrollbar-hide">
					{heroQueue.map((item, index) => {
						const isActive = index === 0;
						return (
							<button
								key={item._id}
								type="button"
								onClick={() => handleThumbnailClick(index)}
								className={`
									flex-shrink-0 group relative overflow-hidden rounded-xl h-24 w-36 md:h-32 md:w-48 transition-all duration-300 snap-center
									${isActive 
										? 'border-2 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] opacity-100 scale-100 cursor-default' 
										: 'border border-white/20 opacity-70 hover:opacity-100 hover:scale-105 scale-95 cursor-pointer hover:border-white/50'
									}
								`}
							>
								<div 
									className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
									style={{ backgroundImage: `url('${getImageSrc(item.image)}')` }}
								/>
								<div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
								
								<div className="absolute inset-0 flex flex-col justify-end p-3 z-10 text-left">
									{item.location && (
										<span className={`mb-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider leading-none ${isActive ? 'text-orange-400' : 'text-white/80 group-hover:text-white'}`}>
											{item.location}
										</span>
									)}
									<span className="text-xs sm:text-sm font-bold text-white leading-tight truncate drop-shadow-md">
										{item.title}
									</span>
								</div>
							</button>
						);
					})}
				</div>

			</div>
		</header>
	);
}
