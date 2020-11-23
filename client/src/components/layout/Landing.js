import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import useWindowSize from "./useWindowSize";
import Confetti from "react-confetti";

function Landing() {
  const history = useHistory();
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return (
    <div className="container">
      <Confetti width={windowSize.width} height={windowSize.height} />
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
