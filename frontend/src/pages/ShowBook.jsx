import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
const ShowBook = () => {
  const [books, setBooks] =useState([]);
    const [loading, setLoading] = useState(false);
    const {id} =useParams();

    useEffect(()=> {
      setLoading(true);
      axios
      .get()
      .then((response)=>{
        setBooks(response.data);
        setLoading(false);
      })
    })
  return (
    <div>
      Show Books
    </div>
  )
}

export default ShowBook
