import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
});

 const Class  = mongoose.model('Class', classSchema);
 export default Class;

