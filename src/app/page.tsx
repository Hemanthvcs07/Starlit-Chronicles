import HeroSection from '@/components/HeroSection';
import EmblaCarousel from '../components/Carousel/EmblaCarousel';
import ThreeColumnCardGrid from '@/components/ThreePost';
import PostComponent from '@/components/PostComponent';
import CategoryPostComponent from '@/components/PostByCategory';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <ThreeColumnCardGrid/>
      <PostComponent/>
      <CategoryPostComponent/>
      <EmblaCarousel />
    </div>
  );
};

export default Home;
