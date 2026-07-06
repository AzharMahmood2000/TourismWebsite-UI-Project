import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuth();
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

	const handleProfileClick = () => {
		if (isAuthenticated) {
			navigate('/profile');
		} else {
			navigate('/login');
		}
	};

	const renderAvatar = () => {
		if (isAuthenticated && user?.avatar) {
			return (
				<img
					src={user.avatar}
					alt={user.name || 'User'}
					className="w-full h-full object-cover rounded-full"
				/>
			);
		}
		if (isAuthenticated) {
			const initials = (user?.name || 'U')
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2);
			return (
				<div className="w-full h-full flex items-center justify-center bg-[#d66847]/10 text-[#d66847] text-xs font-bold rounded-full">
					{initials}
				</div>
			);
		}
		return (
			<div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
					<circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>
		);
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

				{/* Right Side Actions: Avatar + Mob Controls */}
				<div className="flex items-center gap-4">
					{/* Profile Avatar */}
					<div className="relative">
						<button
							id="nav-profile-btn"
							type="button"
							onClick={handleProfileClick}
							className="w-9 h-9 sm:w-10 sm:h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d66847]/40 overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95"
							aria-label="Profile actions"
						>
							{renderAvatar()}
						</button>
					</div>

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

						{/* Divider & extra mobile links */}
						<div className="w-full border-t border-slate-100 pt-6 flex flex-col gap-4 items-center">
							{isAuthenticated ? (
								<>
									<Link
										to="/profile"
										onClick={() => setMobileMenuOpen(false)}
										className="text-base font-bold text-slate-700 hover:text-[#d66847] transition-colors"
									>
										My Profile
									</Link>
									<button
										type="button"
										onClick={() => {
											setMobileMenuOpen(false);
											logout();
											navigate('/');
										}}
										className="text-base font-bold text-red-500 hover:text-red-600 transition-colors"
									>
										Log Out
									</button>
								</>
							) : (
								<>
									<Link
										to="/login"
										onClick={() => setMobileMenuOpen(false)}
										className="text-base font-bold text-slate-700 hover:text-[#d66847] transition-colors"
									>
										Log In
									</Link>
									<Link
										to="/register"
										onClick={() => setMobileMenuOpen(false)}
										className="text-base font-bold text-slate-700 hover:text-[#d66847] transition-colors"
									>
										Register
									</Link>
								</>
							)}
						</div>

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
