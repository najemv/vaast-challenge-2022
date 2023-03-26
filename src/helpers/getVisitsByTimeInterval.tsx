import { DateTimeFilterChangeEvent } from "../components/DateTimeFilter/DateTimeFilter";
import { TRAVELS } from "../data/data";


export const getVisitsByTimeInterval = (visitsIds: number[], params: DateTimeFilterChangeEvent) => {
  const dateFrom = new Date(params.dateSpan.dateFrom);
  const dateTo = new Date(params.dateSpan.dateTo);

  return visitsIds.filter(i => {
    // mid travel time
    const travel = TRAVELS[i];
    const date = new Date(new Date(travel.travelStartTime).getTime() + (travel.travelDuration / 2) * 60000);
    const hour = date.getHours();

    if (params.filterByTime && (hour < params.timeSpan.hoursFrom || hour >= params.timeSpan.hoursTo)) {
      return false;
    }

    if (params.filterByDate && (date < dateFrom || date >= dateTo)) {
      return false;
    }

    return true;
  });
};