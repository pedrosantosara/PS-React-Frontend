import style from '.././styles/Table.module.css'

import moment from 'moment'

import { useState, useEffect } from 'react';


function Table({ accountData, mainBalance, accountBalance }) {
  
  const processedData = accountData

  const [totalBalance, setTotalBalance] = useState(0)
  const [balanceInPeriod, setBalanceInPeriod] = useState(0)

  // Lógica para paginação    
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 4
  const totalPages = Math.ceil(processedData.length / 4)
  
  
  useEffect(() => {
    calcBalancesInPeriod(processedData)
    if (accountBalance) {
      setTotalBalance(accountBalance)
    } else {
      setTotalBalance(mainBalance)
    }
  },[accountData, accountBalance])

  function calcBalancesInPeriod( objs ) {
    let sumedValues = 0
    for (const obj of objs) {
      sumedValues += obj.valor
    }
    setBalanceInPeriod(sumedValues)
  }

  
  function formatValueInCurrency (value) {    
    const formattedValue = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return value < 0 ? `R$ -${value.toString().replace('-', '')}` : formattedValue
  }



  // Lógica para exibição da tabela 
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentData = processedData.slice(startIndex, endIndex);


  

  return (

    <>
      {
        currentData.length
          ?
          <table>
            <thead>
              <tr className='saldo'>
                <th colSpan="2">
                  {`Saldo total: ${formatValueInCurrency(totalBalance)}`}
                </th>
                <th colSpan="2">
                  {`Saldo no período: R$ ${formatValueInCurrency(balanceInPeriod)}`}
                </th>
              </tr>
              <tr className='tipo'>
                <th>Dados</th>
                <th>Valencia</th>
                <th>Tipo</th>
                <th>Nome operador transacionado</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((row, index) => {
                return (
                  <tr key={index}>
                    <td data-label="Data">{moment(row.dataTransferencia, 'DD-MM-YYYY').format('DD/MM/YYYY')}</td>
                    <td data-label="Valor">{formatValueInCurrency(row.valor)}</td>
                    <td data-label="Tipo">{row.tipo}</td>
                    <td data-label="Nome Operador Transacionado">{row.nomeOperadorTransacao}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className={style.navPages} colSpan='4'>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      disabled={currentPage === index + 1}
                    >
                      {index + 1}
                    </button>
                  ))}
                </td>
              </tr>
            </tfoot>

          </table>
          :
          <h1>Nada encontrado</h1>
      }
    </>
  )
}

export default Table