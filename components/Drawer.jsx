import { Article, HeartBroken, Home, Share } from '@mui/icons-material';
import { Button, Icon, IconButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';

export const drawerWidth = 60; 

export default function PrimaryDrawer({position, styleOverrides={}}) {

  return (
    <Drawer
      anchor={position}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          ...styleOverrides
        },
      }}
      variant='persistent'
      open={true}
    >
      <IconButton sx={{margin: "8px", marginTop: "16px"}}><Home /></IconButton>
      <IconButton sx={{margin: "8px"}}><Article /></IconButton>
      <IconButton sx={{margin: "8px"}}><Share /></IconButton>
    </Drawer>
  )
}