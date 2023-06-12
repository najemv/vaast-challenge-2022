export interface TextSectionProps {
  children?: React.ReactNode;
}

const TextSection = ({children}: TextSectionProps) => {

  return (
    <section className="text small">
      {children}
    </section>  
  )
};

export default TextSection;