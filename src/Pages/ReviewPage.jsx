import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function ReviewPage() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		journey: '',
		overallRating: 0,
		serviceRating: 0,
		authenticityRating: 0,
		sustainabilityRating: 0,
		summary: '',
		story: '',
		imageName: '',
		reviewerName: '',
		reviewerEmail: '',
	});

	const [errors, setErrors] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	// Dynamic interactive star renderer helper
	const renderStarRating = (currentValue, labelKey, starSize = "text-xl") => {
		return (
			<div className="flex gap-1.5">
				{[1, 2, 3, 4, 5].map((star) => (
					<button
						type="button"
						key={star}
						onClick={() => {
							setFormData(prev => ({ ...prev, [labelKey]: star }));
							if (errors[labelKey]) {
								setErrors(prev => {
									const copy = { ...prev };
									delete copy[labelKey];
									return copy;
								});
							}
						}}
						className={`${starSize} focus:outline-none transition-colors duration-200 ${
							star <= currentValue ? 'text-[#d66847]' : 'text-slate-200'
						}`}
					>
						★
					</button>
				))}
			</div>
		);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData(prev => ({ ...prev, imageName: file.name }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = {};

		if (!formData.reviewerName.trim()) {
			validationErrors.reviewerName = "Please enter your full name.";
		}
		if (!formData.journey) {
			validationErrors.journey = "Please select the journey you experienced.";
		}
		if (formData.overallRating === 0) {
			validationErrors.overallRating = "Please select an overall experience rating.";
		}
		if (!formData.summary.trim()) {
			validationErrors.summary = "Please summarize your experience in a headline.";
		}
		if (formData.story.trim().length < 15) {
			validationErrors.story = "Your review story must be at least 15 characters long.";
		}

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			// Scroll to top of the card if there are errors
			const element = document.getElementById("review-card-container");
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
			return;
		}

		// Save the new review object directly into the active local localStorage display list
		const newReview = {
			quote: formData.story,
			name: formData.reviewerName,
			role: 'Explorer',
		};

		const storedReviews = localStorage.getItem('gamanaya_reviews');
		let localList = [];
		if (storedReviews) {
			try {
				localList = JSON.parse(storedReviews);
			} catch (err) {
				console.error(err);
			}
		}
		localList.push(newReview);
		localStorage.setItem('gamanaya_reviews', JSON.stringify(localList));

		// Success state
		setErrors({});
		setIsSubmitted(true);
		setTimeout(() => {
			setIsSubmitted(false);
			setFormData({
				journey: '',
				overallRating: 0,
				serviceRating: 0,
				authenticityRating: 0,
				sustainabilityRating: 0,
				summary: '',
				story: '',
				imageName: '',
				reviewerName: '',
				reviewerEmail: '',
			});
			navigate('/');
		}, 2000);
	};

	return (
		<div className="min-h-screen bg-[#fffaf8] relative w-full block font-sans">
			<Navbar />

			{/* ════════════════════════════════════════════
			    MAIN SUCCESS INFORMATION CONTAINER
			    ════════════════════════════════════════════ */}
			<section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
				
				{/* Top headers */}
				<div className="text-center mb-10">
					<h1 className="text-3xl font-extrabold text-[#8e3d23] tracking-tight leading-tight">
						Share Your Journey
					</h1>
					<p className="mt-3 text-xs leading-relaxed text-slate-500 max-w-xl mx-auto">
						Your stories illuminate the path for others. Help fellow travelers discover the
						magic of Sri Lanka while supporting the local communities that made your trip special.
					</p>
				</div>

				{/* Card form container */}
				<div 
					id="review-card-container"
					className="border border-slate-200 rounded-lg p-8 max-w-2xl mx-auto bg-white shadow-sm"
				>
					{isSubmitted ? (
						<div className="my-6 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold py-8 px-6 rounded-2xl text-center shadow-sm">
							<span className="text-2xl block mb-2">🌿</span>
							<h3 className="font-extrabold text-sm mb-1">Thank you for sharing your journey!</h3>
							<p className="text-xs text-emerald-600 font-medium">
								Your review will be verified and published shortly. Your contribution to our Sustainability Fund has been logged.
							</p>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-6">
							
							{/* Reviewer Name & Optional Email */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div>
									<label htmlFor="reviewer-name" className="block text-xs font-bold text-slate-800 mb-2">
										Your Name
									</label>
									<input
										type="text"
										id="reviewer-name"
										required
										value={formData.reviewerName}
										onChange={(e) => {
											setFormData({ ...formData, reviewerName: e.target.value });
											if (errors.reviewerName) {
												setErrors(prev => {
													const copy = { ...prev };
													delete copy.reviewerName;
													return copy;
												});
											}
										}}
										placeholder="Enter your full name"
										className="w-full border border-slate-200 rounded px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb] shadow-sm"
									/>
									{errors.reviewerName && (
										<p className="text-red-500 text-[10px] font-bold mt-1.5">{errors.reviewerName}</p>
									)}
								</div>
								<div>
									<label htmlFor="reviewer-email" className="block text-xs font-bold text-slate-800 mb-2">
										Email Address (Optional)
									</label>
									<input
										type="email"
										id="reviewer-email"
										value={formData.reviewerEmail}
										onChange={(e) => setFormData({ ...formData, reviewerEmail: e.target.value })}
										placeholder="example@gmail.com"
										className="w-full border border-slate-200 rounded px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb] shadow-sm"
									/>
								</div>
							</div>
							
							{/* Journey Dropdown */}
							<div>
								<label className="block text-xs font-bold text-slate-800 mb-2">
									Which journey did you experience?
								</label>
								<select
									value={formData.journey}
									onChange={(e) => {
										setFormData({ ...formData, journey: e.target.value });
										if (errors.journey) {
											setErrors(prev => {
												const copy = { ...prev };
												delete copy.journey;
												return copy;
											});
										}
									}}
									className="w-full border border-slate-200 rounded px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white focus:border-[#d66847] focus:outline-none transition-colors shadow-sm"
								>
									<option value="" disabled>Select a destination or journey...</option>
									<option value="sigiriya">Sigiriya Rock Fortress Exploration</option>
									<option value="tea-country">Tea Country Trails (Nuwara Eliya)</option>
									<option value="southern-coast">Southern Coastal Escape (Galle & Mirissa)</option>
									<option value="ella">Ella Wilderness Adventure</option>
									<option value="kandy">Temple of the Sacred Tooth Relic (Kandy)</option>
									<option value="yala">Yala National Park Wildlife Safari</option>
								</select>
								{errors.journey && (
									<p className="text-red-500 text-[10px] font-bold mt-1.5">{errors.journey}</p>
								)}
							</div>

							{/* Overall Experience Star Rating */}
							<div>
								<label className="block text-xs font-bold text-slate-800 mb-1.5">
									Overall Experience
								</label>
								{renderStarRating(formData.overallRating, 'overallRating', "text-2xl")}
								{errors.overallRating && (
									<p className="text-red-500 text-[10px] font-bold mt-1.5">{errors.overallRating}</p>
								)}
							</div>

							{/* Sub-Ratings Grid (SERVICE, AUTHENTICITY, SUSTAINABILITY) */}
							<div className="grid grid-cols-3 gap-6 border-t border-b border-slate-100 py-6 my-6">
								{/* Service */}
								<div className="flex flex-col items-start">
									<span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
										Service
									</span>
									{renderStarRating(formData.serviceRating, 'serviceRating', "text-base")}
								</div>

								{/* Authenticity */}
								<div className="flex flex-col items-start">
									<span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
										Authenticity
									</span>
									{renderStarRating(formData.authenticityRating, 'authenticityRating', "text-base")}
								</div>

								{/* Sustainability */}
								<div className="flex flex-col items-start">
									<span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
										Sustainability
									</span>
									{renderStarRating(formData.sustainabilityRating, 'sustainabilityRating', "text-base")}
								</div>
							</div>

							{/* Summarize Headline Input */}
							<div>
								<label className="block text-xs font-bold text-slate-800 mb-2">
									Summarize your experience
								</label>
								<input
									type="text"
									value={formData.summary}
									onChange={(e) => {
										setFormData({ ...formData, summary: e.target.value });
										if (errors.summary) {
											setErrors(prev => {
												const copy = { ...prev };
												delete copy.summary;
												return copy;
											});
										}
									}}
									placeholder="e.g., An unforgettable sunset at Sigiriya"
									className="w-full border border-slate-200 rounded px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb] shadow-sm"
								/>
								{errors.summary && (
									<p className="text-red-500 text-[10px] font-bold mt-1.5">{errors.summary}</p>
								)}
							</div>

							{/* Detailed Story text box */}
							<div>
								<label className="block text-xs font-bold text-slate-800 mb-2">
									Tell us your story...
								</label>
								<textarea
									value={formData.story}
									onChange={(e) => {
										setFormData({ ...formData, story: e.target.value });
										if (errors.story) {
											setErrors(prev => {
												const copy = { ...prev };
												delete copy.story;
												return copy;
											});
										}
									}}
									placeholder="Describe the atmosphere, the people, and the moments that took your breath away..."
									className="w-full border border-slate-200 rounded px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-300 h-32 focus:border-[#d66847] focus:outline-none transition-colors bg-[#fffcfb] shadow-sm"
								/>
								{errors.story && (
									<p className="text-red-500 text-[10px] font-bold mt-1.5">{errors.story}</p>
								)}
							</div>

							{/* File Image Uploader */}
							<div>
								<label className="block text-xs font-bold text-slate-800 mb-2">
									Add your golden moments
								</label>
								
								<div className="border-2 border-dashed border-[#d66847]/30 bg-[#fffdfc] rounded-lg p-6 text-center hover:border-[#d66847] transition-colors cursor-pointer relative">
									<input 
										type="file" 
										id="image-upload" 
										accept="image/*" 
										onChange={handleFileChange}
										className="hidden" 
									/>
									<label htmlFor="image-upload" className="cursor-pointer block">
										{/* Camera SVG icon */}
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#d66847] mx-auto mb-3">
											<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2 2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
											<circle cx="12" cy="13" r="4" />
										</svg>
										
										<span className="text-xs font-bold text-[#d66847] block mb-1">
											Click to upload or drag and drop
										</span>
										<span className="text-[9px] text-slate-400 font-medium block">
											PNG, JPG up to 10MB
										</span>
									</label>

									{formData.imageName && (
										<p className="text-xs text-slate-600 font-semibold mt-3 bg-slate-50 border border-slate-100 py-1 px-3 rounded inline-block">
											Selected: {formData.imageName}
										</p>
									)}
								</div>
							</div>

							{/* Green Impact Banner */}
							<div className="bg-[#ecf5f3] p-4 rounded border border-[#d2e7e2] text-xs font-medium text-[#1e584a] mt-6 flex gap-3 items-start">
								{/* Leaf SVG */}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#1e584a] shrink-0 mt-0.5">
									<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 7a9 9 0 0 1-10 11z" />
									<path d="M9 22v-4" />
								</svg>
								<div>
									<span className="text-[10px] font-bold tracking-widest text-[#1e584a] uppercase block mb-1">
										YOUR IMPACT
									</span>
									<p className="text-[11px] leading-relaxed text-[#1e584a]/90 font-medium">
										Every review shared contributes to our Sustainability Fund, supporting local Sri Lankan 
										artisans and reef preservation initiatives in Mirissa.
									</p>
								</div>
							</div>

							{/* Submit action */}
							<button
								type="submit"
								className="w-full mt-6 py-3 bg-[#8e3d23] hover:bg-[#d66847] text-white text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 shadow-sm active:scale-95"
							>
								Submit Your Review
							</button>

						</form>
					)}
				</div>

				{/* Thumbnail Preview strip below the container */}
				<div className="grid grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
					<img
						src="/assets/images/ella.jpg"
						alt="Nine Arch Ella Bridge"
						className="w-full h-24 object-cover rounded shadow-sm opacity-80 hover:opacity-100 transition-opacity duration-300"
					/>
					<img
						src="/assets/images/about_tea_estate.jpg"
						alt="Scenic tea estate highland Nuwara Eliya"
						className="w-full h-24 object-cover rounded shadow-sm opacity-80 hover:opacity-100 transition-opacity duration-300"
					/>
					<img
						src="/assets/images/kandy.jpg"
						alt="Sacred tooth temple relic Kandy reflection"
						className="w-full h-24 object-cover rounded shadow-sm opacity-80 hover:opacity-100 transition-opacity duration-300"
					/>
					<img
						src="/assets/images/sigiriya.jpg"
						alt="Sigiriya fortress rock sunset view"
						className="w-full h-24 object-cover rounded shadow-sm opacity-80 hover:opacity-100 transition-opacity duration-300"
					/>
				</div>

			</section>

			<Footer />
		</div>
	);
}
