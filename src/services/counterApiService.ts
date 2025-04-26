const API_BASE_URL = 'https://api.counterapi.dev/v1';

// Incrementar contador
export async function incrementCounter(namespace: string, key: string) {
  const url = `${API_BASE_URL}/${namespace}/${key}/up`;

  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error('Error incrementing counter');
  }

  const data = await response.json();
  return data;
}

// Decrementar contador
export async function decrementCounter(namespace: string, key: string) {
  const url = `${API_BASE_URL}/${namespace}/${key}/down`;

  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error('Error decrementing counter');
  }

  const data = await response.json();
  return data;
}

// Obtener contador
export async function getCounter(namespace: string, key: string) {
  const url = `${API_BASE_URL}/${namespace}/${key}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error getting counter');
  }

  const data = await response.json();
  return data;
}

// Setear contador
export async function setCounter(
  namespace: string,
  key: string,
  value: number
) {
  const url = `${API_BASE_URL}/${namespace}/${key}/?count=${value}`;

  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error('Error setting counter');
  }

  const data = await response.json();
  return data;
}

// Listar histórico del contador
export async function listCounters(
  namespace: string,
  key: string,
  options?: {
    group_by?: 'hour' | 'day' | 'week' | 'month' | 'year';
    order_by?: 'asc' | 'desc';
  }
) {
  console.log('Entrando en list counters-->', namespace, key, options);
  const params = new URLSearchParams();
  if (options?.group_by) params.append('group_by', options.group_by);
  if (options?.order_by) params.append('order_by', options.order_by);

  const url = `${API_BASE_URL}/${namespace}/${key}/list${
    params.toString() ? `?${params}` : ''
  }`;
  console.log('URL list counters-->', url);
  const response = await fetch(url);
  console.log('Response list counters-->', response);
  if (!response.ok) {
    throw new Error('Error listing counters');
  }

  const data = await response.json();
  return data;
}
