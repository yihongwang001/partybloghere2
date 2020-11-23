import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import SingleParty from "./singleParty";
import textbox from "./textbox.css";
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
        <Card style={{ margin: "2rem" }} key={p._id}>
          <CardImg
            top
            width="100%"
            height="40%"
            src={p.image}
            className="card-img-top"
            alt="party image"
          />

          <CardBody>
            <CardTitle>
              <strong>
                <p>{p.name}</p>
              </strong>
            </CardTitle>

            <CardSubtitle>
              <span className="btn btn-outline-dark">Cost ${p.cost}</span>
            </CardSubtitle>

            <CardText>{p.dest}</CardText>

            <Button color="success" className="btn btn-dark mr-1" href={p.web}>
              Party here !
            </Button>
            <Button
              className="btn btn-secondary mr-1"
              onClick={() => {
                setShowComments(true);
                setShow(false);
                setShowUser(false);
                setId(p._id);
                console.log("id", id);
              }}
            >
              Comments{" "}
              <span className="badge badge-light">{p.commentList.length}</span>
            </Button>
          </CardBody>

          <CardFooter className="text-muted">
            Created by {p.authorLastName}, {p.authorFirstName}
          </CardFooter>
        </Card>
        // </div>
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
        <Card style={{ margin: "2rem" }} key={p._id}>
          <CardImg
            top
            width="100%"
            height="40%"
            src={p.image}
            className="card-img-top"
            alt="party image"
          />

          <CardBody>
            <CardTitle>
              <strong>
                <p>{p.name}</p>
              </strong>
            </CardTitle>

            <CardSubtitle>
              <span className="btn btn-outline-black">Cost ${p.cost}</span>
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
              className="btn btn-secondary mr-1"
              onClick={() => {
                setShowComments(true);
                setShow(false);
                setShowUser(false);
                setId(p._id);

                console.log("id", id);
              }}
            >
              Comments{" "}
              <span className="badge badge-light">{p.commentList.length}</span>
            </Button>
          </CardBody>

          <CardFooter className="text">
            Create by {p.authorLastName}, {p.authorFirstName}
          </CardFooter>
        </Card>
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
                className="btn btn-info mr-2"
                onClick={(evt) => {
                  evt.preventDefault();
                  setShow(true);
                  setShowUser(false);
                  setShowComments(false);
                }}
              >
                <h1>
                  <span className="badge badge-info">Home</span>
                </h1>
              </button>
            </li>
            <li class="nav-item">
              <button
                type="button"
                className="btn btn-info mr-2"
                onClick={(evt) => {
                  evt.preventDefault();
                  setShow(false);
                  setShowUser(true);
                  setShowComments(false);
                }}
              >
                <h1>
                  <span className="badge badge-info">My Posts</span>
                </h1>
              </button>
            </li>
            <li class="nav-item">
              <button
                type="button"
                className="btn btn-info mr-2"
                onClick={() => history.push("/newVenue")}
              >
                <h1>
                  <span className="badge badge-info">Share New Places</span>
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
        <div>
          <div class="row">
            <p>
              Please enjoy finding your next party. Click on User HomePage to
              find the parties you have listed. Select Main Page to see all the
              parties. In the upper left you can add a new party by clicking on
              the button. If your looking for a specific place, please use the
              Search bar in the upper right. Finally, feel free to share your
              opinions on these party places if you have been to them by
              clicking the comment button on any of the places.
            </p>
          </div>
        </div>

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
