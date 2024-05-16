import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../Redux/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Local States

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    // Global States From Redux authSlice

    const loading = useSelector((state) => state.auth.loading);

    // Function For updating Input Value

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    // Login Function

    const handleClick = async (e) => {

        e.preventDefault();
        dispatch(loginStart());

        try {
            const res = await axios.post("/auth/login", credentials);
            if (res.data) {
                dispatch(loginSuccess(res.data));
                toast.success("Login Successfully");
                navigate("/thresholds");
            }
        }
        catch (err) {
            dispatch(loginFailure())
            err?.response?.data?.errors?.forEach(e => toast.error(e.msg))
        }
    };


    return (
        <div className="login">
            <div class="wrapper">
                <div class="container">
                    <div class="col-left">
                        <div class="login-text">
                            {/* <img src={logoFooter} alt="" /> */}
                            <h1>
                                Best Way IT
                            </h1>
                        </div>
                    </div>
                    <div class="col-right">
                        <div class="login-form">
                            <form>
                                <p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        aria-describedby="emailHelp"
                                        placeholder="email"
                                        onChange={handleChange}
                                    />
                                </p>
                                <p>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="password"
                                        onChange={handleChange}
                                    />
                                </p>
                                <p>
                                    <input
                                        type="submit"
                                        className="btn"
                                        disabled={loading}
                                        onClick={handleClick}
                                        value="Login"
                                    />
                                </p>
                                <p>
                                    <a href="">Forget password?</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;











