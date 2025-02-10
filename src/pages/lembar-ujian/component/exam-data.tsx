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
    examUuid: "555bec5b-a97b-48e2-bf61-ec4ddb8ff63a",
  },
  {
    examName: "Flexibility of Closure",
    examUuid: "7e7c3759-e8fb-4400-92b8-756b3c1a7ba4",
  },
  {
    examName: "Visualization",
    examUuid: "27f23236-54ab-42e7-bf6c-5d95aed8982c",
  },
  {
    examName: "Language Development",
    examUuid: "020829d4-3bd6-4fc1-bde4-978b89d06e45",
  },
  {
    examName: "Number Facility",
    examUuid: "04bd0cbe-30e2-4770-aa4d-e0e5b9d941fa",
  },
  {
    examName: "Perceptual Speed – comparison",
    examUuid: "6643a9b3-0556-4054-b47e-1a4c9f365d13",
  },
  {
    examName: "Working Memory",
    examUuid: "4e54ffc6-bad9-40d1-8ef9-abf998fde2a2",
  },
  {
    examName: "Memory Span",
    examUuid: "067c5614-0865-4799-8a63-5ff396aa4bdc",
  },
  {
    examName: "Lexical Knowledge",
    examUuid: "b4dd3b1d-2cc3-4640-8f29-2a7bfc40ab62",
  },
]
