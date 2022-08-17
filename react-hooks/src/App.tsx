import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

import "./App.css";

function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes pages={pages} />
      </BrowserRouter>
    </div>
  );
}

export default App;
