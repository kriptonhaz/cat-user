import React from "react"
import { Box, Button } from "@mui/material"
import classes from "./_.module.scss"
import { Link } from "react-router-dom"
import Logo from "@/assets/logo-kemenhan.png"

const Navbar: React.FC = () => {
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
          <a href={"#"}>
            <Button variant="text" color="inherit">
              Informasi
            </Button>
          </a>
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              window.open(
                "https://jdih.kominfo.go.id/produk_hukum/view/id/765/t/peraturan+menteri+komunikasi+dan+informatika+nomor+3+tahun+2021",
                "_blank"
              )
            }}
          >
            Regulasi
          </Button>
          <a href={"#"}>
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
