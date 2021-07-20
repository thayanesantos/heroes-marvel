import { useState, useEffect } from 'react';
import api from '../service/api';

import { chunk } from 'lodash';
import { Modal, Button, Container, Row } from 'react-bootstrap';
import Card from '../components/card';

const Home = () => {
	const [listComicsSelected, setListComicsSelected] = useState([]);
	const selectEventList = (comic) => {
		let list = listComicsSelected
		let indexComic = list.findIndex(item => item.id == comic.id)
		if (indexComic != -1) {
			list.splice(indexComic, 1)
		} else {
			list.push(comic)
		} 
		setListComicsSelected(list);
		console.log(listComicsSelected)
	}

	const [modalShowDetails, setModalShowDetails] = useState(false);
	const [comicSelected, setComicSelected] = useState(false);
	const openModalDetails = (comic) => {
		setComicSelected(comic)
		setModalShowDetails(true)
	}
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

	function ModalComicsDetails(props) {
		if (!comicSelected) return null;

		const { title, thumbnail, description } = comicSelected;
		return (
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter">
						{title}
					</Modal.Title>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Header>
				<Modal.Body>
					<h4>Centered Modal</h4>
					<img src={`${thumbnail.path}.${thumbnail.extension}`} />
					<p>{description}</p>
				</Modal.Body>
			</Modal>
		);
	}
	return (
		<Container>

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

			{comics && chunk(comics.results, 4).map(groupComics => {
				return (
					<Row>
						{groupComics.map((comic, index) => 
						<Card data={comic}
						isComicSelected={listComicsSelected.findIndex(item => item.id == comic.id) != -1}
						selectEventList={selectEventList} 
						openModalDetails={openModalDetails} 
						key={index} />)}
					</Row>
				)
			}
			)}

			<ModalComicsDetails
				show={modalShowDetails}
				onHide={() => setModalShowDetails(false)}
			/>
		</Container>

	)
}
export default Home;