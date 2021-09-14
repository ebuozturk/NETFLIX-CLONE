import React, { useState } from "react"
import styled from "styled-components"
import ReactPlayer from "react-player";


const VideoInputWithPreview = ({
    register,
    name,
    id,
    errors,
    videoMaxWidth,
    videoMaxHeight,
    defaultVideoSrc,
    header
}) => {
    const [videoPreview, setVideoPreview] = useState(null);

    const handleFileOnChange = (e) => {
        console.log(document.getElementById(name).value)
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setVideoPreview(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }

    }
    return (
        <div>
            {header ? <Label>{header}</Label> : null}

            {
                videoPreview != null ?
                    (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <i class="fas fa-minus-square" style={{ fontSize: "2rem" }} onClick={() => {
                            setVideoPreview(null)
                            document.getElementById(name).value = null
                        }}></i>
                        <video src={videoPreview} style={{ maxWidth: "250px" }} />
                        <ReactPlayer name={name} controls url={videoPreview} width={videoMaxWidth} />
                    </div>

                    ) :
                    defaultVideoSrc ?
                        (
                            <ReactPlayer name={name} controls url={defaultVideoSrc} width={videoMaxWidth} />
                        )
                        : null


            }
            <Input

                id={id}
                name={name}
                type="file"
                {...register}
                onChange={handleFileOnChange}
            />
            {errors?.videoFile && <ErrorLabel>{errors?.videoFile?.message}</ErrorLabel>}
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
export default VideoInputWithPreview