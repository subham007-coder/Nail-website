import { Link } from 'react-router-dom';
import AboutUs from '../components/AboutUs.jsx';
import Carousel from '../components/Carousel.jsx';
import Navbar from '../components/Navbar.jsx';
import ProductSlider from '../components/ProductSlider.jsx';
// import ProductSlidertow from '../components/ProductSlidertow.jsx';
import ShopbyCat from "../components/ShopbyCat.jsx";
import Testimonial from '../components/Testimonial.jsx';
import WeOffer from '../components/WeOffer.jsx';
import Groupimages from '../components/Groupimages.jsx';
import BookAppo from '../components/BookAppo.jsx';
import InstaFeed from '../components/InstaFeed.jsx';
import Footer from '../components/Footer.jsx';

function Home() {
  return (
    <div>
        <Navbar/>
        <Carousel />
        <ProductSlider/>
        <ShopbyCat/>
        <WeOffer/>
        <AboutUs/>
        <Testimonial/>
        {/* <ProductSlidertow/> */}
        <ProductSlider/>
        <Groupimages/>
        <BookAppo/>
        <InstaFeed/>
        <Footer/>
    </div>
  )
}

export default Home;