import React, { useState } from "react"
import styled from "styled-components"

const ImageInputWithPreview = ({
    register,
    name,
    id,
    errors,
    imgMaxWidth,
    imgMaxHeight,
    defaultImgSrc,
    header
}) => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileOnChange = (e) => {
        console.log(document.getElementById(name).value)
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImagePreview(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }

    }
    return (
        <div>
            {header ? <Label>{header}</Label> : null}

            {
                imagePreview != null ?
                    (<div style={{
                        position: "relative", display: "flex",
                        flexDirection: "column",
                        //  alignItems: "center" 
                    }}>
                        <i class="fas fa-minus-square" style={{
                            fontSize: "1.5rem",
                            position: "absolute",
                            left: 0,
                            color: "#e50914"
                        }} onClick={() => {
                            setImagePreview(null)
                            document.getElementById(name).value = null
                        }}></i>
                        <img src={imagePreview} style={{ maxWidth: `${imgMaxWidth}` }} />
                    </div>

                    ) :
                    defaultImgSrc ?
                        (
                            <img src={defaultImgSrc}
                                name={name}
                                style={{ maxWidth: `${imgMaxWidth}` }}
                            />)
                        : null


            }

            <div style={{ visibility: `${imagePreview ? "hidden" : " visible"}` }}>
                <Input

                    id={id}
                    name={name}
                    type="file"
                    {...register}
                    onChange={handleFileOnChange}
                />
                {errors[name] && <ErrorLabel>{errors[name]?.message}</ErrorLabel>}
            </div>



        </div>

    )
}
const Label = styled.label`
    color:white;
    display:block;
`;
const Input = styled.input`
    border:none;
    background: #333333;
    padding:10px;
    width:314px;
    max-width:314px;
    color:white;
`;
const ErrorLabel = styled.label`
    color:#e87c03;
    display:block;

`;
ImageInputWithPreview.defaultProps = {
    imgMaxWidth: "250px",

}
export default ImageInputWithPreview