import { LocalStorageManager, NotificationFactory} from '../../util';
export { default as ServiceLocatorContext, ServiceLocatorProvider, ServiceLocatorConsumer } from './ServiceLocatorContext';

export const baseServiceLocator = {
    // Manager from util folder
    localStorageManager: new LocalStorageManager(), // Local storage manager to handle async call to localstorage
    notificationFactory: new NotificationFactory(), // Notification factory to create and handle notification objects
}; // base values for the service locator