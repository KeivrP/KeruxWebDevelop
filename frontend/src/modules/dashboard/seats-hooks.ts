import { useAppSelector } from "../../store/hooks";

export const useAppSeat = () => useAppSelector((state) => state.seat);