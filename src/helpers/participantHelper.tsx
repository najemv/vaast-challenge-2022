import { EducationLevel, Participant } from "../data/types";
import { PLACES, TRAVELS } from "../data/data";
import { averageMoneySpend } from "./travelHelper";
import { ParticipantGraphItem } from "../components/Graphs/ParticipantGraph";


export const getParticipantInfo = (participant: Participant, objectType: string) : ParticipantGraphItem => {
  let spendings: number[] = [];
  let placeVisits: number[] = [];
  for (let placeId = 0; placeId < participant.travels.length; placeId++) {
    const place = PLACES[placeId];
    if (place.placeType !== objectType) {
      continue;
    }

    const travelsToPlace = participant.travels[placeId];
    const avgSpend = averageMoneySpend(travelsToPlace);
    spendings.push(avgSpend);
    placeVisits.push(travelsToPlace.length);

  };

  let averageSpending = spendings.reduce((x, y) => x + y, 0) / spendings.length;
  let nom = placeVisits.filter(i => i !== 0).map(i => Math.exp(-i));
  let denom = nom.reduce((x, y) => x + y, 0);
  nom = nom.map(i => i / denom);
  var max = Math.max(...nom);
  return {
    participantId: participant.participantId,
    age: participant.age,
    education: getEducationLevel(participant.educationLevel),
    avgMoneySpend: averageSpending,
    placeLoyalty: Math.max(max, 0),
    budget: participant.budget
  }
};

export const getEducationLevel = (level: EducationLevel) => {
  if (level === "Low") {
    return 1;
  }
  if (level === "HighSchoolOrCollege") {
    return 2;
  }
  if (level === "Bachelors") {
    return 3;
  }
  if (level === "Graduate") {
    return 4;
  }

  return 0;
}