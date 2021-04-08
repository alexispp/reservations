import React, { useState, useCallback, useEffect } from "react";

import {
  Typography,
  Box,
  Button,
  TextField,
  Snackbar,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn } from "../../store/login/loginActions";

import { withStyles } from "@material-ui/core/styles";

import { addReservation } from "../../api/reservation";
import "./ReservationView.scss";

import * as ceremonyApi from "../../api/ceremony";

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

const LoginDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.authentication);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const auth = useAuth();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Iniciar sesión</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
        <form>
          <TextField
            autoFocus
            margin="dense"
            id="user"
            label="Usuario"
            fullWidth
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="password"
            label="Contraseña"
            type="password"
            fullWidth
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => {
            dispatch(signIn({ username, password }, history));
          }}
          color="primary"
          type="submit"
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ReservationView = (props) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [addName, setAddName] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [reservationSaved, setReservationSaved] = useState(false);
  const [ceremony, setCeremony] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  const getLastCeremony = useCallback(async () => {
    const cer = await ceremonyApi.getLastCeremony();
    return cer;
  }, []);

  const getAvailableTimes = useCallback(async () => {
    const times = ceremony
      ? await ceremonyApi.getAvailableTimes(ceremony.id)
      : [];
    return times;
  }, [ceremony]);

  useEffect(() => {
    (async () => {
      const lastCeremony = await getLastCeremony();
      setCeremony(lastCeremony.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const availableTimes = await getAvailableTimes();
      setAvailableTimes(availableTimes.data);
    })();
  }, [ceremony]);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const timeSelected = (time) => {
    setAddName(true);
    setTime(time);
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setReservationSaved(false);
  };
  return (
    <>
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
        <Typography className="CeremonyName" variant="h1">
          {ceremony.name}
        </Typography>

        <div className="App-body">
          {addName ? (
            <Box className="NameContainer">
              <Typography variant="h3">
                Complete su nombre y confirme
              </Typography>
              <CssTextField
                id="name"
                label="Nombre"
                variant="filled"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Box className="NameButtons">
                <Button
                  variant="contained"
                  onClick={async () => {
                    try {
                      await addReservation({
                        name: name,
                        time: time,
                        timeStamp: moment(),
                        ceremony: ceremony.id,
                      });
                      setReservationSaved(true);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
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
              {availableTimes &&
                availableTimes.message &&
                availableTimes.message
                  .split(".")
                  .map((element) => (
                    <Typography variant="h3">{element}</Typography>
                  ))}

              {availableTimes && !availableTimes.message && (
                <Typography>
                  <Typography variant="h3">
                    ¿En que horario usted desea participar?
                  </Typography>
                  <Box className="Buttons">
                    {availableTimes.map((element, index) => (
                      <ColorButton
                        key={index}
                        disabled={!element.available}
                        onClick={() => {
                          timeSelected(element.time);
                        }}
                      >
                        {element.time}
                      </ColorButton>
                    ))}
                  </Box>
                </Typography>
              )}
            </>
          )}
        </div>

        <footer className="Footer">
          <div style={{ paddingInline: "10px" }}>Subsede Liniers</div>
          <div style={{ paddingInline: "10px" }}>
            {" "}
            <Link
              href="#"
              onClick={() => {
                setOpenLogin(true);
              }}
            >
              Iniciar sesion
            </Link>{" "}
          </div>
        </footer>
      </div>
      <LoginDialog
        open={openLogin}
        handleClose={() => {
          setOpenLogin(false);
        }}
      />

      <Snackbar
        open={reservationSaved}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReservationView;
