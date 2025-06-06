import AboutUs from '../components/AboutUs.jsx';
import Carousel from '../components/Carousel.jsx';
import Navbar from '../components/Navbar.jsx';
import ProductSlider from '../components/ProductSlider.jsx';
import ShopbyCat from "../components/ShopbyCat.jsx";
import WeOffer from '../components/WeOffer.jsx';

function Home() {
  return (
    <div>
        <Navbar/>
        <Carousel />
        <ProductSlider/>
        <ShopbyCat/>
        <WeOffer/>
        <AboutUs/>
    </div>
  )
}

export default Home;