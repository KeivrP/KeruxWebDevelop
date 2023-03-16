
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
import MonetaryInfo from "./MonetaryInfo";
import { AccountingMove } from "./AccountingMove";
import AcctionSeat from "./ActionsSeat";

export const DetailContView = ({ iddoc }: { iddoc: string }) => {

    const dispatch = useAppDispatch();
    const selectedSeat = useAppSelector((state) => state.cont.selectedSeat)
    const loadingSelectedSeat = useAppSelector((state) => state.cont.loadingSelectedSeat)
    const navigate = useNavigate();
    const [descripcion, setDescripcion] = useState("");
    const [status, Setstatus] = useState("")
    const [value, setValue] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [dateAsiento, setDateAsiento] = React.useState<Dayjs | null>(null);
    const [dateDocumento, setDateDocumento] = React.useState<Dayjs | null>(null);

    console.log(dateAsiento)

    const [month, setMonth] = React.useState(selectedDate.getMonth());
    const [year, setYear] = React.useState(selectedDate.getFullYear());


    useEffect(() => {
        // Llamada a la acción getContShowAction con el parámetro iddoc
        dispatch(getContShowAction("4514"));
    }, [iddoc, dispatch]);

    useEffect(() => {
        if (selectedSeat === null) {
            console.log("selectedSeat es nulo");
        } else {
            setDateAsiento(dayjs(selectedSeat.fecasiento))
            //setDateDocumento(dayjs(selectedSeat.fea))
            setDescripcion(selectedSeat.descasiento)
            Setstatus(selectedSeat.stsasiento)

            console.log(`selectedSeat es ${selectedSeat}`);
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
            <Header headerTitle="Codificar aseinto contable: # " buttonAction={goBack} />
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
                            <Grid item xs={9}>
                                <Grid
                                    mt={1}
                                    container
                                    direction="column"
                                    justifyContent="space-around"
                                    alignItems="stretch"
                                    spacing={1}
                                >
                                    {/*Box del Detalle primeras 2 filas  */}
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Box
                                            sx={{

                                                height: '20vh',
                                                backgroundColor: '#FFFFFF',
                                                boxShadow: 2,
                                                borderRadius: 1.5

                                            }}>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={2}
                                                marginLeft={1}

                                            >
                                                {/* Descripcion y prueba */}
                                                <Grid item xs={7.5}>
                                                    <TextField
                                                        sx={{ width: '100%' }}
                                                        label="Descripción"
                                                        variant="standard"
                                                        value={descripcion}
                                                        onChange={handleInputChange}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    {!isEditMode && (
                                                                        <EditIcon
                                                                            onClick={handleEditClick}
                                                                            style={{ cursor: "pointer" }}
                                                                        />
                                                                    )}
                                                                    {isEditMode && (
                                                                        <EditIcon
                                                                            onClick={handleEditFinish}
                                                                            style={{ cursor: "pointer" }}
                                                                        />
                                                                    )}
                                                                </InputAdornment>
                                                            ),
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        sx={{ width: '100%' }}
                                                        id="standard-read-only-input"
                                                        label="Estatus"
                                                        value={status}
                                                        InputProps={{
                                                            readOnly: true,
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                        variant="standard"
                                                    />

                                                </Grid>
                                                <Grid item xs={1.5}>

                                                </Grid>
                                                <Grid item xs={3} my={2} >
                                                    <TextField
                                                        sx={{ width: '30%', mr: 2 }}
                                                        label="Periodo"
                                                        id="standard-size-normal"
                                                        defaultValue={month}
                                                        variant="standard"
                                                        InputProps={{
                                                            readOnly: true,
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                    />
                                                    <TextField
                                                        sx={{ width: '30%' }}
                                                        label="Año"
                                                        id="standard-size-normal"
                                                        defaultValue={year}
                                                        variant="standard"
                                                        InputProps={{
                                                            readOnly: true,
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                    />
                                                    <CalendarButton selectedDate={selectedDate} onChange={handleDateChange} />

                                                </Grid>
                                                <Grid item xs={3} my={2} >
                                                    <DateInput
                                                        label="Fecha de Asiento"
                                                        value={dateAsiento}
                                                        onChange={handleDateChangeAsiento}

                                                    />

                                                </Grid>
                                                <Grid item xs={3} my={2}>
                                                    <DateInput
                                                        label="Fecha del Documento"
                                                        value={dateDocumento}
                                                        onChange={handleDateChangeAsiento}

                                                    />

                                                </Grid>
                                                <Grid item xs={1}>

                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    {/*Parte de Documento origen */}
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
                                                <DeviceHubIcon sx={{ marginRight: '8px' }} />
                                                Documento de Origen
                                            </Typography>
                                        </Box>

                                    </Grid>
                                    {/* Detalle del documento origen */}
                                    <Grid item xs={12} sm={6} md={4} my={2}>
                                        <Box
                                            sx={{
                                                height: '20vh',
                                                backgroundColor: '#FFFFFF',
                                                boxShadow: 2,
                                                borderRadius: 1.5
                                            }}
                                        >
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-around"
                                                alignItems="center"
                                                spacing={2}
                                                marginLeft={2}

                                            >
                                                {/* Descripcion y prueba */}
                                                <Grid item xs={1.5}>
                                                    <TextField
                                                        sx={{ width: '100%', mr: 2 }}
                                                        label="Id. Doc"
                                                        id="standard-size-normal"
                                                        defaultValue={month}
                                                        variant="standard"
                                                        InputProps={{
                                                            readOnly: true,
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        sx={{ width: '30%', mr: 1 }}
                                                        id="standard-read-only-input"
                                                        label="Tipo"
                                                        value={status}
                                                        select
                                                        inputProps={{
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}

                                                        variant="standard"
                                                    />
                                                    <TextField
                                                        sx={{ width: '60%' }}
                                                        id="standard-read-only-input"
                                                        label="Tipo"
                                                        value=""

                                                        InputProps={{
                                                            readOnly: true,
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                        variant="standard"
                                                    />


                                                </Grid>
                                                <Grid item xs={3.5} >
                                                    <TextField
                                                        sx={{ width: '45%', mr: 2 }}
                                                        label="Envio"
                                                        id="standard-size-normal"
                                                        defaultValue={month}
                                                        variant="standard"
                                                        InputProps={{
                                                            readOnly: true,
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                    />
                                                    <TextField
                                                        sx={{ width: '45%' }}
                                                        label="Origen"
                                                        id="standard-size-normal"
                                                        defaultValue={year}
                                                        variant="standard"
                                                        InputProps={{
                                                            readOnly: true,
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </Grid>
                                                <Grid item xs={3} mt={1}>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox defaultChecked sx={{
                                                            //color: pink[800],
                                                            '&.Mui-checked': {
                                                                color: "#C72747"
                                                            },
                                                        }} />} label="Reverso" />

                                                    </FormGroup>
                                                </Grid>

                                                <Grid item xs={0.6} mt={1} my={2}>
                                                    <Avatar sx={{ width: 24, height: 24 }} src="/broken-image.jpg" />
                                                </Grid>
                                                <Grid item xs={2} my={2}>
                                                    <TextField
                                                        sx={{ width: '100%', }}
                                                        label="Rif/Cedula"
                                                        variant="standard"
                                                        value={descripcion}
                                                        onChange={handleInputChange}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    {!isEditMode && (
                                                                        <EditIcon
                                                                            onClick={handleEditClick}
                                                                            style={{ cursor: "pointer" }}
                                                                        />
                                                                    )}
                                                                    {isEditMode && (
                                                                        <EditIcon
                                                                            onClick={handleEditFinish}
                                                                            style={{ cursor: "pointer" }}
                                                                        />
                                                                    )}
                                                                </InputAdornment>
                                                            ),
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </Grid>
                                                <Grid item xs={6} my={2}>
                                                    <TextField
                                                        sx={{ width: '100%', }}
                                                        label="Beneficiario"
                                                        variant="standard"
                                                        value={descripcion}
                                                        onChange={handleInputChange}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    {!isEditMode && (
                                                                        <EditIcon
                                                                            onClick={handleEditClick}
                                                                            style={{ cursor: "pointer" }}
                                                                        />
                                                                    )}
                                                                    {isEditMode && (
                                                                        <EditIcon
                                                                            onClick={handleEditFinish}
                                                                            style={{ cursor: "pointer" }}
                                                                        />
                                                                    )}
                                                                </InputAdornment>
                                                            ),
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </Grid>
                                                <Grid item xs={2} my={2}>
                                                    <TextField
                                                        sx={{ width: '100%', }}
                                                        label="Id. Doc Ref"
                                                        variant="standard"
                                                        value={descripcion}
                                                        onChange={handleInputChange}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    {!isEditMode && (
                                                                        <EditIcon
                                                                            onClick={handleEditClick}
                                                                            style={{ cursor: "pointer" }}
                                                                        />
                                                                    )}
                                                                    {isEditMode && (
                                                                        <EditIcon
                                                                            onClick={handleEditFinish}
                                                                            style={{ cursor: "pointer" }}
                                                                        />
                                                                    )}
                                                                </InputAdornment>
                                                            ),
                                                            inputProps: {
                                                                style: {
                                                                    fontSize: '12px', // Tamaño de letra de 16 píxeles (16px)
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </Grid >
                                                <Grid item xs={1}>

                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>



                                </Grid>
                            </Grid>
                            {/* parte de la infomacion monetaria*/}
                            <Grid item xs={3}>
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