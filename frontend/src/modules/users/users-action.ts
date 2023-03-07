import { Api } from "../../shared/api/Api";

export const getContratosAction = async () => {
  const uri = '/contratos'

  const response = await Api.get(uri);
  
  return response.data;
}