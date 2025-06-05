import AboutUs from '../components/AboutUs';
import Carousel from '../components/Carousel'
import Navbar from '../components/Navbar'
import ProductSlider from '../components/ProductSlider'
import ShopbyCat from '../components/ShopbyCat';
import Weoffer from '../components/Weoffer';

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