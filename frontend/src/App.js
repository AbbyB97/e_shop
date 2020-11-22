import React from "react";
import { Container } from "react-bootstrap";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen'
const App = () => {
  return (
    
    <Router>
      <Header />
      <main>
        <Container className="py-3">
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />

          <Route path='/product/:id' component={ProductScreen} />
            {/* to make cart id as optional add ? */}
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/search/:keyword' component={HomeScreen} />
          <Route path='/' exact component={HomeScreen} />
        
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
