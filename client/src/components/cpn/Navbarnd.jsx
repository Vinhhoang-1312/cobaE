// import React from "react";
// import styled from "styled-components";
// import { mobile, tablet } from "../../responsive";
// import { Link } from "react-router-dom";
// import { CountryList } from "../NavbarLink";

// const Container = styled.div`
//   height: 45px;

//   ${tablet({ display: "none" })};
//   ${mobile({ display: "none" })};
//   padding-left: 320px;
//   pointer-events: none;
// `;
// const Wrapper = styled.div`
//   width: 300px;
//   margin: auto;
//   background-color: #1e0606;
//   border-radius: 10px;
//   padding: 10px 0;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;
// const Center = styled.div`
//   position: relative;
//   display: flex;

//   align-items: center;
//   justify-content: center;
//   pointer-events: auto;
// `;
// const MenuLinks = styled.h1`
//   font-size: 14px;
//   cursor: pointer;
//   height: 20px;
//   margin: 0px 15px;
//   &:before {
//     content: "";
//     position: absolute;
//     right: 0;
//     bottom: -30%;
//     width: 0;
//     height: 3px;
//     background-color: coral;
//     transition: width 0.3s ease-out;
//   }
//   &:hover:before {
//     width: 100%;
//     left: 0%;
//     right: auto;
//   }
//   ${tablet({ margin: "5px", fontSize: "16px" })}
// `;
// const Country = () => {
//   return (
//     <Container>
//       <Wrapper>
//         {CountryList.map((menu, index) => {
//           console.log(menu.path);

//           return (
//             <Center key={index}>
//               <MenuLinks key={index}>
//                 <Link
//                   key={index}
//                   to={menu.path}
//                   style={{ textDecoration: "none", color: "white" }}
//                 >
//                   {menu.title}
//                 </Link>
//               </MenuLinks>
//             </Center>
//           );
//         })}
//       </Wrapper>
//     </Container>
//   );
// };
// export default Country;
