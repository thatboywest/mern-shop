import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Items from "./pages/Items";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Out from "./pages/Out";
import Create from "./pages/Create";

import Admin from "./pages/Admin";
import { CartProvider } from "./context/Cart_context";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import CheckoutSucces from "./components/CheckoutSucces";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Items />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout-succes" element={<CheckoutSucces />} />
              <Route path="/Create" element={<Create />} />
              <Route path="/login" element={<Login />} />
              <Route path="/payment" element={<Out />} />

              <Route path="/Admin" element={<Admin />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
