import { Grid, Skeleton } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import Header from "../../../shared/layout/header"
import { useAppDispatch } from "../../../store/hooks"
import { DocumentOrigin } from "../components/DocumentOrigin"
import { HeaderSeat } from "../components/HeaderSeat"
import { MonetaryInfo } from "../components/MonetaryInfo"
import { Moviments } from "../components/Moviments"
import { fetchSeatDetailsAction, updateSeatAction } from "../seats-actions"
import { useAppSeat } from "../seats-hooks"
import { ISeatParamsUpdate, IUpdateSeatInput, SeatReversoEnum } from "../seats.-types"

export const SeatDetailsView = () => {
  const { control, reset, getValues } = useForm<IUpdateSeatInput>({
    defaultValues: {
      cabasiento: {
        descasiento: '',
        fecasiento: '',
      },
      cabdocumento: {
        codmonedamtodoc: '',
        dsp_nombrebenef: '',
        iddocref: '',
        indreverso: SeatReversoEnum.true,
        montoorig: '',
        tipodoc: '',
        mtodoc: '',
        refdoc: ''
      }
    }
  });
  const { id } = useParams<{ id: string }>()
  const { seatDetails } = useAppSeat();
  const distpatch = useAppDispatch();

  const getSeatDetails = useCallback(() => {
    distpatch(fetchSeatDetailsAction(id as string))
  }, [id, distpatch])

  const updateSeat = useCallback(() => {
    const newValues = getValues();
    // TODO: REMPLAZAR POR NEW VALUES
    if (seatDetails != null) {
      const updateInput: ISeatParamsUpdate = {
        idasiento: seatDetails.cabasiento.idasiento,
        data_asiento: {
          descasiento: newValues.cabasiento.descasiento,
          fecasiento: newValues.cabasiento.fecasiento,
        },
        data_documento: {
          tipodoc: newValues.cabdocumento.tipodoc,
          numbenef: newValues.cabdocumento.numbenef,
          codmoneda: seatDetails.cabdocumento.codmoneda,
          codsitio: seatDetails.cabdocumento.codsitio,
          codmonedamtodoc: seatDetails.cabdocumento.codmonedamtodoc,
          dsp_nombrebenef: seatDetails.cabdocumento.dsp_nombrebenef,
          montoorig: newValues.cabdocumento.montoorig,
          mtodoc: seatDetails.cabdocumento.mtodoc,
          refdoc: newValues.cabdocumento.refdoc,
          iddocref: newValues.cabdocumento.iddocref,
          indreverso: newValues.cabdocumento.indreverso
        },
        data_movimiento: seatDetails.detasiento.map((movimiento) => {
          return {
            anocont: movimiento.anocont,
            percont: movimiento.percont,
            numpublicacion: movimiento.numpublicacion,
            codcuenta: movimiento.codcuenta,
            tipoauxiliar: movimiento.tipoauxiliar,
            codauxiliar: movimiento.codauxiliar,
            montodb: movimiento.montodb,
            montocr: movimiento.montocr,
            codmoneda: movimiento.codmoneda,
            descmov: movimiento.descmov,
          }
        })

      }
      //console.log('updateInput', updateInput);
       distpatch(updateSeatAction(updateInput));
    }
  } , [getValues, seatDetails])

  useEffect(() => {
    getSeatDetails()
  }, [getSeatDetails]);

  useEffect(() => {
    if (seatDetails) {
      reset({
        cabasiento: {
          descasiento: seatDetails.cabasiento.descasiento,
          fecasiento: seatDetails.cabasiento.fecasiento,
        },
        cabdocumento: {
          codmonedamtodoc: seatDetails.cabdocumento.codmonedamtodoc,
          dsp_nombrebenef: seatDetails.cabdocumento.dsp_nombrebenef,
          iddocref: seatDetails.cabdocumento.iddocref,
          indreverso: seatDetails.cabdocumento.indreverso,
          montoorig: seatDetails.cabdocumento.montoorig,
          tipodoc: seatDetails.cabdocumento.tipodoc,
          mtodoc: seatDetails.cabdocumento.mtodoc,
          refdoc: seatDetails.cabdocumento.refdoc
        }
      })
    }
  }, [seatDetails, reset])

  const [nombre, setnombres] = useState(`Codificar asiento contable:# ${id}`) 

  

  return (
    <>
      <div>
      <Header headerTitle={nombre} />
    </div>
      <div className="my-div">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8} xl={9}>
            <HeaderSeat control={control} />
            <div style={{ marginBottom: '16px' }}></div>
            <DocumentOrigin control={control} />
          </Grid>
          <Grid item xs={12} lg={4} xl={3}>
            <MonetaryInfo control={control} />
          </Grid>
          <Grid item xs={12}>
            <Moviments control={control} onSave={updateSeat}/>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
