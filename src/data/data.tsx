import buildings from "../assets/data/buildings.json";
import participants from "../assets/data/participants.json";
import places from "../assets/data/places.json";
import travels from "../assets/data/travels.json";
import { Building, Participant, Place, Pub, Restaurant, Travel } from "./types";

export const PLACES : Place[] = places as Place[];
export const BUILDINGS: Building[] = buildings as Building[];
export const PARTICIPANTS: Participant[] = participants as Participant[];;
export const TRAVELS: Travel[] = travels as Travel[];

export const RESTAURANTS = PLACES.filter(p => p.placeType === "Restaurant") as Restaurant[];
export const PUBS = PLACES.filter(p => p.placeType === "Pub") as Pub[];