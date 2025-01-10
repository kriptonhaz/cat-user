import { Box, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import classes from "./_.module.scss"
import { loadEnv } from "@/loadEnv"
import { EnvType } from "@/env"
import Logo from "@/assets/logo-kemenhan.png"

const Footer: React.FC = () => {
  const date = new Date()
  const year = date.getFullYear()
  const [env, setEnv] = useState<EnvType>({
    VITE_TENTANG_KAMI: "",
    VITE_HUBUNGI_KAMI: {
      email: "",
      direktorat: "",
      alamat: "",
    },
    VITE_COPYRIGHT: "",
  })

  useEffect(() => {
    async function fetchEnv() {
      try {
        const env = await loadEnv()
        setEnv(env)
      } catch (error) {
        console.error("Error loading environment variables", error)
      }
    }
    fetchEnv()
  }, [])

  return (
    <Box className={classes.Footer}>
      <Box className={classes.Main}>
        <Box className={classes.Logo}>
          <img src={Logo} alt="logo siteb" style={{ width: 80 }} />
        </Box>
        <Stack direction="row" spacing={4}>
          <Box className={classes.Menu}>
            <Typography variant="subtitle1" fontWeight={"semiBold"} className={classes.TitleMenu}>
              Tentang Kami
            </Typography>
            <Typography>{env.VITE_TENTANG_KAMI}</Typography>
          </Box>
          <Box className={classes.Menu}>
            <Typography variant="subtitle1" fontWeight={"semiBold"} className={classes.TitleMenu}>
              Hubungi Kami
            </Typography>
            <Typography>
              Email : <a href={`mailto:${env.VITE_HUBUNGI_KAMI?.email}`}>{env.VITE_HUBUNGI_KAMI?.email}</a>
            </Typography>
            <Typography>{env.VITE_HUBUNGI_KAMI?.direktorat}</Typography>
            <Typography>{env.VITE_HUBUNGI_KAMI?.alamat}</Typography>
          </Box>
        </Stack>
      </Box>
      <Box className={classes.Copyright}>
        <Typography fontWeight={"semiBold"}>
          &copy; {year} {env.VITE_COPYRIGHT}
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
