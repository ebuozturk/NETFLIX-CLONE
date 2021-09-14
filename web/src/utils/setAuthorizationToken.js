import axios from 'axios';

export default async function setAuthorizationToken(token) {
  if (token) {
    await (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
    // await (axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*")
    // await (axios.defaults.headers.common["Access-Control-Allow-Methods"] = "DELETE, POST, GET, OPTIONS")
    // await (axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
  } else {
    await (delete axios.defaults.headers.common['Authorization'])
  }
}