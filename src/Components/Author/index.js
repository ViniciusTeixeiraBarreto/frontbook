import {authors} from "../../Api";
import {useState} from "react";

import {
    Button,
    Form,
    CloseButton,
    ListGroup
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


export const AuthorElement = ({data: authorList, callback}) => {
    async function remove(id) {
        await authors.delete(id);
        callback();
    }

    return (
        <ListGroup style={
            {marginTop: 10}
        }>
            {
            authorList.map((author) => (
                <ListGroup.Item as="li"
                    key={
                        author.id
                    }
                    className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">
                            {
                            author.name
                        }</div>
                    </div>
                    <CloseButton style={
                            {float: 'right'}
                        }
                        onClick={
                            () => {
                                remove(author.id)
                            }
                    }></CloseButton>
            </ListGroup.Item>
            ))
        }
            <br></br>
        </ListGroup>
    )
}

export const FormCreateAuthor = ({callback}) => {
    const [author, setAuthor] = useState({name: "Felipe"});

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
        <Form onSubmit={
            (e) => {
                e.preventDefault()
            }
        }>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="name_book">Nome do livro:</Form.Label>
                <Form.Control type="text"
                    onKeyDown={handleKeyDown}
                    placeholder="Digite o nome do Livro"
                    value={
                        author.name || ''
                    }
                    onChange={
                        (evet) => {
                            setAuthor(prevState => ({
                                ...prevState,
                                name: evet.target.value
                            }))
                        }
                    }/>
            </Form.Group>
        <Button variant="primary"
            onClick={createAuthor}>
            Criar Author
        </Button>
    </Form>
    )
}
