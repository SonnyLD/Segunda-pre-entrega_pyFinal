import CartModel from "../dao/models/carts.models.js";
import productService from "../services/products.services.js";

class CartServices {

    async createCart(cartData) {
        try {
            const fullData = cartData;
            if (fullData.products.length > 0) { // Sets total for each product and subtotal for the cart
                fullData.products.forEach(products => {
                    products.total = Number(products.price * products.quantity).toFixed(2);
                });
                fullData.subtotal = Number(fullData.products.map(product => product.price * product.quantity).reduce((acc, curr) => acc + curr)).toFixed(2);
            }
            const newCart = await CartModel.create(cartData);
            return newCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async getCart(idCart) {
        try {
            const cart = await CartModel.findById(idCart).lean().populate("Products");
            return cart;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteCart(idCart) {
        try {
            await CartModel.findByIdAndDelete(idCart).lean();
        } catch (error) {
            throw new Error(error.message);
        }
    }

 // https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose 
async addProductToCart(idCart, idProduct, quantity) {
  try {
      // get cart from db
      const cart = await CartModel.findById(idCart);
      // get product from db
      const product = await productService.getProduct(idProduct);
      // check if product and cart exist in db
      if (cart && product) {
          let productIndex = cart.Products.findIndex(prod => prod.idProduct === idProduct);

          if (productIndex != -1) { // product is in cart?
              cart.Products[productIndex].quantity = cart.Products[productIndex].quantity + quantity;
              cart.Products[productIndex].total = cart.Products[productIndex].quantity * product.price;
              cart.subtotal = cart.Products.map(prod => prod.total).reduce((acc, curr) => acc + curr);
          } else {
              cart.Products.push({
                  idProduct: product.idProduct,
                  quantity: quantity,
                  price: product.price,
                  total: Number(product.price * quantity).toFixed(2)
              });
              cart.subtotal = cart.Products.map(prod => prod.total).reduce((acc, curr) => acc + curr);
          }
          return await cart.save(); // updates cart in db
      } else if (product && !cart) { // product is in db but cart does not exist in db creates a new cart and pushes the product
          console.log('here')
          const cartData = {
//                    userId: userId,  When auth is already implemented
              products: [{
                  idProduct: idProduct,
                  quantity: quantity,
                  price: product.price,
                  total: parseInt(product.price * quantity),
              }],
              subtotal: Number(product.price * quantity).toFixed(2)
          }
          return await CartModel.create(cartData);
      }
      return null
  } catch (error) {
      throw new Error(error.message);
  }
} // Can be modified if modifyQuantity method is implemented (for both add and rest methods)

async deleteCart(idCart) {
  try {
      await CartModel.findByIdAndDelete(idCart).lean();
  } catch (error) {
      throw new Error(error.message);
  }
}

}

const cartServices = new CartServices();
export default cartServices;