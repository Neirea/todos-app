export const getQueryError = (code: string) => {
  switch (code) {
    case '23502':
      return 'Required field is missing.';
    case '23503':
      return 'Cannot perform operation due to related records.';
    case '23505':
      return 'This record already exists.';
    case '23514':
      return 'Value does not meet required criteria.';
    default:
      return 'Unknown query error';
  }
};
