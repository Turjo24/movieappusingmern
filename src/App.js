import React from "react";
import Home from "./Home";
import Singlemovie from "./Singlemovie";
import {  BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
   <>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="movie/:id" element={<Singlemovie />} />
   </Routes>
  </>
  );
};

export default App;