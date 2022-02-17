'''
categories: "ReactJS;Clean Code"
date: "2022-01-07"
description: "How to write clean, extendable, and testable render functions for ReactJS components."
imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
title: "Clean-er ReactJS Code - Conditional Rendering"
'''

# Clean-er ReactJS Code - Conditional Rendering

![HTML code on a computer screen](https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)

## TL;DR

Move render conditions into appropriately named variables and abstract the condition logic into a function. This makes the render function code a lot easier to understand, refactor, reuse and test.

## Introduction

Conditional rendering is when a logical operator determines what will be rendered. The following code is taken from examples given in the official ReactJS documentation. It is one of the simplest examples of conditional rendering that I can think of.

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

If you ask me, it would be better to write this as a function outside the scope of the Component. This would improve both code readability and code reusability, making the code easier to test and optimise. Above all, this would lessen the cognitive load experienced by programmers.

## Multiple conditions

This is an example of conditional rendering that I come across quite often. Instead of a single condition, we now have many conditions inside the render function.

```javascript
const OptionsPanel = ({ user }) => {
  const { role } = user;

  return (
    <>
      {role !== 29 && role !== 21 && role !== 11 && role !== 30 ? (
        <div>Admin options panel placeholder</div>
      ) : (
        <div>User options panel placeholder</div>
      )}
    </>
  );
};

ReactDOM.render(
  <OptionsPanel user={{ role: 5 }} />,
  document.getElementById("root")
);
```

If the user role is 29, 21, 11 or 30, we return the AdminOptionsPanel Component. If the user role is anything else, we return the UserOptionsPanel. These are the main issues I have with this approach:

- The business logic is paired with the render logic. This makes it harder to think about the render logic in isolation.
- The business logic is not communicated at all. Without knowing what roles 29, 21, 11, and 30 stand for, the reader does not know why this decision has been made.
- The condition is not exportable. If we have the same render condition for different elements inside our codebase, we will have to repeat it.
- The condition is hard to test in isolation. Render functions are seldom this simple. Testing the final output of the Component will not determine if the render condition is causing issues.

## Intrinsic cognitive load

This is the inherent level of difficulty associated with a specific instructional topic. The more complex the instructions, the more mental effort is required to understand them. 4 + 9, for example, is easier to understand and make sense of than a complex mathematical equation. In our code example, we are mixing two different types of information at the same time, relying on the reader to know what certain roles mean. Without that, they are unable to know the intent behind our Component. Let's refactor the code to address this first.

```javascript
const OptionsPanel = ({ user }) => {
  const { role } = user;

  const displayAdminOptionsPanel = React.useMemo(
    () => role !== 29 && role !== 21 && role !== 11 && role !== 30,
    [role]
  );

  return (
    <>
      {displayAdminOptionsPanel ? (
        <div>Admin options panel</div>
      ) : (
        <div>User options panel</div>
      )}
    </>
  );
};
```

It may not seem like much, but now we have split our logic into two thought processes, and can consider one without thinking about the other. When checking if the render function works, it’s important that we check the ternary condition and markup.

Likewise for the `displayAdminOptionsPanel` constant - we need to concern ourselves with how the content of the variable (true/false in our case) is set. The intrinsic cognitive load of the person trying to understand our code is consequently a lot smaller. As a nice bonus, we are also able to wrap our variable inside the ReactJS `useMemo` hook.

I know, I know… I can already hear you grumbling about my pointless nitpicking. After all, the effort that goes into this would be better spent writing more code, right? The thing is that decisions like these do matter. They will impact your performance in invisible ways, and sooner or later, the camel’s back will give way. We read a large amount of functions like these every day, so the intrinsic cognitive load is important. The time we spend trying to understand code that’s already written could be better spent writing new code.

## The hidden cost of software requirements

Developers are almost never lucky enough to get very specific instructions. Our customers don’t simply say "user role 22 should have access to the admin options panel". Instead, the bug report or feature request is phrased from their perspective - that of the business. We often get feedback like "Project managers should also be able to access the admin options". Or rather, "Joe from project management cannot access the options". It’s our job to know that Joe from project management has user role 22, and decipher where the issue in the code is coming from. With this in mind, let's try to refactor our previous code to make the business logic clearer.

```javascript
const ALL_USER_ROLES = [
  29, // admin
  21, // sales
  11, // project management
  30, // marketing
  5, // customer
  10, // intern
];

const ADMIN_ROLES = [29, 21, 11, 30];

const hasAdminPermissions = (userRole) => ADMIN_ROLES.includes(userRole);

const OptionsPanel = ({ user }) => {
  const { role } = user;

  const displayAdminOptionsPanel = React.useMemo(
    () => hasAdminPermissions(role)[(hasAdminPermissions, role)]
  );

  return (
    <>
      {displayAdminOptionsPanel ? (
        <div>Admin options panel</div>
      ) : (
        <div>User options panel</div>
      )}
    </>
  );
};
```

We have documented every known user role and admin role in our system. We have abstracted the check to see if a user has admin permissions into a separate function, further reducing the intrinsic cognitive load of our reader. It is now clear what the initial software requirements were; the admin options panel should only be available for users with admin permissions. We can now check our four points of failure in isolation:

- Are the roles correctly defined?
- Is the function that checks the user roles working as expected?
- Is the component passing the user role to the function?
- Is the render ternary condition correct?

The reader no longer has to know why only users with certain roles are able to access the admin options panel. The code provides this information, simplifying communication between coworkers by making questions more specific. It also makes certain questions (why-does-the-code-work-this-way types of questions) redundant.

## Don't repeat yourself

There is another benefit to moving the business logic into a separate function - business logic is often repeated. If we follow our example, users with admin permissions might be able to see other parts of the interface. They might be able to access certain confidential data or edit particular information. In that case, having a reusable function for checking user role permissions is very handy. It provides a single point of failure and debugging for the whole codebase. Once we validate that it works as specified, it will work that way everywhere. We no longer have to do a global search for this condition to add an admin role or remove an existing one. These are all great benefits that improve productivity and confidence in our codebase.

## Error reporting, debugging, and testing

Structuring our code this way allows for better error reporting. We now see which specific function failed and can fix it in isolation. Moreover, debugging our code is easier since we can focus on a much smaller scope at a time. Finally, testing our code can be a lot more specific. While before we could only test what our component rendered, we can now check every single step:

- Did the roles come from the correct constant?
- Did the function check the user role permissions?
- Did the Component call the permissions check, passing the right argument?
- Did the render return the correct markup?

This gives us a lot more confidence when refactoring or adding more functionalities.

## Conclusion

Writing logic unrelated to markup in separate functions has a lot of added benefits:

- It reduces cognitive load, enabling us to do more.
- Business logic is separated and easier to understand.
- Our code is reusable and provides a single source of truth.
- Error reporting is more specific.
- Testing is more specific and gives faster and better feedback.

All this results in greater ease when it comes to bug fixing, refactoring and adding features. That being said, this is not a silver bullet that will work in all cases. Sometimes structuring your code in this way is more effort than it’s worth. After reading this post, you can now decide for yourself whether the benefits for your team outweigh the effort this approach requires.
