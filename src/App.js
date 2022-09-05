import "./App.css";
import { Notes } from "./Notes";
import React, { useState } from "react";
import { Login } from "./login";

export const Context = React.createContext();
function App() {
  const [logged, setLogged] = useState(0);
  return (
    <div className="App">
      <Context.Provider value={[logged, setLogged]}>
        {logged === 0 ? (
          <>
            <Login />
          </>
        ) : (
          <>
            <Notes />
          </>
        )}
      </Context.Provider>
    </div>
  );
}

export default App;
