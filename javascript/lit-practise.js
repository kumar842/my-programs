const template = (data) => html`
	<h1>${data.title}<h1>
	<p>${data.body}</p>
`;

const data = {title: 'Hello world', body: 'lit-html is cool'};
const result1 = template(data);

const myTemplate = (name) => html`<p>Hello ${name}</p>`;

const myTemplate2 = (subtotal, tax) => html`
	<div>Total: ${subtotal + tax}</div>
`;

const clickHandler = () => {
  return () => console.log('sdfsfsf');
};

const myTemplate3 = () => html`
	<button onclick=${clickHandler()}>Click Me!</button>
`;



const myListView = (items) => html`<ul>
${items.map(item => html`<li>${item}</li>`)}
</ul>`;

const myPage = (data) => html`
  ${myListView(data.items)}
`;

const data2 = {
  items: [1,2,3]
};

const result = html`
	${result1}
	${myTemplate2(123, 12)}
	${myTemplate('Rajkumar')}
	${myTemplate3()}
	${myPage(data2)}
`;

render(result, document.body);


//TODO:
// - nothing and the slot fallback content
// - Repeating templates with the repeat directive
// - Caching template results: the cache directive
// 
