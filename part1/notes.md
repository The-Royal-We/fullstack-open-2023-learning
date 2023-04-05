# Notes

## c. Component State, Event Handlers

### Passing state - to child components

- Aim to create small and reusable components
- Best practice - [Lift state up](https://reactjs.org/docs/lifting-state-up.html)
  - When you want to coordinate two components, move their state to their common parent.
  - Then pass the information down through props from their common parent.
  - Finally, pass the event handlers down so that the children can change the parent’s state.
  - It’s useful to consider components as “controlled” (driven by props) or “uncontrolled” (driven by state).

## d. A more complex state, debugging react apps

### Complex State

- Is is _forbidden in react to mutate state mutate state directly_

```
const handleLeftClick = () => {
  clicks.left++ // this is bad. do not do this
  setClicks(clicks)
}
```

- Changing state has to always be done by setting the state to a new object

### Rules of hooks

Hooks may not be called from

1. inside a loop
2. a conditional expression
3. not a function defining a component

This is to ensure that hooks are always called in the same order. If not, the program will behave erratcially

```
const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

### Event Handling - part deux

The event handler is not a function but a variable assignement.

```
// what happens here
<button onClick={console.log('clicked the button')}>
  button
</button>
```

The code above will log to the console, but clicking the button wont do anything

The issue here is that our event handler is defined as a function call which means that the event handler is assigned the returned value from the function, which in the case of console.log is undefined.

### A function that returns a function

NB Revisit this

Functions returning functions can be utilized in defining generic functionality that can be customized with parameters. The hello function that creates the event handlers can be thought of as a factory that produces customized event handlers meant for greeting users.

```
  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }
```

can be condensed to

```
  const hello = (who) => () => {
    console.log("hello", who);
  };
```
