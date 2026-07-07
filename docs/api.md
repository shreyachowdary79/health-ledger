# API Documentation Notes

The live OpenAPI UI is served from `GET /api/docs`.

## Error Shape

```json
{
  "message": "Validation failed",
  "details": []
}
```

## Food Log Example

```json
{
  "foodName": "Greek Yogurt",
  "mealCategory": "BREAKFAST",
  "consumedDateTime": "2026-07-07T08:30:00.000Z",
  "portionQuantity": 1,
  "portionUnit": "BOWLS",
  "calories": 210,
  "notes": "Post workout breakfast",
  "tags": ["Healthy", "High Protein"]
}
```

Use `multipart/form-data` with a `foodImage` file field for optional image upload.
