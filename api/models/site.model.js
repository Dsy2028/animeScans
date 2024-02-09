import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
    chapter: String,
    url: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const scan = mongoose.model('scan', scanSchema);

export default scan;