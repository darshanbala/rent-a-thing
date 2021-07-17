import React, { useState } from 'react';

const ImageUpload = ({ handleImgUrl, img_url }) => {

    const [fileName, setFileName] = useState('')
    const [sourceUrl, setSourceUrl] = useState('')
    const [previousSourceUrl, setPreviousSourceUrl] = useState('')



    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setSourceUrl(reader.result)
            setFileName(file.name)
        }

    }


    const handFileChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }


    const handleFileSubmit = (e) => {
        //console.log('Submitting on ImageUpload.js')
        e.preventDefault()

        if (!sourceUrl) return;
        //console.log(sourceUrl)
        handleImgUrl(sourceUrl)
        setPreviousSourceUrl(sourceUrl)

        // const reader = new FileReader()
        // reader.readAsDataURL(selectedFile)
    }




    return (

        <div className="img-upload">
            <form onSubmit={handleFileSubmit}>
                <div className="upload-btn-wrapper">
                    <button className="btn">Upload an image</button>
                    <input
                        type='file'
                        name={fileName}
                        onChange={handFileChange}>
                    </input>
                </div>

                {sourceUrl && (
                    <>
                        <div>
                            <img src={sourceUrl} alt={fileName} style={{ height: '300px', margin: '20px' }} />
                        </div>
                        <div>
                            <button className={!img_url || sourceUrl !== previousSourceUrl ? "btn-done" : "btn-done-confirmed"} type="submit">Done</button>
                            { sourceUrl !== previousSourceUrl &&
                                <p>Click "Done" to confirm</p>
                            }

                        </div>
                    </>
                )}


            </form>

        </div >


    )
}

export default ImageUpload;



