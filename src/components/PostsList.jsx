import { useEffect, useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

function PostsList({ isPosting, onStopPosting }) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchPosts() {
			setLoading(true);
			const response = await fetch('http://localhost:8080/posts');
			const resData = await response.json();
			setPosts(resData.posts);
			setLoading(false);
		}

		fetchPosts();
	}, []);

	function addPostHandler(postData) {
		async function addPost() {
			setLoading(true);
			await fetch('http://localhost:8080/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(postData)
			});
			setLoading(false);
		}

		addPost();
		setPosts((existingData) => [postData, ...existingData]);
	}

	/*  Diri ebutang ang function sa edit and delete */
	
	const handleEditPost = (id, newBody) => {
		setPosts(posts.map(post =>
			post.id === id ? { ...post, body: newBody } : post
		));
	};
	
	const handleDeletePost = (id) => {
		setPosts(posts.filter(post => post.id !== id));
	};

	return (
		<>
			{isPosting && (
				<Modal onCloseModal={onStopPosting}>
					<NewPost
						onCancel={onStopPosting}
						onAddPost={addPostHandler}
					/>
				</Modal>
			)}

			{loading && <LoadingSpinner />}

			{!loading && posts.length > 0 && (
				<ul className='posts'>
					{posts.map((post, index) => (
									<Post
										key={index}
										author={post.author}
										body={post.body}
/* Diri para e return and edit button*/	onEdit={(newBody) => handleEditPost(post.id, newBody)}
/* Diri para e return and edit button*/	onDelete={() => handleDeletePost(post.id)}
									/>
					))}
				</ul>
			)}

			{!loading && posts.length === 0 && (
				<div style={{ textAlign: 'center', color: 'white' }}>
					<h2>There is no post yet.</h2>
					<p>Try to add some!</p>
				</div>
			)}
		</>
	);
}

export default PostsList;
