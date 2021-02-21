import React, { useState } from 'react';

import { Store } from '../service';
import { useTag, useUser } from '../hook';

const TagsList = () => {

	const { data } = useTag();

	return (
		<div>
			<h2>Tags</h2>
			<ul>
			{data.map(({ title }, i) => <li key={i} children={title} />)}
			</ul>
		</div>
	);

}

const UserProfile = () => {

	const { data } = useUser();

	return (
		<div>
			<h2>Users</h2>
			<ul>
			{data.map(({ name }, i) => <li key={i} children={name} />)}
			</ul>
		</div>
	);

}

const UserCreate = () => {

	const { create } = useUser();

	const [ name, setName ] = useState('');

	const submit = async () => {

		await create(name);

		setName('');

	}

	return (
		<>
			<h3>Create user</h3>
			<input
				type="text"
				value={name}
				onChange={({ target }) => setName(target.value)} />
			<button
				children="Create"
				onClick={submit} />
		</>
	);

}

const TagCreate = () => {

	const { create } = useTag();

	const [ title, setTitle ] = useState('');

	const submit = async () => {

		await create(title);

		setTitle('');

	}

	return (
		<>
			<h3>Create tag</h3>
			<input
				type="text"
				value={title}
				onChange={({ target }) => setTitle(target.value)} />
			<button
				children="Create"
				onClick={submit} />
		</>
	);

}

export const App = () => {

	return (
		<Store.Provider>
			<h1>Lab</h1>
			<UserProfile />
			<UserCreate />
			<TagsList />
			<TagCreate />
		</Store.Provider>
	);

}
