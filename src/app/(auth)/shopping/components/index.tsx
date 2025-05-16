import CheckboxPurchased from './checkbox'
import DeleteShoppingItem from './deleteShoppingItem'
import NewShoppingItem from './newShoppingItem'
import SelectCategories from './selectCategories'
import ShoppingItem from './ShoppingItem'
import ShoppingItemView from './shoppingItemView'
import ShoppingItemSkeleton from './skeleton'
import UpdateShoppingItem from './updateShoppingItem'

export const CShopping = {
  skeleton: ShoppingItemSkeleton,
  new: NewShoppingItem,
  checkbox: CheckboxPurchased,
  selectCategories: SelectCategories,
  shoppingItem: ShoppingItem,
  deleteItem: DeleteShoppingItem,
  updateItem: UpdateShoppingItem,
  shoppingViewList: ShoppingItemView
}
