
import React from 'react';
import PropTypes from 'prop-types';
import StarfieldAnimation from 'react-starfield-animation';

let Stars = (props) => {
    return(
        <StarfieldAnimation
            style={{
                position: 'absolute',
                width: '100%',
                height: "100%",
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}
            numParticles={props.stars}
            depth={1000}
        />
    )

}

Stars.propTypes = {
    stars: PropTypes.number.isRequired
}

export default Stars;
