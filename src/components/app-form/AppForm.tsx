import React from "react";
import { FormikProps } from "formik";
import Button from "@mui/material/Button";

import "./appForm.css";
import { Quiz, QuizFormValues } from "../../appModels";
import { TextInput } from "../TextInput.tsx/TextInput";
import { SelectInput } from "../SelectInput.tsx/SelectInput";

interface AppFormProps {
  formik: FormikProps<QuizFormValues>;
  currentQuiz: Quiz;
  currentStep: number;
  quizzesData: Quiz[];
}

const renderQuizInput = (
  quizData: Quiz,
  quizFormik: FormikProps<QuizFormValues>
) => {
  if (quizData.type === "TextInput") {
    const hasError = !!(
      quizFormik.touched[quizData.id] && quizFormik.errors[quizData.id]
    );
    return (
      <TextInput
        identifier={quizData.id}
        labelText={quizData.topic}
        showError={hasError}
        errorText={quizFormik.errors[quizData.id]}
        onChange={quizFormik.handleChange}
        onBlur={quizFormik.handleBlur}
        placeholder="Answer"
        value={quizFormik.values[quizData.id]}
      />
    );
  } else if (quizData.type === "SingleSelect") {
    const hasError = !!(
      quizFormik.touched[quizData.id] && quizFormik.errors[quizData.id]
    );
    return (
      <SelectInput
        identifier={quizData.id}
        labelText={quizData.topic}
        showError={hasError}
        errorText={quizFormik.errors[quizData.id]}
        onChange={quizFormik.handleChange}
        onBlur={quizFormik.handleBlur}
        placeholder="Answer"
        value={quizFormik.values[quizData.id]}
        options={quizData.answerOptions}
      />
    );
  }
};

export const AppForm = ({
  formik,
  currentQuiz,
  currentStep,
  quizzesData,
}: AppFormProps): JSX.Element => {
  return (
    <form onSubmit={formik.handleSubmit} className="quiz-form">
      {renderQuizInput(currentQuiz, formik)}
      {currentStep === quizzesData.length - 1 && (
        <div className="form-buttons-group">
          <Button
            variant="contained"
            disabled={!formik.values[currentQuiz.id]}
            type="submit"
          >
            Submit Answers
          </Button>
        </div>
      )}
    </form>
  );
};
