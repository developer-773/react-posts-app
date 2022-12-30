import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Private } from "./apps/Private";
import { Public } from "./apps/Public";

export const App = () => {
	const { token } = useContext(AuthContext);

	if (token) {
		return <Private />;
	}
	return <Public />;
};
