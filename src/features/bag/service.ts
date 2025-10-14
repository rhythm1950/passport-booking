import api from '../../lib/api';

export async function createBag(payload: unknown) {
  return api.post('/bag/create', payload);
}

export async function addItemToBag(payload: unknown) {
  return api.post('/bag/item_add', payload);
}

export async function closeBag(payload: unknown) {
  return api.post('/bag/close', payload);
}

export async function receiveBag(payload: unknown) {
  return api.post('/bag/receive', payload);
}

export async function branchList(params?: Record<string, unknown>) {
  return api.get('/bag/branch-list/', { params });
}

export async function branchMapping(payload: unknown) {
  return api.post('/bag/branch-mapping', payload);
}

export async function operatorList(params?: Record<string, unknown>) {
  return api.get('/bag/operator-list', { params });
}
