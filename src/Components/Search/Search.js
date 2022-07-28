import React, { useContext, useState } from 'react'
import './Search.css'
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition'
import TranslationContext from '../../Context/TranslationContext'
import MenuContext from '../../Context/MenuContext'

import { RiSearchLine } from 'react-icons/ri'
import { MdKeyboardVoice } from 'react-icons/md'

const Search = ({ onSubmit, term, setTerm }) => {
	const { transcript } = useSpeechRecognition()
	const { translation } = useContext(TranslationContext)
	const { setCategoryOpen } = useContext(MenuContext)
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
				placeholder={translation['productSearch']}
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
						setCategoryOpen(false)
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
