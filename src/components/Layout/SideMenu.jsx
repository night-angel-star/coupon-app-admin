import AppRoutes from "../../AppRoutes";
// import { useLocation } from "react-router-dom";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setRoute } from "../../redux/actions/route";

export const SideMenu = () => {
  // const { pathname } = useLocation();
  const pageName = useSelector((state) => state.route.name);
  const permission = useSelector((state) =>
    state.auth.isLoggedIn ? state.auth.user.permission : {}
  );
  const level = useSelector((state) => state.auth.user.level);
  const dispatch = useDispatch();
  const items = AppRoutes.reduce((accumulator, currentValue) => {
    if (currentValue.label !== undefined) {
      if (
        currentValue.label.props.children === "Dashboard" ||
        ((currentValue.label.props.children === "Coupon Product" ||
          currentValue.label.props.children === "Coupon Brand" ||
          currentValue.label.props.children === "Advertisement" ||
          currentValue.label.props.children === "Coupon Category" ||
          currentValue.label.props.children === "Coupon User") &&
          level === 1)
      ) {
        return [
          ...accumulator,
          { label: currentValue.label, key: currentValue.path },
        ];
      } else {
        if (
          permission[currentValue.label.props.children.toLowerCase()]?.view ===
          1
        ) {
          return [
            ...accumulator,
            { label: currentValue.label, key: currentValue.path },
          ];
        } else {
          return [...accumulator];
        }
      }
    } else {
      return [...accumulator];
    }
  }, []);

  const navigateTo = (e) => {
    console.log(e);
    dispatch(setRoute(e.key));
  };

  return (
    <Menu
      style={{ width: "100%" }}
      defaultSelectedKeys={[pageName]}
      mode="inline"
      items={items}
      onClick={navigateTo}
    ></Menu>
  );
};
