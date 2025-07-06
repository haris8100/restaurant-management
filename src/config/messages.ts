export const messages = {
  CATEGORY: {
    NAME_REQUIRED: 'Category name is required',
    EXISTS: 'Category already exists',
    CREATED: 'Category created successfully',
    NOT_FOUND: 'Category not found',
  },
  COMMON: {
    SUCCESS: 'Success',
    INTERNAL_SERVER_ERROR: 'Internal server error',
  },
  RESTAURANT: {
    NAME_REQUIRED: 'Restaurant name is required',
    LOCATION_REQUIRED: 'Restaurant location is required',
    CREATED: 'Restaurant created successfully',
    NOT_FOUND: 'Restaurant not found',
    EXISTS: 'Restaurant already exists',
    CATEGORY_LINKED: 'Category linked to restaurant successfully',
    LIST: 'Restaurants retrieved successfully',
  },
  DISH: {
    EXIST: 'Dish already exists',
    CREATED: 'Dish created successfully',
    LIST: 'Dishes retrieved successfully',
    DISHES_NOT_FOUND: 'Some dishes not found',
  },
  ORDER: {
    CREATED: 'Order created, waiting for payment',
    NOT_FOUND: 'Order not found',
    LIST: 'Orders retrieved successfully',
    ALREADY_PAID: 'Order already paid',
    PAYMENT_SUCCESS: 'Payment successful',
    INVALID_PAYMENT: 'Invalid payment details',
  },
  USER: {
    EXIST: 'User already exists',
    LIST: 'Users retrieved successfully',
  }
};
