import axios from 'axios';

const baseURL = '/api/persons';

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(res => res.data)
}

const createPerson = (createObject) => {
  const request = axios.post(baseURL, createObject)
  return request.then(res => res.data)
}

const deletePerson =(id) => {
  const url = `${baseURL}/${id}`
  const request = axios.delete(url)

  return request.then(res=>res.data)
}

const updatePerson=(id,updateObject)=>{
  const url = `${baseURL}/${id}`
  const request = axios.put(url,updateObject)
  return request.then(res=> res.data)
}

export default { getAll, createPerson,deletePerson,updatePerson }