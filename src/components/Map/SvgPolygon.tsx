import { useContext } from "react";
import { objectContext } from "../../App";
import { Building } from "../../data/types";
import transformPosition from "../../helpers/coordsHelper";

interface SvgPolygonProps {
  building: Building;
  color: string;
}

const SvgPolygon = ({building, color}: SvgPolygonProps) => {
  const {selectedBuildingId, setSelectedBuildingId} = useContext(objectContext);
  const p = building.location.map(polygon => polygon.map((point, index) => {
    if (index == 0) return '';
    const loc = transformPosition(point);
    return `${loc.x},${loc.y}`;
  }).join(' '));

  return (
    <g>
      {p.map((points, key) => 
        <polygon points={points} onClick={() => setSelectedBuildingId(building.buildingId)}
        fill={selectedBuildingId !== building.buildingId ? color : "black"} stroke="black" key={key}/>
      )}
    </g>
  );
};

export default SvgPolygon;