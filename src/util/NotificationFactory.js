// Module used to build custom errors objects
// This module is there because notistack doesnt provide object passing through its API
export default class NotificationFactory {

    // Build error object and stringify them
    buildNotification = (title = '', content = '', variant = 'default') => {
        const notification = { title, content, variant }; // Base notification object
        return JSON.stringify(notification); // Stringify to pass it to notistack
    }

    // Parse stringified objects
    parseNotification = (notificationString = '') => {
        const notification = JSON.parse(notificationString); // Parse to JSON
        return notification; // Return parsed value
    }
}