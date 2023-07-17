import style from './App.module.css'

import Table from './components/Table'
import Form from './components/Form'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';



import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [accounts, setAccounts] = useState([])
  const [accountData, setAccountData] = useState([])
  let baseURL = 'http://179.108.250.70/transferencias'
 
  useEffect(() => {  
    getData()
  }, []);

  function getData () {
    axios(baseURL)
    .then(response => {
      setAccounts(response.data.contas)
      setAccountData(response.data.transferencias || []);
    })
    .catch((error) => {
      console.error('Erro na requisição do form', error);
    })
  }  
   

  return (
    <>     
      <ToastContainer />
      <Form accountNames={accounts} setAccountData={setAccountData}/>
      <Table accountData={accountData}/>
    </>


  )
}

export default App
