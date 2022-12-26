import React, { useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { MeContext } from "../../context/MeContext";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
	const {token, setToken} = useContext(AuthContext);
	const {me, setMe} = useContext(MeContext);

	const navigate = useNavigate();

	const firstName = useRef();
	const lastName = useRef();
	const email = useRef();
	const password = useRef();


	const handleForm = (evt) => {
		evt.preventDefault();

		axios
			.post("http://localhost:8080/register", {
				firstname: firstName.current.value,
				lastname: lastName.current.value,
				email: email.current.value,
				password: password.current.value,
			})
			.then((res) => {
				console.log(res);
				if(res.status === 201) {
				    setToken(res.data.accessToken)
					setMe(res.data.user)
					navigate("/")
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<form className="w-50 mx-auto my-5 p-5 shadow" onSubmit={handleForm}>
			<h2 className="text-center mb-5">Register</h2>
			<p className="text-center mb-5">Sizda account bormi? <Link to="/login">Log in</Link></p>

			<div className="mb-3">
				<input
					ref={firstName}
					type="text"
					className="form-control"
					placeholder="Name..."
				/>
			</div>
			<div className="mb-3">
				<input
					ref={lastName}
					type="text"
					className="form-control"
					placeholder="Last name"
				/>
			</div>
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
