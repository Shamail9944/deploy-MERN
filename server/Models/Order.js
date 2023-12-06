import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    cartItems: { type: [Schema.Types.Mixed], required: true },
    paymentMethod: { type: String, required: true },
    selAddress: { type: Schema.Types.Mixed, required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: "pending" },
})


const virtual = orderSchema.virtual('id')
virtual.get(function () { return this._id })
orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => { delete ret._id }
})


const Order = mongoose.model('Order', orderSchema);
export default Order

