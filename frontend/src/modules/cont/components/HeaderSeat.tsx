import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DateInput from "../../../shared/components/inputs/DateInput";
import dayjs, { Dayjs } from 'dayjs';


interface Props {
    headSeat: any;
    fecdoc: Date
    onDescripcionChange: (descripcion: string, date: Dayjs | null) => void;
}


const HeaderSeat = (props: Props) => {
    const { headSeat, fecdoc } = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const [descripcion, setDescripcion] = useState("");
    const [dateAsiento, setDateAsiento] = React.useState<Dayjs | null>(null);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDescripcion(event.target.value);
        props.onDescripcionChange(event.target.value, dateAsiento);
      }
    
      const handleDateChangeAsiento = (date: Dayjs | null) => {
        setDateAsiento(date);
        props.onDescripcionChange(descripcion, date);
      };
      

    useEffect(() => {
        if (headSeat) {
            setDescripcion(headSeat.descasiento)
        }

    }, [headSeat])

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleEditFinish = () => {
        setIsEditMode(false);
    };




    return (
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
                justifyContent="left"
                alignItems="center"
                spacing={2}
                marginLeft={1}

            >
                {/* Descripcion y prueba */}
                <Grid item xs={5}>
                    <TextField
                        sx={{ width: '100%' }}
                        label="Descripción"
                        variant="standard"
                        value={descripcion}
                        title={descripcion}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {headSeat.orgasiento === "CONT" ? (
                                        <>
                                            {!isEditMode && (
                                                <EditIcon
                                                    onClick={handleEditClick}
                                                    style={{ cursor: "pointer", fontSize: 20 }}
                                                />
                                            )}
                                            {isEditMode && (
                                                <EditIcon
                                                    onClick={handleEditFinish}
                                                    style={{ cursor: "pointer", fontSize: 20 }}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </InputAdornment>
                            ),
                            inputProps: {
                                style: {
                                    fontSize: '15px',
                                    fontWeight: 300 // Tamaño de letra de 12 píxeles (12px)
                                },
                            },
                            readOnly: headSeat.orgasiento !== "CONT",
                        }}
                        InputLabelProps={{
                            sx: {
                                fontSize: '13px',
                                transform: 'translate(0px, 4px) scale(1)'
                            }
                        }}
                    />

                </Grid>
                <Grid item xs={2}>
                    <TextField
                        sx={{ width: '100%' }}
                        id="standard-read-only-input"
                        label="Estatus"
                        value={headSeat.stsasiento}

                        variant="standard"
                        inputProps={{
                            inputProps: {
                                style: {
                                    fontSize: '15px',
                                    fontWeight: 300 // Tamaño de letra de 12 píxeles (12px)
                                },
                            },
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            sx: {
                                fontSize: '13px',
                                transform: 'translate(0px, 4px) scale(1)'
                            }
                        }}

                    />

                </Grid>
                <Grid item xs={1.5}>
                    <TextField
                        sx={{ width: '100%' }}
                        id="standard-read-only-input"
                        label="Publicación"
                        value={headSeat.numpublicacion}
                        variant="standard"
                        inputProps={{
                            inputProps: {
                                style: {
                                    fontSize: '15px',
                                    fontWeight: 300 // Tamaño de letra de 12 píxeles (12px)
                                },
                            },
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            sx: {
                                fontSize: '13px',
                                transform: 'translate(0px, 4px) scale(1)'
                            }
                        }}

                    />

                </Grid>
                <Grid item xs={1.5}>
                    <TextField
                        sx={{ width: '100%' }}
                        id="standard-read-only-input"
                        label="Numero"
                        value={headSeat.numasiento}

                        variant="standard"
                        inputProps={{
                            inputProps: {
                                style: {
                                    fontSize: '15px',
                                    fontWeight: 300 // Tamaño de letra de 12 píxeles (12px)
                                },
                            },
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            sx: {
                                fontSize: '13px',
                                transform: 'translate(0px, 4px) scale(1)'
                            }
                        }}

                    />

                </Grid>
                <Grid item xs={1.5}>
                    <TextField
                        sx={{ width: '100%' }}
                        id="standard-read-only-input"
                        label="Tipo"
                        value={headSeat.tipoasiento}

                        variant="standard"
                        inputProps={{
                            inputProps: {
                                style: {
                                    fontSize: '15px',
                                    fontWeight: 300 // Tamaño de letra de 12 píxeles (12px)
                                },
                            },
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            sx: {
                                fontSize: '13px',
                                transform: 'translate(0px, 4px) scale(1)'
                            }
                        }}

                    />

                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        marginLeft={1}

                    >
                        <Grid item xs={3} my={2} >
                            <TextField
                                sx={{ width: '30%', mr: 2 }}
                                label="Periodo"
                                id="standard-size-normal"
                                value={headSeat.percont}
                                variant="standard"
                                inputProps={{
                                    inputProps: {
                                        style: {
                                            fontSize: '15px',
                                            fontWeight: 300 // Tamaño de letra de 12 píxeles (12px)
                                        },
                                    },
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '13px',
                                        transform: 'translate(0px, 4px) scale(1)'
                                    }
                                }}
                            />
                            <TextField
                                sx={{ width: '30%' }}
                                label="Año"
                                id="standard-size-normal"
                                value={headSeat.anocont}
                                variant="standard"
                                inputProps={{
                                    inputProps: {
                                        style: {
                                            fontSize: '15px',
                                            fontWeight: 300 // Tamaño de letra de 12 píxeles (12px)
                                        },
                                    },
                                    readOnly: true
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '13px',
                                        transform: 'translate(0px, 4px) scale(1)'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={3} my={2} >
                            <DateInput
                                label="Fecha de Asiento"
                                value={dateAsiento}
                                onChange={handleDateChangeAsiento}
                            />

                        </Grid>
                        <Grid item xs={3} my={2}>
                            <TextField
                                sx={{ width: '100%' }}
                                label="Fecha del Documento"
                                id="standard-size-normal"
                                value={fecdoc}
                                variant="standard"
                                inputProps={{
                                    inputProps: {
                                        style: {
                                            fontSize: '15px',
                                            fontWeight: 300 // Tamaño de letra de 12 píxeles (12px)
                                        },
                                    },
                                    readOnly: true
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '13px',
                                        transform: 'translate(0px, 4px) scale(1)'
                                    }
                                }}
                            />


                        </Grid>
                        <Grid item xs={0.5}>

                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        </Box>
    );
};

export default HeaderSeat;
