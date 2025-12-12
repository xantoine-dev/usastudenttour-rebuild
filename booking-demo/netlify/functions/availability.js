exports.handler = async (event) => {
  try {
    const { date, destination, groupSize = 1 } = JSON.parse(event.body || '{}');
    const size = Math.max(1, Number(groupSize) || 1);
    const basePrices = {
      yosemite: 180,
      sanfrancisco: 140,
      losangeles: 150,
      lasvegas: 160,
      default: 130,
    };
    const basePrice = basePrices[(destination || '').toLowerCase()] || basePrices.default;
    const discount = size >= 20 ? 0.9 : size >= 10 ? 0.95 : 1;
    const pricePerPerson = Math.round(basePrice * discount);

    // Simple availability mock
    const remainingSeats = Math.max(12, 50 - size);
    const available = true;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        available,
        pricePerPerson,
        remainingSeats,
        currency: 'USD',
        note: discount < 1 ? 'Group discount applied' : null,
      }),
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }
};
