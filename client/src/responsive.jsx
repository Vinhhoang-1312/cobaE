import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 416px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (min-width: 417px) and (max-width: 769px) {
      ${props}
    }
  `;
};
export const bigtablet = (props) => {
  return css`
    @media only screen and (min-width: 769px) and (max-width: 1200px) {
      ${props}
    }
  `;
};
