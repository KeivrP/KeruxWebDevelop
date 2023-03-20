import { SvgIcon, SvgIconProps } from "@mui/material"

export const ExpandIcon = (props: Omit<SvgIconProps, 'viewBox'>) => {
  return (
    <SvgIcon {...props} viewBox="0 0 13 13">
      <path 
        d="M0 12.25V7H1.75V10.5H5.25V12.25H0ZM10.5 5.25V1.75H7V0H12.25V5.25H10.5Z" 
      />
    </SvgIcon>
  )
}