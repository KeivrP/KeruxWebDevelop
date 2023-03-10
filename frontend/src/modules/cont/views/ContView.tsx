import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { getContAction } from "../cont-actions";

export const ContView = () => {
  const seat = useAppSelector((state) => state.cont.seat)
  const loadingSeat = useAppSelector((state) => state.cont.loadingSeat)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContAction())
  }, [])

  return (
    <div>
      {loadingSeat ? 'loading...' : null}
      <pre>
        {JSON.stringify(seat)}
      </pre>
    </div>
  )
}