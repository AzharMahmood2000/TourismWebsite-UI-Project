import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function BookingSuccessPage() {
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	return (
		<div className="min-h-screen bg-[#fffaf8] relative w-full block font-sans">
			<Navbar />

			{/* ════════════════════════════════════════════
			    MAIN SUCCESS INFORMATION CONTAINER
			    ════════════════════════════════════════════ */}
			<section className="mx-auto max-w-5xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-center">
				{/* Checkmark Badge */}
				<div className="bg-[#fdf4f0] w-16 h-16 rounded-2xl flex items-center justify-center text-[#d66847] mx-auto mb-8 relative border border-[#fce4d6]/60">
					{/* Checkmark Circle SVG */}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#9c3e21]">
						<polyline points="20 6 9 17 4 12" />
					</svg>

					{/* Top Right Star Badge */}
					<div className="absolute -top-1.5 -right-1.5 bg-white border border-slate-100 rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
						<svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 text-amber-400">
							<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
						</svg>
					</div>
				</div>

				{/* Headings */}
				<h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
					Your Journey Begins Here
				</h1>
				<p className="text-xs leading-relaxed text-slate-500 max-w-lg mx-auto mb-8">
					Thank you for choosing Travelarch. We've received your inquiry. A dedicated travel 
					specialist will craft a personalized response and reach out to you within 24 hours 
					to begin planning your bespoke escape.
				</p>

				{/* Action CTAs */}
				<div className="flex flex-wrap justify-center gap-4 mb-16">
					<button
						type="button"
						onClick={() => navigate('/')}
						className="px-6 py-3 bg-[#8e3d23] hover:bg-[#d66847] text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 shadow-sm hover:shadow active:scale-95"
					>
						Return to Homepage
					</button>

					<button
						type="button"
						onClick={() => navigate('/destinations')}
						className="px-6 py-3 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider rounded bg-white hover:bg-slate-50 transition-all duration-300 shadow-sm active:scale-95"
					>
						Explore Destinations
					</button>
				</div>

				{/* Next Steps Card Matrix */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 text-center">
					{/* Card 1: Confirmation Email */}
					<div className="border border-slate-100 p-6 rounded-lg bg-white shadow-sm flex flex-col items-center min-h-[160px] hover:shadow-md transition-shadow">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#d66847] mb-4">
							<rect width="20" height="16" x="2" y="4" rx="2" />
							<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
						</svg>
						<h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
							Confirmation Email
						</h3>
						<p className="text-[10.5px] leading-relaxed text-slate-500">
							A copy of your inquiry details has been sent to your inbox.
						</p>
					</div>

					{/* Card 2: What's Next? */}
					<div className="border border-slate-100 p-6 rounded-lg bg-white shadow-sm flex flex-col items-center min-h-[160px] hover:shadow-md transition-shadow">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#d66847] mb-4">
							<path d="M8 2v4" />
							<path d="M16 2v4" />
							<rect width="18" height="18" x="3" y="4" rx="2" />
							<path d="M3 10h18" />
						</svg>
						<h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
							What's Next?
						</h3>
						<p className="text-[10.5px] leading-relaxed text-slate-500">
							Schedule a brief discovery call once you receive our initial proposal.
						</p>
					</div>

					{/* Card 3: Expert Curation */}
					<div className="border border-slate-100 p-6 rounded-lg bg-white shadow-sm flex flex-col items-center min-h-[160px] hover:shadow-md transition-shadow">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#d66847] mb-4">
							<circle cx="12" cy="12" r="10" />
							<polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
						</svg>
						<h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
							Expert Curation
						</h3>
						<p className="text-[10.5px] leading-relaxed text-slate-500">
							Our specialists are reviewing your preferences for a custom fit.
						</p>
					</div>
				</div>

				{/* Scenic Panoramic Kandy Lake Banner */}
				<div className="max-w-4xl mx-auto rounded-md overflow-hidden shadow-sm mb-12">
					<img
						src="/assets/images/kandy.jpg"
						alt="Kandy Temple lake sunset reflection"
						className="w-full h-80 object-cover rounded-md block transition-transform duration-700 hover:scale-102"
					/>
				</div>
			</section>

			<Footer />
		</div>
	);
}
