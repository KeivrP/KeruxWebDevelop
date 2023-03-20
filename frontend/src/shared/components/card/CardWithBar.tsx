import { Card } from "@mui/material";
import { TitleBar } from "../bars/TitleBar";

export interface CardWithBarProps {
  title: string | React.ReactNode;
  headerStartIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const CardWithBar = ({
  title,
  headerStartIcon,
  children,
}: CardWithBarProps) => {
  return (
    <div>
      <TitleBar startIcon={headerStartIcon} marginBottom="10px">
        {title}
      </TitleBar>
      <Card>
        {children}
      </Card>
    </div>
  )
}