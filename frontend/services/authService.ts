import api from "./api"

export const registerUser = async(data: {
  name: string,
  email: string,
  password: string
})=> {
  return await api.post('/register', data);
}

export const loginUser = async(data: {
  email: string,
  password: string
}) => {
  return await api.post('/login', data)
}