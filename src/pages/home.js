
import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

//Components
import Header from '../components/Header';
import Post from '../components/Post';
import Copyright from '../components/Copyright';
import MarsPost from '../components/MarsPost';
import Stars from '../components/Stars';
import Commands from '../components/Commands';
import RoverBio from '../components/RoverBio'

//MUI 
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// Redux
import {connect} from 'react-redux';
import { loadingDataFalse, loadingDataTrue, setShowTimeClose, loadAstronomyPic} from '../redux/actions/dataActions'

//Rovers Pictures
import Curiosity from '../images/curiosity.jpg';
import Opportunity from '../images/opportunity.jpg';
import Spirit from '../images/spirit.jpg';
import Perseverance from '../images/perseverance.jpg'

let rovers = [
    {
        landing_date: "2021-02-18",
        launch_date: "2020-07-30",
        name: "Perseverance",
        status: "Active", 
        image: Perseverance
    },
    {
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        name: "Curiosity",
        status: "Active", 
        image: Curiosity
    }, 
    {
        landing_date: "2004-01-25",
        launch_date: "2003-07-07",
        name: "Opportunity",
        status: "Complete",
        image: Opportunity
    }, 
    {
        landing_date: "2004-01-04",
        launch_date: "2003-06-10",
        name: "Spirit",
        status: "Complete",
        image: Spirit
    }
]

