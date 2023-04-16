import colormap from "colormap";
import { createContext, useContext } from "react";
import { PLACES, TRAVELS } from "../../data/data";
import { Pub, Restaurant, Travel } from "../../data/types";
import transformPosition from "../../helpers/coordsHelper";
import SvgLine from "./SvgLine";
import SvgObject from "./SvgObject";
import cityMap from "/city_map.png";
import { visitSectionContext } from "../../sections/PlaceVisitsSections/RestaurantVisitsSection";

interface TravelMapProps {
  objects: Restaurant[] | Pub[];
  travels: number[][][];
}

export const mapDimensionContext = createContext({
  width: 0,
  height: 0
});

const aspectRatio = 1076 / 1144;

const TravelMap = ({objects, travels}: TravelMapProps) => {
  const width = 500;
  const height = width / aspectRatio;
  
  let colors = colormap({
    colormap: 'jet',
    nshades: objects.length,
    format: 'hex',
    alpha: 1
  });

  const maxTravels = Math.max(...travels.flat().map(travelByPlaceStart => travelByPlaceStart.length));

  const objectElemements = objects.map((item, index) =>
    <SvgObject object={item} color={colors[index]} index={index}  key={index} />
  );

  const travelElements = travels.map((objectTravelsByPlace, objectIndex) => {
    return objectTravelsByPlace.map((travelIds, travelIndex) => 
      <SvgLine travels={travelIds} color={colors[objectIndex]} maxTravels={maxTravels} key={objectIndex * 1000000 + travelIndex} objectIndex={objectIndex}/>
    )
  }).flat();

  return (
    <mapDimensionContext.Provider value={{
      width: width,
      height: height
    }} >
      <div>
        <svg width={width} height={height}>
          <image
            width={width} height={height}
            href={cityMap}
          /> 
          {travelElements}
          {objectElemements}
        </svg>
      </div>
    </mapDimensionContext.Provider>
  );
};

export default TravelMap;