import Spinner from 'components/Spinner';

export default ({ loading, className, onClick, children}) => {
  return <button className={"button " + (className || '')} onClick={onClick}>
    {loading ? <Spinner /> : children}
  </button>;
};
