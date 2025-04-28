import { useEffect, useState } from 'react';

const baseURL = import.meta.env.VITE_BASE_URL;

export function useFetchTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${baseURL}/api/todos`);

        if (!response.ok) {
          throw new Error('네트워크 오류 발생');
        }

        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return { todos, loading, error };
}
