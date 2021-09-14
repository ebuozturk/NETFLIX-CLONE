import React from "react"
import styled from "styled-components";

const InputWithLabel = ({
    register,
    name,
    id,
    errors,
    header,
    placeholder,
    onChange,
    type
}) => {


    return (
        <div>
            {header ? <Label>{header}</Label> : null}
            <Input

                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
                {...register}
                onChange={onChange}

            />
            {errors[name] && <ErrorLabel>{errors[name]?.message}</ErrorLabel>}
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
export default InputWithLabel