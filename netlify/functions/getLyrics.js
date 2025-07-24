const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GEMINI_API_KEY environment variable not set.' }),
    };
  }

  // 'konu' parametresini al
  let konu;
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      konu = body.konu;
    } catch {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON in request body.' }),
      };
    }
  } else {
    konu = event.queryStringParameters && event.queryStringParameters.konu;
  }

  if (!konu) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "'konu' parametresi gerekli." }),
    };
  }

  // Gemini API'ye istek at
  const prompt = `Bana ${konu} hakkında kısa bir şarkı sözü yaz`;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorText }),
      };
    }

    const data = await response.json();
    // Gemini cevabını yakala
    const soz = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return {
      statusCode: 200,
      body: JSON.stringify({ soz }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};