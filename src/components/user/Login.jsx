import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosRequest } from "../../helpers/config";
import Spinner from "../layouts/Spinner";
import useValidations from "../custom/useValidations";
import {
  setCurrentUser,
  setToken,
  setLoggedInOut,
} from "../../redux/slices/userSlice";

export default function Login() {
  const { isLoggedIn } = useSelector(state => state.user);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const loginUser = async e => {
    e.preventDefault();
    setValidationErrors([]);
    setLoading(true);
    try {
      const response = await axiosRequest.post("user/login", user);

      // Simpan token ke localStorage
      localStorage.setItem("access_token", response.data.access_token);

      // Dispatch Redux action
      dispatch(setCurrentUser(response.data.user));
      dispatch(setToken(response.data.access_token));
      dispatch(setLoggedInOut(true));

      toast.success("Login berhasil!");
      navigate("/");
    } catch (error) {
      if (error?.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
      } else if (error?.response?.status === 401) {
        toast.error("Email atau password salah");
      } else {
        toast.error("Terjadi kesalahan server");
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
                <h2 className="h4">Welcome Back</h2>
                <p className="text-muted">Sign in to manage your account</p>
              </div>
            </div>

            <div className="card-body px-5">
              <form onSubmit={loginUser}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                  />
                  {useValidations(validationErrors, "email")}
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-decoration-none small"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="••••••••"
                    value={user.password}
                    onChange={e =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  {useValidations(validationErrors, "password")}
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-4"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Sign In"}
                </button>

                <div className="text-center text-muted mb-4">
                  <span className="bg-white px-3">or continue with</span>
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
                  Don't have an account?{" "}
                  <a href="/register" className="text-decoration-none fw-bold">
                    Create Account
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
