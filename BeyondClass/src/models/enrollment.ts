import type {Student, CostItem} from "./activity";
import type { SessionItem } from "./schedule";

export interface EnrollActivityInput {
    student: Student;
    optionals: [CostItem];
  }


export interface EnrollActivityOutput{
    ok: boolean;
    okmsg: string;
    errormsg: string;
}
    