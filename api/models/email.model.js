import mongoose from 'mongoose';

const notificationsSchema = new mongoose.Schema({
    email: String,
    phone: String,
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

const notifications = mongoose.model('notification', notificationsSchema);

export default notifications;