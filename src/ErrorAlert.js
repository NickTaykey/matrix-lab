const ErrorAlert = (props) => (
  <section
    style={{
      color: '#d42a1e',
      backgroundColor: 'rgba(240, 132, 125, 0.25)',
      padding: '2rem',
      borderRadius: '0.5rem',
      width: '90%',
      margin: '0 auto',
    }}
  >
    {props.message}
  </section>
);

export default ErrorAlert;
