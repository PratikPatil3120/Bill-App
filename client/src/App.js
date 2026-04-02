// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import InvoiceList from "./components/InvoiceList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<InvoiceList />} />
      </Routes>
    </Router>
  );
}

export default App;
