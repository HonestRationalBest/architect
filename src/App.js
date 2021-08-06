import { Route, Switch } from "react-router-dom";
import "../src/static/scss/normalize/normalize.css";
import Home from "./pages/Home/Home";
import Slider from "./pages/Slider/Slider";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/works/:id">
        <Slider />
      </Route>
    </Switch>
  );
};

export default App;
