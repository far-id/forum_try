const { order } = require("tailwindcss/defaultTheme");

const orders = [
  { name: 'Latest', value: 'latest' },
  { name: 'Oldest', value: 'oldest' },
  { name: 'most liked', value: 'most-liked' },
  { name: 'most replied', value: 'most-replied' },
  { name: 'popular this week', value: 'popular-this-week' },
  { name: 'popular this month', value: 'popular-this-month' },
  { name: 'popular this year', value: 'popular-this-year' },
  { name: 'popular all time', value: 'popular-all-time' },
  { name: 'my questions', value: 'my-questions' },
  { name: 'my participated', value: 'my-participated' },
  { name: 'my best answers', value: 'my-best-answers' },
];

let find = orders.find(order => order.name === 'my best ');
console.log(find || orders[0])