import { books, authors } from "./Api";
import { useState, useEffect } from "react";

import { Button, Form, CloseButton, ListGroup, Badge, Container, Row, Tab, Tabs } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';



const BookElement = ({ data: booksList, callback }) => {
  async function remove(id) {
    await books.delete(id);
    callback();
  }

  return (
    <ListGroup style={{ marginTop: 10 }}>
      {booksList.map((book) => (
        <ListGroup.Item as="li" key={book.id} className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">{book.name}</div>
          </div>
          {book.authors.map((author) => (
            <b key={author.id}>{author.name}</b>
          ))}
          <CloseButton style={{ float: 'right' }} onClick={() => { remove(book.id) }}></CloseButton >
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

const AuthorElement = ({ data: authorList, callback }) => {
  async function remove(id) {
    await authors.delete(id);
    callback();
  }

  return (
    <ListGroup style={{ marginTop: 10 }}>
      {authorList.map((author) => (
        <ListGroup.Item as="li" key={author.id} className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">{author.name}</div>
          </div>
          <CloseButton style={{ float: 'right' }} onClick={() => { remove(author.id) }}></CloseButton >
        </ListGroup.Item>
      ))}
      <br></br>
    </ListGroup>
  )
}

const FormCreateBook = ({ callback, authorList }) => {
  const [book, setBook] = useState({
    id: "",
    name: "Livro 1",
    description: "Descricao ",
    medium_price: 0,
    img_url: "",
  });

  async function createBook() {
    await books.create(book);
    callback()
  }

  return (
    <Form>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="name_book">Nome do livro:</Form.Label>
        <Form.Control type="text" placeholder="Digite o nome do Livro" value={book.name || ''} onChange={(evet) => { setBook(prevState => ({ ...prevState, name: evet.target.value })) }} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="description_book">Descricao do livro:</Form.Label>
        <Form.Control as="textarea" placeholder="Digite uma breve descricao do livro" value={book.description || ''} onChange={(evet) => { setBook(prevState => ({ ...prevState, description: evet.target.value })) }} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="description_book">Escolha o author do Livro:</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(evet) => { setBook(prevState => ({ ...prevState, authors: [{ id: evet.target.value }] })) }}>
          <option>Open this select menu</option>
          {authorList.map((data) => (
            <option key={data.id} value={data.id}>{data.name}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={createBook} style={{ marginTop: 10 }}>
        Criar livro
      </Button>
    </Form >
  )
}

const FormCreateAuthor = ({ callback }) => {
  const [author, setAuthor] = useState({
    name: "Felipe",
  });

  async function createAuthor() {
    await authors.create(author);
    setAuthor({})
    callback()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      createAuthor(author);
    }
  };

  return (
    <Form onSubmit={(e) => { e.preventDefault() }}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name_book">Nome do livro:</Form.Label>
        <Form.Control type="text" onKeyDown={handleKeyDown} placeholder="Digite o nome do Livro" value={author.name || ''} onChange={(evet) => { setAuthor(prevState => ({ ...prevState, name: evet.target.value })) }} />
      </Form.Group>
      <Button variant="primary" onClick={createAuthor}>
        Criar Author
      </Button>
    </Form >
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [bookList, setBookList] = useState([]);
  const [authorList, setAuthorList] = useState([]);

  async function fetchAll() {
    const responseBook = await books.index();
    setBookList(responseBook)
    const responseAuthor = await authors.index();
    setAuthorList(responseAuthor)
  }

  useEffect(() => {
    fetchAll();
  }, [])

  return (
    <Container>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" >
        <Tab eventKey="home" title="Livro">
          <Row>
            <FormCreateBook callback={fetchAll} authorList={authorList}></FormCreateBook>
          </Row>
          <Row>
            <BookElement data={bookList} callback={fetchAll}></BookElement>
          </Row>
        </Tab>
        <Tab eventKey="profile" title="Autor">
          <Row>
            <FormCreateAuthor callback={fetchAll}></FormCreateAuthor>
          </Row>
          <Row>
            <AuthorElement data={authorList} callback={fetchAll}></AuthorElement>
          </Row>
        </Tab>
        <Tab eventKey="contact" title="+18" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>




    </Container>
  );
}
