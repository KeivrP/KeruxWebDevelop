import { SvgIcon, SvgIconProps } from "@mui/material";

export const RecIcon = (props: Omit<SvgIconProps, 'viewBox'>) => {
    return (
        <SvgIcon {...props} viewBox="0 0 19 19">
            <path
                d="M 8.6 14.6 L 15.65 7.55 L 14.25 6.15 L 8.6 11.8 L 5.75 8.95 L 4.35 10.35 L 8.6 14.6 Z M 10 20 C 8.61667 20 7.31667 19.7373 6.1 19.212 C 4.88333 18.6867 3.825 17.9743 2.925 17.075 C 2.025 16.175 1.31267 15.1167 0.788 13.9 C 0.263333 12.6833 0.000666667 11.3833 0 10 C 0 8.61667 0.262667 7.31667 0.788 6.1 C 1.31333 4.88333 2.02567 3.825 2.925 2.925 C 3.825 2.025 4.88333 1.31267 6.1 0.788 C 7.31667 0.263333 8.61667 0.000666667 10 0 C 11.3833 0 12.6833 0.262667 13.9 0.788 C 15.1167 1.31333 16.175 2.02567 17.075 2.925 C 17.975 3.825 18.6877 4.88333 19.213 6.1 C 19.7383 7.31667 20.0007 8.61667 20 10 C 20 11.3833 19.7373 12.6833 19.212 13.9 C 18.6867 15.1167 17.9743 16.175 17.075 17.075 C 16.175 17.975 15.1167 18.6877 13.9 19.213 C 12.6833 19.7383 11.3833 20.0007 10 20 Z"
                fill="#4CAF50"
            />

        </SvgIcon>
    );
};
