import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import { HomePage } from "./components/Home/HomePage";
import { LoginPage } from "./components/Account/Account";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const preference = window.matchMedia("prefers-color-scheme: dark)").matches;

  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Account" element={<LoginPage />} />
            </Routes>
        </Router>
    </div>
  )
}

export default App
