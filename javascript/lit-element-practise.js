const employee = {
    name: 'Rajkumar',
    profession: 'Software Architect'
  };
  
  class MyElement extends LitElement {
    static get properties(){
      return {
        name: {type: String}
      }
    }
    
    constructor(){
          super();
          //this.employee = employee;
          this.name = name;
    }
    
    render(){
      return html`
              <div>name: ${this.employee.name} & profession: ${this.employee.profession}</div>
          `;
    }
  }
  
  //customElements.define('my-element2', MyElement);
  let myelement = new MyElement();
  
  // const result = html`${myelement.render()}`;
  // render(result, document.body);