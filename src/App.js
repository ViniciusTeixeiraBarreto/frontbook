import {books, authors} from "./Api";
import {useState, useEffect} from "react";

import {Container, Row, Tab, Tabs} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import {List as BookList, CreateForm as BookForm} from "./Components/Book"
import {List as AuthorList, CreateForm as AuthorForm} from "./Components/Author"


import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


// eslint-disable-next-line import/no-anonymous-default-export
export default() => {
    const [bookData, setBookData] = useState([]);
    const [authorData, setAuthorData] = useState([]);

    async function fetchAll() {
        const responseBook = await books.index();
        setBookData(responseBook)
        const responseAuthor = await authors.index();
        setAuthorData(responseAuthor)
    }

    useEffect(() => {
        fetchAll();
    }, [])


    function productsGenerator(quantity) {
        const items = [];
        for (let i = 0; i < quantity; i++) {
            items.push({
                id: i,
                name: `Item name ${i}`,
                price: 2100 + i
            });
        }
        return items;
    };

    const products = productsGenerator(100);

    const columns = [
        {
            dataField: "id",
            text: "Product ID",
            sort: true
        }, {
            dataField: "name",
            text: "Product Name",
            sort: true
        }, {
            dataField: "price",
            text: "Product Price"
        }
    ];


    return (
        <Container>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Livro">
                    <Row>
                        <BookForm callback={fetchAll}
                            authorList={authorData}></BookForm>
                    </Row>
                    <Row>
                        <BookList data={bookData}
                            callback={fetchAll}></BookList>
                    </Row>
                </Tab>
                <Tab eventKey="profile" title="Autor">
                    <Row>
                        <AuthorForm callback={fetchAll}></AuthorForm>
                    </Row>
                    <Row>
                        <AuthorList data={authorData}
                            callback={fetchAll}></AuthorList>
                    </Row>
                </Tab>
                <Tab eventKey="contact" title="+18" disabled>
                    Tab content for Contact
                </Tab>
            </Tabs>
            <Row>
                <div className="App">
                    <BootstrapTable bootstrap4 keyField="id"
                        data={products}
                        columns={columns}
                        pagination={
                            paginationFactory({sizePerPage: 5})
                        }/>
                </div>
            </Row>

        </Container>
    );
}
