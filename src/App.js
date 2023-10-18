import './App.css';

import { books } from "./Api";
import { useEffect, useState } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => { 
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetchBooks()
  }, []);

  async function fetchBooks() {
    const response = await books.index();
      setBookList(response)
  }


  async function createBook() {

    const name = "livro"
    const description = "livro"
    const medium_price = 10
    const img_url = ""


    const response = await books.create({name,description,medium_price,img_url});
    console.log(response)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Ola Vinicius
        </p>
        <button onClick={createBook}>
          Criar livro
        </button>

        {bookList.map((data) => (
            <p key={data.id}>
              
              {data.name}
            </p>
        ))}
      </header>
    </div>
  );
}
