import { NextResponse } from 'next/server';
export const GET = async () => {
    return NextResponse.json({
      featuredPosts: [
        { title: 'Test Featured Post', content: 'This is a test post for featured.', author: 'Admin', categories: ['featured'], isFeatured: true }
      ],
      seriesPosts: [
        { title: 'Test Series Post', content: 'This is a test post for series.', author: 'Admin', categories: ['series'] }
      ],
      travelPosts: [
        { title: 'Test Travel Post', content: 'This is a test post for travel.', author: 'Admin', categories: ['travel'] }
      ],
      musicPosts: [
        { title: 'Test Music Post', content: 'This is a test post for music.', author: 'Admin', categories: ['music'] }
      ],
      photographyPosts: [
        { title: 'Test Photography Post', content: 'This is a test post for photography.', author: 'Admin', categories: ['photography'] }
      ],
    });
  };
  