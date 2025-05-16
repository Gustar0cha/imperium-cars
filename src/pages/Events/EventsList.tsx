import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Filter, ChevronDown, Calendar, Car, User, Clock, ArrowRight } from 'lucide-react';

// Dados simulados de eventos
const eventsData = [
  { 
    id: '1', 
    type: 'checkout', 
    car: { id: '1', plate: 'ABC123', make: 'Toyota', model: 'Corolla' },
    driver: { id: '1', name: 'João Silva', phone: '(11) 98765-4321' },
    startDate: '2024-03-20T09:15:00',
    endDate: null,
    startOdometer: 15000,
    endOdometer: null,
    status: 'active'
  },
  { 
    id: '2', 
    type: 'return', 
    car: { id: '2', plate: 'XYZ789', make: 'Honda', model: 'Civic' },
    driver: { id: '2', name: 'Maria Santos', phone: '(11) 97654-3210' },
    startDate: '2024-03-19T08:30:00',
    endDate: '2024-03-20T15:45:00',
    startOdometer: 22500,
    endOdometer: 22650,
    status: 'completed'
  },
  { 
    id: '3', 
    type: 'checkout', 
    car: { id: '3', plate: 'DEF456', make: 'Ford', model: 'Focus' },
    driver: { id: '3', name: 'Pedro Oliveira', phone: '(11) 96543-2109' },
    startDate: '2024-03-19T11:30:00',
    endDate: null,
    startOdometer: 8700,
    endOdometer: null,
    status: 'active'
  },
  { 
    id: '4', 
    type: 'return', 
    car: { id: '4', plate: 'GHI789', make: 'Nissan', model: 'Altima' },
    driver: { id: '4', name: 'Ana Costa', phone: '(11) 95432-1098' },
    startDate: '2024-03-18T10:15:00',
    endDate: '2024-03-19T16:20:00',
    startOdometer: 35200,
    endOdometer: 35350,
    status: 'completed'
  },
  { 
    id: '5', 
    type: 'checkout', 
    car: { id: '5', plate: 'JKL012', make: 'Chevrolet', model: 'Malibu' },
    driver: { id: '5', name: 'Carlos Ferreira', phone: '(11) 94321-0987' },
    startDate: '2024-03-17T14:30:00',
    endDate: null,
    startOdometer: 12300,
    endOdometer: null,
    status: 'cancelled'
  },
];

const EventsList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Formata data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Filtra eventos baseado na busca e filtros
  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = 
      event.car.plate.toLowerCase().includes(search.toLowerCase()) ||
      event.car.make.toLowerCase().includes(search.toLowerCase()) ||
      event.car.model.toLowerCase().includes(search.toLowerCase()) ||
      event.driver.name.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = typeFilter ? event.type === typeFilter : true;
    const matchesStatus = statusFilter ? event.status === statusFilter : true;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Eventos
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/events/new"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo Evento
          </Link>
        </div>
      </div>

      {/* Busca e filtros */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="relative flex items-center max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Buscar por veículo ou motorista"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Evento</label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={typeFilter || ''}
                  onChange={(e) => setTypeFilter(e.target.value || null)}
                >
                  <option value="">Todos</option>
                  <option value="checkout">Retirada</option>
                  <option value="return">Devolução</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={statusFilter || ''}
                  onChange={(e) => setStatusFilter(e.target.value || null)}
                >
                  <option value="">Todos</option>
                  <option value="active">Ativo</option>
                  <option value="completed">Concluído</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lista de eventos */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredEvents.map((event) => (
            <li key={event.id}>
              <Link to={`/events/${event.id}`} className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                        event.type === 'checkout' ? 'bg-indigo-100' : 'bg-green-100'
                      }`}>
                        {event.type === 'checkout' ? (
                          <Calendar className="h-6 w-6 text-indigo-600" />
                        ) : (
                          <Car className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-indigo-600">
                          {event.type === 'checkout' ? 'Retirada de Veículo' : 'Devolução de Veículo'}
                        </p>
                        <p className="text-sm text-gray-900">
                          {event.car.make} {event.car.model} ({event.car.plate})
                        </p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        event.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                        event.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {event.status === 'active' ? 'Ativo' :
                         event.status === 'completed' ? 'Concluído' :
                         'Cancelado'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {event.driver.name} • {event.driver.phone}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p>
                        {formatDate(event.startDate)}
                        {event.endDate && (
                          <>
                            <ArrowRight className="inline-block mx-1 h-3 w-3" />
                            {formatDate(event.endDate)}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  {event.type === 'return' && event.startOdometer && event.endOdometer && (
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">Distância:</span> {event.endOdometer - event.startOdometer} km
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventsList;