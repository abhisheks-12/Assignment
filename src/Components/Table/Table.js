import React, { useEffect, useState } from "react";
import "./Table.css";

const Table = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // handelPagination
  const handelPagination = (e, pageno) => {
    // console.log(pageno);
    e.preventDefault();
    setCurrentPage(pageno);
  };

  // pagination
  const dataPerPage = 4;
  const tempPages = [];
  const pageCount = Math.ceil(allUsers.length / dataPerPage);
  for (let i = 1; i <= pageCount; i++) {
    tempPages.push(i);
  }
  const firstIdx = (currentPage - 1) * dataPerPage;
  const lastIdx = firstIdx + dataPerPage;
  const tempAllusers = allUsers;
  const displayUsers = tempAllusers.slice(firstIdx, lastIdx);

  // getting data from server
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      const result = await response.json();
      setAllUsers([...result]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handelsortAsc = () => {
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
            {displayUsers
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
                    <td>{data.message}</td>
                    <td>{data.details}</td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>

        <div className="pagination_react">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              {tempPages.map((page) => (
                <li class="page-item" key={page}>
                  <a
                    class="page-link"
                    href="/"
                    onClick={(e) => handelPagination(e, page)}
                  >
                    {page}
                  </a>
                </li>
              ))}
              {/* <li class="page-item">
                <a class="page-link" href="/">
                  1
                </a>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Table;
