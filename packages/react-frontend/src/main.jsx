// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp"
import "./main.css";

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<MyApp />);

// MyApp is the parent, Form and Table are the children
// MyApp passes down characters as a prop named characterData to Table, passes down removeOneCharacter as a prop named removeCharacter to Table
// MyApp passes down updateList as a prop named handleSubmit to Forms
// MyApp handles the characters state
// Form handles the person state
// When the user types into the name and job fields, handleChange is called
// When the user clicks on the submit button, submitForm is called which calls handleSubmit from MyApp (Function from the parent passed down as a prop)
// When the user clicks delete, removeCharacter is called from MyApp (Function from the parent passed down as a prop)