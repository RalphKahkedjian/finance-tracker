import api from "./api"

export const getCategoryAnalytics = async ()=> {
  return await api.get('/dashboard/categories')
}