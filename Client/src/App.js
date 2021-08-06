import { Route, Switch } from "react-router-dom";
import Main from "./Main-Content/main";
import "./App.css";
import AllPolicy from "./Main-Content/allPolicy";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/footer";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/allPolicy">
          <AllPolicy />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
