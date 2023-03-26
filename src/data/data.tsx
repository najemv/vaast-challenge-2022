import { Building, Participant, Place, Travel } from "./types";
import places from "../assets/data/places.json";
import buildings from "../assets/data/buildings.json";
import participants from "../assets/data/participants.json";
import travels from "../assets/data/travels.json";

export const PLACES : Place[] = places as Place[];
export const BUILDINGS: Building[] = buildings as Building[];
export const PARTICIPANTS: Participant[] = participants as Participant[];;
export const TRAVELS: Travel[] = travels as Travel[];