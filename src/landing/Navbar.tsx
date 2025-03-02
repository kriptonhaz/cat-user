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
              {
                dataContent?.data.filter(
                  (ar) => ar.content_type === 5 && ar.content === "\u003cp\u003e#\u003c/p\u003e"
                )[0]?.title
              }
            </Button>
          </Link>
          {dataContent?.data
            .filter((ar) => ar.content_type === 5 && ar.content !== "\u003cp\u003e#\u003c/p\u003e")
            .map((ar) => (
              <Link to={`/${ar.content.replace(/<[^>]+>/g, "")}`} key={ar.uuid}>
                <Button variant="text" color="inherit">
                  {ar.title}
                </Button>
              </Link>
            ))}
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
