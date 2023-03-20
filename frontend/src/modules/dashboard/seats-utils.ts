import { ISeatDetails } from "./seats.-types";

export const canEditSeat = (seat: ISeatDetails) => {
  return seat?.cabasiento.orgasiento === 'CONT'
}