import { useState } from "react";
import DateTimeFilter, { DateTimeFilterChangeEvent, defaultDateTimeFilterSettings } from "../../components/DateTimeFilter/DateTimeFilter";
import TravelMap from "../../components/Map/TravelMap";
import { RESTAURANTS } from "../../data/data";
import { getTravelsByTimeInterval } from "../../helpers/getTravelsByTimeInterval";

const RestaurantVisitsSection = () => {
  const [data, setData] = useState(RESTAURANTS.map(res => getTravelsByTimeInterval(res.travels, defaultDateTimeFilterSettings)));
  const x = RESTAURANTS.map(r => r.location.x);
  console.log(RESTAURANTS);
  console.log(Math.min(...x), Math.max(...x))
  const onFilterChange = (e: DateTimeFilterChangeEvent) => {
    console.log(e);
    setData(RESTAURANTS.map(res => getTravelsByTimeInterval(res.travels, e)));
  }

  return (
    <section>
      <DateTimeFilter onChange={onFilterChange} />
      <TravelMap objects={RESTAURANTS} travels={data} />

    </section>
  );
};

export default RestaurantVisitsSection;