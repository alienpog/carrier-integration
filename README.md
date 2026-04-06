🚚 Carrier Integration Service (UPS Rating API)
📌 Overview

This project implements a shipping carrier integration service in TypeScript using Express.
It provides a normalized interface for fetching shipping rates while abstracting away carrier-specific details.

The current implementation integrates with UPS Rating API (stubbed) and is designed to be easily extended to support additional carriers such as FedEx, DHL, and USPS.

🎯 Goals
Provide a clean, extensible architecture for carrier integrations
Normalize external API responses into internal domain models
Implement OAuth 2.0 token lifecycle management
Ensure strong typing and validation
Handle real-world error scenarios
Include integration tests with stubbed responses
🏗️ Architecture

The system is designed with separation of concerns and extensibility in mind.

Key Components
1. Carrier Interface

Defines a standard contract that all carriers must implement.

getRates(request: RateRequest): Promise<RateResponse[]>

👉 This allows adding new carriers without modifying existing logic.

2. Rate Service

Acts as the main entry point for rate requests.

Responsibilities:

Input validation
Delegating requests to the selected carrier
3. UPS Module

Encapsulates all UPS-specific logic:

Request/response mapping
API client logic (stubbed)
Authentication handling
4. Mapper Layer

Separates internal models from external API formats.

Why this matters:

Prevents coupling to UPS structure
Makes it easy to plug in other carriers
5. OAuth Service

Handles:

Token acquisition
Token caching
Automatic refresh on expiry

This is fully transparent to the caller.

6. Validation Layer

Uses Zod to validate all incoming requests before processing.

7. Error Handling

Custom structured errors ensure:

Consistent error responses
Easier debugging
No swallowed exceptions
🔄 Request Flow
Client sends rate request → /rates
Request is validated
RateService calls selected carrier (UPS)
Request is mapped → UPS format
(Stubbed) API call executed
Response mapped → internal format
Normalized response returned
🧪 Testing

Integration tests simulate real API interactions using stubbed responses.

Tests cover:
✅ Request mapping correctness
✅ Response normalization
✅ Token lifecycle (mocked)
✅ Error scenarios (planned extension)

Run tests:

npm test or use test.http file and click send request at the top 

⚙️ Setup & Installation
npm install
npm run dev

Server runs on:

http://localhost:3000
📡 API Usage
Endpoint
POST /rates
Request Body
{
  "origin": "10001",
  "destination": "90001",
  "weight": 2
}
Response
[
  {
    "price": "120",
    "service": "03"
  }
]
🔐 Environment Variables

Create a .env file based on:

UPS_CLIENT_ID=
UPS_CLIENT_SECRET=
UPS_BASE_URL=
UPS_VERSION=
UPS_REQUEST_OPTION=

🚧 UPS API Integration Notes

This project uses stubbed responses instead of real API calls.

To integrate real UPS API:
Replace stub in UPSService with actual HTTP request
Implement OAuth call in OAuthService
Use:
Rating endpoint
OAuth token endpoint

Example (to be implemented):

POST https://onlinetools.ups.com/security/v1/oauth/token
POST https://onlinetools.ups.com/api/rating
➕ Extending the System
Adding a New Carrier (e.g., FedEx)
Create new folder:
src/carriers/fedex/
Implement Carrier interface:
class FedExService implements Carrier
Add:
Mapper
API client
Types
Inject into RateService

✅ No changes required to existing UPS code.

Adding New Features

Future operations can include:

Label purchase
Shipment tracking
Address validation

Each can follow the same modular pattern.

⚠️ Error Handling Strategy

Planned handling includes:

Network failures
Invalid responses
Authentication errors
Rate limiting

All errors should return structured responses:

{
  "message": "Error message",
  "code": "ERROR_CODE",
  "status": 400
}
🧠 Design Decisions
Why Express?

Lightweight, flexible, and aligns with the requirements without over-engineering.

Why Mapper Pattern?

Prevents tight coupling with external APIs and improves maintainability.

Why Interface-Based Carriers?

Supports plug-and-play architecture for multiple carriers.

Why Stubbed API Calls?

No UPS credentials were provided. Focus is on architecture and correctness.

🚀 Future Improvements

If given more time:

Implement real UPS API integration
Add retry logic + timeout handling
Expand test coverage (error scenarios, edge cases)
Add logging & monitoring
Support multiple carriers dynamically
Add request tracing for debugging
