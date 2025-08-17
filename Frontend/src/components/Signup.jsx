// pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    tables: 0,
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Ensure numeric state for tables
    if (name === "tables") {
      const num = type === "number" ? Number(value) : value;
      setFormData((prev) => ({ ...prev, [name]: isNaN(num) ? 0 : num }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//     if(formData.password.length <8 || formData.password.length>25){
//         setError("Password lenth should be between 8 to 25 characters")
//     }
//   if (formData.password !== formData.confirmPassword) {
//     setError("Passwords do not match");
//     return;
//   }

//   const payload = {
//     name: formData.name.trim(),
//     email: formData.email.trim(),
//     contact: formData.contact.trim(),
//     address: formData.address.trim(),
//     tables: Number(formData.tables),
//     password: formData.password,
//   };

//   try {
//     const res = await fetch("http://localhost:4000/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     let data = null;
//     try {
//       data = await res.json();
//     } catch {
//       // ignore; will fallback to text/status
//     }

//     if (!res.ok) {
//       const msg =
//         (data && (data.message || data.error)) ||
//         (await res.text().catch(() => "")) ||
//         `HTTP ${res.status}`;
//       throw new Error(msg);
//     }

//     if (data && data.success) {
//       alert("Signup Successful");
//       navigate("/login");
//     } else {
//       const msg = (data && (data.message || data.error)) || "Signup failed";
//       throw new Error(msg);
//     }
//   } catch (err) {
//     setError(err?.message || "Request failed");
//   }
// };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Build payload WITHOUT confirmPassword
    const payload = {
      name: formData.name.trim(),
      contact: formData.contact.trim(),
      email: formData.email.trim(),
      tables: Number(formData.tables),
      address: formData.address.trim(),
      password: formData.password,
    };

    try {
      const res = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if(data.success){
        alert("Signup Successful")
        navigate("/login");
      }
      else{
        setError(data.error || data.message)
      }
      
    } catch (err) {
      setError(err?.message || "Request failed");
    }
  };

  const isDisabled =
    !formData.name ||
    !formData.contact ||
    !formData.email ||
    !formData.address ||
    formData.tables === null ||
    formData.tables === undefined ||
    Number.isNaN(Number(formData.tables)) ||
    !formData.password ||
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword;

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center text-success mb-4">Create Account</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contact Number</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Tables</label>
            <input
              type="number"
              name="tables"
              value={formData.tables}
              onChange={handleChange}
              className="form-control"
              required
              min={0}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="btn btn-success w-100 fw-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-muted mt-3">
          Already have an account?{" "}
          <a href="/login" className="fw-semibold text-success text-decoration-none">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
