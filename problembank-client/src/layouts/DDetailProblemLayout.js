import React from 'react'
import FooterMainPage from '../pages/MainPage/components/FooterMainPage';

function DetailProblemLayout(props) {
    const { children } = props;
    return (
        <div className="row">
            <div className="body-container">
                { children }
            </div>
        </div>
    )
}


export default DetailProblemLayout

