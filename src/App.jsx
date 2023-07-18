import 'react-toastify/dist/ReactToastify.css';

import style from './App.module.css'

import {ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react'

import Table from './components/Table'
import Form from './components/Form'

import axios from 'axios'


function App() {
  const [accounts, setAccounts] = useState([])
  const [accountData, setAccountData] = useState([])
  
  // Preciso criar mais um state pois o meu accountData é setado no meu form também
  //então eu perco o meu saldo principal ao enviar como
  
  const [mainBalance, setMainBalance] = useState(0)
  const [accountBalance, setAccountBalance] = useState(0)
 
  useEffect(() => {  
    let balance = 0
    
    axios('http://localhost:8080/transferencias')
      .then(response => {
        for (const key of response.data.transferencias) {
          balance += key.valor
        }
        setAccounts(response.data.contas)
        setAccountData(response.data.transferencias);
        setMainBalance(balance)
      })
      .catch((error) => {
        console.error('Erro na requisição do form', error);
    })
  }, []);

   

  return (
    <>     
      <ToastContainer />
      <Form 
        accountNames={accounts}
        setAccountData={setAccountData}
        setAccountBalance={setAccountBalance}
      />
      {accountData.length > 0
        ?<Table 
            accountData={accountData}
            mainBalance={mainBalance}
            accountBalance={accountBalance}
          />
        :<h1>Não existe, tente outra busca</h1> 
      }
    </>


  )
}

export default App