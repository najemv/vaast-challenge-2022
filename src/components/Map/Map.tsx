import { createContext, useEffect, useRef, useState } from "react";
import cityMap from "/city_map.png";
import "./Map.css";

export const mapDimensionContext = createContext<{
  width: number;
  height: number;
}>({
  width: 0,
  height: 0
});

const aspectRatio = 1076 / 1144;

interface MapProps {
  children?: React.ReactNode;
}


const Map = ({children}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(500);
  const height = width / aspectRatio;

  useEffect(() => {
    function handleResize() {
      setWidth(mapRef?.current?.parentElement?.clientWidth ?? 500);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);


  return (
    <mapDimensionContext.Provider value={{
      width: width,
      height: height
    }} >
      <div ref={mapRef}>
        <svg width={width} height={height} className="map">
          <image
            width={width} height={height}
            href={cityMap}
          /> 
          {children}
        </svg>
      </div>
    </mapDimensionContext.Provider>
  );
};

export default Map;