import { useContext } from "react"
import {AuthContext} from "../../context/AuthContext";

export const Home = () => {


    const {token, setToken} = useContext(AuthContext)

    return <div>
        <h2>Home</h2>
    <button onClick={() => setToken('')} className="btn btn-primary">Log Out</button>
    </div>
}