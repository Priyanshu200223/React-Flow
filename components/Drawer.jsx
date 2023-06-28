import Drawer from '@mui/material/Drawer';

export const drawerWidth = 60; 

export default function PrimaryDrawer() {

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
      variant='persistent'
      open={true}
    >
      Placeholder
    </Drawer>
  )
}