import React from "react"
import { Box, Button } from "@mui/material"
import classes from "./_.module.scss"
import { Link } from "react-router-dom"
import Logo from "@/assets/logo-kemenhan.png"
import { useCmsHooks } from "@/hooks/useCmsHooks"

const Navbar: React.FC = () => {
  const { queryContentPublic } = useCmsHooks()
  const { data: dataContent } = queryContentPublic()

  return (
    <>
      <Box className={classes.Navbar}>
        <Box className={classes.Logo}>
          <img src={Logo} alt="logo siteb" style={{ width: 80 }} />
        </Box>
        <Box className={classes.ListMenu}>
          <Link to="/">
            <Button variant="text" color="inherit">
              Beranda
            </Button>
          </Link>
          <a href={`/content/${dataContent?.data.filter((ar) => ar.content_type === 5)[0]?.uuid}`}>
            <Button variant="text" color="inherit">
              Informasi
            </Button>
          </a>
          <a href={`/content/${dataContent?.data.filter((ar) => ar.content_type === 6)[0]?.uuid}`}>
            <Button variant="text" color="inherit">
              Regulasi
            </Button>
          </a>
          <a href={"/#faq"}>
            <Button variant="text" color="inherit">
              FAQ
            </Button>
          </a>
        </Box>
        <Box className={classes.ListMenu}>
          <Link to="/login">
            <Button variant="text" color="inherit">
              Masuk
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  )
}

export default Navbar
