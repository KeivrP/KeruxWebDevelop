
import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/layout/header";
import '../../../shared/layout/styles/styles.css'

export const DetailContView = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Header headerTitle="Asientos por codificar" buttonAction={goBack} />
            <div className="my-div">
                {/*Primer Grid que dividira la pantalla en dos partes*/}
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    {/*  Parte superior que tendra la descripcion doumento origen e infromacion monetaria */}
                    <Grid item>

                    </Grid>
                    {/*  Parte inferior que que tendra los movimientos */}
                    <Grid item>

                    </Grid>

                </Grid>






            </div>
        </>
    )
}