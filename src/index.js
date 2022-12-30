import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { AuthProvider } from "./context/AuthContext";
import { MeProvider } from "./context/MeContext";
import { UidProvider } from "./context/UidContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<AuthProvider>
			<MeProvider>
				<UidProvider>
					<App />
				</UidProvider>
			</MeProvider>
		</AuthProvider>
	</BrowserRouter>
);
