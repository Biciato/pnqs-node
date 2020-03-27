import mongoose from 'mongoose'

const subscriptionPracticeSchema = new mongoose.Schema({
    id: {
        type: String
    },
    practice_category: {
        type: String, 
        required: true
    },
    subgroup_id: {
        type: String
    },
    name: {
        type: String,
    },
    area: {
        type: String
    },
    resume: {
        type: String,
    },
    criteria_questions: {
        type: String
    },
    implantation_start_dt: {
        type: Date,
    },
    results: {
        type: String, 
    },
    stakeholders: {
        type: String
    },
    subscription_id: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('SubscriptionPractice', subscriptionPracticeSchema)