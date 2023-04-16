import { VictoryArea, VictoryChart, VictoryTheme } from "victory";

interface DensityGraphProps {
  data: number[];
  bins: number[];
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

const DensityGraph = ({data, bins}: DensityGraphProps) => {

  const density = getDensity(data, bins);
  console.log("after density", density)
  return (
    <VictoryChart
      theme={VictoryTheme.material}
    >
      <VictoryArea
        style={{ data: { fill: "#c43a31" } }}
        data={density.map((num, i) => {
          return {
            x: bins[i],
            y: num
          }
        })}
        scale={{x: "linear", y: "linear"}}
      />
    </VictoryChart>
  );
};

export default DensityGraph;