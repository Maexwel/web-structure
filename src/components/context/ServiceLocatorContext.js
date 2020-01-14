import React from 'react';
import { baseServiceLocator } from './index';

// Service locator of the application
// The service locator instantiate all services once for the app runtime
const ServiceLocatorContext = React.createContext(baseServiceLocator); // Base definition of all services

export const ServiceLocatorProvider = ServiceLocatorContext.Provider; // Provider (wrapper)
export const ServiceLocatorConsumer = ServiceLocatorContext.Consumer; // Consumer to access services

export default ServiceLocatorContext;