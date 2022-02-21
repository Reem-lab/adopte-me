import { useState, useEffect } from 'react';

const localCash = {};
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState('unloaded');

  useEffect(() => {
    async function requestBreedList() {
      setBreedList([]);
      setStatus('loading');

      const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
      const json = await res.json();
      localCash[animal] = json.breeds || [];

      setBreedList(localCash[animal]);
      setStatus('loaded');
    }
    if (!animal) {
      setBreedList([]);
    } else if (localCash[animal]) {
      setBreedList(localCash[animal]);
    } else {
      requestBreedList();
    }
  }, [animal]);

  return [breedList, status];
}
