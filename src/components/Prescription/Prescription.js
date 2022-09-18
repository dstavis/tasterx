import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Prescription.css';
import rxLogo from '../../assets/RX-logo.svg';
import ShareButton from '../ShareButton/ShareButton';
import { getShowById, getPrescription } from '../../api-calls/api-calls';

const Prescription = () => {
  const [show, setShow] = useState({});
  const [prescription, setPrescription] = useState('');
  const { id }  = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(!parseInt(id)) {
      navigate('/prescription/prescription-not-found')
    } else {
      getPrescription(id)
        .then(data => {
          setPrescription(data.prescription);
          getShowById(data.prescription.showID)
            .then(data => {
              const { name, officialSite, image } = data;
              setShow({
                name: name,
                officialSite: officialSite,
                image: image.medium
              })
            })    
            .catch(() => navigate('/prescription/prescription-not-found'));      
          })
          .catch(() => navigate('/prescription/prescription-not-found'));
        }
  },[]);

  return (
    <section className='script-share-button-container'>
      <ShareButton />
      <div className='script-container'>
        <div className='script-top-container'>
          <img className='script-rx-logo' src={rxLogo} alt='rx logo' />
          <div className='show-name-link-container'>
            <p className='to-be-prescribed'>Show to be prescribed:</p>
            <p className='script-show-name'>{show.name}</p>
            {show.officialSite && <a className='show-link' href={show.officialSite} target='_blank' rel='noreferrer'>Official TV show website</a>}
            {!show.officialSite && <a className='show-link' href={`https://www.google.com/search?q=${show.name}`} target='_blank' rel='noreferrer'>{`Search google for ${show.name}`}</a>}
          </div>
          <img className='script-show-poster' src={show.image} alt='show poster'/>
        </div>
        <div className='bottom-container'>
          <p>{prescription.message}</p>
          <p>{prescription.signature}</p>
        </div>
      </div>
    </section>
  );
}

export default Prescription;
