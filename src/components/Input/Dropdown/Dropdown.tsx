import "./Dropdows.css";

interface DropdownProps {
  label: string;
  items: string[];
  selected?: string;
  onChange: (value: string) => void;
}

const Dropdown = ({label, items, selected, onChange}: DropdownProps) => {
  return (
    <div className="dropdown--wrapper">
      <label htmlFor="items">{label}</label>
      <select className="dropdown" name="items" id="items" onChange={(e) => onChange(e.target.value)}>
        {items.map(item => <option value={item} selected={item === selected}>{item}</option>)}
      </select>
    </div>
  );
};

export default Dropdown;