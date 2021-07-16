import { useState, useEffect } from 'react';
import api from '../service/api'

import Card from '../components/card';

const Home = () => {
	const [comics, setComics] = useState(null);
	const [filters, setFilters] = useState({
		dataRange: null,
		title: null,
		titleStartsWith: null,
		characters: null
	});


	const loadComics = async () => {
		let params = Object.entries(filters)
			.filter(([key, value]) => value)
			.reduce((acc, item) => {
				let [key, value] = item
				acc[key] = value
				return acc
			}, {})
		const { data, status } = await api.get('comics', { params });
		if (status == 200) {
			setComics(data.data);
		}
	}

	const handlerChangeFilter = (event) => {
		const { name, value } = event.target;
		setFilters({ ...filters, [name]: value });
	};

	const handlerSearchEvent = (event) => {
		event.preventDefault()
		loadComics()
	};

	useEffect(() => {
		loadComics()
	}, []);

	return (
		<div>
			<div>
				<h1>Inputs:</h1>
				<label htmlFor="dataRange">Data Range </label> <br />
				<input type="text" name="dataRange" id="dataRange" value={filters.dataRange}
					onChange={handlerChangeFilter} />
				<br /><br />
				<label htmlFor="title">Title</label> <br />
				<input type="text" name="title" id="title" value={filters.title}
					onChange={handlerChangeFilter} />
				<br /><br />
				<label htmlFor="titleStartsWith">Title Starts With</label> <br />
				<input type="text" name="titleStartsWith" id="titleStartsWith" value={filters.titleStartsWith}
					onChange={handlerChangeFilter} />
				<br /><br />
				<label htmlFor="characters">Characters</label> <br />
				<input type="text" name="characters" id="characters" value={filters.characters}
					onChange={handlerChangeFilter} />

				<button onClick={handlerSearchEvent} >Pesquisar</button>
			</div>
			{
				comics && comics.results.map((comic, index) =>
					<Card data={comic} key={index} />
				)
			}
			<p>
				Home page
			</p>
		</div>

	)
}
export default Home;