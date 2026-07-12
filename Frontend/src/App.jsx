import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './Pages/Home';
import DestinationPage from './Pages/DestinationPage';
import DestinationDetailPage from './Pages/DestinationDetailPage';
import GalleryPage from './Pages/GalleryPage';
import TourPackagesPage from './Pages/TourPackagesPage';
import TourPackageDetailPage from './Pages/TourPackageDetailPage';
import ContactPage from './Pages/ContactPage';
import AboutPage from './Pages/AboutPage';
import BookingPage from './Pages/BookingPage';
import BookingSuccessPage from './Pages/BookingSuccessPage';
import ReviewPage from './Pages/ReviewPage';
import AllReviewsPage from './Pages/AllReviewsPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import ProfilePage from './Pages/ProfilePage';
import Dashboard from './Pages/Dashboard';
import Insights from './Pages/Insights';
import ManagePackages from './Pages/ManageTourPackages';
import ManageReviews from './Pages/managereview';
import ManageMessages from './Pages/managemessages';
import ManageUsers from './Pages/ManageUsers';
import ManageGallery from './Pages/ManageGallery';
import ManageDestinations from './Pages/managedestination';
import ManageBookings from './Pages/managebookings';
import AdminSettings from './Pages/AdminSettings';
import AdminProfile from './Pages/AdminProfile';
import NotFound from './Pages/NotFound';
import AdminRoute from './Components/AdminRoute';
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
					<Route path="/tour-packages/:idOrSlug" element={<TourPackageDetailPage />} />
					<Route path="/contact-us" element={<ContactPage />} />
					<Route path="/about-us" element={<AboutPage />} />
					<Route path="/booking" element={<BookingPage />} />
					<Route path="/booking-success" element={<BookingSuccessPage />} />
					<Route path="/write-review" element={<ReviewPage />} />
					<Route path="/all-reviews" element={<AllReviewsPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password/:token" element={<ResetPassword />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="*" element={<NotFound />} />

					{/* Admin Routes — protected by AdminRoute */}
					<Route path="/admin" element={<AdminRoute><Navigate to="/admin/dashboard" replace /></AdminRoute>} />
					<Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
					<Route path="/admin/insights" element={<AdminRoute><Insights /></AdminRoute>} />
					<Route path="/admin/packages" element={<AdminRoute><ManagePackages /></AdminRoute>} />
					<Route path="/admin/gallery" element={<AdminRoute><ManageGallery /></AdminRoute>} />
					<Route path="/admin/reviews" element={<AdminRoute><ManageReviews /></AdminRoute>} />
					<Route path="/admin/messages" element={<AdminRoute><ManageMessages /></AdminRoute>} />
					<Route path="/admin/destinations" element={<AdminRoute><ManageDestinations /></AdminRoute>} />
					<Route path="/admin/bookings" element={<AdminRoute><ManageBookings /></AdminRoute>} />
					<Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
					<Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
					<Route path="/admin/profile" element={<AdminRoute><AdminProfile /></AdminRoute>} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
