import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { MeContext } from "../../context/MeContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { UidContext } from "../../context/UidContext";
import uuid from "react-uuid";

export const NewPassword = () => {
	const { token, setToken } = useContext(AuthContext);
	const { me, setMe } = useContext(MeContext);
	const { unique, setUnique } = useContext(UidContext);

	const navigate = useNavigate();

	const initialValues = {
		password: "",
		confirmPassword: "",
	};

	const onSubmit = (values) => {
		axios
			.put(`http://localhost:8080/users/${me.id}`, {
				email: me.email,
				password: values.password,
				firstname: me.firstname,
				lastname: me.lastname,
			})
			.then((res) => {
				if (res.status === 200) {
					setToken(res.data.accessToken);
					setMe(res.data.user);
					navigate("/");
					setUnique(`auth/${uuid()}/consumer=career&state=bslogin`);
				}
			})
			.catch((err) => console.log(err));
	};

	const passwordResetSchema = Yup.object({
		password: Yup.string().min(8, "Must be at least 8 characters!"),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Password does not match"
		),
	});

	const SpammingDetected = () => {
		return (
			<h2 className="text-center mt-5">
				Dear spammer! <br /> Register first and try again!
			</h2>
		);
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={passwordResetSchema}
				onSubmit={onSubmit}
			>
				{(formik) => {
					return (
						<Form
							className="w-50 mx-auto 5 p-5 shadow"
							style={{ marginTop: "11rem" }}
						>
							<h2>Set new password</h2>
							<p className="text-secondary mb-5">
								Your password must be different previously used passwords.
							</p>
							<div className="mb-3">
								<Field
									name="password"
									type="password"
									className="form-control"
								/>
								<ErrorMessage
									className="text-danger fs-6"
									component={"p"}
									name="password"
								/>
							</div>
							<div className="mb-3">
								<Field
									name="confirmPassword"
									type="password"
									className="form-control"
								/>
								<ErrorMessage
									className="text-danger fs-6"
									component={"p"}
									name="confirmPassword"
								/>
							</div>
							<button
								type="submit"
								className="btn btn-primary mt-4"
								disabled={!formik.dirty || !formik.isValid}
							>
								Submit
							</button>
						</Form>
					);
				}}
			</Formik>
		</>
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
