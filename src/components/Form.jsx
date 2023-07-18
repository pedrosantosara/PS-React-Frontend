import axios from 'axios'
import style from '../styles/Form.module.css'

import { useState } from 'react'

export default function Form ({accountNames, setAccountData, setAccountBalance}) {

  const [accountName, setAccountName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [operatorName, setOperatorName] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()

    let baseUrl = 'http://179.108.250.70/transferencias'
    
    const queryParams = {}
    if(startDate) queryParams.inicio = startDate
    if(endDate) queryParams.fim = endDate
    if(operatorName) queryParams.nomeOperadorTransacao = operatorName

          
    if(accountName.trim() !== '') {
      let selectedAccountId

      for (const account of accountNames) {
        if (accountName === account.nomeResponsavel) {
          selectedAccountId = account.contaId
        }
      }
      
      if (selectedAccountId) {       
        baseUrl += `/conta/${selectedAccountId}`
        axios.get(baseUrl, { params: queryParams })
        .then(response => {
          setAccountData(response.data.transferencias.content)       
        })
        .catch((error) => {
          console.error('Erro na requisição do form', error);
        })
        axios.get(baseUrl).then(response => setAccountBalance(response.data.saldo))
      }
    } else {
      axios.get(baseUrl, {params: queryParams})
        .then(response => {
          setAccountData(response.data.transferencias)
        })
    }
    
    setStartDate('')
    setEndDate('')
    setOperatorName('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>  
        <div className={style.inputBox}>
          <label htmlFor="account">Conta</label>
          <select value={accountName} onChange={event => setAccountName(event.target.value)}>
            <option value="">Todas</option>
              {accountNames.map((option, index)=> (
                <option key={index} value={option.nomeResponsavel}>
                  {option.nomeResponsavel}
                </option>
              )
            )}
          </select>
        </div>
        
        <div className={style.inputBox}>
          <label htmlFor="startDate">Data de início</label>
          <input 
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            id="startDate"
          />
        </div>
        
        <div className={style.inputBox}>
          <label htmlFor="endDate">Data de fim</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            id="endDate"
          />
        </div>
        
        <div className={style.inputBox}>
          <label htmlFor="operatorName">Nome operador transacionado</label>
          <input
            type="text"
            value={operatorName}
            onChange={(e) => setOperatorName(e.target.value)}
            id="operatorName"
          />
          <div className='dropdownAccount'>
            <div className='dashLeft'></div>
            <div className='dashRight'></div>
          </div>
        </div>

        <button type='submit'>Pesquisar</button>
      </form>
    </>
  )
}