import { useEffect, useState } from 'react';
import {
  incrementCounter,
  decrementCounter,
  getCounter,
  setCounter,
  listCounters,
} from '../services/counterApiService';

type GroupBy = 'hour' | 'day' | 'week' | 'month' | 'year';
type OrderBy = 'asc' | 'desc';

export function useCounterApi(namespace: string, key: string) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countersList, setCountersList] = useState<any[]>([]); // Depende del formato que devuelve /list
  const [successfulIncrement, setSuccessfulIncrement] = useState(false);

  const increment = async () => {
    try {
      setLoading(true);
      const data = await incrementCounter(namespace, key);
      setCount(data.count);
      setError(null); // ✅ Éxito: limpiamos error
      setSuccessfulIncrement(true);
    } catch (err) {
      setError((err as Error).message); // ✅ Guardamos error visible

      // 🚀 Retry automático después de 5 segundos
      setTimeout(() => {
        increment(); // 👈 Reintenta
      }, 10000);
    } finally {
      setTimeout(() => {
        setLoading(false); // ✅ Siempre limpiamos el loading
      }, 2000); // 👈 Simulamos un tiempo de carga
    }
  };

  const decrement = async () => {
    try {
      setLoading(true);
      const data = await decrementCounter(namespace, key);
      setCount(data.count);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setTimeout(() => {
        setLoading(false); // ✅ Siempre limpiamos el loading
      }, 2000); // 👈 Simulamos un tiempo de carga
    }
  };

  const fetchCounter = async () => {
    try {
      setLoading(true);
      const data = await getCounter(namespace, key);
      setCount(data.count);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setTimeout(() => {
        setLoading(false); // ✅ Siempre limpiamos el loading
      }, 2000); // 👈 Simulamos un tiempo de carga
    }
  };

  const setCounterValue = async (value: number) => {
    try {
      setLoading(true);
      const data = await setCounter(namespace, key, value);
      setCount(data.count);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setTimeout(() => {
        setLoading(false); // ✅ Siempre limpiamos el loading
      }, 2000); // 👈 Simulamos un tiempo de carga
    }
  };

  const fetchCountersList = async (options?: {
    group_by?: GroupBy;
    order_by?: OrderBy;
  }) => {
    try {
      setLoading(true);
      const data = await listCounters(namespace, key, options);
      setCountersList(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    increment();
    // setCount(5);
    // const timeOut = setTimeout(() => {
    //   setLoading(false);
    // }, 5000);
    // return () => {
    //   clearTimeout(timeOut);
    // };
  }, []);

  useEffect(() => {
    if (!successfulIncrement) return; // 🚫 No hacemos nada hasta que sea exitoso

    const interval = setInterval(() => {
      fetchCounter();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [successfulIncrement]); // 👈 Escuchamos cambios en successful

  return {
    count,
    loading,
    error,
    refresh: fetchCounter,
    increment,
    decrement,
    setCounter: setCounterValue,
    listCounters: fetchCountersList,
    countersList,
  };
}
