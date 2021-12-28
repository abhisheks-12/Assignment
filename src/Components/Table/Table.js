import React, { useEffect, useState } from "react";
import "./Table.css";

const Table = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [input, setInput] = useState("");
  const [allPages, setALLPages] = useState([1]);

  const getData = async () => {
    const response = await fetch("http://localhost:8000/users");
    const result = await response.json();
    setAllUsers([...result]);
  };

  useEffect(() => {
    getData();
    // console.log(allUsers);
  }, []);

  const handelsortAsc = () => {
    // console.log("Hello");
    const tempArr = allUsers;
    const sortedData = tempArr.sort((a, b) => {
      return a.id - b.id;
    });
    // console.log(sortedData);
    setAllUsers([...sortedData]);
  };

  const handelSortDsc = () => {
    const tempArr = allUsers;
    const sortedData = tempArr.sort((a, b) => {
      return b.id - a.id;
    });
    // console.log(sortedData);
    setAllUsers([...sortedData]);
  };

  return (
    <div className="all_data">
      <div className="input-group mb-3">
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="search...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="user_tabel">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                <i class="fas fa-sort-up" onClick={handelsortAsc} />
                Sr.No
                <i class="fas fa-sort-down" onClick={handelSortDsc} />
              </th>
              <th scope="col">Name</th>
              <th scope="col">Lastname</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
              <th scope="col">Details</th>
            </tr>
          </thead>

          <tbody>
            {allUsers
              .filter((items) => {
                if (input === "") {
                  return items;
                } else if (
                  items.firstname.toLowerCase().includes(input.toLowerCase())
                ) {
                  return items;
                }
              })
              .map((data) => (
                <>
                  <tr key={data.id}>
                    {/* <th scope="row">1</th> */}
                    <td>{data.id}</td>
                    <td>{data.firstname}</td>
                    <td>{data.lastname}</td>
                    <td>{data.email}</td>
                    <td>{data.msg}</td>
                    <td>{data.details}</td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="/">
                Previous
              </a>
            </li>

            {allPages.map((data) => (
              <li class="page-item">
                <a class="page-link" href="/">
                  {data}
                </a>
              </li>
            ))}

            <li class="page-item">
              <a class="page-link" href="/">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;
