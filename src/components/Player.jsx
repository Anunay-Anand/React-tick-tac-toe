import { useState } from "react";

export default function Player ({ initialName, symbol, isActive, onChangeName }) {
    
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    
    function handleEditClick() { 
        if(isEditing) {
            onChangeName(symbol, playerName);
        }
        setIsEditing(isEditing => !isEditing)
    };

    function handleChange(event) { setPlayerName(event.target.value) };

    return (
        <li className={ isActive ? 'active': undefined }>
            <span className="player">
              {isEditing ? <input type="text" value={playerName} onChange={handleChange} required /> : <span className="player-name">{ playerName }</span>}
              <span className="player-symbol">{ symbol }</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save': 'Edit'}</button>
        </li>
    );
};