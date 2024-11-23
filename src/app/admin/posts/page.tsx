// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";

// const BlogPostForm = ({ posts = [] }) => {
//   const [newPost, setNewPost] = useState({
//     title: "",
//     content: "",
//     author: "",
//     categories: "",
//     tags: [],
//     images: [],
//     isFeatured: false,
//     seriesName: "",
//     episodeNumber: "",
//     parentSeries: "",
//   });

//   const [seriesList, setSeriesList] = useState([]);

//   // Filter existing series from posts
//   useEffect(() => {
//     if (posts && posts.length > 0) {
//       const filteredSeries = posts.filter(
//         (post) => post.categories === "series"
//       );
//       const seriesData = filteredSeries.map((post) => ({
//         name: post.seriesName,
//         episodes: post.episodeNumber,
//         lastEpisodeId: post._id,
//       }));

//       // Ensure no duplicate series names are added
//       const uniqueSeries = Array.from(
//         new Set(seriesData.map((s) => s.name))
//       ).map((name) => seriesData.find((s) => s.name === name));

//       setSeriesList(uniqueSeries);
//     }
//   }, [posts]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPost((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTagsChange = (e) => {
//     const { value } = e.target;
//     setNewPost((prev) => ({
//       ...prev,
//       tags: value.split(",").map((tag) => tag.trim()),
//     }));
//   };

//   const handleImageUrlsChange = (e) => {
//     const value = e.target.value;
//     const imageUrls = value.split(",").map((url) => url.trim());
//     setNewPost((prev) => ({ ...prev, images: imageUrls }));
//   };

//   const handleCategoryChange = (e) => {
//     const { value } = e.target;
//     setNewPost((prev) => ({ ...prev, categories: value }));

//     if (value !== "series") {
//       setNewPost((prev) => ({
//         ...prev,
//         seriesName: "",
//         episodeNumber: "",
//         parentSeries: "",
//       }));
//     }
//   };

//   const handleSeriesChange = (e) => {
//     const { value } = e.target;
//     setNewPost((prev) => ({ ...prev, seriesName: value }));

//     const selectedSeries = seriesList.find((series) => series.name === value);
//     if (selectedSeries) {
//       setNewPost((prev) => ({
//         ...prev,
//         episodeNumber: selectedSeries.episodes + 1,
//         parentSeries: selectedSeries.lastEpisodeId,
//       }));
//     }
//   };

//   const handleCreatePost = async () => {
//     try {
//       const response = await fetch("/api/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newPost),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Post created successfully!");
//       } else {
//         alert(`Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Error creating post:", error);
//       alert("An error occurred while creating the post.");
//     }
//   };

//   const renderForm = () => (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Create New Post</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Basic Fields */}
//         <div className="flex flex-col">
//           <label htmlFor="title" className="mb-2 font-semibold">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={newPost.title}
//             onChange={handleInputChange}
//             className="p-2 border rounded-md"
//             placeholder="Title"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="author" className="mb-2 font-semibold">
//             Author
//           </label>
//           <input
//             type="text"
//             name="author"
//             value={newPost.author}
//             onChange={handleInputChange}
//             className="p-2 border rounded-md"
//             placeholder="Author"
//           />
//         </div>

//         <div className="flex flex-col md:col-span-2">
//           <label htmlFor="content" className="mb-2 font-semibold">
//             Content
//           </label>
//           <textarea
//             name="content"
//             value={newPost.content}
//             onChange={handleInputChange}
//             className="p-2 border rounded-md"
//             placeholder="Content"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="categories" className="mb-2 font-semibold">
//             Category
//           </label>
//           <select
//             name="categories"
//             value={newPost.categories}
//             onChange={handleCategoryChange}
//             className="p-2 border rounded-md"
//           >
//             <option value="">Select Category</option>
//             <option value="travel">Travel</option>
//             <option value="music">Music</option>
//             <option value="photography">Photography</option>
//             <option value="series">Series</option>
//           </select>
//         </div>

//         <div className="flex flex-col md:col-span-2">
//           <label htmlFor="tags" className="mb-2 font-semibold">
//             Tags (comma separated)
//           </label>
//           <input
//             type="text"
//             name="tags"
//             value={newPost.tags.join(", ")}
//             onChange={handleTagsChange}
//             className="p-2 border rounded-md"
//             placeholder="Tags (comma separated)"
//           />
//         </div>

//         <div className="flex flex-col md:col-span-2">
//           <label htmlFor="images" className="mb-2 font-semibold">
//             Image URLs (comma separated)
//           </label>
//           <input
//             type="text"
//             name="images"
//             value={newPost.images.join(", ")}
//             onChange={handleImageUrlsChange}
//             className="p-2 border rounded-md"
//             placeholder="Enter image URLs"
//           />
//           <div className="mt-2 flex space-x-4">
//   {newPost.images.map((image, index) => (
//     image && (  // Check if the image URL is not empty
//       <div key={index} className="flex-shrink-0">
//         <Image
//           src={image}
//           alt={`preview-${index}`}
//           width={100}
//           height={100}
//           className="rounded-lg" // Rounded corners
//         />
//       </div>
//     )
//   ))}
// </div>
//         </div>

//         {/* Featured Checkbox */}
//         <div className="flex items-center md:col-span-2">
//           <label className="mr-2 font-semibold">Featured Post:</label>
//           <input
//             type="checkbox"
//             checked={newPost.isFeatured}
//             onChange={(e) =>
//               setNewPost({ ...newPost, isFeatured: e.target.checked })
//             }
//           />
//         </div>

//         {/* Series-related Fields */}
//         {newPost.categories === "series" && (
//           <div className="md:col-span-2">
//             <label htmlFor="seriesName" className="mb-2 font-semibold">
//               Series Name
//             </label>
//             <select
//               name="seriesName"
//               value={newPost.seriesName}
//               onChange={handleSeriesChange}
//               className="p-2 border rounded-md"
//             >
//               <option value="">Select a series</option>
//               {seriesList.map((series) => (
//                 <option key={series.name} value={series.name}>
//                   {series.name}
//                 </option>
//               ))}
//             </select>

//             {newPost.episodeNumber && (
//               <div className="mt-2">
//                 Episode Number: {newPost.episodeNumber}
//               </div>
//             )}

//             {newPost.parentSeries && (
//               <div className="mt-2">
//                 Parent Series ID: {newPost.parentSeries}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleCreatePost}
//         className="mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
//       >
//         Create Post
//       </button>
//     </div>
//   );

//   return <div>{renderForm()}</div>;
// };

// export default BlogPostForm;
