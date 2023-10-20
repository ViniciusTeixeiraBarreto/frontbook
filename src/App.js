import { books, authors } from "./Api";
import { useState, useEffect } from "react";

import { Container, Row, Tab, Tabs } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import { List as BookList, CreateForm as BookForm} from "./Components/Book"
import { List as AuthorList, CreateForm as AuthorForm} from "./Components/Author"




// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
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

  return (
    <Container>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" >
        <Tab eventKey="home" title="Livro">
          <Row>
            <BookForm callback={fetchAll} authorList={authorData}></BookForm>
          </Row>
          <Row>
            <BookList data={bookData} callback={fetchAll}></BookList>
          </Row>
        </Tab>
        <Tab eventKey="profile" title="Autor">
          <Row>
            <AuthorForm callback={fetchAll}></AuthorForm>
          </Row>
          <Row>
            <AuthorList data={authorData} callback={fetchAll}></AuthorList>
          </Row>
        </Tab>
        <Tab eventKey="contact" title="+18" disabled>
          Tab content for Contact
        </Tab>

        <Row>

          </Row>
      </Tabs>




    </Container>
  );
}
