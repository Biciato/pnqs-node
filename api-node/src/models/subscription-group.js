import mongoose from 'mongoose'

const subscriptionGroupSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('SubscriptionGroup', subscriptionGroupSchema)