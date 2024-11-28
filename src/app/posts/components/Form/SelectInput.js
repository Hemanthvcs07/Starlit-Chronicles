const SelectInput = ({ id, name, label, value, onChange, options }) => (
    <div className="grid grid-cols-1">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
  
  export default SelectInput;
  