import { TRAVELS } from "../data/data";

export const averageMoneySpend = (travelsIds: number[]) => {
  if (travelsIds.length == 0) {
    return 0;
  }
  const travels = travelsIds.map(travelId => TRAVELS[travelId]);
  let totalSpend = 0;
  travels.forEach(travel =>  {
    if (travel.moneySpend > 0) {
      totalSpend += travel.moneySpend;
    }
  });
  
  totalSpend /= travels.length;
  return totalSpend;
};