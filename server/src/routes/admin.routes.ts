import express from 'express'
import { AdminController } from '../controllers/admin.controller'
import { isAuthenticated } from '../middleware/isAuthenticated.middleware'
import { upload } from '../middleware/multer.middleware'

const router = express.Router()

router.use(isAuthenticated)

// Get and update profile
router.route('/profile').get(AdminController.getProfile).patch(AdminController.updateProfile)

// Change password
router.patch('/change-password', AdminController.changePassword)

// Avatar management
router.post('/add-avatar', upload.single('avatar'), AdminController.addAvatar)
router.delete('/remove-avatar', AdminController.removeAvatar)

export default router
