import { rest } from 'msw';

export const handlers = [
  // Booking create
  rest.post('/booking/create', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(201),
      ctx.json({
        message: 'Booking created successfully. Please complete the delivery information.',
        data: { booking: { id: 'booking_1', ...body } },
      })
    );
  }),

  // Booking update
  rest.put('/booking/create/update/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const body = await req.json();
    return res(
      ctx.status(200),
      ctx.json({ message: 'Booking delivery information updated successfully', data: { booking: { id, ...body } } })
    );
  }),

  // Booking list
  rest.get('/booking/list', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page') ?? 1);
    const per_page = Number(req.url.searchParams.get('per_page') ?? 10);
    const total = 1;
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          { id: 'booking_1', status: req.url.searchParams.get('status') ?? 'initial', name: 'John Doe' },
        ],
        pagination: {
          current_page: page,
          per_page,
          total,
          total_pages: 1,
          has_next: false,
          has_prev: false,
        },
      })
    );
  }),

  // Booking details
  rest.get('/booking/details/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.status(200), ctx.json({ data: { id, name: 'John Doe', status: 'initial' } }));
  }),

  // OTP apply (delivery phone apply verification)
  rest.post('/booking/delivery-phone', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(200),
      ctx.json({ message: 'Delivery phone updated and OTP sent successfully', data: { phone: body.phone } })
    );
  }),

  // OTP verify
  rest.post('/booking/verify-delivery-phone', async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(200), ctx.json({ message: 'Delivery phone verified successfully', data: { phone: body.phone } }));
  }),

  // OTP resend
  rest.post('/booking/resend-otp', async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(200), ctx.json({ message: 'OTP resent successfully', data: { phone: body.phone } }));
  }),

  // OTP retry info
  rest.post('/booking/otp-retry-info', async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(200), ctx.json({ message: 'OTP retry info', data: { attempts_left: 3 } }));
  }),
];
