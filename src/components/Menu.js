import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import menuItems from "../menuItems";

const Menu = ({page, setPage}) => {
    return (
        <nav>
            <List>
                {menuItems.map(item => (
                    <ListItem
                        disablePadding
                        key={item.toPage}
                    >
                        <ListItemButton
                            onClick={e => setPage(item.toPage)}
                            selected={page === item.toPage}
                        >
                            <ListItemIcon >{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </nav>
    );
};

export default Menu;