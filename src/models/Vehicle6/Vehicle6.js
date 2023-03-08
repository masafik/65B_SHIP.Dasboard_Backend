import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    VehicleInCount: { type: String, required: true, comment: 'จำนวนรถเข้า' },
    VehicleOutCount: { type: String, required: true, comment: 'จำนวนรถออก' },
    others: {
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false },
        updated_date: { type: Date, required: false },
        updated_by: { type: String, required: false },
    }


});

const Vehicle6 = mongoose.model('Vehicle6', schema);

export default Vehicle6
