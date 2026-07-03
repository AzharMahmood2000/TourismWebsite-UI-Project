import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DEFAULT_ROUTES = [
	{ label: 'Home', path: '/' },
	{ label: 'Destination', path: '/destinations' },
	{ label: 'Tour Packages', path: '/tour-packages' },
	{ label: 'Gallery', path: '/gallery' },
	{ label: 'Contact Us', path: '/contact-us' },
	{ label: 'About Us', path: '/about-us' },
];

export default function Navbar() {
	const { pathname } = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const buildNavLinks = () => {
		if (pathname.startsWith('/destination/')) {
			return [
				{ label: 'Home', path: '/' },
				{ label: 'Destination', path: '/destinations' },
				{ label: 'Destination Detail', path: pathname, active: true, highlight: true }
			];
		}

		if (pathname.startsWith('/booking')) {
			return [
				{ label: 'Home', path: '/' },
				{ label: 'Contact Us', path: '/contact-us' },
				{ label: 'Booking', path: pathname, active: true, highlight: false }
			];
		}

		if (pathname.startsWith('/write-review')) {
			return [
				{ label: 'Home', path: '/' },
				{ label: 'Destination', path: '/destinations' },
				{ label: 'Write a Review', path: pathname, active: true, highlight: true }
			];
		}

		return DEFAULT_ROUTES.map(route => ({
			...route,
			active: pathname === route.path,
			highlight: false
		}));
	};

	const currentNavLinks = buildNavLinks();

	const linkClass = (active, highlight) => {
		if (active) {
			return highlight
				? 'font-bold border-b-2 border-[#a64b2a] text-[#a64b2a] pb-1'
				: 'font-semibold border-b-2 border-[#a64b2a] text-[#a64b2a] pb-1';
		}
		return 'font-semibold border-b-2 border-transparent text-slate-600 hover:text-[#d66847] pb-1 transition-colors';
	};

	return (
		<header className="sticky top-0 z-50 border-b border-white/70 bg-white/90 backdrop-blur-md">
			<div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
				<Link to="/" className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#d66847]">
					Gamanaya.com
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-8">
					{currentNavLinks.map(({ label, path, active, highlight }) => (
						<Link
							key={label}
							to={path}
							className={`text-sm ${linkClass(active, highlight)}`}
						>
							{label}
						</Link>
					))}
				</nav>

				{/* Mobile Hamburger Button */}
				<button
					type="button"
					aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
					onClick={() => setMobileMenuOpen(prev => !prev)}
					className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 rounded-lg text-slate-700 transition hover:bg-slate-100 focus:outline-none"
				>
					{mobileMenuOpen ? (
						<>
							<span className="block w-5 h-0.5 bg-current rotate-45 translate-y-[7px] transition-transform duration-200" />
							<span className="block w-5 h-0.5 bg-current opacity-0 transition-opacity duration-200" />
							<span className="block w-5 h-0.5 bg-current -rotate-45 -translate-y-[7px] transition-transform duration-200" />
						</>
					) : (
						<>
							<span className="block w-5 h-0.5 bg-current transition-transform duration-200" />
							<span className="block w-5 h-0.5 bg-current transition-opacity duration-200" />
							<span className="block w-5 h-0.5 bg-current transition-transform duration-200" />
						</>
					)}
				</button>
			</div>

			{/* Mobile Drawer — Glassmorphism Overlay */}
			{mobileMenuOpen && (
				<div className="md:hidden absolute inset-x-0 top-full z-40 min-h-[60dvh] border-t border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl">
					<nav className="flex flex-col items-center gap-6 px-6 pt-10 pb-16">
						{currentNavLinks.map(({ label, path, active, highlight }) => (
							<Link
								key={label}
								to={path}
								onClick={() => setMobileMenuOpen(false)}
								className={`text-base tracking-wide transition-colors ${
									active
										? highlight
											? 'font-extrabold text-[#a64b2a]'
											: 'font-extrabold text-[#a64b2a]'
										: 'font-semibold text-slate-700 hover:text-[#d66847]'
								}`}
							>
								{label}
							</Link>
						))}

						<div className="mt-4 w-full border-t border-slate-100 pt-6">
							<Link
								to="/booking"
								onClick={() => setMobileMenuOpen(false)}
								className="flex w-full items-center justify-center rounded-full bg-[#d66847] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#d66847]/25 transition hover:bg-[#c55b3b]"
							>
								Book Now
							</Link>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}
