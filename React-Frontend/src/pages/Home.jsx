import AboutUs from '../components/AboutUs.jsx';
import Carousel from '../components/Carousel.jsx';
import Navbar from '../components/Navbar.jsx';
import ProductSlider from '../components/ProductSlider.jsx';
import ShopbyCat from "../components/ShopbyCat.jsx";
import Weoffer from '../components/Weoffer.jsx';

function Home() {
  return (
    <div>
        <Navbar/>
        <Carousel />
        <ProductSlider/>
        <ShopbyCat/>
        <Weoffer/>
        <AboutUs/>
    </div>
  )
}

export default Home;