import React from 'react';
import { useParams } from 'react-router-dom';

const DriverDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Detalhes do Motorista</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Carregando detalhes do motorista ID: {id}...</p>
      </div>
    </div>
  );
};

export default DriverDetails;