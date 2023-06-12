import { useContext } from "react";
import { objectContext } from "../../App";
import { PLACES, TRAVELS } from "../../data/data";
import transformPosition from "../../helpers/coordsHelper";

interface SvgLineProps {
  travels: number[];
  maxTravels: number;
  color: string;
};

const SvgLine = ({travels, maxTravels, color}: SvgLineProps) => {
  const {selectedPlaceId} = useContext(objectContext);
  const travelCount = travels.length;
  
  //console.log(travels)
  const travel = TRAVELS[travels[0]];
  const startLocation = PLACES[travel.travelStartLocationId as number];
  const endLocation = PLACES[travel.travelEndLocationId];
  const lineStart = transformPosition(startLocation.location);
  const lineEnd = transformPosition(endLocation.location);

  const isSelected = selectedPlaceId ==  endLocation.placeId || selectedPlaceId == -1;
  return (
    <line
      x1={lineStart.x}
      y1={lineStart.y}
      x2={lineEnd.x}
      y2={lineEnd.y}
      stroke={color}
      strokeWidth={(travelCount / maxTravels) * 10}
      opacity={1}
    />
  );
};

export default SvgLine;
