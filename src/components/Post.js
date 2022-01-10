
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
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

let Post = (props) => {

    let {title, explanation, copyright, date, url, media} = props;
    const [like, setLike] = useState(true)
    const [share, setShare] = useState(false)
    const [cookieUpdated, setCookieUpdated] = useState(true)
    let time = date.split('-')
    let dateTime = new Date();
    dateTime.setFullYear(parseInt(time[0]))
    dateTime.setMonth(parseInt(time[1]) - 1)
    dateTime.setDate(parseInt(time[2]))

    if (copyright === undefined) {
        copyright= "Anonymous"
    }

    useEffect(()=> {
        let cookie = localStorage.getItem(`Like of ${url}`);
        if (cookie !== null){
            setLike(false)
        } else {
            setLike(true)
        }
        setCookieUpdated(false)

    }, [cookieUpdated, url])

    let addCookie = () => {
        localStorage.setItem(`Like of ${url}`, url);
        setCookieUpdated(true)
    }

    let removeCookie = () => {
        localStorage.removeItem(`Like of ${url}`)
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
                title={`${title}`}
                titleTypographyProps={{variant:'body1' }}
                subheader={`@${copyright}`}
                subheaderTypographyProps={{variant:'body2' }}
            />
            <CardMedia
                component={media ==='image'? 'img': 'iframe'}
                height='100%'
                src={url}
                style={{position: 'relative', minHeight: media === 'image'? '100%': 230 }}
                alt="NASA Astronomy Media" 
            
            />
            <CardContent>
                <Typography variant="body" color="warning">
                    {dateTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
                <hr/>
                <Typography variant="body2" color="warning">
                    {explanation}
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

Post.propTypes = {
    title: PropTypes.string.isRequired, 
    explanation:PropTypes.string.isRequired, 
    copyright: PropTypes.string.isRequired, 
    date: PropTypes.string.isRequired, 
    url: PropTypes.string.isRequired, 
    media: PropTypes.string.isRequired
}

export default Post;