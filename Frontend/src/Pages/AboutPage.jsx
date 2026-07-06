import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function AboutPage() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	return (
		<div className="min-h-screen bg-[#fffaf8] relative w-full block font-sans">
			<Navbar />

			{/* ════════════════════════════════════════════
			    "OUR HERITAGE" SPLIT SECTION
			    ════════════════════════════════════════════ */}
			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left: Narrative Content */}
					<div>
						<span className="text-[11px] font-bold text-[#d66847] uppercase tracking-[0.35em] block mb-3">
							OUR HERITAGE
						</span>
						<h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
							Our Journey & Philosophy
						</h1>
						
						<p className="text-sm leading-relaxed text-slate-500 mb-5">
							Founded on the principle of "Refined Discovery," Travelarch was born from a desire to 
							showcase the pearl of the Indian Ocean—Sri Lanka—through a lens of high-fidelity curation. 
							We believe that true travel is an analog experience in a digital world; it's the tactile 
							feel of ancient stone, the scent of morning tea mist, and the sound of distant temple bells.
						</p>

						<p className="text-sm leading-relaxed text-slate-500">
							Our philosophy rejects the generic in favor of the precise. We craft journeys that respect 
							the quiet transitions of the day, moving from the golden light of the southern coast to the 
							cool, crisp shadows of the central highlands. For the discerning traveler, we offer not 
							just a destination, but a serene transition into the extraordinary.
						</p>
					</div>

					{/* Right: Visual Asset with Overlapping Floating Badge */}
					<div className="relative w-full max-w-md lg:max-w-none mx-auto lg:ml-auto pr-4 lg:pr-0">
						<div className="relative overflow-hidden rounded-lg">
							<img
								src="/assets/images/about_tea_estate.jpg"
								alt="Scenic Misty Tea Estate"
								className="w-full h-[450px] object-cover rounded-lg shadow-sm block hover:scale-102 transition-transform duration-700"
							/>
							{/* Light ambient overlay */}
							<div className="absolute inset-0 bg-[#d66847]/5 pointer-events-none" />
						</div>

						{/* Overlapping Floating Badge Stats Box */}
						<div className="bg-white p-6 shadow-lg border border-slate-100 max-w-[200px] absolute bottom-6 -left-8 sm:-left-12 z-10 rounded-sm">
							<span className="text-3xl font-extrabold text-[#d66847] leading-none block">
								12+
							</span>
							<p className="text-[11px] font-semibold text-slate-500 leading-relaxed mt-2.5">
								Years of curating high-fidelity cultural immersions.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ════════════════════════════════════════════
			    "CORE VALUES" CARD GRID MODULE
			    ════════════════════════════════════════════ */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<span className="text-[10px] font-bold text-[#d66847] tracking-[0.35em] uppercase block mb-2.5">
						CORE VALUES
					</span>
					<h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
						What We Stand For
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Card 1: Authentic Access */}
					<div className="border border-slate-100 p-8 rounded-lg bg-white shadow-sm flex flex-col items-start min-h-[240px] hover:shadow-md transition-shadow">
						<div className="bg-[#d66847]/10 w-10 h-10 rounded-sm flex items-center justify-center text-[#d66847] mb-5">
							{/* Castle / Monument SVG */}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
								<path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18" />
								<path d="M12 22v-5c0-.5-.2-1-.6-1.4C11 15.2 10.5 15 10 15H6v7" />
								<path d="M10 6h4" />
								<path d="M10 10h4" />
							</svg>
						</div>
						<h3 className="text-base font-bold text-slate-900 mb-2.5">
							Authentic Access
						</h3>
						<p className="text-xs leading-relaxed text-slate-500">
							Bypassing the tourist facade to provide deep cultural immersion. We open doors to private 
							galleries, village hearths, and ancient rituals rarely seen by outsiders.
						</p>
					</div>

					{/* Card 2: Sustainability */}
					<div className="border border-slate-100 p-8 rounded-lg bg-white shadow-sm flex flex-col items-start min-h-[240px] hover:shadow-md transition-shadow">
						<div className="bg-[#d66847]/10 w-10 h-10 rounded-sm flex items-center justify-center text-[#d66847] mb-5">
							{/* Leaf / Sustainability SVG */}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
								<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 7a9 9 0 0 1-10 11z" />
								<path d="M9 22v-4" />
							</svg>
						</div>
						<h3 className="text-base font-bold text-slate-900 mb-2.5">
							Sustainability
						</h3>
						<p className="text-xs leading-relaxed text-slate-500">
							Our commitment to carbon-neutral travel isn't just a policy—it's a practice. We prioritize 
							solar-powered lodges and plastic-free logistics across the island.
						</p>
					</div>

					{/* Card 3: Local Impact */}
					<div className="border border-slate-100 p-8 rounded-lg bg-white shadow-sm flex flex-col items-start min-h-[240px] hover:shadow-md transition-shadow">
						<div className="bg-[#d66847]/10 w-10 h-10 rounded-sm flex items-center justify-center text-[#d66847] mb-5">
							{/* Handshake / Community SVG */}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
								<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
								<path d="M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
						</div>
						<h3 className="text-base font-bold text-slate-900 mb-2.5">
							Local Impact
						</h3>
						<p className="text-xs leading-relaxed text-slate-500">
							Supporting local artisans and community projects ensures that the wealth of tourism directly 
							benefits the people who protect Sri Lanka's heritage.
						</p>
					</div>
				</div>
			</section>

			{/* ════════════════════════════════════════════
			    "THE PEOPLE" EXPERT NETWORK MATRIX
			    ════════════════════════════════════════════ */}
			<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mb-16">
				<div className="bg-[#fdf8f5] py-20 px-6 sm:px-12 rounded-[2rem] shadow-sm">
					{/* Header section */}
					<div className="border-b border-slate-100 pb-6 mb-10">
						<span className="text-[10px] font-bold text-[#d66847] tracking-[0.35em] uppercase block mb-2">
							THE PEOPLE
						</span>
						<h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
							Our Expert Local Network
						</h2>
						<p className="mt-3 text-xs leading-relaxed text-slate-500 max-w-xl">
							Our guides are not just experts; they are historians, naturalists, and friends who share 
							a profound connection to the Sri Lankan soil.
						</p>
					</div>

					{/* 4-Column Professional Grid Setup */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{/* Card 1: Arjuna Perera */}
						<div className="flex flex-col">
							<img
								src="/assets/images/arjuna.jpg"
								alt="Arjuna Perera Portrait"
								className="w-full h-80 object-cover rounded-md shadow-sm block hover:shadow-md transition-shadow duration-300"
							/>
							<h3 className="mt-4 text-sm font-bold text-slate-900 leading-tight">
								Arjuna Perera
							</h3>
							<span className="text-xs font-semibold text-[#d66847] mt-1">
								Chief Cultural Liaison
							</span>
						</div>

						{/* Card 2: Kavindi Silva */}
						<div className="flex flex-col">
							<img
								src="/assets/images/kavindi.jpg"
								alt="Kavindi Silva Portrait"
								className="w-full h-80 object-cover rounded-md shadow-sm block hover:shadow-md transition-shadow duration-300"
							/>
							<h3 className="mt-4 text-sm font-bold text-slate-900 leading-tight">
								Kavindi Silva
							</h3>
							<span className="text-xs font-semibold text-[#d66847] mt-1">
								Head of Naturalist Expeditions
							</span>
						</div>

						{/* Card 3: Gamini Ratnayake */}
						<div className="flex flex-col">
							<img
								src="/assets/images/Gamini.avif"
								alt="Gamini Ratnayake Portrait"
								className="w-full h-80 object-cover rounded-md shadow-sm block hover:shadow-md transition-shadow duration-300"
							/>
							<h3 className="mt-4 text-sm font-bold text-slate-900 leading-tight">
								Gamini Ratnayake
							</h3>
							<span className="text-xs font-semibold text-[#d66847] mt-1">
								Artisan Partner Mentor
							</span>
						</div>

						{/* Card 4: Nilani Wickramasinghe */}
						<div className="flex flex-col">
							<img
								src="/assets/images/nilani.avif"
								alt="Nilani Wickramasinghe Portrait"
								className="w-full h-80 object-cover rounded-md shadow-sm block hover:shadow-md transition-shadow duration-300"
							/>
							<h3 className="mt-4 text-sm font-bold text-slate-900 leading-tight">
								Nilani Wickramasinghe
							</h3>
							<span className="text-xs font-semibold text-[#d66847] mt-1">
								Sustainability Director
							</span>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
