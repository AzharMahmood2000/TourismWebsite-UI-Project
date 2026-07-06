import { useEffect, useState } from 'react';

export default function HomeHero() {
	const [isNightView, setIsNightView] = useState(false);
	const [systemTime, setSystemTime] = useState(new Date());
	const [userOverrideMode, setUserOverrideMode] = useState(null);

	const [searchPayload, setSearchPayload] = useState({ location: '', date: '', budget: 'default' });
	const [validationErrors, setValidationErrors] = useState({});
	const [isProcessing, setIsProcessing] = useState(false);

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
		return () => clearInterval(clockId);
	}, [userOverrideMode]);

	const toggleDayNightMode = () => {
		setUserOverrideMode(prevMode => {
			const nextMode = prevMode === null ? !isNightView : !prevMode;
			setIsNightView(nextMode);
			return nextMode;
		});
	};

	const validateSearchRequest = () => {
		const errors = {};
		
		if (!searchPayload.location.trim()) {
			errors.location = "Please select a destination.";
		}
		
		if (!searchPayload.date) {
			errors.date = "Please select a valid future date.";
		} else {
			const selectedDate = new Date(searchPayload.date);
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			if (selectedDate < today) {
				errors.date = "Please select a valid future date.";
			}
		}

		if (!searchPayload.budget || searchPayload.budget === 'default') {
			errors.budget = "Please choose a budget tier.";
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const submitSearchQuery = () => {
		if (validateSearchRequest()) {
			setIsProcessing(true);
			setTimeout(() => {
				console.log('Search Validated:', searchPayload);
				setIsProcessing(false);
			}, 2000);
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

				<div className="w-full max-w-sm md:max-w-5xl mx-auto mt-auto p-3 md:p-2 rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
					<form className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 w-full">
						<div className={`relative w-full flex-1 px-4 py-3 rounded-xl border bg-white/10 transition-colors hover:bg-white/20 ${validationErrors.location ? 'border-red-500/50 ring-1 ring-red-500' : 'border-white/10'}`}>
							<label className="block mb-1 text-[10px] font-bold uppercase tracking-wider text-white/70">Location</label>
							<input 
								type="text" 
								value={searchPayload.location}
								onChange={(e) => {
									setSearchPayload(prev => ({ ...prev, location: e.target.value }));
									setValidationErrors(prev => ({ ...prev, location: null }));
								}}
								placeholder="Where to?" 
								className="w-full text-sm font-semibold text-white bg-transparent outline-none placeholder-white/50"
							/>
							{validationErrors.location && (
								<span className="absolute left-2 -bottom-5 text-xs text-red-400 whitespace-nowrap">{validationErrors.location}</span>
							)}
						</div>
						
						<div className={`relative w-full flex-1 px-4 py-3 rounded-xl border bg-white/10 transition-colors hover:bg-white/20 ${validationErrors.date ? 'border-red-500/50 ring-1 ring-red-500' : 'border-white/10'}`}>
							<label className="block mb-1 text-[10px] font-bold uppercase tracking-wider text-white/70">Date</label>
							<input 
								type="date" 
								value={searchPayload.date}
								onChange={(e) => {
									setSearchPayload(prev => ({ ...prev, date: e.target.value }));
									setValidationErrors(prev => ({ ...prev, date: null }));
								}}
								className="w-full text-sm font-semibold text-white bg-transparent outline-none placeholder-white/50 [color-scheme:dark]"
							/>
							{validationErrors.date && (
								<span className="absolute left-2 -bottom-5 text-xs text-red-400 whitespace-nowrap">{validationErrors.date}</span>
							)}
						</div>

						<div className={`relative w-full flex-1 px-4 py-3 rounded-xl border bg-white/10 transition-colors hover:bg-white/20 ${validationErrors.budget ? 'border-red-500/50 ring-1 ring-red-500' : 'border-white/10'}`}>
							<label className="block mb-1 text-[10px] font-bold uppercase tracking-wider text-white/70">Budget</label>
							<select 
								value={searchPayload.budget}
								onChange={(e) => {
									setSearchPayload(prev => ({ ...prev, budget: e.target.value }));
									setValidationErrors(prev => ({ ...prev, budget: null }));
								}}
								className="w-full text-sm font-semibold text-white bg-transparent outline-none cursor-pointer appearance-none"
							>
								<option value="default" disabled className="text-slate-900">Select Budget</option>
								<option value="any" className="text-slate-900">Any Budget</option>
								<option value="low" className="text-slate-900">Economy</option>
								<option value="med" className="text-slate-900">Standard</option>
								<option value="high" className="text-slate-900">Luxury</option>
							</select>
							{validationErrors.budget && (
								<span className="absolute left-2 -bottom-5 text-xs text-red-400 whitespace-nowrap">{validationErrors.budget}</span>
							)}
						</div>

						<button 
							type="button"
							onClick={submitSearchQuery}
							disabled={isProcessing}
							className="flex items-center justify-center gap-2 w-full md:w-auto min-h-[52px] px-8 rounded-xl bg-[#d66847] text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#d66847]/30 transition-colors hover:bg-[#c55b3b] disabled:opacity-75 disabled:cursor-not-allowed"
						>
							{isProcessing ? (
								<>
									<svg className="w-5 h-5 -ml-1 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									<span>Searching...</span>
								</>
							) : (
								<>
									<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg>
									<span>Search</span>
								</>
							)}
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
