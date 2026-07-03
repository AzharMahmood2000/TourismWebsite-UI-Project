import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

/* ═══════════════════════════════════════════════════════
   Service line items — each has a label, icon path, and price offset
   ═══════════════════════════════════════════════════════ */
const ALL_INCLUSIVE_SERVICES = [
	{
		id: 'hotel',
		label: 'Premium Hotel Accommodation',
		price: 12000,
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#d66847] shrink-0" aria-hidden="true">
				<path d="M2 4v16M2 8h20M2 17h20M22 4v16M2 12h20M6 8v4" />
			</svg>
		),
	},
	{
		id: 'transport',
		label: 'Private AC Transport',
		price: 8000,
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#d66847] shrink-0" aria-hidden="true">
				<rect x="3" y="11" width="18" height="8" rx="2" />
				<path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5M8 19v2M16 19v2" />
			</svg>
		),
	},
	{
		id: 'guide',
		label: 'Certified Tour Guide',
		price: 6000,
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#d66847] shrink-0" aria-hidden="true">
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
				<path d="m9 11 2 2 4-4" />
			</svg>
		),
	},
	{
		id: 'meals',
		label: 'All Meals Included',
		price: 7500,
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#d66847] shrink-0" aria-hidden="true">
				<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
			</svg>
		),
	},
];

const SINGLE_DESTINATION_SERVICES = [
	{
		id: 'admission',
		label: 'Sigiriya Site Admission',
		price: 5500,
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#d66847] shrink-0" aria-hidden="true">
				<path d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 1 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 0-4V7a2 2 0 0 1 2-2z" />
			</svg>
		),
	},
	{
		id: 'guide',
		label: 'Expert Local Guide',
		price: 4000,
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#d66847] shrink-0" aria-hidden="true">
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
				<path d="m9 11 2 2 4-4" />
			</svg>
		),
	},
	{
		id: 'transfer',
		label: 'Drop-off & Pick-up Transfer',
		price: 3500,
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#d66847] shrink-0" aria-hidden="true">
				<rect x="3" y="11" width="18" height="8" rx="2" />
				<path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5M8 19v2M16 19v2" />
			</svg>
		),
	},
];

/* ═══════════════════════════════════════════════════════
   BookingPage Component
   ═══════════════════════════════════════════════════════ */
