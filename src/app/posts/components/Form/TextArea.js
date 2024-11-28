const TextArea = ({ id, name, label, value, onChange, required = false }) => (
    <div className="grid grid-cols-1">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 p-3 border border-gray-300 rounded-lg w-full h-48 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>
  );
  
  export default TextArea;
  