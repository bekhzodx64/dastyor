import React, {useContext, useState} from 'react';
import './Search.css';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import TranslationContext from "../../Context/TranslationContext";
import MenuContext from "../../Context/MenuContext";

const Search = ({onSubmit, term, setTerm}) => {
  const {transcript} = useSpeechRecognition();
  const {translation} = useContext(TranslationContext);
  const {setCategoryOpen} = useContext(MenuContext);
  const [voice, setVoice] = useState(false);

  function onSearch(e) {
    if (voice) {
      setTerm(transcript);
    } else {
      setTerm(e.target.value);
    }
  }

  return (
    <div className='search'>
      <input
        type="search"
        placeholder={translation['productSearch']}
        value={term}
        onClick={() => setVoice(false)}
        onChange={onSearch}
        onKeyPress={(e) => {
          if (e.target.value.length === 0) {
            return;
          } else {
            if (e.charCode === 13) {
              onSubmit(e);
            }
          }
        }}
      />
      <div>
        <button
          disabled={term.length === 0}
          onClick={(e) => {
            onSubmit(e);
            setCategoryOpen(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path
              d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
          </svg>
        </button>
        <button onClick={() => {
          SpeechRecognition.startListening();
          setVoice(true);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path
              d="M12 3a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm0-2a5 5 0 0 1 5 5v4a5 5 0 0 1-10 0V6a5 5 0 0 1 5-5zM3.055 11H5.07a7.002 7.002 0 0 0 13.858 0h2.016A9.004 9.004 0 0 1 13 18.945V23h-2v-4.055A9.004 9.004 0 0 1 3.055 11z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;