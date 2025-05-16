import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';

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
    notes: 'Regular maintenance completed on 03/15/2023.'
  };
};

interface FormData {
  plate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  odometer: number;
  vin: string;
  status: string;
  notes: string;
}

const CarForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<FormData>({
    plate: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    odometer: 0,
    vin: '',
    status: 'available',
    notes: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      // Fetch car data in a real app
      const carData = getCar(id);
      setFormData(carData);
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? Number(value) : value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.plate.trim()) {
      newErrors.plate = 'License plate is required';
    }
    
    if (!formData.make.trim()) {
      newErrors.make = 'Make is required';
    }
    
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Please enter a valid year';
    }
    
    if (formData.odometer < 0) {
      newErrors.odometer = 'Odometer reading cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulated API call - replace with actual API in a real app
      // if (isEditMode) {
      //   await api.put(`/cars/${id}`, formData);
      // } else {
      //   await api.post('/cars', formData);
      // }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      navigate('/cars');
    } catch (error) {
      console.error('Error saving car:', error);
      alert('Failed to save car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {isEditMode ? 'Edit Car' : 'Add New Car'}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/cars"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Link>
        </div>
      </div>

      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="plate" className="block text-sm font-medium text-gray-700">
                License Plate *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="plate"
                  id="plate"
                  value={formData.plate}
                  onChange={handleChange}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.plate ? 'border-red-300' : ''
                  }`}
                />
                {errors.plate && (
                  <p className="mt-2 text-sm text-red-600">{errors.plate}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="make" className="block text-sm font-medium text-gray-700">
                Make *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="make"
                  id="make"
                  value={formData.make}
                  onChange={handleChange}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.make ? 'border-red-300' : ''
                  }`}
                />
                {errors.make && (
                  <p className="mt-2 text-sm text-red-600">{errors.make}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                Model *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="model"
                  id="model"
                  value={formData.model}
                  onChange={handleChange}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.model ? 'border-red-300' : ''
                  }`}
                />
                {errors.model && (
                  <p className="mt-2 text-sm text-red-600">{errors.model}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year *
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="year"
                  id="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.year ? 'border-red-300' : ''
                  }`}
                />
                {errors.year && (
                  <p className="mt-2 text-sm text-red-600">{errors.year}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="color"
                  id="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="odometer" className="block text-sm font-medium text-gray-700">
                Odometer (km)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="odometer"
                  id="odometer"
                  value={formData.odometer}
                  onChange={handleChange}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.odometer ? 'border-red-300' : ''
                  }`}
                />
                {errors.odometer && (
                  <p className="mt-2 text-sm text-red-600">{errors.odometer}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
                VIN
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="vin"
                  id="vin"
                  value={formData.vin}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="mt-1">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="available">Available</option>
                  <option value="in-use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Include any relevant information about the vehicle.
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/cars')}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;