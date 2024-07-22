import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMugSaucer, faPaw, faCar, faCat, 
  faAppleWhole, faPhone, faAnchor, faHeart 
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  faMugSaucer, faPaw, faCar, faCat, 
  faAppleWhole, faPhone, faAnchor, faHeart
};

const Card = ({ icon }) => {
  return (
    <div>
      <FontAwesomeIcon icon={iconMap[icon]} />
    </div>
  );
};

export default Card