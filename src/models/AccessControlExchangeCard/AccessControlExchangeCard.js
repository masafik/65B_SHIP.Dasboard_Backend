import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    ExchangeCardIn: { type: String, required: true, comment: 'ผลรวมจำนวนบุคคลแลกบัตรเข้าพื้นที่' },
    ExchangeCardOut: { type: String, required: true, comment: 'ผลรวมจำนวนบุคคลแลกบัตรออกพื้นที่' },
    others: {
        // run_no: { type: Number, required: true, comment: 'ลำดับของชุดข้อมูล' },
        created_date: { type: Date, required: true },
        created_by: { type: String, required: false }
    }
});

const AccessControlExchangeCard = mongoose.model('AccessControlExchangeCard', schema);

export default AccessControlExchangeCard
