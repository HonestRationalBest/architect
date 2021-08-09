import { Route, Switch } from "react-router-dom";
import "../src/static/scss/normalize/normalize.css";
import Category from "./pages/Category/Category";
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
      <Route path="/category/:id">
        <Category />
      </Route>
    </Switch>
  );
};

export default App;
