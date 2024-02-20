import OpenAi from 'openai';
import { OPENAI_API } from './constants';


const openai = new OpenAi({
    apiKey: OPENAI_API,
    dangerouslyAllowBrowser: true,
})

export default openai;