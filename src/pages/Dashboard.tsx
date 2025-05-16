import React from 'react';
import { Car, Users, Calendar, TrendingUp, CarFront, AlertCircle, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Dados simulados - viriam da API em uma aplicação real
  const stats = {
    totalCars: 12,
    availableCars: 8,
    totalDrivers: 15,
    activeDrivers: 10,
    activeEvents: 4,
    completedEvents: 126,
    averageTripDistance: 42,
  };

  // Eventos recentes simulados
  const recentEvents = [
    { id: '1', type: 'checkout', driver: 'João Silva', car: 'Toyota Corolla (ABC123)', timestamp: '2023-04-20 09:15' },
    { id: '2', type: 'return', driver: 'Maria Santos', car: 'Honda Civic (XYZ789)', timestamp: '2023-04-20 15:45' },
    { id: '3', type: 'checkout', driver: 'Pedro Oliveira', car: 'Ford Focus (DEF456)', timestamp: '2023-04-19 11:30' },
    { id: '4', type: 'return', driver: 'Ana Costa', car: 'Nissan Altima (GHI789)', timestamp: '2023-04-19 16:20' },
  ];

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Painel
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/events/new"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Novo Evento
          </Link>
        </div>
      </div>

      {/* Visão geral das estatísticas */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Car className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total de Veículos</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.totalCars}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/cars" className="font-medium text-indigo-600 hover:text-indigo-500">
                Ver todos
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CarFront className="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Veículos Disponíveis</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.availableCars}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/cars" className="font-medium text-indigo-600 hover:text-indigo-500">
                Ver todos
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total de Motoristas</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.totalDrivers}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/drivers" className="font-medium text-indigo-600 hover:text-indigo-500">
                Ver todos
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-indigo-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Eventos Ativos</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.activeEvents}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/events" className="font-medium text-indigo-600 hover:text-indigo-500">
                Ver todos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Status dos Veículos e Eventos Recentes */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Status dos Veículos */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Status da Frota</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Visão geral atual da frota</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Veículos Disponíveis</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {stats.availableCars}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Em Uso</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {stats.totalCars - stats.availableCars}
                </span>
              </div>
              <div className="pt-4">
                <div className="relative">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${(stats.availableCars / stats.totalCars) * 100}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    ></div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {Math.round((stats.availableCars / stats.totalCars) * 100)}% da frota disponível
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Eventos Recentes */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Eventos Recentes</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Últimas retiradas e devoluções de veículos</p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentEvents.map((event) => (
                <li key={event.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        event.type === 'checkout' ? 'bg-indigo-100' : 'bg-green-100'
                      }`}>
                        {event.type === 'checkout' ? (
                          <Calendar className="h-5 w-5 text-indigo-600" />
                        ) : (
                          <Calendar className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {event.type === 'checkout' ? 'Retirada' : 'Devolução'}: {event.car}
                        </p>
                        <p className="text-sm text-gray-500">
                          Motorista: {event.driver}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{event.timestamp}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link to="/events" className="font-medium text-indigo-600 hover:text-indigo-500">
                Ver todos os eventos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;