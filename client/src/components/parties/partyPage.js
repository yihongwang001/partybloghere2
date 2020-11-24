import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import SingleParty from "./singleParty";

import "./textbox.css";
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";
import { ResponsiveEmbed } from "react-bootstrap";
function Party(props) {
  const [show, setShow] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [id, setId] = useState("");
  const history = useHistory();
  const [parties, setParties] = useState([]);
  const { firstName, lastName } =
    (props.location && props.location.state) || {};
  const [search, setSearch] = useState("");

  const firstNameVariable = { firstName };
  const lastNameVariable = { lastName };

  const getParties = async () => {
    console.log("getting posts");
    try {
      const parties = await fetch("/party/parties").then((res) => res.json());
      console.log("got posts", parties);
      setParties(parties);
    } catch (err) {
      console.log("error ", err);
    }
  };

  useEffect(() => {
    getParties();
  }, []); // Only run the first time

  const renderParties = () => {
    return parties
      .filter((p) => p.name && p.name.startsWith(search))
      .map((p) => (
        // <div className="card">
        <div class="container">
          <div class="card-columns">
            <Card
              style={{ height: "620px", width: "20rem", margin: "1rem" }}
              key={p._id}
            >
              <CardImg
                top
                style={{ height: "200px" }}
                src={p.image}
                className="card-img-top"
                alt="party image"
              />

              <CardBody style={{ height: "350px" }}>
                <CardTitle>
                  <strong>
                    <p>{p.name}</p>
                  </strong>
                </CardTitle>

                <CardSubtitle>
                  <span className="btn btn-dark">Cost ${p.cost}</span>
                </CardSubtitle>

                <CardText>{p.dest}</CardText>

                <Button
                  color="success"
                  className="btn btn-dark mr-1"
                  href={p.web}
                >
                  Party here !
                </Button>
                <Button
                  className="btn btn-dark mr-1"
                  onClick={() => {
                    setShowComments(true);
                    setShow(false);
                    setShowUser(false);
                    setId(p._id);
                    console.log("id", id);
                  }}
                >
                  Comments{" "}
                  <span className="badge badge-dark">
                    {p.commentList.length}
                  </span>
                </Button>
              </CardBody>

              <CardFooter className="text">
                Created by {p.authorLastName}, {p.authorFirstName}
              </CardFooter>
            </Card>
          </div>
        </div>
      ));
  };

  // && p.authorLastName && p.authorFirstName === (lastNameVariable.lastName)
  const renderUserParties = () => {
    return parties
      .filter(
        (p) =>
          p.authorFirstName &&
          p.authorFirstName === firstNameVariable.firstName &&
          p.authorLastName &&
          p.authorLastName === lastNameVariable.lastName
      )
      .map((p) => (
        <div class="container">
          <div class="rows">
            <Card
              style={{ height: "620px", width: "20rem", margin: "1rem" }}
              key={p._id}
            >
              <CardImg
                top
                style={{ height: "200px" }}
                src={p.image}
                className="card-img-top"
                alt="party image"
              />

              <CardBody style={{ height: "350px" }}>
                <CardTitle>
                  <strong>
                    <p>{p.name}</p>
                  </strong>
                </CardTitle>

                <CardSubtitle>
                  <span className="btn btn-dark">Cost ${p.cost}</span>
                </CardSubtitle>

                <CardText>{p.dest}</CardText>

                <Button
                  color="dark"
                  className="btn btn-primary mr-1"
                  href={p.web}
                  aria-label="read more about this post"
                >
                  Party here !
                </Button>
                <Button
                  className="btn btn-dark mr-1"
                  onClick={() => {
                    setShowComments(true);
                    setShow(false);
                    setShowUser(false);
                    setId(p._id);

                    console.log("id", id);
                  }}
                >
                  Comments{" "}
                  <span className="badge badge-dark">
                    {p.commentList.length}
                  </span>
                </Button>
              </CardBody>

              <CardFooter className="text">
                Create by {p.authorLastName}, {p.authorFirstName}
              </CardFooter>
            </Card>
          </div>
        </div>
      ));
  };

  return (
    <main>
      <div className="container">
        <nav class="navbar navbar-expand-xl  sticky-top">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <button
                type="button"
                className="btn  mr-2"
                onClick={(evt) => {
                  evt.preventDefault();
                  setShow(true);
                  setShowUser(false);
                  setShowComments(false);
                }}
              >
                <h1>
                  <span className="badge badge-dark">Home</span>
                </h1>
              </button>
            </li>
            <li class="nav-item">
              <button
                type="button"
                className="btn  mr-2"
                onClick={(evt) => {
                  evt.preventDefault();
                  setShow(false);
                  setShowUser(true);
                  setShowComments(false);
                }}
              >
                <h1>
                  <span className="badge badge-dark">My Posts</span>
                </h1>
              </button>
            </li>
            <li class="nav-item">
              <button
                type="button"
                className="btn  mr-2"
                onClick={() => history.push("/newVenue")}
              >
                <h1>
                  <span className="badge badge-dark">Share New Places</span>
                </h1>
              </button>
            </li>
          </ul>

          <ul class="navbar-nav ml-auto">
            <li class="nav-item ">
              <form className="form-inline my-2 my-lg-0">
                {" "}
                <label>
                  <h5 style={{ color: "black" }}>
                    <strong>Search here&nbsp; </strong>
                  </h5>

                  <input
                    size="25%"
                    height="100"
                    type="text"
                    placeholder="Halloween"
                    value={search}
                    onChange={(evt) => setSearch(evt.target.value)}
                  ></input>
                </label>
              </form>
            </li>
          </ul>
        </nav>
        <br />

        {show ? <div className="card-columns">{renderParties()}</div> : ""}

        {showUser ? (
          <div>
            <h2
              style={{
                color: "black",

                fontFamily: "Georgia",
                fontWeight: "bold",
              }}
            >
              Welcome {firstName} {lastName}
            </h2>

            <div className="row">{renderUserParties()}</div>
          </div>
        ) : (
          ""
        )}

        {showComments ? <SingleParty id={id}></SingleParty> : ""}
      </div>{" "}
    </main>
  );
}

export default Party;
