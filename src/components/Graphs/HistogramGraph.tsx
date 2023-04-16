import { VictoryChart, VictoryHistogram } from "victory";


interface HistogramGraphProps {
  data: number[];
  bins: number[];
};

const HistogramGraph = ({data, bins}: HistogramGraphProps) => {
  console.log(data)
  return (
    <VictoryChart
      domainPadding={10}
    >
      <VictoryHistogram
        style={{ data: { fill: "#c43a31" } }}
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