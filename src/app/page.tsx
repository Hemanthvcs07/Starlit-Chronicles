import HeroSection from '@/components/HeroSection';
import EmblaCarousel from '../components/Carousel/EmblaCarousel';
import ThreeColumnCardGrid from '@/components/ThreePost';
import PostComponent from '@/components/PostComponent';
import CategoryPostComponent from '@/components/PostByCategory';
import BlogRecentPosts from '@/components/RecentPosts';
import NewsletterSignup from '@/components/Newsletter';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <ThreeColumnCardGrid/>
      <BlogRecentPosts/>
      <PostComponent/>
      <CategoryPostComponent/>
      <EmblaCarousel />
      <NewsletterSignup/>
    </div>
  );
};

export default Home;
