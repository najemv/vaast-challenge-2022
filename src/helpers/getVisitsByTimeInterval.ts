import { DateTimeFilterChangeEvent } from "../components/Input/Datetime/DateTimeFilter";
import { TRAVELS } from "../data/data";


export const getVisitsByTimeInterval = (visitsIds: number[][], params: DateTimeFilterChangeEvent) => {
  const dateFrom = new Date(params.dateSpan.dateFrom);
  const dateTo = new Date(params.dateSpan.dateTo);
  return visitsIds.map(visitsForPlace => {
    return visitsForPlace.filter(id => {
      // mid travel time
      const travel = TRAVELS[id];
      const date = new Date(new Date(travel.travelStartTime).getTime() + (travel.travelDuration / 2) * 60000);
      
      const hour = date.getHours();

      //if (id < 20) {
      //  console.log(date, hour, params, travel.travelStartTime);
      //  console.log(hour < params.timeSpan.hoursFrom || hour >= params.timeSpan.hoursTo);
      //  console.log(date < dateFrom || date >= dateTo)
      //}

      if (params.filterByTime && (hour < params.timeSpan.hoursFrom || hour >= params.timeSpan.hoursTo)) {
        return false;
      }

      if (params.filterByDate && (date < dateFrom || date >= dateTo)) {
        return false;
      }

      return true;
    })
  }).filter(visitsForPlace => visitsForPlace.length > 0);
};