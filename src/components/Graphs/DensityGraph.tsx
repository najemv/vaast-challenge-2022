import { VictoryArea, VictoryAxis, VictoryChart } from "victory";

interface DensityGraphProps {
  data: number[];
  bins: number[];
  xlabel: string;
  ylabel: string;
  unit: string;
}

const getDensity = (data: number[], bins: number[]) => {
  const result = bins.map(b => 0);
  console.log(result);
  data.forEach(num => {
    let inserted = false;
    for(let j = 1; j < bins.length; j++) {
      if(num > bins[j - 1] && num <= bins[j]) {
        inserted = true;
        result[j] += 1;
        break;
      }
    }

    if (!inserted) {
      bins[-1] = num;
    }
  });
  console.log("after binnig", result)
  for (let i = result.length - 1; i >=0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      result[i] += result[j];
    }
  }

  return result;
}

const DensityGraph = ({data, bins, xlabel, ylabel, unit}: DensityGraphProps) => {

  const density = getDensity(data, bins);
  console.log("after density", density)
  return (
    <div className="graph__wrapper">
      <VictoryChart
        padding={70}
      >
        <VictoryAxis
          label={xlabel}
          tickFormat={(x) => `<${x} ${unit}`}
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
        <VictoryArea
          style={{ data: { fill: "#967E76" } }}
          data={density.map((num, i) => {
            return {
              x: bins[i],
              y: num
            }
          })}
          scale={{x: "linear", y: "linear"}}
        />
      </VictoryChart>
    </div>

  );
};

export default DensityGraph;