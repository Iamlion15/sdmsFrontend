
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
import "assets/vendor/nucleo/css/nucleo.css";



// import Landing from "views/examples/Landing.js";
import Table from "views/examples/usersTable.js";
import UserLogin from "views/examples/UserLogin";
import RABStock from "views/examples/stockRabInfoView";
import Noo from "views/examples/noo";
import StockRequestAgroDealer from "views/examples/stockRequestAgroDealer";
import Addstock from "views/examples/AddStock";
import AgroMyStock from "views/examples/Mystock";
import AdminLogin from "views/examples/AdminLogin";
import FarmerList from "views/examples/FarmersList";
import AgrodealerList from "views/examples/AgroDealerList";
import RABList from "views/examples/RABlist";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      
      <Route path="/rab/charts" exact element={<Noo />} />
      <Route path="/rab/addstock" exact element={<Addstock />} />
      <Route path="/agro/mystock" exact element={<AgroMyStock />} />
      <Route path="//rab/stock" exact element={<RABStock/>}/>
      <Route path="/agro/requestseed" exact element={<StockRequestAgroDealer/>} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/user/login" exact element={<UserLogin/>} />
      <Route path="/admin/farmer" exact element={<FarmerList/>} />
      <Route path="/admin/agro" exact element={<AgrodealerList/>} />
      <Route path="/admin/rab" exact element={<RABList/>} />
      <Route path="/admin/login" exact element={<AdminLogin/>} />
      <Route path="/" exact element={<UserLogin/>}/>
      

    </Routes>
  </BrowserRouter>
);
