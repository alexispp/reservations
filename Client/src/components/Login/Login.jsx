import React from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Typography,
    Container,
    makeStyles
} from "@material-ui/core";
import { Form, Formik } from "formik";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { signIn } from "../../store/login/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const schema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required")
});

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authentication);
    const history = useHistory();
    const classes = useStyles();

    const onSubmit = async (values) => {
        dispatch(
            signIn(
                {
                    username: values.email,
                    password: values.password
                },
                history
            )
        );
    };

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h4">Iniciar sesión</Typography>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    onSubmit={onSubmit}
                    validationSchema={schema}
                >
                    {(props) => (
                        <Form className="Form">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Usuario"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={props.values.email}
                                onChange={props.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={props.values.password}
                                onChange={props.handleChange}
                            />
                            {(auth.error ||
                                (props.touched.email && props.errors.email) ||
                                (props.touched.password &&
                                    props.errors.password)) && (
                                <Typography
                                    variant="body1"
                                    style={{
                                        width: "100%",
                                        textAlign: "center",
                                        color: "red"
                                    }}
                                >
                                    Usuario o contraseña incorrectos
                                </Typography>
                            )}

                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Iniciar sesión
                            </Button>
                            {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default Login;
