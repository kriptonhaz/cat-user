type ExamName =
  | "Induction"
  | "General Sequential Reasoning"
  | "Quantitative Reasoning"
  | "Language Development"
  | "Lexical Knowledge"
  | "Visualization"
  | "Flexibility of Closure"
  | "Memory Span"
  | "Working Memory"
  | "Perceptual Speed – comparison"
  | "Number Facility"

interface IExamData {
  examName: ExamName
  examUuid: string
}

export const ExamData: IExamData[] = [
  {
    examName: "Induction",
    examUuid: "1e9b5f59-48bb-421d-83b7-3f3d03a4d552",
  },
  {
    examName: "Flexibility of Closure",
    examUuid: "b6b33e0f-cfd1-4568-ba5b-677e242e5158",
  },
]
