import mongoose from 'mongoose'

const subscriptionCompanySizeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('SubscriptionCompanySize', subscriptionCompanySizeSchema)