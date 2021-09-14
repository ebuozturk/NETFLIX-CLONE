import React from "react"
import styled from "styled-components"

const SelectBox = ({ items, onChange, onClick, name, selectedItems, register, errors, header }) => {


    return (
        <div>
            {header ? <Label>{header}</Label> : null}
            <Select
                id={name}
                name={name}
                {...register(`${name}`, { required: true })}
                onChange={onChange}
            >
                <option selected disabled>{name.charAt(0).toUpperCase() + name.slice(1)}</option>
                {
                    items.map(item => {

                        return (
                            <Option key={item.id ? item.id : item} value={item.name ? JSON.stringify(item) : item}>{item.name ? item.name : item}</Option>
                        )
                    })
                }
            </Select>

            {errors[name] && <ErrorLabel>{errors[name].message}</ErrorLabel>}
            <SelectedItems>
                {
                    selectedItems.map(item => (
                        <SelectedItem>
                            <i
                                class="fas fa-minus-square"
                                onClick={() => onClick(name === "qualities" ? item : name, item.id)}
                                style={{ marginRight: "6px" }} />
                            {item.name ? item.name : item}</SelectedItem>
                    ))
                }
            </SelectedItems>
        </div>
    )
}
const Label = styled.label`
    color:white;
    display:block;
`;
const Select = styled.select`
border:none;
background: #333333;
padding:10px;
width:314px;
max-width:314px;
color:white;
`;
const Option = styled.option`
border:none;
background: #333333;
padding:10px;
width:314px;
max-width:314px;
`;
const SelectedItems = styled.div`
display:flex;
flex-wrap:wrap;

`;
const SelectedItem = styled.div`
background: #333333;
border-radius:2px;
text-align:center;
padding:3px;
margin-top:10px;
margin-right:6px;
`;
const ErrorLabel = styled.label`
    color:#e87c03;
    display:block;

`;

export default SelectBox;