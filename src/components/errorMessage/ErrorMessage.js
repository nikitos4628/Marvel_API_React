import img from './error.gif'

const ErrorMessage = () => {
	return (
		<img style={{display: 'block', width: '260px', margin: '0 auto'}} src={img} alt='error'/>
	)
}

export default ErrorMessage;