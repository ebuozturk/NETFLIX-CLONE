import React from "react"

const ImagePreview = ({ src, setImagePreview, name, image, ...props }) => {


    return (
        src ? (<img src={src}
            name={name}
            style={{ maxWidth: "250px" }}
        />) : (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <i class="fas fa-minus-square" style={{ fontSize: "2rem" }} onClick={() => {
                setImagePreview(null)
                document.getElementById("imageFile").value = null
            }}></i>
            <img src={image} style={{ maxWidth: "250px" }} />
        </div>

        )
    )
}

export default ImagePreview