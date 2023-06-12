import { createContext } from 'react';
import './App.css';
import { RESTAURANTS } from './data/data';
import { Pub, Restaurant } from './data/types';
import RestaurantSection from './sections/RestaurantSection';
import PubSection from './sections/PubSection';
import TextSection from './sections/TextSection/TextSection';

export type ObjectType = "Restaurant" | "Pub";

export const objectContext = createContext<{
  objectType: ObjectType;
  objects: Restaurant[] | Pub[];
  selectedPlaceId: number;
  setSelectedPlaceId: (index: number) => void;
  selectedBuildingId: number;
  setSelectedBuildingId: (index: number) => void;
  selectedParticipantId: number;
  setSelectedParticipantId: (index: number) => void;
}>({
  objectType: "Restaurant",
  objects: RESTAURANTS,
  selectedPlaceId: -1,
  setSelectedPlaceId: (index: number) => {},
  selectedBuildingId: -1,
  setSelectedBuildingId: (index: number) => {},
  selectedParticipantId: -1,
  setSelectedParticipantId: (index: number) => {}
});

function App() {
  // sections
  return (
    <main>
      <TextSection>
        <h1>VAST Challenge 2022</h1>
        <p className='perex'>
          This project aim to visualize the data, 
          collected from 1000 representative residents from Ohio,
          to help the local planning department with revitalization.
          Collected data have many parts, but in this visualization, 
          we will focus mainly on the pattern of life of the participant; 
          more precisely speaking, on their relationship with locals restaurants
          and pubs, and their behavior and interaction with these
          places.
          </p>
      </TextSection>
      <RestaurantSection />
      <PubSection />
    </main>
  )
}

export default App
