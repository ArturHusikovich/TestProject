import React from 'react';
import preloader from '../../assets/images/Preloader.gif';

const Preloader = (props) => {
    return (
        <div>
            <img src={preloader} style={{width: '220px', height: '200px'}}/>
        </div>
    )
}

export default Preloader; 