'''
categories: "Software development;Testing"
date: "2022-04-02"
description: "Is it a waste of time to carry out automatic testing on web applications? What is the best way to approach web application testing, and what are the most common mistakes when doing it? Should I write automated UI tests?"
imageUrl: "https://images.unsplash.com/photo-1607969891751-1374d59ab4fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
title: "Automatically testing web applications"
'''

# Automatically testing web applications

![An old man in a workshop](https://images.unsplash.com/photo-1607969891751-1374d59ab4fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80)

## TL;DR

- Automate tests that need to be repeated with every deploy
- Focus on end-to-end testing for business critical user scenarios
- Apply the same standards and coding practices for test code and feature code
- Make failing end-to-end tests block publishing your application, that needs to be overridden manually

## Grunt work

People are bad at focusing on repeating the same task, and little gets older quicker than testing an application. What starts as a fun and exciting process of seeing the code you wrote run for the first time soon becomes automatic clicking while your brain zones out. This leads to all kinds of obvious errors and mistakes, missing functionality that angers your coworkers and (god forbid) customers.

The problem is not specific to software. It happens in every process where a repeated task is done by humans. Japanese underground workers have taken to combating it by implementing a point and say technique. They stay alert by pointing at the thing they are supposed to verify and state that everything is OK out loud. While seeing a person pointing at the safety line on the train station and yelling “All clear!” out loud might be comical, it also has the added benefit of reducing the accident rate by more than 50 percent when done by the whole team.

Automatic software testing applies the same principle. A computer runs the software, points at one part of the process and yells out whether everything is OK or not. While most developers know this is good in theory, it can still be overwhelming to do it in practice. This post focuses on providing an overview of essentials, while still staying very theoretical. In case you want to google a get-started blog post after finishing this article, my favourite test runner for front-end applications in 2022 is Cypress.js.

## Different types of automated tests

Before talking about my approach to testing web applications, I want to briefly talk about different testing approaches. These can be separated into the three categories listed below.

### Unit testing

Unit testing is a testing technique concerned with functional correctness of the standalone modules. The main aim is to isolate each unit of the system to identify, analyse and fix the defects. The units tested can be small functions, individual classes, or modules. Unit tests are very useful when refactoring and debugging, but will not cover everything. Even if all parts of a system work as expected in isolation, the whole might still malfunction.
In my opinion, unit tests are strictly a software development tool and should be treated as such. If unit testing makes your team more reliable and the work faster, use it, if not, you can skip this part of tests. They should never replace manual testing or QA.

### Integration testing

Integration testing is done on groups of modules to make sure they work together and interact properly. Most projects are big enough that development is broken down into several smaller modules, and integration testing ensures that different modules can work with each other.

These types of tests are particularly useful when your software is dependent on modules you do not control. As an example, a third-party authentication provider (such as Facebook or Google) might publish a new update that breaks your integration, locking all users out of the application. While integration tests will show you the general health of your system, they fall in the same category as unit tests. They are a development tool, used to make refactoring and fixing malfunctions easier.

### End-to-end testing

End-to-end testing is a technique for testing the entire software product from the beginning to end in order to ensure that the application flow behaves as expected from the beginning to end. The main purpose is to test the end user’s experience by simulating the real user scenario. These types of tests are useful to ensure that your application users are able to use the software without encountering anything unexpected.

## How to approach testing software

![push button wait for walk signal traffic light](https://images.unsplash.com/photo-1464037788451-47f64cfda692?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)

I believe that writing end-to-end tests when writing software is essential to maintaining a good user experience. Our web applications change over time, and having an automatic test for features we are supporting speeds up the development process considerably. While end-to-end tests will not ensure quality, they will ensure that our users are at least able to interact with our UI and get the desired results.

After we have end-to-end tests set up, we can evaluate whether integration and/or unit tests could be beneficial as well. This will largely depend on the implementation of the feature. If the code we wrote is integrating a lot of external modules, we might want integration tests to ensure that changes to those modules do not break our app. If the code we wrote is used in multiple places over our application we might want to write unit tests in order to ensure that it has the expected results even if it changes later on.

So what does a healthy step-by-step implementation of automated tests for a web application feature look like in my opinion?

1. Define the goal of the feature from the user's perspective.
2. Implement the feature.
3. Test the feature manually.
4. Write an end-to-end test that repeats the manual test.
5. Decide if integration tests would be beneficial.
6. Decide if unit tests would be beneficial.

Let us put this list into practice in a real-life scenario that I recently came across. This suite of automated tests ensure that a cookies consent banner decline button works as expected.

1. When a user that did not accept or decline cookies before visits the web page a cookies consent banner including the appropriate heading, explanation and buttons should be shown. The banner should have screen-reader friendly markup. When the decline button is clicked the cookies consent banner should disappear. Afterwards no cookies should be stored. After reloading the page the cookies banner should not be shown, and no cookies should be stored.
2. I implemented this feature using a ReactJs Component that adds additional script elements to the DOM when consent is given, which in turn save cookies needed to run google analytics.
3. I tested the feature manually, reading the content of the banner and running a screen reader. I validated that when I clicked decline no cookies were stored. I reloaded the page, checked that the banner is not shown and that no cookies were stored.
4. I wrote a Cypress.js test that repeats this process. These are the steps that the test function executes:
   1. Navigates to a website URL.
   2. Validate that the cookies consent banner markup is present in the DOM.
   3. Validate that no cookies are stored inside the browser.
   4. Click the decline button inside the cookies consent banner.
   5. Validate that no cookies are stored inside the browser again.
   6. Reload the current page.
   7. Validate that the cookies consent banner markup is not present in the DOM.
   8. Validate that no cookies are stored inside the browser.
5. I created a list of all of my web applications URLs that need to show the cookies consent banner on load and added running the test function for every one of these.
6. I added an integration test that checks if the google analytics script that handles storing cookies is added to the DOM and loaded inside the browser when decline is clicked. Not loading the script means that the integration is correct - loading additional resources that the user declined is bad.
7. I added a simple unit test for part of the functionality. During the implementation I wrote a function that stores values into localstorage which I plan on using in other parts of the application.

This is a stark contrast to test-driven-development that would start by writing the test first, before implementing the feature. I find that this is a much more pragmatic approach, since software is very rarely fully defined before implementation. Creating an MVP, writing an end-to-end test for it, getting feedback and then iterating while checking that everything still works as expected is a flow that works a lot better for me.

## Context matters

![Green umbrella between forest trees](https://images.unsplash.com/photo-1591691203197-c00ee071407a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1181&q=80)

The approach described above is what I consider a healthy, pragmatic approach to writing software. However, you should always consider the context that you are working in. These are a few examples of when an approach like this is not the best fit:

- Writing experimental features that are not vital to the core business.
- Writing features for which the market is not yet validated.
- Business is not impacted by reliability. While rare, there are cases when being the first to market is a lot more important than having a product that works well.
- The software will not be further maintained or developed.

These examples are meant to illustrate that as always, there is no silver bullet, and no best-practice that fits all situations. Software development is a complicated field that needs to take a lot of different factors into account. You should always try to change your work process according to the needs of the specific project. That being said, I believe that most projects would significantly benefit from the approach described above.
