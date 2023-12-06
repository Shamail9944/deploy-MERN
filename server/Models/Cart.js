import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    quantity: { type: Number, default: 1 },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})


const virtual = cartSchema.virtual('id')
virtual.get(function () { return this._id })
cartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => { delete ret._id }
})


const Cart = mongoose.model('Cart', cartSchema);
export default Cart 