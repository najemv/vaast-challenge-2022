import { useContext } from "react";
import { Pub, Restaurant } from "../../data/types"
import transformPosition from "../../helpers/coordsHelper";
import { mapDimensionContext } from "./TravelMap";
import { visitSectionContext } from "../../sections/PlaceVisitsSections/RestaurantVisitsSection";

interface SvgObjectProps {
  object: Restaurant | Pub;
  index: number;
  color: string;
}

const SvgObject = ({object, index, color}: SvgObjectProps) => {
  const {selectedObjectIndex, setSelectedObjectIndex} = useContext(visitSectionContext);
  const { width, height } = useContext(mapDimensionContext);
  const {x, y} = transformPosition(object.location);

  const isSelected = selectedObjectIndex == index;

  return (
    <circle onClick={() => setSelectedObjectIndex(index)}
        cx={x * width} cy={y * height}
        r={isSelected ? 10 : 5} stroke="black"
        fill={isSelected ? color : "gray"}
      >
    </circle>
  );
};

export default SvgObject;