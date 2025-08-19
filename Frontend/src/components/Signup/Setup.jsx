import React, { useContext } from "react";
import { Phone, Home, Table } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signupContext } from "../../context/context";

const Setup = () => {
  const { signup, setSignup } = useContext(signupContext);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signup.contact || !signup.address || !signup.tables) {
      alert("All fields required.");
      return;
    }

    console.log("Final signup data ready:", signup);
    try{
        const res = await fetch('http://localhost:4000/auth/signup',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(signup)
        })
        const data = await res.json()
        if(!data.success){
            alert(data.message)
        }else{
            alert("Signup Successful")
        navigate('/login')
        }
        
    }catch(err){

    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-96 border border-orange-200">

        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-red-500 to-orange-500 text-white text-2xl font-bold rounded-full shadow-md">
            🍽️
          </div>
          <h3 className="text-3xl font-extrabold text-gray-800 mt-4">Setup Restaurant</h3>
          <p className="text-gray-500 text-sm">Add extra restaurant details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-gray-700 font-medium mb-1">
              Contact Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Enter contact number"
                value={signup.contact}
                onChange={handleOnChange}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter restaurant address"
                value={signup.address}
                onChange={handleOnChange}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Tables */}
          <div>
            <label htmlFor="tables" className="block text-gray-700 font-medium mb-1">
              Number of Tables
            </label>
            <div className="relative">
              <Table className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="number"
                id="tables"
                name="tables"
                placeholder="Enter number of tables"
                value={signup.tables}
                onChange={handleOnChange}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2.5 rounded-lg font-semibold shadow-md"
          >
            Complete Setup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setup;
