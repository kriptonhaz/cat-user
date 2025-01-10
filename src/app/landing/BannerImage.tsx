import React from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import Thumbnail1 from "@/assets/slider/image-1.jpg"
import Thumbnail2 from "@/assets/slider/image-2.jpg"
import Thumbnail3 from "@/assets/slider/image-3.jpg"
import Thumbnail4 from "@/assets/slider/image-4.jpg"

const BannerImage: React.FC = () => {
  return (
    <Splide aria-label="My Favorite Images">
      <SplideSlide>
        <div style={{ width: "100%", height: "860px", background: `url(${Thumbnail1}) center/cover no-repeat` }} />
      </SplideSlide>
      <SplideSlide>
        <div style={{ width: "100%", height: "860px", background: `url(${Thumbnail2}) center/cover no-repeat` }} />
      </SplideSlide>
      <SplideSlide>
        <div style={{ width: "100%", height: "860px", background: `url(${Thumbnail3}) center/cover no-repeat` }} />
      </SplideSlide>
      <SplideSlide>
        <div style={{ width: "100%", height: "860px", background: `url(${Thumbnail4}) center/cover no-repeat` }} />
      </SplideSlide>
    </Splide>
  )
}

export default BannerImage
