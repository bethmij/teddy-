
export type Role = 'ADMIN' | 'USER'; 

export interface Route {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
}

export type AccessiblePaths = {
    [key in Role]: Route[];
};

const basePath = process.env.API_BASE_PATH || '/app/api/v1';

export const accessiblePaths: AccessiblePaths = {
    ADMIN: [
        { method: "POST", path: `${basePath}/auth/signIn` },
        { method: "POST", path: `${basePath}/auth/refreshToken` },
        { method: "POST", path: `${basePath}/auth/logout` },
        { method: "GET", path: `${basePath}/user/:email` },
        { method: "GET", path: `${basePath}/user` },
        { method: "GET", path: `${basePath}/user/filterd/all` },
        { method: "POST", path: `${basePath}/user` },
        { method: "PUT", path: `${basePath}/user/:email` },
        { method: "DELETE", path: `${basePath}/user/:email` },
        { method: "GET", path: `${basePath}/product/all/:email` },
        { method: "GET", path: `${basePath}/product/featured/items` },
        { method: "GET", path: `${basePath}/product/:id` },
        { method: "POST", path: `${basePath}/product` },
        { method: "PUT", path: `${basePath}/product/:id` },
        { method: "DELETE", path: `${basePath}/product/:id` },
        { method: "POST", path: `${basePath}/product/cart/items` },
        { method: "GET", path: `${basePath}/order` },
        { method: "POST", path: `${basePath}/order` },
        { method: "GET", path: `${basePath}/order/:email` },
        { method: "GET", path: `${basePath}/wishlist/:email`},
        { method: "POST", path: `${basePath}/wishlist` },
      ],
      USER: [
        { method: "GET", path: `${basePath}/user/:email` },
        { method: "GET", path: `${basePath}/user/filterd/all` },
        { method: "POST", path: `${basePath}/auth/signIn` },
        { method: "POST", path: `${basePath}/auth/refreshToken` },
        { method: "POST", path: `${basePath}/auth/logout` },
        { method: "GET", path: `${basePath}/product/all/:email` },
        { method: "GET", path: `${basePath}/product/featured/items` },
        { method: "GET", path: `${basePath}/product/:id` },
        { method: "POST", path: `${basePath}/product/cart/items` },
        { method: "GET", path: `${basePath}/order/:email` },
        { method: "POST", path: `${basePath}/order` },
        { method: "GET", path: `${basePath}/wishlist/:email` },
        { method: "POST", path: `${basePath}/wishlist` },
      ],
};

export const dirrectAccessRoutes = [
    "/app/api/v1/auth/signIn",
    "/app/api/v1/auth/logout",
    "/app/api/v1/auth/refreshToken",
    "/app/api/v1/product/all/:email",
    "/app/api/v1/product/featured/items",
    "/app/api/v1/product/:id",
    "/app/api/v1/product/cart/items",
    "/app/api/v1/user"
  ];