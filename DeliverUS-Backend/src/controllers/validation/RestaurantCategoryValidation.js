import { check } from 'express-validator'
import { RestaurantCategory } from '../../models/models.js'

const noOtherCategoryHasSameName = async function (value, { req }) {
  try {
    const restaurantCategories = await RestaurantCategory.findAll()
    for (const cat of restaurantCategories) {
      if (value === cat.name) {
        return Promise.reject(new Error('The category already exists'))
      }
    }
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}
const create = [
  check('name').exists().isString().isLength({ min: 1, max: 50 }).trim().withMessage('Name must be a string with length between 1 and 50'),
  check('name').custom(noOtherCategoryHasSameName).withMessage('The category already exists')
]

export { create }
