import interpolate from "color-interpolate";
import { useContext } from "react";
import { objectContext } from "../../App";
import { BUILDINGS } from "../../data/data";
import { getClosestObjectDistance, getMostVisitedObject } from "../../helpers/buildingHelper";
import { getColorMap } from "../../helpers/objectHelper";
import { BuildingMapType } from "../../sections/BuildingSection/BuildingSection";
import Map from "./Map";
import SvgObject from "./SvgObject";
import SvgPolygon from "./SvgPolygon";
import MapLegend, { MapLegendItem } from "./MapLegend";

const getLegend = (maxDistance: number, colormap: any) => {
  
  const items: MapLegendItem[] = [];
  for (let i = 1; i <= 4; i++) {
    const value = Math.floor(maxDistance / i);
    items.push({
      text: `${value} m`,
      icon: <rect width="15" height="15" fill={colormap(1 / i)} />
    });
  }
  // TODO: position
  return <MapLegend
  rightOffset={120}
  headline="Distance"
  items={items}
  textXOffset={30}
  textYOffset={15}/>
};


interface BuildingMapProps {
  type: BuildingMapType;
}

const BuildingMap = ({type}: BuildingMapProps) => {
  const { objects } = useContext(objectContext);
  let buildingColors: string[] = [];
  let objectColors: string[] = [];
  let legend: JSX.Element | null = null;

  switch (type) {
    case "Distance": {
      const colormap = interpolate(['lightgreen', 'yellow', 'red']);
      const values = BUILDINGS.map(building => getClosestObjectDistance(building));
      const maxValue = Math.max(...values);
      buildingColors = values.map(val => colormap(val / maxValue));
      objectColors = Array(objects.length).fill("white");
      legend = getLegend(maxValue, colormap);
      break;
    } 
    case "Visits": {
      const colormap = getColorMap();
      const values = BUILDINGS.map(building => getMostVisitedObject(building));

      buildingColors = values.map(val => val !== -1 ? colormap[val] : "white");
      objectColors = colormap;
      break;
    }
  }

  const objectElements = objects.map((item, index) =>
    <SvgObject object={item} color={objectColors[index]} key={index} />
  );
  
  const buildingElements = BUILDINGS.map((building, index) => <SvgPolygon building={building} color={buildingColors[index]} key={index}/>);

  return (
    <Map>
      
      {buildingElements}
      {objectElements}
      {legend}
    </Map>
  );
};

export default BuildingMap;