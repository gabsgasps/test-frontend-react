export const sleep = async (timer: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, timer))
