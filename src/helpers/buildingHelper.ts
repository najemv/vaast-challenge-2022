import { useContext } from "react";
import { objectContext } from "../App";
import { PLACES } from "../data/data";
import { Building, Polygon, Pub, Restaurant } from "../data/types";

export const getPolygonCenter = (polygons: Polygon[]) => {
  let totalX = 0;
  let totalY = 0;
  polygons.forEach(poly => {
    let polyX = 0;
    let polyY = 0;

    poly.forEach(pos => {
      polyX += pos.x;
      polyY += pos.y;
    });

    totalX += polyX / poly.length;
    totalY += polyY / poly.length;
  });

  return {
    x: totalX / polygons.length,
    y: totalY / polygons.length
  };
};

export const getDistance = (building: Building, object: Restaurant | Pub) => {
  const { x, y } = getPolygonCenter(building.location);
  const o = object.location;

  return Math.sqrt(Math.pow(x - o.x, 2) + Math.pow(y - o.y, 2));
};

export const getClosestObjectDistance = (building: Building): number => {
  const { objects } = useContext(objectContext);
  return Math.min(...objects.map(o => getDistance(building, o)));
};

export const getMostVisitedObject = (building: Building): number => {
  const { objects } = useContext(objectContext);
  const buildingVisits = Array(PLACES.length).fill(0);
  building.units.forEach(unitId => {
    const place = PLACES[unitId];
    place.travels.forEach((placeTravels, destinationId) => {
      buildingVisits[destinationId] += placeTravels.length;
    });
  });

  let mostVisitedObject = -1;
  let mostVisits = 0;

  objects.forEach((o, index) => {
    let objectVisits = buildingVisits[o.placeId]
    if (objectVisits > mostVisits) {
      mostVisits = objectVisits;
      mostVisitedObject = index;
    }
  });

  return mostVisitedObject;
};

//export const getBuildingValue = (building: Building, type: BuildingMapType) => {
//  switch (type) {
//    case "Distance":
//      return getDistanceValue(building);
//    case "VIsits":
//      return  getMostVisitedObject(building);
//    default:
//      return 1;
//  }
//};
