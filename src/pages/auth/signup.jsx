import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Component & Utility Imports
import AuthLayout from "../../components/Layouts/Authlayout";
import Input from "../../components/Inputs/input";
import ProfilePhotoselector from "../../components/ProfilePhotoselector/ProfilePhotoselector";
import { validateEmail, validatePassword } from "../../utils/helper";
import { signupUser } from "../../redux/thunks/auth.thunk";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: serverError } = useSelector((state) => state.auth);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Please enter a valid password (min. 8 characters).");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) formData.append("profileImage", profilePic);

    const resultAction = await dispatch(signupUser(formData));
    if (signupUser.fulfilled.match(resultAction)) navigate("/login");
  };

  return (
    <AuthLayout>
      {/* Centering Wrapper to match Login */}
      <div className="min-h-screen w-full flex items-center justify-center p-6">

        <div className="w-full max-w-[480px] bg-white p-8 md:p-10 rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100">

          {/* Header & Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center mb-3 rotate-3 shadow-lg shadow-emerald-200">
              <span className="text-white text-xl font-black">V</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Create Account</h3>
            <p className="text-slate-400 mt-1 text-sm font-medium text-center">
              Join Vantage and start tracking your wealth
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">

            {/* Centered Profile Selector */}
            <div className="flex flex-col items-center mb-2">
              <ProfilePhotoselector image={profilePic} setImage={setProfilePic} />
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-2">
                Upload Avatar
              </span>
            </div>

            <Input
              label="Full Name"
              placeholder="John Doe"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

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
              {loading ? "Creating Account..." : "Join Now"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 font-extrabold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Signup;