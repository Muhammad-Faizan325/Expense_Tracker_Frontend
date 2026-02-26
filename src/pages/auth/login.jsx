import React, { useState } from 'react';
import AuthLayout from '../../components/Layouts/Authlayout';
import Input from '../../components/Inputs/input';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/helper';
import { loginUser } from "../../redux/thunks/auth.thunk";
import { useDispatch, useSelector } from 'react-redux'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { loading, error: serverError } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Please enter a valid password (min. 8 characters).");
      return;
    }

    
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/dashboard"); 
      })
      .catch((err) => {
   
        console.error("Login failed:", err);
      });
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-full flex flex-col justify-center mx-auto">
        <div className="mb-10">
          <h3 className="text-3xl font-bold text-slate-800">Welcome Back</h3>
          <p className="text-slate-400 mt-2">Please enter your details to log in.</p>
        </div>

        <form onSubmit={handleLogin}>
          <Input 
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input 
            label="Password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

      
          {(error || serverError) && (
            <p className="text-red-500 text-xs pb-2.5 font-medium">
              {error || serverError}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className={`w-full bg-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-purple-200 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"} 
          </button>
        </form>
        
        <p className="text-center text-[14px] text-slate-500 mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-bold hover:underline transition-all">
            Create Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;