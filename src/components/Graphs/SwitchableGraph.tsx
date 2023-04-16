import { useState } from "react";
import OptionSwitch from "../Input/OptionSwitch";
import HistogramGraph from "./HistogramGraph";
import DensityGraph from "./DensityGraph";

interface SwitchableGraphProps {
  name: string;
  data: number[];
  bins: number[];
};



const SwitchableGraph = ({name, data, bins}: SwitchableGraphProps) => {

  const [type, setType] = useState(false);

  return (
    <div>
      <h2>{name}</h2>
      <OptionSwitch leftLabel="histogram" rightLabel="density" onChange={setType} />
      {type ? <DensityGraph data={data} bins={bins} /> : <HistogramGraph data={data} bins={bins} />}
    </div>
  );
};

export default SwitchableGraph;