import mongoose from 'mongoose';
const { Schema } = mongoose;

const brandSchema = new Schema({
    value: { type: String, required: true },
    label: { type: String, required: true },
    checked: { type: String, default: false }
})


const virtual = brandSchema.virtual('id')
virtual.get(function () { return this._id })
brandSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => { delete ret._id }
})


const Brand = mongoose.model('Brand', brandSchema);
export default Brand 