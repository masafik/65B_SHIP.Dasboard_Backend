import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    application_id: { type: String, required: true },
    group_id: { type: String, required: true },
    get: { type: Number, required: true },
    put: { type: Number, required: true },
    post: { type: Number, required: true },
    delete: { type: Number, required: true }
});

const Role = mongoose.model('Role', schema);

export default Role
