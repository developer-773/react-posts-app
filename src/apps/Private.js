import React, { useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { SinglePost } from "../components/PostCard/SinglePost";
import { AuthContext } from "../context/AuthContext";
import { MeContext } from "../context/MeContext";
import { Posts } from "../pages/Posts/Posts";
import { Settings } from "../pages/Settings";

export const Private = () => {
	const { token, setToken } = useContext(AuthContext);
	const { me, setMe } = useContext(MeContext);

	return (
		<div>
			<Header />
			<div className="container">
				<Routes>
					<Route
						path="/"
						element={
							<>
								<h2>Home page</h2>
							</>
						}
					/>
					<Route path="/posts" element={<Posts />} />
					<Route path="/settings" element={<Settings />} />
					<Route path={`/posts/${me.id}`} element={<SinglePost />} />
					<Route
						path="*"
						element={
							<>
								<h2>404 Not Found </h2>
							</>
						}
					/>
				</Routes>
			</div>
		</div>
	);
};
