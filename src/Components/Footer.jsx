export default function Footer() {
	return (
		<footer id="contact" className="relative w-full block bg-[#111111] text-white">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
					<div>
						<a href="#home" className="text-2xl font-black text-[#d66847]">
							Gamanaya.com
						</a>

						<p className="mt-5 max-w-md text-sm leading-7 text-white/77">
							Designing premium journeys through the pearl of the Indian Ocean. Authenticity, luxury,
							and discovery in every step.
						</p>

						<div className="mt-8 flex items-center gap-6">
							<a href="/#instagram" aria-label="Instagram">
								<img
									src="/assets/images/instagram.png"
									alt="Instagram"
									className="w-5 h-5 object-contain block opacity-80 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:opacity-100 filter hover:drop-shadow-[0_0_8px_rgba(214,104,71,0.6)]"
								/>
							</a>

							<a href="/#facebook" aria-label="Facebook">
								<img
									src="/assets/images/facebook.png"
									alt="Facebook"
									className="w-5 h-5 object-contain block opacity-80 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:opacity-100 filter hover:drop-shadow-[0_0_8px_rgba(214,104,71,0.6)]"
								/>
							</a>

							<a href="/#x" aria-label="Twitter / X">
								<img
									src="/assets/images/twitter.png"
									alt="X / Twitter"
									className="w-5 h-5 object-contain block opacity-80 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:opacity-100 filter hover:drop-shadow-[0_0_8px_rgba(214,104,71,0.6)]"
								/>
							</a>
						</div>
					</div>

					<div className="grid gap-8 sm:grid-cols-3">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.35em] text-white/50">Explore</p>
							<div className="mt-4 space-y-3 text-sm text-white/75">
								<a href="#destinations" className="block transition hover:text-[#d66847]">
									Destinations
								</a>
								<a href="#home" className="block transition hover:text-[#d66847]">
									Tour Packages
								</a>
							</div>
						</div>

						<div>
							<p className="text-xs font-bold uppercase tracking-[0.35em] text-white/50">Gamanaya</p>
							<div className="mt-4 space-y-3 text-sm text-white/75">
								<a href="#about" className="block transition hover:text-[#d66847]">
									About Us
								</a>
								<a href="#contact" className="block transition hover:text-[#d66847]">
									Contact Us
								</a>
							</div>
						</div>

						<div>
							<p className="text-xs font-bold uppercase tracking-[0.35em] text-white/50">Legal</p>
							<div className="mt-4 space-y-3 text-sm text-white/75">
								<a href="#contact" className="block transition hover:text-[#d66847]">
									Privacy Policy
								</a>
								<a href="#contact" className="block transition hover:text-[#d66847]">
									Terms of Service
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/35">
					© 2026 Gamanaya.com Sri Lanka. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
