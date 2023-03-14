
import React from "react";

import Header from "../../../shared/layout/header";

import '../../../shared/layout/styles/styles.css'



export const DetailContView = () => {

    const goBack = () => {
        // lógica del botón
    };

    return (
        <>
            <Header headerTitle="Asientos por codificar" buttonAction={goBack} />
            <div className="my-div">

            </div>



        </>
    )
}