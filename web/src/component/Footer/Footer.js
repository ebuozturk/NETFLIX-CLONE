import React from "react"
import styled from "styled-components"

const Footer = () => {

    return (
        <FooterBody>
            <FooterTop>
                Questions? Call
                <a class="footer-top-a" href="tel:0850-390-74444"> 0850-390-7444</a>
            </FooterTop>
            <FooterUl>
                <FooterLi>
                    <FooterLink href="" >FAQ</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Help Center</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Account</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Media Center</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Investor Relations</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Jobs</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Redeem Gift Cards</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Ways to Watch</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Terms of Use</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Privacy</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Cookie Preferences</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Corporate Information</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Contact Us</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Speed Test</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Legal Notices</FooterLink>
                </FooterLi>
                <FooterLi>
                    <FooterLink href="">Only on Netflix</FooterLink>
                </FooterLi>
            </FooterUl>

        </FooterBody>
    )
}
const FooterBody = styled.div`
max-width:56em;
height:291px;
margin:0 auto;
box-sizing:border-box;
`
const FooterTop = styled.p`
padding:0;
margin: 0 0 30px;
margin-block-start:1em;
margin-block-end:1em;
color:#757575;
font-family:NetflixSans_W_Rg;
& a{
    color:#757575;

}
& a:hover{
    text-decoration:underline;
}
`
const FooterUl = styled.ul`
display:flex;
list-style-type:none;
flex-wrap:wrap;
`
const FooterLi = styled.li`
margin:0px 0px 10px;
min-width:14em;

`
const FooterLink = styled.a`
font-size:13px;
color:#757575;
font-family:NetflixSans_W_Rg;
&:hover{
    color:#757575;

    text-decoration:underline;

}
`
export default Footer