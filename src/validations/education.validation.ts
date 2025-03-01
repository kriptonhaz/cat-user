import * as Yup from "yup"

class EducationValidation {
  public static create = Yup.object().shape({
    user_id: Yup.number().required(),
    user_uuid: Yup.string().required(),
    title: Yup.string().required(),
    grade: Yup.string().required(),
    major: Yup.string().required(),
  })
}

export default EducationValidation
