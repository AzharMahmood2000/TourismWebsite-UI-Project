import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		category: '',
		message: ''
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState("");

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitError("");
		try {
			const res = await fetch("http://localhost:5000/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					subject: formData.category,
					message: formData.message,
				}),
			});
			if (!res.ok) throw new Error("Failed");
			setIsSubmitted(true);
			setTimeout(() => {
				setIsSubmitted(false);
				setFormData({ name: '', email: '', category: '', message: '' });
			}, 3500);
		} catch (err) {
			setSubmitError("Failed to send message. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-[#fffaf8] relative w-full block font-sans">
			<Navbar />

			{/* ════════════════════════════════════════════
			    PAGE HEADER SECTION
			    ════════════════════════════════════════════ */}
			<section className="mx-auto max-w-7xl px-4 pt-16 pb-4 sm:px-6 lg:px-8">
				<div className="flex flex-col">
					<h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
						Contact Our Travel Team
					</h1>
					<div className="mt-2.5 h-[3px] w-20 bg-[#d66847] rounded-full"></div>
				</div>
				<p className="mt-6 text-sm leading-relaxed text-slate-500 max-w-2xl">
					Whether you're dreaming of misty mountains, golden shores, or ancient temples, our
					specialist curators are ready to craft your perfect Sri Lankan journey.
				</p>
			</section>

			{/* ════════════════════════════════════════════
			    TWO-COLUMN SPLIT GRID
			    ════════════════════════════════════════════ */}
			<section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
					
					{/* ─── LEFT SIDEBAR (Span 4 - Contact Info & Map) ─── */}
					<div className="lg:col-span-4 space-y-6 flex flex-col justify-between h-full">
						<div className="border border-slate-100 p-8 rounded-lg shadow-sm bg-white flex flex-col flex-1">
							<h2 className="text-lg font-bold text-[#d66847] tracking-tight">
								Contact Information
							</h2>

							{/* Contact Row List */}
							<div className="mt-8 space-y-6 flex-1">
								{/* Flagship Studio */}
								<div className="flex items-start gap-4">
									<span className="text-[#d66847] text-lg mt-0.5 shrink-0" aria-hidden="true">📍</span>
									<div>
										<h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
											Flagship Studio
										</h3>
										<p className="mt-1 text-xs font-semibold text-slate-700 leading-relaxed">
											42 Galle Face Court 2,<br />
											Colombo 00300, Sri Lanka
										</p>
									</div>
								</div>

								{/* General Inquiries */}
								<div className="flex items-start gap-4">
									<span className="text-[#d66847] text-lg mt-0.5 shrink-0" aria-hidden="true">📞</span>
									<div>
										<h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
											General Inquiries
										</h3>
										<p className="mt-1 text-xs font-semibold text-slate-700 leading-relaxed">
											+94 11 234 5678<br />
											+94 77 987 6543
										</p>
									</div>
								</div>

								{/* Email */}
								<div className="flex items-start gap-4">
									<span className="text-[#d66847] text-lg mt-0.5 shrink-0" aria-hidden="true">✉️</span>
									<div>
										<h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
											Email
										</h3>
										<p className="mt-1 text-xs font-semibold text-[#d66847] leading-relaxed">
											concierge@travelarch.com
										</p>
									</div>
								</div>
							</div>

							{/* Separation line */}
							<div className="my-6 border-t border-slate-100" />

							{/* Opening hours subgrid */}
							<div>
								<span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-3.5">
									Opening Hours
								</span>
								<div className="space-y-2.5">
									<div className="flex justify-between text-xs">
										<span className="text-slate-500 font-medium">Mon - Fri</span>
										<span className="text-slate-800 font-bold">09:00 - 18:00</span>
									</div>
									<div className="flex justify-between text-xs">
										<span className="text-slate-500 font-medium">Sat - Sun</span>
										<span className="text-slate-800 font-bold text-[#d66847]">Closed</span>
									</div>
								</div>
							</div>
						</div>

						{/* Colombo Map container box */}
						<div className="rounded-lg overflow-hidden border border-slate-100 shadow-sm bg-white shrink-0 relative">
							<img
								src="/assets/images/colombo_map.jpg"
								alt="Colombo Office Location Map"
								className="w-full h-44 object-cover block transition-transform duration-500 hover:scale-102"
							/>
							<div className="absolute inset-0 bg-[#d66847]/5 pointer-events-none" />
						</div>
					</div>

					{/* ─── RIGHT COLUMN (Span 8 - "Begin Your Journey" Inquiry Form) ─── */}
					<div className="lg:col-span-8 bg-white border border-slate-100 p-8 rounded-lg shadow-sm flex flex-col justify-between">
						<div>
							<h2 className="text-xl font-bold text-slate-900 tracking-tight">
								Begin Your Journey
							</h2>
							<p className="mt-1 text-xs text-slate-400 leading-relaxed">
								Share your travel aspirations with us and a dedicated curator will reach out within 24 hours.
							</p>

							{isSubmitted ? (
								<div className="my-12 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold py-8 px-6 rounded-2xl text-center shadow-sm">
									<span className="text-2xl block mb-2">📬</span>
									<h3 className="font-extrabold text-sm mb-1">Message sent successfully. We will contact you soon.</h3>
									<p className="text-xs text-emerald-600 font-medium">
										Thank you for contacting us. A dedicated curator will call or email you soon.
									</p>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="mt-8 space-y-6">
									{submitError && (
										<div className="text-[10px] font-bold text-red-500 bg-red-50 p-2 rounded">
											{submitError}
										</div>
									)}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										{/* Full Name input */}
										<div>
											<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
												Full Name
											</label>
											<input
												type="text"
												required
												value={formData.name}
												onChange={(e) => setFormData({ ...formData, name: e.target.value })}
												placeholder="e.g. Kasun Rajapaksha"
												className="w-full border border-slate-200 rounded-sm px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb]"
											/>
										</div>

										{/* Email Address input */}
										<div>
											<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
												Email Address
											</label>
											<input
												type="email"
												required
												value={formData.email}
												onChange={(e) => setFormData({ ...formData, email: e.target.value })}
												placeholder="kasun@example.com"
												className="w-full border border-slate-200 rounded-sm px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb]"
											/>
										</div>
									</div>

									{/* Category Dropdown */}
									<div>
										<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
											Preferred Travel Category
										</label>
										<select
											value={formData.category}
											onChange={(e) => setFormData({ ...formData, category: e.target.value })}
											className="w-full border border-slate-200 rounded-sm px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white focus:border-[#d66847] focus:outline-none transition-colors"
										>
											<option value="" disabled>Select a category</option>
											<option value="Beaches">Beaches & Coastal Resorts</option>
											<option value="Mountains">Mountains & Hill Country Trails</option>
											<option value="Historical & Cultural">Historical & Cultural Heritage</option>
											<option value="Wildlife">Wildlife & Safari Wilderness</option>
											<option value="Expedition">Custom Mountain Expedition</option>
										</select>
									</div>

									{/* Textarea message box */}
									<div>
										<label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
											Message / Special Requests
										</label>
										<textarea
											required
											value={formData.message}
											onChange={(e) => setFormData({ ...formData, message: e.target.value })}
											placeholder="Tell us about your travel dates, party size, and any specific interests..."
											className="w-full border border-slate-200 rounded-sm px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 h-32 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb]"
										/>
									</div>

									{/* Submit Action */}
									<button
										type="submit"
										className="w-full sm:w-fit px-8 py-3 bg-[#d66847] text-white text-sm font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 hover:bg-[#c25a3a] shadow-sm active:scale-95"
									>
										Submit Inquiry
									</button>
								</form>
							)}
						</div>
					</div>
				</div>

				{/* ════════════════════════════════════════════
				    BOTTOM HORIZONTAL GLASS OVERLAY BANNER
				    ════════════════════════════════════════════ */}
				<div className="mt-12 w-full h-48 md:h-64 rounded-lg overflow-hidden relative shadow-md">
					<img
						src="/assets/images/contact_banner.jpg"
						alt="Horizontal Landscape Scenic View"
						className="w-full h-full object-cover block"
					/>
					<div className="absolute inset-0 bg-black/35" />
					<div className="absolute bottom-6 left-6 text-white text-sm md:text-lg font-serif italic max-w-sm md:max-w-md drop-shadow">
						"A journey of a thousand miles begins with a single inquiry."
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
