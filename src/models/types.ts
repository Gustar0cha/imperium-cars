// Data model types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Car {
  id: string;
  plate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  odometer: number;
  vin?: string;
  status: 'available' | 'in-use' | 'maintenance';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry?: string;
  status: 'active' | 'inactive';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  type: 'checkout' | 'return';
  carId: string;
  driverId: string;
  managerId: string;
  startDate?: string;
  endDate?: string;
  startOdometer?: number;
  endOdometer?: number;
  notes?: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Related data with populated fields
export interface EventWithRelations extends Event {
  car: Car;
  driver: Driver;
  manager: User;
}

export interface CarWithEvents extends Car {
  events: Event[];
}

export interface DriverWithEvents extends Driver {
  events: Event[];
}

// Report types
export interface UsageReport {
  timeRange: {
    start: string;
    end: string;
  };
  totalEvents: number;
  totalCarsUsed: number;
  totalDistance: number;
  carUsage: {
    carId: string;
    plate: string;
    make: string;
    model: string;
    tripCount: number;
    totalDistance: number;
  }[];
  driverUsage: {
    driverId: string;
    name: string;
    tripCount: number;
    totalDistance: number;
  }[];
}

export interface DriverReport {
  driver: Driver;
  timeRange: {
    start: string;
    end: string;
  };
  totalTrips: number;
  totalDistance: number;
  cars: {
    carId: string;
    plate: string;
    make: string;
    model: string;
    tripCount: number;
    totalDistance: number;
  }[];
  events: EventWithRelations[];
}