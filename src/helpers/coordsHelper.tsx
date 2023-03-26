import { Position } from "../data/types";



const minX = -4762.19066918826;
const maxX = 2650;
const minY = -30.08359080145072;
const maxY = 7850.037195143702;

export const transformPosition = (location: Position) => {
  let {x, y} = location;
  const transformedX = (x - minX) / (maxX - minX);
  const transformedY = (y - minY) / (maxY - minY);
  return {
    x: transformedX,
    y:  1 - transformedY
  };
};

export default transformPosition;
