import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import { HomePage } from "./components/Home/HomePage";
import { LoginPage } from "./components/Account/LogIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NewReleasePage } from "./components/NewRelease/NewRelease";
import { Movies } from "./components/Movies/Movies";
import { TV_Shows } from "./components/TV_Shows/TV_Shows";
import { Streaming } from "./components/Streaming/Streaming";
import { SignUpPage } from "./components/Account/SignUp";
import { TrailersPage } from "./components/Trailers/Trailers";
import { MPage } from "./components/MoviePage/MPage";

function App() {

  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/New_Release" element={<NewReleasePage />} />
                <Route path="/Movies" element={<Movies />} />
                <Route path="/TV_Shows" element={<TV_Shows />} />
                <Route path="/Streaming" element={<Streaming />} />
                <Route path="/Trailers" element={<TrailersPage />} />
                <Route path="/Signup" element={<SignUpPage />} />
                <Route path="/Movie/:id" element={<MPage />} />
            </Routes>
        </Router>
    </div>
  )
}

export default App
