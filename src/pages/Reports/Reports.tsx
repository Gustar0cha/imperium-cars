import React, { useState } from 'react';
import { Calendar, BarChart3, Download, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<'usage' | 'driver'>('usage');
  const [startDate, setStartDate] = useState<string>(() => {
    // Define data padrão para 30 dias atrás
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return format(date, 'yyyy-MM-dd');
  });
  const [endDate, setEndDate] = useState<string>(() => format(new Date(), 'yyyy-MM-dd'));
  const [selectedDriver, setSelectedDriver] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  // Dados simulados
  const drivers = [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Santos' },
    { id: '3', name: 'Pedro Oliveira' },
    { id: '4', name: 'Ana Costa' },
  ];
  
  const usageReportData = {
    timeRange: { start: startDate, end: endDate },
    totalEvents: 24,
    totalCarsUsed: 8,
    totalDistance: 1280,
    carUsage: [
      { carId: '1', plate: 'ABC123', make: 'Toyota', model: 'Corolla', tripCount: 5, totalDistance: 320 },
      { carId: '2', plate: 'XYZ789', make: 'Honda', model: 'Civic', tripCount: 7, totalDistance: 460 },
      { carId: '3', plate: 'DEF456', make: 'Ford', model: 'Focus', tripCount: 3, totalDistance: 150 },
      { carId: '4', plate: 'GHI789', make: 'Nissan', model: 'Altima', tripCount: 9, totalDistance: 350 },
    ],
    driverUsage: [
      { driverId: '1', name: 'João Silva', tripCount: 8, totalDistance: 420 },
      { driverId: '2', name: 'Maria Santos', tripCount: 5, totalDistance: 360 },
      { driverId: '3', name: 'Pedro Oliveira', tripCount: 6, totalDistance: 280 },
      { driverId: '4', name: 'Ana Costa', tripCount: 5, totalDistance: 220 },
    ]
  };
  
  const driverReportData = {
    driver: { 
      id: selectedDriver, 
      name: drivers.find(d => d.id === selectedDriver)?.name || 'Desconhecido',
      licenseNumber: 'CNH12345678',
      email: 'joao.silva@exemplo.com',
      phone: '(11) 98765-4321'
    },
    timeRange: { start: startDate, end: endDate },
    totalTrips: 8,
    totalDistance: 420,
    cars: [
      { carId: '1', plate: 'ABC123', make: 'Toyota', model: 'Corolla', tripCount: 3, totalDistance: 180 },
      { carId: '2', plate: 'XYZ789', make: 'Honda', model: 'Civic', tripCount: 2, totalDistance: 120 },
      { carId: '4', plate: 'GHI789', make: 'Nissan', model: 'Altima', tripCount: 3, totalDistance: 120 },
    ],
    events: [
      { 
        id: '1', 
        type: 'checkout',
        startDate: '2023-04-10T09:15:00',
        endDate: '2023-04-10T17:30:00',
        startOdometer: 15000,
        endOdometer: 15080,
        car: { id: '1', plate: 'ABC123', make: 'Toyota', model: 'Corolla' },
        driver: { id: '1', name: 'João Silva' },
        manager: { id: '1', name: 'Admin' }
      },
      { 
        id: '2', 
        type: 'checkout',
        startDate: '2023-04-15T08:30:00',
        endDate: '2023-04-15T16:45:00',
        startOdometer: 15200,
        endOdometer: 15260,
        car: { id: '2', plate: 'XYZ789', make: 'Honda', model: 'Civic' },
        driver: { id: '1', name: 'João Silva' },
        manager: { id: '1', name: 'Admin' }
      },
    ]
  };

  const generateReport = () => {
    setIsGenerating(true);
    
    // Simula delay da API
    setTimeout(() => {
      setIsGenerating(false);
      setShowReport(true);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateReport();
  };

  const exportToCsv = () => {
    // Em uma aplicação real, você geraria um arquivo CSV com os dados do relatório
    alert('Exportando para CSV...');
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Relatórios
          </h2>
        </div>
      </div>

      {/* Configuração do relatório */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Tipo de relatório */}
            <div>
              <label className="text-base font-medium text-gray-900">Tipo de Relatório</label>
              <p className="text-sm text-gray-500">Selecione o tipo de relatório que deseja gerar.</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  
                  <input
                    id="usage-report"
                    name="report-type"
                    type="radio"
                    checked={reportType === 'usage'}
                    onChange={() => setReportType('usage')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="usage-report" className="ml-3 flex items-center">
                    <BarChart3 className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Relatório de Uso</span>
                      <span className="block text-sm text-gray-500">Estatísticas e tendências de uso dos veículos</span>
                    </div>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="driver-report"
                    name="report-type"
                    type="radio"
                    checked={reportType === 'driver'}
                    onChange={() => setReportType('driver')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="driver-report" className="ml-3 flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Relatório por Motorista</span>
                      <span className="block text-sm text-gray-500">Atividade e detalhes por motorista</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Período */}
            <div>
              <h3 className="text-base font-medium text-gray-900">Período</h3>
              <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Data Inicial</label>
                  <input
                    type="date"
                    name="start-date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">Data Final</label>
                  <input
                    type="date"
                    name="end-date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Seleção de motorista (apenas para relatório por motorista) */}
            {reportType === 'driver' && (
              <div>
                <label htmlFor="driver" className="block text-sm font-medium text-gray-700">Selecionar Motorista</label>
                <select
                  id="driver"
                  name="driver"
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Selecione um motorista</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>{driver.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isGenerating || (reportType === 'driver' && !selectedDriver)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isGenerating ? 'Gerando...' : 'Gerar Relatório'}
            </button>
          </div>
        </form>
      </div>

      {/* Resultados do relatório */}
      {showReport && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {reportType === 'usage' ? 'Relatório de Uso da Frota' : 'Relatório do Motorista'}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {startDate} até {endDate}
                {reportType === 'driver' && ` • ${driverReportData.driver.name}`}
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={exportToCsv}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FileSpreadsheet className="h-4 w-4 mr-1.5" />
                Exportar CSV
              </button>
            </div>
          </div>

          {/* Relatório de Uso */}
          {reportType === 'usage' && (
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Calendar className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total de Eventos</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{usageReportData.totalEvents}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Car className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Veículos Utilizados</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{usageReportData.totalCarsUsed}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ChevronDown className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Distância Total</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{usageReportData.totalDistance} km</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Download className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Média por Viagem</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {Math.round(usageReportData.totalDistance / usageReportData.totalEvents)} km
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de uso dos veículos */}
              <h4 className="text-lg font-medium text-gray-900 mb-3">Uso dos Veículos</h4>
              <div className="flex flex-col mb-6">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Veículo
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Placa
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nº de Viagens
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Distância Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {usageReportData.carUsage.map((car) => (
                            <tr key={car.carId}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {car.make} {car.model}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {car.plate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {car.tripCount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {car.totalDistance} km
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de uso por motorista */}
              <h4 className="text-lg font-medium text-gray-900 mb-3">Uso por Motorista</h4>
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Motorista
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nº de Viagens
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Distância Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Média por Viagem
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {usageReportData.driverUsage.map((driver) => (
                            <tr key={driver.driverId}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {driver.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {driver.tripCount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {driver.totalDistance} km
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {Math.round(driver.totalDistance / driver.tripCount)} km
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Relatório do Motorista */}
          {reportType === 'driver' && (
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg border border-gray-200 mb-6">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Informações do Motorista</h3>
                  <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Nome</dt>
                      <dd className="mt-1 text-sm text-gray-900">{driverReportData.driver.name}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">CNH</dt>
                      <dd className="mt-1 text-sm text-gray-900">{driverReportData.driver.licenseNumber}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{driverReportData.driver.email}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Telefone</dt>
                      <dd className="mt-1 text-sm text-gray-900">{driverReportData.driver.phone}</dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Calendar className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total de Viagens</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{driverReportData.totalTrips}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ChevronDown className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Distância Total</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{driverReportData.totalDistance} km</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Car className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Veículos Utilizados</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{driverReportData.cars.length}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de veículos utilizados */}
              <h4 className="text-lg font-medium text-gray-900 mb-3">Veículos Utilizados</h4>
              <div className="flex flex-col mb-6">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Veículo
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Placa
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nº de Viagens
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Distância Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {driverReportData.cars.map((car) => (
                            <tr key={car.carId}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {car.make} {car.model}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {car.plate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {car.tripCount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {car.totalDistance} km
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Viagens recentes */}
              <h4 className="text-lg font-medium text-gray-900 mb-3">Viagens Recentes</h4>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {driverReportData.events.map((event) => {
                    const startDate = new Date(event.startDate);
                    const endDate = event.endDate ? new Date(event.endDate) : null;
                    
                    return (
                      <li key={event.id}>
                        <div className="block px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-indigo-100">
                                <Car className="h-6 w-6 text-indigo-600" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-indigo-600">
                                  {event.car.make} {event.car.model} ({event.car.plate})
                                </p>
                                <p className="text-sm text-gray-500">
                                  {startDate.toLocaleDateString()} {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  {endDate && (
                                    <>
                                      {' até '}
                                      {endDate.toLocaleDateString()} {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </>
                                  )}
                                </p>
                              </div>
                            </div>
                            {event.startOdometer !== undefined && event.endOdometer !== undefined && (
                              <div className="text-sm text-gray-500">
                                <span className="font-medium">Distância:</span> {event.endOdometer - event.startOdometer} km
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;