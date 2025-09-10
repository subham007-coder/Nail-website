import { Link } from 'react-router-dom';
import AboutUs from '../components/AboutUs.jsx';
import Carousel from '../components/Carousel.jsx';
import Navbar from '../components/Navbar.jsx';
import ProductSlider from '../components/ProductSlider.jsx';
// import ProductSlidertow from '../components/Product_Slider_Category.jsx';
import ShopbyCat from "../components/ShopbyCat.jsx";
import Testimonial from '../components/Testimonial.jsx';
import WeOffer from '../components/WeOffer.jsx';
import Groupimages from '../components/Groupimages.jsx';
import BookAppo from '../components/BookAppo.jsx';
import InstaFeed from '../components/InstaFeed.jsx';
import Footer from '../components/Footer.jsx';
import Download_App_section from '../components/Download_App_section.jsx';

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
        {/* <ProductSlider/> */}
        <Download_App_section/>
        <Groupimages/>
        <BookAppo/>
        <InstaFeed/>
        <Footer/>
    </div>
  )
}

export default Home;