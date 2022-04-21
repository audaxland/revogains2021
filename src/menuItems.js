import {
    Folder, Home, QueryStats, CurrencyExchange, CompareArrows,
    Balance, FileDownload, Thunderstorm
} from "@mui/icons-material";

const menuItems = [
    {icon: <Home />, text: "Home", toPage: 'home'},
    {icon: <Folder />, text: "Files", toPage: 'files'},
    {icon: <QueryStats />, text: "Stats", toPage: 'stats'},
    {icon: <CurrencyExchange />, text: "Exchanges", toPage: 'exchanges'},
    {icon: <CompareArrows />, text: "Transactions", toPage: 'transactions'},
    {icon: <Balance />, text: "Gains", toPage: 'gains'},
    {icon: <FileDownload />, text: "Exports", toPage: 'exports'},
    {icon: <Thunderstorm />, text: "Form 8949", toPage: 'tax'},
];

export default menuItems;