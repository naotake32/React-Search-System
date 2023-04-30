import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(users);
  const ref = useRef();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    setSearchQuery(users);
  }, [users]);

  // 検索機能の追加
  const handleSearch = () => {
    console.log(ref.current.value);

    // フィルタリング機能
    const query = ref.current.value.toLowerCase().trim();
    if (query === "") {
      setSearchQuery(users);
    } else {
      setSearchQuery(
        users.filter((user) => user.name.toLowerCase().includes(query))
      );
    }

    console.log(searchQuery);
  };

  return (
    <div className="App">
      <div className="main">
        <h2>Search System</h2>
        <input type="text" ref={ref} onChange={() => handleSearch()} />
        <div className="content">
          {searchQuery.map((user) => (
            <div className="box" key={user.id}>
              <h3>{user.name}</h3>
              <hr />
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;