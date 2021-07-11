import s from './Spinner.module.scss';

const Spinner = ({show}) => {
	return show && <div className={s.spinner}></div>;
};

export default Spinner;
