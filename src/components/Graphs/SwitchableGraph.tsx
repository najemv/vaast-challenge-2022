import { useState } from "react";
import OptionSwitch from "../Input/Switch/OptionSwitch";
import HistogramGraph from "./HistogramGraph";
import DensityGraph from "./DensityGraph";
import "./Graph.css";

interface SwitchableGraphProps {
  name: string;
  data: number[];
  bins: number[];
  xlabel: string;
  ylabel: string;
  unit: string;
};



const SwitchableGraph = ({name, data, bins, xlabel, ylabel, unit}: SwitchableGraphProps) => {

  const [type, setType] = useState(false);

  return (
    <div className="graph__switchable-wrapper">
      <div className="graph__switchable-title">
        <h5 className="graph__headline">{name}</h5>
        <OptionSwitch leftLabel="histogram" rightLabel="density" onChange={setType} />
      </div>
      {type ?
        <DensityGraph data={data} bins={bins} xlabel={xlabel} ylabel={ylabel} unit={unit} /> :
        <HistogramGraph data={data} bins={bins} xlabel={xlabel} ylabel={ylabel} unit={unit} />}
    </div>
  );
};

export default SwitchableGraph;