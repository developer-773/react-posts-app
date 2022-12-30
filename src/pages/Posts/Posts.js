import axios from "axios";
import React, { useEffect, useState } from "react";
import { PostCard } from "../../components/PostCard/PostCard";

export const Posts = () => {
	const [post, setPost] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/posts")
			.then((res) => {
				if (res.status === 200) {
					setPost(res.data);
				}
			})
			.catch((err) => console.log(err));
	}, []);


	return (
		<>

			<h3 className="text-center my-5">Posts</h3>
			{post?.length ? (
				<ul className="list-unstyled d-flex flex-wrap gap-5">
					{post.map((item) => (
						<PostCard key={item.id} data={item} />
					))}
				</ul>
			) : (
				<h3>No Posts Yet. Please create it.</h3>
			)}
		</>
	);
};
