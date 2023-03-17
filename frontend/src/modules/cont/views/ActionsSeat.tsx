import { useState } from "react";
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";



const AcctionSeat = () => {
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


                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item mt={1}>
                        <Typography sx={{ fontSize: "11px" }}>Moneda</Typography>
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
                                    }} />}
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
                                    }} />}
                                label="Origen"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item mt={1}>
                        <Button
                            variant="contained"
                            color="primary"
                           
                        >
                            My Button
                        </Button>
                    </Grid>
                    <Grid item mt={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            
                        >
                            My Button
                        </Button>
                    </Grid>
                    <Grid item mt={1}>
                        <Button
                            variant="contained"
                            color="primary"
                          
                        >
                            My Button
                        </Button>
                    </Grid>

                </Grid>


            </Grid>
        </div>
    );
};

export default AcctionSeat;
