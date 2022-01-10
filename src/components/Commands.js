
import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {setTimeTo10, setTimeToToday, setTimeTo5, loadingDataFalse, loadingDataTrue, gotToMars, returnFromoMars} from '../redux/actions/dataActions'

//MUI
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';

let Commands = (props) => {

    let {showTime} = props;

    let [checked, setChecked] = useState(0)

    let handleSubmit = () => {

        if (checked === 0){
            props.setTimeToToday()
            props.returnFromoMars()
            props.loadingDataTrue()
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0; 
        } else if (checked === 1){
            props.setTimeTo5()
            props.returnFromoMars()
            props.loadingDataTrue()
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0; 
        } else if (checked === 2){
            props.setTimeTo10()
            props.returnFromoMars()
            props.loadingDataTrue()
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0; 
        }

        
    }

    let gotToMars = () => {
        props.gotToMars()
        props.loadingDataTrue()
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
    }

    let handleRadioButtons = (event) => {
        setChecked(parseInt(event.target.value))
    }

    return (
        <Fragment>
            <Zoom in={showTime} style={{ transitionDelay: '200ms', zIndex: 90 }}>
                <Card sx={{ width: 270, alignItems: 'center', mx: 'auto', mt: 5, fontSize: 12}} raised style={{zIndex: 90, display: showTime? 'block': 'none'}}>
                    <CardContent sx={{mx: 'auto'}} style={{alignItems: "center", justify: "center"}}>
                    <FormControl sx={{  alignItems: 'center'}}>
                            <RadioGroup
                                defaultValue="0"
                                onChange={handleRadioButtons}
                            >
                                <FormControlLabel label="Today" control={<Radio color="warning"/>} value="0"/>
                                <FormControlLabel label="Last 10 Days" control={<Radio color="warning"/>} value="1"/>
                                <FormControlLabel label="Last 40 Days" control={<Radio color="warning"/>} value="2"/>
                            </RadioGroup>
                            <Button
                                type="submit"
                                fullWidth
                                color="primary"
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{ mt: 2, mb: 1 }}
                           
                            >
                                Load Astronomy Picture
                            </Button>
                    </FormControl>
                    <Typography variant="h6" component="h6" sx={{mx: 'auto', justify: 'center'}} style={{margin: '0 42%'}}>
                        OR
                    </Typography>
                    <Button
                        fullWidth
                        color="success"
                        variant="contained"
                        onClick={gotToMars}
                        sx={{ mt: 1, mb: 1 }}
                    
                    >
                        Visit Mars
                    </Button>
                    </CardContent>
                </Card>
            </Zoom>
        </Fragment>
    )
}

Commands.propTypes = {
    showTime: PropTypes.bool.isRequired, 
    setTimeTo10: PropTypes.func.isRequired, 
    setTimeToToday: PropTypes.func.isRequired, 
    setTimeTo5: PropTypes.func.isRequired, 
    loadingDataFalse: PropTypes.func.isRequired, 
    loadingDataTrue: PropTypes.func.isRequired, 
    gotToMars: PropTypes.func.isRequired, 
    returnFromoMars: PropTypes.func.isRequired

}

const mapStateToProps = (state) => ({
    showTime: state.data.showTime
})

const mapActionsToProps = {
    setTimeTo10, 
    setTimeToToday, 
    setTimeTo5, 
    loadingDataFalse, 
    loadingDataTrue, 
    gotToMars,
    returnFromoMars
}


export default connect(mapStateToProps, mapActionsToProps)(Commands);


