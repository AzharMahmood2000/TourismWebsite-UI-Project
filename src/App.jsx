import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import DestinationPage from './Pages/DestinationPage';
import DestinationDetailPage from './Pages/DestinationDetailPage';
import GalleryPage from './Pages/GalleryPage';
import TourPackagesPage from './Pages/TourPackagesPage';
import ContactPage from './Pages/ContactPage';
import AboutPage from './Pages/AboutPage';
import BookingPage from './Pages/BookingPage';
import BookingSuccessPage from './Pages/BookingSuccessPage';
import ReviewPage from './Pages/ReviewPage';
import AllReviewsPage from './Pages/AllReviewsPage';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/destinations" element={<DestinationPage />} />
				<Route path="/destination/:id" element={<DestinationDetailPage />} />
				<Route path="/gallery" element={<GalleryPage />} />
				<Route path="/tour-packages" element={<TourPackagesPage />} />
				<Route path="/tour-packages/:id" element={<TourPackagesPage />} />
				<Route path="/contact-us" element={<ContactPage />} />
				<Route path="/about-us" element={<AboutPage />} />
				<Route path="/booking" element={<BookingPage />} />
				<Route path="/booking-success" element={<BookingSuccessPage />} />
				<Route path="/write-review" element={<ReviewPage />} />
				<Route path="/all-reviews" element={<AllReviewsPage />} />
			</Routes>
		</BrowserRouter>
	);
}
