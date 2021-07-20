import { Col, Button, Card as CardItem } from 'react-bootstrap';

const Card = ({ data, openModalDetails, selectEventList, isComicSelected }) => {
  const handlerOpenDetailsEvents = (event) => {
    event.preventDefault()
    openModalDetails(data)
  };

  let { thumbnail, title, description } = data
console.log(isComicSelected)
  return (

    <Col>
      <CardItem style={{ width: '18rem' }}>
        <input type="checkbox" 
        name={title} 
        defaultChecked={isComicSelected} 
        onChange={() => selectEventList(data)} />
        <CardItem.Img variant="top" src={`${thumbnail.path}.${thumbnail.extension}`} />
        <CardItem.Body>
          <CardItem.Title>{title}</CardItem.Title>
          <Button variant="primary" onClick={handlerOpenDetailsEvents}>
            See Details
          </Button>
        </CardItem.Body>
      </CardItem>
    </Col>
  )
}
export default Card;