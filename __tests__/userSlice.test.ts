import userReducer, { setRole, setName, updateProfile, logout, setUser } from '../store/userSlice';

describe('userSlice', () => {
  it('should set the user role', () => {
    let state = userReducer(
      undefined,
      setUser({
        user: { id: '1', name: 'A', email: 'a@example.com', role: 'Sales Agent' },
        token: 't',
      })
    );
    state = userReducer(state, setRole('Admin/Manager'));
    expect(state.user?.role).toBe('Admin/Manager');
  });

  it('should set the user name', () => {
    let state = userReducer(
      undefined,
      setUser({
        user: { id: '1', name: 'John', email: 'j@example.com', role: 'Sales Agent' },
        token: 't',
      })
    );
    state = userReducer(state, setName('John Doe'));
    expect(state.user?.name).toBe('John Doe');
  });

  it('should update the user profile', () => {
    let state = userReducer(
      undefined,
      setUser({
        user: { id: '1', name: 'John', email: 'j@example.com', role: 'Sales Agent' },
        token: 't',
      })
    );
    state = userReducer(state, updateProfile({ name: 'Jane' }));
    expect(state.user?.name).toBe('Jane');
  });

  it('should logout the user', () => {
    let state = userReducer(
      undefined,
      setUser({
        user: { id: '1', name: 'Test', email: 't@example.com', role: 'Sales Agent' },
        token: 't',
      })
    );
    state = userReducer(state, logout());
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });
});
