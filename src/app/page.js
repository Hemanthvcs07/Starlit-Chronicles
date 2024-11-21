'use client'
import Navbar from "./components/Navbar";
import PostsList from './components/PostsList'

export default function Home() {
  return (
    <div>
      <Navbar />
      <PostsList/>
    </div>
  );
}
