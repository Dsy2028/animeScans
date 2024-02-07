import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
    chapter: String,
    headingText: String,
});

const scan = mongoose.model('scan', scanSchema);

export default scan;