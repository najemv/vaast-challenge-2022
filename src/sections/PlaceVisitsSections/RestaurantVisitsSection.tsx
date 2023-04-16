import { createContext, useEffect, useState } from "react";
import DateTimeFilter, { DateTimeFilterChangeEvent, defaultDateTimeFilterSettings } from "../../components/Input/DateTimeFilter";
import TravelMap from "../../components/Map/TravelMap";
import { RESTAURANTS } from "../../data/data";
import { getVisitsByTimeInterval } from "../../helpers/getVisitsByTimeInterval";
import SwitchableGraph from "../../components/Graphs/SwitchableGraph";
import PlaceDetail from "./PlaceDetail";

export const visitSectionContext = createContext({
  selectedObjectIndex: -1,
  setSelectedObjectIndex: (index: number) => {}
});


const RestaurantVisitsSection = () => {
  const [data, setData] = useState<number[][][]>([[[0]]]);

  const [selectedObjectIndex, setSelectedObjectIndex] = useState(-1);

  useEffect(() => {
    setData(RESTAURANTS.map(res => getVisitsByTimeInterval(res.visits, defaultDateTimeFilterSettings)));
    console.log("prop init")
  }, []);

  const onFilterChange = (e: DateTimeFilterChangeEvent) => {
    const filteredData = RESTAURANTS.map(res => getVisitsByTimeInterval(res.visits, e));
    setData(filteredData);
  }

  const onSelectedObjectChange = (index: number) => {
    console.log("object clicked")
    if (index !== selectedObjectIndex) {
      setSelectedObjectIndex(index);
    }
    else {
      setSelectedObjectIndex(-1);
    }
  }
  console.log("section rendered", data)
  return (
    <section>
      <visitSectionContext.Provider value={{
        selectedObjectIndex,
        setSelectedObjectIndex: onSelectedObjectChange
      }}>
        <DateTimeFilter onChange={onFilterChange} />
        <TravelMap objects={RESTAURANTS} travels={data} />
        <PlaceDetail data={data} />
      </visitSectionContext.Provider>
    </section>
  );
};

export default RestaurantVisitsSection;