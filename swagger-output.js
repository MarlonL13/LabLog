const swaggerDocument = {
  openapi: "3.1.0",
  info: {
    title: "LabLog API",
    description: "API Documentation for LabLog",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000/api", // Set the correct base URL
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    "/auth/login": {
      post: {
        description:
          "User authentication endpoint that accepts user credentials and returns an authentication token",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  registration_number: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
                example: {
                  registration_number: "123456789",
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
            enum: ["student", "researcher", "technician", "coordinator"],
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
        ],
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
                  phone: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                    enum: ["student", "researcher", "technician", "coordinator"],
                  },
                  status: {
                    type: "string",
                    enum: ["active", "inactive"],
                  },
                },
                example: {
                  name: "John Doe",
                  email: "example@email.com",
                  phone: "1234567890",
                  role: "student",
                  status: "active",
                },
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
          409: {
            description: "Conflict",
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
        ],
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
                  phone: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                    enum: ["student", "researcher", "technician", "coordinator"],
                  },
                  registration_number: {
                    type: "string",
                  },
                },
                example: {
                  name: "John Doe",
                  email: "example@email.com",
                  phone: "1234567890",
                  role: "student",
                  registration_number: "123456789",
                },
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
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  laboratory: {
                    type: "string",
                    enum: ["lab1", "lab2"],
                  },
                  sub_location: {
                    type: "string",
                  },
                },
                exemple: {
                  laboratory: "lab1",
                  sub_location: "Shelf A",
                },
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
        ],
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
                  abbreviation: {
                    type: "string",
                  },
                  supplier: {
                    type: "string",
                  },
                  size: {
                    type: "number",
                  },
                  unit: {
                    type: "string",
                  },
                  alert_threshold: {
                    type: "number",
                  },
                },
                example: {
                  name: "Acetone",
                  abbreviation: "ACE",
                  supplier: "Fisher Scientific",
                  size: 500,
                  unit: "mL",
                  alert_threshold: 10,
                },
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
        ],
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
                  abbreviation: {
                    type: "string",
                  },
                  supplier: {
                    type: "string",
                  },
                  size: {
                    type: "number",
                  },
                  unit: {
                    type: "string",
                  },
                  alert_threshold: {
                    type: "number",
                  },
                },
                example: {
                  name: "Acetone",
                  abbreviation: "ACE",
                  supplier: "Fisher Scientific",
                  size: 500,
                  unit: "mL",
                  alert_threshold: 10,
                },
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
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  spec_id: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                    enum: ["in_use", "unused"],
                  },
                  project_id: {
                    type: "string",
                  },
                  condition: {
                    type: "string",
                    enum: ["opened", "unopened", "finished"],
                  },
                  location_id: {
                    type: "string",
                  },
                  expiration_date: {
                    type: "string",
                  },
                  current_amount: {
                    type: "number",
                  },
                  date_received: {
                    type: "string",
                  },
                },
                example: {
                  spec_id: "UUID_example",
                  status: "in_use",
                  project_id: "UUID_example",
                  condition: "opened",
                  location_id: "UUID_example",
                  expiration_date: "2022-12-31",
                  current_amount: 500,
                  date_received: "2022-01-01",
                },
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
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["in_use", "unused"],
                  },
                  project_id: {
                    type: "string",
                  },
                  condition: {
                    type: "string",
                    enum: ["opened", "unopened", "finished"],
                  },
                  location_id: {
                    type: "string",
                  },
                  expiration_date: {
                    type: "string",
                  },
                  current_amount: {
                    type: "number",
                  },
                  date_received: {
                    type: "string",
                  },
                },
                example: {
                  status: "in_use",
                  project_id: "123456789",
                  condition: "opened",
                  location_id: "123456789",
                  expiration_date: "2025-12-31",
                  current_amount: 500,
                  date_received: "2024-01-01",
                },
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
        ],
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
                  description: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                    enum: ["active", "inactive"],
                  },
                  participants: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        user_id: {
                          type: "string",
                        },
                        is_coordinator: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                },
                example: {
                  name: "Project 1",
                  description: "Description of Project 1",
                  status: "active",
                  participants: [
                    {
                      user_id: "UUID_Example",
                      is_coordinator: true,
                    },
                  ],
                },
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
        ],
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
                  description: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                    enum: ["active", "inactive"],
                  },
                  participants: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        user_id: {
                          type: "string",
                        },
                        is_coordinator: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                },
                example: {
                  name: "Project 1",
                  description: "Description of Project 1",
                  status: "active",
                  participants: [
                    {
                      user_id: "UUID_Example",
                      is_coordinator: true,
                    },
                  ],
                },
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
        ],
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
                  status: {
                    type: "string",
                    enum: ["available", "maintenance", "broken"],
                  },
                },
                example: {
                  name: "Equipment 1",
                  status: "available",
                },
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
        ],
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
                  status: {
                    type: "string",
                    enum: ["available", "maintenance", "broken"],
                  },
                },
                example: {
                  name: "Equipment 1",
                  status: "available",
                },
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
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  equipment_id: {
                    type: "string",
                  },
                  project_id:{
                    type: "string",
                  },
                  requester_id: {
                    type: "string",
                  },
                  operator: {
                    type: "string",
                    enum: ["self", "technician"],
                  },
                  description: {
                    type: "string",
                  },
                  start_date: {
                    type: "string",
                  },
                  end_date: {
                    type: "string",
                  },
                },
                example: {
                  equipment_id: "UUID_example",
                  project_id: "UUID_example",
                  requester_id: "UUID_example",
                  operator: "self",
                  description: "Reservation description",
                  start_date: "2022-01-01",
                  end_date: "2022-01-02",
                },
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
