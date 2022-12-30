import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MeContext } from "../../context/MeContext";

export const PostCard = ({data}) => {


    const {title, body, user_name, created_at } = data;
	const { me, setMe } = useContext(MeContext);


    const getPosts = async () => {
        const data = await axios.get(`http://localhost:8080/posts?user_id=${me.id}`);
    }

    getPosts()

    const styless = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }

	return (
        <>
		<li className="card" style={{ width: "18rem" }}>
			<div className="card-body">
				<h5 className="card-title mb-3">{title}</h5>
				<h6 className="card-subtitle mb-2 text-muted">Author: {user_name}</h6>
				<p className="card-text" style={styless}>
					{body}
				</p>
                <time className="d-block">{Object.values(created_at)}</time>
				<Link to={`/posts/${me.id}`} className="card-link">
					Learn more
				</Link>
			</div>
		</li>
      
        </>
	);
};
