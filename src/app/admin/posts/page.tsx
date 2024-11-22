'use client'
import { useEffect, useState } from 'react';
import { NextPage } from 'next';

// Types
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  categories: string;
  tags: string[];
  images: string[];
  readingTime: number;
  isFeatured: boolean;
  datePosted: string;
  seriesName?: string;
  episodeNumber?: number;
  parentSeries?: string;
}

const BlogPostManager: NextPage = () => {
  // States
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<BlogPost>({
    _id: '',
    title: '',
    slug: '',
    content: '',
    author: '',
    categories: '',
    tags: [],
    images: [],
    readingTime: 0,
    isFeatured: false,
    datePosted: new Date().toISOString(),
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error('Error fetching posts:', err); // Log the error
        setError('Error fetching posts.');
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  // Handle tags change (to ensure it's an array of strings)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPost((prev) => ({ ...prev, tags: value.split(',').map(tag => tag.trim()) }));
  };

  // Create post
  const handleCreatePost = async () => {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPosts((prev) => [data.post, ...prev]);
        setNewPost({
          _id: '',
          title: '',
          slug: '',
          content: '',
          author: '',
          categories: '',
          tags: [],
          images: [],
          readingTime: 0,
          isFeatured: false,
          datePosted: new Date().toISOString(),
        });
        setEditMode(false);
      }
    } catch (err) {
      console.error('Error creating post:', err); // Log the error
      setError('Error creating post.');
    }
  };

  // Update post
  const handleUpdatePost = async (id: string) => {
    try {
      // Ensure you're sending the correct payload structure
      const res = await fetch(`/api/posts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newPost, _id: id }),  // Ensure this matches the expected payload
      });
  
      // Check if the response is ok
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error response:', errorData);
        setError(errorData.error || 'Unknown error');
        return;
      }
  
      // Parse the response data
      const data = await res.json();
  
      // Update state and UI based on the response data
      setPosts((prev) => prev.map((post) => (post._id === id ? data.post : post)));
      setNewPost({
        _id: '',
        title: '',
        slug: '',
        content: '',
        author: '',
        categories: '',
        tags: [],
        images: [],
        readingTime: 0,
        isFeatured: false,
        datePosted: new Date().toISOString(),
      });
      setEditMode(false);
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Error updating post.');
    }
  };  


  // Delete post
  const handleDeletePost = async (id: string) => {
    try {
      console.log("Attempting to delete post with ID:", id);  // Log the ID being sent to the server
  
      // Make DELETE request with ID (not slug)
      const res = await fetch('/api/posts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),  // Send the ID (not slug) to the server
      });
  
      // Check if the response is okay (status 200-299)
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error response from server:', errorData);  // Log the error response
        setError(errorData.error || 'Unknown error');
        return;
      }
  
      // Parse the response data
      const data = await res.json();
      console.log("Response from server:", data);  // Log the server's response
  
      if (data.message === 'Post deleted successfully!') {
        // Remove the deleted post from local state
        setPosts((prev) => prev.filter((post) => post._id !== id));  // Filter out post by ID
        setError(null);  // Clear any previous errors
      } else {
        setError('Post deletion failed');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Error deleting post.');
    }
  };
  
  
  // Render form for creating or editing a post
  const renderForm = () => (
    <div>
      <h2>{editMode ? 'Edit Post' : 'Create New Post'}</h2>
      <input
        type="text"
        name="title"
        value={newPost.title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="slug"
        value={newPost.slug}
        onChange={handleInputChange}
        placeholder="Slug"
      />
      <textarea
        name="content"
        value={newPost.content}
        onChange={handleTextAreaChange}
        placeholder="Content"
      />
      <input
        type="text"
        name="author"
        value={newPost.author}
        onChange={handleInputChange}
        placeholder="Author"
      />
      <input
        type="text"
        name="categories"
        value={newPost.categories}
        onChange={handleInputChange}
        placeholder="Categories (comma separated)"
      />
      <input
        type="text"
        name="tags"
        value={newPost.tags.join(', ')}
        onChange={handleTagsChange}
        placeholder="Tags (comma separated)"
      />
      <button onClick={editMode ? () => handleUpdatePost(newPost._id) : handleCreatePost}>
        {editMode ? 'Update Post' : 'Create Post'}
      </button>
    </div>
  );

  return (
    <div>
      <h1>Blog Post Manager</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Render form for creating or editing a post */}
      {renderForm()}

      {/* Post list */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content.slice(0, 100)}...</p>
              <button onClick={() => { setEditMode(true); setNewPost(post); }}>Edit</button>
              <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogPostManager;

