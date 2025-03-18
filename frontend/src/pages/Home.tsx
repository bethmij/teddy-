import Banner from '../components/Banner'
import FeaturedProduct from '../components/FeaturedProduct'
import HeaderSlider from '../components/HeaderSlider'

export default function Home() {
    return (
        <div>
            <HeaderSlider />
            <FeaturedProduct/>
            <Banner />
        </div>
    )
}
