
import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

//MUI
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Fade from '@mui/material/Fade';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

//Rover Images
import Curiosity from '../images/curiosity.jpg';
import Opportunity from '../images/opportunity.jpg';
import Spirit from '../images/spirit.jpg';
import Perseverance from '../images/perseverance.jpg';

let MarsPost = (props) => {

    let { earthDate, sol, camera, rover, url} = props;
    const [like, setLike] = useState(true)
    const [share, setShare] = useState(false)
    let imageRover; 
    const [cookieUpdated, setCookieUpdated] = useState(true)
    let time = earthDate.split('-')
    let dateTime = new Date();
    dateTime.setFullYear(parseInt(time[0]))
    dateTime.setMonth(parseInt(time[1]) - 1)
    dateTime.setDate(parseInt(time[2]))

    if (rover === "Spirit"){
        imageRover = Spirit
    } else if (rover === "Curiosity"){
        imageRover = Curiosity;
    } else if (rover === "Opportunity"){
        imageRover = Opportunity
    } else if (rover === "Perseverance"){
        imageRover = Perseverance
    }

    useEffect(()=> {
        let cookie = localStorage.getItem(`Like of Mars Picture ${url}`);
        if (cookie !== null){
            setLike(false)
        } else {
            setLike(true)
        }
        setCookieUpdated(false)

    }, [cookieUpdated, url])

    let addCookie = () => {
        localStorage.setItem(`Like of Mars Picture ${url}`, url);
        setCookieUpdated(true)
    }

    let removeCookie = () => {
        localStorage.removeItem(`Like of Mars Picture ${url}`)
        setCookieUpdated(true)
    }
 
    let handleClick = () => {
        if (like){
            addCookie()
            setLike(false)
        } else {
            removeCookie()
            setLike(true)
        }
    }

    let handleShare = () => {
        navigator.clipboard.writeText(url);
        setShare(true)
        setTimeout(()=> {
            setShare(false)
        }, 5000)
    }

    return (
        <Fragment>
            <Card sx={{ maxWidth: 445, alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13}} raised >
            <CardHeader
                title={`${camera}`}
                titleTypographyProps={{variant:'body1' }}
                avatar={
                    <Avatar alt={rover} src={imageRover} sx={{ }} aria-label="rover"/>
                }
                subheader={`@${rover}`}
                subheaderTypographyProps={{variant:'body1' }}
            />
            <CardMedia
                component='img'
                height='100%'
                src={url}
                style={{position: 'relative', minHeight: '100%' }}
                alt="NASA Astronomy Media" 
            
            />
            <CardContent>
                <Typography color="warning" fontSize={16}>
                    Earth Date: {dateTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
                <hr/>
                <Typography  color="warning" fontSize={15}>
                    Martian Sol of the Mission: {sol}
                </Typography>
            </CardContent>
            <CardActions >

                {like ? 
                <Tooltip title="Like" arrow>
                    <IconButton aria-label="like/unlike" onClick={handleClick}>
                        <FavoriteBorderIcon color="warning"/>
                    </IconButton>
                </Tooltip>
                : 
                <Tooltip title="Unlike" arrow >
                    <IconButton aria-label="like/unlike" onClick={handleClick}>
                        <FavoriteIcon color='error'/>
                    </IconButton>
                </Tooltip>
                }

                <Tooltip title="Share" arrow>
                    <IconButton aria-label="share" onClick={handleShare}>
                        <ShareIcon color="warning"/>
                    </IconButton>
                </Tooltip>

                <Fade in={share} style={{ transitionDelay: '200ms' }}>
                    <Typography variant="body2" color="primary" sx={{ml: 1}} >
                        Media URL copied to clipboard
                    </Typography>
                </Fade>
            </CardActions>
            
            </Card>
        </Fragment>
    )
}

MarsPost.propTypes = {
    earthDate: PropTypes.string.isRequired,
    sol: PropTypes.number.isRequired,
    camera: PropTypes.string.isRequired,
    rover: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default MarsPost;