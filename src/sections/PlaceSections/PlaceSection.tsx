import { useContext, useEffect, useState } from "react";
import { objectContext } from "../../App";
import DateTimeFilter, { DateTimeFilterChangeEvent, defaultDateTimeFilterSettings } from "../../components/Input/Datetime/DateTimeFilter";
import TravelMap from "../../components/Map/TravelMap";
import { getVisitsByTimeInterval } from "../../helpers/getVisitsByTimeInterval";
import PlaceDetail from "./PlaceDetail";
import "./PlaceSection.css";
import HelpText from "../TextSection/HelpText";



const PlaceSection = () => {
  const {objects, objectType} = useContext(objectContext);
  const [data, setData] = useState<number[][][]>([[[0]]]);

  useEffect(() => {
    setData(objects.map(res => getVisitsByTimeInterval(res.visits, defaultDateTimeFilterSettings)));
    console.log("prop init")
  }, []);

  const onFilterChange = (e: DateTimeFilterChangeEvent) => {
    const filteredData = objects.map(res => getVisitsByTimeInterval(res.visits, e));
    setData(filteredData);
  }

  return (
    <div>
      <section className="small">
        <DateTimeFilter onChange={onFilterChange} />
        <HelpText text={`(You can filter data by specific time interval)`}/>
      </section>
      <section className="section--split">
        <div>
          <TravelMap travels={data} />
          <HelpText text={`(You can click the cirle to show detailed info about ${objectType})`}/>
        </div>
        <PlaceDetail data={data} />
      </section>
    </div>
    
  );
};

export default PlaceSection;