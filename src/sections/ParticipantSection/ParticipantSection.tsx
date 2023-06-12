import { useContext, useEffect, useState } from "react";
import { objectContext } from "../../App";
import { PARTICIPANTS } from "../../data/data";
import Dropdown from "../../components/Input/Dropdown/Dropdown";
import { getParticipantInfo } from "../../helpers/participantHelper";
import ParticipantGraph, { ParticipantGraphItem } from "../../components/Graphs/ParticipantGraph";

const ParticipantSection = () => {
  const {selectedParticipantId, setSelectedParticipantId, objectType} = useContext(objectContext);
  const [data, setData] = useState<ParticipantGraphItem[]>([]);
  const ids = PARTICIPANTS.map(p => p.participantId.toString());

  useEffect(() => {
    setData(PARTICIPANTS.map(p => getParticipantInfo(p, objectType)));
  }, []);

  const onParticipantChange = (participantId: string) => {
    const id = Number(participantId);
    setSelectedParticipantId(id);
  };
  console.log(objectType, data);
  return (
    <section className="medium">
      <Dropdown label="Select a participant:" items={ids} onChange={onParticipantChange} />
      <ParticipantGraph items={data} />
    </section>
  )

};

export default ParticipantSection;