'''
categories: "Software development;Teamwork"
date: "2022-02-02"
description: "Things to do before starting a code review, best practises on how to do a code review, and things to be mindful of. What to check before submitting your code review. How to avoid long discussions and conflict when doing peer review."
imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
imageDescription: "A person taking notes on a piece of paper between two laptop screens"
title: "How to code review"
'''

![A person taking notes on a piece of paper between two laptop screens](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)

# How to code review

## TL;DR

I'm a developer, so of course I wrote a checklist:

- Check that the code can be built and deployed.
- Define the scope and intent of the code you are reviewing.
- Check that the code fulfils the intent
- Ensure all comments and discussions are related to maintainability, performance, or functionality.
- Spell check your comments and remove any unnecessary information.
- Have discussions in person or over a call, and only write down the summary
- Let the author know if they can merge the code.

## Introduction

All companies and organisations that I’ve worked for recognise the value of peer reviews. They praise it in company-wide all-hands meetings. They make it an obligatory part of the software development process. They encourage everyone to give candid feedback as often as possible.

And yet, none of them have added peer review training to their onboarding process. None of the interviews I’ve had have included specific questions about code reviews. None of these companies have provided guidelines on what separates a good, useful code review from a bad one. Their managers and team leaders do not lead by example. They do not set the norm by defining a context of what is and what is not allowed.

All have employees that oppose (sometimes very vocally) doing code reviews. All have employees that see code reviews as something imposed on them - something that they would rather not do, and something that they can do half-heartedly. There is a clear divide between an abstract concept we all know is good and the process of actually putting it into practice.

This post focuses on being pragmatic; what to do, what not to do, and how to get the biggest benefit from peer reviews. The points I make can serve as a foundation for putting code reviews into practice, and can serve as a base for comparison of how well your team is currently doing. They are not a be-all-end-all solution. When working in a team, we should adjust to the team’s specific needs and personalities, and be mindful of the context of our specific situation. Nevertheless, this is a good place to start and improve upon.

## Check that the code can be built and deployed

Most projects have an automated process in place for doing this. In the JavaScript world, CI linting, tests and builds are common. That being said, some projects might not have these fail-safes. The fail-safe might fail, they might not block the merge request from opening, or the author might have missed the automatic message about a failing build.

Always check if the code can be built and deployed as is. If the build or another part of the deployment process fails, there is no point in doing a review. The code will need to be changed and reviewed again before being merged.

## Scope and intent

Before reading the code, you should define the scope and intent of the proposed changes. This was already done by the colleague writing the code before you, but it most likely needs a revision. They might not have documented it, they might have missed an important detail, or they might even have misinterpreted what the code should do. Without understanding the scope and intent, you do not have a yardstick against which to measure the code.

If you’re having trouble doing this, here are some good questions to ask. You can try to answer these yourself, but after you do, always check that the author of the code agrees with you.

- What should change for the user of the software?
- What should change for the person making the software?
- How much value does this change bring to the company?

These questions should help to define how important the three main points of focus for the code review - maintainability, performance, and functionality - are. It might bring another point of focus, and it might even mean that one of the main points is irrelevant. People don't value maintainability and performance when a production bug is costing the company large amounts of money. People value maintainability when adding new core features to the system. Think about considerations like these before starting to review the work.

## Make sure the code fulfills the intent

This is what I see skipped the most when developers are tired or in a hurry. Surely the person that wrote the code checked what it does? Trust me, there is no feeling more stupid than not running the code and approving it, only to deploy a bug. You get frustrated with the author of the code. They should’ve done better. The author gets frustrated with you. You were supposed to be the fail-safe they could depend on.

As with the build and deploy step, commenting on the code that does not fulfil its intent is irrelevant. The code will need to be changed and reviewed again afterwards. Check if everything works as expected, and if not, let the author know what is wrong without looking at the code.

## Ensure all comments relate to the main points of focus.

So we’ve finally got to the part where you get to read the code. When reviewing the code, keep the main points of the review in mind. How important is the maintainability of the code? How important is the functionality? How important is the performance? Is there anything else that is equally important, or perhaps even more so? Always try to communicate to the reader what your comments and suggestions relate to. Constructive criticism is received much better when it means achieving a common goal.

After you are finished reading and commenting on the code, review your comments. Pause if you need to refresh for a bit. Try to read the comments from the perspective of the person receiving the feedback. Is it easy to understand what you are trying to say? Are the comments relevant? Are they concise and to the point? Can they be perceived as overly emotional or critical? Is there any information missing? Is all the information in the comment relevant?

## Spellcheck your comments and remove unnecessary information.

Let me start by quoting a popular Twitch streamer that I enjoy watching. "If you are not able to right-click the squiggly word and choose the correct spelling, you are not very smart. Why would I value your opinion?". You should ensure that all your comments are spelled and worded correctly. You should check that all the information in the comment is relevant. If something is not relevant to the point you are making, remove it from the comment.

This shows your colleagues that you value their time. Everybody hates getting back a code review that is blocking a merge. Don't waste your colleagues’ time by making them guess which word you misspelled. Don't make your colleagues read additional information that they do not need to know.

## Have discussions in person or over a call, and only write down the summary

t is not uncommon for a comment or suggestion to reveal a lack of understanding. People will often disagree with your opinion. They will want a chance to explain their decisions. These discussions can become long and dragged out, and sometimes reaching a decision can take days. Written text is also subject to different emotional interpretations - you do not get any real-time feedback as to whether the person you are talking to understands you, and you cannot return such feedback either.

I find that in cases in which a discussion is needed, this is usually best done in person or through a video call. It speeds up the process considerably, allowing everyone to be on the same page. It gives everyone a chance to be able to stop the other person and say, "Stop, I don't understand what you mean. Please elaborate a bit”. After the discussion, a summary needs to be written under the code review comment. It should document which decision was made and why. More than one person might review the code, or you might want to come back to the code after a while and check why something was added. The explanation should be plain to see.

## Let the author know if they can merge the code

After you are satisfied with your comments, you should let the author know if they can merge the code or not. This is the only part of the code review that I feel the team (or the company) should have clear guidelines for. The person that requested the code review should know if the code can be deployed or not. While this might seem obvious when written down, a lot of edge cases happen when things are not clear. It will occur that a suggestion or comment will be good but out of scope. In that case, after it is written down for further improvements, the code can be merged. It is also likely that you will want to point out a bad practice that harms maintainability, or something that affects code performance. Some of these comments will not be implemented, but they nonetheless have learning value. It should be clear after the review which comments (if any) need to be addressed before merging the code.

## Conclusion

I believe peer reviews are very valuable. They help to build trust and respect between colleagues and are a natural way of encouraging knowledge sharing. They also serve as a very good way of normalising regular candid feedback. This post is not meant as a rant about everything that people do wrong. It is meant to give a strong foundation for people that have not done code reviews before. It is meant to make people that do code reviews think and discuss their approaches. Finally, it is meant as a reminder to myself that taking the time needed for a proper code review is important. I hope it helps.
