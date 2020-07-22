import React from 'react'
import imagen1 from './img/imagen_principal_1.jpg';
import imagen2 from './img/imagen_principal_2.jpg';
import imagen3 from './img/imagen_principal_3.jpg';
import '../App.css';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const HoverDiv = styled.div`
	:hover {
		opacity: 0.8;
        cursor: pointer;
        color: #FFFFFF;
    }
`

export const Menu = () => {
    return (
        <div className="container3" style={{margin: "50px"}}>
            <div className="container3" style={{marginLeft: "150px"}}>
                <div className="row">
                    <div className="col-4" style={{textAlign: "center", padding:"0px", maxWidth:"20%"}}>
                        <img src={imagen1} alt="logo" width="200px" height="320px" style={{border: "black 7px solid"}}/>
                    </div>
                    <div className="col-4" style={{textAlign: "center", padding:"0px", maxWidth:"110%"}}>
                        <img src={imagen3} alt="logo" width="600px" height="320px" style={{border: "black 7px solid"}}/>
                        <div style={{position: "absolute", fontSize: "60px", fontWeight:"bold", textShadow: "0.1em 0.1em #000000", fontFamily:"Source Sans Pro Italic", color: "#FFFFFF", top: "100px", left: "100px"}}>Highlight Vision</div>
                    </div>
                    <div className="col-4" style={{textAlign: "center", padding:"0px", maxWidth:"20%"}}>
                        <img src={imagen2} alt="logo" width="200px" height="320px" style={{border: "black 7px solid"}}/>
                    </div>
                </div>
            </div>
            <div className="container3" style={{margin: "10px"}}>
                <div className="row">
                    <div style={{height: "200px"}} className="col-3"></div>
                    <HoverDiv style={{border: "white 0.2px solid"}} className="col-3, App-div">
                        <Link style={{color:"#000000", fontFamily:"Source Sans Pro Italic", textShadow: "0.03em 0.03em #000000"}} to="/default-filter">Apply default filter to an image</Link>
                    </HoverDiv>
                    <HoverDiv style={{border: "white 0.2px solid"}} className="col-3, App-div">
                        <Link style={{color:"#000000", fontFamily:"Source Sans Pro"}} to="/user-filters">Choose the filters to apply</Link>
                    </HoverDiv>
                    <div style={{height: "200px"}} className="col-3"></div>
                </div>
            </div>
        </div>
    )
}