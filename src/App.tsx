import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';

// Componentes críticos carregados imediatamente
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';

// Lazy loading para componentes não críticos
const Register = lazy(() => import('./pages/Auth/Register'));
const CarsList = lazy(() => import('./pages/Cars/CarsList'));
const CarDetails = lazy(() => import('./pages/Cars/CarDetails'));
const CarForm = lazy(() => import('./pages/Cars/CarForm'));
const DriversList = lazy(() => import('./pages/Drivers/DriversList'));
const DriverDetails = lazy(() => import('./pages/Drivers/DriverDetails'));
const DriverForm = lazy(() => import('./pages/Drivers/DriverForm'));
const EventsList = lazy(() => import('./pages/Events/EventsList'));
const EventDetails = lazy(() => import('./pages/Events/EventDetails'));
const EventForm = lazy(() => import('./pages/Events/EventForm'));
const Reports = lazy(() => import('./pages/Reports/Reports'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              
              <Route path="cars">
                <Route index element={<CarsList />} />
                <Route path="new" element={<CarForm />} />
                <Route path=":id" element={<CarDetails />} />
                <Route path=":id/edit" element={<CarForm />} />
              </Route>
              
              <Route path="drivers">
                <Route index element={<DriversList />} />
                <Route path="new" element={<DriverForm />} />
                <Route path=":id" element={<DriverDetails />} />
                <Route path=":id/edit" element={<DriverForm />} />
              </Route>
              
              <Route path="events">
                <Route index element={<EventsList />} />
                <Route path="new" element={<EventForm />} />
                <Route path=":id" element={<EventDetails />} />
                <Route path=":id/edit" element={<EventForm />} />
              </Route>
              
              <Route path="reports" element={<Reports />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;