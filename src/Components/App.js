import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Context from "../Context/Context";

import Header from "./shared/Header.js"

import Home from "../Components/pages/Home.js"
import SignIn from "../Components/pages/SignIn.js"
import SingUp from "../Components/pages/SignUp.js"
import List from "../Components/pages/List.js"
import NewEntry from "../Components/pages/NewEntry.js"
import ShowItem from "../Components/pages/ShowItem.js"
import NewEntryInfo from "./pages/NewEntryInfo";

export default function App() {
  const [token, setToken] = React.useState("");

  return (
    <>
      <Context.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SingUp />} />
            <Route path="/list/:type" element={<List />} />
            <Route path="/show-item/:type/:id" element={<ShowItem />} />
            <Route path="/new-entry" element={<NewEntry />} />
            <Route path="/new-entry-info/:type" element={<NewEntryInfo />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}