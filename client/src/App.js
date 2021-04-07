import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import PageNotFound from "./components/PageNotFound";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./Route/PrivateRoute";
import PrivateRouteInside from "./Route/PrivateRouteInside";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import Checkout from "./screens/Checkout";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
function App() {
  // const state = store.getState();
  // const { authUser } = useSelector((state) => state);
  // console.log("state", state);
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main>
          <Container className="px-0 py-2">
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/product/:id" component={ProductScreen} />
              <Route exact path="/cart/:id?" component={CartScreen} />
              {/* id? --> means it is optional. */}
              <PrivateRouteInside exact path="/login" component={LoginScreen} />
              {/* /** OR (no nedd to make a separate PrivateRoute.js file) */}
              {/* <Route exact path="/register">
                  {state.authUser.user.token ? (
                    <Redirect to="/" />
                  ) : (
                    <RegisterScreen />
                  )}
                </Route> */}
              <Route exact path="/register">
                <RegisterScreen />
              </Route>
              <PrivateRoute exact path="/profile" component={ProfileScreen} />

              <PrivateRoute exact path="/shipping" component={ShippingScreen} />
              {/* OR */}
              {/* /** With this way of using Route, you cannot access props such as history, params etc.
                        You have to use hooks i.e useHistory, useParams etc. to consume those props. */}
              {/* <Route exact path="/shipping">
                {state.authUser.user.token ? (
                  <ShippingScreen />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route> */}
              <PrivateRoute exact path="/payment" component={PaymentScreen} />
              {/* <PaymentScreen />
              </PrivateRoute> */}
              <PrivateRoute
                exact
                path="/placeOrder"
                component={PlaceOrderScreen}
              />
              <PrivateRoute exact path="/order/:id" component={OrderScreen} />
              {/* <PlaceOrderScreen />
              </PrivateRoute> */}
              {/* <Route exact path="/checkout" component={Checkout} /> */}
              <Route component={PageNotFound} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
