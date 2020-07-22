import React, {useState, useEffect} from 'react'
import original_median_image from './img/original_median_image.jpg';
import processed_median_image from './img/processed_median_image.jpg';

//Access to the url server 
const API = process.env.REACT_APP_APPI;

export const DefaultFilter = () => {

    const [url, setValue] = useState('');
    const [kernel, setKernelValue] = useState(0);
    const [urlAux, setUrlAux] = useState('');
    const [kernelAux, setKernelAux] = useState('');
    const [originalPath, setOriginalPath] = useState('');
    const [processedPath, setProcessedPath] = useState('');
    const [displayOriginalDiv, setDisplayOriginalDiv] = useState(false);
    const [displayProcessedDiv, setDisplayProcessedDiv] = useState(false);
    const [displayErrorMesg, setDisplayErrorMesg] = useState(false);
    const [kernelErrorMesg, setKernelErrorMesg] = useState(false);

    const getImage = () => {
        setOriginalPath(original_median_image);
        setProcessedPath(processed_median_image);
        setDisplayOriginalDiv(true);
        setDisplayProcessedDiv(true);
    }
    
    useEffect(() => {
        getImage();
    }, [])

    const applyFilter = async (e) => {
        //Prevents the browser from updating every tine the button is clicked
        e.preventDefault();
        console.log(kernel);
        const validKernel = (kernel%2) ? true : false;
        if( (url !== '' && urlAux !== url && kernel > 0 && validKernel) || 
            (url !== '' && urlAux === url && kernelAux !== kernel && kernel > 0 && validKernel)) {
            setDisplayErrorMesg(false);
            setKernelErrorMesg(false);
            console.log("URL: " + url);
            console.log(API);
            //Saves the response of the server in a constant 
            console.log(JSON.stringify({"url": url}))
            try{
                const response = await fetch(`${API}/default-filter`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "url": url,
                    "kernel": parseInt(kernel)
                })
            })
            if (response.ok) {
                const data = await response.json();
                console.log("Response: " + JSON.stringify(data.response));
                setValue('');
                setKernelValue(0);
                setUrlAux(url);
                setKernelAux(kernel);
                setOriginalPath(original_median_image);
                setProcessedPath(processed_median_image);
                setDisplayOriginalDiv(true);
                setDisplayProcessedDiv(true);
            }
            else
                throw new Error(response.statusText);
            } catch(error){
                console.log(error);
            }
        }
        else if(url === '' && (kernel <= 0 || !validKernel)){
            setKernelErrorMesg(true);
            setDisplayErrorMesg(true);
        }
        else if(url === '' ){
            setDisplayErrorMesg(true);
            setKernelErrorMesg(false);
        }
        else if(kernel <= 0 || !validKernel){
            setKernelErrorMesg(true);
            setDisplayErrorMesg(false);
        }
    }

    return (
        <div className="container3" style={{marginTop: "50px", marginLeft: "60px", marginRight: "60px", marginBottom: "50px", fontFamily:"Source Sans Pro Italic"}}>
            <div className="row">
                <div className="col-md-12, col-lg-12" style={{fontSize: "18px"}}>
                    <h1 style={{fontWeight:"bold", color:"#20B2AA", fontFamily:"Source Sans Pro Italic", textShadow: "0.03em 0.03em #000000"}}>Median Blur Filter</h1>
                    <p style={{marginBottom: "2px", fontSize: "18px", fontFamily:"Source Sans Pro Italic"}}>
                        1. Enter the image URL to which the Median Blur filter will be applied in the input.
                    </p>
                    <p style={{marginBottom: "2px"}}>
                        2. Enter an odd number for the filter kernel (a higher number produces a more noticeable effect).
                    </p>
                    <p style={{marginBottom: "15px"}}>
                        Below is an example of the effect the filter can have on the image.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8, col-lg-8" style={{fontSize: "16px"}}>
                    <input className="form-control" type="text" value={url} onChange={e => setValue(e.target.value)}/>
                    <p style={{marginTop:"5px", color:"#A93226", display: displayErrorMesg ? 'block' : 'none' }}>Enter an image URL first</p>
                </div>
                <div className="col-md-2, col-lg-2">
                    <input className="form-control" type="number" value={kernel} onChange={e => setKernelValue(e.target.value)}/>
                    <p style={{marginTop:"5px", fontSize: "16px", color:"#A93226", display: kernelErrorMesg ? 'block' : 'none' }}>Enter a valid Kernel value</p>
                </div>
                <div className="col-md-2, col-lg-2">
                    <button style={{backgroundColor:"rgb(32, 178, 170", color:"#FFFFFF", fontFamily:"Source Sans Pro Italic"}} className="btn" onClick={applyFilter}>Apply filter</button>
                </div>
            </div>
            <div className="row" style={{marginTop: "40px"}}>
                <div className="col-md-6, col-lg-6" style={{textAlignLast:"center", display: displayOriginalDiv ? 'block' : 'none' }}>
                    <img src={originalPath} alt="Logo" width="650px" height="400px" style={{border: "black 7px solid"}}/>
                    <p style={{marginTop: "15px", fontSize: "18px", textAlign: "center", fontWeight: "bold"}}>Original</p>
                </div>
                <div className="col-md-6, col-lg-6" style={{textAlignLast:"center", display: displayProcessedDiv ? 'block' : 'none' }}>
                    <img src={processedPath} alt="Logo" width="650px" height="400px" style={{border: "black 7px solid"}}/>
                    <p style={{marginTop: "15px", fontSize: "18px", textAlign: "center", fontWeight: "bold"}}>Median Blur Filter</p> 
                </div>
            </div>
        </div>
    )
} 