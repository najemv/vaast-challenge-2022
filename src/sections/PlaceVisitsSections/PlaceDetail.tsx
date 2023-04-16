import { useContext } from "react";
import { visitSectionContext } from "./RestaurantVisitsSection";
import { TRAVELS } from "../../data/data";
import SwitchableGraph from "../../components/Graphs/SwitchableGraph";

interface PlaceDetailProps {
  data: number[][][];
}

const PlaceDetail = ({data}: PlaceDetailProps) => {
  const {selectedObjectIndex, setSelectedObjectIndex} = useContext(visitSectionContext);
  if (selectedObjectIndex == -1) {
    return <div>Please select some object to see more...</div>;
  }

  const data1: number[] = [];
  const data2: number[] = [];
  const data3: number[] = [];
  const data4: number[] = [];

  data[selectedObjectIndex].flat().forEach(i => {
    const travel = TRAVELS[i];
    var visitHour = new Date(new Date(travel.travelStartTime).getTime() + (travel.travelDuration / 2) * 60000).getHours();
    data1.push(travel.moneySpend);
    data2.push(travel.travelDuration);
    data3.push(visitHour);
    data4.push(travel.destinationTimeSpend);
  });

  return (
    <div>
      <h1>Details of Restaurant {selectedObjectIndex + 1}:</h1>
      <SwitchableGraph name="Customers spending" data={data1} bins={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      <SwitchableGraph name="Travel time" data={data2} bins={[0, 10, 20, 30, 40, 50, 60]} />
      <SwitchableGraph name="Visit time" data={data3} bins={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]} />
      <SwitchableGraph name="Visit length" data={data4} bins={[0, 5, 10, 15, 20, 25, 30]} />
    </div>
  );

};

export default PlaceDetail;