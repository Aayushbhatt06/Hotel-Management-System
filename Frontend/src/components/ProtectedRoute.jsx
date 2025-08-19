import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { 
  nameContext,
  emailContext,
  contactContext,
  addressContext,
  tablesContext,
  idContext 
} from "../context/context";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // states for all contexts
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [address, setAddress] = useState(null);
  const [tables, setTables] = useState(null);
  const [_id, setId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      if (!token) {
        if (!cancelled) {
          setAuthenticated(false);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/auth/check", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (cancelled) return;

        if (data?.success) {
          setAuthenticated(true);
          setName(data.data.name || "Guest");
          setEmail(data.data.email || "Guest");
          setContact(data.data.contact || "Guest");
          setAddress(data.data.address || "Guest");
          setTables(data.data.tables || "Guest");
          setId(data.data._id || "Guest");
        } else {
          setAuthenticated(false);
          setName(null);
          setEmail(null);
          setContact(null);
          setAddress(null);
          setTables(null);
          setId(null);
        }
      } catch (err) {
        if (!cancelled) {
          setAuthenticated(false);
          setName(null);
          setEmail(null);
          setContact(null);
          setAddress(null);
          setTables(null);
          setId(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    verify();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" replace />;

  return (
    <nameContext.Provider value={name}>
      <emailContext.Provider value={email}>
        <contactContext.Provider value={contact}>
          <addressContext.Provider value={address}>
            <tablesContext.Provider value={tables}>
              <idContext.Provider value={_id}>
                {children}
              </idContext.Provider>
            </tablesContext.Provider>
          </addressContext.Provider>
        </contactContext.Provider>
      </emailContext.Provider>
    </nameContext.Provider>
  );
}
