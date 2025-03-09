// app/api/generate-sop/route.js
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com', // Replace with the actual DeepSeek API endpoint
  apiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
});

export async function POST(request: NextRequest) {
  const {
    studentName,
    city,
    wardNumber,
    province,
    educationLevel,
    highSchoolMajor,
    subjectsStudied,
    institutionName,
    institutionAddress,
    startDate,
    jlctExamDate,
    languageSchoolName,
    enrollmentMonthYear,
    languageProgramDuration,
    subjectsToLearn,
    universityFaculty,
    universityMajor,
    focusAreas,
    futureGoals,
    contribution,
  } = await request.json();

  try {
    // Construct the prompt for generating the SOP
    const prompt = `Generate a detailed Statement of Purpose (SOP) for a student following the structure below:

    STATEMENT OF PURPOSE
    MY NAME IS ${studentName}, AND I COME FROM ${city}, WARD NO. ${wardNumber}, ${province}, NEPAL. PURSUING HIGHER EDUCATION IN JAPAN HAS BEEN A LONG-HELD ASPIRATION, AND I AM THRILLED TO TAKE THIS SIGNIFICANT STEP TOWARD ACHIEVING MY ACADEMIC AND PROFESSIONAL GOALS.
    I COMPLETED MY ${educationLevel} IN ${highSchoolMajor}, WHERE I DEVELOPED A STRONG FOUNDATION IN ${subjectsStudied}. I AM STUDYING JAPANESE LANGUAGE AT ${institutionName}, ${institutionAddress}, SINCE ${startDate}. I AM HONORED TO HAVE SUCCESSFULLY PASSED THE JAPANESE LANGUAGE CAPABILITY TEST (JLCT) IN ${jlctExamDate}, AN ACCOMPLISHMENT THAT REFLECTS MY DEDICATION AND COMMITMENT TO PREPARING FOR LIFE AND STUDY IN JAPAN. MASTERING THE JAPANESE LANGUAGE WILL BE CRUCIAL FOR MY ACADEMIC JOURNEY AND DAY-TO-DAY LIFE, ENABLING ME TO INTEGRATE SEAMLESSLY INTO JAPANESE SOCIETY AND COMMUNICATE EFFECTIVELY IN BOTH EDUCATIONAL AND PROFESSIONAL CONTEXTS.
    TO STRENGTHEN MY LANGUAGE PROFICIENCY AND CULTURAL UNDERSTANDING, I PLAN TO JOIN ${languageSchoolName} AS AN ${enrollmentMonthYear} STUDENT FOR A ${languageProgramDuration} LANGUAGE PROGRAM. I BELIEVE THE IMMERSIVE LEARNING ENVIRONMENT AND COMPREHENSIVE APPROACH AT ${languageSchoolName} WILL EQUIP ME WITH THE SKILLS AND CONFIDENCE I NEED TO EXCEL IN MY FUTURE STUDIES AND ADJUST SMOOTHLY TO LIFE IN JAPAN. THROUGH THIS PROGRAM, I LOOK FORWARD TO LEARNING ${subjectsToLearn}.
    UPON COMPLETING THE LANGUAGE PROGRAM, MY AMBITION IS TO ENROLL IN THE FACULTY OF ${universityFaculty} AT A DISTINGUISHED JAPANESE UNIVERSITY AND MAJOR IN ${universityMajor}. MY FOCUS WILL BE ON AREAS LIKE ${focusAreas}. JAPAN’S ADVANCED EDUCATION SYSTEM AND EMPHASIS ON PRACTICAL LEARNING INSPIRE ME, AND I BELIEVE STUDYING IN THIS ENVIRONMENT WILL SHAPE ME INTO A KNOWLEDGEABLE AND FORWARD-THINKING PROFESSIONAL.
    AFTER COMPLETING MY HIGHER EDUCATION, I AM DETERMINED TO RETURN TO NEPAL AND ${futureGoals}. THROUGH THESE EFFORTS, I HOPE TO ${contribution}, ULTIMATELY PLAYING A ROLE IN MY COUNTRY’S PROGRESS.
    I AM GRATEFUL FOR THE OPPORTUNITY TO APPLY TO YOUR ESTEEMED INSTITUTION AND AM COMMITTED TO DEDICATING MYSELF FULLY TO MY ACADEMIC AND CULTURAL GROWTH. I AM CONFIDENT THAT YOUR COLLEGE WILL PROVIDE THE IDEAL ENVIRONMENT FOR MY ASPIRATIONS AND DEVELOPMENT.
    THANK YOU FOR CONSIDERING MY APPLICATION.
    SINCERELY,
    ${studentName}`;

    // Call to the DeepSeek API to generate the SOP
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      model: 'deepseek-chat',
      max_tokens: 800,
    });

    const sop = completion.choices[0].message.content;

    // Return the generated SOP
    return NextResponse.json({ sop });
  } catch (error) {
    console.error('Error generating SOP:', error);
    return NextResponse.json(
      { error: 'Failed to generate SOP' },
      { status: 500 }
    );
  }
}
