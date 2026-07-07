import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Health Ledger API",
      version: "1.0.0",
      description: "JWT-protected API for authentication, food logging, and calorie analytics."
    },
    servers: [{ url: "http://localhost:4000" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: { name: { type: "string" }, email: { type: "string" }, password: { type: "string" } }
        },
        FoodLogRequest: {
          type: "object",
          required: ["foodName", "mealCategory", "consumedDateTime", "portionQuantity", "portionUnit", "calories"],
          properties: {
            foodName: { type: "string", example: "Greek Yogurt" },
            mealCategory: { type: "string", example: "BREAKFAST" },
            consumedDateTime: { type: "string", format: "date-time" },
            portionQuantity: { type: "number", example: 1 },
            portionUnit: { type: "string", example: "BOWLS" },
            calories: { type: "integer", example: 210 },
            notes: { type: "string" },
            tags: { type: "array", items: { type: "string" }, example: ["Healthy", "High Protein"] }
          }
        },
        Error: {
          type: "object",
          properties: { message: { type: "string" }, details: { type: "array", items: { type: "object" } } }
        }
      }
    },
    paths: {
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/RegisterRequest" } } } },
          responses: { "201": { description: "Registered user and access token" }, "409": { description: "Email already registered" } }
        }
      },
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { email: { type: "string" }, password: { type: "string" } } } } } },
          responses: { "200": { description: "Authenticated user and access token" }, "401": { description: "Invalid credentials" } }
        }
      },
      "/api/foodlogs": {
        get: { tags: ["Food Logs"], security: [{ bearerAuth: [] }], responses: { "200": { description: "Paginated food logs" } } },
        post: {
          tags: ["Food Logs"],
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/FoodLogRequest" } } } },
          responses: { "201": { description: "Created food log" }, "422": { description: "Validation error" } }
        }
      },
      "/api/foodlogs/search": {
        get: { tags: ["Food Logs"], security: [{ bearerAuth: [] }], responses: { "200": { description: "Search results" } } }
      },
      "/api/analytics/weekly-calories": {
        get: { tags: ["Analytics"], security: [{ bearerAuth: [] }], responses: { "200": { description: "Last 7 days calorie totals" } } }
      },
      "/api/analytics/monthly-calories": {
        get: { tags: ["Analytics"], security: [{ bearerAuth: [] }], responses: { "200": { description: "Current month calorie totals" } } }
      },
      "/api/analytics/meal-distribution": {
        get: { tags: ["Analytics"], security: [{ bearerAuth: [] }], responses: { "200": { description: "Meal category percentage distribution" } } }
      }
    }
  },
  apis: []
});
