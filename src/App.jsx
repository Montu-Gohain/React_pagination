import { useQuery } from "react-query";
import "./App.css";
import axios from "axios";
import { useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

const fetchTodos = () => {
  return axios.get(BASE_URL).then((res) => res.data);
};

const App = () => {
  const { data, isLoading, isError } = useQuery("todos", fetchTodos);
  const [todos_per_page, setTodos_per_page] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something went wrong.</h1>;
  // console.log(data);

  // Todo : Let's handle the todosper page

  const number_of_total_pages = data.length / todos_per_page;

  const pages = [...Array(number_of_total_pages + 1).keys()].slice(1);

  const last_index_todo = currentPage * todos_per_page;
  const first_index_todo = last_index_todo - todos_per_page;

  const visible_todos = data.slice(first_index_todo, last_index_todo);

  const handlePreviousPage = () => {
    if (currentPage != 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage != number_of_total_pages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="App">
      <h1>Pagination in React</h1>
      <div className="selector">
        <div className="page_no">
          <button onClick={handlePreviousPage}>previous</button>
          {pages.map((thispage) => (
            <span
              key={thispage}
              onClick={() => setCurrentPage(thispage)}
              className={`${currentPage === thispage ? "active" : ""}`}
            >
              {thispage}
            </span>
          ))}
          <button onClick={handleNextPage}>next</button>
        </div>
        <select onClick={(e) => setTodos_per_page(e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="todos-container">
        {visible_todos?.map((todo) => {
          return <p key={todo.id}>{todo.title}</p>;
        })}
      </div>
    </div>
  );
};

export default App;
