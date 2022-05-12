import { postData, putData, useEndpoint } from './http-client.js';

//get all questions
export const useQuestions = (searchParams) => {
  const url = `/fetch-questions`;
  return useEndpoint(url, 'questionsFetch', 'POST', searchParams);
};

export const useQuestionTags = () => {
  const url = `/fetch-questions-tags`;
  return useEndpoint(url, 'questionsFetch');
};

//post new question
export const postQuestion = async (question) => postData('/questions', question);

//put - edit question
export const putQuestion = async (question) => putData('/questions', question);
