import { useContext } from "react";
import { objectContext } from "../../App";
import SwitchableGraph from "../../components/Graphs/SwitchableGraph";
import { TRAVELS } from "../../data/data";
import "./PlaceSection.css";
import InfoText from "../TextSection/InfoText";

interface PlaceDetailProps {
  data: number[][][];
}

const PlaceDetail = ({data}: PlaceDetailProps) => {
  const {selectedPlaceId, objects, objectType} = useContext(objectContext);
  if (selectedPlaceId == -1) {
    return <InfoText message={`Please select some ${objectType} by clicking the circle on the map`} />;
  }

  const data1: number[] = [];
  const data2: number[] = [];
  const data3: number[] = [];
  const data4: number[] = [];

  const index = objects.findIndex(obj => obj.placeId === selectedPlaceId);

  data[index].flat().forEach(i => {
    const travel = TRAVELS[i];
    var visitHour = new Date(new Date(travel.travelStartTime).getTime() + (travel.travelDuration / 2) * 60000).getHours();
    data1.push(travel.moneySpend);
    data2.push(travel.travelDuration);
    data3.push(visitHour);
    data4.push(travel.destinationTimeSpend);
  });

  return (
    <div>
      <h3>Details of Restaurant {index + 1}:</h3>
      <div className="place__detail-wrapper">
        <div className="place__detail-row">
          <SwitchableGraph name="Customers spending" data={data1} bins={[3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0, 5.25, 5.5, 5.75, 6.0, 6.25, 6.5, 6.75, 7]} xlabel="spending" ylabel="amount" unit="$" />
          <SwitchableGraph name="Travel time" data={data2} bins={[0, 10, 20, 30, 40, 50, 60]} xlabel="time" ylabel="amount" unit="m" />
        </div>
        <div className="place__detail-row">
          <SwitchableGraph name="Visit time" data={data3} bins={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]} xlabel="time" ylabel="amount" unit="h" />
          <SwitchableGraph name="Visit length" data={data4} bins={[0, 5, 10, 15, 20, 25, 30]} xlabel="time" ylabel="amount" unit="m" />
        </div>
      </div>
    </div>
  );

};

export default PlaceDetail;