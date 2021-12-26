import React, { useEffect, useState } from "react";
import "./Form.css";

const Form = () => {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
    details: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // uploading data to fake josn server
  const handelSubmit = (e) => {
    e.preventDefault();
    setErrors(checkForm(formValues));
    setIsSubmit(true);

    // uploading data

    const users = formValues;

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    }).then(() => {
      console.log("new user added");
    });
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [errors]);

  // handling errors
  const checkForm = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "Firstname is required";
    }
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Not Valid Email";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required";
    }
    if (!values.message) {
      errors.message = "Message  is required";
    }

    return errors;
  };

  return (
    <div className="form">
      <div className="form_container">
        <div className="contact_us">
          <h1>Contact Us</h1>
        </div>

        <div className="form_detail">
          <form onSubmit={handelSubmit}>
            <label>Firstname</label>
            <input
              placeholder="Firstname"
              name="firstname"
              type="text"
              value={formValues.firstname}
              onChange={handelChange}
              required
            />
            <p>{errors.firstname}</p>
            <label>Lastname</label>
            <input
              placeholder="Lastname"
              type="text"
              name="lastname"
              value={formValues.lastname}
              onChange={handelChange}
              required
            />
            <p>{errors.lastname}</p>
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formValues.email}
              onChange={handelChange}
              required
            />
            <p>{errors.email}</p>
            <label>Message</label>
            <textarea
              placeholder="Message"
              name="message"
              type="message"
              value={formValues.message}
              onChange={handelChange}
              required
            />
            <p>{errors.message}</p>
            <label>Aditional Details</label>
            <input
              name="Additional Details"
              placeholder="Additional Details"
              value={formValues.details}
              onChange={handelChange}
              required
            />
            <div className="btn">
              <button>Submit</button>
            </div>
            <p>See data</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
