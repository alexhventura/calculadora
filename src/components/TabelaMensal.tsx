import { useState } from 'react';
import { RegistroMensal } from '../types';
import { Download, Calendar, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface TabelaMensalProps {
  registros: RegistroMensal[];
}

export default function TabelaMensal({ registros }: TabelaMensalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroAno, setFiltroAno] = useState<number | 'todos'>('todos');
  const [ordenacao, setOrdenacao] = useState<'asc' | 'desc'>('asc');
  
  const itemsPerPage = 12; // Mostra um ano de cada vez por padrão se não filtrado, ou uma página padrão

  // Filtrar registros
  const registrosFiltrados = registros.filter((reg) => {
    if (reg.mesIndex === 0) return false; // Ignorar o index zero no relatório corrido da tabela para ficar mais intuitivo
    if (filtroAno === 'todos') return true;
    
    const anoDoRegistro = Math.ceil(reg.mesIndex / 12);
    return anoDoRegistro === filtroAno;
  });

  // Ordenação
  const registrosOrdenados = [...registrosFiltrados].sort((a, b) => {
    if (ordenacao === 'asc') {
      return a.mesIndex - b.mesIndex;
    } else {
      return b.mesIndex - a.mesIndex;
    }
  });

  // Paginação
  const totalItems = registrosOrdenados.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const itemsExibidos = registrosOrdenados.slice(startIndex, endIndex);

  // Calcular quantos anos existem no total
  const totalMeses = registros.length - 1;
  const totalAnos = Math.ceil(totalMeses / 12);
  const listaAnos = Array.from({ length: totalAnos }, (_, i) => i + 1);

  // Alterar filtro de ano
  const handleFiltroAnoChange = (ano: number | 'todos') => {
    setFiltroAno(ano);
    setCurrentPage(1); // Reseta para primeira página
  };

  // Exportar para CSV
  const exportarParaCSV = () => {
    const headers = [
      'Mes/Periodo',
      'Total Investido (R$)',
      'Juros do Mes (R$)',
      'Juros Acumulados (R$)',
      'Saldo Simulado (R$)',
      'Saldo Poupança (R$)',
      'Saldo CDI (R$)'
    ];

    const linhas = registros.map((reg) => [
      reg.mesIndex === 0 ? 'Inicio' : `${reg.mesIndex} (${reg.tempoExibicao})`,
      reg.totalInvestido.toFixed(2),
      reg.jurosDoMesUser.toFixed(2),
      reg.jurosAcumuladoUser.toFixed(2),
      reg.saldoUser.toFixed(2),
      reg.saldoPoupanca.toFixed(2),
      reg.saldoCDI ? reg.saldoCDI.toFixed(2) : reg.saldoSelic.toFixed(2)
    ]);

    const csvContent = 
      'data:text/csv;charset=utf-8,\uFEFF' + 
      [headers.join(';'), ...linhas.map(e => e.join(';'))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'simulacao_juros_compostos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-xs flex flex-col gap-4 overflow-hidden min-w-0" role="region" aria-label="Tabela detalhada mês a mês">
      
      {/* Cabeçalho da Tabela com Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#800020]" />
            Tabela Detalhada Mês a Mês
          </h3>
          <p className="text-xs text-slate-500">Analise os fluxos periódicos de rendimento e aportes</p>
        </div>

        {/* Controles de Filtros */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Seletor de Ano */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1 text-xs">
            <span className="text-slate-500 px-1.5 font-medium">Filtrar por Ano:</span>
            <select
              value={filtroAno}
              onChange={(e) => handleFiltroAnoChange(e.target.value === 'todos' ? 'todos' : Number(e.target.value))}
              aria-label="Filtrar tabela por ano"
              className="bg-white border border-slate-200 text-slate-800 rounded-md px-2 py-1 outline-hidden font-medium cursor-pointer"
            >
              <option value="todos">Todos os Anos</option>
              {listaAnos.map((ano) => (
                <option key={ano} value={ano}>
                  Ano {ano}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle de Ordem */}
          <button
            type="button"
            onClick={() => setOrdenacao(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium rounded-lg px-2.5 py-2 sm:py-1.5 text-xs transition-colors cursor-pointer min-h-[2.75rem] sm:min-h-0"
            title="Inverter Ordem"
            aria-label={`Ordenar ${ordenacao === 'asc' ? 'decrescente' : 'crescente'}`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>{ordenacao === 'asc' ? 'Crescente' : 'Decrescente'}</span>
          </button>

          {/* Botão de Exportar */}
          <button
            type="button"
            onClick={exportarParaCSV}
            className="flex items-center gap-1.5 bg-[#800020] text-white hover:bg-[#9b1c31] font-semibold rounded-lg px-3 py-2 sm:py-1.5 text-xs transition-colors cursor-pointer shadow-xs min-h-[2.75rem] sm:min-h-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Tabela Responsiva */}
      <div className="table-scroll border border-slate-100 rounded-xl -mx-0.5 px-0.5">
        <table className="w-full min-w-[640px] text-left text-xs border-collapse" aria-label="Evolução mensal da simulação">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-medium uppercase tracking-wider border-b border-slate-100">
              <th className="py-3 px-4 font-semibold text-slate-900">Período</th>
              <th className="py-3 px-4 font-semibold text-slate-950">Total Investido</th>
              <th className="py-3 px-4 font-semibold text-emerald-800">Juros do Mês</th>
              <th className="py-3 px-4 font-semibold text-emerald-950">Juros Acumulados</th>
              <th className="py-3 px-4 font-semibold text-slate-950 text-right bg-rose-50/20 border-x border-rose-50/50">Saldo Simulado</th>
              <th className="py-3 px-4 font-semibold text-slate-500 text-right">Saldo Poupança</th>
              <th className="py-3 px-4 font-semibold text-slate-700 text-right">Saldo CDI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {itemsExibidos.length > 0 ? (
              itemsExibidos.map((reg, idx) => {
                const isUserWinner = reg.saldoUser >= (reg.saldoCDI ?? reg.saldoSelic);
                return (
                  <tr key={reg.mesIndex} className="hover:bg-slate-50/75 transition-colors">
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-800">
                      Mês {reg.mesIndex} <span className="text-slate-500 text-[10px] ml-1">({reg.tempoExibicao})</span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 font-medium">
                      {formatCurrency(reg.totalInvestido)}
                    </td>
                    <td className="py-2.5 px-4 text-emerald-600 font-medium">
                      {formatCurrency(reg.jurosDoMesUser)}
                    </td>
                    <td className="py-2.5 px-4 text-emerald-700 font-medium">
                      {formatCurrency(reg.jurosAcumuladoUser)}
                    </td>
                    <td className="py-2.5 px-4 text-[#800020] font-bold text-right bg-rose-50/20 border-x border-rose-50/50">
                      {formatCurrency(reg.saldoUser)}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 text-right">
                      {formatCurrency(reg.saldoPoupanca)}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 text-right font-medium">
                      {formatCurrency(reg.saldoCDI ?? reg.saldoSelic)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center font-sans text-slate-500">
                  Nenhum registro encontrado para este filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de Paginação */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-50 pt-4 text-xs font-sans text-slate-500">
          <div className="text-center sm:text-left">
            Mostrando <span className="font-semibold text-slate-800">{startIndex + 1}</span> a{' '}
            <span className="font-semibold text-slate-800">{endIndex}</span> de{' '}
            <span className="font-semibold text-slate-800">{totalItems}</span> meses
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="p-1 px-2 border border-slate-200 hover:bg-slate-100 disabled:opacity-40 rounded-lg text-slate-600 font-medium disabled:pointer-events-none transition-colors cursor-pointer flex items-center"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Inteligência para centralizar página atual em paginações longas
                let pageNum = i + 1;
                if (currentPage > 3 && totalPages > 5) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum + (4 - i) > totalPages) {
                    pageNum = totalPages - 4 + i;
                  }
                }
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-md transition-colors font-medium border cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#800020] text-white border-[#800020] shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="p-1 px-2 border border-slate-200 hover:bg-slate-100 disabled:opacity-40 rounded-lg text-slate-600 font-medium disabled:pointer-events-none transition-colors cursor-pointer flex items-center"
            >
              <span>Próximo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
