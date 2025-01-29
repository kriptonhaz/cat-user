import { Box, Grid } from "@mui/material"
import { useCmsHooks } from "@/hooks/useCmsHooks"
import FAQ from "@/app/landing/FAQ"

const FAQPage = () => {
  const { queryFaqPublic } = useCmsHooks()
  const { data: dataFaq } = queryFaqPublic()

  return (
    <Box>
      <Grid container sx={{ mt: 10, pl: 5, mb: 5 }} spacing={5}>
        <Grid item xs={12}>
          {dataFaq && (
            <FAQ
              faqItem={dataFaq?.data.map((item) => {
                return {
                  question: item.question,
                  answer: item.answer,
                }
              })}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default FAQPage
