import Navbar from '../Components/Navbar';
import HomeHero from '../Components/HomeHero';
import PopularDestinations from '../Components/PopularDestinations';
import Categories from '../Components/Categories';
import WhyChooseUs from '../Components/WhyChooseUs';
import Testimonials from '../Components/Testimonials';
import Footer from '../Components/Footer';

export default function Home() {
	return (
		<div className="min-h-screen bg-white relative w-full block">
			<Navbar />
			<HomeHero />
			<main className="relative w-full block z-10 bg-white">
				<PopularDestinations />
				<Categories />
				<WhyChooseUs />
				<Testimonials />
			</main>
			<Footer />
		</div>
	);
}
