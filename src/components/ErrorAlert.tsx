interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = (props: ErrorAlertProps) => (
  <section
    style={{
      color: '#d42a1e',
      backgroundColor: 'rgba(240, 132, 125, 0.25)',
      padding: '2rem',
      borderRadius: '0.5rem',
      width: '90%',
      margin: 'auto',
      marginTop: '1rem',
    }}
  >
    {props.message}
  </section>
);

export default ErrorAlert;
