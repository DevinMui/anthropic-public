import axios from 'axios';

const CLAUDE_API_KEY = '<claude api key>';
const CLASSIFY_PROMPT = `The following source may contain an action item for a person to complete. Extract the action from the source if it exists, including a short label and citation. If the action is to schedule a meeting, return "MEETING". If the action is to respond, return "MESSAGE". If the action is anything else, return "TASK". The label must be fewer than 60 characters. Return the action, citation, and label in JSON format as follows. Do not return anything else except the object in JSON notation. If no such action exists, respond with {}:
{{
    "action": "Action of the source",
    "citation": "A quote from the source that supports the categorization of the action",
    "label": "A short label to describe the action"
}}

Here is the source:`;

const SUMMARIZE_PROMPT = `The following is a list of JSON objects with a "message" field and a "citation" field. Using the "message" field of the input JSON objects only, give a one sentence summary of the most important messages. Also include what's in the "citation" field for the message.
Phrase your response in JSON format as follows. Do not return anything else except the objects in JSON notation. 
{
    "summary": "A one sentence summary with the most important messages", 
    "citation": "What is in the citation field for the most relevant message"
}
`;

const ACTION_PROMPT = `Draft an email from the following title: `;

const CLAUDE_PROMPT_PREFIX = `

Human: `;

const CLAUDE_PROMPT_SUFFIX = `

Assistant:`;

interface ClaudeClassifyResponse {
  action: String | null | undefined;
  citation: String | null | undefined;
  label: String | null | undefined;
}

interface ClaudeSummarizeResponse {
  summary: String;
  citation: String;
}

export async function extractActionItem(
  question: String
): Promise<ClaudeClassifyResponse> {
  const res = await axios({
    url: 'https://api.anthropic.com/v1/complete',
    method: 'post',
    headers: {
      accept: 'application/json',
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
    },
    data: {
      model: 'claude-2',
      prompt:
        CLAUDE_PROMPT_PREFIX +
        CLASSIFY_PROMPT +
        question +
        CLAUDE_PROMPT_SUFFIX,
      max_tokens_to_sample: 10000,
    },
  });
  const { completion } = res.data as any;
  try {
    return JSON.parse(completion);
  } catch (e) {
    return {
      action: null,
      citation: null,
      label: null,
    };
  }
}

export async function summarizeItems(list): Promise<string> {
  if (list === undefined) return '{}';
  const res = await axios({
    url: 'https://api.anthropic.com/v1/complete',
    method: 'post',
    headers: {
      accept: 'application/json',
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
    },
    data: {
      model: 'claude-2',
      prompt:
        CLAUDE_PROMPT_PREFIX +
        SUMMARIZE_PROMPT +
        JSON.stringify(list) +
        CLAUDE_PROMPT_SUFFIX,
      max_tokens_to_sample: 10000,
    },
  });
  const { completion } = res.data as any;
  return completion;
}

export async function writeEmail(title: String): Promise<String> {
  const res = await axios({
    url: 'https://api.anthropic.com/v1/complete',
    method: 'post',
    headers: {
      accept: 'application/json',
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
    },
    data: {
      model: 'claude-2',
      prompt:
        CLAUDE_PROMPT_PREFIX + ACTION_PROMPT + title + CLAUDE_PROMPT_SUFFIX,
      max_tokens_to_sample: 1000,
    },
  });
  const { completion } = res.data as any;
  return completion ?? '';
}
