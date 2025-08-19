import React, { useContext } from "react";
import { 
  nameContext, 
  emailContext, 
  contactContext, 
  addressContext, 
  tablesContext, 
  idContext 
} from "../context/context";

const Home = () => {
  const handleClick = () => {
    console.log(localStorage.getItem("token"));
    localStorage.removeItem("token");
  };

  // consume all contexts
  const name = useContext(nameContext);
  const email = useContext(emailContext);
  const contact = useContext(contactContext);
  const address = useContext(addressContext);
  const tables = useContext(tablesContext);
  const id = useContext(idContext);

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-200 p-6">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-orange-500 shadow-lg rounded-xl mb-6">
        <h1 className="text-3xl font-bold text-white">
          Welcome to {name || "Our Restaurant"}
        </h1>
        <button 
          className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-orange-100 transition"
          onClick={handleClick}
        >
          Log Out
        </button>
      </header>

      {/* Restaurant Details */}
      <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">Restaurant Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-orange-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Owner</p>
            <p className="text-lg font-semibold">{name}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-semibold">{email}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Contact</p>
            <p className="text-lg font-semibold">{contact}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Address</p>
            <p className="text-lg font-semibold">{address}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Total Tables</p>
            <p className="text-lg font-semibold">{tables}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Restaurant ID</p>
            <p className="text-lg font-semibold">{id}</p>
          </div>
        </div>
      </section>

      {/* Body (features section) */}
      <main className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Explore our services:</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <li className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="font-bold text-lg text-orange-600">Menu</h3>
            <p className="text-gray-600 text-sm">Check out our delicious offerings.</p>
          </li>
          <li className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="font-bold text-lg text-orange-600">Book Table</h3>
            <p className="text-gray-600 text-sm">Reserve your favorite spot.</p>
          </li>
          <li className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="font-bold text-lg text-orange-600">Offers</h3>
            <p className="text-gray-600 text-sm">Don’t miss our special deals!</p>
          </li>
          <li className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="font-bold text-lg text-orange-600">Contact Us</h3>
            <p className="text-gray-600 text-sm">We’re here to assist you anytime.</p>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
