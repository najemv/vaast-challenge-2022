import { useContext } from "react";
import { PLACES, TRAVELS } from "../../data/data";
import transformPosition from "../../helpers/coordsHelper";
import { mapDimensionContext } from "./TravelMap";
import { visitSectionContext } from "../../sections/PlaceVisitsSections/RestaurantVisitsSection";

interface SvgLineProps {
  travels: number[];
  maxTravels: number;
  objectIndex: number;
  color: string;
};

const SvgLine = ({travels, maxTravels, objectIndex, color}: SvgLineProps) => {
  const { width, height } = useContext(mapDimensionContext);
  const {selectedObjectIndex} = useContext(visitSectionContext);
  const travelCount = travels.length;
  const isSelected = selectedObjectIndex == objectIndex;
  //console.log(travels)
  const travel = TRAVELS[travels[0]];
  const startLocation = PLACES[travel.travelStartLocationId as number];
  const endLocation = PLACES[travel.travelEndLocationId];
  const lineStart = transformPosition(startLocation.location);
  const lineEnd = transformPosition(endLocation.location);
  return (
    <line
      x1={lineStart.x * width}
      y1={lineStart.y * height}
      x2={lineEnd.x * width}
      y2={lineEnd.y * height}
      stroke={isSelected || selectedObjectIndex == -1 ? color : "gray"}
      strokeWidth={travel.travelDuration / 10}
      opacity={(travelCount / maxTravels) / 2 + 0.5}
    />
  );
};

export default SvgLine;
