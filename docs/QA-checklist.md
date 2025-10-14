# QA Checklist

Acceptance items for the integration branch. Separate items for Agent, Operator, and Admin.

Agent
- Can create a booking with required fields (app_or_order_id, name, phone, address).
- Receives prompt message: "Booking created successfully. Please complete the delivery information."
- Can apply delivery phone OTP and verify it.
- Can resend OTP and view retry info.

Operator
- Can view booking list with pagination (current_page, per_page, total, total_pages, has_next, has_prev?).
- Can update booking delivery information and receive success message "Booking delivery information updated successfully".

Admin
- Can view all bookings and filter by status (e.g., "pre_booked").
- Bag operations: can create, add items, close, and mark received.
- Branch mapping and operator lists are available.

General
- Dates are sent in `DD:MM:YYYY HH:mm:ss` format.
- On 401 the app clears tokens and navigates to `/login`.
- API client uses Authorization header `Bearer <access_token>` when present.
