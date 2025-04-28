import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosRequest } from "../../helpers/config";
import Spinner from "../layouts/Spinner";
import useValidations from "../custom/useValidations";
import { useSelector } from "react-redux";

export default function Register() {
  const [termsAccepted, setTermsAccepted] = useState(false); // State to track checkbox status
  const [loadingChecked, setLoadingChecked] = useState(false); // Loading state for button
  const isLoggedIn = useSelector(state => state.user?.isLoggedIn || false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "", // Tambahkan konfirmasi password
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleInputChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = e => {
    setTermsAccepted(e.target.checked); // Update state when checkbox is checked/unchecked
  };

  const registerNewUser = async e => {
    e.preventDefault();
    setValidationErrors([]);
    setLoading(true);

    try {
      const response = await axiosRequest.post("user/register", {
        ...user,
        password_confirmation: user.password_confirmation,
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error?.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-white pb-0">
              <div className="text-center mb-4">
                <img
                  src="/logo.png"
                  alt="Company Logo"
                  className="mb-3"
                  style={{ width: "120px" }}
                />
                <h2 className="h4">Create New Account</h2>
                <p className="text-muted">Get started with your free account</p>
              </div>
            </div>

            <div className="card-body px-5">
              <form onSubmit={registerNewUser}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                  />
                  {useValidations(validationErrors, "name")}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                  {useValidations(validationErrors, "email")}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="••••••••"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                  />
                  {useValidations(validationErrors, "password")}
                </div>

                <div className="mb-4">
                  <label htmlFor="password_confirmation" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="••••••••"
                    name="password_confirmation"
                    value={user.password_confirmation}
                    onChange={handleInputChange}
                  />
                  {useValidations(validationErrors, "password_confirmation")}
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    checked={termsAccepted} // Bind checkbox to state
                    onChange={handleCheckboxChange} // Update state when checkbox is changed
                  />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the{" "}
                    <a href="/terms" className="text-decoration-none">
                      Terms of Service
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-4"
                  disabled={loading || !termsAccepted} // Disable if loading or terms not accepted
                >
                  {loading ? <Spinner /> : "Create Account"}
                </button>

                <div className="text-center text-muted mb-4">
                  <span className="bg-white px-3">or sign up with</span>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-lg w-100"
                    >
                      <i className="fab fa-google me-2"></i> Google
                    </button>
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-lg w-100"
                    >
                      <i className="fab fa-facebook me-2"></i> Facebook
                    </button>
                  </div>
                </div>

                <p className="text-center">
                  Already have an account?{" "}
                  <a href="/login" className="text-decoration-none fw-bold">
                    Sign In
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
