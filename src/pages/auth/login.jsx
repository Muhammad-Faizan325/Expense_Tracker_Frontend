import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import AuthLayout from '../../components/Layouts/Authlayout';
import Input from '../../components/Inputs/input'; // Changed back to your original 'Input'
import { validateEmail, validatePassword } from '../../utils/helper';
import { loginUser } from "../../redux/thunks/auth.thunk";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Keep these separate like your original code so the Input components connect easily
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      {/* Centering Wrapper */}
      <div className="min-h-screen w-full flex items-center justify-center p-6">

        <div className="w-full max-w-[440px] bg-white p-10 rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100">

          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4 rotate-3 shadow-xl shadow-emerald-200">
              <span className="text-white text-2xl font-black">V</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Vantage</h3>
            <p className="text-slate-400 mt-2 font-medium">Your Personal Wealth Tracker</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl">
                <p className="text-rose-500 text-xs font-bold text-center">
                  {error || serverError}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-bold py-4 rounded-2xl transition-all shadow-lg transform active:scale-[0.98] ${loading
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                }`}
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-10">
            Don't have an account?{" "}
            <Link to="/signup" className="text-emerald-600 font-extrabold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;