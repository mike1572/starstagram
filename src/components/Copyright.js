
import React from 'react';

//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

let Copyright = () => {
    return (
        <footer>
            <Box sx={{ mt: 5}} color="warning" style={{ bottom: 0, zIndex: 70}}>
                <AppBar position='static' style={{alignItems: 'center'}}>
                    <Toolbar>
                        <Typography variant="body2" sx={{ flexGrow: 1 }} color="warning">
                            Copyright © Mike Dimitrov 2022
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </footer>
    )
}

export default Copyright;