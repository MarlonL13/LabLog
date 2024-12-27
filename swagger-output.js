const swaggerDocument = {
  openapi: "3.1.0",
  info: {
    title: "LabLog API",
    description: "API Documentation for LabLog",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ["http"],
  paths: {
    "/auth/login": {
      post: {
        description: "User authentication endpoint that accepts user credentials and returns an authentication token",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
                example: {
                  name: "John Doe",
                  email: "john.doe@example.com",
                  password: "securepassword",
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/auth/refresh": {
      post: {
          description: "Endpoint to refresh the authentication token",
        tags: ["Auth"],
        responses: {
          200: {
            description: "OK",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/auth/logout": {
      post: {
        description: "Endpoint to logout the user",
        tags: ["Auth"],
        responses: {
          200: {
            description: "OK",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/auth/forgot-password": {
      post: {
        description: "Endpoint to create a new user",
        tags: ["Auth"],
        responses: {
          default: {
            description: "",
          },
        },
      },
    },
    "/users/search": {
      get: {
        description: "Endpoint to search for users",
        tags: ["Users"],
        parameters: [
          {
            name: "name",
            in: "query",
            schema: {
              type: "string",
            },
          },
          {
            name: "role",
            in: "query",
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        description: "Endpoint to get a user by ID",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      patch: {
        description: "Endpoint to update a user by ID",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/users/": {
      post: {
        description: "Endpoint to create a new user",
        tags: ["Users"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/locations/": {
      post: {
        description: "Endpoint to create a new location",
        tags: ["Locations"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/locations/{laboratory}": {
      get: {
        description: "Endpoint to get a location by laboratory",
        tags: ["Locations"],
        parameters: [
          {
            name: "laboratory",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/locations/{id}": {
      delete: {
        description: "Endpoint to delete a location by ID",
        tags: ["Locations"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/specs/search": {
      get: {
        description: "Endpoint to search for specs",
        tags: ["Specs"],
        parameters: [
          {
            name: "name",
            in: "query",
            schema: {
              type: "string",
            },
            required: true,
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/specs/{id}": {
      get: {
        description: "Endpoint to get a spec by ID",
        tags: ["Specs"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      patch: {
        description: "Endpoint to update a spec by ID",
        tags: ["Specs"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/specs/": {
      post: {
        description: "Endpoint to create a new spec",
        tags: ["Specs"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/products/{id}": {
      get: {
        description: "Endpoint to get a product by ID",
        tags: ["Products"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        description: "Endpoint to delete a product by ID",
        tags: ["Products"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      patch: {
        description: "Endpoint to update a product by ID",
        tags: ["Products"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/products/": {
      post: {
        description: "Endpoint to create a new product",
        tags: ["Products"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/projects/search": {
      get: {
        description: "Endpoint to search for projects",
        tags: ["Projects"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "name",
            in: "query",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/projects/{id}": {
      get: {
        description: "Endpoint to get a project by ID",
        tags: ["Projects"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      patch: {
        description: "Endpoint to update a project by ID",
        tags: ["Projects"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/projects/": {
      get: {
        description: "Endpoint to get all projects",
        tags: ["Projects"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        description: "Endpoint to create a new project",
        tags: ["Projects"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/equipments/{id}": {
      patch: {
        description: "Endpoint to update an equipment by ID",
        tags: ["Equipments"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/equipments/": {
      get: {
        description: "Endpoint to get all equipments",
        tags: ["Equipments"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "status",
            in: "query",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        description: "Endpoint to create a new equipment",
        tags: ["Equipments"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/reservations/search": {
      get: {
        description: "Endpoint to search for reservations",
        tags: ["Reservations"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "name",
            in: "query",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/reservations/{id}": {
      get: {
        description: "Endpoint to get a reservation by ID",
        tags: ["Reservations"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        description: "Endpoint to delete a reservation by ID",
        tags: ["Reservations"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/reservations/": {
      get: {
        description: "Endpoint to get all reservations",
        tags: ["Reservations"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        description: "Endpoint to create a new reservation",
        tags: ["Reservations"],
        parameters: [
          {
            name: "authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "Forbidden",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
};

export default swaggerDocument;