export default function BookingPage() {
	const locationState = useLocation().state;
	const navigate = useNavigate();

	/* ── Tab mode: 'package' | 'single' ── */
	const [bookingMode, setBookingMode] = useState('package');
	const [isTransitioning, setIsTransitioning] = useState(false);

	/* ── Service checkbox selections ── */
	const [selectedServices, setSelectedServices] = useState(() =>
		Object.fromEntries([...ALL_INCLUSIVE_SERVICES, ...SINGLE_DESTINATION_SERVICES].map((s) => [s.id, true]))
	);

	/* ── Form state ── */
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		phone: '',
		travelDate: '',
		travelers: 1,
		notes: '',
	});

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	/* ── Derived price values ── */
	const defaultPrice = 'LKR 45,000';
	const displayPrice = locationState?.price || defaultPrice;
	const basePrice = parseInt(displayPrice.replace(/[^0-9]/g, '')) || 45000;
	const currencyPrefix = displayPrice.trim().toLowerCase().startsWith('rs') ? 'Rs. ' : 'LKR ';

	const activeServices = bookingMode === 'package' ? ALL_INCLUSIVE_SERVICES : SINGLE_DESTINATION_SERVICES;
	const serviceAddons = activeServices
		.filter((s) => selectedServices[s.id])
		.reduce((sum, s) => sum + s.price, 0);
	const estimatedTotal = (basePrice + serviceAddons) * formData.travelers;

	/* ── Tab switching with fade animation ── */
	const handleModeSwitch = (mode) => {
		if (mode === bookingMode) return;
		setIsTransitioning(true);
		setTimeout(() => {
			setBookingMode(mode);
			setIsTransitioning(false);
		}, 220);
	};

	const toggleService = (id) => {
		setSelectedServices((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const handleTravelerChange = (e) => {
		setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate('/booking-success');
	};

	/* ── Sidebar text based on mode ── */
	const sidebarTitle =
		bookingMode === 'package'
			? locationState?.title || 'Cultural Heritage Expedition'
			: 'Sigiriya Rock Fortress — Custom Admission';
	const sidebarLocation =
		bookingMode === 'package'
			? locationState?.location || 'Central Province, Sri Lanka'
			: 'Matale District · Central Province';
	const sidebarDuration =
		bookingMode === 'package' ? '3 Nights / 4 Days' : '1 Day · Sunrise to Sunset';
	const sidebarImage =
		bookingMode === 'package'
			? '/assets/images/cultural_heritage_expedition.jpg'
			: '/assets/images/Sigiriya/sigiriya%201.jpg';

	// Mapping of package titles to their grouped dynamic route milestones
	const getRouteMilestones = (title) => {
		const key = (title || '').trim().toUpperCase();
		const routeMilestones = {
			'TEA COUNTRY TRAILS': 'Highland Journey: Nuwara Eliya, Ella & Kandy',
			'SOUTHERN COASTAL ESCAPE': 'Coastal Expedition: Galle, Mirissa & Trincomalee',
			'ANCIENT KINGDOM TOUR': 'Cultural Triangle Tour: Sigiriya, Polonnaruwa & Dambulla',
			'WILDHEART OF YALA': 'Wilderness Trail: Yala Safari, Udawalawe & Ella',
			'CENTRAL HIGHLANDS SECRET': 'Highlands Secret: Horton Plains, Diyaluma & Ravana',
			'SOUL OF KANDY': 'Spiritual Heart: Temple of Tooth, Peradeniya & Kandy Lake',
			'CULTURAL HERITAGE EXPEDITION': 'Cultural Triangle Tour: Sigiriya, Dambulla & Kandy',
		};
		return routeMilestones[key] || routeMilestones['CULTURAL HERITAGE EXPEDITION'];
	};

	const packageRouteMilestones = getRouteMilestones(sidebarTitle);

	return (
		<div className="min-h-screen bg-[#fffaf8] relative w-full block font-sans">
			<Navbar />

			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

				{/* ════════════════════════════════════════════
				    SEGMENTED TAB TOGGLE — full width at top
				    ════════════════════════════════════════════ */}
				{!locationState?.isPackage && (
					<div className="mb-10 mt-4 flex justify-center">
						<div className="relative inline-flex items-center bg-slate-100 rounded-xl p-1 shadow-inner gap-0">
							{/* Sliding highlight pill */}
							<span
								className="absolute top-1 bottom-1 rounded-[10px] bg-white shadow-md transition-all duration-300 ease-out"
								style={{
									left: bookingMode === 'package' ? '4px' : '50%',
									width: 'calc(50% - 4px)',
								}}
							/>

							{/* Tab 1 */}
							<button
								type="button"
								onClick={() => handleModeSwitch('package')}
								className={`relative z-10 px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] rounded-[10px] transition-colors duration-300 ${
									bookingMode === 'package' ? 'text-[#d66847]' : 'text-slate-500 hover:text-slate-700'
								}`}
							>
								All-inclusive Package
							</button>

							{/* Tab 2 */}
							<button
								type="button"
								onClick={() => handleModeSwitch('single')}
								className={`relative z-10 px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] rounded-[10px] transition-colors duration-300 ${
									bookingMode === 'single' ? 'text-[#d66847]' : 'text-slate-500 hover:text-slate-700'
								}`}
							>
								Single Destination Only
							</button>
						</div>
					</div>
				)}

				{/* ════════════════════════════════════════════
				    TWO-COLUMN LAYOUT — fades on mode switch
				    ════════════════════════════════════════════ */}
				<div
					className="grid grid-cols-1 lg:grid-cols-12 gap-12 transition-all duration-300"
					style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)' }}
				>
					{/* ─── LEFT SIDEBAR — Package Summary Card ─── */}
					<div className="lg:col-span-4 flex flex-col h-full">
						<div className="border border-slate-100 p-6 rounded-2xl shadow-sm bg-white flex flex-col h-full">

							{/* Image Header */}
							<div className="relative overflow-hidden rounded-xl shrink-0">
								<img
									key={sidebarImage}
									src={sidebarImage}
									alt={sidebarTitle}
									className="w-full h-48 object-cover block shadow-sm transition-all duration-500"
								/>
								<div className="absolute inset-0 bg-[#d66847]/5 pointer-events-none rounded-xl" />
								{/* Mode badge */}
								<span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-white shadow-sm ${bookingMode === 'package' ? 'bg-[#d66847]' : 'bg-slate-800'}`}>
									{bookingMode === 'package' ? '✦ Full Package' : '◎ Single Visit'}
								</span>
							</div>

							{/* Summary Details */}
							<div className="mt-5 space-y-2">
								{bookingMode === 'package' ? (
									<>
										{/* Dynamic Route Milestones Title */}
										<h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
											{packageRouteMilestones}
										</h2>
										<div className="flex items-center gap-1.5 mt-1">
											<span className="text-[10px] text-[#d66847] font-bold uppercase tracking-wider bg-[#d66847]/5 px-2 py-0.5 rounded">
												{sidebarTitle}
											</span>
										</div>
									</>
								) : (
									<h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
										{sidebarTitle}
									</h2>
								)}
								<p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
									{sidebarLocation}
								</p>
							</div>

							<div className="my-4 border-t border-slate-100" />

							{/* Duration */}
							<div className="flex justify-between items-center text-xs py-1">
								<span className="text-slate-500 font-semibold uppercase tracking-wider">Duration</span>
								<span className="text-slate-800 font-extrabold text-sm">{sidebarDuration}</span>
							</div>

							<div className="my-4 border-t border-slate-100" />

							{/* Included Services — Interactive Checkboxes or Locked Display */}
							<div className="flex-1">
								<span className="text-[10px] font-bold text-[#d66847] uppercase tracking-widest mb-3.5 block">
									{bookingMode === 'package' ? 'Included Services' : 'Add-on Options'}
								</span>
								<ul className="space-y-3.5">
									{activeServices.map((service) => {
										// Lock the checkbox to true if in package mode
										const isChecked = bookingMode === 'package' ? true : (selectedServices[service.id] ?? true);
										const isLocked = bookingMode === 'package';

										return (
											<li key={service.id}>
												<label 
													className={`flex items-center gap-3 ${
														isLocked ? 'cursor-default' : 'cursor-pointer group'
													}`}
												>
													{/* Checkbox wrapper */}
													<span className="relative flex-shrink-0">
														<input
															type="checkbox"
															checked={isChecked}
															disabled={isLocked}
															onChange={() => !isLocked && toggleService(service.id)}
															className="sr-only"
														/>
														<span 
															className={`flex h-4.5 w-4.5 items-center justify-center rounded border-2 transition-all duration-200 ${
																isChecked 
																	? 'border-[#d66847] bg-[#d66847]' 
																	: 'border-slate-300 bg-white group-hover:border-[#d66847]'
															}`}
															style={{ width: '18px', height: '18px' }}
														>
															{isChecked && (
																<svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 12 10">
																	<path d="M1 5l3 4 7-8" strokeLinecap="round" strokeLinejoin="round" />
																</svg>
															)}
														</span>
													</span>
													{service.icon}
													<span 
														className={`text-xs font-semibold transition-colors duration-200 ${
															isChecked ? 'text-slate-700' : 'text-slate-400 line-through'
														}`}
													>
														{service.label}
													</span>
													<span 
														className={`ml-auto text-[10px] font-bold uppercase tracking-wider shrink-0 ${
															isLocked ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded' : 'text-slate-400'
														}`}
													>
														{isLocked ? 'Included' : `+LKR ${service.price.toLocaleString()}`}
													</span>
												</label>
											</li>
										);
									})}
								</ul>
							</div>

							<div className="my-5 border-t border-slate-100" />

							{/* Base Pricing */}
							<div className="pt-2 flex flex-col">
								<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">
									Base Pricing
								</span>
								<p className="text-sm font-bold text-slate-700">
									{bookingMode === 'package' ? 'Package Total ' : 'From '}
									<span className="text-lg font-black text-[#d66847]">{displayPrice}</span> / person
								</p>
							</div>
						</div>
					</div>

					{/* ─── RIGHT COLUMN — Booking Form ─── */}
					<div className="lg:col-span-8 flex flex-col justify-between">
						<div>
							<div className="flex items-start justify-between gap-4">
								<div>
									<h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
										Complete Your Booking Request
									</h1>
									<p className="mt-3 text-xs leading-relaxed text-slate-500 max-w-xl">
										{bookingMode === 'package'
											? 'Please provide your details below. Our travel consultants will verify availability and contact you within 24 hours to finalize your itinerary.'
											: 'Booking a single destination visit to Sigiriya. Select your preferred add-ons above and fill in your details below.'}
									</p>
								</div>
							</div>

							<form onSubmit={handleSubmit} className="mt-8 space-y-5">

								{/* Name & Email */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									<div>
										<label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
											Full Name
										</label>
										<input
											type="text"
											required
											value={formData.fullName}
											onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
											placeholder="Ishara Perera"
											className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb] shadow-sm"
										/>
									</div>
									<div>
										<label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
											Email Address
										</label>
										<input
											type="email"
											required
											value={formData.email}
											onChange={(e) => setFormData({ ...formData, email: e.target.value })}
											placeholder="example@gmail.com"
											className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb] shadow-sm"
										/>
									</div>
								</div>

								{/* Phone & Travel Date */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									<div>
										<label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
											Phone Number
										</label>
										<input
											type="tel"
											required
											value={formData.phone}
											onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
											placeholder="077-3487980"
											className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb] shadow-sm"
										/>
									</div>
									<div>
										<label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
											Preferred Travel Date
										</label>
										<input
											type="date"
											required
											value={formData.travelDate}
											onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
											className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb] shadow-sm"
										/>
									</div>
								</div>

								{/* Number of Travelers */}
								<div>
									<label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
										Number of Travelers
									</label>
									<select
										value={formData.travelers}
										onChange={handleTravelerChange}
										className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white focus:border-[#d66847] focus:outline-none transition-colors shadow-sm"
									>
										<option value={1}>1 Person</option>
										<option value={2}>2 People</option>
										<option value={3}>3 People</option>
										<option value={4}>4 People</option>
										<option value={5}>5 People</option>
										<option value={6}>6+ People</option>
									</select>
								</div>

								{/* Custom Requests */}
								<div>
									<label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
										Custom Requests / Notes
									</label>
									<textarea
										value={formData.notes}
										onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
										placeholder="Mention any dietary requirements, special occasions, or accessibility needs..."
										className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 h-28 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb] shadow-sm resize-none"
									/>
								</div>

								{/* ════════════════════════════════════════════
								    DYNAMIC PRICE CALCULATION BLOCK
								    ════════════════════════════════════════════ */}
								<div className="bg-[#fdf4f0] p-6 rounded-2xl mt-6 border border-[#fce4d6]/50">
									{/* Service breakdown */}
									<div className="space-y-2 pb-3 border-b border-[#fce4d6]">
										<div className="flex justify-between items-center text-xs font-semibold text-slate-500">
											<span>Base rate ({formData.travelers} {formData.travelers === 1 ? 'person' : 'people'})</span>
											<span>{currencyPrefix}{(basePrice * formData.travelers).toLocaleString()}</span>
										</div>
										{bookingMode === 'package' ? (
											// In package mode, show that all services are included in the package base price
											activeServices.map((s) => (
												<div key={s.id} className="flex justify-between items-center text-xs text-slate-500">
													<span className="font-medium">+ {s.label}</span>
													<span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
														Included
													</span>
												</div>
											))
										) : (
											// In single destination mode, show add-ons
											<>
												{activeServices.filter((s) => selectedServices[s.id]).map((s) => (
													<div key={s.id} className="flex justify-between items-center text-xs text-slate-500">
														<span className="font-medium">+ {s.label}</span>
														<span className="font-semibold">+{currencyPrefix}{(s.price * formData.travelers).toLocaleString()}</span>
													</div>
												))}
												{activeServices.filter((s) => !selectedServices[s.id]).map((s) => (
													<div key={s.id} className="flex justify-between items-center text-xs text-slate-400 line-through">
														<span>+ {s.label}</span>
														<span>+{currencyPrefix}{(s.price * formData.travelers).toLocaleString()}</span>
													</div>
												))}
											</>
										)}
									</div>
									{/* Grand total */}
									<div className="flex justify-between items-center pt-3">
										<span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
											Estimated Total
										</span>
										<span className="text-xl font-black text-[#d66847] transition-all duration-300">
											{currencyPrefix}
											{(bookingMode === 'package' 
												? basePrice * formData.travelers 
												: (basePrice + serviceAddons) * formData.travelers
											).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
										</span>
									</div>
								</div>

								{/* Submit */}
								<button
									type="submit"
									className="w-full mt-6 py-3.5 bg-[#1e1e1e] hover:bg-[#d66847] text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-sm active:scale-95"
								>
									Submit Booking Inquiry
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
