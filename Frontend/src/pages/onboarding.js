"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Progress } from "@/components/progress";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { ArrowLeft, ArrowRight, Check, DollarSign } from "lucide-react";

const questionnaire = {
  questionnaire: [
    {
      topic: "User Details",
      questions: [
        {
          question: "What is your full name?",
          attribute: "username",
          type: "text",
          required: true,
        },
        {
          question: "What is your email address?",
          attribute: "email",
          type: "email",
          required: true,
        },
        {
          question: "What is your phone number?",
          attribute: "phone",
          type: "tel",
          required: true,
        },
        {
          question: "What is your date of birth?",
          attribute: "dob",
          type: "date",
          required: true,
        },
      ],
    },
    {
      topic: "Account Details",
      questions: [
        {
          question: "What type of account do you have?",
          attribute: "account_type",
          type: "select",
          options: ["Checking", "Savings", "Investment"],
          required: true,
        },
        {
          question: "What is the current balance in your account?",
          attribute: "balance",
          type: "number",
          required: true,
        },
      ],
    },
    {
      topic: "Income",
      questions: [
        {
          question: "What is the amount of income you receive?",
          attribute: "income_amount",
          type: "number",
          required: true,
        },
        {
          question: "What is the source of the income?",
          attribute: "income_source",
          type: "select",
          options: ["Salary", "Freelance", "Investments", "Other"],
          required: true,
        },
        {
          question: "Please provide a description of the income source.",
          attribute: "income_description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      topic: "Savings Goal",
      questions: [
        {
          question: "What is your savings goal target amount?",
          attribute: "savings_target",
          type: "number",
          required: true,
        },
        {
          question: "What is the title of your savings goal?",
          attribute: "savings_title",
          type: "text",
          required: true,
        },
        {
          question: "By when do you aim to achieve your savings goal?",
          attribute: "savings_deadline",
          type: "date",
          required: true,
        },
      ],
    },
  ],
};

export default function Onboarding() {
  const router = useRouter();
  const [currentTopic, setCurrentTopic] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({});
  const { userInfo } = useContext(UserContext);

  const topics = questionnaire.questionnaire;
  const currentTopicData = topics[currentTopic];
  const currentQuestionData = currentTopicData.questions[currentQuestion];

  const totalQuestions = topics.reduce(
    (acc, topic) => acc + topic.questions.length,
    0
  );
  const questionNumber =
    topics
      .slice(0, currentTopic)
      .reduce((acc, topic) => acc + topic.questions.length, 0) +
    currentQuestion +
    1;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [currentQuestionData.attribute]: e.target.value,
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < currentTopicData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentTopic < topics.length - 1) {
      setCurrentTopic(currentTopic + 1);
      setCurrentQuestion(0);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentTopic > 0) {
      setCurrentTopic(currentTopic - 1);
      setCurrentQuestion(topics[currentTopic - 1].questions.length - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (questionNumber < totalQuestions) {
      goToNextQuestion();
      return;
    }

    const payload = { ...formData, ...userInfo };

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", result.authToken);
        router.push("/");
      } else {
        alert(result.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      alert("An error occurred. Please try again later.");
    }
  };

  const renderInput = () => {
    switch (currentQuestionData.type) {
      case "select":
        return (
          <select
            id={currentQuestionData.attribute}
            value={formData[currentQuestionData.attribute] || ""}
            onChange={handleInputChange}
            required={currentQuestionData.required}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100"
          >
            <option value="">Select an option</option>
            {currentQuestionData.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            id={currentQuestionData.attribute}
            value={formData[currentQuestionData.attribute] || ""}
            onChange={handleInputChange}
            required={currentQuestionData.required}
            autoFocus={true}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 h-24"
          />
        );
      default:
        return (
          <Input
            id={currentQuestionData.attribute}
            type={currentQuestionData.type}
            required={currentQuestionData.required}
            value={formData[currentQuestionData.attribute] || ""}
            onChange={handleInputChange}
            autoFocus={true}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-4">
      <Card className="w-full max-w-lg bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-500 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {currentTopicData.topic}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={questionNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-sm text-gray-400 text-center mb-4">
                  Question {questionNumber} of {totalQuestions}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor={currentQuestionData.attribute}
                    className="text-lg"
                  >
                    {currentQuestionData.question}
                  </Label>
                  {renderInput()}
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={currentTopic === 0 && currentQuestion === 0}
              className="bg-gray-700 border-gray-600 text-gray-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              {questionNumber === totalQuestions ? (
                <>
                  Submit <Check className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
