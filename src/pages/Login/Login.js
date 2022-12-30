import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { MeContext } from "../../context/MeContext";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

export const Login = () => {
	const { token, setToken } = useContext(AuthContext);
	const { me, setMe } = useContext(MeContext);
	const navigate = useNavigate();
	const [check, setCheck] = useState(false);
	const [checkValues, setCheckValues] = useState(false);

	const handleShow = () => setCheck(true);
	const handleErrShow = () => setCheckValues(true);

	const initialValues = {
		email: "",
		password: "",
	};

	const onSubmit = (values) => {
		if (values.email === me.email) {
			axios
				.post("http://localhost:8080/login", {
					email: values.email,
					password: values.password,
				})
				.then((res) => {
					if (res.status === 200 || res.status === 201) {
						setToken(res.data.accessToken);
						setMe(res.data.user);
						navigate("/");
					}
				})
				.catch((err) => handleErrShow());
		} else {
			handleShow();
		}
	};

	// axios.delete(`http://localhost:8080/users/${18}`).then(res => console.log(res))

	const NotRegistered = () => {
		return (
			<p className={`text-danger fs-6 ${check} ? hidden : '' `}>
				User does not exists.Would you like to{" "}
				<Link to="/register">create a new account?</Link>
			</p>
		);
	};

	const InvalidData = () => {
		return (
			<div className={`${checkValues} ? hidden : '' `}>
				<h3 className="text-center">Login failed!</h3>
				<p className="text-danger fs-6">
					Your email or password you entered is incorrect
				</p>
				<p className="text-danger fs-6">Please, try again.</p>
			</div>
		);
	};

	const LoginSchema = Yup.object({
		email: Yup.string()
			.email("Invalid an email!!!")
			.required("Email Required!"),
		password: Yup.string().min(8, "Must be at least 8 characters!"),
	});

	// const handleForm = (evt) => {
	// 	evt.preventDefault();

	// 	axios
	// 		.post("http://localhost:8080/login", {
	// 			email: email.current.value,
	// 			password: password.current.value,
	// 		})
	// 		.then((res) => {
	// 			console.log(res);
	// 			if (res.status === 200) {
	// 				setToken(res.data.accessToken);
	// 				setMe(res.data.user);
	// 				navigate("/");
	// 			}
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={LoginSchema}
		>
			{(formik) => {
				return (
					<Form className="w-50 mx-auto my-5 p-5 shadow">
						<h2 className="text-center mb-5">Login</h2>
						<InvalidData />
						<div className="mb-3">
							<Field
								name="email"
								type="email"
								className="form-control"
								placeholder="Email..."
							/>
							<ErrorMessage
								className="text-danger fs-6"
								component={"p"}
								name="email"
							/>
						</div>
						<div className="mb-3">
							<Field
								name="password"
								type="password"
								className="form-control"
								placeholder="Password..."
							/>
							<ErrorMessage
								className="text-danger fs-6"
								component={"p"}
								name="password"
							/>
						</div>
						<NotRegistered />
						<button
							type="submit"
							disabled={!formik.dirty}
							className="btn btn-primary"
						>
							Submit
						</button>

						<p className="mt-4">
							<Link to="/forgot">Forgot password?</Link>
						</p>
					</Form>
				);
			}}
		</Formik>
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
