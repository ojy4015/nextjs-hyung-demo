import classes from './Card.module.css';
import MainNavigation from './MainNavigation';

function Card(props) {
  return (
    <div>
      {/* <MainNavigation /> */}
      <main className={classes.card}>{props.children}</main>
    </div>
  );
}

export default Card;
