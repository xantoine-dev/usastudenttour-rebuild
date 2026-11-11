# Booking demo tests

Run the focused regression suite with Node.js 22 or later from the repository root:

```sh
node --test booking-demo/tests/*.test.cjs
```

The suite executes the actual inline scripts from `public/booking.html` and
`public/confirm.html` with Node's built-in test runner and VM. A small DOM boundary
provides the page's elements, native event targets, classes and storage. Controlled
HTTP promises exercise response ordering without making network requests or real
bookings. No test or runtime dependencies are installed.

These tests cover quote invalidation, request races, submit validation, and the
saved confirmation summary. They do not test browser layout, native form UI, or
deployed Netlify connectivity.
