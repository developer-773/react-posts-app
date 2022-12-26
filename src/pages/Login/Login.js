import React, { useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { MeContext } from "../../context/MeContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
	const { token, setToken } = useContext(AuthContext);
	const { me, setMe } = useContext(MeContext);

	const navigate = useNavigate();

	const email = useRef();
	const password = useRef();

	const handleForm = (evt) => {
		evt.preventDefault();

		axios
			.post("http://localhost:8080/login", {
				email: email.current.value,
				password: password.current.value,
			})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					setToken(res.data.accessToken);
					setMe(res.data.user);
					navigate("/");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<form className="w-50 mx-auto my-5 p-5 shadow" onSubmit={handleForm}>
			<h2 className="text-center mb-5">Login</h2>
			<p className="text-center mb-5">
				Sizda account yo'qmi? <Link to="/register">Register</Link>
			</p>
			<div className="mb-3">
				<input
					ref={email}
					type="email"
					className="form-control"
					placeholder="Email..."
				/>
			</div>
			<div className="mb-3">
				<input
					ref={password}
					type="password"
					className="form-control"
					placeholder="Password..."
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

// // import axios from "axios";
// // import { useEffect, useState, useContext } from "react";
// // import {AuthContext} from "../../context/AuthContext"

// // export const Login = () => {
// // 	const [emailValue, setEmailValue] = useState("");
// // 	const [passwordValue, setPasswordValue] = useState("");
// // 	const [emailTouched, setEmailTouched] = useState(false);
// // 	const [passwordTouched, setPasswordTouched] = useState(false);
// // 	const [emailError, setEmailError] = useState("Email majburiy!");
// // 	const [passwordError, setPasswordError] = useState("Password majburiy!");
// // 	const [formSubmit, setFormSubmit] = useState(false);

// //     const {token, setToken} = useContext(AuthContext)

// // 	const handleEmailValue = (e) => {
// // 	    setEmailValue(e.target.value);

// // 	    const re =
// // 	    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// // 	    if (!re.test(String(e.target.value).toLowerCase())) {
// // 	    setEmailError('Email is in-valid');
// // 	    } else {
// // 	        setEmailError('')
// // 	    }
// // 	}

// // 	    const handlePasswordValue = (e) => {
// // 	    setPasswordValue(e.target.value);

// // 	    if (e.target.value.length < 3 || e.target.value.length > 8) {
// // 	    setPasswordError('Password is in-valid');
// // 	    } else {
// // 	        setPasswordError('');
// // 	    }
// // 	}

// // 	    const handleFormSubmit = (evt) => {
// // 	        evt.preventDefault();
// //             axios.post("https://reqres.in/api/login", {
// //                 email: emailValue,
// //                 password: passwordValue
// //             }).then(data => {
// //                 if (data.status === 200) {
// //                     setToken(data.token)
// //                     localStorage.setItem("token", data.data.token)
// //                 }
// //             })

// // 	    }

// // 	const handleBlur = (name) => {
// // 		switch (name) {
// // 			case "email":
// // 				setEmailTouched(true);
// // 				break;
// // 			case "password":
// // 				setPasswordTouched(true);
// // 				break;

// // 			default:
// // 				break;
// // 		}
// // 	};

// //     useEffect(() => {
// //     !emailError.length && !passwordError.length ? setFormSubmit(true) : setFormSubmit(false)
// //     },[])

// // 	return (
// // 		<form onSubmit={(e) => handleFormSubmit(e)} classNameName="w-50 mx-auto my-5 p-5 shadow">
// // 			<h2 classNameName="text-center ">Login</h2>
// // 			<input
// // 				onBlur={(e) => handleBlur(e.target.name)}
// //                 onChange={(e) => handleEmailValue(e)}
// //                 value={emailValue}
// // 				classNameName="form-control"
// // 				type="email"
// // 				name="email"
// // 				placeholder="Enter your email"
// // 			/>
// //             {emailTouched && emailError ? (
// //                 <span classNameName="d-block text-danger mb-3">{emailError}</span>
// //             ) : ''}
// // 			<input
// // 				onBlur={(e) => handleBlur(e.target.name)}
// //                 onChange={(e) => handlePasswordValue(e)}
// //                 value={passwordValue}
// // 				classNameName="form-control"
// // 				type="password"
// // 				name="password"
// // 				placeholder="Enter your password"
// // 			/>
// //              {passwordTouched && passwordError ? (
// //                 <span classNameName="d-block text-danger mb-3">{passwordError}</span>
// //             ) : ''}
// // 			<button classNameName={`${formSubmit} ? btn btn-primary : btn btn-primary disabled`} type="submit">
// // 				SEND
// // 			</button>
// // 		</form>
// // 	)}
