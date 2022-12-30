import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { Link, useNavigate } from "react-router-dom";
import { UidContext } from "../../context/UidContext";

import "./Forgot.css";
import { MeContext } from "../../context/MeContext";

export const Forgot = () => {
	const navigate = useNavigate();
	const [valu, setValu] = useState("");
	const [show, setShow] = useState(true);
	const [emailValid, setEmailValid] = useState(true);
	const [user, setUser] = useState([]);
	const [visible, setVisible] = useState(false);
	const [emailFound, setEmailFound] = useState(undefined);
	const { unique, setUnique } = useContext(UidContext);
	const {me, setMe} = useContext(MeContext)
	const UserNotFounded = () => {
		return (
			<div className={`text-center mt-5 ${visible}`}>
				<h3 className="fs-2">Unable to reset password!</h3>
				<p>
					I'm sorry, but we weren't able to find a user with that login
					information.
				</p>
			</div>
		);
	};

	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	const HandleInput = (evt) => {
		setEmailValid(!re.test(evt.target.value));
		setValu(evt.target.value);
		setUnique(`auth/${uuid()}/consumer=career&state=bslogin`);
	};

	useEffect(() => {
		axios.get("http://localhost:8080/users").then((data) => setUser(data.data));
		checkUserEmail();
	}, [valu]);

	const checkUserEmail = () => {
		const finded = user.find((item) => {
			return item.email === valu;
		});

		if (!finded) {
			setVisible(false);
			setEmailFound(null);
		}
		if (finded) {
			setEmailFound("Finded");
		}
	};

	return (
		<>
			<UserNotFounded />
			<form
				style={{ width: "370px" }}
				className={`mx-auto my-5 p-5 text-center ${show} `}
				action={`${emailFound !== null ? `https://formsubmit.co/${valu}` : ""}`}
				method={`${emailFound !== null ? "POST" : ""}`}
				onSubmit={
					emailFound !== null
						? () => {}
						: (e) => {
								setVisible(true);
								e.preventDefault();
						  }
				}
			>
				<h2 className="text-center mb-4">Forgot password?</h2>
				<p className="text-secondary mb-2">
					No worries, we'll send you reset instructions.
				</p>
				<strong className="d-block mb-5">
					Warning! On your email, click activate link from FormSubmit, then back
					to your inbox.
				</strong>
				<input
					type="text"
					name="user"
					value={`Hello, ${me.firstname}!`}
					className="d-none"
					onChange={() => {}}
				/>
				<input
					type="text"
					name="Your_Password_Reset_Link"
					value={`http://localhost:3000/reset/${unique}`}
					className="d-none"
					onChange={() => {}}
				/>
				<label className="text-start d-block mb-2">Email</label>
				<input
					className="form-control"
					type="email"
					name="email"
					placeholder="Enter your email"
					onChange={HandleInput}
				/>
				<textarea
					name="message"
					className="d-none"
					onChange={() => {}}
					value="Someone has requested a link to change your password. You can do this through the link below.
                
                If you didn't request this, please ignore this email.Your password won't change until you access the link above and create a new one"
				></textarea>
				<button
					type="submit"
					className="btn btn-primary mt-5"
					disabled={emailValid}
				>
					Reset password
				</button>
			</form>
		</>
	);
};
