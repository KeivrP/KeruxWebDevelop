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
import dayjs, { Dayjs } from 'dayjs';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import HeaderSeat from "./HeaderSeat";


interface Props {
    headSeat: any;
    headDocument: any;
}


const DocumentOrigin = (props: Props) => {
    const { headSeat, headDocument } = props;

    const [isEditMode, setIsEditMode] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [isReversoChecked, setIsReversoChecked] = useState(false);
    const [indreverso, setIndreverso] = useState("")
    const [dateAsiento, setDateAsiento] = React.useState<Dayjs | null>(null);


    function handleDescripcionChange(descripcion: string, date: Dayjs | null) {
        setDescripcion(descripcion);
        setDateAsiento(date);
      }
   
console.log(descripcion, dateAsiento)

    useEffect(()=>{
        if (headDocument){
            setIndreverso(headDocument.indreverso)
        }
    },[headDocument])

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleEditFinish = () => {
        setIsEditMode(false);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcion(event.target.value);
    };

    return (
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
                <HeaderSeat headSeat={headSeat} fecdoc={headDocument.fecdoc} onDescripcionChange={handleDescripcionChange} />
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
                        justifyContent="left"
                        alignItems="center"
                        spacing={3}
                        marginLeft={2}

                    >
                        {/* Descripcion y prueba */}
                        <Grid item xs={1.2}>
                            <TextField
                                sx={{ width: '100%', mr: 2 }}
                                label="Id. Doc"
                                id="standard-size-normal"
                                //defaultValue={headDocument.iddoc}
                                value={headDocument.iddoc}
                                variant="standard"
                                size="small"
                                InputProps={{
                                    readOnly: true,
                                    inputProps: {
                                        style: {
                                            // fontSize: '15px',
                                            fontWeight: 300 // Tamaño de letra de 16 píxeles (16px)
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        // fontSize: '13px',
                                        // transform: 'translate(0px, 4px) scale(1)'
                                    }
                                }}
                            />

                        </Grid>
                        <Grid item xs={4.5}>
                            <TextField
                                sx={{ width: '30%', mr: 1 }}
                                id="standard-read-only-input"
                                label="Tipo"
                                value={headDocument.tipodoc}
                                select
                                inputProps={{
                                    inputProps: {
                                        style: {
                                            fontSize: '15px',
                                            fontWeight: 300 // Tamaño de letra de 16 píxeles (16px)
                                        },
                                    },
                                }}

                                variant="standard"
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '13px',
                                        transform: 'translate(0px, 4px) scale(1)'
                                    }
                                }}
                            />
                            <TextField
                                sx={{ width: '65%' }}
                                id="standard-read-only-input"
                                label="Tipo"
                                value={headDocument.dsp_desctipodoc}
                                title={headDocument.dsp_desctipodoc}
                                InputProps={{
                                    readOnly: true,
                                    inputProps: {
                                        style: {
                                            fontSize: '15px',
                                            fontWeight: 300 // Tamaño de letra de 16 píxeles (16px)
                                        },
                                    },
                                }}
                                variant="standard"
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '13px',
                                        transform: 'translate(0px, 4px) scale(1)'
                                    }
                                }}
                            />


                        </Grid>
                        <Grid item xs={3} >
                            <TextField
                                sx={{ width: '45%', mr: 2 }}
                                label="Envio"
                                id="standard-size-normal"
                                value={headSeat.orgasiento}
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                    inputProps: {
                                        style: {
                                            fontSize: '15px',
                                            fontWeight: 300 // Tamaño de letra de 16 píxeles (16px)
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '13px',
                                        transform: 'translate(0px, 4px) scale(1)'
                                    }
                                }}
                            />
                            <TextField
                                sx={{ width: '45%' }}
                                label="Origen"
                                id="standard-size-normal"
                                //defaultValue={headDocument.origen}
                                value={headDocument.origen}
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                    inputProps: {
                                        style: {
                                            fontSize: '15px',
                                            fontWeight: 300 // Tamaño de letra de 16 píxeles (16px)
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '13px',
                                        transform: 'translate(0px, 4px) scale(1)'
                                    }
                                }}
                            />

                        </Grid>
                        <Grid item xs={3} mt={1}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked
                                    //disabled={headDocument.indreverso === "S"}
                                    checked={isReversoChecked}
                                    onChange={(event) => {
                                        const newValue = event.target.checked ? "S" : "N";
                                        setIndreverso(newValue);
                                        setIsReversoChecked(indreverso === "S" ? true : false);
                                      }}
                                    sx={{

                                        //color: pink[800],
                                        '&.Mui-checked': {
                                            color: "#C72747"
                                        },
                                    }} />} label="Reverso" />

                            </FormGroup>
                        </Grid>
                        <Grid item xs={0.6} mt={1} mb={1}>
                            <Avatar sx={{ width: 24, height: 24 }} src="/broken-image.jpg" />
                        </Grid>
                        <Grid item xs={2} mb={1}>
                            <TextField
                                sx={{ width: '100%', }}
                                label="Rif/Cedula"
                                variant="standard"
                                value={headDocument.rifbenef}

                                //onChange={handleInputChange}
                                InputProps={{
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
                        <Grid item xs={4.5} mb={1}>
                            <TextField
                                sx={{ width: '100%', }}
                                label="Beneficiario"
                                variant="standard"
                                value={headDocument.dsp_nombrebenef}
                                title={headDocument.dsp_nombrebenef}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {headSeat.orgasiento === "CONT" ? (
                                                <>
                                                    {!isEditMode && (
                                                        <EditIcon
                                                            onClick={handleEditClick}
                                                            style={{ cursor: "pointer",fontSize: 20 }}
                                                        />
                                                    )}
                                                    {isEditMode && (
                                                        <EditIcon
                                                            onClick={handleEditFinish}
                                                            style={{ cursor: "pointer",fontSize: 20 }}
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
                        <Grid item xs={2} mb={1}>
                            <TextField
                                sx={{ width: '100%', }}
                                label="Id. Doc Ref"
                                variant="standard"
                                value={headDocument.iddocref}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {headSeat.orgasiento === "CONT" ? (
                                                <>
                                                    {!isEditMode && (
                                                        <EditIcon
                                                            onClick={handleEditClick}
                                                            style={{ cursor: "pointer",fontSize: 20 }}
                                                        />
                                                    )}
                                                    {isEditMode && (
                                                        <EditIcon
                                                            onClick={handleEditFinish}
                                                            style={{ cursor: "pointer",fontSize: 20 }}
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </InputAdornment>
                                    ),
                                    readOnly: true,
                                    inputProps: {
                                        style: {
                                            fontSize: '15px',
                                            fontWeight: 300 // Tamaño de letra de 16 píxeles (16px)
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '13px',
                                        transform: 'translate(0px, 4px) scale(1)'
                                    }
                                }}

                            />

                        </Grid >
                        <Grid item xs={2} mb={1}>
                            <TextField
                                sx={{ width: '100%', }}
                                label="referencia"
                                variant="standard"
                                value={headDocument.refdoc}
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
                                                            style={{ cursor: "pointer",fontSize: 20 }}
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </InputAdornment>
                                    ),
                                    readOnly: true,
                                    inputProps: {
                                        style: {
                                            fontSize: '15px',
                                            fontWeight: 300 // Tamaño de letra de 16 píxeles (16px)
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '13px',
                                        transform: 'translate(0px, 4px) scale(1)'
                                    }
                                }}

                            />

                        </Grid >
                     
                    </Grid>
                </Box>
            </Grid>



        </Grid>
    );
};

export default DocumentOrigin;
