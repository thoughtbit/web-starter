import { useState, createContext } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }: any) {
  const [global, setGlobal] = useState(false);

  function handleClick() {
    setGlobal((global) => !global);
    console.log('This is an example function that interacts with the global state variable global');
  };

  const value = {
    global,
    handleClick
  };

  return (
    <GlobalContext.Provider value={value}>
       {children}
    </GlobalContext.Provider>
    );
};

export default GlobalProvider;
export { GlobalContext };

// import React, { useContext } from "react";
// import { GlobalContext } from '../context/global';

// function Item() {
//   const { global, handleClick } = useContext(GlobalContext);  

//   return (
//     <div>
//       {global ? <h2>the global state variable is true</h2> 
//          : <h2>the global state variable is false</h2>}
//       <button onClick={handleClick}>Change the value of 
//          global</button>
//     </div>
//   );
// };

// export default Item;