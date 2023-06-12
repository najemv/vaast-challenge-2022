import { useContext } from "react";
import { objectContext } from "../../App";
import { BUILDINGS, PLACES } from "../../data/data";
import { getDistance } from "../../helpers/buildingHelper";
import { Pub, Restaurant } from "../../data/types";
import ScatterPlot, { ScatterPoint } from "../../components/Graphs/ScatterPlot";
import { getColorMap } from "../../helpers/objectHelper";
import { averageMoneySpend } from "../../helpers/travelHelper";
import InfoText from "../TextSection/InfoText";
import HelpText from "../TextSection/HelpText";

interface BuildingDetailProps {

}

const BuildingDetail = ({}: BuildingDetailProps) => {
  const {selectedBuildingId, objectType} = useContext(objectContext);
  if (selectedBuildingId == -1)
  {
    return <InfoText message="Please select some building by clicking the polygon on the map" />;
  }

  console.log(selectedBuildingId);
  console.log(PLACES[837].travels.map((t, i) => {return {t, i}}).filter(i => i.t.length !== 0));
  const travelsForBuilding: number[][] = [];
  PLACES.forEach(_ => travelsForBuilding.push([]));

  const building = BUILDINGS[selectedBuildingId - 1];
  building.units.forEach(placeId => {
    const place = PLACES[placeId];
    place.travels.forEach((travels, index) => {
      travelsForBuilding[index].push(...travels);
    })
  });

  
  let result = Array<ScatterPoint>();
  var colormap = getColorMap();
  let i = 0;

  travelsForBuilding.forEach((travelsForPlace, index) => {
    const dest = PLACES[index];
    if (dest.placeType !== objectType) {
      return;
    }
    let totalSpend = averageMoneySpend(travelsForPlace);

    const distance = getDistance(building, dest as Restaurant | Pub);

    result.push({
      x: distance,
      y: totalSpend,
      size: travelsForPlace.length,
      color: colormap[i]
    });
    i++;
  });

  result = result.filter(i => i.size != 0)

  if (result.length == 0) {
    return <InfoText message="There are no data for that building. Please choose another (check the 'Visits' option)." />;
  }

  return (
    <div>
      <ScatterPlot data={result} />
      <HelpText text="(Size corresponds to visit frequecy)" />
      <HelpText text={`(Color corresponds to ${objectType})`} />
    </div>
  );
};

export default BuildingDetail;