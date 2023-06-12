import { VictoryAxis, VictoryChart, VictoryHistogram } from "victory";

interface HistogramGraphProps {
  data: number[];
  bins: number[];
  xlabel: string;
  ylabel: string;
  unit: string;
};

const HistogramGraph = ({data, bins, xlabel, ylabel, unit}: HistogramGraphProps) => {
  return (
    <VictoryChart
      padding={70}
    >
      <VictoryAxis
        label={xlabel}
        tickFormat={(x) => `${x} ${unit}`}
        style={{
          axisLabel: {
            padding: 35
          }
        }}
      />
      <VictoryAxis
        dependentAxis
        label={ylabel}
        style={{
          axisLabel: {
            padding: 55
          }
        }}
      />  
      <VictoryHistogram
        style={{ data: { fill: "#967E76" } }}
        data={data.map(i => {
          return{
            x: i
          }
        })}
        bins={bins}
        
        scale={{x: "linear", y: "linear"}}
      />
    </VictoryChart>
  );
};

export default HistogramGraph;