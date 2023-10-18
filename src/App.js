import './App.css';

import { books } from "./Api";
import { useEffect, useState } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => { 
  const [bookList, setBookList] = useState([]);
  const [book, setBook] = useState({
    name : "Livro 1",
    description: "Descricao ",
    medium_price : 0,
    img_url: ""
  });

  function updateBook(obj){
    console.log(obj)
    setBook(obj)
  }

  async function fetchBooks() {
    const response = await books.index();
    setBookList(response)
  }


  async function createBook() {
    await books.create(book);
    fetchBooks()
  }

  async function deleteBook(id) {
    await books.delete(id);
    fetchBooks()
  }

  return (
    <div className="App">
        <p>
          Ola Vinicius
        </p>
        <form>
          <label htmlFor="name_book">Nome do livro:</label><br/>
          <input value={book.name || ''} type='text' id="name_book" name="name_book" 
          onChange={(evet) =>{ 
              setBook(prevState => (
                {                  
                    ...prevState,
                    name: evet.target.value
                }
            ))
          }} ></input><br/>
          <label htmlFor="description_book">Descricao do livro:</label><br/>
          <input value={book.description || ''} type='text' id="description_book" name="description_book"  
            onChange={(evet) =>{ 
              setBook(prevState => (
                {                  
                    ...prevState,
                    description: evet.target.value
                }
            ))}}
          ></input><br/>
        </form>

        <button onClick={createBook}>
          Criar livro
        </button>

        {bookList.map((data) => (
            <p key={data.id}>
              
              {data.name}

              <button onClick={() => { deleteBook(data.id)}}>X</button>
            </p>
        ))}
    </div>
  );
}
