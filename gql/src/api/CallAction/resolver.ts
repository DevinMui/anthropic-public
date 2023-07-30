import { writeEmail } from "../Claude";

export default {
  async callAction(_, { input: { label } }) {
    const content = await writeEmail(label)
    return { content }
  },
};
