import { useState, useEffect } from 'react';

const useBlogPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    categories: 'travel',
    tags: '',
    images: '',
    isFeatured: false,
    seriesName: '',
    episodeNumber: 0,
    parentSeries: '',
    totalEpisodes: 0,
  });

  const [slug, setSlug] = useState('');

  // Generate slug from title
  useEffect(() => {
    const generateSlug = (title) =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^[-]+|[-]+$/g, '');
    setSlug(generateSlug(formData.title));
  }, [formData.title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      categories: value,
      ...(value === 'series'
        ? {}
        : {
            seriesName: '',
            episodeNumber: 0,
            parentSeries: '',
            totalEpisodes: 0,
          }),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      categories: 'travel',
      tags: '',
      images: '',
      isFeatured: false,
      seriesName: '',
      episodeNumber: 0,
      parentSeries: '',
      totalEpisodes: 0,
    });
  };

  return {
    formData,
    slug,
    setSlug,
    handleChange,
    handleCheckboxChange,
    handleCategoryChange,
    resetForm,
  };
};

export default useBlogPostForm;
