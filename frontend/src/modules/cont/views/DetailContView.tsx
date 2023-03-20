
import { Avatar, Box, Checkbox, FormControlLabel, FormGroup, Grid, Icon, InputAdornment, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/layout/header";
import '../../../shared/layout/styles/styles.css'
import EditIcon from "@mui/icons-material/Edit";
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import CalendarButton from "../../../shared/components/datebutton/CalendarButton";
import dayjs, { Dayjs } from 'dayjs';
import DateInput from "../../../shared/components/inputs/DateInput";
import { getContShowAction } from "../cont-actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetaryInfo from "../components/MonetaryInfo";
import { AccountingMove } from "../components/AccountingMove";
import AcctionSeat from "../components/ActionsSeat";
import HeaderSeat from "../components/HeaderSeat";
import DocumentOrigin from "../components/DocumentOrigin";

export const DetailContView = ({ idasiento }: { idasiento: string }) => {

    const dispatch = useAppDispatch();
    const selectedSeat = useAppSelector((state) => state.cont.selectedSeat)
    const loadingSelectedSeat = useAppSelector((state) => state.cont.loadingSelectedSeat)
    const [headSeat, setHeadSeat] = useState([])
    const [headDocument, setHeadDocument] = useState([])
    const [headMove, setHeadMove] = useState([])
    const navigate = useNavigate();
    const [descripcion, setDescripcion] = useState("");
    const [status, Setstatus] = useState("")
    const [value, setValue] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [dateAsiento, setDateAsiento] = React.useState<Dayjs | null>(null);
    const [dateDocumento, setDateDocumento] = React.useState<Dayjs | null>(null);


    const [month, setMonth] = React.useState(selectedDate.getMonth());
    const [year, setYear] = React.useState(selectedDate.getFullYear());


    useEffect(() => {
        // Llamada a la acción getContShowAction con el parámetro idasiento
        dispatch(getContShowAction("2990"));
    }, [idasiento, dispatch]);

    useEffect(() => {
        if (selectedSeat === null) {
            console.log("selectedSeat es nulo 3008, 2990");
        } else {
           setHeadDocument(selectedSeat.cabdocumento)
           setHeadMove(selectedSeat.detasiento)
           setHeadSeat(selectedSeat.cabasiento)
            console.log(`selectedSeat es ${selectedSeat}`, headDocument, headMove, headSeat);
        }
    }, [selectedSeat]);


    const handleDateChangeAsiento = (date: Dayjs | null) => {
        setDateAsiento(date ? dayjs(date) : null);
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setMonth(date.getMonth());
        setYear(date.getFullYear());
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcion(event.target.value);
    };
    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleEditFinish = () => {
        setIsEditMode(false);
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Header headerTitle="Codificar asiento contable: # " /* buttonAction={goBack} */ />
            <div className="my-div">

                {/*Primer Grid que dividira la pantalla en dos partes*/}
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    {/*  Parte superior que tendra la descripcion doumento origen e infromacion monetaria */}
                    <Grid item xs={6}>
                        {/* divido la parte de la informacion monetaria con la del detalle */}
                        <Grid
                            spacing={2}
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="stretch"

                        >
                            {/*  Primera Parte del Detalle*/}
                            <Grid item xs={8.5}>
                                <Grid

                                    container
                                    direction="column"
                                    justifyContent="space-around"
                                    alignItems="stretch"
                                    spacing={1}
                                >
                                    {/*Box del Detalle primeras 2 filas  */}
                                    <Grid item xs={12} sm={6} md={4}>
                                        <DocumentOrigin headSeat={headSeat} headDocument={headDocument} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* parte de la infomacion monetaria*/}
                            <Grid item xs={3.5}>
                                <MonetaryInfo amount="1000" currency="VEF" />

                            </Grid>
                        </Grid>

                    </Grid>
                    {/*  Parte inferior que que tendra los movimientos */}
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-around"
                            alignItems="stretch"
                        >

                            <Grid item xs={12} sm={6} md={4}>
                                <Box
                                    sx={{
                                        height: '48px',
                                        backgroundColor: '#0E0A2F',
                                        borderRadius: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Typography variant="h4" color="#FFFFFF" sx={{ flex: 1, display: 'flex', alignItems: 'center', marginLeft: 4 }}>
                                        <AccountBalanceIcon sx={{ marginRight: '8px' }} />
                                        Movimientos
                                    </Typography>
                                </Box>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box
                                    sx={{
                                        height: '100%',
                                        backgroundColor: '#FFFFFF',
                                    }}
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item xs={9}>
                                            <AccountingMove />

                                        </Grid>
                                        <Grid item xs={3}>
                                            <AcctionSeat />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>



                        </Grid>

                    </Grid>

                </Grid>



            </div>
        </>
    )
}