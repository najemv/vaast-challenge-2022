import { useContext } from "react";
import { Point, VictoryAxis, VictoryChart, VictoryLegend, VictoryScatter, VictoryTheme } from "victory";
import { objectContext } from "../../App";
import HelpText from "../../sections/TextSection/HelpText";

export interface ScatterPoint {
  x: number;
  y: number;
  size: number;
  color: string;
};

export interface ScatterPlotProps {
  data: ScatterPoint[];
};

const ScatterPlot = ({data}: ScatterPlotProps) => {
  const {objectType} = useContext(objectContext);
  const scale = 20;
  const legendScale = 20;
  const sizes = data.map(i => i.size);
  const maxSize = Math.max(... sizes);

  const domain = {
    x: objectType === "Restaurant" ? [0, 2500] : [0, 4000],
    y: objectType === "Restaurant" ?  [4, 6] : [0, 50]
  }

  data = data.map(i => {
    return {
      ...i,
      size: (i.size / maxSize) * scale
    };
  });

  return (
    <div className="graph__wrapper">
      <VictoryChart
        theme={VictoryTheme.material}
        padding={70}
        domain={{ x: domain.x, y: domain.y }}
        
      >
        <VictoryLegend x={210} y={50}
          title="Visit frequency"
          centerTitle
          orientation="vertical"
          rowGutter={-10}
          symbolSpacer={20}
          style={{
            title: {
              fontSize: 20
            },
            
          }}
          data={[
            { name: `${maxSize}`, symbol: { fill: "gray" }, elemSize: legendScale },
            { name: `${Math.floor(maxSize / 2)}`, symbol: { fill: "gray" },  elemSize: legendScale / 2 },
            { name: `${Math.floor(maxSize / 4)}`, symbol: { fill: "gray" },  elemSize: legendScale / 4 }
          ]}
          dataComponent={<Point size={(data: { datum: { elemSize: number; }; }) => {
            console.log(data);
            return data.datum.elemSize / 2;
          }} />}
        />
        <VictoryAxis
          label="Distance"
          tickFormat={(x) => `${x} m`}
          style={{
            axisLabel: {
              padding: 35
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Spending"
          tickFormat={(x) => `${x} $`}
          style={{
            axisLabel: {
              padding: 50
            }
          }}
        />  
        <VictoryScatter
          style={{
            data: {
              fill: ({ datum }) => datum.color
            }
          }}
          data={data}
          dataComponent={<Point size={(data: { datum: { size: number; }; }) => {
            console.log(data);
            return data.datum.size / 2;
          }} />}
          
        />
      </VictoryChart>
    </div>
  );
};

export default ScatterPlot;