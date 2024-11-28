const CheckboxInput = ({ id, name, label, checked, onChange }) => (
    <div className="grid grid-cols-1">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="ml-2"
        />
      </label>
    </div>
  );
  
  export default CheckboxInput;
  