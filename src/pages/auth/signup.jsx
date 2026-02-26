import React, { useState } from "react";
import AuthLayout from "../../components/Layouts/Authlayout";
import Input from "../../components/Inputs/input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import ProfilePhotoselector from "../../components/ProfilePhotoselector/ProfilePhotoselector";
import { signupUser } from "../../redux/thunks/auth.thunk";
import { useDispatch, useSelector } from "react-redux";

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
      <div className="w-full px-4 lg:w-full mx-auto">
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create Account
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Enter your details to start managing your finances.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-3">
          <div className="flex justify-start mb-2">
            <ProfilePhotoselector image={profilePic} setImage={setProfilePic} />
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
            <p className="text-red-500 text-xs font-medium">
              {error || serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-purple-200 transition-all ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-purple-700 active:scale-[0.98]"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Signup;