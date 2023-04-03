import { PLACES, TRAVELS } from "../../data/data";
import { Pub, Restaurant, Travel } from "../../data/types";
import transformPosition from "../../helpers/coordsHelper";
import cityMap from "/city_map.png";

interface TravelMapProps {
  objects: Restaurant[] | Pub[];
  travels: number[][][];
}

const TravelMap = ({objects, travels}: TravelMapProps) => {
  console.log(travels);
  const aspectratio = 1076 / 1144;

  const width = 500;
  const height = width / aspectratio;
  //console.log(height, height);

  const objectElemements = objects.map((item, index) => {
    const key = `obj-${index}`;
    const {x, y} = transformPosition(item.location);
    //console.log(x, y);
    return <circle
        cx={x * width} cy={y * height}
        r={3} stroke="red"
        fill={"red"}
        key={key}
      >
      </circle>;
  });

  const maxTravels = Math.max(...travels.flat().map(travelByPlaceStart => travelByPlaceStart.length));
  const travelElements = travels.map((objectTravelsByPlace, objectIndex) => {
    return objectTravelsByPlace.map((travelIds, travelIndex) => {
      const travelCount = travelIds.length;

      const travel = TRAVELS[travelIds[0]];
      const startLocation = PLACES[travel.travelStartLocationId as number];
      const endLocation = PLACES[travel.travelEndLocationId];
      const lineStart = transformPosition(startLocation.location);
      const lineEnd = transformPosition(endLocation.location);

      const key = `obj-${objectIndex}-travel-${travelIndex}`;
      return <line
          x1={lineStart.x * width}
          y1={lineStart.y * height}
          x2={lineEnd.x * width}
          y2={lineEnd.y * height}
          stroke="red"
          strokeWidth={1}
          opacity={travelCount / maxTravels}
          key={key}
        />
    })
  }).flat();

  return (
    <div>
      <svg width={width} height={height}>
        <image
          width={width} height={height}
          href={cityMap}
        /> 
        {objectElemements}
        {travelElements}
      </svg>
    </div>
  );
};

export default TravelMap;