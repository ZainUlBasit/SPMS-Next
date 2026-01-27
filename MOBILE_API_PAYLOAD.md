# Mobile App API - Create Order Payload

## Endpoint
**POST** `/api/order`

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api` (update in `Https/index.js`)

## Request Headers
```
Content-Type: application/json
Accept: application/json
```

## Request Payload Schema

```json
{
  "customerId": "string (MongoDB ObjectId)",
  "date": "string (ISO 8601 date) or number (timestamp)",
  "invoice_no": "number (must be unique, positive integer)",
  "discount": "number (default: 0)",
  "items": [
    {
      "itemId": "string (MongoDB ObjectId)",
      "qty": "number (quantity, must be > 0)",
      "price": "number (sale price per unit)",
      "purchase": "number (purchase/cost price per unit)",
      "amount": "number (qty * price, total for this item)"
    }
  ]
}
```

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customerId` | String (ObjectId) | ✅ Yes | MongoDB ObjectId of the customer placing the order |
| `date` | String/Number | ✅ Yes | Order date. Can be ISO string (e.g., "2026-01-27") or timestamp. Will be normalized to midnight UTC |
| `invoice_no` | Number | ✅ Yes | Unique invoice number (must not exist in Orders or Transactions) |
| `discount` | Number | ✅ Yes | Discount amount (default: 0) |
| `items` | Array | ✅ Yes | Array of order items (must have at least 1 item) |
| `items[].itemId` | String (ObjectId) | ✅ Yes | MongoDB ObjectId of the item |
| `items[].qty` | Number | ✅ Yes | Quantity ordered (must be > 0) |
| `items[].price` | Number | ✅ Yes | Sale price per unit |
| `items[].purchase` | Number | ✅ Yes | Purchase/cost price per unit |
| `items[].amount` | Number | ✅ Yes | Total amount for this item (qty × price) |

## Example Payload

```json
{
  "customerId": "65a1b2c3d4e5f6789abcdef0",
  "date": "2026-01-27",
  "invoice_no": 12345,
  "discount": 100.50,
  "items": [
    {
      "itemId": "65a1b2c3d4e5f6789abcdef1",
      "qty": 5,
      "price": 250.00,
      "purchase": 150.00,
      "amount": 1250.00
    },
    {
      "itemId": "65a1b2c3d4e5f6789abcdef2",
      "qty": 10,
      "price": 100.00,
      "purchase": 60.00,
      "amount": 1000.00
    }
  ]
}
```

## Response Format

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "payload": {
      "_id": "65a1b2c3d4e5f6789abcdef3",
      "customerId": "65a1b2c3d4e5f6789abcdef0",
      "date": 1706313600,
      "invoice_no": 12345,
      "discount": 100.50,
      "items": [
        {
          "itemId": "65a1b2c3d4e5f6789abcdef1",
          "qty": 5,
          "price": 250.00,
          "purchase": 150.00,
          "amount": 1250.00
        },
        {
          "itemId": "65a1b2c3d4e5f6789abcdef2",
          "qty": 10,
          "price": 100.00,
          "purchase": 60.00,
          "amount": 1000.00
        }
      ],
      "total_amount": 2250.00,
      "status": "PENDING",
      "createdAt": "2026-01-27T08:00:00.000Z",
      "updatedAt": "2026-01-27T08:00:00.000Z"
    },
    "msg": "Order created successfully and pending approval!"
  }
}
```

### Error Responses

#### 422 - Validation Error
```json
{
  "success": false,
  "error": {
    "status": 422,
    "message": "Required fields are undefined!"
  }
}
```

#### 404 - Customer Not Found
```json
{
  "success": false,
  "error": {
    "status": 404,
    "message": "Customer not found!"
  }
}
```

#### 409 - Invoice Number Already Exists
```json
{
  "success": false,
  "error": {
    "status": 409,
    "message": "Invoice number already exists in orders!"
  }
}
```

#### 500 - Server Error
```json
{
  "success": false,
  "error": {
    "status": 500,
    "message": "Internal server error message"
  }
}
```

## Important Notes

1. **Order Status**: All orders created via this API start with status `"PENDING"` and require admin approval via the web interface.

2. **Invoice Number Uniqueness**: The `invoice_no` must be unique across both Orders and Transactions. Check before submitting.

3. **Date Format**: The `date` field will be normalized to midnight UTC (00:00:00). You can send:
   - ISO date string: `"2026-01-27"`
   - ISO datetime: `"2026-01-27T10:30:00Z"`
   - Timestamp: `1706313600`

4. **Total Amount**: The API automatically calculates `total_amount` as the sum of all `items[].amount` values. You don't need to send it.

5. **Stock Validation**: Stock is NOT checked during order creation. Stock validation happens only when the order is approved.

6. **Account Updates**: Customer accounts (total, remaining, discount) are NOT updated during order creation. They are updated only when the order is approved.

## Mobile App Integration Example (JavaScript/TypeScript)

```typescript
interface OrderItem {
  itemId: string;
  qty: number;
  price: number;
  purchase: number;
  amount: number;
}

interface CreateOrderPayload {
  customerId: string;
  date: string | number;
  invoice_no: number;
  discount: number;
  items: OrderItem[];
}

async function createOrder(payload: CreateOrderPayload) {
  try {
    const response = await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Order created:', data.data.payload);
      return data.data.payload;
    } else {
      console.error('Error:', data.error.message);
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
}

// Usage
const orderPayload: CreateOrderPayload = {
  customerId: "65a1b2c3d4e5f6789abcdef0",
  date: new Date().toISOString().split('T')[0], // "2026-01-27"
  invoice_no: 12345,
  discount: 100.50,
  items: [
    {
      itemId: "65a1b2c3d4e5f6789abcdef1",
      qty: 5,
      price: 250.00,
      purchase: 150.00,
      amount: 1250.00
    }
  ]
};

createOrder(orderPayload);
```

## Related Endpoints

- **GET** `/api/order?status=PENDING` - List orders (for web admin)
- **POST** `/api/order/approve` - Approve order (converts to transaction, updates stock & accounts)
- **POST** `/api/order/reject` - Reject order
