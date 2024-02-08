import mongoose from 'mongoose';

const notificationsSchema = new mongoose.Schema({
    email: String,
    phone: String
});

const notifications = mongoose.model('notification', notificationsSchema);

export default notifications;