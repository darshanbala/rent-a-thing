import React, { useState } from 'react';

export default function ImageUpload() {

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
        console.log(typeof file.name)
        previewFile(file)

    }

    // const handleFileSubmit = (e) => {
    //     console.log('Submitting on ImageUpload.js')
    //     e.preventDefault()

    //     if (!previewSourceUrl) return;
    //     console.log(previewSourceUrl)

    //     // const reader = new FileReader()
    //     // reader.readAsDataURL(selectedFile)
    // }



    return (
        <div>
            <input
                className="img-upload"
                type='file'
                name={fileName}
                onChange={handFileChange}>

            </input>
            {previewSourceUrl && (
                <img src={previewSourceUrl} alt={fileName} style={{ height: '300px' }} />
            )}
        </div>

    )
}



