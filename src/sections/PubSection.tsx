import { useState } from "react";
import { objectContext } from "../App";
import { PUBS } from "../data/data";
import BuildingSection from "./BuildingSection/BuildingSection";
import PlaceSection from "./PlaceSections/PlaceSection";
import ParticipantSection from "./ParticipantSection/ParticipantSection";
import "./Section.css";
import TextSection from "./TextSection/TextSection";

const PubSection = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState(-1);
  const [selectedBuildingId, setSelectedBuildingId] = useState(-1);
  const [selectedParticipantId, setSelectedParticipantId] = useState(-1);

  const setPlace = (val: number) => {
    if (val === selectedPlaceId) {
      setSelectedPlaceId(-1);
    } else {
      setSelectedPlaceId(val);
    }
  }

  const setBuilding = (val: number) => {
    if (val === selectedBuildingId) {
      setSelectedBuildingId(-1);
    } else {
      setSelectedBuildingId(val);
    }
  }

  const setParticipant = (val: number) => {
    if (val === selectedBuildingId) {
      setSelectedParticipantId(-1);
    } else {
      setSelectedParticipantId(val);
    }
  }

  return (
    <objectContext.Provider value={{
      objectType: "Pub",
      objects: PUBS,
      selectedPlaceId,
      setSelectedPlaceId: setPlace,
      selectedBuildingId,
      setSelectedBuildingId : setBuilding,
      selectedParticipantId,
      setSelectedParticipantId: setParticipant
    }}>
      <TextSection>
        <h2>Pubs</h2>
        <h3>Pub's perspective</h3>
        <p>
          The following map shows the behavior of local residents towards pubs. The lines represent the paths of residents 
          from buildings to individual pubs. The thicknesses indicate the frequency of the given paths.
        </p>
        <p>
          From the map, we can read that when it comes to pubs, local residents travel longer distances. 
          It is no surprise that the most frequented time of visits is in the evening hours. Customers are willing to 
          spend much more and spend longer in the establishment. That's why location is not as important as service 
          in pubs - people are willing to spend more money for premium services.
        </p>
        <p>
          In terms of layout, they are laid out a bit better than pubs, although there is room for improvement here too. 
          However, unlike pubs, this is not so crucial, as people are willing to travel even 
          longer distances, e.g. to meet acquaintances and friends.
        </p>
        <p>
          You can view the detail of the restaurant by clicking on one of them (circle), or filter the trips by date to view time trends. Try it!
        </p>
      </TextSection>
      <PlaceSection />
      <TextSection>
        <h3>Pub - Building relationship</h3>
        <p>
          In this section, 2 views can be seen, as in the case of restaurants:
          <ol>
            <li>
              The distance of buildings from the nearest pub. The people in the bottom left of the map have 
              no pub nearby. On the contrary, roughly in the middle of the map you can see a cluster of 
              3 pubs that have to fight for customers.
            </li>
            <li>
              The most visited pubs for the given building. Here the situation is already more diverse than in the case of restaurants.
            </li>
          </ol>
        </p>
        <p>
          When you click on a building (if data is available for it), a graph will appear on the right side 
          of the screen showing the popularity of pubs based on distance and price. Here, the situation is the 
          opposite to that of restaurants - even higher prices or greater distance will not deter people from visiting it.
        </p>
      </TextSection>
      <BuildingSection />
      <TextSection>
        <h3>Pub - Particinant relationship</h3>
        <p>
          The last part shows the state of the population in relation to the pubs. Again, it can be seen that people with less income 
          tend to spend more money in the pub. However, loyalty remained the same as in the case of restaurants. 
          You can also notice the "^" shape in the lower right part of the graph - some people don't go to pubs at all.
        </p>
      </TextSection>
      <ParticipantSection />
    </objectContext.Provider>
  )
};

export default PubSection;