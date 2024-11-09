const About = () => {
  return (
    <div>

      <main className="text-white container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-6">
          About Starlit Chronicles
        </h1>
        <section className="text-lg  space-y-6">
          <p>
            Welcome to <strong>Starlit Chronicles</strong>, a place where stories are woven from the threads of time, experiences, and passion. Here, we explore the world through the lens of travel, the rhythm of music, and the beauty captured in photography.
          </p>
          <h2 className="text-2xl font-semibold mt-6">Our Journey</h2>
          <p>
            <strong>Starlit Chronicles</strong> began as a personal journey to share the moments and places that have shaped my perspective of the world. Born from a love of discovery and creativity, this blog is an ode to the things that make life richer—the music that moves us, the places that inspire us, and the memories that stay with us long after the moment has passed.
          </p>
          <h2 className="text-2xl font-semibold mt-6">What We Share</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Travel:</strong> Join me as I explore new destinations, cultures, and landscapes. From hidden gems to iconic landmarks, every adventure offers a new story to tell.</li>
            <li><strong>Music:</strong> Whether it&apos;s the soothing sounds of Indian classical music, the energy of electronic beats, or the soulful tunes of alternative rock, music has always been my constant companion. Dive into the melodies that move me and explore music through my eyes.</li>
            <li><strong>Photography:</strong> Capturing the essence of a moment is a powerful way to preserve memories. Through my photography, I hope to share not just images but emotions, moments, and perspectives that resonate deeply.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6">Why Starlit Chronicles?</h2>
          <p>
            The name <strong>Starlit Chronicles</strong> is inspired by the idea that life’s most precious moments are like stars—each one unique, guiding us, and lighting up our path in ways we might not always understand. This blog is my way of sharing those stars with you. Whether it&apos;s through words, images, or sounds, I invite you to join me on this journey of discovery, learning, and connection.
          </p>
          <h2 className="text-2xl font-semibold mt-6">Let’s Connect</h2>
          <p>
            The beauty of this journey is that it’s never truly solitary. I believe that the best stories are shared, and the most memorable moments are those experienced together. I look forward to hearing your thoughts, experiences, and the stories you want to share. Don’t hesitate to reach out via the <a href="/contact" className="text-blue-600 hover:text-blue-800">Contact page</a> or connect with me on social media.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
