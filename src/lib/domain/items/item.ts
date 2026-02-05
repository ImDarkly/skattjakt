import data from '@/lib/api/items.json';

export default function getItems() {
  const raw = localStorage.getItem('items');

  if (raw === null) {
    localStorage.setItem('items', JSON.stringify(data));
    return data;
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem('items', JSON.stringify(data));
    return data;
  }
}
