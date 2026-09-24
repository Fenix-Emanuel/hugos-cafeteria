export const FIRST_STEP = 'reason';
export const flow = {
  reason: {
    messageKey: 'chat.reason.message', field: 'reason', next: 'size',
    options: [
      { value: 'pickup', labelKey: 'reason.pickup' },
      { value: 'catering', labelKey: 'reason.catering' },
      { value: 'event', labelKey: 'reason.event' },
      { value: 'question', labelKey: 'reason.question' },
    ],
  },
  size: {
    messageKey: 'chat.size.message', field: 'size', next: 'when',
    options: [
      { value: 'solo', labelKey: 'size.solo' },
      { value: 'few', labelKey: 'size.few' },
      { value: 'large', labelKey: 'size.large' },
      { value: 'notsure', labelKey: 'size.notsure' },
    ],
  },
  when: {
    messageKey: 'chat.when.message', field: 'when', next: null,
    options: [
      { value: 'today', labelKey: 'when.today' },
      { value: 'tomorrow', labelKey: 'when.tomorrow' },
      { value: 'thisweek', labelKey: 'when.thisweek' },
      { value: 'flexible', labelKey: 'when.flexible' },
    ],
  },
};
export function buildSummary(answers, t) {
  return t('whatsapp.summary')
    .replace('{reason}', () => t(`reason.${answers.reason}`))
    .replace('{size}', () => t(`size.${answers.size}`))
    .replace('{when}', () => t(`when.${answers.when}`));
}
