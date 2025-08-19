import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Setup from "./Setup";
import { signupContext } from "../../context/context";

const SignupFlow = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    tables: "",
  });

  return (
    <signupContext.Provider value={{ signup, setSignup }}>
      <Routes>
        <Route path="/" element={<Signup />} />         {/* /signup */}
        <Route path="/setup" element={<Setup />} />     {/* /signup/setup */}
      </Routes>
    </signupContext.Provider>
  );
};

export default SignupFlow;
