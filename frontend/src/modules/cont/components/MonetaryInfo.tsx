import { useState } from "react";
import {
    Box,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";

type MonetaryInfoProps = {
    amount: string;
    currency: string;
};

const MonetaryInfo = ({ amount, currency }: MonetaryInfoProps) => {
    const [currencyType, setCurrencyType] = useState("Documento");


    

    const handleCurrencyTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCurrencyType(event.target.value);
    };

    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="space-around"
                alignItems="stretch"
            >
                {/* nombre del box azul */}
                <Grid item xs={2}>
                    <Box
                        sx={{
                            height: "48px",
                            backgroundColor: "#0E0A2F",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="h4"
                            color="#FFFFFF"
                            sx={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                marginLeft: 4,
                            }}
                        >
                            <DeviceHubIcon sx={{ marginRight: "8px" }} />
                            Información Monetaria
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box
                        sx={{
                            height: "42vh",
                            backgroundColor: "#FFFFFF",
                            flexDirection: "row",
                            boxShadow: 2,
                            borderRadius: 1.5,
                        }}
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item mt={1}>
                                <Typography sx={{fontSize: "11px"}}>Moneda</Typography>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="row-radio-buttons-group"
                                    value={currencyType}
                                    onChange={handleCurrencyTypeChange}

                                >
                                    <FormControlLabel
                                        value="Documento"
                                        control={<Radio 
                                        sx={{
                                          //color: pink[800],
                                          '&.Mui-checked': {
                                            color: "#C72747"
                                          },
                                        }}/>}
                                        label="Documento"
                                    />
                                    <FormControlLabel
                                        value="Origen"
                                        control={<Radio 
                                            sx={{
                                                //color: pink[800],
                                                '&.Mui-checked': {
                                                  color: "#C72747"
                                                },
                                              }}/>}
                                        label="Origen"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid item mt={1}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="standard-read-only-input"
                                    label="Monto del Docuemnto"
                                    color="success"
                                    value={amount}
                                    variant="standard"
                                    InputProps={{
                                        readOnly: true,
                                        inputProps: {
                                            style: {
                                                color:'#0E0A2F',
                                                fontSize: '13px', // Tamaño de letra de 16 píxeles (16px)
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item mt={1}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="standard-read-only-input"
                                    label="Moneda del Documento"
                                    value={currency}
                                    variant="standard"
                                    InputProps={{
                                        readOnly: true,
                                        inputProps: {
                                            style: {
                                                color:'#0E0A2F',
                                                fontSize: '13px', // Tamaño de letra de 16 píxeles (16px)
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            {currencyType === "Origen" && (
                                <>
                                    <Grid item mt={1}>
                                        <TextField
                                            sx={{ width: "100%", }}
                                            id="standard-read-only-input"
                                            label="Tasa"
                                            value="1"
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                                inputProps: {
                                                    style: {
                                                        color:'#0E0A2F',
                                                        fontSize: '13px', // Tamaño de letra de 16 píxeles (16px)
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item mt={1}>
                                        <TextField
                                            sx={{ width: "100%" }}
                                            id="standard-read-only-input"
                                            label="Moneda Original"
                                            value={currency}
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                                inputProps: {
                                                    style: {
                                                        color:'#0E0A2F',
                                                        fontSize: '13px', // Tamaño de letra de 16 píxeles (16px)
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item mt={1}>
                                        <TextField
                                            sx={{ width: "100%" }}
                                            id="standard-read-only-input"
                                            label="Monto Original"
                                            value={amount}
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                                inputProps: {
                                                    style: {
                                                        color:'#0E0A2F',
                                                        fontSize: '13px', // Tamaño de letra de 16 píxeles (16px)
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                </>

                            )}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default MonetaryInfo;
