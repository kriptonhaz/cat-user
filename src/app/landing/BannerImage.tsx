import React from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"

type BannerImageProps = {
  dataBanner: string[]
}
const BannerImage: React.FC<BannerImageProps> = (props: BannerImageProps) => {
  return (
    <Splide aria-label="My Favorite Images">
      {props.dataBanner.map((item) => {
        return (
          <SplideSlide key={item}>
            <div
              style={{
                width: "100%",
                height: "860px",
                background: `url(${import.meta.env.VITE_API_URL}${item}) center/cover no-repeat`,
              }}
            />
          </SplideSlide>
        )
      })}
    </Splide>
  )
}

export default BannerImage
