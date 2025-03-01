import { uploadToGemini } from "../utils/gemini";

async function getSchedule() {
  const inputData = { /* Your JSON input */ };
  const result = await uploadToGemini(inputData);
  console.log(result);
}

getSchedule();