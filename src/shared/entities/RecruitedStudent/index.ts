export interface RecruitedStudent {
  name: string
  vacancy: string
  skills: string
  status: {
    interview: boolean
    email: boolean
    document: boolean
  }
}
