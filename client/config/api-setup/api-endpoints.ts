
export const apiEndpoints = {
  auth: {
    // login: "/wp-json/jwt-auth/v1/token",
    // login: "/wp-json/auth/v1/login",
    login: "/wp-json/jwt-auth/v1/token",
    register: "/wp-json/auth/v1/register",
    guestregister: "/wp-json/auth/v1/guest",
    verifyotp: "/wp-json/auth/v1/verify",
    forgotpassword: "/wp-json/custom/v1/reset-password",
    setpassword: "/wp-json/custom/v1/reset-password/",
    resendotp: "/wp-json/auth/v1/resend-otp",
    changepassword: "/wp-json/custom/v1/change-password",
  },

  
  menu: {
    navbar: `/wp-json/menus/v1/menus/primary-menu`,
    contactus: ``,
    // footer: `/wp-json/menus/v1/menus/footer-menu`,
    footerquicklinks: `/wp-json/menus/v1/menus/57`,
    footercustomersupport: `/wp-json/menus/v1/menus/58`,
    footercustomization: `/wp-json/menus/v1/menus/59`,
    about: `/wp-json/acf/v3/pages/678`,
  },
  products: {
    productLists: (per_page: number, page: number, category?: string) =>
      `/wp-json/wc/v3/products?orderby=menu_order&order=asc&per_page=${per_page}&page=${page}${category && category !== undefined ? `&category=${category}` : ""}`,

    productDetails: (slug: number, sku?: string) => `/wp-json/wc/v3/products/${slug}${sku ? `/${sku}` : ``}`,

    search: (slug: number | string) => `/wp-json/custom-api/v1/products?slug=${slug}`,

    productImage: (imageId: string | number) => `/wp-json/wp/v2/media/${imageId}`,

    addImage: `/wp-json/wc/v2/media`,
  },
  categories: {
      categories: (id?: number | string) => `/wp-json/wc/v3/categories${id ? `/${id}` : ""}`,
  },

  order: {
    orderdetails: (oid?: number | string) => `/wp-json/wc/v3/orders${oid ? `/${oid}` : ""}`,
    orders: `/wp-json/my-api/v1/orders-by-customer/`,
    placeorder: "/wp-json/telr-payment/v1/create-order",
    updateorder: (oid?: number | string) => `/wp-json/wc/v3/orders/${oid}`,
  },
  user: {
    updateprofile: `/wp-json/wc/v3/customers/`,
  },
  cart: {
    getcart: `/wp-json/wc/store/v1/cart`,
    addtocart: "/wp-json/wc/store/v1/cart/add-item",
    removefromcart: (itemKey: string) => `/wp-json/wc/store/v1/cart/items/${itemKey}`,
    clearcart: `/wp-json/wc/store/v1/cart`,
  },

  pages: {},

  //Yoast Metadata
  metadata: {
    metadata: "/wp-json/yoast/v1/get_head",
  },

  seoUrls: {},

  status: {},
};
