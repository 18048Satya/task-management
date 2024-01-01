import React, { useState } from 'react'
import { MenData } from './Data'
import './Menu.css'
import {motion} from 'framer-motion'
import {LogoutOutlined} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon  from  '@mui/icons-material/Close'

function Menu() {
   const[selected, setSelected] = useState(0)
   const [expanded, setExpanded] = useState(false)
   const sidebarVariants = {
    true:{
      left:'0'
    },
    false:{
      left:'-60%'
    }

  }

  return (
    <>
    <div className='bars' style={expanded?{left:"0%"}:{left:"5%"}}
 onClick={() => setExpanded(!expanded)}
 >
     <MenuIcon/>
      </div>
    <motion.div className="Menubar"
    variants={sidebarVariants}
    animate={window.innerWidth<=768 ?`${expanded}`:''}
    >
         <div className='closebar'
      onClick={() => setExpanded(!expanded)}>
        <CloseIcon/>
      </div>
         <div className="title">
            <span>
                T<span>a</span>sk
            </span>
         </div>
         <div className="menu">
            {MenData.map((item, index)=>{
                return(
                    <div className={selected === index?'menuItem active':'menuItem'}
                    key={index}
                    onClick={()=>setSelected(index)}
                    >
                       <item.icon/>
                       <span>
                        {item.title}
                        </span> 
                    </div>
                )
            })}
            <div className="menuItem">
                <LogoutOutlined/>
            </div>
         </div>
    </motion.div>
    </>
  )
}

export default Menu