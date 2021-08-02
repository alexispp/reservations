import React, { useState, useCallback, useEffect } from "react";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from "@material-ui/core";
import "./CeremoniesView.scss";
import Header from "../../components/Header/Header";

import { withStyles } from "@material-ui/core/styles";

import * as ceremonyApi from "../../api/ceremony";

const CeremoniesView = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [ceremonies, setCeremonies] = useState([]);

    const getCeremonies = useCallback(async () => {
        const cer = await ceremonyApi.getAllCeremonies();
        return cer;
    }, []);

    useEffect(() => {
        (async () => {
            const resultCeremonies = await getCeremonies();
            setCeremonies(resultCeremonies.data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        <div className="ViewBody">
            <Header />
            <div className="View">
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
                                    <StyledTableCell>Fecha</StyledTableCell>
                                    <StyledTableCell>
                                        Asistentes
                                    </StyledTableCell>
                                    <StyledTableCell>Horarios</StyledTableCell>
                                    <StyledTableCell>Mostrar</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ceremonies &&
                                    (rowsPerPage > 0
                                        ? ceremonies.slice(
                                              page * rowsPerPage,
                                              page * rowsPerPage + rowsPerPage
                                          )
                                        : ceremonies
                                    ).map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {" "}
                                                {row.name}{" "}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {" "}
                                                {row.date}{" "}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {" "}
                                                {row.numberOfAssistants}{" "}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {" "}
                                                {row.timeOptions}{" "}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {" "}
                                                {row.show ? "Si" : "No"}{" "}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={ceremonies ? ceremonies.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
};

export default CeremoniesView;
