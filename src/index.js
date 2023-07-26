/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
import "assets/vendor/nucleo/css/nucleo.css";


import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Table from "views/examples/usersTable.js";
import Login from "views/examples/Login"
import Register from "views/examples/Register.js";
import UpdateUser from "views/examples/UpdateUser";
import PrivilegeTable from "views/examples/privilegeTable ";
import News from "views/examples/news";
import Profile from "views/examples/Profiles";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" exact element={<Index />} /> */}
      <Route path="/landing-page" exact element={<Landing />} />
      <Route path="/login-page" exact element={<Profile />} />
      <Route path="/register-page" exact element={<Register />} />
      <Route path="/users" exact element={<Table />} />
      <Route path="/news" exact element={<News />} />
      <Route path="/privileges" exact element={<PrivilegeTable/>} />
      <Route path="/updateuser/:id" exact element={<UpdateUser/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* <Route path="/" exact element={<Index />} /> */}
      <Route path="/" exact element={<Index/>} />

    </Routes>
  </BrowserRouter>
);
