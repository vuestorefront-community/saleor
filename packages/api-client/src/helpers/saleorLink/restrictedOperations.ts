/* istanbul ignore file */
const restrictedOperations = {
  user: ['tokenCreate']
};

export const isUserOperation = (operationName: string): boolean =>
  restrictedOperations.user.includes(operationName);
