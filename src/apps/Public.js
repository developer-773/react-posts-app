import { Link, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const Public = () => {
	return (
		<div>
			<header className="bg-light p-3">
				<div className="container">
					<nav className="d-flex justify-content-between align-items-center">
						<Link className="text-dark text-decoration-none fs-4" to="/">
							Home
						</Link>
						<div className="d-flex">
							<Link className="btn btn-outline-dark me-3" to="/login">
								Sign in
							</Link>
							<Link className="btn btn-outline-dark" to="/register">
								Sign up
							</Link>
						</div>
					</nav>
				</div>
			</header>
			<div className="container">
				<Routes>
					<Route
						path="/"
						element={
							<>
								<h2>Public home page</h2>
							</>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<Navigate to="/login" replace={true} />} />
				</Routes>
			</div>
		</div>
	);
};
