import { books, authors } from "./Api";
import { useState, useEffect } from "react";

import { Container, Row, Tab, Tabs } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BookElement, FormCreateBook} from "./Components/Book"
import { AuthorElement, FormCreateAuthor} from "./Components/Author"


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
