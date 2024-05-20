import image from '@/assets/images/how-it-works.png';
import css from './App.module.scss';

export const App = () => {
	console.log(css);
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
