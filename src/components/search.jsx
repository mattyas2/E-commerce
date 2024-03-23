import  { useState, useEffect } from 'react'
import { app } from '../assets/config/firebase.js';
import "firebase/firestore"


export const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchFirestore = async () => {
      const db =app.firestore();
      const collectionRef = db.collection('productos');
      const querySnapshot = await collectionRef.where('name', '>=', query).where('name', '<=', query + '\uf8ff').get();
      const res = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setResults(res);
    };

    if (query) {
      searchFirestore();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..." />
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;