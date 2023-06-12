import colormap from "colormap";
import { Pub, Restaurant, Travel } from "../../data/types";
import SvgLine from "./SvgLine";
import SvgObject from "./SvgObject";
import Map, { mapDimensionContext } from "./Map";
import { getColorMap } from "../../helpers/objectHelper";
import { useContext } from "react";
import { objectContext } from "../../App";
import { VictoryLegend } from "victory";
import MapLegend, { MapLegendItem } from "./MapLegend";
import transformPosition from "../../helpers/coordsHelper";


const getLegend = (mapWidth: number, maxTravels: number) => {
  
  const items: MapLegendItem[] = [];
  for (let i = 1; i <= 4; i++) {
    const value = Math.floor(maxTravels / i);
    items.push({
      text: `${value} travels`,
      icon: <line
        x1={0}
        y1={0}
        x2={40}
        y2={0}
        stroke="black"
        strokeWidth={10 / i}
        opacity={1}
      />
    });
  }
  
  return <MapLegend
    rightOffset={180}
    headline="Travel frequency"
    items={items}
    textXOffset={50}
    textYOffset={5}/>
};


interface TravelMapProps {
  travels: number[][][];
}

const TravelMap = ({travels}: TravelMapProps) => {
  const { objects, selectedPlaceId } = useContext(objectContext);
  
  const { width, height } = useContext(mapDimensionContext);
  
  console.log(width, height);
  let colors = getColorMap();

  const maxTravels = Math.max(...travels.flat().map(travelByPlaceStart => travelByPlaceStart.length));

  const objectElemements = objects.map((item, index) =>
    <SvgObject object={item} color={colors[index]} key={index} />
  );
  let travelElements: JSX.Element[] = [];
  if (selectedPlaceId !== -1) {
    const objectIndex = objects.findIndex(o => o.placeId === selectedPlaceId);
    travelElements = travels[objectIndex].map((travelIds, travelIndex) => 
      <SvgLine travels={travelIds} color={colors[objectIndex]} maxTravels={maxTravels} key={objectIndex * 1000000 + travelIndex} />
    );
  } else {
    travelElements = travels.map((objectTravelsByPlace, objectIndex) => {
      return objectTravelsByPlace.map((travelIds, travelIndex) => 
        <SvgLine travels={travelIds} color={colors[objectIndex]} maxTravels={maxTravels} key={objectIndex * 1000000 + travelIndex} />
      )
    }).flat();
  }

  var x = transformPosition({
    x: 5000,
    y: 2000
  }).x;
  console.log(x);
  
  return (
    <Map>
      {getLegend(x, maxTravels)}
      {travelElements}
      {objectElemements}
    </Map>
  );
};

export default TravelMap;