export const daysLeft = (deadline: Date) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url: string, callback: any) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const checkDeadline = (deadline: Date) => {
  if (deadline.getTime() < Date.now()) {
    return true;
  }
  return false;
};

export const checkTargetEth = (targetEth: string) => {
  if (Number(targetEth) < 0 || Number.isNaN(Number(targetEth))) {
    return true;
  }
  return false;
};
