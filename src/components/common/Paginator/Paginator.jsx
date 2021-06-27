import React, {useState} from 'react';
import s from '../../Users/Users.module.css'

export const Paginator = ({currentPage,portionSize = 10,...props}) => {
    let pageCount = Math.ceil(props.totalUserCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber , setPortionNumber] = useState(1);
    let leftportionPageNumber = (portionNumber - 1) * portionSize +1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={s.numberPage}>
        { portionNumber > 1 &&
            <button onClick={() => setPortionNumber(portionNumber - 1)}> Pref</button>
        }
        {
            pages.filter(p => p>= leftportionPageNumber && p<=rightPortionPageNumber).map((p)=>{
                return (
                    <span className={currentPage === p ? s.currentNumber : s.noCurrentNumber}
                          key={p} onClick={() => props.onPageChanged(p)}>{p}</span>
                )
            })
        }
        { portionCount > portionNumber &&
        <button onClick={()=> {setPortionNumber(portionNumber+1)}}>Next</button>
        }
    </div>

}
