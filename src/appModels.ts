/* Enums Start */
enum QuizTypesEnum {
  SingleSelect = "SingleSelect",
  TextInput = "TextInput",
}
/* Enums End */

/* Types Start*/
export type Quiz = {
  topic: string;
  type: `${QuizTypesEnum}`;
  answerOptions?: string[];
  correctAnswer: string;
  id: string;
};

export type QuizResult = {
  topic: string;
  userAnswer: string;
  correctAnswer: string;
};

export type QuizFormValues = {
  [key: string]: string;
};
/* Types End */
