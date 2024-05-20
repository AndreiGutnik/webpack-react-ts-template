import css from './App.module.scss';
import image from '@/assets/images/how-it-works.png';

export const App = () => {
  return (
    <div>
     				<p>App</p>
      <button className={css.button}>Click</button>
      <img
        src={image}
        alt=""
      />
    </div>
  );
};
