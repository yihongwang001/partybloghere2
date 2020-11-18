import React from "react";
import { useHistory } from "react-router-dom";
import partylanding from "../images/partylanding.jpeg";

function Landing() {
  const history = useHistory();
  return (
    <div className="container">
      <nav>
        <div className="container2">
          <img
            src="https://static.toiimg.com/photo/67284007/new-year-party.jpg? width: 150%;"
            className="img-fluid"
            alt="hompage picture"
          />
        </div>
      </nav>
      <br />
      <main>
        <div className="row"></div>

        <strong>
          <h1
            className="display-5"
            style={{
              color: "black",
              fontWeight: "bold",
              fontFamily: "Georgia",
            }}
          >
            Log in to find a party
          </h1>
        </strong>

        <br />
        <button
          type="button"
          class="btn btn-dark"
          onClick={() => history.push("/login")}
        >
          Log in & Register
        </button>
        <br />
        <br />
        <br />
      </main>
    </div>
  );
}

export default Landing;
