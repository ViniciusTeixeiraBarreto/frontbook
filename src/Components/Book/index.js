import { books } from "../../Api";
import { useState } from "react";

import {
    Button,
    Form,
    CloseButton,
    ListGroup
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export const CreateForm = ({ callback, authorList }) => {
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
                    } />
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
                    } />
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
                    { marginTop: 10 }
                }>
                Criar livro
            </Button>
        </Form>
    )
}

export const List = ({ data: booksList, callback }) => {
    async function remove(id) {
        await books.delete(id);
        callback();
    }

    const columns = [
        {
            dataField: "name",
            text: "Nome do Livro",
            sort: true
        }, {
            formatter: (cell, row, rowIndex, formatExtraData) => {
                let autores = ''
                row.authors.map((author) => autores += author.name + "; " )
                autores= autores.slice(0, -2)
                return (
                    <p>{autores}</p>
                );
            },
            text: "Autores"
        },
        {
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return (
                    <CloseButton style={ { float: 'right' }} onClick={ () => { remove(row.id) } }></CloseButton>
                );
            },
            text: "Acoes"
        }
    ];

    // 

    return (
        <div style={{ marginTop: 20 }}>
            <h4>Lista de Livros</h4>
            <div className="App">
                <BootstrapTable bootstrap4 keyField="id"
                    data={booksList}
                    columns={columns}
                    pagination={
                        paginationFactory({ sizePerPage: 5 })
                    } />
            </div>
        </div>
    )
}
