import { useContext } from "react";
import { objectContext } from "../App";
import colormap from "colormap";

export const getColorMap = () => {
  const { objects } = useContext(objectContext);
  let map = colormap({
    colormap: 'jet',
    nshades: objects.length,
    format: 'hex',
    alpha: 1
  });
  
  return shuffle(map, 666) as string[];
};

function shuffle(array: any, seed: any) {                // <-- ADDED ARGUMENT
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(random(seed) * m--);        // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed                                     // <-- ADDED LINE
  }

  return array;
}

function random(seed: any) {
  var x = Math.sin(seed++) * 10000; 
  return x - Math.floor(x);
}