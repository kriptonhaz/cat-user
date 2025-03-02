import React from "react"
import { Box, Typography, Stack } from "@mui/material"
import { Calendar, MapPin } from "phosphor-react"
import { useCmsHooks } from "@/hooks/useCmsHooks"
import dayjs from "dayjs"

const CourseSchedule: React.FC = () => {
  const { querySchedulePublic } = useCmsHooks()
  const { data: dataCourse } = querySchedulePublic()

  return (
    <Box sx={{ mt: 8 }} id="jadwaltest">
      <Typography variant="h5" fontWeight="bold" textAlign="left" mb={4}>
        Jadwal Test
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
        }}
      >
        {dataCourse?.data.map((course, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 3,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adds subtle shadow effect
              "&:hover": {
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)", // Enhanced shadow on hover
              },
            }}
          >
            <Typography
              // @ts-ignore
              variant="h7"
              sx={{
                mb: 2,
                fontWeight: "medium",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {course.exam_data.name}
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Calendar size={24} />
                <Typography>
                  {dayjs(course.exam_data.start_time).format("DD MMMM YYYY")} -{" "}
                  {dayjs(course.exam_data.end_time).format("DD MMMM YYYY")}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MapPin size={24} />
                <Typography>{course.exam_data.location}</Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default CourseSchedule
