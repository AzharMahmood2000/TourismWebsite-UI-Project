import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import AuthenticationOverlay from '../Components/AuthenticationOverlay';
import { useAuth } from '../context/AuthContext';

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
import API_BASE_URL from '../api/api';

export default function BookingPage() {
	const loc = useLocation();
	const locationState = loc.state;
	const searchParams = new URLSearchParams(loc.search);
	const queryType = searchParams.get('type');
	const queryDestinationId = searchParams.get('destinationId');
	const queryPackageId = searchParams.get('packageId');
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	/* ── Tab mode: 'package' | 'single' ── */
	const [bookingMode, setBookingMode] = useState(queryType === 'single' ? 'single' : 'package');
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [fetchedDest, setFetchedDest] = useState(null);
	const [fetchedPackage, setFetchedPackage] = useState(null);

	/* ── Service checkbox selections ── */
	const [selectedServices, setSelectedServices] = useState(() =>
		Object.fromEntries([...ALL_INCLUSIVE_SERVICES, ...SINGLE_DESTINATION_SERVICES].map((s) => [s.id, true]))
	);

	/* ── Destination list memory tracking ── */
	const [allDestinations, setAllDestinations] = useState([]);
	const [allPackages, setAllPackages] = useState([]);

	/* ── Destination options (Packages) ── */
	const DESTINATIONS = [
		'Sigiriya Rock Fortress',
		'Temple of the Tooth Relic — Kandy',
		'Yala National Park Safari',
		'Galle Dutch Fort',
		'Horton Plains National Park',
		'Udawalawe Elephant Sanctuary',
		'Nine Arches Bridge — Ella',
		'Mirissa Beach & Whale Watching',
		'Dambulla Cave Temple',
		'Polonnaruwa Ancient City',
		'Nuwara Eliya Tea Country',
		'Ravana Falls — Ella',
		'Trincomalee Beaches',
		'Kumana (Yala East) National Park',
	];

	/* ── Today's date string for min attribute ── */
	const todayStr = new Date().toISOString().split('T')[0];

	/* ── Form state ── */
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		destination: '',
		travelDate: '',
		travelers: 1,
		notes: '',
	});

	/* ── Field-level errors ── */
	const [formErrors, setFormErrors] = useState({});

	const validateForm = () => {
		const errs = {};
		if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';
		if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
		else if (!/^[\d\s\-+()]{7,15}$/.test(formData.phone.trim()))
			errs.phone = 'Enter a valid phone number.';
		if (!formData.destination) errs.destination = 'Please select a destination.';
		if (!formData.travelDate) errs.travelDate = 'Please choose a travel date.';
		else if (formData.travelDate < todayStr) errs.travelDate = 'Travel date cannot be in the past.';
		return errs;
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });

		const fetchData = async () => {
			try {
				const resAll = await fetch(`${API_BASE_URL}/api/destinations`);
				if (!resAll.ok) throw new Error();
				const dbDestinations = await resAll.json();
				setAllDestinations(dbDestinations);

				if (queryType === 'single' && queryDestinationId) {
					const destinationFound = dbDestinations.find(d => d._id === queryDestinationId);
					if (destinationFound) {
						setFetchedDest(destinationFound);
						setFormData(prev => ({ ...prev, destination: destinationFound._id }));

						if (destinationFound.singleVisit?.addOns?.length) {
							const addonServices = destinationFound.singleVisit.addOns.map((addId, idx) => [
								`addon_${idx}`, true
							]);
							setSelectedServices(prev => ({ ...prev, ...Object.fromEntries(addonServices) }));
						}
					}
				}
			} catch (e) {
				console.error("Failed to load DB destinations.", e);
			}

			try {
				const pRes = await fetch(`${API_BASE_URL}/api/packages`);
				if (pRes.ok) {
					const pData = await pRes.json();
					setAllPackages(pData);
					
					if (queryType === 'package' && queryPackageId) {
						const pkgFound = pData.find(p => p._id === queryPackageId || p.packageId === queryPackageId);
						if (pkgFound) {
							setFetchedPackage(pkgFound);
							setFormData(prev => ({ ...prev, destination: pkgFound._id }));
						}
					}
				}
			} catch (e) {
				console.error("Failed to load DB packages.", e);
			}
		};

		fetchData();
	}, [queryType, queryDestinationId, queryPackageId]);

	/* ── Derived price values ── */
	const defaultPrice = 'LKR 45,000';
	const displayPrice = bookingMode === 'single' && fetchedDest?.singleVisit?.pricePerPerson 
      ? `Rs. ${fetchedDest.singleVisit.pricePerPerson}`
      : (fetchedPackage?.price ? `Rs. ${fetchedPackage.price}` : locationState?.price || defaultPrice);
	const basePrice = parseInt(displayPrice.replace(/[^0-9]/g, '')) || 45000;
	const currencyPrefix = displayPrice.trim().toLowerCase().startsWith('rs') ? 'Rs. ' : 'LKR ';

    // Format single addons nicely
    const singleDataAddons = fetchedDest?.singleVisit?.addOns?.map((add, idx) => ({
      id: `addon_${idx}`,
      label: add.name,
      price: add.price,
      icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#d66847] shrink-0" aria-hidden="true">
				<path d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 1 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 0-4V7a2 2 0 0 1 2-2z" />
			</svg>
      )
    })) || SINGLE_DESTINATION_SERVICES;

	const activeServices = bookingMode === 'package' ? ALL_INCLUSIVE_SERVICES : singleDataAddons;
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
		const errs = validateForm();
		if (Object.keys(errs).length) { setFormErrors(errs); return; }
		setFormErrors({});
		navigate('/booking-success');
	};

	const handleDestinationChange = (e) => {
		const destId = e.target.value;
		setFormData((prev) => ({ ...prev, destination: destId }));
		if (formErrors.destination) setFormErrors((prev) => ({ ...prev, destination: undefined }));

		if (bookingMode === 'single') {
			const found = allDestinations.find(d => d._id === destId || d.title === destId);
			if (found) {
				setFetchedDest(found);
				if (found.singleVisit?.addOns?.length) {
					const addonServices = found.singleVisit.addOns.map((addId, idx) => [
						`addon_${idx}`, true
					]);
					setSelectedServices(prev => ({ ...prev, ...Object.fromEntries(addonServices) }));
				} else {
					// Re-initialize default singles if missing
					setSelectedServices(prev => ({
						...prev,
						...Object.fromEntries(SINGLE_DESTINATION_SERVICES.map(s => [s.id, true]))
					}));
				}
			}
		} else {
			const foundPkg = allPackages.find(p => p._id === destId || p.title === destId);
			if (foundPkg) {
				setFetchedPackage(foundPkg);
			}
		}
	};

	const field = (name) => ({
		value: formData[name],
		onChange: (e) => {
			setFormData((prev) => ({ ...prev, [name]: e.target.value }));
			if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: undefined }));
		},
	});

	// Override field for destination map to handle DB data
	const destField = {
		value: formData.destination,
		onChange: handleDestinationChange
	};

	const inputCls = (name) =>
		`w-full border rounded-xl px-4 py-3 text-xs font-semibold placeholder-slate-300 focus:outline-none transition-all duration-200 bg-[#fffcfb] shadow-sm ${
			formErrors[name]
				? 'border-red-400 focus:border-red-400 text-red-700'
				: 'border-slate-200 focus:border-[#d66847] text-slate-700'
		}`;

	const getImageSrc = (img) => {
		if (!img || typeof img !== 'string') return '';
		if (img.startsWith('http') || img.startsWith('data:')) return img;
		return `${API_BASE_URL}${img.startsWith('/') ? img : `/${img}`}`;
	};

	/* ── Sidebar text based on mode ── */
	const sidebarTitle =
		bookingMode === 'package'
			? fetchedPackage?.title || locationState?.title || 'Cultural Heritage Expedition'
			: fetchedDest?.title || 'Sigiriya Rock Fortress — Custom Admission';
	const sidebarLocation =
		bookingMode === 'package'
			? fetchedPackage?.category || locationState?.location || 'Central Province, Sri Lanka'
			: fetchedDest?.location || fetchedDest?.region || 'Matale District · Central Province';
	const sidebarDuration =
		bookingMode === 'package' 
            ? fetchedPackage?.duration || '3 Nights / 4 Days' 
            : fetchedDest?.singleVisit?.duration || '1 Day · Sunrise to Sunset';
	const sidebarImage =
		bookingMode === 'package'
			? (fetchedPackage?.image ? getImageSrc(fetchedPackage.image) : '/assets/images/cultural_heritage_expedition.jpg')
			: (fetchedDest?.image ? getImageSrc(fetchedDest.image) : '/assets/images/Sigiriya/sigiriya%201.jpg');

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
			{/* ── Authentication Gate Overlay ── */}
			{!isAuthenticated && <AuthenticationOverlay returnPath="/booking" />}

			<Navbar />

			{/* Booking content — pointer-events disabled while unauthenticated */}
			<div
				aria-hidden={!isAuthenticated}
				{...(!isAuthenticated ? { inert: '' } : {})}
				className={!isAuthenticated ? 'pointer-events-none select-none' : ''}
				style={!isAuthenticated ? { userSelect: 'none' } : {}}
			>
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

				{/* ════════════════════════════════════════════
				    SEGMENTED TAB TOGGLE — full width at top
				    ════════════════════════════════════════════ */}
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
								disabled={queryType === 'single'}
								className={`relative z-10 px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] rounded-[10px] transition-colors duration-300 ${
									bookingMode === 'package' ? 'text-[#d66847]' : 'text-slate-500 hover:text-slate-700'
								} ${
									queryType === 'single' ? 'opacity-50 cursor-not-allowed hover:text-slate-500' : ''
								}`}
							>
								All-inclusive Package
							</button>

							{/* Tab 2 */}
							<button
								type="button"
								onClick={() => handleModeSwitch('single')}
								disabled={queryType === 'package'}
								className={`relative z-10 px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] rounded-[10px] transition-colors duration-300 ${
									bookingMode === 'single' ? 'text-[#d66847]' : 'text-slate-500 hover:text-slate-700'
								} ${
									queryType === 'package' ? 'opacity-50 cursor-not-allowed hover:text-slate-500' : ''
								}`}
							>
								Single Destination Only
							</button>
						</div>
					</div>

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

							<form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">

								{/* ── Row 1: Full Name + Phone ── */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									{/* Full Name */}
									<div>
										<label htmlFor="bk-fullname" className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
											Full Name <span className="text-[#d66847]" aria-hidden>*</span>
										</label>
										<input
											id="bk-fullname"
											type="text"
											placeholder="Ishara Perera"
											autoComplete="name"
											{...field('fullName')}
											className={inputCls('fullName')}
										/>
										{formErrors.fullName && (
											<p className="mt-1.5 text-[10px] text-red-500 font-semibold flex items-center gap-1">
												<span aria-hidden>⚠</span> {formErrors.fullName}
											</p>
										)}
									</div>

									{/* Phone Number */}
									<div>
										<label htmlFor="bk-phone" className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
											Phone Number <span className="text-[#d66847]" aria-hidden>*</span>
										</label>
										<input
											id="bk-phone"
											type="tel"
											placeholder="077-348 7980"
											autoComplete="tel"
											{...field('phone')}
											className={inputCls('phone')}
										/>
										{formErrors.phone && (
											<p className="mt-1.5 text-[10px] text-red-500 font-semibold flex items-center gap-1">
												<span aria-hidden>⚠</span> {formErrors.phone}
											</p>
										)}
									</div>
								</div>

								{/* ── Row 2: Destination + Travel Date ── */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									{/* Destination */}
									<div>
										<label htmlFor="bk-destination" className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
											Destination <span className="text-[#d66847]" aria-hidden>*</span>
										</label>
										<div className="relative">
											<select
												id="bk-destination"
												{...destField}
												className={`${inputCls('destination')} appearance-none pr-10 bg-[#fffcfb]`}
											>
												<option value="">Select a destination…</option>
												{bookingMode === 'single'
													? allDestinations.map((d) => (
															<option key={d._id} value={d._id}>
																{d.title}
															</option>
														))
													: allPackages.map((p) => (
															<option key={p._id} value={p._id}>
																{p.title}
															</option>
														))}
											</select>
											{/* Chevron icon */}
											<svg
												viewBox="0 0 20 20" fill="currentColor"
												className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
												aria-hidden
											>
												<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
											</svg>
										</div>
										{formErrors.destination && (
											<p className="mt-1.5 text-[10px] text-red-500 font-semibold flex items-center gap-1">
												<span aria-hidden>⚠</span> {formErrors.destination}
											</p>
										)}
									</div>

									{/* Travel Date */}
									<div>
										<label htmlFor="bk-date" className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
											Preferred Travel Date <span className="text-[#d66847]" aria-hidden>*</span>
										</label>
										<input
											id="bk-date"
											type="date"
											min={todayStr}
											{...field('travelDate')}
											className={inputCls('travelDate')}
										/>
										{formErrors.travelDate && (
											<p className="mt-1.5 text-[10px] text-red-500 font-semibold flex items-center gap-1">
												<span aria-hidden>⚠</span> {formErrors.travelDate}
											</p>
										)}
									</div>
								</div>

								{/* ── Number of Travelers (full width) ── */}
								<div>
									<label htmlFor="bk-travelers" className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
										Number of Travelers <span className="text-[#d66847]" aria-hidden>*</span>
									</label>
									<div className="relative">
										<select
											id="bk-travelers"
											value={formData.travelers}
											onChange={handleTravelerChange}
											className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 bg-[#fffcfb] focus:border-[#d66847] focus:outline-none transition-all duration-200 shadow-sm appearance-none pr-10"
										>
											<option value={1}>1 Person</option>
											<option value={2}>2 People</option>
											<option value={3}>3 People</option>
											<option value={4}>4 People</option>
											<option value={5}>5 People</option>
											<option value={6}>6+ People</option>
										</select>
										<svg viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden>
											<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
										</svg>
									</div>
								</div>

								{/* ── Special Requests (optional) ── */}
								<div>
									<label htmlFor="bk-notes" className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
										Special Requests
										<span className="ml-1.5 text-[9px] font-medium text-slate-400 normal-case tracking-normal">— optional</span>
									</label>
									<textarea
										id="bk-notes"
										{...field('notes')}
										placeholder="Dietary requirements, accessibility needs, special occasions…"
										className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 placeholder-slate-300 h-28 focus:border-[#d66847] focus:outline-none transition-all duration-200 bg-[#fffcfb] shadow-sm resize-none"
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

								{/* ── Helper note ── */}
								<p className="flex items-center gap-2 text-[10px] text-slate-400 font-medium leading-relaxed">
									<svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-[#d66847] shrink-0" aria-hidden>
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
									</svg>
									Booking confirmation will be sent to your registered account email.
								</p>

								{/* Submit */}
								<button
									type="submit"
									className="w-full mt-2 py-3.5 bg-[#1e1e1e] hover:bg-[#d66847] text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-sm active:scale-95"
								>
									Submit Booking Inquiry
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>

			<Footer />
			</div>{/* end inert content wrapper */}
		</div>
	);
}
