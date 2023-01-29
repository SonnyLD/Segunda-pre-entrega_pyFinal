import { STATUS } from "../constant/constant.js";
import cartServices from "../services/carts.services.js";

export async function getCart(req, res) {
  try {
    const { idCart } = req.params;
    const response = await cartServices.getCart(idCart);
    res.json({
      cart: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function createCart(req, res) {
  try {
    const cartData = req.body;
        const newCart = await cartServices.createCart(cartData);
        res.status(201).json({
            succees: true,
            message: `${
                newCart.products.length > 0 ? `New cart created with ${newCart.products.length} products.` : `New empty cart successfully created.`
            } New cart's ID is ${newCart._id}.`,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function addProductToCart(req, res) {
  try {
    const { idCart, idProduct, quantity } = req.params;
    const { body } = req;
    const response = await cartServices.addProductToCart(idCart, idProduct, quantity, body);
    res.status(201).json({
      cart: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export async function deleteCart(req, res) {
  try {
    const { idCart } = req.params;
    await cartServices.deleteCart(idCart);
    res.status(201).json({
      message: "Cart borrado correctamente",
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
