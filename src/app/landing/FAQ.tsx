import { Container, Stack, Typography } from "@mui/material"
import React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import { CaretDown } from "phosphor-react"

type FAQProps = {
  faqItem: {
    question: string
    answer: string
  }[]
}

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary
        expandIcon={<CaretDown size={24} weight="bold" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography fontWeight="bold">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

const FAQ: React.FC<FAQProps> = (props: FAQProps) => {
  return (
    <Container maxWidth="lg" sx={{ my: 10 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
        Pertanyaan yang Sering Diajukan
      </Typography>
      <Stack direction="column" gap={2}>
        {props.faqItem.map((item) => (
          <AccordionItem key={item.question} question={`${item.question}`} answer={`${item.answer}`} />
        ))}
      </Stack>
    </Container>
  )
}

export default FAQ
