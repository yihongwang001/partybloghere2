import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

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

function SingleParty(props) {
  const [parties, setParties] = useState([]);
  const history = useHistory();

  const { register, handleSubmit } = useForm();
  const getParties = async () => {
    try {
      const parties = await fetch("/party/parties").then((res) => res.json());

      setParties(parties);
    } catch (err) {
      console.log("error ", err);
    }
  };
  // hello
  useEffect(() => {
    getParties();
  }, []); // Only run the first time

  const renderUserParties = () => {
    return parties
      .filter((p) => p._id && p._id === props.id)
      .map((p) => (
        <div className="card-deck">
          <Card style={{ width: "20rem", margin: "2rem" }} key={p._id}>
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
                <span className="btn btn-dark">Cost ${p.cost}</span>
              </CardSubtitle>

              <CardText>{p.dest}</CardText>

              <Button color="dark" href={p.web}>
                Party here !
              </Button>
            </CardBody>

            <CardFooter className="text">
              Created by {p.authorLastName}, {p.authorFirstName}
            </CardFooter>
          </Card>
        </div>
      ));
  };

  function seeComments() {
    console.log("commentsection");
    return parties
      .filter((p) => p._id && p._id === props.id)
      .map((p) => (
        <div
          className="media-body p-2 shadow-sm rounded bg-light border"
          key={p._id}
        >
          {p.commentList.map((commentNum) => (
            <div>
              <dl>
                <dt>{commentNum.comment}</dt>
                <dd>
                  - {commentNum.firstName}, {commentNum.lastName}
                </dd>
              </dl>
            </div>
          ))}
        </div>
      ));
  }

  async function postComment(data) {
    // Default options are marked with *
    await fetch("/party/comment", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  }

  const onSubmit = async (data) => {
    data["_id"] = props.id;
    postComment(data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-7">
          {renderUserParties()}
          {seeComments()}
        </div>
        <div className="col-sm-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Leave a comment</h1>

            <label>
              First Name
              <br />
              <input
                type="text"
                name="authorFirstName"
                required
                ref={register}
              />
              <br />
            </label>
            <label>
              Last Name
              <br />
              <input
                type="text"
                name="authorLastName"
                required
                ref={register}
              />
              <br />
            </label>
            <label>
              Comment
              <br />
              <input type="text" name="comment" required ref={register} />
              <br />
            </label>
            <br />
            <input className="btn btn-dark" type="submit" />
          </form>
          <br />
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => history.push("/partyPage")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleParty;
