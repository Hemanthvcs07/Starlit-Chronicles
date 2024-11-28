import useBlogPostForm from "./useBlogPostForm";
import FormHeader from "./FormHeader";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import SelectInput from "./SelectInput";
import CheckboxInput from "./CheckboxInput";
import SeriesFields from "./SeriesFields";
import ImagePreview from "./ImagePreview";

const BlogPostForm = () => {
  const {
    formData,
    slug,
    handleChange,
    handleCheckboxChange,
    handleCategoryChange,
    resetForm,
  } = useBlogPostForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      slug,
      ...(formData.categories !== "series" && {
        seriesName: undefined,
        episodeNumber: undefined,
        parentSeries: undefined,
        totalEpisodes: undefined,
      }),
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Post created successfully!");
        resetForm();
      } else {
        alert(`Error: ${result.message || "Failed to create post"}`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error creating post.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl max-w-3xl mx-auto p-6 space-y-6"
    >
      {/* Form Header */}
      <FormHeader title="Create or Edit Blog Post" className="text-2xl font-bold text-gray-800" />

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title and Author Fields */}
        <TextInput
          id="title"
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 rounded-lg text-gray-800"
        />
        <TextInput
          id="author"
          name="author"
          label="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 rounded-lg text-gray-800"
        />

        {/* Tags and Category Fields */}
        <TextInput
          id="tags"
          name="tags"
          label="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 rounded-lg text-gray-800"
        />
        <SelectInput
          id="categories"
          name="categories"
          label="Category"
          value={formData.categories}
          onChange={handleCategoryChange}
          options={[
            { value: "travel", label: "Travel" },
            { value: "music", label: "Music" },
            { value: "photography", label: "Photography" },
            { value: "series", label: "Series" },
          ]}
          className="bg-gray-50 border border-gray-300 rounded-lg text-gray-800"
        />
      </div>

      {/* Content Field */}
      <TextArea
        id="content"
        name="content"
        label="Content"
        value={formData.content}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 rounded-lg text-gray-800"
      />

      {/* Conditional Series Fields */}
      {formData.categories === "series" && (
        <SeriesFields formData={formData} handleChange={handleChange} />
      )}

      {/* Image Upload and Featured Post */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          id="images"
          name="images"
          label="Images (comma separated URLs)"
          value={formData.images}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 rounded-lg text-gray-800"
        />
        <CheckboxInput
          id="isFeatured"
          name="isFeatured"
          label="Featured Post"
          checked={formData.isFeatured}
          onChange={handleCheckboxChange}
          className="text-gray-800"
        />
      </div>

      {/* Image Preview */}
      <ImagePreview images={formData.images} />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
      >
        Submit Post
      </button>
    </form>
  );
};

export default BlogPostForm;
