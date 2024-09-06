import React, { useEffect, useState } from "react";
import "./App.css"; 
const App = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setOriginalUsers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(() => {
      if (value === "") {
        setUsers(originalUsers);
      } else {
        const filteredUsers = originalUsers.filter((user) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        );
        setUsers(filteredUsers);
      }
    }, 300); 

    setSearchTimeout(timeout);
  };

 
  const handleReset = () => {
    setUsers(originalUsers);
    setSearchTerm("");
  };

  const handleDelete = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  return (
    <div className="container">
      <h1>Senwell</h1>
      <p>User Table</p>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleReset}>Reset</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
              </td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.company.name}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;