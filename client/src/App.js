import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import PageNotFound from "./components/PageNotFound";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className="px-0 py-2">
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route component={PageNotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
