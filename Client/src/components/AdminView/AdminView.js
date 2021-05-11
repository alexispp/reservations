import moment from "moment";
import React, { useState, useCallback, useEffect } from "react";

import {
    Paper,
    GridList,
    GridListTile,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    IconButton,

} from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';


import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { Form, Formik, FieldArray } from "formik";

import AddIcon from "@material-ui/icons/Add";

import "./AdminView.scss";
import { withStyles } from "@material-ui/core/styles";

import * as ceremonyApi from "../../api/ceremony";
import * as reservationApi from "../../api/reservation";
import Header from "./Header/Header";


const AdminView = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openNewReservation, setOpenNewReservation] = useState(false);
    const [ceremonies, setCeremonies] = useState([]);
    const [reservations, setReservations] = useState([]);


    const getCeremonies = useCallback(async () => {
        const cer = await ceremonyApi.getCeremonies();
        return cer;
    }, []);

    const getReservations = useCallback(
        async (id) => await reservationApi.getReservations(id),
        []
    );

    const deleteCeremony = useCallback(
        async (id) => {
            await ceremonyApi.deleteCeremony(id);
            const newCeremonies = ceremonies.filter((c)=>c.id!==id)
            setCeremonies(newCeremonies)
        },
        []
    );

    useEffect(() => {
        (async () => {
            const resultCeremonies = await getCeremonies();
            setCeremonies(resultCeremonies.data);

        })();
    }, []);

    const NewCeremonyDialog = ({ open, handleClose }) => {
        const ceremonyTimes = [
            "09:00 HS",
            "11:00 HS",
            "15:00 HS",
            "17:00 HS",
            "19:00 HS"
        ];

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Nueva Ceremonia
                </DialogTitle>
                <Formik
                    initialValues={{
                        name: "",
                        date: null,
                        numberOfAssistants: "",
                        timeOptions: [],
                        show:true,
                    }}
                    onSubmit={async (values, actions) => {
                        await ceremonyApi.addCeremony(values);
                        const resultCeremonies = await getCeremonies();
                        setCeremonies(resultCeremonies.data);

                        handleClose(false);
                    }}
                >
                    {(props) => (
                        <DialogContent>
                            <DialogContent>
                                <Form className="Form">
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Ceremonia"
                                        value={props.values.name}
                                        onChange={props.handleChange}
                                        fullWidth
                                    />

                                    <MuiPickersUtilsProvider
                                        utils={MomentUtils}
                                    >
                                        <DatePicker
                                            id="date"
                                            name="date"
                                            label="Fecha"
                                            format="DD/MM/YYYY"
                                            value={props.values.date}
                                            onChange={(val) =>
                                                props.setFieldValue("date", val)
                                            }
                                            clearable
                                            autoOk
                                            disablePast
                                            disableToolbar
                                        />
                                    </MuiPickersUtilsProvider>

                                    <TextField
                                        id="numberOfAssistants"
                                        label="Asistentes"
                                        type="number"
                                        value={props.values.numberOfAssistants}
                                        onChange={props.handleChange}
                                        error={
                                            props.touched.email &&
                                            Boolean(props.errors.email)
                                        }
                                        helperText={
                                            props.touched.email &&
                                            props.errors.email
                                        }
                                        />

                                    <FieldArray
                                        name="timeOptions"
                                        render={(arrayHelpers) => (
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    {props.label}
                                                </FormLabel>
                                                <FormGroup className="CheckBoxes">
                                                    {ceremonyTimes.map(
                                                        (time) => {
                                                            return (
                                                                <FormControlLabel
                                                                key={time}
                                                                control={
                                                                        <Checkbox
                                                                        name={
                                                                                time
                                                                            }
                                                                            color="secondary"
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    arrayHelpers.push(time);
                                                                                } else {
                                                                                    arrayHelpers.remove(
                                                                                        arrayHelpers.form.values.timeOptions.reduce((acc,obj,index) => {
                                                                                                if (obj ===time) {
                                                                                                    acc = index;
                                                                                                }
                                                                                                return acc;
                                                                                            },0
                                                                                            )
                                                                                    );
                                                                                }   
                                                                            }}
                                                                        />
                                                                    }
                                                                    labelPlacement="end"
                                                                    label={time}
                                                                    />
                                                                    );
                                                        }
                                                    )}
                                                </FormGroup>
                                            </FormControl>
                                        )}
                                    />

