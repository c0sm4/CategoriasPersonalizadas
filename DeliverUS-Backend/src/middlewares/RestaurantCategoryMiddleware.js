import { RestaurantCategory } from '../models/models.js'

const checkNoOtherEqual = async (req, res, next) => {
  try {
    const allCategories = await RestaurantCategory.findAll()
    if (allCategories.filter(category => category.name === req.body.name).length === 0) {
      return next()
    }
    return res.status(409).send('Sorry my bro, something not working hereeeeee')
  } catch (err) {
    return res.status(500).send(err)
  }
}

export { checkNoOtherEqual }
