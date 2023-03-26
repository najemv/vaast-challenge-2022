export type Position = {
  x: number;
  y: number;
};

export type Polygon = Position[];

export type TravelPurpose = 
  "Coming Back From Restaurant" |
  "Eating" |
  "“Going Back to Home" |
  "Recreation (Social Gathering)" |
  "“Work/Home Commute";

export type InterestGroup =
  "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

export type EducationLevel = 
  "Low" | "HighSchoolOrCollege" | "Bachelors" | "Graduate";

export type Building = {
  buildingId: number;
  location: Polygon[];
  buildingType:  string;
  maxOccupancy: number;
  units: number[];
};

export type Travel = {
  participantId: number;
  travelStartTime: string;
  travelStartLocationId: number | null;
  travelDuration: number;
  travelEndLocationId: number;
  purpose: TravelPurpose;
  destinationTimeSpend: number;
  moneySpend: number;
};

export type Participant = {
  participantId: number;
  householdSize: number;
  haveKids: boolean;
  age: number;
  educationLevel: EducationLevel;
  interestGroup: InterestGroup;
  joviality: number;
  travels: number[];
};

export type Place = {
  placeType: "Apartment" | "School" | "Restaurant" | "Pub" | "Employer";
  placeId: number;
  location: Position;
  buildingId: number;
  travels: number[];
};

export type Apartment = Place & {
  rentalCost: number;
  maxOccupancy: number;
  numberOfRooms: number;
};

export type School = Place & {
  monthlyCost: number;
  maxEnrollment: number;
};


export type Restaurant = Place & {
  foodCost: number;
  maxOccupancy: number;
  visits: number[];
};

export type Pub = Place & {
  hourlyCost: number;
  maxOccupancy: number;
  visits: number[];
};

export type Employer = Place & {

};