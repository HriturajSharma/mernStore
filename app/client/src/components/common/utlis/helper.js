import axios from 'axios'

let api = axios.create({
  baseURL: 'http://localhost:8000/api',
//   withCredentials: true
})

export const HttpGet = async (endpoint, config = {}) => {
  try {
    const response = await api.get(endpoint, config)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

// POST helper
export const HttpPost = async (endpoint, data = {}, config = {}) => {
  try {
    const response = await api.post(endpoint, data, config)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export default api
