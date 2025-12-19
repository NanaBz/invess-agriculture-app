import invoicesReducer, { markPaid, markUnpaid } from '../store/invoicesSlice';

describe('invoicesSlice', () => {
  it('should mark an invoice as paid', () => {
    const initial = invoicesReducer(undefined, { type: '' });
    const id = initial.invoices[0].id;
    const state = invoicesReducer(initial, markPaid(id));
    expect(state.invoices[0].status).toBe('Paid');
  });

  it('should mark an invoice as unpaid', () => {
    const initial = invoicesReducer(undefined, { type: '' });
    const id = initial.invoices[1].id;
    const state = invoicesReducer(initial, markUnpaid(id));
    expect(state.invoices[1].status).toBe('Unpaid');
  });
});
