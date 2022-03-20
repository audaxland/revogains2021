import {Folder, Home, QueryStats, CurrencyExchange} from "@mui/icons-material";

const menuItems = [
    {icon: <Home />, text: "Home", toPage: 'home'},
    {icon: <Folder />, text: "Files", toPage: 'files'},
    {icon: <QueryStats />, text: "Stats", toPage: 'stats'},
    {icon: <CurrencyExchange />, text: "Exchanges", toPage: 'exchanges'},
];

export default menuItems;