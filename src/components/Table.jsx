import style from '.././styles/Table.module.css'

import moment from 'moment'

import { useState, useEffect } from 'react';


function Table({ accountData }) {
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(accountData.length / pageSize);

  const [processedData, setProcessedData] = useState([]);


  function handlePageChange(pageSelected) {
    setCurrentPage(pageSelected)
  }

  useEffect(() => {
    let dadosProcessados;

    if (Array.isArray(accountData)) {
      dadosProcessados = accountData;
    }
    else if (typeof accountData === 'object' && accountData !== null && 'content' in accountData) {
      dadosProcessados = accountData.content;
    } else {
      throw new Error('Formato de dados desconhecido');
    }

    setProcessedData(dadosProcessados);
  }, [accountData]);


  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentData = processedData.slice(startIndex, endIndex);
  const formattedValue = { style: 'currency', currency: 'BRL' }

  return (

    <>
      {
        processedData.length
          ?
          <table>
            <thead>
              <tr className='saldo'>
                <th colSpan="2">Salto Total: R$50,00</th>
                <th colSpan="2">Saldo no período: R$50,00</th>
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
                    <td data-label="Valor">{row.valor.toLocaleString('pt-BR', formattedValue)}</td>
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
                      onClick={() => handlePageChange(index + 1)}
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
          <h1>Nada encontrado...</h1>
      }
    </>
  )
}

export default Table