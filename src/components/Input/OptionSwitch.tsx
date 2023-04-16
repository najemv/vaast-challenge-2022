import "./OptionSwitch.css";

interface OptionSwitchProps {
  leftLabel: string;
  rightLabel: string;
  onChange: (value: boolean) => void;
}

const OptionSwitch = ({onChange, leftLabel, rightLabel}: OptionSwitchProps) => {

  return (
    <div>
      <span>{leftLabel}</span>
      <label className="switch">
        <input type="checkbox" onChange={(e) => onChange(e.target.checked)}/>
        <span className="slider round"></span>
      </label>
      <span>{rightLabel}</span>
    </div>
    
  );
};

export default OptionSwitch;