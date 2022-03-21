import {Folder, Home, QueryStats, CurrencyExchange, CompareArrows} from "@mui/icons-material";

const menuItems = [
    {icon: <Home />, text: "Home", toPage: 'home'},
    {icon: <Folder />, text: "Files", toPage: 'files'},
    {icon: <QueryStats />, text: "Stats", toPage: 'stats'},
    {icon: <CurrencyExchange />, text: "Exchanges", toPage: 'exchanges'},
    {icon: <CompareArrows />, text: "Transactions", toPage: 'transactions'},
];

export default menuItems;