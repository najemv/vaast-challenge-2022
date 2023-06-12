import { useContext } from "react";
import { objectContext } from "../../App";
import { Pub, Restaurant } from "../../data/types";
import transformPosition from "../../helpers/coordsHelper";

interface SvgObjectProps {
  object: Restaurant | Pub;
  color: string;
}

const SvgObject = ({object, color}: SvgObjectProps) => {
  const {selectedPlaceId, setSelectedPlaceId} = useContext(objectContext);
  const {x, y} = transformPosition(object.location);

  const isSelected = selectedPlaceId == object.placeId;
  const colored = isSelected || selectedPlaceId === -1;
  return (
    <circle onClick={() => setSelectedPlaceId(object.placeId)}
        cx={x} cy={y}
        r={isSelected ? 10 : 5} stroke="black"
        fill={colored ? color : "gray"}
      >
    </circle>
  );
};

export default SvgObject;