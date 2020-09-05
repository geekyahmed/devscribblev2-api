const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const profileController = require('../controllers/profileController')
const commentController = require('../controllers/commentController')
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/settingController')
const subscriberController = require('../controllers/subscriberController')
const newsletterController = require('../controllers/newsletterController')
const dashboardController = require('../controllers/dashboardController')
const { protect } = require('../middlewares/auth')

router.all('/*', protect, (req, res, next) => {
  next()
})

/* DEFAULT ADMIN INDEX ROUTE*/

router.route('/').get(dashboardController.getDashboard)

router.route('/posts').get(postController.getPosts)

router.route('/post/create').post(postController.createPost)

module.exports = router
