import React, { useCallback, useState } from 'react'
import { useSelector } from "react-redux"
import { useDropzone } from 'react-dropzone'
import styled from "styled-components"
import axios from "axios"
import avatar from "../../img/avatar.png"
import { SIZES } from "../../constants"
import { Form } from 'reactstrap'
export default function UserProfile() {
    const user = useSelector(state => state.user)
    function Dropzone({ accepts }) {

        const onDrop = useCallback((acceptedFiles) => {

            // Do something with the files
            const file = acceptedFiles[0];
            const formData = new FormData();

            formData.append("profileImageFile", file);
            axios.post(`/api/user/${user.user.id}/image/upload`,
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(() => console.log("file uploaded successfully"))
                .catch(err => console.log(err.response))
        }, [])
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: accepts })

        return (
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        (
                            <div style={{
                                position: "absolute",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "grey",
                                minWidth: SIZES.profileImageWidth,
                                minHeight: SIZES.profileImageHeigth,
                                top: 0,
                                opacity: "0.7",
                                textAlign: "center",
                                borderRadius: "50%",
                            }}><p>Drop Image Here</p> </div>) :
                        (<div style={{
                            position: "absolute",
                            backgroundColor: "none",
                            minWidth: SIZES.profileImageWidth,
                            minHeight: SIZES.profileImageHeigth,
                            top: 0,
                            borderRadius: "50%",
                        }}></div>)
                }
            </div>
        )
    }
    return (
        <Container>
            <Profile>
                <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: "100%" }}>
                    <ImageBody>
                        <Dropzone accepts='image/jpeg,image/png' />
                        <EditIcon className="fas fa-edit edit-icon" />
                        {
                            user.user.imageUrl ?
                                (<Image src={`/api/user/${user.user.id}/image/download`} alt="Profile Image" />)

                                : <Image src={avatar} alt="avatar" />}
                    </ImageBody>
                    <h2>{user.user.username}</h2>

                </div>
                <ProfileDetail>
                    <Dropzone />
                </ProfileDetail>
            </Profile>

        </Container>
    )
}

const Container = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    margin-top:70px;
`;
const Profile = styled.div`
display:flex;
width:50vw;
flex-direction:column;
justify-content:center;

`;
const ImageBody = styled.div`
display:flex;
position:relative;
align-items:center;
justify-content:center;
background:grey;
border-radius:50%;
width: ${SIZES.profileImageWidth + "px;"}
height: ${SIZES.profileImageHeigth + "px;"}

&:hover .edit-icon {
    display: block;
  }

`;
const EditIcon = styled.i`
   position:absolute;
   display:none;
   top:0;
   right:0px;
   font-size:30px;
   cursor:pointer;
   
`;
const Image = styled.img`
object-fit:cover;
width: ${SIZES.profileImageWidth}px;
height: ${SIZES.profileImageHeigth}px;
border-radius:50%;

`;
const ProfileDetail = styled.div`
border:1px solid grey;
border-radius:5px;
width:100%;
flex-direction:column;
min-height:70vh;
display:flex;
margin-top:20px;
padding:20px;

`;