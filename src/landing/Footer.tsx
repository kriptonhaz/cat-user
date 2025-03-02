import { Box, Stack, Typography } from "@mui/material"
import React from "react"
import classes from "./_.module.scss"
import Logo from "@/assets/logo-kemenhan.png"
import { useCmsHooks } from "@/hooks/useCmsHooks"

const Footer: React.FC = () => {
  const { queryContentPublic } = useCmsHooks()
  const { data: dataContent } = queryContentPublic()

  return (
    <Box className={classes.Footer}>
      <Box className={classes.Main}>
        <Box className={classes.Logo}>
          <img src={Logo} alt="logo siteb" style={{ width: 80 }} />
        </Box>
        <Stack direction="row" spacing={4}>
          <Box className={classes.Menu}>
            <Typography variant="subtitle1" fontWeight={"semiBold"} className={classes.TitleMenu}>
              {dataContent?.data?.filter((ar) => ar.content_type === 2)[0]?.title}
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: dataContent?.data?.filter((ar) => ar.content_type === 2)[0]?.content ?? "",
              }}
            />
          </Box>
          <Box className={classes.Menu} id="contact">
            <Typography variant="subtitle1" fontWeight={"semiBold"} className={classes.TitleMenu}>
              {dataContent?.data?.filter((ar) => ar.content_type === 3)[0]?.title}
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: dataContent?.data?.filter((ar) => ar.content_type === 3)[0]?.content ?? "",
              }}
            />
          </Box>
        </Stack>
      </Box>
      <Box className={classes.Copyright}>
        <div
          dangerouslySetInnerHTML={{
            __html: dataContent?.data?.filter((ar) => ar.content_type === 4)[0]?.content ?? "",
          }}
        />
      </Box>
    </Box>
  )
}

export default Footer
