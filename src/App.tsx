
import { BrowserRouter } from "react-router-dom";
import { Card } from "./entities/card";
import Game from "./pages/Game";
import  Router from "./Router";

const App = () => {
  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  )
}

export default App
