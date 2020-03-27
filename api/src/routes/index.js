import { UserController } from '../controllers/user-controller'
import { SubscriptionController } from '../controllers/subscription-controller'
import { validateToken } from '../utils'

const routes = app => {
    // User's routes
    app.route('/auth/signup').post(UserController.signup)
    app.route('/auth/login').post(UserController.login)

    // Subscription's routes
    app.route('/subscriptions').get(validateToken, SubscriptionController.index)
    app.route('/subscription').post(validateToken, SubscriptionController.store)
    app.route('/subscription/:id').get(validateToken, SubscriptionController.show)
    app.route('/subscription/:id').delete(validateToken, SubscriptionController.delete)
}

export default routes

