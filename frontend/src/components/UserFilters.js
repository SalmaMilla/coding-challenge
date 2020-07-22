import React, {useState} from 'react'
import original_image from './img/original_image.jpg';
import processed_image from './img/processed_image.jpg';
import original_gauss_image from './img/original_gauss_image.jpg';
import processed_gauss_image from './img/processed_gauss_image.jpg';
import original_laplacian_image from './img/original_laplacian_image.jpg';
import processed_laplacian_image from './img/processed_laplacian_image.jpg';
import original_sobel_image from './img/original_sobel_image.jpg';
import processed_sobel_image from './img/processed_sobel_image.jpg';

//Access to the url server 
const API = process.env.REACT_APP_APPI;

export const UserFilters = () => {

    const [url, setUrl] = useState('');
    const [urlAux, setUrlAux] = useState('');
    const [originalImage, setOriginalImage] = useState(original_image);
    const [processedImage, setProcessedImage] = useState(processed_image);
    const [displayErrorMesg, setDisplayErrorMesg] = useState(false);
    const [kernelGauss, setGaussKernel] = useState(0);
    const [kernelGaussErrorMesg, setKernelGaussErrorMesg] = useState(false);
    const [kernelSobel, setSobelKernel] = useState(0);
    const [kernelSobelErrorMesg, setKernelSobelErrorMesg] = useState(false);
    const [gaussChecked, setGaussChecked] = useState(false);
    const [laplacianChecked, setLaplacianChecked] = useState(false);
    const [sobelChecked, setSobelChecked] = useState(false);
    const [displayErrorChecked, setDisplayErrorChecked] = useState(false);
    const [displayOptionsDiv, setDisplayOptionsDiv] = useState(true);
    const [displayResultDiv, setDisplayResultDiv] = useState(false);

    const applyFilters = async (e) => {
        console.log('entra');
        //Prevents the browser from updating every tine the button is clicked
        const validKernelGauss = (kernelGauss%2) ? true : false;
        const validKernelSobel = (kernelSobel%2) ? true : false;
        if(url !== '' &&  url !== urlAux && (gaussChecked || sobelChecked || laplacianChecked)) {
                setKernelSobelErrorMesg(false);
                setKernelGaussErrorMesg(false);
                setDisplayErrorMesg(false);
                setDisplayErrorChecked(false);
                try{
                    const response = await fetch(`${API}/user-filters`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "url": url,
                        "filters":{ 
                            "gauss": 
                            {
                                "state": gaussChecked,
                                "parameters": { "kernel": parseInt(kernelGauss) }
                            },
                            "laplacian": 
                            {
                                "state": laplacianChecked,
                                "parameters":[]
                            },
                            "sobel":
                            {
                                "state": sobelChecked,
                                "parameters": { "kernel": parseInt(kernelSobel) }
                            }
                        }
                    })
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log("Response: " + JSON.stringify(data.response));
                    setUrl('');
                    setUrlAux(url);
                    setOriginalImage(originalImage);
                    setProcessedImage(processedImage);
                    setGaussKernel(0);
                    setSobelKernel(0);
                    setGaussChecked(false);
                    setSobelChecked(false);
                    setLaplacianChecked(false);
                    setDisplayOptionsDiv(false);
                    setDisplayResultDiv(true);
                }
                else
                    throw new Error(response.statusText);
                } catch(error){
                    console.log(error);
                }
            
        }
        if(url === ''){
            setDisplayErrorMesg(true);
            setDisplayErrorChecked(false);
            setKernelGaussErrorMesg(false);
            setKernelSobelErrorMesg(false);
        }
        if(!gaussChecked && !laplacianChecked && !sobelChecked){
            console.log("entra a todos");
            setDisplayErrorMesg(false);
            setDisplayErrorChecked(true);
        }
        if(!gaussChecked && !laplacianChecked && !sobelChecked && url === ''){
            console.log("entra a todos y a url");
            setDisplayErrorMesg(true);
            setDisplayErrorChecked(true);
        }
        if(gaussChecked && (kernelGauss <= 0  || !validKernelGauss)){
            console.log("entra a gauss");
            setKernelGaussErrorMesg(true);
            setKernelSobelErrorMesg(false);
            setDisplayErrorChecked(false);
        }
        if(sobelChecked && (kernelSobel <= 0 || !validKernelSobel)){
            console.log("entra a sobel");
            setDisplayErrorChecked(false);
            setKernelSobelErrorMesg(true);
        }
        if((sobelChecked && (kernelSobel <= 0 || !validKernelSobel)) && (gaussChecked && (kernelGauss <= 0  || !validKernelGauss))){
            console.log("entra en sobel y gauss");
            setKernelSobelErrorMesg(true);
            setKernelGaussErrorMesg(true);
        }
        if(sobelChecked && (kernelSobel <= 0 || !validKernelSobel)){
            console.log("entra a sobel");
            setKernelSobelErrorMesg(true);
        }
    } 

    const changeDiv = () => {
        setDisplayResultDiv(false);
        setDisplayOptionsDiv(true);
    }

    return (
        <div className="container3" style={{marginTop: "50px", marginLeft: "60px", marginRight: "60px", marginBottom: "50px", fontFamily:"Source Sans Pro Italic"}}>
            <div className="container3">
                <div className="row">
                    <div className="col-md-12, col-lg-12">
                        <h1 style={{fontWeight:"bold", fontFamily:"Source Sans Pro Italic", textShadow: "0.03em 0.03em #000000", color:"#20B2AA"}}>Filter Selector</h1>
                        <p style={{marginBottom: "2px", fontSize: "18px"}}>
                            1. Enter the image URL to which the filters will be applied in the input.
                        </p>
                        <p style={{marginBottom: "2px", fontSize: "18px"}}>
                            2. Select the filters that you want to apply to your image.
                        </p>
                        <p style={{marginBottom: "2px", fontSize: "18px"}}>
                            3. Push the button "Apply filters" for see the result displayed.
                        </p>
                        <p style={{marginBottom: "15px", fontSize: "18px"}}>
                            Below are examples of the effect the filters can have on the images.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container3" style={{display: displayOptionsDiv ? 'block' : 'none' }}>
                <div className="row">
                    <div className="col-md-10, col-lg-10">
                        <input className="form-control" type="text" value={url} onChange={e => setUrl(e.target.value)}/>
                        <p style={{marginTop:"5px", fontSize: "16px", color:"#A93226", display: displayErrorMesg ? 'block' : 'none' }}>Enter an image URL first</p>
                    </div>
                    <div className="col-md-2, col-lg-2">
                        <button style={{backgroundColor:"rgb(32, 178, 170", color:"#FFFFFF", fontFamily:"Source Sans Pro Italic"}} className="btn" onClick={applyFilters}>Apply filters</button>
                    </div>
                </div>
                <div className="row" style={{marginBottom: "40px", marginTop:"10px"}}>
                    <div className="col-md-12, col-lg-12">
                        <p style={{fontSize: "16px", color:"#A93226", display: displayErrorChecked ? 'block' : 'none' }}>Select at least one filter</p>
                    </div>
                </div>
                <div className="row" style={{marginBottom: "10px", fontSize: "18px", textAlign: "center", fontWeight: "bold"}}>
                    <div className="col-md-2, col-lg-2">
                        <p>Filter</p>
                    </div>
                    <div className="col-md-2, col-lg-2">
                        <p>Kernel value</p>
                    </div>
                    <div className="col-md-4, col-lg-4">
                        <p>Original</p>
                    </div>
                    <div className="col-md-4, col-lg-4">
                        <p>Filtered</p>
                    </div>
                </div>
                <div className="row" style={{marginBottom: "30px"}}>
                    <div className="col-md-2, col-lg-2" style={{marginTop: "80px"}}>
                        <div className="form-check">
                            <input type="checkbox" checked={gaussChecked} name="gauss" id="gaussCheck" className="form-check-input" onChange={e => setGaussChecked(e.target.checked)}/>
                            <label className="form-check-label" htmlFor="gaussCheck">Gauss Filter</label>
                        </div>
                    </div>
                    <div className="col-md-2, col-lg-2" style={{marginTop: "80px"}}>
                        <input className="form-control" type="number" value={kernelGauss} onChange={e => setGaussKernel(e.target.value)}/>
                        <p style={{marginTop:"5px", fontSize: "16px", color:"#A93226", display: kernelGaussErrorMesg ? 'block' : 'none' }}>Enter a valid Kernel value</p>
                    </div>
                    <div className="col-md-4, col-lg-4" style={{textAlignLast:"center"}}>
                        <img src={original_gauss_image} alt="Logo" width="340px" height="180px" style={{border: "black 7px solid"}}/>
                    </div>
                    <div className="col-md-4, col-lg-4" style={{textAlignLast:"center"}}>
                        <img src={processed_gauss_image} alt="Logo" width="340px" height="180px" style={{border: "black 7px solid"}}/>
                    </div>
                </div>
                <div className="row" style={{marginBottom: "30px"}}>
                    <div className="col-md-2, col-lg-2" style={{marginTop: "70px"}}>
                        <div className="form-check">
                            <input type="checkbox" checked={laplacianChecked} name="laplacian" className="form-check-input" id="laplacianCheck" onChange={e => setLaplacianChecked(e.target.checked)}/>
                            <label className="form-check-label" htmlFor="laplacianCheck">Laplacian Gray Filter</label>
                        </div>
                    </div>
                    <div className="col-md-2, col-lg-2" style={{marginTop: "40px"}}></div>
                    <div className="col-md-4, col-lg-4" style={{textAlignLast:"center"}}>
                        <img src={original_laplacian_image} alt="Logo" width="340px" height="180px" style={{border: "black 7px solid"}}/>
                    </div>
                    <div className="col-md-4, col-lg-4" style={{textAlignLast:"center"}}>
                        <img src={processed_laplacian_image} alt="Logo" width="340px" height="180px" style={{border: "black 7px solid"}}/>
                    </div>
                </div>
                <div className="row" style={{marginBottom: "30px"}}>
                    <div className="col-md-2, col-lg-2" style={{marginTop: "70px"}}>
                        <div className="form-check">
                            <input type="checkbox" checked={sobelChecked} name="sobel" className="form-check-input" id="sobelCheck" onChange={e => setSobelChecked(e.target.checked)}/>
                            <label className="form-check-label" htmlFor="sobelCheck">Sobel Filter</label>
                        </div>
                    </div>
                    <div className="col-md-2, col-lg-2" style={{marginTop: "70px"}}>
                        <input className="form-control" type="number" value={kernelSobel} onChange={e => setSobelKernel(e.target.value)}/>
                        <p style={{marginTop:"5px", fontSize: "16px", color:"#A93226", display: kernelSobelErrorMesg ? 'block' : 'none' }}>Enter a valid Kernel value</p>
                    </div>
                    <div className="col-md-4, col-lg-4" style={{textAlignLast:"center"}}>
                        <img src={original_sobel_image} alt="Logo" width="340px" height="180px" style={{border: "black 7px solid"}}/>
                    </div>
                    <div className="col-md-4, col-lg-4" style={{textAlignLast:"center"}}>
                        <img src={processed_sobel_image} alt="Logo" width="340px" height="180px" style={{border: "black 7px solid"}}/>
                    </div>
                </div>
            </div>
            <div className="container3" value="result" style={{display: displayResultDiv ? 'block' : 'none' }}>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-3"></div>
                    <div className="col-3"></div>
                    <div className="col-3" style={{textAlignLast:"right"}}>
                        <button className="btn" style={{backgroundColor:"rgb(32, 178, 170", color:"#FFFFFF", fontFamily:"Source Sans Pro Italic"}} onClick={changeDiv}>Try again</button>
                    </div>
                </div>
                <div className="row" style={{marginTop: "20px"}}>
                    <div className="col-md-6, col-lg-6" style={{textAlignLast:"center"}}>
                        <img src={originalImage} alt="Logo" width="650px" height="400px" style={{border: "black 7px solid"}}/>
                        <p style={{marginTop: "15px", fontSize:"18px", textAlign: "center", fontWeight: "bold"}}>Original</p>
                    </div>
                    <div className="col-md-6, col-lg-6" style={{textAlignLast:"center"}}>
                        <img src={processedImage} alt="Logo" width="650px" height="400px" style={{border: "black 7px solid"}}/>
                        <p style={{marginTop: "15px", fontSize: "18px", textAlign: "center", fontWeight: "bold"}}>Filtered</p> 
                    </div>
                </div>
            </div>
        </div>
    )
}