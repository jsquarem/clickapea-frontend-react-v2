import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './DishTypeBadge.css';

export default function DishTypeBadge({ dishType, count }) {

  return (
    <OverlayTrigger
      key={`${dishType}-${count}`}
      placement="top"
      overlay={
        <Tooltip id={`tooltip-top`}>
          {dishType}
        </Tooltip>
      }
    >
      <img width="32px" height="32px" src={`https://spoonacular.com/application/frontend/images/badges/${dishType}.svg`} />
    </OverlayTrigger>
  )
}
