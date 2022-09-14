import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Prescription.css';
import { getShowById, getPrescription } from '../../api-calls/api-calls';

const Prescription = () => {
  const [show, setShow] = useState({});
  const [prescription, setPrescription] = useState('');
  const { id }  = useParams();

  useEffect(() => {
    getPrescription(id)
      .then(data => {
        setPrescription(data.data);
        getShowById(data.data.showID)
          .then(data => {
            const { name, officialSite, image } = data;
            setShow({
              name: name,
              officialSite: officialSite,
              image: image.medium
            })
          })    
          .catch(error => console.log(error));      
        })
        .catch(error => console.log(error));
  },[])

  return (
    <div>
      <p>{show.name}</p>
      <img src={show.image} alt='show poster'/>
      {show.officialSite && <a href={show.officialSite}>Official TV show website</a>}
      <p>{prescription.message}</p>
    </div>
  );
}

export default Prescription;