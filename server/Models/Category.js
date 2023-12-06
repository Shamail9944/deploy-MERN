import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    value: { type: String, required: true, unique: true },
    label: { type: String, required: true, unique: true },
    checked: { type: String, default: false },
})


const virtual = categorySchema.virtual('id')
virtual.get(function () { return this._id })
categorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => { delete ret._id }
})


const Category = mongoose.model('Category', categorySchema);
export default Category 