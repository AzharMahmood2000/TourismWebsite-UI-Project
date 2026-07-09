import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import API_BASE_URL from '../api/api';

export default function TourPackageDetailPage() {
    const { idOrSlug } = useParams();
    const navigate = useNavigate();

    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        const fetchDetail = async () => {
            setLoading(true);
            try {
                // Determine if routing param is id or slug (assuming id in old App was :id)
                // App.jsx route is /tour-packages/:id
                const res = await fetch(`${API_BASE_URL}/api/packages/${idOrSlug}`);
                if (!res.ok) throw new Error("Failed to load tour package details.");
                const data = await res.json();
                setPkg(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [idOrSlug]);

    if (loading) return <div className="text-center py-20 mt-20 font-bold text-gray-500">Loading package...</div>;
    if (error) return <div className="text-center py-20 mt-20 text-red-500 font-bold">{error}</div>;
    if (!pkg) return <div className="text-center py-20 mt-20 text-gray-500 font-bold">Package not found</div>;

    const coverImageUrl = pkg.coverImage || pkg.image;
    const resolvedCoverImage = coverImageUrl ? (coverImageUrl.startsWith('http') ? coverImageUrl : `${API_BASE_URL}${coverImageUrl.startsWith('/') ? '' : '/'}${coverImageUrl}`) : '';

    return (
        <div className="min-h-screen bg-[#fffaf8] relative w-full block">
            <Navbar />

            {/* Hero Section */}
            <section
                className="relative w-full h-[550px] md:h-[650px] bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{
                    backgroundImage: resolvedCoverImage ? `url(${resolvedCoverImage})` : 'none',
                    backgroundColor: '#e6dedc'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

                <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link
                        to="/tour-packages"
                        className="absolute top-6 left-6 z-25 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-[#d66847] text-white border border-white/20 hover:border-transparent transition-all shadow-md active:scale-90"
                    >
                        <span className="text-lg font-bold">←</span>
                    </Link>

                    <div className="absolute bottom-8 left-4 right-4 md:bottom-16 md:left-8 md:right-auto z-20 w-full max-w-[92%] md:max-w-sm rounded-3xl border border-white/10 bg-white/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.15)] backdrop-blur-md">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
                                {pkg.title}
                            </h1>
                            {pkg.category ? (
                                <span className="rounded-full bg-[#d66847]/10 text-[#d66847] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider shrink-0">
                                    {pkg.category}
                                </span>
                            ) : null}
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-slate-500">
                            {pkg.shortDescription || pkg.description?.substring(0, 80) + '...'}
                        </p>

                        <div className="my-4 border-t border-slate-100" />

                        <div className="space-y-2.5">
                            {pkg.location && (
                                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                                    <span className="text-base text-[#d66847]">📍</span>
                                    <span>{pkg.location}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                                <span className="text-base text-[#d66847]">⏳</span>
                                <span>Duration: {pkg.duration}</span>
                            </div>

                            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                                <span className="text-base text-[#d66847]">👥</span>
                                <span>{pkg.minTravelers} - {pkg.maxTravelers} Travelers</span>
                            </div>
                        </div>

                        <div className="my-4 border-t border-slate-100" />

                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Price
                                </p>
                                <p className="text-lg font-black text-slate-900">
                                    ${pkg.pricePerPerson || pkg.price}{' '}
                                    <span className="text-[11px] font-normal text-slate-400">
                                        /Person
                                    </span>
                                </p>
                            </div>
                            <button
                                onClick={() => navigate(`/booking?type=package&packageId=${pkg._id}`)}
                                className="rounded-full bg-[#d66847] hover:bg-[#c55b3b] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all active:scale-95 text-center"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white mt-12 rounded-[2rem] shadow-[0_8px_30px_rgba(15,23,42,0.02)] border border-slate-50">
                <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
                    <div className="space-y-10">
                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-l-3 border-[#d66847] pl-3 mb-4">
                                Overview
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {pkg.description}
                            </p>
                            
                            {(pkg.pickupLocation || pkg.meetingPoint) && (
                                <div className="mt-6 flex flex-col sm:flex-row gap-6">
                                    {pkg.pickupLocation && (
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex-1">
                                            <span className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Pickup Location</span>
                                            <span className="text-sm font-semibold text-slate-700">{pkg.pickupLocation}</span>
                                        </div>
                                    )}
                                    {pkg.meetingPoint && (
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex-1">
                                            <span className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Meeting Point</span>
                                            <span className="text-sm font-semibold text-slate-700">{pkg.meetingPoint}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Highlights */}
                        {pkg.highlights && pkg.highlights.length > 0 && (
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-l-3 border-[#d66847] pl-3">
                                    Highlights
                                </h2>
                                <ul className="mt-6 space-y-4">
                                    {pkg.highlights.map((highlight, index) => (
                                        <li key={index} className="flex items-start text-sm text-slate-600 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d66847]/10 text-[#d66847] text-xs font-bold mr-3.5 mt-0.5">
                                                {index + 1}
                                            </span>
                                            <span className="leading-relaxed">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Itinerary */}
                        {pkg.itinerary && pkg.itinerary.length > 0 && (
                            <div className="pt-4">
                                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-l-3 border-[#d66847] pl-3 mb-6">
                                    Day-wise Itinerary
                                </h2>
                                <div className="space-y-6">
                                    {pkg.itinerary.map((day, idx) => (
                                        <div key={idx} className="relative pl-8 border-l-2 border-slate-200">
                                            <div className="absolute w-4 h-4 rounded-full bg-[#d66847] -left-[9px] top-1"></div>
                                            <h4 className="text-sm font-extrabold text-slate-900">{day.day}: {day.title}</h4>
                                            {day.description && <p className="mt-2 text-sm text-slate-600 leading-relaxed">{day.description}</p>}
                                            {day.places && <p className="mt-2 text-xs font-semibold text-[#d66847]">Places: {day.places}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Destinations */}
                        {pkg.destinations && pkg.destinations.length > 0 && (
                            <div className="pt-4">
                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-l-3 border-[#d66847] pl-3 mb-4">
                                    Destinations Covered
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {pkg.destinations.map((dest, i) => (
                                        <span key={i} className="bg-[#f3f4f6] text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold">
                                            {dest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Gallery */}
                        {pkg.galleryImages && pkg.galleryImages.length > 0 && (
                            <div className="pt-4">
                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest border-l-3 border-[#d66847] pl-3 mb-4">
                                    Gallery
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {pkg.galleryImages.map((img, i) => {
                                        const srcUrl = img.startsWith('http') ? img : `${API_BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`;
                                        return (
                                            <img key={i} src={srcUrl} alt={`${pkg.title} gallery ${i+1}`} className="w-full h-32 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform" />
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-8">
                        {/* Inclusions & Exclusions */}
                        {(pkg.inclusions?.length > 0 || pkg.exclusions?.length > 0) && (
                            <div className="rounded-3xl border border-slate-100 bg-[#fffcfb] p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                                {pkg.inclusions?.length > 0 && (
                                    <>
                                        <h3 className="text-sm font-extrabold text-emerald-700 uppercase tracking-widest flex items-center mb-4">
                                            <span className="mr-2">✓</span> What's Included
                                        </h3>
                                        <ul className="space-y-3 mb-6">
                                            {pkg.inclusions.map((inc, i) => (
                                                <li key={i} className="text-xs font-semibold text-slate-600 flex items-start">
                                                    <span className="text-emerald-500 mr-2 mt-0.5">•</span> {inc}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {pkg.exclusions?.length > 0 && (
                                    <>
                                        <h3 className="text-sm font-extrabold text-red-700 uppercase tracking-widest flex items-center mb-4 pt-4 border-t border-slate-100">
                                            <span className="mr-2">✕</span> Exclusions
                                        </h3>
                                        <ul className="space-y-3">
                                            {pkg.exclusions.map((exc, i) => (
                                                <li key={i} className="text-xs font-semibold text-slate-600 flex items-start">
                                                    <span className="text-red-400 mr-2 mt-0.5">•</span> {exc}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}
                        
                        {/* Promo Block */}
                        <div
                            className="relative overflow-hidden rounded-3xl h-80 bg-cover bg-center bg-no-repeat shadow-md group"
                            style={{ backgroundImage: "url('/assets/images/yala_gallery.jpg')" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
                                <span className="text-[10px] font-bold tracking-widest text-[#d66847] uppercase">
                                    Secure your Journey
                                </span>
                                <h4 className="mt-2 text-lg font-bold tracking-tight">
                                    Ready to experience Sri Lanka?
                                </h4>
                                <button
                                    onClick={() => navigate(`/booking?type=package&packageId=${pkg._id}`)}
                                    className="mt-4 bg-[#d66847] hover:bg-[#c55b3b] w-full px-4 py-3 text-xs font-bold uppercase tracking-widest rounded transition-colors text-center"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
