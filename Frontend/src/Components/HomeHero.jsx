import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api/api';

export default function HomeHero() {
	const navigate = useNavigate();
	const [isNightView, setIsNightView] = useState(false);
	const [systemTime, setSystemTime] = useState(new Date());
	const [userOverrideMode, setUserOverrideMode] = useState(null);

	const [searchQuery, setSearchQuery] = useState('');
	const [allData, setAllData] = useState([]);
	const [filteredResults, setFilteredResults] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const searchRef = useRef(null);

	useEffect(() => {
		const syncSystemClock = () => {
			const currentTick = new Date();
			setSystemTime(currentTick);
			
			if (userOverrideMode === null) {
				const hour = currentTick.getHours();
				setIsNightView(hour >= 18 || hour < 6);
			}
		};
		
		syncSystemClock();
		const clockId = setInterval(syncSystemClock, 60000);
		
		const fetchData = async () => {
			try {
				const [destRes, pkgRes] = await Promise.all([
					fetch(`${API_BASE_URL}/api/destinations`),
					fetch(`${API_BASE_URL}/api/packages`)
				]);
				const destData = destRes.ok ? await destRes.json() : [];
				const pkgData = pkgRes.ok ? await pkgRes.json() : [];
				
				const combined = [
					...destData.map(d => ({ ...d, searchType: 'Destination' })),
					...pkgData.map(p => ({ ...p, searchType: 'Tour Package' }))
				];
				setAllData(combined);
			} catch (error) {
				console.error("Failed to load search data", error);
			}
		};
		fetchData();

		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			clearInterval(clockId);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [userOverrideMode]);

	const toggleDayNightMode = () => {
		setUserOverrideMode(prevMode => {
			const nextMode = prevMode === null ? !isNightView : !prevMode;
			setIsNightView(nextMode);
			return nextMode;
		});
	};

	const getFilteredData = (query) => {
		const lowerQ = query.toLowerCase().trim();
		return allData.filter(item => {
			if (!lowerQ) return true;
			
			if (item.searchType === 'Destination') {
				return (
					(item.title && item.title.toLowerCase().includes(lowerQ)) ||
					(item.name && item.name.toLowerCase().includes(lowerQ)) ||
					(item.category && item.category.toLowerCase().includes(lowerQ)) ||
					(item.region && item.region.toLowerCase().includes(lowerQ)) ||
					(item.location && item.location.toLowerCase().includes(lowerQ))
				);
			} else {
				return (
					(item.title && item.title.toLowerCase().includes(lowerQ)) ||
					(item.name && item.name.toLowerCase().includes(lowerQ)) ||
					(item.category && item.category.toLowerCase().includes(lowerQ)) ||
					(item.location && item.location.toLowerCase().includes(lowerQ)) ||
					(item.duration && item.duration.toLowerCase().includes(lowerQ)) ||
					(item.destinations && Array.isArray(item.destinations) && item.destinations.some(d => d.toLowerCase().includes(lowerQ))) ||
					(item.destinations && typeof item.destinations === 'string' && item.destinations.toLowerCase().includes(lowerQ))
				);
			}
		});
	};

	const handleSearchChange = (e) => {
		const query = e.target.value;
		setSearchQuery(query);
		
		if (!query.trim()) {
			setFilteredResults([]);
			setShowDropdown(false);
			return;
		}

		setFilteredResults(getFilteredData(query));
		setShowDropdown(true);
	};

	const handleNavigate = (item) => {
		if (item.searchType === 'Destination') {
			navigate(`/destination/${item._id}`);
		} else {
			navigate(`/tour-packages/${item.slug || item._id}`);
		}
		setShowDropdown(false);
	};

	const handleSearchSubmit = () => {
		const results = getFilteredData(searchQuery);

		if (results.length === 0) {
			setFilteredResults([]);
			setShowDropdown(true);
		} else if (results.length === 1 && searchQuery.trim() !== '') {
			const item = results[0];
			if (item.searchType === 'Destination') {
				navigate(`/destination/${item._id}`);
			} else {
				navigate(`/tour-packages/${item.slug || item._id}`);
			}
		} else {
			setShowDropdown(false);
			const params = new URLSearchParams();
			if (searchQuery.trim()) params.append('location', searchQuery.trim());
			navigate(`/search?${params.toString()}`);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSearchSubmit();
		}
	};

	const formattedTime = systemTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
	const backgroundAsset = isNightView ? '/assets/images/Night View.png' : '/assets/images/Day view.png';

	return (
		<header className="relative isolate w-full h-[75vh] min-h-[600px] overflow-hidden">
			{/* Day View Background */}
			<div
				className={`absolute inset-0 z-0 bg-center bg-no-repeat [background-size:100%_100%] transition-opacity duration-1000 ease-in-out ${!isNightView ? 'opacity-100' : 'opacity-0'}`}
				style={{ backgroundImage: "url('/assets/images/Day view.png')" }}
			/>

			{/* Night View Background */}
			<div
				className={`absolute inset-0 z-0 bg-center bg-no-repeat [background-size:100%_100%] transition-opacity duration-1000 ease-in-out ${isNightView ? 'opacity-100' : 'opacity-0'}`}
				style={{ backgroundImage: "url('/assets/images/Night View.png')" }}
			/>

			<div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
			<div className="absolute inset-x-0 bottom-0 h-56 z-10 pointer-events-none bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
			{isNightView && <div className="absolute inset-0 z-10 pointer-events-none bg-indigo-950/15" />}

			<div className="relative z-20 flex flex-col justify-between h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-24">
				<div className="flex flex-col items-start max-w-3xl mt-4">
					<span className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/20 bg-white/10 text-xs font-bold uppercase tracking-widest text-white shadow-sm backdrop-blur-md">
						<span className={`w-2 h-2 rounded-full ${isNightView ? 'bg-blue-400' : 'bg-orange-400'}`} />
						{isNightView ? 'NIGHT EXPEDITION MODE' : 'DAY EXPEDITION MODE'}
					</span>

					<h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.7)]">
						Explore Beyond <br className="hidden sm:block" /> Boundaries
					</h1>
				</div>

				<div ref={searchRef} className="w-full max-w-sm md:max-w-5xl mx-auto mt-auto p-3 md:p-2 rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md relative z-50">
					<form className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
						
						{/* Consolidated Search Bar */}
						<div className="relative w-full flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/10 transition-colors hover:bg-white/20">
							<label className="block mb-1 text-[10px] font-bold uppercase tracking-wider text-white/70">Find Your Next Adventure</label>
							<div className="flex items-center">
								<svg className="w-4 h-4 text-white/50 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
								<input 
									type="text" 
									value={searchQuery}
									onChange={handleSearchChange}
									onKeyDown={handleKeyDown}
									onFocus={() => { if (searchQuery.trim()) setShowDropdown(true); }}
									placeholder="Search destinations, tour packages, or categories..." 
									className="w-full text-sm font-semibold text-white bg-transparent outline-none placeholder-white/50"
								/>
							</div>

							{/* Live Dropdown under Location cell only */}
							{showDropdown && (
								<div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-[300px] overflow-y-auto animate-[pullDown_0.2s_ease-out] z-50">
									{filteredResults.length > 0 ? (
										<ul className="py-2">
											{filteredResults.map((item, idx) => (
												<li 
													key={idx}
													onClick={() => handleNavigate(item)}
													className="px-5 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 flex flex-col transition-colors"
												>
													<div className="flex justify-between items-center">
														<span className="font-bold text-slate-800 text-sm">{item.title || item.name}</span>
														<span className="text-[10px] font-bold tracking-wider uppercase text-white bg-slate-400 px-2 py-0.5 rounded-full z-10">{item.searchType}</span>
													</div>
													<div className="text-xs text-slate-500 mt-1 flex items-center gap-2 font-medium">
														<span>{item.category || item.region || item.location || ''}</span>
														{(item.duration) && <span className="text-slate-400">• {item.duration}</span>}
													</div>
												</li>
											))}
										</ul>
									) : (
										<div className="px-5 py-6 text-center text-sm font-bold text-slate-500">
											No matching places or packages found.
										</div>
									)}
								</div>
							)}
						</div>

						<button 
							type="button"
							onClick={handleSearchSubmit}
							className="flex items-center justify-center gap-2 w-full md:w-auto min-h-[52px] px-8 rounded-xl bg-[#d66847] text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#d66847]/30 transition-colors hover:bg-[#c55b3b]"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
							<span>Search</span>
						</button>
					</form>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-24 z-30 pointer-events-none flex items-center justify-end pr-10">
				<div className="pointer-events-auto flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/40 text-[11px] font-sans font-medium tracking-wide text-white/90 backdrop-blur-md">
					<span>{formattedTime}</span>
					<span className="opacity-30">|</span>
					<span>{isNightView ? '🌙 NIGHT MODE' : '☀️ DAY MODE'}</span>
					<span className="opacity-30">|</span>
					<button
						type="button"
						onClick={toggleDayNightMode}
						className="font-bold uppercase tracking-wider text-[#d66847] transition-colors hover:text-white focus:outline-none"
					>
						TOGGLE VIEW
					</button>
				</div>
			</div>
		</header>
	);
}
