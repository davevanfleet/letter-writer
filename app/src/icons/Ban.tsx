import { SvgIcon, SvgIconProps } from '@mui/material';
import React from 'react';

const Ban = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM32 256c0-56.01 20.81-107.2 54.91-146.5l315.6 315.6C363.2 459.2 312 480 256 480C132.5 480 32 379.5 32 256zM425.1 402.5L109.5 86.91C148.8 52.81 199.1 32 256 32c123.5 0 224 100.5 224 224C480 312 459.2 363.2 425.1 402.5z" />
    </svg>
  </SvgIcon>
);

export default Ban;
