import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, min: [1, 'Min Price is $1'], required: true },
    discountPercentage: { type: Number, min: [0, 'Min Discount is 0'], max: [99, 'Min Discount is 99'], default: 0, },
    rating: { type: Number, min: [0, 'Min Rating is 0'], max: [5, 'Min Rating is 5'], default: 0, },
    stock: { type: Number, min: [0, 'Min Stock is 0'], default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    deleted: { type: Boolean, default: false }
});

const virtual = ProductSchema.virtual('id')
virtual.get(function () { return this._id })
ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => { delete ret._id }
})

const Product = mongoose.model('Product', ProductSchema);
export default Product