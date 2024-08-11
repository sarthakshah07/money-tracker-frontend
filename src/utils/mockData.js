import { AddCircleOutline, BarChartOutlined, DashboardCustomizeOutlined, SettingsAccessibility, TrendingUpOutlined } from "@mui/icons-material";

export const sidebarItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <DashboardCustomizeOutlined />,
        disabled:false
    },
    {
        title: "Transactions",
        path: "/transactions",
        icon: <AddCircleOutline />,
        disabled:false
    },
    {
        title: "Budget",
        path: "/budget",
        icon: <TrendingUpOutlined />,
        disabled:true
    },
    {
        title: "Reports",
        path: "/reports",
        icon: <BarChartOutlined />,   
        disabled:false
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <SettingsAccessibility />,
        disabled:false
    },
]