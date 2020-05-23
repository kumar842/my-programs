const template = document.createElement('template');
template.innerHTML = `
    <style>
        h3 {
            color: coral;
        }
        .image {
            float: left;
        }
    </style>
    <div class="user-card">
        <div class="image">
            <img />
        </div>
        <div>
            <h3></h3>
            <div class="info">
                <p><slot name="email"></p>
                <p><slot name="phone"></p>
            </div>
            <button id="toggle-info">Hide Info</button>
        </div>
    </div>
`;
export default class UserCard extends HTMLElement {
    constructor(){
        super();
        this.showInfo = true;

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
        // this.innerHTML = `<style>h3 {color: coral}</style><h3>${this.getAttribute('name')}</h3>`;
    }

    toggleInfo(){
        console.log(123);
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if(this.showInfo){
            info.style.display = 'block';
            toggleBtn.innerText = 'Hide Info';
        } else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show Info';
        }
    }

    connectedCallback(){
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}
customElements.define('user-card', UserCard);

// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent the mini-infobar from appearing on mobile
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI notify the user they can install the PWA
//   showInstallPromotion();
// });


//make sure service workers are supported
if('serviceWorker'  in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('./sw-cached-site.js')
            .then(reg => console.log(`service worker registered: ${reg}`))
            .catch(error => console.log(`service worked error: ${error}`));
    });
}

const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

// Add a beforeinstallprompt event handler to the window object.
// Save the event as a global variable; we'll need it later to show the prompt.
// Unhide the install button.
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    divInstall.classList.toggle('hidden', false);
  });


//   Add a click event handler for the install button.
//   Call prompt() on the saved beforeinstallprompt event.
//   Log the results of the prompt.
//   Set the saved beforeinstallprompt event to null.
//   Hide the install button.
  butInstall.addEventListener('click', () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    promptEvent.userChoice.then((result) => {
      console.log('👍', 'userChoice', result);
      // Reset the deferred prompt variable, since
      // prompt() can only be called once.
      window.deferredPrompt = null;
      // Hide the install button.
      divInstall.classList.toggle('hidden', true);
    });
  });


//   Add an appinstalled event handler to the window object.
//   Log the install event to analytics or other mechanism.
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    divInstall.classList.toggle('hidden', true);
  });

//Track how the PWA was launched #
window.addEventListener('load', () => {
if (navigator.standalone) {
    console.log('Launched: Installed (iOS)');
    divInstall.classList.toggle('hidden', true);
} else if (matchMedia('(display-mode: standalone)').matches) {
    console.log('Launched: Installed', divInstall);
    divInstall.classList.toggle('hidden', true);
} else {
    console.log('Launched: Browser Tab');
}
});