import React from "react";
import loginP from "../images/loginP.png";

import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = (props) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const [loginStatus, setLoginStutus] = useState({
    inStatus: false,
    newUser: false,
    loginFail: false,
    message: "",
  });

  async function getInfo(userQuery) {
    console.log("get info");
    const res = await fetch("/getUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userQuery),
    });

    const user = await res.json();
    console.log("user get info", user);

    return user;
  }

  async function createUser(data) {
    // Default options are marked with *
    await fetch("/register", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    console.log("createUser");
  }

  const checkUserExistDB = async (data) => {
    const dbuser = await getInfo(data);

    /*if new user*/

    if (dbuser.length === 0) {
      createUser(data);
      console.log("user created");
      setLoginStutus({
        ...loginStatus,
        inStatus: true,
        newUser: true,
      });
      console.log("first");
      props.history.push({
        pathname: "/Register",
      });
      localStorage.setItem("current-user", JSON.stringify(state));
    } else if (
      /*user found in db and match password and email*/
      dbuser[0].first === state.firstName &&
      dbuser[0].password === state.password
    ) {
      setLoginStutus({
        ...loginStatus,
        inStatus: true,
      });
      props.history.push({
        pathname: "/partyPage",
        state,
      });
      console.log("nextPage");

      localStorage.setItem("current-user", JSON.stringify(state));
    } else {
      setLoginStutus({
        ...loginStatus,
        loginFail: true,
      });
      console.log("last");
    }

    console.log("login Status", loginStatus);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    // props.history.push({
    //   pathname: "/partyPage",
    //   state,
    // });
    checkUserExistDB(state);
    // createUser(state);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //put functions up here. Like consts that put it in return
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <img
              src={loginP}
              height="600"
              width="1200"
              crop="fill"
              className="img-fluid"
              alt="login party"
            />
          </div>

          <div className="col-4">
            <h1
              style={{
                color: "black",
                fontWeight: "bold",
                fontFamily: "Georgia",
              }}
            >
              <br />
              Login <br />
              <br />
            </h1>
            <Form className="register-form" onSubmit={handleOnSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Passord</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="dark" type="submit">
                Log in
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
