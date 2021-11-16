import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useSalty, useSaltyRead, useSaltyWrite } from '../.';

/**
 * Component to show the sum of some numbers
*/
function A(){
  // Get values and the setter for the 'test' scope
  const[{x, y, z}, set] = useSalty('test');

    // Set some initial values on mount
  React.useEffect(() => {
    set({
      x: 6,
      y: 15,
      z: 98
    });
  }, []);

  // Render the sum
  return (
    <div>{x} + {y} + {z} = {x+y+z}</div>
  );
}


/**
 * Component with buttons to increment values
 */
function B(){
  // Get the values and the setter for the 'test' scope using helper hooks
  const {x, y, z} = useSaltyRead('test');
  const set = useSaltyWrite('test');

  // Render some buttons that increment x, y, and z by 1, 2, and 3
  return (
    <>
      <button onClick={() =>set({x: x+1})}>X</button>
      <button onClick={() =>set({y: y+2})}>Y</button>
      <button onClick={() =>set({z: z+3})}>Z</button>
    </>
  )
  
}

/**
 * Render A and B
 */
const App = () => {
  // Get values for a scope named 'other'
  const {x, y, z} = useSaltyRead('other');

  // Render A and B, 
  return (
    <>
      <A/>
      <B/>
      <div>In the 'other' scope, x={x || "null"}, y={y || "null"}, and z={z || "null"}</div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
