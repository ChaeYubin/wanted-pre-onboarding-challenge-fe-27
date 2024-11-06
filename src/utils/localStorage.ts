const storage = {
  set(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value); // 객체를 문자열로 변환
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving data in localStorage: ${error}`);
    }
  },
  get(key: string) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null; // JSON으로 파싱하여 반환
    } catch (error) {
      console.error(`Error retrieving data from localStorage: ${error}`);
      return null;
    }
  },
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data from localStorage: ${error}`);
    }
  },
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  },
};

export const getToken = () => {
  return storage.get('token');
};

export const setToken = (token: string) => {
  storage.set('token', token);
};

export const removeToken = () => {
  storage.remove('token');
};
