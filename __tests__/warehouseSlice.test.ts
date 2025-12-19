import warehouseReducer, { addStock, releaseStock } from '../store/warehouseSlice';

describe('warehouseSlice', () => {
  it('should add stock to a warehouse', () => {
    const state = warehouseReducer(undefined, addStock({ warehouse: 'Test', quantity: 10 }));
    expect(state.stock['Test']).toBe(10);
    expect(state.movements[0].type).toBe('intake');
  });

  it('should release stock from a warehouse', () => {
    let state = warehouseReducer(undefined, addStock({ warehouse: 'Test', quantity: 10 }));
    state = warehouseReducer(state, releaseStock({ warehouse: 'Test', quantity: 5 }));
    expect(state.stock['Test']).toBe(5);
    expect(state.movements[0].type).toBe('release');
  });

  it('should not allow negative stock', () => {
    let state = warehouseReducer(undefined, addStock({ warehouse: 'Test', quantity: 5 }));
    state = warehouseReducer(state, releaseStock({ warehouse: 'Test', quantity: 10 }));
    expect(state.stock['Test']).toBe(0);
  });
});
