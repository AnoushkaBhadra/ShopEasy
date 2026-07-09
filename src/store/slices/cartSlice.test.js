import cartReducer, {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "./cartSlice";

describe("cartSlice", () => {
  const product = {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2500,
    thumbnail: "https://example.com/headphones.png",
  };

  const secondProduct = {
    id: 2,
    name: "Coffee Mug",
    category: "Kitchen",
    price: 300,
    thumbnail: "https://example.com/mug.png",
  };

  it("returns the initial state when called with an unknown action", () => {
    // Verifies the reducer exposes the expected empty cart defaults.
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
      total: 0,
    });
  });

  describe("addToCart", () => {
    it("adds a new product with quantity one and updates the total", () => {
      // Verifies a new product is inserted into an empty cart.
      const state = cartReducer(undefined, addToCart(product));

      expect(state.items).toEqual([{ ...product, quantity: 1 }]);
      expect(state.total).toBe(product.price);
    });

    it("increments quantity instead of duplicating an existing product", () => {
      // Verifies repeated additions merge by product id.
      const initialState = {
        items: [{ ...product, quantity: 1 }],
        total: product.price,
      };

      const state = cartReducer(initialState, addToCart(product));

      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({ ...product, quantity: 2 });
      expect(state.total).toBe(product.price * 2);
    });

    it("adds different products as separate cart items", () => {
      // Verifies products with different ids remain separate entries.
      const initialState = {
        items: [{ ...product, quantity: 1 }],
        total: product.price,
      };

      const state = cartReducer(initialState, addToCart(secondProduct));

      expect(state.items).toEqual([
        { ...product, quantity: 1 },
        { ...secondProduct, quantity: 1 },
      ]);
      expect(state.total).toBe(product.price + secondProduct.price);
    });
  });

  describe("removeFromCart", () => {
    it("removes an existing item and subtracts its full line total", () => {
      // Verifies removing an item accounts for its quantity.
      const initialState = {
        items: [
          { ...product, quantity: 2 },
          { ...secondProduct, quantity: 1 },
        ],
        total: product.price * 2 + secondProduct.price,
      };

      const state = cartReducer(initialState, removeFromCart(product.id));

      expect(state.items).toEqual([{ ...secondProduct, quantity: 1 }]);
      expect(state.total).toBe(secondProduct.price);
    });

    it("does nothing when removing an item that is not in the cart", () => {
      // Verifies an unknown id is ignored safely.
      const initialState = {
        items: [{ ...product, quantity: 1 }],
        total: product.price,
      };

      const state = cartReducer(initialState, removeFromCart(999));

      expect(state).toEqual(initialState);
    });
  });

  describe("increaseQuantity", () => {
    it("increases quantity for an existing item and updates the total", () => {
      // Verifies quantity and total move together for known items.
      const initialState = {
        items: [{ ...product, quantity: 1 }],
        total: product.price,
      };

      const state = cartReducer(initialState, increaseQuantity(product.id));

      expect(state.items[0].quantity).toBe(2);
      expect(state.total).toBe(product.price * 2);
    });

    it("does nothing when increasing an item that is not in the cart", () => {
      // Verifies an unknown id is ignored safely.
      const initialState = {
        items: [{ ...product, quantity: 1 }],
        total: product.price,
      };

      const state = cartReducer(initialState, increaseQuantity(999));

      expect(state).toEqual(initialState);
    });
  });

  describe("decreaseQuantity", () => {
    it("decreases quantity for an existing item and updates the total", () => {
      // Verifies reducing quantity subtracts one unit price.
      const initialState = {
        items: [{ ...product, quantity: 2 }],
        total: product.price * 2,
      };

      const state = cartReducer(initialState, decreaseQuantity(product.id));

      expect(state.items[0].quantity).toBe(1);
      expect(state.total).toBe(product.price);
    });

    it("removes the item when quantity reaches zero", () => {
      // Verifies decrementing the last unit removes the cart item.
      const initialState = {
        items: [{ ...product, quantity: 1 }],
        total: product.price,
      };

      const state = cartReducer(initialState, decreaseQuantity(product.id));

      expect(state.items).toEqual([]);
      expect(state.total).toBe(0);
    });

    it("does nothing when decreasing an item that is not in the cart", () => {
      // Verifies an unknown id is ignored safely.
      const initialState = {
        items: [{ ...product, quantity: 1 }],
        total: product.price,
      };

      const state = cartReducer(initialState, decreaseQuantity(999));

      expect(state).toEqual(initialState);
    });
  });

  describe("clearCart", () => {
    it("removes all items and resets the total", () => {
      // Verifies clearCart restores the empty cart state.
      const initialState = {
        items: [
          { ...product, quantity: 2 },
          { ...secondProduct, quantity: 1 },
        ],
        total: product.price * 2 + secondProduct.price,
      };

      const state = cartReducer(initialState, clearCart());

      expect(state).toEqual({
        items: [],
        total: 0,
      });
    });

    it("keeps an already empty cart empty", () => {
      // Verifies clearCart is safe to call on initial state.
      const state = cartReducer(undefined, clearCart());

      expect(state).toEqual({
        items: [],
        total: 0,
      });
    });
  });
});
