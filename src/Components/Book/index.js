import {books} from "../../Api";
import {useState} from "react";

import {
    Button,
    Form,
    CloseButton,
    ListGroup
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


export const CreateForm = ({callback, authorList}) => {
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
            <Form.Group className="mb-3">
                <Form.Label htmlFor="name_book">Nome do livro:</Form.Label>
                <Form.Control type="text" placeholder="Digite o nome do Livro"
                    value={
                        book.name || ''
                    }
                    onChange={
                        (evet) => {
                            setBook(prevState => ({
                                ...prevState,
                                name: evet.target.value
                            }))
                        }
                    }/>
            </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label htmlFor="description_book">Descricao do livro:</Form.Label>
            <Form.Control as="textarea" placeholder="Digite uma breve descricao do livro"
                value={
                    book.description || ''
                }
                onChange={
                    (evet) => {
                        setBook(prevState => ({
                            ...prevState,
                            description: evet.target.value
                        }))
                    }
                }/>
        </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label htmlFor="description_book">Escolha o author do Livro:</Form.Label>
        <Form.Select aria-label="Default select example"
            onChange={
                (evet) => {
                    setBook(prevState => ({
                        ...prevState,
                        authors: [
                            {
                                id: evet.target.value
                            }
                        ]
                    }))
                }
        }>
            <option>Open this select menu</option>
            {
            authorList.map((data) => (
                <option key={
                        data.id
                    }
                    value={
                        data.id
                }>
                    {
                    data.name
                }</option>
            ))
        } </Form.Select>
    </Form.Group>
    <Button variant="primary"
        onClick={createBook}
        style={
            {marginTop: 10}
    }>
        Criar livro
    </Button>
</Form>
    )
}

export const List = ({data: booksList, callback}) => {
    async function remove(id) {
        await books.delete(id);
        callback();
    }

    return (
        <div style={{marginTop: 20}}>
        <h4>Lista de Livros</h4>
        <ListGroup style={
            {marginTop: 10}
        }>
            {
            booksList.map((book) => (
                <ListGroup.Item as="li"
                    key={
                        book.id
                    }
                    className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">
                            {
                            book.name
                        }</div>
                    </div>
                    {
                    book.authors.map((author) => (
                        <b key={
                            author.id
                        }>
                            {
                            author.name
                        }</b>
                    ))
                }
                    <CloseButton style={
                            {float: 'right'}
                        }
                        onClick={
                            () => {
                                remove(book.id)
                            }
                    }></CloseButton>
            </ListGroup.Item>
            ))
        } </ListGroup>
        </div>
    )
}
