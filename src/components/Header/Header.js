import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MeContext } from "../../context/MeContext";

export const Header = () => {

    const {me, setMe} = useContext(MeContext)
    const {token, setToken} = useContext(AuthContext)

	return (
		<header className="bg-light p-3">
			<div className="container">
				<nav className="d-flex align-items-center">
					<Link className="text-dark text-decoration-none fs-4 me-3" to="/">
						Home
					</Link>
					<Link className="text-dark text-decoration-none fs-4" to="/posts">
						Posts
					</Link>
					<div className="dropdown ms-auto">
						<button
							className="btn btn-secondary dropdown-toggle"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{me.firstname.charAt(0) + me.lastname.charAt(0) }
						</button>
						<ul className="dropdown-menu">
							<li>
								<Link className="dropdown-item" to="/settings">
									Settings
								</Link>
							</li>
							<li>
								<button onClick={() => setToken("")} className="dropdown-item">
									Log out
								</button>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	);
};