let Home = (props) => {

    let {loadingData, time, onMars, loadingMarsPosts, roverData, astronomyData }= props
    let [info, setInfo] = useState(true)
    let [emptyDate, setEmptyDate] = useState(false)
    let [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(()=> {
        setInfo(false)
        if (loadingMarsPosts){
            setEmptyDate(false)
        }
    },[loadingMarsPosts])

    useEffect(()=> {
        window.addEventListener('resize', ()=> {
            setWindowWidth(window.innerWidth)
        })        
    }, [])

    useEffect(()=> {
        
        if (roverData === null){
            setInfo(true)
        } else {
            if (roverData.length === 0){
                setEmptyDate(true)
            } else {
                setEmptyDate(false)
            }
            setInfo(false)
        }

    }, [roverData])

    useEffect(()=> {

        if(loadingData){    
            if (!onMars){
                props.loadAstronomyPic(time)

            } else {
                props.loadingDataFalse() 
                props.setShowTimeClose()
            }
        }

    }, [loadingData, time, onMars, props])



    return (

        <Fragment >
            
            <header style={{position: 'sticky', top: 0, zIndex: 60}}>
                <Header/>
                <Commands/>
            </header>

            <main>
            {
            
            !onMars?( 
                loadingData ? 
                    (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress color="secondary" size={60} thickness={2} sx={{mt: 5}} />
                    </div> 
                    )
                    : (
                        <Fragment>

                        {astronomyData.slice(0).reverse().map( (image, i )=> {
                            
                            if (i !== astronomyData.length -1){
                                return (
                                    <Fragment key={i}>
                                        <Post media={image.media_type} date={image.date} url={image.url} title={image.title} explanation={image.explanation} copyright={image.copyright}/>
                                        <Stars stars={30}/>
                                    </Fragment>
                                )
                            } else{
                                return (
                                    <Fragment key={i}>
                                        <Post media={image.media_type} date={image.date} url={image.url} title={image.title} explanation={image.explanation} copyright={image.copyright}/>
                                    </Fragment>
                                )
                            }
                            
                        
                        })}
                        <br/>
                        </Fragment>
                    )

                )
                :(

                    loadingData ? 
                    (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress color="secondary" size={60} thickness={2} sx={{mt: 5}} />
                    </div> 
                    ):
                    (
                        <Fragment>
                            <Grid container>

                                <Grid item xs={12} md={6} lg={6} > 
                                    {rovers.map( (rover, i) => {
                                        return (
                                            <Fragment key={i}>
                                                <RoverBio windowWidth={windowWidth} id={i} landing={rover.landing_date} launch={rover.launch_date} name={rover.name} image={rover.image} status={rover.status} />                                   
                                            </Fragment>
                                        )
                                    })}
                                    <br/>
                                    <br/>
                                    <hr style={{width: '65%'}} id="scroller"/>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>

                                    {
                                        info? 
                                        (    
                                            <Card sx={{ maxWidth: 375, mx: 'auto', alignItems: 'center', mt: 15}} variant="outlined">
                                                <CardContent style={{ display:'flex', justifyContent:'center', alignItems: 'center' }}>
                                                    <EventAvailableIcon sx={{ fontSize: 60, mx: 'auto', ml: 1 }} color="primary" />
                                                    <Typography variant="h6" component="h6" sx={{ml: 2}} >
                                                        Select a date to see the rover's pictures from Mars
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ) : <Fragment></Fragment>
                                    }

                                    {
                                        emptyDate? (
                                            <Card sx={{ maxWidth: 375, mx: 'auto', alignItems: 'center', mt: 15}} variant="outlined">
                                                <CardContent style={{ display:'flex', justifyContent:'center', alignItems: 'center' }}>
                                                    <SentimentDissatisfiedIcon sx={{ fontSize: 60, mx: 'auto', ml: 1 }} color="primary" />
                                                    <Typography variant="body1" component="h6" sx={{ml: 2}} >
                                                        The rover did not take any pictures on the chosen day.
                                                        <br/>
                                                        Please select another one.
                                                    </Typography>
                                                </CardContent>
                                            </Card> 
                                        ): <Fragment></Fragment>
                                    }
                                    {

                                        loadingMarsPosts? (

                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <CircularProgress color="secondary" size={80} thickness={2} sx={{mt: 12, mb: 10}} />
                                            </div> 
                                        ): 

                                        !info && !emptyDate ? (
                                            <Fragment>
                                                {roverData.slice(0, 15).map( (image, i )=> {
                                                   
                                                    if (i !== Math.min(roverData.length -1, 14)){
                                                        return (
                                                            <Fragment key={i}>
                                                                <MarsPost sol={image.sol} earthDate={image.earth_date} camera={image.camera.full_name} rover={image.rover.name} url={image.img_src} />
                                                                <Stars stars={30}/>
                                                            </Fragment>
                                                        )
                                                    } else{
                                                        return (
                                                            <Fragment key={i}>
                                                                <MarsPost sol={image.sol} earthDate={image.earth_date} camera={image.camera.full_name} rover={image.rover.name} url={image.img_src} />
                                                            </Fragment>
                                                        )
                                                    }
                                                    
                                                })}
                                            </Fragment>
                                        ): (
                                            <Fragment></Fragment>
                                        )

                                      
                                           
                                    }

                                    
                                </Grid>
                             
                            </Grid>
                       
                       
                        </Fragment>
                    )
                )
            }
        
            </main>

            <Copyright/>

        </Fragment>

    )
}

Home.propTypes = {
    showTime: PropTypes.bool.isRequired, 
    loadingData: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    loadingDataFalse: PropTypes.func.isRequired, 
    loadingDataTrue: PropTypes.func.isRequired, 
    setShowTimeClose: PropTypes.func.isRequired,
    loadingMarsPosts:  PropTypes.bool.isRequired,
    roverData: PropTypes.array.isRequired,
    astronomyData: PropTypes.array.isRequired,
    loadAstronomyPic: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    showTime: state.data.showTime, 
    loadingData: state.data.loadingData,
    time: state.data.time,
    onMars: state.data.onMars,
    loadingMarsPosts: state.data.loadingMarsPosts,
    roverData: state.data.roverData,
    astronomyData: state.data.astronomyData
})

const mapActionsToProps = {
    loadingDataFalse, loadingDataTrue,  setShowTimeClose, loadAstronomyPic
}


export default connect(mapStateToProps, mapActionsToProps)(Home);

