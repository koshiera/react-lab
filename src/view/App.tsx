import React, { useEffect, useState } from 'react';

import { Store } from '../service';
import { useRenderCounter, useTag, useUser } from '../hook';

const TagsList = () => {

	const [ count ] = useRenderCounter('TagsList');

	const { data } = useTag();

	return (
		<div>
			<h2>Tags</h2>
			<p>Render count: {count}</p>
			<ul>
			{data.map(({ title }, i) => <li key={i} children={title} />)}
			</ul>
		</div>
	);

}

const UserProfile = () => {

	const [ count ] = useRenderCounter('UserProfile');

	const { data } = useUser();

	return (
		<div>
			<h2>Users</h2>
			<p>Render count: {count}</p>
			<ul>
			{data.map(({ name }, i) => <li key={i} children={name} />)}
			</ul>
		</div>
	);

}

const UserCreate = () => {

	const [ count ] = useRenderCounter('UserCreate');

	const { create } = useUser();

	const [ name, setName ] = useState('');

	const submit = async () => {

		await create(name);

		setName('');

	}

	return (
		<>
			<h3>Create user</h3>
			<p>Render count: {count}</p>
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

	const [ count ] = useRenderCounter('TagCreate');

	const { create } = useTag();

	const [ title, setTitle ] = useState('');

	const submit = async () => {

		await create(title);

		setTitle('');

	}

	return (
		<>
			<h3>Create tag</h3>
			<p>Render count: {count}</p>
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

const ExtraDiv: React.FC = ({ children }) => {
	const [ count ] = useRenderCounter('ExtraDiv');
	return (
		<>
			<div>01 render count: {count}</div>
			<div children={children} />
		</>
	);
}

const ExtraContent = () => {
	const [ count ] = useRenderCounter('ExtraContent');
	return (
		<>
			<div>Extra content render count: {count}</div>
		</>
	);
}

export const App = () => {

	return (
		<Store.Provider>
			<h1>Lab</h1>
			<UserProfile />
			<UserCreate />
			<ExtraDiv>
				<TagsList />
				<TagCreate />
				<ExtraContent />
			</ExtraDiv>
		</Store.Provider>
	);

}
