import store, { fetchDataSync, fetchDataAsync } from './mock_store';
import backstory from '../src';

describe('Test backstory:', () => {
  it('async prefetch actions', () => {
    backstory(store, [fetchDataAsync.bind(null, 'nithinpeter')]).then(() => {
      let newState = store.getState();
      expect(newState.data.name, 'nithinpeter');
    })
  });

  it('sync prefetch actions', () => {
    backstory(store, [fetchDataSync.bind(null, 'nithinpeter')]).then(() => {
      let newState = store.getState();
      expect(newState.data3, 'nithinpeter');
    })
  });
});