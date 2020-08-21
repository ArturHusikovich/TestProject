import React, {useState, useEffect} from 'react';

const StatusWithHook = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [localStatus, setLocalStatus] = useState(props.status);

    useEffect( () => {
        setLocalStatus(props.status);
    }, [props.status])
   
    let activeMode = () => {
        setEditMode(true);
    }

    let deactiveMode = () => {
        setEditMode(false);
        props.updateProfileStatusThunk(localStatus);
    }

    let updateLocalStatus = (e) => {
        setLocalStatus(e.currentTarget.value);
    }

    return (
            <div>
                {!editMode&&
                <div><span onDoubleClick={activeMode}>{props.status || "No Status"}</span></div> }

                {editMode&&
                <div><input onChange={updateLocalStatus} value={localStatus}
                            onBlur={deactiveMode} autoFocus={true} /> </div> }
            </div>
        ) 
    }

export default StatusWithHook;