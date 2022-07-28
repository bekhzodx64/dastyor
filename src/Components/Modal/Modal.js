import React from 'react'
import './Modal.css'
const Modal = ({ setState, text }) => {
	return (
		<div id='popup1' className='overlay'>
			<div className='popup'>
				<h2>Dastyor Express</h2>
				<span className='close' onClick={() => setState(false)}>
					&times;
				</span>
				<div className='content'>{text}</div>
			</div>
		</div>
	)
}

export default Modal
