import axios from "axios";
import { useContext, useRef, useState } from "react";
import { MeContext } from "../../context/MeContext";
import { Modal } from "../../UI/Modal/Modal";

export const SettingPostCard = ({ item, getPosts }) => {
	const { title, id, body } = item;

	const titleRef = useRef();
	const bodyRef = useRef();

	const { me, setMe } = useContext(MeContext);
	const [editModal, setEditModal] = useState(false);
	const date = new Date().toLocaleString().substring(0, 17);

	const handleFormSubmit = (evt) => {
		evt.preventDefault();

		axios
			.put(`https://plum-ill-piranha.cyclic.app/posts/${id}`, {
				user_id: me.id,
				title: titleRef.current.value,
				user_name: `${me.firstname} ${me.lastname}`,
				body: bodyRef.current.value,
				created_at: { date },
			})
			.then((res) => {
				if (res.status === 200) {
					setEditModal(false);
					getPosts();
				}
			})
			.catch((err) => () => {});
	};

	const handleDelete = () => {
		axios
			.delete(`https://plum-ill-piranha.cyclic.app/posts/${id}`)
			.then((res) => () => {})
			.catch((err) => console.log(err));
            getPosts()
	};

	return (
		<>
			<li className="shadow p-4 d-flex align-items-center ">
				<strong className="me-auto">{title}</strong>

				<button
					type="submit"
					className="btn btn-warning me-2"
					onClick={() => setEditModal(true)}
				>
					EDIT
				</button>
				<button type="button" className="btn btn-danger" onClick={handleDelete}>
					DELETE
				</button>
			</li>
			{editModal ? (
				<Modal title="Edit Modal" setModal={setEditModal}>
					<form onSubmit={handleFormSubmit}>
						<input
							ref={titleRef}
							defaultValue={title}
							type="text"
							className="form-control"
							placeholder="Enter your post title"
						/>
						<textarea
							style={{ height: "150px" }}
							ref={bodyRef}
							defaultValue={body}
							className="form-control"
							placeholder="Enter your post "
						></textarea>
						<button className="btn btn-success">Change</button>
					</form>
				</Modal>
			) : (
				""
			)}
		</>
	);
};
