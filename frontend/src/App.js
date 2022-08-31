import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Header from "./components/layout/header.js"
import Footer from './components/layout/footer';
import WebFont from "webfontloader";
import Home from './components/Home/home.js';
import ProductDetails from './components/Product/Product'
import AllProducts from './components/Products/AllProducts';
import Search from './components/Products/search';
import LoginSignup from './components/User/LoginSignup';
import Store from './store'
import { loadUser } from './action/userAction'
import { useSelector } from 'react-redux';
import Useroption from './components/layout/useroption'
import Account from './components/User/profile'
import UpdateProfile from './components/User/UpdateProfile'
import PasswordUpdate from './components/User/PasswordUpdate';
import ForgetPassword from './components/User/ForgetPassword'
import ResetPassword from './components/User/ResetPassword'
import Cart from './components/Cart/cart'
import Shipping from './components/Cart/Shippinginfo'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import Payment from './components/Cart/Elements'
import axios from 'axios';
// import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/Cart/orderSuccess'
import MyOrders from './components/order/MyOrder'
import OrderDetails from './components/order/OrderDetails'
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/productList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/updateProduct'
import OrderList from './components/admin/OrderList'
import UserList from './components/admin/Userlist'
import ProcessOrder from './components/admin/processOrder'
import UpdateUser from './components/admin/UpdateUser'
import ReviewsList from './components/admin/ReviewsList'
import NotFound from './components/NotFound/NotFound'
import About from './components/About/About';
import Contact from './components/Contact/Contact';

function App() {

  const { isAuthentication, user, loading } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = React.useState("")

  async function getStripeApiKey() {
 
    const { data } = await axios.get('/api/v1/stripeapikey')
   
    setStripeApiKey(data.stripeApiKey)
    
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    Store.dispatch(loadUser())
    getStripeApiKey()
   
  }, []);

  return (

    <Router>

      <Header />

      {isAuthentication && <Useroption user={user} />}
      <Routes>

        <Route extact path="/" element={<Home />} />
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={< AllProducts />} />
        <Route path="/products/:keyword" element={< AllProducts />} />
        <Route path="/search" element={< Search />} />
        <Route path="/login" element={<LoginSignup />} />
        { loading === false && (isAuthentication && <Route path="/account" element={<Account />} />)}
        { loading === false && ( isAuthentication === false &&<Route path="/account" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/me/update" element={<UpdateProfile />} />)}
        { loading === false && ( isAuthentication === false &&<Route path="/me/update" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/password/update" element={<PasswordUpdate />} />)}
        { loading === false && ( isAuthentication === false &&<Route path="/password/update" element={<Navigate to="/login" />} />)}
        <Route path="/password/forgot" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/Cart" element={<Cart />} />
        { loading === false && (isAuthentication && <Route path="/login/shipping" element={<Shipping />} />)}
        { loading === false && ( isAuthentication === false &&<Route path="/login/shipping" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/order/confirm" element={<ConfirmOrder />} />)}
        { loading === false && ( isAuthentication === false &&<Route path="/order/confirm" element={<Navigate to="/login" />} />)}
        {/* {isAuthentication && <Route path="/process/payment" element={ <Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>} />} */}
        { loading === false && (isAuthentication && <Route path="/process/payment" element={ <Payment  stripe={  loadStripe(stripeApiKey)  }  /> }  />   ) }
        { loading === false && ( isAuthentication === false &&<Route path="/process/payment" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/success" element={ <OrderSuccess/> } />) }
        { loading === false && ( isAuthentication === false && <Route path="/success" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/orders" element={ <MyOrders/> } />) }
        { loading === false && ( isAuthentication === false && <Route path="/orders" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/order/:id" element={ <OrderDetails/> } />) }
        { loading === false && ( isAuthentication === false && <Route path="/order/:id" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication &&<Route path="/admin/dashboard" element={ <Dashboard user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/dashboard" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/products" element={ <ProductList user={user} loading={loading} />} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/products" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/Create" element={ <NewProduct user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/Create" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/product/:id" element={ <UpdateProduct user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/product/:id" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/orders" element={ <OrderList user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/orders" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/users" element={ <UserList user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/users" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/order/:id" element={ <ProcessOrder user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/order/:id" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/user/:id" element={ <UpdateUser user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/user/:id" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/reviews" element={ <ReviewsList user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/reviews" element={<Navigate to="/login" />} />)}
        <Route path='*' element={<NotFound />} />
        <Route path='contact' element={<Contact />} />
        <Route path='about' element={<About />} />

      </Routes>
      <Footer />

    </Router>

  );
}

export default App;
