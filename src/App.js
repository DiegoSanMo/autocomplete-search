import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react'

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {

    const getUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users');
      console.log('response.data.data: ', response.data.data);
      setUsers(response.data.data)
    }
    getUsers()
    return () => {};
  }, []);

  const onChangeHandler = text => {
    let matches = []
    if(text.length > 0){
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`, "gi")
        return user.email.match(regex)
      })
    }
    console.log('matches: ', matches);
    setSuggestion(matches);
    setText(text)
  }

  const onSuggestionHandler = text => {
    setText(text)
  }
  return (
    <div className="container">
      <input 
        className="col-md-12 input"
        style={{marginTop: '25px'}}
        type="text"
        onChange={e => onChangeHandler(e.target.value)}
        value={text}

      />
      {suggestion && suggestion.map(s => <div onClick={(() => onSuggestionHandler(s.email))} key={s.id}>{s.email}</div>)}
      
    </div>
  );
}

export default App;