<FormControlLabel
        control={
          <Checkbox
            checked={props.values.show}
            onChange={props.handleChange}
            name="show"
            color="primary"
          />
        }
        label="Mostrar"
      />



                                </Form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancelar
                                </Button>
                                <Button
                                    color="primary"
                                    type="submit"
                                    onClick={props.submitForm}
                                >
                                    Aceptar
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    )}
                </Formik>
            </Dialog>
        );
    };

    const onClickCeremony = async (id) => {
        const resultReservations = await getReservations(id);
        setReservations(resultReservations.data);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white
        },
        body: {
            fontSize: 14
        }
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover
            }
        }
    }))(TableRow);

    
    
    

    return (
        <>
          <Header/>  
            <div className="AdminBody">
                <Paper className="Paper CeremoniesPaper">
                    <Fab
                        className="Fab"
                        color="inherit"
                        aria-label="add"
                        onClick={() => setOpenNewReservation(true)}
                    >
                        <AddIcon />
                    </Fab>

                    {ceremonies && ceremonies.length>0? ( 
                        <div className="CeremoniesGridListRoot">
                                <GridList className="CeremoniesGridList">
                                    {ceremonies.map((ceremony, index) => {
                                        return (
                                            <GridListTile key={index}>
                                                <Paper
                                                    className={`PaperCeremony ${!ceremony.show?'NotShow':''}`}
                                                    
                                                    onClick={() => {
                                                        onClickCeremony(
                                                            ceremony.id
                                                        );
                                                    }}
                                                >
                                                <IconButton className="DeleteButton" aria-label="delete" onClick={()=>{deleteCeremony(ceremony.id)}}>
                                                    <DeleteIcon style={{ fontSize: 15 }}/>
                                                </IconButton>
                                                    <div className='PaperCeremonyData' >
                                                        <Typography variant="h5">
                                                            {ceremony.name}
                                                        </Typography>
                                                        <Typography variant="h6">
                                                            {moment(
                                                                ceremony.date
                                                            ).format("DD/MM/YYYY")}
                                                        </Typography>
                                                        <div>
                                                            Mostrar: {ceremony.show?'Si':'No'}
                                                        </div>
                                                        <div>
                                                            Cantidad de Asistentes:{" "}
                                                            {
                                                                ceremony.numberOfAssistants
                                                            }
                                                        </div>
                                                        <div>
                                                            Horarios:{" "}
                                                            {JSON.stringify(
                                                                ceremony.timeOptions
                                                            )
                                                                .replaceAll('"', "")
                                                                .replaceAll(
                                                                    "\\",
                                                                    ""
                                                                )
                                                                .replace("[", "")
                                                                .replace("]", "")}
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </GridListTile>
                                        );
                                    })}
                                </GridList>
                        </div>
                        ):
                    <Typography variant="h5">No hay próximas ceremonias</Typography>}
                </Paper>
                <Paper className="Paper TablePaper">
                    <TableContainer component={Paper}>
                        <Table
                            stickyHeader
                            aria-label="sticky table"
                            className="ReservationsTable"
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Nombre</StyledTableCell>
                                    <StyledTableCell align="right">
                                        Horario
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reservations &&
                                    (rowsPerPage > 0
                                        ? reservations.slice(
                                              page * rowsPerPage,
                                              page * rowsPerPage + rowsPerPage
                                          )
                                        : reservations
                                    ).map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {row.time}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={reservations ? reservations.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <div className="AdminFooter"></div>

            <NewCeremonyDialog
                open={openNewReservation}
                handleClose={(exit) => {
                    setOpenNewReservation(false);
                }}
            />
        </>
    );
};

export default AdminView;
