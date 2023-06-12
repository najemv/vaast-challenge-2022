
interface HelpTextProps {
  text: string;
}

const HelpText = ({text}: HelpTextProps) => {
  return (
    <p className="helptext">{text}</p>
  )
};

export default HelpText;