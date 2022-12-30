import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { MeContext } from "../../context/MeContext";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

export const Register = () => {
	const { token, setToken } = useContext(AuthContext);
	const { me, setMe } = useContext(MeContext);

	const navigate = useNavigate();


	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};

	const onSubmit = (values) => {
		axios
			.post("http://localhost:8080/register", {
				firstname: values.firstName,
				lastname: values.lastName,
				email: values.email,
				password: values.password,
			})
			.then((res) => {
				if (res.status === 201) {
					setToken(res.data.accessToken);
					setMe(res.data.user);
					navigate("/");
				}
			})
			.catch((err) => console.log(err));
	};

	const SignUpSchema = Yup.object({
		firstName: Yup.string().required("Required!"),
		lastName: Yup.string().required("Required!"),
		email: Yup.string()
			.email("Invalid an email!!!")
			.required("Email Required!"),
		password: Yup.string().min(8, "Must be at least 8 characters!").required("Password required!"),
	});


	return (
		<Formik
			initialValues={initialValues}
			validationSchema={SignUpSchema}
			onSubmit={onSubmit}
		>
			{(formik) => {
				return (
					<Form className="w-50 mx-auto my-5 p-5 shadow">
						<h2 className="text-center mb-5">Register</h2>

						<div className="mb-3">
							<Field
								name="firstName"
								type="text"
								className="form-control"
								placeholder="Name..."
							/>
							<ErrorMessage
								className="text-danger fs-6"
								component={"p"}
								name="firstName"
							/>
						</div>
						<div className="mb-3">
							<Field
								name="lastName"
								type="text"
								className="form-control"
								placeholder="Last name"
							/>
							<ErrorMessage
								className="text-danger fs-6"
								component={"p"}
								name="lastName"
							/>
						</div>
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
						<button
							type="submit"
							className="btn btn-primary"
							disabled={!formik.dirty || !formik.isValid}
						>
							Submit
						</button>
						<p className="text-center mb-5">
							Already have an account? <Link to="/login">Log in</Link>
						</p>
					</Form>
				);
			}}
		</Formik>
	);
};
