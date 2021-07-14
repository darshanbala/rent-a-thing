import React, { useState } from 'react';

const ImageUpload = ({ handleImgUrl }) => {

    const [fileName, setFileName] = useState('')
    const [previewSourceUrl, setPreviewSourceUrl] = useState('')


    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSourceUrl(reader.result)
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

        if (!previewSourceUrl) return;
        //console.log(previewSourceUrl)
        handleImgUrl(previewSourceUrl)

        // const reader = new FileReader()
        // reader.readAsDataURL(selectedFile)
    }


    return (

        <div className="img-upload">
            <form onSubmit={handleFileSubmit}>
                <input
                    type='file'
                    name={fileName}
                    onChange={handFileChange}>
                </input>

                {previewSourceUrl && (
                    <img src={previewSourceUrl} alt={fileName} style={{ height: '300px' }} />
                )}

                <button type="submit">Upload</button>
            </form>

        </div >


    )
}

export default ImageUpload;



