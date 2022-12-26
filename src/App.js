import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"
import { Register } from "./pages/Register/Register";
import { Private } from "./apps/Private";
import { Public } from "./apps/Public";

export const App = () => {
	const { token } = useContext(AuthContext);

	if (token) {
		return <Private />
	}
	return <Public />

	// if (!token) {
	// 	return <Login />;
	// }
	// return <Home />;
	
	
};
