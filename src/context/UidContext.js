import { createContext, useState } from "react";

export const UidContext = createContext();

export const UidProvider = ({ children }) => {
	const [unique, setUnique] = useState(localStorage.getItem("uid") || "");

	if (unique) {
		localStorage.setItem("uid", unique);
	} else {
		localStorage.removeItem("uid");
	}

	return (
		<UidContext.Provider value={{ unique, setUnique }}>
			{children}
		</UidContext.Provider>
	);
};
