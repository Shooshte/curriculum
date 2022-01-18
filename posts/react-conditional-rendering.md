'''
categories: "ReactJS;CleanCode;"
date: "2022-01-07"
description: "How to write cleaner, more extendable and easier to test ReactJS Component render functions by exctracting rendering conditions into functions."
title: "Clean-er ReactJS Code - Conditional Rendering"
'''

# Clean-er ReactJS Code - Conditional Rendering

![Photo of Miha Šušteršič](https://i.imgur.com/jw3m4sF.png "My weird face")

## TL;DR

Assign render conditions into clearly named variables and abstract the conditions into functions in order to make the render code easier to understand.

## Introduction

The [ReactJS conditinal rendering](https://reactjs.org/docs/conditional-rendering.html) documentation provides an example of conditional rendering inline if with logical && operator. The example contains something I would like to focus on with this point, a render condition logic condition defined directly inside the component `render()` function. Since that is a sentence that I had to read three times before it made sense (and I wrote it) let's just look at the example:

```javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}

const messages = ["React", "Re: React", "Re:Re: React"];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById("root")
);
```

I am talking about these two conditions:

- `unreadMessages.length > 0 &&`
- `unreadMessages.length`

In this blog post I will try to convince you it would be better to write these as functions outside of the scope of the component. I will talk about code readability, code reusability, code testability and code optimisation. I will even provide a more complicated example than the basic one from the ReactJS docs.

## A real world example
