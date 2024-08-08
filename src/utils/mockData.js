import { AddCircleOutline, BarChartOutlined, DashboardCustomizeOutlined, SettingsAccessibility, TrendingUpOutlined } from "@mui/icons-material";

export const sidebarItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <DashboardCustomizeOutlined />,
    },
    {
        title: "Transactions",
        path: "/transactions",
        icon: <AddCircleOutline />,
    },
    {
        title: "Budget",
        path: "/budget",
        icon: <TrendingUpOutlined />,
    },
    {
        title: "Reports",
        path: "/reports",
        icon: <BarChartOutlined />,   
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <SettingsAccessibility />,
    },
]