import menuItems from "../menuItems";
import HomePage from "./pages/HomePage";
import FilesPage from "./pages/FilesPage";
import StatsPage from "./pages/StatsPage";
import {Paper, Box} from "@mui/material";
import ExchangePage from "./pages/ExchangePage";
import TransactionsPage from "./pages/TransactionsPage";
import GainsPage from "./pages/GainsPage";
import ExportsPage from "./pages/ExportPage/ExportsPage";

const Router = ({page, files}) => {
    const currentPage = menuItems.find(item => item.toPage === page);
    return (
        <Paper sx={{
            padding: '1em',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '90vh',
        }}>
            <h1 style={{
                background: 'teal',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.2em 0.5em',
                borderRadius: '0.5em',
                alignItems: 'center',
                marginTop: 0,
            }}>
                {currentPage.text ?? '404'}
                {currentPage.icon ?? null}
            </h1>
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                {(page === 'home') && <HomePage files={files} />}
                {(page === 'files') && <FilesPage files={files} />}
                {(page === 'stats') && <StatsPage files={files} />}
                {(page === 'exchanges') && <ExchangePage files={files} />}
                {(page === 'transactions') && <TransactionsPage files={files} />}
                {(page === 'gains') && <GainsPage files={files} />}
                {(page === 'exports') && <ExportsPage files={files} />}
            </Box>

        </Paper>
    )
};

export default Router;