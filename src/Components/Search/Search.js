import React, { useState } from 'react'
import './Search.css'
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition'

import { useDispatch } from 'react-redux'
import { menuHandler } from '../../redux/features/menuSlice'
import { RiSearchLine } from 'react-icons/ri'
import { MdKeyboardVoice } from 'react-icons/md'

const Search = ({ onSubmit, term, setTerm }) => {
	const dispatch = useDispatch()

	const { transcript } = useSpeechRecognition()
	const [voice, setVoice] = useState(false)

	function onSearch(e) {
		if (voice) {
			setTerm(transcript)
		} else {
			setTerm(e.target.value)
		}
	}

	return (
		<div className='search'>
			<input
				type='search'
				placeholder='Поиск товара'
				value={term}
				onClick={() => setVoice(false)}
				onChange={onSearch}
				onKeyPress={(e) => {
					if (e.target.value.length === 0) {
						return
					} else {
						if (e.charCode === 13) {
							onSubmit(e)
						}
					}
				}}
			/>
			<div>
				<button
					disabled={term.length === 0}
					onClick={(e) => {
						onSubmit(e)
						dispatch(menuHandler())
					}}
				>
					<RiSearchLine style={{ fontSize: '20px' }} />
				</button>
				<button
					onClick={() => {
						SpeechRecognition.startListening()
						setVoice(true)
					}}
				>
					<MdKeyboardVoice style={{ fontSize: '20px' }} />
				</button>
			</div>
		</div>
	)
}

export default Search
