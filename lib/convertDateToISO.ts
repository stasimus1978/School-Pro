function convertDateToISO(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error("Invalid date format. Please use YYYY-MM-DD");
  }

  const prismaDateTime = `${dateStr}T00:00:00.000Z`;

  return prismaDateTime;
}

export { convertDateToISO };
