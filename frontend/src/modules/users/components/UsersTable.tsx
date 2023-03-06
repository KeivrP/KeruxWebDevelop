import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { MoreVert as OptionsIcon } from "@mui/icons-material";
import { IconButtonMenu } from "../../../shared/components/button/IconButtonMenu";

export const UsersTable = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Options</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Alexander Romero</TableCell>
          <TableCell>alex@mail.com</TableCell>
          <TableCell>Administrator</TableCell>
          <TableCell>
            <IconButtonMenu icon={<OptionsIcon />} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};