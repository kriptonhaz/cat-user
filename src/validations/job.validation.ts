import * as Yup from "yup"

class JobValidation {
  public static create = Yup.object().shape({
    user_id: Yup.number().required(),
    user_uuid: Yup.string().required(),
    job_title: Yup.string().required(),
    grade: Yup.string().required(),
    work_department: Yup.string().required(),
    work_place: Yup.string().required(),
    city_code: Yup.string().required(),
  })
}

export default JobValidation
