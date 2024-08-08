import React, { useEffect, useState } from "react";
import { format, addWeeks, addMonths, subMonths, addDays, startOfWeek, endOfWeek } from "date-fns";
import {
    Box,
    Grid,
    Button,
    Typography,
    Paper,
    TextField,
    InputAdornment,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { MuiPickersAdapterContext } from "@mui/x-date-pickers";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { CancelOutlined, DateRange } from "@mui/icons-material";
import { DateRange as DateRangeCalender } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css';

const Calendar = () => {
    const [startDateChips, setStartDateChips] = useState([]);
    const [endDateChips, setEndDateChips] = useState([]);
    const [startValue, setStartValue] = useState("");
    const [endValue, setEndValue] = useState("");
    const [addTimeTextForStart, setAddTimeTextForStart] = useState("     Add Time");
    const [addTimeTextForEnd, setAddTimeTextForEnd] = useState("     Add Time");
    const [isStartDateFocused, setIsStartDateFocused] = useState(false);
    const [isEndDateFocused, setIsEndDateFocused] = useState(false);
    const [startAnchorEl, setStartAnchorEl] = useState(null);
    const [endAnchorEl, setEndAnchorEl] = useState(null);
    const openStart = Boolean(startAnchorEl);
    const openEnd = Boolean(endAnchorEl);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const preDefinedDateList = [
        { value: new Date(), label: "Today" },
        { value: addDays(new Date(), 1), label: "Tomorrow" },
        { value: addDays(new Date(), 2), label: "Next Day" },
        { value: startOfWeek(new Date()), label: "This Weekend" },
        { value: addWeeks(new Date(), 1), label: "Next Week" },
        { value: addWeeks(new Date(), 2), label: "Next 2 Weeks" },
        { value: addWeeks(new Date(), 4), label: "Next 4 Weeks" },
    ];
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const handleStartModalClose = () => {
        setStartAnchorEl(null);
    };
    const handleEndModalClose = () => {
        setEndAnchorEl(null);
    };
    const istTimeList = Array.from({ length: 96 }).map((v, k) => {
        const date = new Date();
        date.setHours(Math.floor(k / 4));
        date.setMinutes((k % 4) * 15);
        return format(date, "hh:mm a");
    });
    const handleStartSelect = (time) => {
        setStartDateChips([...startDateChips, time]);
        setStartAnchorEl(null);
    };
    const handleEndSelect = (time) => {
        setEndDateChips([...endDateChips, time]);
        setEndAnchorEl(null);
    };
    const handleClearStartDate = () => {
        setStartDateChips([]);
        setAddTimeTextForStart("");
        setStartValue("");
        // setState([
        //     {

        //         startDate: null,
        //         endDate: null
        //     }
        // ])
    };
    const handleClearEndDate = () => {
        setEndDateChips([]);
        setAddTimeTextForEnd("");
        setEndValue("");

    };
    console.log("startDateChips", startDateChips);
    const getDayValue = (date) => {
        const today = new Date();
        const day = date.getDay();
        console.log("day", day);
        const week = date.getTime() - today.getTime();
        if (week < 0 && week >= -604800000) { // 1 week in ms
            return ["Sun", "Mon", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];
        } else {
            return format(date, "d MMM");
        }
    }
    const handleCalenderSelect = (item) => {
        if (isStartDateFocused && startDateChips.length === 0) {
            console.log("item", item);
            // setStartValue(format(item.selection.startDate, "MM/dd/yy"));
            // setAddTimeTextForStart("     Add  Time");
            // setStartDateChips([...startDateChips, format(item.selection.startDate, "MM/dd/yy") + " "]);

        }
        // else if (isEndDateFocused && endDateChips.length === 0) {
        //     console.log("item", item);
        //     // setEndValue(format(item.selection.endDate, "MM/dd/yy"));
        //     // setAddTimeTextForEnd("     Add  Time");
        //     setEndDateChips([...endDateChips, format(item.selection.endDate, "MM/dd/yy") + " "]);
        // }else{
        setStartDateChips([...startDateChips,format(item.selection.startDate, "MM/dd/yy")]);
        setEndDateChips([...endDateChips, format(item.selection.endDate, "MM/dd/yy") + " "]);
        // setStartValue(format(item.selection.startDate, "MM/dd/yy"));
        // setEndValue(format(item.selection.endDate, "MM/dd/yy"));
        setState([
            {
                startDate: item.selection.startDate,
                endDate: item.selection.endDate,
                key: 'selection'
            }
        ])
        // }
    }

    useEffect(() => {
        if (startDateChips.length > 0 && startDateChips[0] !== state[0].startDate) {
            setState(prevState => {
                const newState = [...prevState];
                newState[0].startDate = startDateChips[0];
                return newState;
            });
        }
    }, [startDateChips, endDateChips])

    return (
        <Box sx={{ width: "80%" }}>

            <Grid container border={1}>
                <Grid item xs={6} border={1}>
                    <TextField
                        placeholder="Start date"
                        variant="outlined"
                        size="small"
                        sx={{ width: "100%" }}
                        autoFocus
                        fullWidth
                        onBlur={(e) => {
                            if (startValue.match(/^\d{2}\/\d{2}\/\d{2}$/)) {
                                console.log("key", e.key, startDateChips, startValue);
                                setStartDateChips([...startDateChips, startValue + " "]);
                                setStartValue("");
                            } else {
                                setStartValue("");
                            }
                        }}
                        onFocusCapture={(e) => {
                            setIsStartDateFocused(true);
                            if (startDateChips.length === 1) {
                                setAddTimeTextForStart("")
                                setStartAnchorEl(e.currentTarget);
                            }
                        }
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                                handleClearStartDate();
                            }
                            if (e.key === "Enter" && startDateChips.length === 0) {
                                if (startValue.match(/^\d{2}\/\d{2}\/\d{2}$/)) {
                                    console.log("key", e.key, startDateChips, startValue);
                                    setStartDateChips([...startDateChips, startValue + " "]);
                                    setStartValue("");
                                } else {
                                    setStartValue("");
                                }

                            }
                        }}
                        value={startDateChips.length > 1 ? startDateChips[0] + " at " + startDateChips[1] : startDateChips.length > 0 ? startDateChips?.[0] + (addTimeTextForStart && addTimeTextForStart) : startValue}
                        InputProps={{
                            endAdornment: startDateChips.length > 0 && <IconButton onClick={() => handleClearStartDate()}><CancelOutlined /></IconButton>,
                            startAdornment: <InputAdornment position="start"><DateRange /></InputAdornment>,
                        }}
                        onChange={(e) => setStartValue(e.target.value)}

                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={startAnchorEl}
                        open={openStart}
                        onClose={handleStartModalClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        MenuProps={{
                            TransitionComponent: "Fade",
                            TransitionProps: { timeout: 500 },

                        }}
                    >
                        {istTimeList.map((timeDetail, index) => (
                            <MenuItem onClick={() => handleStartSelect(timeDetail)}>{timeDetail}</MenuItem>
                        ))}
                    </Menu>
                </Grid>
                <Grid item xs={6} border={1}>
                    <TextField
                        placeholder="End date"
                        variant="outlined"
                        size="small"
                        sx={{ width: "100%" }}
                        autoFocus={startDateChips.length > 0}
                        fullWidth
                        onBlur={(e) => {
                            if (endValue?.match(/^\d{2}\/\d{2}\/\d{2}$/)) {
                                console.log("key", e.key, endDateChips, endValue);
                                setEndDateChips([...endDateChips, endValue + " "]);
                                setEndValue("");
                            } else {
                                setEndValue("");
                            }
                        }}
                        onFocusCapture={(e) => {
                            setIsEndDateFocused(true);
                            if (endDateChips.length === 1) {
                                setAddTimeTextForEnd("")
                                setEndAnchorEl(e.currentTarget);
                            }
                        }
                        }
                        onKeyDown={(e) => {
                            console.log("key", e.key);
                            if (e.key === "Backspace") {
                                handleClearEndDate();
                            }
                            if (e.key === "Enter") {
                                if (endValue.match(/^\d{2}\/\d{2}\/\d{2}$/)) {
                                    console.log("key", e.key, endDateChips, endValue);
                                    setEndDateChips([...endDateChips, endValue + " "]);
                                    setEndValue("");
                                } else {
                                    setEndValue("");
                                }

                            }
                        }}
                        value={endDateChips.length > 1 ? endDateChips[0] + " at " + endDateChips[1] : endDateChips.length > 0 ? endDateChips?.[0] + (addTimeTextForEnd && addTimeTextForEnd) : endValue}
                        InputProps={{
                            endAdornment: endDateChips.length > 0 && <IconButton onClick={() => handleClearEndDate()}><CancelOutlined /></IconButton>,
                            startAdornment: <InputAdornment position="start"><DateRange /></InputAdornment>,
                        }}
                        onChange={(e) => setEndValue(e.target.value)}

                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={endAnchorEl}
                        open={openEnd}
                        onClose={handleEndModalClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        MenuProps={{
                            TransitionComponent: "Fade",
                            TransitionProps: { timeout: 500 },

                        }}
                    >
                        {istTimeList.map((timeDetail, index) => (
                            <MenuItem onClick={() => handleEndSelect(timeDetail)}>{timeDetail}</MenuItem>
                        ))}
                    </Menu>
                </Grid>
                <Grid item xs={4} border={1}>
                    <List component="nav" aria-label="main mailbox folders">
                        {preDefinedDateList.map((dateDetail, index) => (
                            <ListItemButton
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(dateDetail.value, index)}
                            >
                                <ListItemText
                                    primary={dateDetail.label}
                                    secondary={getDayValue(dateDetail.value)}
                                    sx={{ display: "flex", justifyContent: "space-between" }}
                                    primaryTypographyProps={{ variant: "body2", display: "inline", flexGrow: 1 }}
                                    secondaryTypographyProps={{ variant: "body2", display: "inline" }}
                                />
                            </ListItemButton>
                        ))}


                    </List>

                </Grid>
                <Grid item xs={8} border={1}>
                    <DateRangeCalender
                        showSelectionPreview={false}
                        editableDateInputs={false}
                        inputRanges={[]}
                        ranges={state}
                        showDateDisplay={false}
                        onChange={item => handleCalenderSelect(item)}
                        moveRangeOnFirstSelection={false}
                    />

                </Grid>
            </Grid>

        </Box>
    );
};

export default Calendar;

