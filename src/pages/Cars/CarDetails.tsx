import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, Car, Clock, Calendar, CheckCircle } from 'lucide-react';

// Simulated car data - would come from API in a real app
const getCar = (id: string) => {
  return {
    id,
    plate: 'ABC123',
    make: 'Toyota',
    model: 'Corolla',
    year: 2020,
    color: 'Silver',
    odometer: 15000,
    vin: '1HGCM82633A123456',
    status: 'available',
    notes: 'Regular maintenance completed on 03/15/2023.',
    lastUsedBy: 'John Doe',
    lastUsedDate: '2023-03-20',
    recentEvents: [
      { id: '1', type: 'checkout', driver: 'John Doe', date: '2023-03-15', odometer: 14800 },
      { id: '2', type: 'return', driver: 'John Doe', date: '2023-03-20', odometer: 15000 },
      { id: '3', type: 'maintenance', details: 'Oil change', date: '2023-03-01', odometer: 14500 },
    ]
  };
};

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, you would fetch this data from your API
  const car = getCar(id || '');

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${car.make} ${car.model} (${car.plate})?`)) {
      // Call your API to delete the car
      // api.delete(`/cars/${id}`);
      navigate('/cars');
    }
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {car.make} {car.model} - {car.plate}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <Link
            to="/cars"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Link>
          <Link
            to={`/cars/${id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Car Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Details and specifications.</p>
          </div>
          <div>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
              ${car.status === 'available' ? 'bg-green-100 text-green-800' : 
                car.status === 'in-use' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'}`}>
              {car.status === 'available' ? 'Available' :
               car.status === 'in-use' ? 'In Use' : 'Maintenance'}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">License Plate</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{car.plate}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Make & Model</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{car.make} {car.model}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Year</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{car.year}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Color</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <div 
                  className="h-4 w-4 rounded-full mr-2"
                  style={{
                    backgroundColor: car.color.toLowerCase(),
                    border: car.color.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none'
                  }}
                ></div>
                {car.color}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Odometer</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{car.odometer.toLocaleString()} km</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">VIN</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{car.vin || 'Not specified'}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{car.notes || 'No notes'}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Last use information */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Usage Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Last use and recent activity.</p>
        </div>
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Used By</p>
                  <p className="text-lg font-semibold text-indigo-700">{car.lastUsedBy || 'N/A'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Used Date</p>
                  <p className="text-lg font-semibold text-indigo-700">{car.lastUsedDate || 'N/A'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Total Trips</p>
                  <p className="text-lg font-semibold text-indigo-700">
                    {car.recentEvents.filter(e => e.type === 'checkout').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent events */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Events</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Last 3 events for this vehicle.</p>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {car.recentEvents.map((event) => (
              <li key={event.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    event.type === 'checkout' ? 'bg-indigo-100' : 
                    event.type === 'return' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {event.type === 'checkout' ? (
                      <Calendar className="h-5 w-5 text-indigo-600" />
                    ) : event.type === 'return' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Car className="h-5 w-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {event.type === 'checkout' ? 'Checkout' : 
                       event.type === 'return' ? 'Return' : 'Maintenance'}
                      {event.type !== 'maintenance' && event.driver ? `: ${event.driver}` : ''}
                      {event.type === 'maintenance' && event.details ? `: ${event.details}` : ''}
                    </p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>{event.date}</span>
                      {event.odometer && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{event.odometer.toLocaleString()} km</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/events/${event.id}`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm">
            <Link to="/events" className="font-medium text-indigo-600 hover:text-indigo-500">
              View all events
            </Link>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Delete this car</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Once you delete a car, all of its data will be permanently removed.</p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Delete Car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;