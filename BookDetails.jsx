import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BOOK_DETAILS_URL } from '../API';

const BookDetails = () => {
   const [book, setBook] = useState({});
   const [error, setError] = useState(null);
   const { id } = useParams();

   useEffect(() => {
      const url = `${BOOK_DETAILS_URL}/${id}`;
      console.log('Fetching URL:', url);

      axios.get(url)
         .then((res) => {
            console.log('Response Data:', res.data);
            setBook(res.data);
         })
         .catch((err) => {
            console.error('Error fetching data:', err.response?.data || err.message);
            setError('An error occurred while fetching the book details.');
         });
   }, [id]);

   if (error) return <div>{error}</div>;

   return (
      <div className="book-details">
         <div>
            <h2>{book?.title}</h2>
            <img src={book?.image_url} alt={book?.title} style={{ maxWidth: '100%', height: 'auto' }} />
         </div>
         <div>
            <h2>Description</h2>
            <p>{book?.description}</p>
            <h2>Authors</h2>
            <p>{book?.authors}</p>
            <h2>Genres</h2>
            <p>{book?.genres}</p>
         </div>
      </div>
   );
};

export default BookDetails;
