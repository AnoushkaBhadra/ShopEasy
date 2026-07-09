import productReducer, {
  setProducts,
  setLoading,
  searchProducts,
  filterProducts,
  clearProducts,
  setError,
} from "./productSlice";

describe("productSlice", () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 2500,
    },
    {
      id: 2,
      name: "Coffee Mug",
      category: "Kitchen",
      price: 300,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 1800,
    },
  ];

  it("returns the initial state when called with an unknown action", () => {
    // Verifies the reducer exposes the expected product defaults.
    expect(productReducer(undefined, { type: "unknown" })).toEqual({
      products: [],
      filteredProducts: [],
      loading: false,
      search: "",
      error: "",
      category: "All",
    });
  });

  describe("setProducts", () => {
    it("stores products, mirrors them into filteredProducts, and clears loading", () => {
      // Verifies fetched products become the visible product list.
      const initialState = {
        products: [],
        filteredProducts: [],
        loading: true,
        search: "",
        error: "",
        category: "All",
      };

      const state = productReducer(initialState, setProducts(products));

      expect(state.products).toEqual(products);
      expect(state.filteredProducts).toEqual(products);
      expect(state.loading).toBe(false);
    });

    it("handles an empty product list", () => {
      // Verifies an empty API response clears visible products.
      const state = productReducer(undefined, setProducts([]));

      expect(state.products).toEqual([]);
      expect(state.filteredProducts).toEqual([]);
      expect(state.loading).toBe(false);
    });
  });

  describe("setLoading", () => {
    it("sets loading to true", () => {
      // Verifies loading can be enabled while products are fetched.
      const state = productReducer(undefined, setLoading(true));

      expect(state.loading).toBe(true);
    });

    it("sets loading to false", () => {
      // Verifies loading can be disabled after product work finishes.
      const initialState = {
        products: [],
        filteredProducts: [],
        loading: true,
        search: "",
        error: "",
        category: "All",
      };

      const state = productReducer(initialState, setLoading(false));

      expect(state.loading).toBe(false);
    });
  });

  describe("searchProducts", () => {
    it("filters products by name using a case-insensitive search", () => {
      // Verifies search matches product names regardless of case.
      const initialState = {
        products,
        filteredProducts: products,
        loading: false,
        search: "",
        error: "",
        category: "All",
      };

      const state = productReducer(
        initialState,
        searchProducts("WIRELESS")
      );

      expect(state.search).toBe("WIRELESS");
      expect(state.filteredProducts).toEqual([products[0]]);
    });

    it("returns all products for an empty search string", () => {
      // Verifies clearing the search restores the full product list.
      const initialState = {
        products,
        filteredProducts: [products[0]],
        loading: false,
        search: "wireless",
        error: "",
        category: "All",
      };

      const state = productReducer(initialState, searchProducts(""));

      expect(state.search).toBe("");
      expect(state.filteredProducts).toEqual(products);
    });

    it("returns an empty list when no product names match", () => {
      // Verifies unmatched search text produces no visible products.
      const initialState = {
        products,
        filteredProducts: products,
        loading: false,
        search: "",
        error: "",
        category: "All",
      };

      const state = productReducer(initialState, searchProducts("laptop"));

      expect(state.filteredProducts).toEqual([]);
    });
  });

  describe("filterProducts", () => {
    it("filters products by category", () => {
      // Verifies category selection narrows the visible products.
      const initialState = {
        products,
        filteredProducts: products,
        loading: false,
        search: "",
        error: "",
        category: "All",
      };

      const state = productReducer(
        initialState,
        filterProducts("Electronics")
      );

      expect(state.category).toBe("Electronics");
      expect(state.filteredProducts).toEqual([products[0], products[2]]);
    });

    it("restores all products when category is All", () => {
      // Verifies the All category removes category filtering.
      const initialState = {
        products,
        filteredProducts: [products[0], products[2]],
        loading: false,
        search: "",
        error: "",
        category: "Electronics",
      };

      const state = productReducer(initialState, filterProducts("All"));

      expect(state.category).toBe("All");
      expect(state.filteredProducts).toEqual(products);
    });

    it("returns an empty list when no products belong to the category", () => {
      // Verifies unknown categories are handled without errors.
      const initialState = {
        products,
        filteredProducts: products,
        loading: false,
        search: "",
        error: "",
        category: "All",
      };

      const state = productReducer(initialState, filterProducts("Books"));

      expect(state.category).toBe("Books");
      expect(state.filteredProducts).toEqual([]);
    });
  });

  describe("clearProducts", () => {
    it("clears products and resets search, category, and loading", () => {
      // Verifies clearProducts restores product browsing state.
      const initialState = {
        products,
        filteredProducts: [products[0]],
        loading: true,
        search: "wireless",
        error: "Failed",
        category: "Electronics",
      };

      const state = productReducer(initialState, clearProducts());

      expect(state).toEqual({
        products: [],
        filteredProducts: [],
        loading: false,
        search: "",
        error: "Failed",
        category: "All",
      });
    });
  });

  describe("setError", () => {
    it("stores an error message and clears loading", () => {
      // Verifies failed product loading records the error and stops loading.
      const initialState = {
        products: [],
        filteredProducts: [],
        loading: true,
        search: "",
        error: "",
        category: "All",
      };

      const state = productReducer(initialState, setError("Network error"));

      expect(state.error).toBe("Network error");
      expect(state.loading).toBe(false);
    });
  });
});
