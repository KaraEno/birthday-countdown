import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
