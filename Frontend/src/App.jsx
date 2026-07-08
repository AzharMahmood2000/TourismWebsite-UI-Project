import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

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
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import Dashboard from './Pages/Dashboard';
import ManagePackages from './Pages/managetourpackage';
import ManageReviews from './Pages/managereview';
import ManageMessages from './Pages/managemessages';
import ManageUsers from './Pages/ManageUsers';
import ManageDestinations from './Pages/managedestination';
import ManageBookings from './Pages/managebookings';
import NotFound from './Pages/NotFound';
import { Navigate } from 'react-router-dom';

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<Home />} />
					<Route path="/destinations" element={<DestinationPage />} />
					<Route path="/destination/:destinationParam" element={<DestinationDetailPage />} />
					<Route path="/gallery" element={<GalleryPage />} />
					<Route path="/tour-packages" element={<TourPackagesPage />} />
					<Route path="/tour-packages/:id" element={<TourPackagesPage />} />
					<Route path="/contact-us" element={<ContactPage />} />
					<Route path="/about-us" element={<AboutPage />} />
					<Route path="/booking" element={<BookingPage />} />
					<Route path="/booking-success" element={<BookingSuccessPage />} />
					<Route path="/write-review" element={<ReviewPage />} />
					<Route path="/all-reviews" element={<AllReviewsPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="*" element={<NotFound />} />

					{/* Admin Routes */}
					<Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
					<Route path="/admin/dashboard" element={<Dashboard />} />
					<Route path="/admin/packages" element={<ManagePackages />} />
					<Route path="/admin/reviews" element={<ManageReviews />} />
					<Route path="/admin/messages" element={<ManageMessages />} />
					<Route path="/admin/destinations" element={<ManageDestinations />} />
					<Route path="/admin/bookings" element={<ManageBookings />} />
					<Route path="/admin/users" element={<ManageUsers />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
