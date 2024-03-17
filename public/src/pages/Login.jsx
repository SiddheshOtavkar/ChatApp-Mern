import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoute";

const Login = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({ username: "", password: "" });

	useEffect(() => {
		if (localStorage.getItem(import.meta.env.VITE_APP_LOCALHOST_KEY)) {
			navigate("/");
		}
	}, []);

	const toastOptions = {
		position: "bottom-right",
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (handleValidation()) {
			try {
				const { username, password } = values;
				const { data } = await axios.post(loginRoute, {
					username,
					password,
				});

				console.log("Response:", data);

				if (data.success === false) {
					toast.error(data.message, toastOptions);
				}

				if (data.success === true) {
					toast.success(data.message, toastOptions);
					localStorage.setItem(import.meta.env.VITE_APP_LOCALHOST_KEY, JSON.stringify(data.user));
					navigate("/");
				}
			} catch (error) {
				console.error("Error occurred during login request:", error);
			}
		}
	};

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleValidation = () => {
		const { username, password } = values;
		if (username === "") {
			toast.error("Username and Password is required", toastOptions);
			return false;
		} else if (password === "") {
			toast.error("Username and Password is required", toastOptions);
			return false;
		}
		return true;
	};

	return (
		<>
			<FormContainer>
				<form action="" onSubmit={(e) => handleFormSubmit(e)}>
					<div className="brand">
						<img src={Logo} alt="logo" />
						<h1>ChatSphere</h1>
					</div>
					<input
						type="text"
						placeholder="Username"
						name="username"
						onChange={(e) => handleChange(e)}
						min="3"
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={(e) => handleChange(e)}
					/>
					<button type="submit">Log In</button>
					<span>
						Don't have an account ? <Link to="/register">Create One.</Link>
					</span>
				</form>
			</FormContainer>
			<ToastContainer />
		</>
	);
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #997af0;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    font-family: "cursive-font", cursive;
    a {
      color: #4e0eff;
      text-decoration: underline;
      font-weight: bold;
      &:hover {
        color: #997af0;
      }
    }
  }
`;

export default Login;
