import mongoose from 'mongoose';
import BlogPost from './models/BlogPost'; // Adjust path if needed

// Connect to MongoDB
mongoose.connect('your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    seedMusicPosts();  // Call the function to seed data
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Music post data to seed
const musicPosts = [
  {
    title: 'The Evolution of Jazz: From Roots to Modernity',
    slug: 'evolution-of-jazz',
    content: `Jazz, a genre rooted in African American culture, has evolved significantly since its birth in New Orleans at the turn of the 20th century. The genre incorporates improvisation, swing, blues, and a complex rhythmic structure. In its early years, jazz focused on brass instruments, with pioneers like Louis Armstrong and Duke Ellington shaping the sound. The genre has since diversified, influencing various sub-genres such as bebop, cool jazz, and smooth jazz. Today, jazz continues to evolve, blending with other genres like hip-hop and electronic music.`,
    author: 'Miles Davis',
    categories: 'music',
    tags: ['jazz', 'history', 'music evolution', 'Louis Armstrong', 'Duke Ellington'],
    images: [
      'https://example.com/images/jazz.jpg', // Replace with actual image URL
    ],
  },
  {
    title: 'The Rise of Hip-Hop: A Cultural Revolution',
    slug: 'rise-of-hip-hop',
    content: `Hip-hop, born in the South Bronx in the 1970s, has grown into a global phenomenon. Initially seen as a form of street expression, it quickly expanded to encompass four main elements: rapping (MCing), DJing, breakdancing, and graffiti. Iconic artists such as Tupac Shakur, The Notorious B.I.G., and later Jay-Z and Kendrick Lamar, shaped hip-hop into a platform for political expression and storytelling. Today, hip-hop continues to influence fashion, language, and social movements.`,
    author: 'Kendrick Lamar',
    categories: 'music',
    tags: ['hip-hop', 'cultural revolution', 'Tupac', 'street culture', 'political expression'],
    images: [
      'https://example.com/images/hiphop.jpg', // Replace with actual image URL
    ],
  },
  {
    title: 'Classical Music: A Symphony of Cultures and Eras',
    slug: 'classical-music-symphony',
    content: `Classical music, often considered the pinnacle of Western musical tradition, spans over 400 years of history. Beginning in the Baroque era with composers like Bach and Handel, the genre evolved through the Classical period with Mozart and Beethoven, and continued into the Romantic era with Brahms and Tchaikovsky. Classical music is known for its complexity, intricate orchestration, and emotional depth. It's a universal language that has influenced countless other genres and continues to be celebrated worldwide.`,
    author: 'Ludwig van Beethoven',
    categories: 'music',
    tags: ['classical music', 'symphony', 'Beethoven', 'Mozart', 'music history'],
    images: [
      'https://example.com/images/classical.jpg', // Replace with actual image URL
    ],
  },
  {
    title: 'The Role of Music in African Culture: Rhythm, Storytelling, and Ritual',
    slug: 'african-music-culture',
    content: `In African culture, music is deeply intertwined with community life, spiritual rituals, and storytelling. Traditional African music often emphasizes rhythm, with instruments like the djembe, balafon, and kora playing key roles. Music is used to mark important life events such as births, marriages, and funerals, and it serves as a means of passing down history, myths, and legends. African music's influence can be seen in genres worldwide, from jazz to reggae, and has shaped modern music in profound ways.`,
    author: 'Angélique Kidjo',
    categories: 'music',
    tags: ['African music', 'rituals', 'storytelling', 'drums', 'cultural heritage'],
    images: [
      'https://example.com/images/african-music.jpg', // Replace with actual image URL
    ],
  },
  {
    title: 'The Birth of Electronic Music: From Disco to EDM',
    slug: 'birth-of-electronic-music',
    content: `Electronic music began as an experimental genre in the early 20th century with pioneers like Karlheinz Stockhausen and Wendy Carlos. The genre gained mass popularity in the late 1970s and early 1980s with the rise of disco, house, and techno music. Artists like Kraftwerk, Giorgio Moroder, and Daft Punk helped define the sound. Today, electronic dance music (EDM) dominates the global music scene, with artists like Calvin Harris, David Guetta, and Avicii bringing the genre to mainstream audiences.`,
    author: 'Daft Punk',
    categories: 'music',
    tags: ['electronic music', 'EDM', 'techno', 'disco', 'Daft Punk'],
    images: [
      'https://example.com/images/electronic-music.jpg', // Replace with actual image URL
    ],
  },
  {
    title: 'Reggae and the Rastafarian Movement: Music as a Social Force',
    slug: 'reggae-rastafarian-movement',
    content: `Reggae music, popularized by artists like Bob Marley, is inextricably linked to the Rastafarian movement. Originating in Jamaica in the late 1960s, reggae blended traditional Caribbean music with rhythm and blues, jazz, and ska. The genre became a powerful voice for social justice, political change, and resistance against oppression. Lyrics often speak of peace, love, and unity, with Rastafarian spiritual beliefs deeply influencing the music's themes. Today, reggae continues to inspire movements for social change and remains an enduring global genre.`,
    author: 'Bob Marley',
    categories: 'music',
    tags: ['reggae', 'Rastafarian', 'social change', 'Jamaican music', 'Bob Marley'],
    images: [
      'https://example.com/images/reggae.jpg', // Replace with actual image URL
    ],
  },
];

// Function to seed the posts
async function seedMusicPosts() {
  try {
    // Clear existing posts
    await BlogPost.deleteMany({ categories: 'music' });

    // Insert new music posts
    await BlogPost.insertMany(musicPosts);
    console.log('Successfully seeded music posts!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding posts:', error);
    mongoose.disconnect();
  }
}
