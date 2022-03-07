import React, { useEffect, useMemo, useState } from "react";
import { FormikErrors, useFormik } from "formik";

import "./assets/stylesheets/app.css";
import { Quiz, QuizFormValues, QuizResult } from "./appModels";
import { AppStepper } from "./components/app-stepper/AppStepper";
import { AppResults } from "./components/app-results/AppResults";
import { AppForm } from "./components/app-form/AppForm";

type QuizzesObj = {
  [key: string]: Quiz;
};

const quizFormValidate = (values: QuizFormValues) => {
  const errors: FormikErrors<QuizFormValues> = {};
  Object.keys(values).forEach((key) => {
    if (values[key].length === 0) {
      errors[key] = "* Answer cannot be empty";
    }
  });
  return errors;
};

const generateFormInitialValues = (fieldData: Quiz[]) => {
  if (fieldData.length === 0) {
    return {};
  }
  const formValues: QuizFormValues = {};
  fieldData.forEach((data) => {
    formValues[data.id] = "";
  });
  return formValues;
};

const convertQuizArrayToObject = (quizzes: Quiz[]) => {
  const initialQuizObj: QuizzesObj = {};
  return quizzes.reduce((quizObj, quiz) => {
    return {
      ...quizObj,
      [quiz["id"]]: quiz,
    };
  }, initialQuizObj);
};

const getQuizResults = (
  quizzes: Quiz[],
  formData: QuizFormValues
): QuizResult[] => {
  const quizzesObj = convertQuizArrayToObject(quizzes);
  return Object.entries(formData).map(([formKey, formValue]) => {
    const currentQuiz = quizzesObj[formKey];
    return {
      topic: currentQuiz.topic,
      userAnswer: formValue.trim(),
      correctAnswer: currentQuiz.correctAnswer.trim(),
    };
  });
};

const App = (): JSX.Element => {
  const [quizzesData, setQuizzesData] = useState<Quiz[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const currentQuiz = useMemo<Quiz | undefined>(() => {
    if (
      quizzesData.length > 0 &&
      currentStep >= 0 &&
      currentStep < quizzesData.length
    ) {
      return quizzesData[currentStep];
    }
  }, [quizzesData, currentStep]);

  const formik = useFormik({
    initialValues: generateFormInitialValues(quizzesData),
    enableReinitialize: true,
    validate: quizFormValidate,
    onSubmit: (values) => {
      setQuizResults(getQuizResults(quizzesData, values));
    },
  });

  useEffect(() => {
    getQuizzes();
  }, []);

  const getQuizzes = () => {
    fetch("./quizzes.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((quizzesJson) => setQuizzesData(quizzesJson));
  };

  return (
    <div className="App">
      <header>
        <h1>Star Wars Quizzes</h1>
      </header>
      <main>
        {Object.keys(formik.values).length > 0 && currentQuiz && (
          <section className="quiz-panel">
            {quizResults.length > 0 ? (
              <AppResults
                results={quizResults}
                onRetry={() => {
                  formik.resetForm();
                  setCurrentStep(0);
                  setQuizResults([]);
                }}
              />
            ) : (
              <>
                <AppStepper
                  steps={quizzesData.length}
                  currentStepTuple={[currentStep, setCurrentStep]}
                  disabledNext={!formik.values[currentQuiz.id]}
                />
                <AppForm
                  formik={formik}
                  quizzesData={quizzesData}
                  currentStep={currentStep}
                  currentQuiz={currentQuiz}
                />
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
