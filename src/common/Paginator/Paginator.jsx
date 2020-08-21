import React, { useState } from 'react';
import classes from './Paginator.module.css';

const Paginator = ({portionSize = 10, ...props}) => {

    let pages = [];
    let pagesCount = Math.ceil(props.totalUsers/props.pageSize);
    for(let i = 1; i <= pagesCount; i++){   
        pages.push(i); }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let portionLeftPageNumber = (portionNumber - 1) * portionSize + 1;
    let portionRightPageNumber = portionNumber *portionSize;
    

    return <div className={classes.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {setPortionNumber(portionNumber - 1) } }> Prev </button> }

        {pages
              .filter(p => p >= portionLeftPageNumber && p <= portionRightPageNumber)
              .map((p) => {
                return <span className={props.currentPage === p ? classes.selected : " "}
                onClick={() => {props.onCurrentPageChange(p); } }>{p}</span>
            })}
        

    
        {portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber + 1) } }> Next </button> }
    </div>
}

export default Paginator;