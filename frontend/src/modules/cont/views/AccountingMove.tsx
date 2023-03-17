import { Container, Fab } from "@mui/material";
import { useState } from "react";
import { DataTable } from "../../../shared/components/table/DataTable";
import AddIcon from '@mui/icons-material/Add';



interface IAsientoContable {
    iddoc: number;
    descasiento: string;
    refdoc: string;
    anocont: number;
    percont: number;
    fecasiento: string;
    numpublicacion: number;
    stsasiento: string;
    raw_rnum_: number;
    idasiento?: any;
}



export const AccountingMove = () => {
    const [asientos] = useState<IAsientoContable[]>([
        {
            iddoc: 4514,
            descasiento: 'PRUEBA DE DEFECTO 4517',
            refdoc: 'D4517',
            anocont: 2009,
            percont: 6,
            fecasiento: '2009-06-17',
            numpublicacion: 1,
            stsasiento: 'RCH',
            raw_rnum_: 1,
            idasiento: null
        },

    ])

    return (
        <Container>
            <DataTable
                columns={[
                    {
                        key: 'id',
                        title: 'N°'
                    },
                    {
                        key: 'descasiednto',
                        title: 'Descripcion',
                    },
                    {
                        key: 'refdoc',
                        title: 'Auxiliar',
                    },
                    {
                        key: 'Débito',
                        title: 'Débito',
                    },
                    {
                        key: 'percont',
                        title: 'Crédito',
                    },

                ]}
                data={asientos}
                pagination={{
                    page: 1,
                    count: 100,
                    onPageChange: () => { },
                    rowsPerPage: 10,
                }}
                filters={{
                    onApplyFilter: () => { },
                    onApplySort: () => { },
                    filterOptions: [

                    ],
                    sortOptions: [

                    ],
                }}
            />
         
                <div style={{ position: 'absolute', bottom:10, left: 20 }}>
                    <Fab size="medium" sx={{backgroundColor:"#C72747"}} aria-label="add">
                        <AddIcon sx={{color:"#FFF"}}/>
                    </Fab>
                
            </div>
        </Container>
    );
};
