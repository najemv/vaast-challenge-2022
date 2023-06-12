import { useEffect, useRef, useState } from "react";

export interface MapLegendItem {
  icon: JSX.Element;
  text: string;
}


export interface MapLegendProps {
  rightOffset: number;
  headline: string;
  textYOffset: number;
  textXOffset: number;
  items: MapLegendItem[];
}

const MapLegend = ({headline, rightOffset, items, textXOffset, textYOffset}: MapLegendProps) => {
  const [xOffset, setXOffset] = useState(0);
  const legendRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    function handleResize() {
      var offset = legendRef?.current?.parentElement?.clientWidth ?? 500;
      setXOffset(offset - rightOffset);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  const elements: JSX.Element[] = [];

  items.forEach((item, i) => {
    elements.push(<g key={i} transform={`translate(0, ${20 + 20 * (i + 1)})`} >
      {item.icon}
      <text x={textXOffset} y={textYOffset}>{item.text}</text>
    </g>);
  });

  return (
    <svg x={xOffset} y={20} ref={legendRef}>
      <text y={20}>{headline}</text>
      {elements}
    </svg>
  );
};

export default MapLegend;