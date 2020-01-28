// Module used to build custom notifications objects
// This module is there because notistack doesnt provide object passing through its API
// The factory stringify and parse object to make communication
export default class NotificationFactory {
    _variants = ['default', 'success', 'info', 'error']; // Variant possibilities

    // Build error object and stringify them
    buildNotification = ({ title = '', content = '', variant = 'default' }) => {
        // Check validity of variant
        if (!this._variants.includes(variant)) {
            variant = 'default'; // Variant was not valid, make it 'default'
        }
        const notification = { title, content, variant }; // Base notification object
        return JSON.stringify(notification); // Stringify to pass it to notistack
    }

    // Parse stringified objects
    parseNotification = (notificationString = '') => {
        return JSON.parse(notificationString); // return parsed value
    }
}