import wishlistReducer, {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} from "./wishlistSlice";

describe("wishlistSlice", () => {
  const product = {
    id: 1,
    name: "Wireless Headphones",
    price: 2500,
  };

  const secondProduct = {
    id: 2,
    name: "Coffee Mug",
    price: 300,
  };

  it("returns the initial state when called with an unknown action", () => {
    // Verifies the reducer exposes the expected empty wishlist defaults.
    expect(wishlistReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
    });
  });

  describe("addToWishlist", () => {
    it("adds a product to an empty wishlist", () => {
      // Verifies a product can be saved to the wishlist.
      const state = wishlistReducer(undefined, addToWishlist(product));

      expect(state.items).toEqual([product]);
    });

    it("does not add a duplicate product with the same id", () => {
      // Verifies duplicate wishlist entries are prevented by id.
      const initialState = {
        items: [product],
      };

      const state = wishlistReducer(initialState, addToWishlist(product));

      expect(state.items).toEqual([product]);
    });

    it("adds products with different ids as separate items", () => {
      // Verifies unique products can coexist in the wishlist.
      const initialState = {
        items: [product],
      };

      const state = wishlistReducer(
        initialState,
        addToWishlist(secondProduct)
      );

      expect(state.items).toEqual([product, secondProduct]);
    });
  });

  describe("removeFromWishlist", () => {
    it("removes a product by id", () => {
      // Verifies an existing product can be removed from the wishlist.
      const initialState = {
        items: [product, secondProduct],
      };

      const state = wishlistReducer(
        initialState,
        removeFromWishlist(product)
      );

      expect(state.items).toEqual([secondProduct]);
    });

    it("does nothing when removing a product that is not in the wishlist", () => {
      // Verifies an unknown product id is ignored safely.
      const initialState = {
        items: [product],
      };

      const state = wishlistReducer(
        initialState,
        removeFromWishlist(secondProduct)
      );

      expect(state).toEqual(initialState);
    });
  });

  describe("toggleWishlist", () => {
    it("adds a product when it is not already in the wishlist", () => {
      // Verifies toggle can save a new wishlist item.
      const state = wishlistReducer(undefined, toggleWishlist(product));

      expect(state.items).toEqual([product]);
    });

    it("removes a product when it is already in the wishlist", () => {
      // Verifies toggle can remove an existing wishlist item.
      const initialState = {
        items: [product, secondProduct],
      };

      const state = wishlistReducer(
        initialState,
        toggleWishlist(product)
      );

      expect(state.items).toEqual([secondProduct]);
    });
  });

  describe("clearWishlist", () => {
    it("removes every wishlist item", () => {
      // Verifies clearWishlist restores the empty wishlist state.
      const initialState = {
        items: [product, secondProduct],
      };

      const state = wishlistReducer(initialState, clearWishlist());

      expect(state).toEqual({ items: [] });
    });

    it("keeps an already empty wishlist empty", () => {
      // Verifies clearWishlist is safe to call on initial state.
      const state = wishlistReducer(undefined, clearWishlist());

      expect(state).toEqual({ items: [] });
    });
  });
});
