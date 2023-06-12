import { useState } from "react";
import { objectContext } from "../App";
import { RESTAURANTS } from "../data/data";
import BuildingSection from "./BuildingSection/BuildingSection";
import PlaceSection from "./PlaceSections/PlaceSection";
import ParticipantSection from "./ParticipantSection/ParticipantSection";
import TextSection from "./TextSection/TextSection";
import "./Section.css";


const RestaurantSection = () => {
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
      objectType: "Restaurant",
      objects: RESTAURANTS,
      selectedPlaceId,
      setSelectedPlaceId: setPlace,
      selectedBuildingId,
      setSelectedBuildingId : setBuilding,
      selectedParticipantId,
      setSelectedParticipantId: setParticipant
    }}>
      <TextSection>
        <h2>Restaurants</h2>
        <h3>Restaurant's perspective</h3>
        <p>
          The following map shows the behavior of local residents towards restaurants.
          The lines represent the paths of the residents from the buildings to the individual restaurants.
          The thicknesses indicate the frequency of the given paths.
        </p>
        <p>
          From the map, we can read that when it comes to restaurants, local residents do not bother to travel long distances for food.
          Most of them choose the closest of them. In the vast majority of restaurants, customers spend around $4 and stay around 20 minutes.
          In connection with another fact - the most frequent time of visits around 13-15h, it is obvious that people go to restaurants for lunch,
          mostly from work, so they don't stay very long.
        </p>
        <p>
          Therefore, it is important that the restaurants are evenly distributed around the city,
          which is not the case - note that the lower left part of the city does not contain any restaurants, 
          so people are forced to travel further or cook their own food.
        </p>
        <p>
          You can view the detail of the restaurant by clicking on one of them (circle), or filter the trips by date to view time trends. Try it!
        </p>
      </TextSection>
      <PlaceSection />
      <TextSection>
        <h3>Restaurant - Building relationship</h3>
        <p>
          2 things can be seen in this section:
          <ol>
            <li>
              The distance of buildings from the nearest restaurant. Since people usually go to restaurants during working hours, 
              it is important for them that the visit is quick and they can quickly get back to work. Which can be a problem in 
              the lower left or upper right part of the city - there is no restaurant nearby and people have to travel far 
              or cook their own food, which is not good for the economy.
            </li>
            <li>
              The most visited restaurant for the given building. For the most part, it corresponds to the nearest of them.
            </li>
          </ol>
        </p>
        <p>
          When you click on a building (if data is available for it), a graph will appear on the right side 
          of the screen showing the popularity of restaurants based on distance and price. Unfortunately, since most people 
          visit only one restaurant, in most cases only one of them is displayed. If there are already several restaurants 
          near the building, most people prefer the cheaper one, even if it is a little further away.
        </p>
      </TextSection>
      <BuildingSection />
      <TextSection>
        <h3>Restaurant - Particinant relationship</h3>
        <p>
          The last part shows the state of residents in relation to restaurants. Above all, it is good to notice that most customers 
          only go to one restaurant and do not change them much (place loyalty column). Furthermore, the relationship between 
          income vs spendings is interesting - people with a higher income tend to spend less in restaurants 
          than people with a lower income.
        </p>
      </TextSection>
      <ParticipantSection />
    </objectContext.Provider>
  )
};

export default RestaurantSection;