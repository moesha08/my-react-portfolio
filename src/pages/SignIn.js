import { useState } from "react";
import { login } from "../api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);     // CALL API

      // 🔥 Must use res.data.token, not res.token
      localStorage.setItem("portfolio_token", res.data.token);

      alert("Login Successful 🎉");
      window.location.href = "/admin";  // redirect
    } catch (err) {
      alert("Invalid login details");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
