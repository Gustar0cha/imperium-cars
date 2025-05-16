// API service for making HTTP requests to the backend

// Base API URL - would point to your actual backend in production
const API_URL = 'http://localhost:3000/api';

// Create axios instance or use fetch
export const api = {
  // Auth endpoints
  async login(email: string, password: string) {
    // Simulated login
    return fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json());
  },

  async register(name: string, email: string, password: string) {
    // Simulated registration
    return fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    }).then(res => res.json());
  },

  // Cars endpoints
  async getCars() {
    return fetch(`${API_URL}/cars`).then(res => res.json());
  },

  async getCar(id: string) {
    return fetch(`${API_URL}/cars/${id}`).then(res => res.json());
  },

  async createCar(data: any) {
    return fetch(`${API_URL}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  async updateCar(id: string, data: any) {
    return fetch(`${API_URL}/cars/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  async deleteCar(id: string) {
    return fetch(`${API_URL}/cars/${id}`, {
      method: 'DELETE',
    }).then(res => res.json());
  },

  // Drivers endpoints
  async getDrivers() {
    return fetch(`${API_URL}/drivers`).then(res => res.json());
  },

  async getDriver(id: string) {
    return fetch(`${API_URL}/drivers/${id}`).then(res => res.json());
  },

  async createDriver(data: any) {
    return fetch(`${API_URL}/drivers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  async updateDriver(id: string, data: any) {
    return fetch(`${API_URL}/drivers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  async deleteDriver(id: string) {
    return fetch(`${API_URL}/drivers/${id}`, {
      method: 'DELETE',
    }).then(res => res.json());
  },

  // Events endpoints
  async getEvents() {
    return fetch(`${API_URL}/events`).then(res => res.json());
  },

  async getEvent(id: string) {
    return fetch(`${API_URL}/events/${id}`).then(res => res.json());
  },

  async createEvent(data: any) {
    return fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  async updateEvent(id: string, data: any) {
    return fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  async deleteEvent(id: string) {
    return fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
    }).then(res => res.json());
  },

  // Reports endpoints
  async getUsageReport(startDate: string, endDate: string) {
    return fetch(`${API_URL}/reports/usage?startDate=${startDate}&endDate=${endDate}`).then(res => res.json());
  },

  async getDriverReport(driverId: string, startDate: string, endDate: string) {
    return fetch(`${API_URL}/reports/driver/${driverId}?startDate=${startDate}&endDate=${endDate}`).then(res => res.json());
  },
};

// Add default headers (like authorization) to all requests
export const setAuthToken = (token: string) => {
  // In a real app, you would set this on your API instance
  // Example with axios:
  // axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};