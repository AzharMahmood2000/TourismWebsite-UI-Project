import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { destinationRegistry } from '../data';

export default function GalleryHero({ onDestinationChange }) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [isNightView, setIsNightView] = useState(false);

	const placeQuery = searchParams.get('place') || '';
	const activeDestination = destinationRegistry.find(
		(d) => d.id.toLowerCase() === placeQuery.toLowerCase()
	) || destinationRegistry[0];

	useEffect(() => {
		const syncSystemTime = () => {
			const currentHour = new Date().getHours();
			setIsNightView(currentHour >= 18 || currentHour < 6);
		};
		
		syncSystemTime();
		const timerId = setInterval(syncSystemTime, 60000);
		return () => clearInterval(timerId);
	}, []);

	const activeTrackIndex = destinationRegistry.findIndex(d => d.id === activeDestination.id);

	return (
		<header className="relative isolate w-full h-[100dvh] min-h-[600px] overflow-hidden bg-black">
			<div 
				className="absolute inset-0 z-0 flex w-full h-full transition-transform duration-700 ease-in-out"
				style={{ transform: `translateX(-${activeTrackIndex * 100}%)` }}
			>
				{destinationRegistry.map(location => (
					<div
						key={location.id}
						className="w-full h-full flex-shrink-0 bg-center bg-no-repeat [background-size:100%_100%]"
						style={{ backgroundImage: `url('${isNightView ? location.nightBgUrl : location.dayBgUrl}')` }}
					/>
				))}
			</div>

			<div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
			<div className="absolute inset-x-0 bottom-0 h-56 z-10 pointer-events-none bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
			{isNightView && <div className="absolute inset-0 z-10 pointer-events-none bg-indigo-950/15" />}

			<div className="relative z-20 flex flex-col justify-between h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-40 md:pt-16 md:pb-60">
				
				<div className="flex flex-col items-start max-w-2xl mt-4">
					<span className="mb-4 inline-block text-[10px] font-extrabold uppercase tracking-[0.45em] text-[#d66847]">
						THE MAJESTY OF SRI LANKA
					</span>

					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.7)]">
						Explore the Soul<br />of the Island
					</h1>

					<p className="max-w-lg mt-5 text-sm leading-relaxed text-white/80 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
						Ascend ancient rock fortresses, wander through misty tea plantations,
						and witness the untamed beauty of wildlife in their natural sanctuary.
					</p>

					<div className="flex items-center gap-4 mt-8">
						<button
							type="button"
							onClick={() => navigate('/booking')}
							className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#a64b2a] text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-[#a64b2a]/30 transition-all duration-300 hover:bg-[#913d1e] active:scale-95"
						>
							<span>Book Experience</span>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</button>

						<button
							type="button"
							aria-label="Add to wishlist"
							className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40 active:scale-95"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
								<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			<div className="absolute z-20 bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 w-full max-w-6xl mx-auto px-4 md:px-8">
				{destinationRegistry.map(location => {
					const isActive = activeDestination.id === location.id;
					
					return (
						<button
							key={location.id}
							type="button"
							onClick={() => {
								if (onDestinationChange) onDestinationChange(location);
							}}
							className={`
								group relative text-left overflow-hidden rounded-xl h-32 md:h-48 transition-all duration-300 hover:scale-105
								${isActive 
									? 'z-10 scale-[1.02] border-2 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] opacity-100' 
									: 'scale-95 border border-white/20 opacity-75 hover:border-white/40 hover:opacity-100'
								}
							`}
						>
							<div 
								className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
								style={{ backgroundImage: `url('${location.thumbnail}')` }}
							/>

							<div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

							<div className="absolute inset-0 flex flex-col justify-end h-full p-4 z-10">
								<span className={`mb-1.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest leading-none ${isActive ? 'text-orange-400' : 'text-white/80 group-hover:text-white'}`}>
									{location.region}
								</span>
								<span className="text-sm sm:text-base font-bold text-white leading-tight truncate">
									{location.title}
								</span>
							</div>
						</button>
					);
				})}
			</div>
		</header>
	);
}
