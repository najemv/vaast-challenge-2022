import { useContext } from "react";
import { Building, Position, Pub, Restaurant } from "../data/types";
import { mapDimensionContext } from "../components/Map/Map";



const minX = -4762.19066918826;
const maxX = 2650;
const minY = -30.08359080145072;
const maxY = 7850.037195143702;

export const transformPosition = (location: Position) => {
  const { width, height } = useContext(mapDimensionContext);
  
  let {x, y} = location;
  const transformedX = (x - minX) / (maxX - minX);
  const transformedY = (y - minY) / (maxY - minY);
  return {
    x: transformedX * width,
    y:  (1 - transformedY) * height,
  };
};

export default transformPosition;