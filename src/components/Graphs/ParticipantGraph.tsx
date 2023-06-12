import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme } from "victory";
import { objectContext } from "../../App";
import { useContext } from "react";

export interface ParticipantGraphItem {
  participantId: number;
  age: number;
  education: number;
  budget: number;
  avgMoneySpend: number;
  placeLoyalty: number;
}

export interface ParticipantGraphProps {
  items: ParticipantGraphItem[];
}

const isClose = (num1: number, num2: number) => {
  return Math.abs(num1 - num2) < 0.1;
};

const getAxisLabel = (catIndex: number, num: number): string => {
  switch (catIndex) {
    case 0:
      return num.toString();
    case 1:
      return num.toString() + "y";
    case 2:
      return num == 1 ? "Low" : num == 2 ? "High school" : num == 3 ? "Bachelor" : "Graduate";
    case 3:
      return num.toString();
    case 4:
      return num.toString() + "$";
    case 5:
      return num.toString() + "$";
    default:
      return "";
  };
};

const ParticipantGraph = ({items}: ParticipantGraphProps) => {
  const {selectedParticipantId} = useContext(objectContext);
  const categories = ["Id", "Age", "Education", "Place loyalty", "Income", "Avg spendings"];
  const catMulti = [1100, 70, 4, 1, 3500, 10]
  console.log(Math.min(...items.map(i => i.placeLoyalty)));

  let selectedLine: any = null;
  const lines = items.map(i => {
    const data = [
      {x: categories[0], y: i.participantId / catMulti[0]},
      {x: categories[1], y: i.age / catMulti[1]},
      {x: categories[2], y: i.education / catMulti[2]},
      {x: categories[3], y: i.placeLoyalty / catMulti[3]},
      {x: categories[4], y: i.budget / catMulti[4]},
      {x: categories[5], y: i.avgMoneySpend / catMulti[5]},
    ]

    const line = <VictoryLine
      style={{
        data: {
          stroke: selectedParticipantId == i.participantId ? "red" : "gray",
          strokeWidth: selectedParticipantId == i.participantId ? 1 : 0.1 }
      }}
      categories={{x: categories}}
      data={data}
    />;

    if (selectedParticipantId == i.participantId) {
      selectedLine = line;
    }

    return line;
  });

  lines.push(selectedLine as JSX.Element);

  return (
    <div>
      <VictoryChart
      >
      {lines}
      {categories.map((name, index) => 
      <VictoryAxis
        dependentAxis
        offsetX={50 + index * 70}
        tickValues={[0.25, 0.5, 0.75, 1]}
        tickFormat={(t) => `${getAxisLabel(index, t * catMulti[index])}`}
        style={{
          tickLabels: {fontSize: 8}
        }}
      />)}
      
      <VictoryAxis
        tickCount={categories.length}
        style={{
          axisLabel: {fontSize: 20, padding: 30},
          tickLabels: {fontSize: 8, padding: 5}
        }}
      />
      </VictoryChart>
    </div>
  );
};

export default ParticipantGraph;