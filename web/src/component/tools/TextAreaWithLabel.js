import React from "react"
import styled from "styled-components";

const TextAreaWithLabel = ({
    register,
    name,
    id,
    errors,
    header,
    placeholder,
    onChange,

}) => {

    return (
        <div>
            {header ? <Label>{header}</Label> : null}
            <TextArea
                id={id}
                name={name}
                placeholder={placeholder}
                errors={errors}
                header={header}
                onChange={onChange}
                {...register}

            />
            {errors[name] && <ErrorLabel>{errors[name]?.message}</ErrorLabel>}

        </div>
    )

}
const Label = styled.label`
    color:white;
    display:block;

`;
const TextArea = styled.textarea`
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
export default TextAreaWithLabel