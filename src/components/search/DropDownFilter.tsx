interface DropdownFilterProps {
    label: string;
    options: { value: string; label: string }[];
    selectedValue: string;
    setSelectedValue: (value: string) => void;
  }
  
  const DropdownFilter: React.FC<DropdownFilterProps> = ({ label, options, selectedValue, setSelectedValue }) => (
    <select
      onChange={(e) => setSelectedValue(e.target.value)}
      value={selectedValue}
      className="border border-gray-300 p-2 rounded-md w-full md:w-1/3"
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
  
  export default DropdownFilter;
  