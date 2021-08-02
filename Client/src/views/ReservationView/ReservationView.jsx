import React, { useState, useCallback, useEffect } from "react";

import {
    Typography,
    Box,
    Button,
    TextField,
    Snackbar,
    Link,
    Dialog
} from "@material-ui/core";

import Login from "../../components/Login/Login";

import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";

import { addReservation } from "../../api/reservation";
import "./ReservationView.scss";

import * as ceremonyApi from "../../api/ceremony";

const ColorButton = withStyles(() => ({
    root: {
        color: "#ffff",
        border: "1px solid #ffff",
        "&:hover": {
            backgroundColor: "#f1f1f1",
            color: "#000"
        },
        paddingBlock: 30,
        paddingInline: 60,
        margin: 30,
        fontSize: 26,
        fontWeight: 600,
        backdropFilter: "blur(2px)",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        "@media (max-width: 850px)": {
            paddingBlock: 15,
            paddingInline: 30,
            margin: 15,
            width: "100%"
        }
    }
}))(Button);

const CssTextField = withStyles({
    root: {
        width: "90%",
        "& label": {
            color: "#fff",
            fontSize: 26,
            transform: "translate(12px, 29px) scale(1)"
        },

        "& .MuiFilledInput-root": {
            backgroundColor: "rgb(0, 0, 0, 0.3)"
        },
        "& .MuiFilledInput-underline:after": {
            borderBottom: "2px solid #66ccff"
        },

        "& .MuiInputBase-input": {
            color: "#fff",
            fontSize: 32
        },
        "& label.Mui-focused": {
            color: "#fff",
            fontSize: 20
        },
        "& label.MuiInputLabel-filled": {
            color: "#fff",
            fontSize: 20
        },

        "& .MuiInput-underline:after": {
            borderBottomColor: "#fff"
        },
        "& .MuiFilledInput-underline:before": {
            borderBottom: "1px solid white"
        },
        "& .MuiFilledInput-underline-focused:before": {
            borderBottom: "1px solid red"
        }
    }
})(TextField);

const LoginDialog = ({ open, handleClose }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <Login />
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
    const [saveResponse, setSaveResponse] = useState({});

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        (async () => {
            const availableTimes = await getAvailableTimes();
            setAvailableTimes(availableTimes.data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const confirmReservation = async () => {
        try {
            const result = await addReservation({
                name: name,
                time: time,
                timeStamp: moment(),
                ceremony: ceremony.id
            });

            if (result.data.type === "success")
                setTimeout(function () {
                    window.location.reload();
                }, 2000);

            setSaveResponse({
                message: result.data.message,
                severity: result.data.type
            });
            setReservationSaved(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="Reservations">
                {ceremony && (
                    <>
                        <Typography className="CeremonyName" variant="h1">
                            {ceremony.name}
                        </Typography>

                        <div className="TimeBox">
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
                                            onClick={() => {
                                                setAddName(false);
                                                (async () => {
                                                    const availableTimes =
                                                        await getAvailableTimes();
                                                    setAvailableTimes(
                                                        availableTimes.data
                                                    );
                                                })();
                                            }}
                                        >
                                            Atras
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className="Confirm"
                                            onClick={confirmReservation}
                                        >
                                            Confirmar
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
                                                <Typography variant="h3">
                                                    {element}
                                                </Typography>
                                            ))}

                                    {availableTimes && !availableTimes.message && (
                                        <div className="TimeContainer">
                                            <Typography variant="h3">
                                                ¿En que horario usted desea
                                                participar?
                                            </Typography>
                                            <Box className="Buttons">
                                                {availableTimes.map(
                                                    (element, index) => (
                                                        <ColorButton
                                                            key={index}
                                                            disabled={
                                                                !element.available
                                                            }
                                                            onClick={() => {
                                                                timeSelected(
                                                                    element.time
                                                                );
                                                            }}
                                                        >
                                                            {element.time}
                                                        </ColorButton>
                                                    )
                                                )}
                                            </Box>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}

                {!ceremony && (
                    <Typography className="NoCeremonyErrorMessage" variant="h1">
                        Oh! no hay ceremonias :(
                    </Typography>
                )}

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
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={reservationSaved}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={saveResponse.severity}>
                    {saveResponse.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ReservationView;
