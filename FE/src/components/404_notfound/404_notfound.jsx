import React from "react";
import "./404_notfound.css";

function NotFound() {
    return (
        <>
            <div className="col-flex-container-80">
                <div className="row-flex-container-100">
                    <div id="error-contents" className="col-flex-container">
                        <div id="main-text">
                            <div className="row-flex-container">
                                4<div id="bracket">{"{}"}</div>4
                            </div>
                        </div>
                        <h1>Something is missing</h1>
                        <p>The page you looking for is not found.</p>
                        <button id="go-home-btn">
                            <div className="row-flex-container-100">
                                <a href="/">Go to home</a>
                            </div>
                        </button>
                        <p id="or">- OR -</p>
                        <div id="dosomething">
                            <div className="row-flex-container">
                                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                    Do something fun
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;
