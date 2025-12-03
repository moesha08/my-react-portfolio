import { useState } from "react";
import { signup } from "../api";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup({
        firstname: firstName,   // must match backend field name
        lastname: lastName,     // must match backend field name
        email,
        password,
      });

      alert("Account created successfully!");
      window.location.href = "/login";

    } catch (err) {
      console.log("SIGNUP ERROR →", err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} />
        <input placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
