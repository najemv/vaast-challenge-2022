import "./InfoText.css";

interface InfoTextProps {
  message: string;
}

const InfoText = ({message}: InfoTextProps) => {
  
  return (
    <div className="infotext--text">
      <span>{message}</span>
    </div>
  )
};

export default InfoText;