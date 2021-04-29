import moment from "moment";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
} from "@material-ui/core";

import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { Form, Formik, FieldArray } from "formik";

import AddIcon from "@material-ui/icons/Add";

import "./AdminView.scss";
import { withStyles } from "@material-ui/core/styles";

import * as ceremonyApi from "../../api/ceremony";
import * as reservationApi from "../../api/reservation";

import { signOut } from "../../store/login/loginActions";

const NewCeremonyDialog = ({ open, handleClose }) => {
  const ceremonyTimes = [
    "09:00 HS",
    "11:00 HS",
    "15:00 HS",
    "17:00 HS",
    "19:00 HS",
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Nueva Ceremonia</DialogTitle>
      <Formik
        initialValues={{
          name: "",
          date: null,
          numberOfAssistants: "",
          timeOptions: [],
        }}
        onSubmit={(values, actions) => {
          ceremonyApi.addCeremony(values);
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

                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    id="date"
                    name="date"
                    label="Fecha"
                    format="DD/MM/YYYY"
                    value={props.values.date}
                    onChange={(val) => props.setFieldValue("date", val)}
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
                  error={props.touched.email && Boolean(props.errors.email)}
                  helperText={props.touched.email && props.errors.email}
                />

                <FieldArray
                  name="timeOptions"
                  render={(arrayHelpers) => (
                    <FormControl component="fieldset">
                      <FormLabel component="legend">{props.label}</FormLabel>
                      <FormGroup className="CheckBoxes">
                        {ceremonyTimes.map((time) => {
                          return (
                            <FormControlLabel
                              key={time}
                              control={
                                <Checkbox
                                  name={time}
                                  color="secondary"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      arrayHelpers.push(time);
                                    } else {
                                      arrayHelpers.remove(
                                        arrayHelpers.form.values[
                                          props.name
                                        ].reduce((acc, obj, index) => {
                                          if (obj === time) {
                                            acc = index;
                                          }
                                          return acc;
                                        }, 0)
                                      );
                                    }
                                  }}
                                />
                              }
                              labelPlacement="end"
                              label={time}
                            />
                          );
                        })}
                      </FormGroup>
                    </FormControl>
                  )}
                />
              </Form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button color="primary" type="submit" onClick={props.submitForm}>
                Aceptar
              </Button>
            </DialogActions>
          </DialogContent>
        )}
      </Formik>
    </Dialog>
  );
};

const AdminView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  useEffect(() => {
    (async () => {
      const resultCeremonies = await getCeremonies();
      setCeremonies(resultCeremonies.data);
    })();
  }, []);

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
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  return (
    <>
      <div className="AdminHeader">
        <div className="AdminHeaderPanel">
          <span>Ceremonias PL - Panel de Administración</span>

          <div>
            {/* <p>Usuario: Admin</p> */}

            <span
              onClick={() => {
                dispatch(signOut(history));
              }}
            >
              Cerrar Sesión
            </span>
          </div>
        </div>
      </div>
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
          <div className="CeremoniesGridListRoot">
            {ceremonies && (
              <GridList className="CeremoniesGridList">
                {ceremonies.map((ceremony, index) => {
                  return (
                    <GridListTile key={index}>
                      <Paper
                        className="PaperCeremony"
                        onClick={() => {
                          onClickCeremony(ceremony.id);
                        }}
                      >
                        <div className="PaperCeremonyData">
                          <Typography variant="h5">{ceremony.name}</Typography>
                          <Typography variant="h6">
                            {moment(ceremony.date).format("DD/MM/YYYY")}
                          </Typography>
                          <div>
                            Cantidad de Asistentes:{" "}
                            {ceremony.numberOfAssistants}
                          </div>
                          <div>
                            Horarios:{" "}
                            {JSON.stringify(ceremony.timeOptions)
                              .replaceAll('"', "")
                              .replaceAll("\\", "")
                              .replace("[", "")
                              .replace("]", "")}
                          </div>
                        </div>
                      </Paper>
                    </GridListTile>
                  );
                })}
              </GridList>
            )}
          </div>
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
                  <StyledTableCell align="right">Horario</StyledTableCell>
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
                      <StyledTableCell component="th" scope="row">
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
          if(!exit){
            (async () => {
              const resultCeremonies = await getCeremonies();
              setCeremonies(resultCeremonies.data);
          })();}
        }}
      />
    </>
  );
};

export default AdminView;
