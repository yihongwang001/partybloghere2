import React from "react";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Logo from "../images/partypic2.png";

function NewVenue(props) {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  // const { firstName, lastName, password } =
  //   (props.location && props.location.state) || {};

  async function postData(data) {
    // Default options are marked with *
    await fetch("/party/new", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  }

  const onSubmit = async (data) => {
    postData(data);
    console.log(data);

    history.push("./partyPage");
  };
  //put functions up here. Like consts that put it in return
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-sm-7">
            <img
              src={Logo}
              height="1200"
              width="1800"
              crop="fill"
              className="img-fluid"
              alt="party pictures "
            />
          </div>

          <div className="col-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Let's have a party</h1>
              <label>
                First Name
                <br />
                <input
                  type="text"
                  class="form-control"
                  name="authorFirstName"
                  required
                  ref={register}
                />
                <br />
              </label>{" "}
            </form>{" "}
            <form>
              <label>
                Last Name
                <br />
                <input
                  type="text"
                  class="form-control"
                  name="authorLastName"
                  required
                  ref={register}
                />
                <br />
              </label>{" "}
            </form>{" "}
            <form>
              <label>
                Place Name
                <br />
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  required
                  ref={register}
                />
                <br />
              </label>{" "}
            </form>{" "}
            <form>
              <label>
                Image URL
                <br />
                <input
                  type="text"
                  class="form-control"
                  name="image"
                  required
                  ref={register}
                />
                <br />
              </label>{" "}
            </form>{" "}
            <form>
              <label>
                Cost Per Person
                <br />
                <input
                  type="number"
                  class="form-control"
                  name="cost"
                  required
                  ref={register}
                />
                <br />
              </label>
            </form>{" "}
            <form>
              <label>
                Location
                <br />
                <input
                  type="text"
                  class="form-control"
                  name="location"
                  required
                  ref={register}
                />
                <br />
              </label>
            </form>{" "}
            <form>
              <label>
                Website URL
                <br />
                <input
                  type="text"
                  class="form-control"
                  name="website"
                  ref={register}
                />
                <br />
              </label>
            </form>
            <form>
              <label>
                Description
                <br />
                <input
                  type="text"
                  class="form-control"
                  name="description"
                  required
                  ref={register}
                />
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
    </main>
  );
}

export default NewVenue;
