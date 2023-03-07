import { Button } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { UsersTable } from "../components/UsersTable"
import { getContratosAction } from "../users-action"


export const UsersView = () => {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  const getContratos = useCallback(() => {
    setIsLoading(true)
    getContratosAction()
      .then((newData) => {
        setData(newData)
      })
      .catch(() => {
        // lanzar alerta (snack)
      })
      .finally(() =>{
        setIsLoading(false)
      })
  }, []);

  useEffect(() => {
    getContratos()
  }, [getContratos])
  
  return (
    <div>
      <h1>Users</h1>
      <Button onClick={getContratos}>Reload</Button>
      <UsersTable />
    </div>
  )
}