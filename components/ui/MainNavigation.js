
import Link from 'next/link';
import classes from './MainNavigation.module.css';
// import { useFavorite } from '../../store/favorites-context';

function MainNavigation() {

  // const favoritesCtx = useFavorite();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Meetup</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
          {/* <li>
            <Link to='/favorites'>
              My Favorites
              <span className={classes.badge}>{favoritesCtx.totalFavorites}</span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;


//------------------------------------------
// import { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import classes from './MainNavigation.module.css';
// import FavoritesContext from '../../store/favorites-context';

// function MainNavigation() {
//   const favoritesCtx = useContext(FavoritesContext);

//   return (
//     <header className={classes.header}>
//       <div className={classes.logo}>React Meetups</div>
//       <nav>
//         <ul>
//           <li>
//             <Link to='/'>All Meetup</Link>
//           </li>
//           <li>
//             <Link to='/new-meetup'>Add New Meetup</Link>
//           </li>
//           <li>
//             <Link to='/favorites'>
//               My Favorites
//               <span className={classes.badge}>{favoritesCtx.totalFavorites}</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default MainNavigation;