
import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Redux
import {connect} from 'react-redux';
import {setShowTimeClose, setShowTimeOpen} from '../redux/actions/dataActions'


let Header = (props) => {

    let {showTime} = props;
    let [showDates, setShowDates] = useState(false);

    useEffect(()=> {
        if (showTime){
            setShowDates(true)
        } else {
            setShowDates(false)
        }
    }, [showTime])

    let handleClick = () => {
        if (showDates) {
            setShowDates(false)
            props.setShowTimeClose()
        } else {
            setShowDates(true)
            props.setShowTimeOpen()
        }
    }

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }} color="primary" >
                <AppBar position='static' style={{alignItems: 'center'}} >
                    <Toolbar>

                        <Typography variant="h5" component="div" sx={{ flexGrow: 1}} id='header' color="secondary">
                            Starstagram
                        </Typography>
                       
                    {
                        !showDates? 
                            (<IconButton aria-label="like/unlike" onClick={handleClick}>
                                <ExpandMoreIcon color='secondary' sx={{mx: 1, mb: 1, mt: 1}} />
                            </IconButton>)
                            
                        :
                            (<IconButton aria-label="like/unlike" onClick={handleClick}>
                                <ExpandLessIcon color='secondary' sx={{mx: 1, mb: 1, mt: 1}} />
                            </IconButton>)
                    }

                    </Toolbar>

                       
              
                </AppBar>       
                
            </Box>
        </Fragment>
    )
}

Header.propTypes = {
    showTime: PropTypes.bool.isRequired, 
    setShowTimeClose: PropTypes.func.isRequired, 
    setShowTimeOpen: PropTypes.func.isRequired
}

const mapActionsToProps = {
    setShowTimeClose, setShowTimeOpen
}

const mapStateToProps = (state) => ({
    showTime: state.data.showTime
})


export default connect(mapStateToProps, mapActionsToProps)(Header);