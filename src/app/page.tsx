import HeroSection from '@/components/HeroSection';
import EmblaCarousel from '../components/Carousel/EmblaCarousel';
import ThreeColumnCardGrid from '@/components/ThreePost';
import PostComponent from '@/components/PostComponent';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <ThreeColumnCardGrid/>
      <PostComponent/>
      <EmblaCarousel />
    </div>
  );
};

export default Home;
