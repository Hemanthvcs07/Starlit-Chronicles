import TextInput from './TextInput';
import useSeriesFields from './useSeriesFields';

const SeriesFields = ({ formData, handleChange }) => {
  const {
    formState,
    filteredSeries,
    isNewSeries,
    handleSeriesNameChange,
    handleSeriesSelect,
    updateFormState,
  } = useSeriesFields(formData, handleChange);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Series Name Input */}
      <div className="relative">
        <TextInput
          id="seriesName"
          name="seriesName"
          label="Series Name"
          value={formState.seriesName}
          onChange={(e) => handleSeriesNameChange(e.target.value)}
        />

        {/* Suggestions list */}
        {filteredSeries.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-40 overflow-y-auto rounded-lg shadow-lg">
            {filteredSeries.map((series) => (
              <li
                key={series._id}
                className="p-2 text-black hover:bg-gray-100 cursor-pointer transition-all duration-150"
                onClick={() => handleSeriesSelect(series)}
              >
                {series.seriesName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Episode Number Input */}
      <TextInput
        id="episodeNumber"
        name="episodeNumber"
        label="Episode Number"
        value={formState.episodeNumber}
        onChange={(e) => updateFormState('episodeNumber', e.target.value)}
        required
      />

      {/* Total Episodes Input */}
      {isNewSeries && formState.episodeNumber === 1 && (
        <TextInput
          id="totalEpisodes"
          name="totalEpisodes"
          label="Total Episodes"
          value={formState.totalEpisodes}
          onChange={(e) => updateFormState('totalEpisodes', e.target.value)}
          required
        />
      )}

      {/* Hidden input for parent series ID */}
      <input
        type="hidden"
        name="parentSeries"
        value={formState.parentSeries}
      />
    </div>
  );
};

export default SeriesFields;
