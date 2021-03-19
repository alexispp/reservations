import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";

import {
  Typography,
  Box,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { white, purple } from "@material-ui/core/colors";

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#ffff",
    border: "1px solid #ffff",
    "&:hover": {
      backgroundColor: "#f1f1f1",
      color: "#000",
    },
    paddingBlock: 30,
    paddingInline: 60,
    margin: 30,
    fontSize: 26,
    fontWeight: 600,
    backdropFilter: "blur(2px)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
}))(Button);

const CssTextField = withStyles({
  root: {
    width: "90%",
    "& label": {
      color: "#fff",
      fontSize: 26,
      transform: "translate(12px, 29px) scale(1)",
    },

    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(0, 0, 0, 0.3)",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: "2px solid #66ccff",
    },

    "& .MuiInputBase-input": {
      color: "#fff",
      fontSize: 32,
    },
    "& label.Mui-focused": {
      color: "#fff",
      fontSize: 20,
    },
    "& label.MuiInputLabel-filled": {
      color: "#fff",
      fontSize: 20,
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff",
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "1px solid white",
    },
    "& .MuiFilledInput-underline-focused:before": {
      borderBottom: "1px solid red",
    },
  },
})(TextField);

function App() {
  const [addName, setAddName] = useState(true);

  const timeSelected = (time) => {
    setAddName(true);
  };

  console.log(addName);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <div className="App-body">
        {addName ? (
          <Box className="NameContainer">
            <Typography variant="h3">Complete su nombre y confirme</Typography>
            <CssTextField id="name" label="Nombre" variant="filled" />
            <Box className="NameButtons">
              <Button variant="contained" onClick={() => {}}>
                Confirmar
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setAddName(false);
                }}
              >
                Atras
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography variant="h3">
              ¿En que horario usted desea participar de la Ceremonia?
            </Typography>
            <Box className="Buttons">
              <ColorButton
                onClick={() => {
                  timeSelected("09:00hs");
                }}
              >
                09:00hs
              </ColorButton>
              <ColorButton
                onClick={() => {
                  timeSelected("11:00hs");
                }}
              >
                11:00hs
              </ColorButton>
              <ColorButton
                onClick={() => {
                  timeSelected("15:00hs");
                }}
              >
                15:00hs
              </ColorButton>
              <ColorButton
                onClick={() => {
                  timeSelected("17:00hs");
                }}
              >
                17:00hs
              </ColorButton>
              <ColorButton
                onClick={() => {
                  timeSelected("19:00hs");
                }}
              >
                19:00hs
              </ColorButton>
            </Box>
          </>
        )}
      </div>

      <footer></footer>
    </div>
  );
}

export default App;
