import requestsReducer, { addRequest, approveRequest, rejectRequest } from '../store/requestsSlice';

describe('requestsSlice', () => {
  it('should add a new request', () => {
    const state = requestsReducer(undefined, addRequest({ title: 'Test', description: 'Desc' }));
    expect(state.requests[0].title).toBe('Test');
    expect(state.requests[0].status).toBe('Pending');
  });

  it('should approve a request', () => {
    let state = requestsReducer(undefined, addRequest({ title: 'Test', description: 'Desc' }));
    const id = state.requests[0].id;
    state = requestsReducer(state, approveRequest(id));
    expect(state.requests[0].status).toBe('Approved');
  });

  it('should reject a request', () => {
    let state = requestsReducer(undefined, addRequest({ title: 'Test', description: 'Desc' }));
    const id = state.requests[0].id;
    state = requestsReducer(state, rejectRequest(id));
    expect(state.requests[0].status).toBe('Rejected');
  });
});
