import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SettingPostCard } from "../components/SettingPostCard/SettingPostCard";
import { MeContext } from "../context/MeContext";
import { Modal } from "../UI/Modal/Modal";

export const Settings = () => {
	const [posts, setPosts] = useState([]);
	const [addPostModal, setAddPostModal] = useState(false);
	const { me, setMe } = useContext(MeContext);

	const date = new Date().toLocaleString().substring(0, 17);

	const titleRef = useRef();
	const bodyRef = useRef();

    const getPosts = async () => {
        const data = await axios.get(`http://localhost:8080/posts?user_id=${me.id}`);
        setPosts(data.data)
    }

	useEffect(() => {
        getPosts()
	}, []);

	const handleFormSubmit = (evt) => {
		evt.preventDefault();

		axios
			.post("https://plum-ill-piranha.cyclic.app/posts", {
				user_id: me.id,
				title: titleRef.current.value,
				body: bodyRef.current.value,
				user_name: `${me.firstname} ${me.lastname}`,
				created_at: { date },
			})
			.then((res) => {
				if (res.status === 201) {
                    getPosts()
					setAddPostModal(false);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h3 className="text-center my-3">Settings</h3>
			<button
				onClick={() => setAddPostModal(!addPostModal)}
				className="btn btn-success"
			>
				Add post
			</button>
			<h4 className="my-5">My posts</h4>
            {posts?.length ? (
                <ul className="d-flex- flex-wrap gap-5 list-unstyled">
                    {posts.map(item => (
                        <SettingPostCard key={item.id} item={item} getPosts={getPosts} />
                    ))}
                </ul>
            ) : (<h2>No Posts Yet. Please create it.</h2>)}
			
			{addPostModal ? (
				<Modal title="Add post" setModal={setAddPostModal}>
					<form onSubmit={handleFormSubmit}>
						<input
							ref={titleRef}
							type="text"
							className="form-control my-3"
							placeholder="Enter your post title"
						/>
						<textarea
                            style={{height: "150px"}}
							ref={bodyRef}
							className="form-control"
							placeholder="Enter your post "
						></textarea>
						<button className="btn btn-success mt-3">Create</button>
					</form>
				</Modal>
			) : (
				""
			)}
		</>
	);
};
