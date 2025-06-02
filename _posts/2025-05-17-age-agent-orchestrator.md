---
layout: post
title: "Age of the Agent Orchestrator"
featured: true
tags:
- Startups
- AI
- Compute
- Agents
- AGI
---
![image](https://github.com/user-attachments/assets/0dba3e71-5826-4ce8-ab9d-c0641d105bfc)


Over the past couple of years at OpenAI, many friends and family have often asked me what the world might look like when AI and agents can do "everything". it's a question we’re still collectively wrestling with. while that's not happening anytime soon, capabilities are advancing quickly enough that it’s worth thinking a step ahead.

One frame that I find useful is to ask what becomes scarce. Markets tend to organize around whatever is in short supply.

When personal computers and then the internet showed up, the scarce thing became knowing how to write software. if you knew how to program, you could create a tremendous amount of value relative to almost anyone else. When Excel showed up, the scarce thing for a while was knowing how to use it - you could model and understand a business better than the people still doing math on paper.

Once you can reliably put a spreadsheet, a legal brief, a codebase, a marketing plan, a budget, or whatever else into a loop with a capable model - ask it to do the work, check the work, improve the work, and repeat - the scarce thing is no longer "who knows how to do that task by hand". The scarce thing becomes "who can orchestrate resources well" - compute, capital, access to data, and human/expert judgment.

Here are three consequences I see if we get to that world:

**Expertise gets democratized.**

The premium shifts from "I know the tax code" to "I can design the loop that gets the right answer and runs cheaply".

Right now, you hire an expert to do your taxes because the space of possible mistakes is large and the cost of being wrong is high. If you can build (or rent) an agent that can do a competent job of your taxes, ask for feedback, double-check edge cases, and improve over time, then the gatekeeping function of the expert goes away. There will still be experts - we will need people to provide judgment, to set the high-level strategy, to handle the weird cases - but the leverage point moves. Knowing the details of the tax code will be less valuable than knowing how to set up an autonomous workflow that produces a correct return, flags the ambiguous parts for a human to look at, and costs $0.05 in compute instead of $5. This is great news for a lot of people. 

The knowledge that used to require years of schooling and apprenticeships will be accessible to anyone who can chat, call an API, and structure a loop. it's also going to be uncomfortable for people whose status is tied up in being the only ones who can do something. If you're training for a career because you believe the information is scarce, it's worth asking yourself what happens when it's not. If you're training to be the person who can take all of the cheap information and turn it into a valuable outcome, you're on firmer ground.

Resource optimization matters a lot more. 
We are going to have to get very good at assigning FLOPs/compute, liquidity, lab time, human review, etc., to autonomous workflows/agents. This is a new job. 

Today, if you want to do a big marketing analysis, you send it to your analyst and she tells you it'll be done in two weeks. She has some rough mental model of her own time and the other things on her plate. In a world where you can spin up 10k agents to do 10k analyses, your bottlenecks become very different. Your compute cluster is finite. Your budget is finite. The number of hours your expert reviewers have is finite. If you spray tasks everywhere without thinking, you'll hit resource limits fast. The teams that know how to prioritize which agent gets which compute, when to spend $10 on more compute versus when to ask a human for 5 minutes of feedback, how to queue up a million tasks overnight when energy is cheap, how to take advantage of low-liquidity windows, and so on, are going to have a big advantage. 

Startups have always had to allocate capital carefully. In this new regime, you have to allocate compute carefully too. It's not a "set it and forget it" situation - models will get better, costs will go down, new tasks will appear. you will need people whose job is literally to orchestrate fleets of AI agents and the scarce resources they need. Think of it like an air traffic controller or "orchestrator" for agents. the very best companies already do some of this. They optimize cloud spend, they schedule jobs, they think about capital efficiency. But most companies are extremely wasteful with both human and machine time. That won't be sustainable when the throughput of work an organization can do is limited by its ability to coordinate.

![image](https://github.com/user-attachments/assets/6e91f6f3-646b-437d-adb0-ac19d1414889)

**Literacy in managing agents becomes the new Excel.**

Knowing how to break down a task, set a reward, audit a run is going to be a baseline skill. 

Companies that run lots of agent A/B tests and bake that into their culture will compound faster than the ones that try to bolt AI onto old workflows and drown in complexity. When Excel showed up, there was a window of time where if you knew how to use it, you were special. Then it became table stakes - if you worked in finance and didn't know how to use a spreadsheet, you were unemployable. The same thing is going to happen with managing AI agents. being able to write a decent prompt, set up a feedback loop, monitor the outputs, tweak the reward function, and run an experiment to see if version A or version B of your agent loop works better will be as expected as knowing how to make a pivot table. This isn't "prompt engineering" in the meme sense. it's product management for agents -- thinking about edge cases, it's deciding when to let the agent run versus when to stop and ask a human, it's noticing when the agent is optimizing the wrong thing because you gave it the wrong reward. 

![image](https://github.com/user-attachments/assets/f816ee5d-029e-4968-a741-ccf90e350bb0)

If you build a culture where it's normal for someone in customer support to spin up an agent to handle a new type of ticket, run an A/B test to see if it works, and ship it without waiting for approval from the AI team, you will move much faster than a company that treats AI as a centralized function that has to be integrated slowly into legacy processes. The companies that try to bolt AI onto their old workflows are going to drown. They will create complexity, have shadow processes, and end up with humans checking AI checking humans. The companies that are willing to reimagine their workflows around agents, to run lots of experiments, to build internal tooling for agent management, are going to compound. Culture eats strategy. If you don't create an environment where people are comfortable delegating to machines, measuring the outcomes, and iterating, you'll miss out on a huge amount of leverage.

---

**One of the most satisfying frameworks I’ve found for understanding AI progress is the METR curve, which measures AI performance based on the length of tasks AI agents can complete.**

![image](https://github.com/user-attachments/assets/c4378462-6db3-4662-ae6e-052dd27abff7)

**_"Extrapolating this trend predicts that, in under a decade, we will see AI agents that can independently complete a large fraction of software tasks that currently take humans days or weeks."_**

None of this happens overnight. The models still make mistakes. The tooling for managing agents is immature. the best practices for resource orchestration are not obvious yet. We don't have a lot of people who are great at this new job.

but if you believe that the capability curves are going to keep going up, you should get ready for the shift in scarcity. Start learning how to design loops. Start instrumenting your compute spend. Start hiring people who are excited to be air traffic controllers for AI. start teaching your team how to set up and audit agent workflows.

As always, the most important thing is to build something that users want. In a world where your marginal cost of expertise/knowledge goes to zero, your ability to turn cheap intelligence and expensive resources into valuable products is what will matter. i'm very excited to see the new companies, the new tools, and the new jobs that come out of this. 

**Welcome to the Age of the Agent Orchestrator!**


