const wait = (milliseconds: number = 0): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, milliseconds));

export default wait;