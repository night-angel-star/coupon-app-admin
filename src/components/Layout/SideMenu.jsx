import AppRoutes from "@/AppRoutes";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";

export const SideMenu = () => {
    const { pathname } = useLocation();
    const items = AppRoutes.reduce((accumulator, currentValue) => {
        if (currentValue.label !== undefined) {
            return [...accumulator, { label: currentValue.label, key: currentValue.path }];
        }
        else {
            return [...accumulator];
        }
    }, []);

    return (<Menu
        style={{ width: "100%" }}
        defaultSelectedKeys={[pathname]}
        mode="inline"
        items={items}
    ></Menu>);
}