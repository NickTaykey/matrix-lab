import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const StepPageHeader = (props: { headerTitle: string }) => {
  const navigate = useNavigate();
  return (
    <header
      style={{
        margin: '3rem 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <button
        className="button"
        onClick={() => navigate('/')}
        style={{ marginBottom: '1rem' }}
      >
        <IoMdArrowRoundBack />
      </button>
      <h1>{props.headerTitle}</h1>
    </header>
  );
};

export default StepPageHeader;
