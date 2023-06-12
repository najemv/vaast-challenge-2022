import { useState } from "react";
import Dropdown from "../../components/Input/Dropdown/Dropdown";
import BuildingMap from "../../components/Map/BuildingMap";
import "./BuildingSection.css";
import BuildingDetail from "./BuildingDetail";

export type BuildingMapType = "Distance" | "Visits";

const BuildingSection = () => {
  const [type, setType] = useState("Distance");

  return (
    <div>
      <section className="small">
        <Dropdown label="Select building coloring:" items={["Distance", "Visits"]} onChange={setType} selected="Distance"/>
      </section>
      <section className="section--split">
        <div>
          <BuildingMap type={type as BuildingMapType}/>
        </div>
        <BuildingDetail />
      </section>
    </div>
  );
};

export default BuildingSection;