export class PubSub {
    constructor() {
        this.events = {};
    }

    /**
     * Either create a new event instance for passed `event` name
     * or push a new callback into the existing collection
     *
     * @param {string} event
     * @param {function} callback
     * @returns {number} A count of callbacks for this event
     * @memberof PubSub
     */
    subscribe(event, callback) {
        
        let self = this;
        
        // If there's not already an event with this name set in our collection
        // go ahead and create a new one and set it with an empty array, so we don't
        // have to type check it later down-the-line
        if(!self.events.hasOwnProperty(event)) {
            self.events[event] = [];
        }
        
        // We know we've got an array for this event, so push our callback in there with no fuss
        return self.events[event].push(callback);
    }

    /**
     * If the passed event has callbacks attached to it, loop through each one
     * and call it
     *
     * @param {string} event
     * @param {object} [data={}]
     * @returns {array} The callbacks for this event, or an empty array if no event exits
     * @memberof PubSub
     */
    publish(event, data = {}) {
        let self = this;
        
        // There's no event to publish to, so bail out
        if(!self.events.hasOwnProperty(event)) {
            return [];
        }
        
        // Get each subscription and call its callback with the passed data
        return self.events[event].map(callback => callback(data));
    }
}

export class Component {
    props;
    constructor(props = {}) {
        let self = this;
        this.props = props;
        // We're setting a render function as the one set by whatever inherits this base
        // class or setting it to an empty by default. This is so nothing breaks if someone
        // forgets to set it.
        this.render = this.render || function() {};
        
        // If there's a store passed in, subscribe to the state change
        if(props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => self.render());
        }
        
        // Store the HTML element to attach the render to if set
        if(props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}

export class Store {
    constructor(params) {
        let self = this;

        // Add some default objects to hold our actions, mutations and state
        self.actions = {};
        self.mutations = {};
        self.state = {};

        // A status enum to set during actions and mutations
        self.status = 'resting';

        // Attach our PubSub module as an `events` element
        self.events = new PubSub();

        // Look in the passed params object for actions and mutations 
        // that might have been passed in
        if(params.hasOwnProperty('actions')) {
            self.actions = params.actions;
        }
        
        if(params.hasOwnProperty('mutations')) {
            self.mutations = params.mutations;
        }

        // Set our state to be a Proxy. We are setting the default state by 
        // checking the params and defaulting to an empty object if no default 
        // state is passed in
        self.state = new Proxy((params.state || {}), {
            set: function(state, key, value) {
                
                // Set the value as we would normally
                state[key] = value;
                
                // Trace out to the console. This will be grouped by the related action
                console.log(`stateChange: ${key}: ${value}`);
                
                // Publish the change event for the components that are listening
                self.events.publish('stateChange', self.state);
                
                // Give the user a little telling off if they set a value directly
                if(self.status !== 'mutation') {
                    console.warn(`You should use a mutation to set ${key}`);
                }
                
                // Reset the status ready for the next operation
                self.status = 'resting';
                
                return true;
            }
        });
    }

    /**
     * A dispatcher for actions that looks in the actions 
     * collection and runs the action if it can find it
     *
     * @param {string} actionKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    dispatch(actionKey, payload) {
  
        let self = this;
        
        // Run a quick check to see if the action actually exists
        // before we try to run it
        if(typeof self.actions[actionKey] !== 'function') {
          console.error(`Action "${actionKey} doesn't exist.`);
          return false;
        }
        
        // Create a console group which will contain the logs from our Proxy etc
        console.groupCollapsed(`ACTION: ${actionKey}`);
        
        // Let anything that's watching the status know that we're dispatching an action
        self.status = 'action';
        
        // Actually call the action and pass it the Store context and whatever payload was passed
        self.actions[actionKey](self, payload);
        
        // Close our console group to keep things nice and neat
        console.groupEnd();

        return true;
    }

    /**
     * Look for a mutation and modify the state object 
     * if that mutation exists by calling it
     *
     * @param {string} mutationKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    commit(mutationKey, payload) {
        let self = this;
        
        // Run a quick check to see if this mutation actually exists
        // before trying to run it
        if(typeof self.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }
        
        // Let anything that's watching the status know that we're mutating state
        self.status = 'mutation';
        
        // Get a new version of the state by running the mutation and storing the result of it
        let newState = self.mutations[mutationKey](self.state, payload);
        
        // Merge the old and new together to create a new state and set it
        self.state = Object.assign(self.state, newState);

        return true;
    }
}

export function $(id){
    // if(name.startsWith('#')){
    //     return document.getElementById(name.substring(1));
    // }
    return document.getElementById(id); 
}

export function $s(name){
    return document.getElementsByClassName(name);
}