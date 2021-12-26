import React from "react";
import Form from "./Components/Form/Form";
import Table from "./Components/Table/Table";
// import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/tabel" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
