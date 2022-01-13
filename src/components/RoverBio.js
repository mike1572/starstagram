
import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';

// Redux
import {connect} from 'react-redux';
import {setRoverData} from '../redux/actions/dataActions'

let RoverBio = (props) => {

    let {landing, launch, name, image, status, id, roverNum, roverData, windowWidth} = props

    const [value, setValue] = useState(new Date());
    const [numRover, setNumRover] = useState(-1)

    let returnDate = (string) => {
        let date = new Date();
        string = string.split('-')
        date.setFullYear(string[0])
        date.setMonth(string[1] -1)
        date.setDate(string[2])
        return date
    }

    let landingDate = returnDate(landing)
    let launchDate  = returnDate(launch)

    useEffect(()=> {
        setNumRover(roverNum)
 
    }, [roverNum])

    useEffect(()=> {
        if (roverData === null || roverData.length === 0){
            setNumRover(-1)
        } else {
            setNumRover(roverNum)
        }
    }, [roverData, roverNum])

    let handleClick = () => {
        let date = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
        props.setRoverData(date, name.toLowerCase())

        if (windowWidth >= 900){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0; 
        } else {
            let scrollerLine = document.getElementById("scroller");
            scrollerLine.scrollIntoView();
        }
       
    }

    return (
        <Fragment>
            <Card sx={{ maxWidth: 600, alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, display: 'flex', zIndex: id === numRover && windowWidth >= 900 ? 5: 4,  top: id === numRover && windowWidth >= 900 ? 100: 0, position: id === numRover && windowWidth >= 900? 'sticky': 'relative' }} raised >
             
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} >
                        <CardMedia
                            component="img"
                            image={image}
                            className="image1"
                            alt="Rover exploring Mars"
                            sx={{height: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} >
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>   
                            <CardContent sx={{m: 'auto' }}>
                                <Typography fontWeight={600} sx={{ml: 0, mb: 1}}  variant={'h6'}>
                                    {name}
                                </Typography>
                                <Typography  sx={{ml: 0}} variant={'body1'}>
                                    Landing Date: {landingDate.toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' })}
                                </Typography>
                                <Typography  sx={{ml: 0}} variant={'body1'}>
                                    Launch Date: {launchDate.toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' })}
                                </Typography>
                                <Typography  sx={{ml: 0, mb: 2}} variant={'body1'}>
                                    Mission Status: <b><i>{status}</i></b>
                                </Typography>
                                <Box sx={{mr: 1}}>
                                    <LocalizationProvider dateAdapter={DateAdapter} >
                                        <DatePicker
                                            sx={{mr: 2}}
                                            label='Pick a Date'
                                            maxDate={new Date()}
                                            minDate={landingDate}
                                            value={value}
                                            onChange={(newValue) => {
                                            setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField style={{zIndex: 0}} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <Button color='secondary' sx={{mt: 2, ml: 0}} variant="contained" onClick={handleClick}>
                                    View Pictures
                                </Button>
                            </CardContent>
                        </Box>
                    </Grid>
            
                </Grid>

            </Card>
        </Fragment>
    )
}

RoverBio.propTypes = {
    landing: PropTypes.string.isRequired, 
    launch: PropTypes.string.isRequired,  
    name: PropTypes.string.isRequired, 
    image: PropTypes.string.isRequired, 
    status: PropTypes.string.isRequired, 
    id: PropTypes.number.isRequired,
    setRoverData: PropTypes.func.isRequired,
    roverNum: PropTypes.number.isRequired,
    roverData: PropTypes.array.isRequired,
    windowWidth: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
    roverNum: state.data.roverNum,
    roverData: state.data.roverData
})

const mapActionsToProps = {
    setRoverData
}


export default connect(mapStateToProps, mapActionsToProps)(RoverBio);





