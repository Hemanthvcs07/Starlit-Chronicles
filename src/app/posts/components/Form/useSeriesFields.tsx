import { useState, useEffect } from 'react';

const useSeriesFields = (initialFormData, handleChange) => {
  const [existingSeries, setExistingSeries] = useState([]);
  const [isNewSeries, setIsNewSeries] = useState(false);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [formState, setFormState] = useState({
    seriesName: initialFormData.seriesName || '',
    episodeNumber: initialFormData.episodeNumber || 1,
    totalEpisodes: initialFormData.totalEpisodes || '',
    parentSeries: '',
  });

  // Fetch existing series from the API
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch('/api/posts/series');
        if (!response.ok) throw new Error('Failed to fetch series data');
        const data = await response.json();

        // Extract unique series names with their details
        const uniqueSeries = Array.from(
          new Set(data.map((series) => series.seriesName))
        ).map((name) => data.find((series) => series.seriesName === name));

        setExistingSeries(uniqueSeries);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, []);

  // Update filtered series when the series name changes
  useEffect(() => {
    if (formState.seriesName) {
      const filtered = existingSeries.filter((series) =>
        series.seriesName.toLowerCase().includes(formState.seriesName.toLowerCase())
      );
      setFilteredSeries(filtered);
    } else {
      setFilteredSeries([]);
    }
  }, [formState.seriesName, existingSeries]);

  // Handle form state changes
  const updateFormState = (key, value) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
    handleChange({ target: { name: key, value } }); // Sync with parent form state
  };

  // Handle series name input
  const handleSeriesNameChange = (seriesName) => {
    updateFormState('seriesName', seriesName);

    const matchedSeries = existingSeries.find(
      (series) => series.seriesName.toLowerCase() === seriesName.toLowerCase()
    );

    if (matchedSeries) {
      setIsNewSeries(false);
      updateFormState('episodeNumber', matchedSeries.episodeNumber + 1);
      updateFormState('totalEpisodes', matchedSeries.totalEpisodes);
      updateFormState('parentSeries', matchedSeries._id);
    } else {
      setIsNewSeries(true);
      updateFormState('episodeNumber', 1);
      updateFormState('totalEpisodes', '');
      updateFormState('parentSeries', '');
    }
  };

  // Handle selecting a series from suggestions
  const handleSeriesSelect = (series) => {
    updateFormState('seriesName', series.seriesName);
    setIsNewSeries(false);
    updateFormState('episodeNumber', series.episodeNumber + 1);
    updateFormState('totalEpisodes', series.totalEpisodes);
    updateFormState('parentSeries', series._id);
    setFilteredSeries([]);
  };

  return {
    formState,
    updateFormState,
    filteredSeries,
    isNewSeries,
    handleSeriesNameChange,
    handleSeriesSelect,
  };
};

export default useSeriesFields;
