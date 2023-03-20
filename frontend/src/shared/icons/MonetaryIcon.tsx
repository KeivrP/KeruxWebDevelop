import { SvgIcon, SvgIconProps } from "@mui/material";

export const MonetaryIcon = (props: Omit<SvgIconProps, 'viewBox'>) => {
  return (
    <SvgIcon {...props} viewBox="0 0 19 19">
      <path 
        d="M3 13.5L0 16.44V8H3M8 11.66L6.43 10.32L5 11.64V4H8M13 10L10 13V0H13M15.81 9.81L14 8H19V13L17.21 11.21L10 18.36L6.53 15.34L2.75 19H0L6.47 12.66L10 15.64" 
      />

    </SvgIcon> 
  );
};
