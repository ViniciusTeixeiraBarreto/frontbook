import { books } from "./Api";
import { useState, useEffect } from "react";

import { Button, Form, CloseButton, ListGroup, Badge, Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


const BookElement = ({ data, callback }) => {
  async function remove(id) {
    await books.delete(id);
    callback();
  }

  return (
    <ListGroup>
      {data.map((data) => (
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">{data.name}</div>
          </div>
          <CloseButton style={{ float: 'right' }} onClick={() => { remove(data.id) }}></CloseButton >
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

const FormCreateBook = ({ callback }) => {
  const [book, setBook] = useState({
    id: "",
    name: "Livro 1",
    description: "Descricao ",
    medium_price: 0,
    img_url: ""
  });

  async function createBook() {
    await books.create(book);
    callback()
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formNameBook">
        <Form.Label htmlFor="name_book">Nome do livro:</Form.Label>
        <Form.Control type="text" placeholder="Digite o nome do Livro" value={book.name || ''} onChange={(evet) => { setBook(prevState => ({ ...prevState, name: evet.target.value })) }} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescriptionBook">
        <Form.Label htmlFor="description_book">Descricao do livro:</Form.Label>
        <Form.Control as="textarea" placeholder="Digite uma breve descricao do livro" value={book.description || ''} onChange={(evet) => { setBook(prevState => ({ ...prevState, description: evet.target.value })) }} />
      </Form.Group>
      <Button variant="primary" onClick={createBook}>
        Criar livro
      </Button>
    </Form >
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [bookList, setBookList] = useState([]);

  async function fetchBooks() {
    const response = await books.index();
    setBookList(response)
  }

  useEffect(() => {
    fetchBooks();
  }, [])

  return (
    <Container>
      <Row>
        <Button onClick={fetchBooks}> Atualizar</Button>
      </Row>
      <Row>
        <FormCreateBook callback={fetchBooks}></FormCreateBook>
      </Row>
      <Row>
        <BookElement data={bookList} callback={fetchBooks}></BookElement>
      </Row>
    </Container>
  );
}
