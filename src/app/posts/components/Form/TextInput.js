const TextInput = ({ id, name, label, value, onChange, required = false }) => (
    <div className="grid grid-cols-1">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>
  );
  
  export default TextInput;
  