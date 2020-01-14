import { LocalStorageManager} from '../../util'
export { default as ServiceLocatorContext, ServiceLocatorProvider, ServiceLocatorConsumer } from './ServiceLocatorContext';

export const baseServiceLocator = {
    // Manager from util folder
    localStorageManager: new LocalStorageManager(), // Local storage manager to handle async call to localstorage
}; // base values for the service locator