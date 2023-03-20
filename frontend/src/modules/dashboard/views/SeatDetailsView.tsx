import { Grid, Skeleton } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../../store/hooks"
import { DocumentOrigin } from "../components/DocumentOrigin"
import { HeaderSeat } from "../components/HeaderSeat"
import { MonetaryInfo } from "../components/MonetaryInfo"
import { Moviments } from "../components/Moviments"
import { fetchSeatDetailsAction } from "../seats-actions"
import { useAppSeat } from "../seats-hooks"
import { IUpdateSeatInput, SeatReversoEnum } from "../seats.-types"

export const SeatDetailsView = () => {
  const { control, reset, handleSubmit } = useForm<IUpdateSeatInput>({
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

  useEffect(() => {
    getSeatDetails()
  }, [getSeatDetails]);

  useEffect(() => {
    if(seatDetails) {
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

  return (
    <form onSubmit={handleSubmit((newValues) => console.log('newValues', newValues))}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8} xl={9}>
          <HeaderSeat control={control} />
          <br />
          <DocumentOrigin control={control} />
        </Grid>
        <Grid item xs={12} lg={4} xl={3}>
          <MonetaryInfo control={control} />
        </Grid>
        <Grid item xs={12}>
          <Moviments />
        </Grid>
      </Grid>
    </form>
  )
}
