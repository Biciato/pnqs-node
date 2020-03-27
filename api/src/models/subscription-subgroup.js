import mongoose from 'mongoose'

const subscriptionSubgroupSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('SubscriptionSubgroup', subscriptionSubgroupSchema)