'''
categories: "Software development"
date: "2022-02-02"
description: "How and why to do code reviews well."
imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
title: "How to code review"
'''

# How to code review

![Two people having a discussion in front of laptops in a conference room](https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)

## TL;DR

I'm a developer, of course I wrote a checklist:

- Check that the code can be build and deployed.
- Define the scope and intent of the code you are reviewing.
- Check the code fulfills the intent
- Ensure all comments and discussions relate to maintainability, performance, or functionality.
- Spell check your comments and remove unnecessary information.
- Have discussions in person or via a call and only write down the summary
- Let the author know if they can merge the code.

## Introduction

All companies and organisation that I worked for recognise the value of peer reviews. They praise it in company-wide all-hands meetings. They make it an obligatory part of the software development process. They encourage everyone to give candid feedback as often as possible.

And yet, none of them have added peer review training to their onboarding process. None of the interviews I had included specific questions about code reviews. None of them have guidelines on what separates a good, useful code review from a bad one. All have employees that oppose doing code reviews. All have employees that do code reviews as something imposed onto them that they would rather not do. It seems there is a clear divide between an abstract concept we all know is good and putting it in practice.

This post focuses on a more pragmatic approach to peer reviews. What to do, what not-to do and how to get started. The points I make serve as a foundation for putting code reviews into practice. They are not a be-all end-all solution. When working in a team of people we should adjust to their specific needs and personalities.

## Check that the code can be built and deployed

Most project have an automated process in place for doing this. In the JavaScript world, CI linting, tests and builds are common. That being said some projects might not have these failsafes. The failsafes might fail. They might not block opening the merge request. The author might have missed the automatic message about a failing build.

Always check if the code can be built and deployed as-is. If the build or another part of the deploy process will fail there is no point in doing a review. The code will need to change and be reviewed again before being merged.

## Scope and intent

Before reading the code you should define the scope and intent of the proposed changes. This was already done by the colleague writing the code before you, but needs a revision. They might not have documented it. They might have missed a details. They might have misinterpreted what the code should do. Without understanding the scope and intent you do not have a yard stick to measure the code against.

If you are having trouble doing this, these are some good questions to ask. You can try to answer these yourself, but after you do, always check that the author of the code agrees with you.

- What should change for the user of the software?
- What should change for the person making the software?
- How much value does this change bring to the company?

These should help define how important the three main points of focus for the code review are. Maintainability, performance, and functionality. It might bring another point of focus and it might mean that one of the main points is irrelevant. People don't value maintainability and performance, when a production bug is losing the company large amounts of money. People value maintainability when adding new core features to the system.

## Make sure the code fulfils the intent

This is the part that I see skipped the most when in a hurry or tired. Surely the person that wrote the code checked what it does? Trust me there is no stupider feeling than not running the code and approving it, then deploying a bug. It makes you frustrated with the author of the code. He was supposed to do better. It makes the author frustrated with you. You were supposed to be the failsafe.

As with the build and deploy step, commenting on the code that does not fulfill it's intent is irrelevant. The code will need to be changed and reviewed again afterwards. Check if everything works as expected and if not, let the author know what is wrong.

## Ensure all comments relate to the main points of focus.

So we finally got to the part where you get to read the code. When reviewing the code keep the main points of the review in mind. How important is the maintainability of the code? How important is the functionality? How important is the performance? Is there anything else that is equally or more important? Always try to communicate to the reader what your comments and suggestions relate to. Constructive criticism is received much better when it means achieving a common goal.

After you are done with reading and commenting the code review your comments. Take a pause if you need to refresh for a bit. Try to read the comments from the perspective of the person receiving the feedback. Is it easy to understand what you are trying to say? Are the comment relevant?

## Spell check your comments and remove unnecessary information.

Let me start by quoting a popular Twitch streamer that I enjoy watching. "If you are not able to right click the squiggly word and choose the correct spelling you are not very smart. Then why would I value your opinion?". You should ensure that all your comments are spelled and worded correctly. You should check that all the information in the comment is relevant. If something is not relevant to the point you are making remove it from the comment.

This shows your colleagues that you value their time. Everybody hates getting back a code review that is blocking a merge. Don't make your colleagues waste time by trying to guess what word you miss-spelled. Don't make your colleagues read information that they do not need to.

## Have discussions in person or via a call and only write down the summary

It is not uncommon that a comment or a suggestion will reveal a lack of understanding. Often people will disagree with your opinion. They will want a chance to explain their decisions. These discussions can go long and drag out trough the day. Written text is also subject to different emotional interpretation. You do not get any real-time feedback if the person you are talking to understands you. You cannot give the same feedback back.

I find that in cases where a discussion is needed, this is usually best done in-person or via a video call. It considerably speeds up the process of getting everyone on the same page. It gives everyone a chance to be able to stop the other person and say "Stop, I don't understand what you are saying.". After the discussion a short summary needs to be written under the code review comment. This should document which decision was made and why. More than one person might review the code. You might come back to the code after some time and check why something was added. The explanation is there.

## Let the author know if they can merge the code.

After you are satisfied with your comments, you should let the author know if they can merge the code or not. This is the only part of the code review that I feel the team (or the company) should have a clear guideline for. The person that requested the code review should know if the code can be deployed or not. While this might seem obvious when seen written down a lot of edge cases happen when things are not clear. It will happen that a suggestion or a comment will be good but out of scope. In that case after it was written down for further improvements the code can be merged. It will happen that you will want to point out that a bad practice harms maintainability. It will happen that you will point out that something harms code performance. Some of these comment will not be implemented but should still have learning value. It should be clear after the review which comments (if any) need to be addressed before merging the code.

## Conclusion

I believe peer reviews are very valueable. They help to build trust and respect between colleagues. They are a natural way for knowledge sharing to happen. They are a very good way to normalise giving candid feedback often. This post is not meant to be a rant about everything that people do wrong. It is meant to give a strong foundation for people that have not done code reviews before. It is meant to make people that do code reviews think and discuss their approaches. Finally, it is also meant as a reminder to myself that taking the time needed for a proper code review is important.
