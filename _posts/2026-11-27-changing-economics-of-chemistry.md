---
layout: post
title: "The Changing Economics of Chemistry: India's Asymmetric Opportunity"
description: "How cheaper scientific search changes chemistry R&D, and where India's labs and manufacturers have an advantage."
excerpt: "How cheaper scientific search changes chemistry R&D, and where India's labs and manufacturers have an advantage."
image: /assets/img/changing-economics-of-chemistry-discovery.jpg
tags:
- AI
- chemistry
- R&D
- india
---

![An amber crystal stands out among a set of glass crystallization dishes]({{ page.image | relative_url }})

AI will change the economics of chemistry R&D in 2027.

India has spent the last three decades building a large base of pharma companies, CROs, CDMOs and specialty chemical manufacturers. Much of that industry grew by combining skilled scientific labor with capital-efficient execution and manufacturing at scale.

As computation can handle more of the scientific work, some of the assumptions behind that model will change. I've been thinking about which advantages will still matter over the next decade, which new ones Indian companies could build, and where their leaders should invest now.

## What the experiments show

A few developments from the last 18 months:

**July 2025.** Researchers at Roche and collaborators developed [Minerva](https://www.nature.com/articles/s41467-025-61803-0), a machine learning framework for reaction optimization. In one pharmaceutical process development project, they identified improved process conditions at scale within four weeks, compared with a previous six-month development campaign.

**January 2026.** Researchers published [MOSAIC](https://www.nature.com/articles/s41586-026-10131-4) in Nature, a system comprising 2,498 specialized chemical models trained on reaction protocols. Experimental validation resulted in the synthesis of more than 35 new compounds, with an overall success rate of 71%.

**June 2026.** OpenAI and Molecule.one [connected GPT-5.4 to an automated chemistry laboratory](https://openai.com/index/ai-chemist-improves-reaction/). Given an open-ended research objective, the model proposed a hypothesis for improving a challenging Chan–Lam coupling. Across 10,080 experimental reactions and two iterations, average measured yields increased from 16.6% to 25.2%. Subsequent bench-scale experiments showed improved yields for 11 of 14 substrate pairs.

**September 2026.** Microsoft, Novartis and GSK published [RetroChimera](https://www.nature.com/articles/s41586-026-11160-9) in Nature. When the model's preferred retrosynthetic prediction differed from the recorded reaction, organic chemists preferred the model's suggestion ~64% of the time. The model also demonstrated generalization to proprietary pharmaceutical reaction datasets.

**October 2026.** Roche and ETH Zurich researchers published a [closed-loop learning framework](https://www.nature.com/articles/s43588-026-01063-0) for predicting reaction outcomes and regioselectivity in C–H borylation. Through active learning, they expanded their dataset to cover 812 substrates for regioselectivity and 6,865 high-throughput experimental measurements for reaction outcome prediction.

The researchers were measuring different things. Some asked chemists to judge proposed routes. Others tested predictions in the lab or measured improvements in an industrial process. Models are playing a bigger role in lab decisions. These studies leave open whether AI can do chemistry research autonomously across a broad range of problems. I wonder what the research coming out in late 2027 will look like.

## Search economics

Much of chemistry R&D is a search problem under uncertainty. Given a desired molecule, property or transformation, a chemist has to decide what to design, which routes and conditions to try, which competing mechanisms to investigate, what experiment to run next and when to stop. Years of experiments give chemists good priors. The number of options a team can seriously explore has always depended on how much time and attention its chemists have.

Some of this search is becoming computational. Suppose a chemist has five plausible synthetic routes to a target molecule. A capable system could examine thousands more. It could weigh competing pathways and check whether the reactions are feasible, whether the raw materials are available and how hard it might be to purify the product.

How does the chance of solving the problem change if you spend $1, $100, $1,000 or $10,000 on computation? If an industrial process is worth millions of dollars a year, there may be good reason to spend heavily on inference.

I suspect different kinds of problems will respond very differently to more compute. Some will benefit most from additional reasoning, others from higher-fidelity physical simulations. Some will need new experimental data. Industrial R&D teams should make it a research priority to figure out where more computation can save lab work and where they'll still need to run experiments.

## Verification economics

As it gets cheaper to generate credible hypotheses, testing them becomes more of a bottleneck. A model could propose 10,000 molecules overnight. What matters next is how many the lab can synthesize, characterize and test, and how soon those results can guide the next round.

Counting reactions per day tells you only part of what a lab can do. Analytical sensitivity, reproducibility, experimental controls, uncertainty and the ability to interpret failures all affect what a team can learn. A process chemistry team could run hundreds of experiments and still know little about the mechanism. A smaller, well-chosen set might show which competing pathway dominates, how the kinetics behave or which conditions will hold up at scale.

I'd start with three measures of R&D capacity.

- time required to resolve a meaningful scientific uncertainty
- cost of obtaining a reproducible, verified scientific outcome
- time between observing an experimental result and acting on it

These apply across medicinal chemistry, process development and materials discovery. An organization with strong models and a three-week experimental feedback cycle could lose to one with weaker models and a two-day cycle. As models improve, I'd pay more attention to how teams design experiments, what their analytical infrastructure can measure and how quickly results reach the people deciding what to run next. That's where India's existing chemistry infrastructure can help.

## The institutional learning rate

A chemistry company learns a lot in 20 years. A failed synthesis, an unexpected impurity, an abandoned route, a chromatogram or a failed scale-up can all tell you something about the chemistry. Most of that knowledge stays scattered across notebooks, instruments, old reports and the heads of experienced chemists.

Consider two CROs, each performing 100,000 reactions a year. One archives its results when a project ends. The other, wherever data rights permit, uses those results to improve its predictive models, design better experiments and learn more about the chemistry. After five years, both have performed half a million reactions. The second CRO starts the next half million with stronger scientific priors. How much of that knowledge transfers across molecules, reaction families and physical scales is still an open question, but even small gains could be worth a lot across thousands of projects.

R&D throughput tells you how much work a team gets done. The institutional learning rate tells you how much the team improves by doing that work. I'd track how much reaction prediction accuracy improves per 10,000 experiments and whether unfamiliar problems take fewer runs to solve than they did a year ago. I'd also look for signs that knowledge transfers across programs and that teams use manufacturing failures to inform molecular design and route selection earlier. Over time, those measures may tell you more than a headcount or an inventory of instruments.

A company that waits until 2029 to build the systems it needs to learn from experiments may lose some of the experimental knowledge it generates between now and then for good. Rerunning old experiments just to train models would be expensive. The cost of waiting grows with every experiment.

## Who captures the value?

Much of contract research runs on FTE-based contracts. Customers pay for scientists' time and expertise and for access to the lab.

Robotics and high-throughput experimentation (HTE) can let the same team run more experiments in less time. AI could make that team more productive in a different way by helping it choose experiments that get to an answer in fewer runs. If a CRO can solve a problem with 5–10x fewer experiments or compete on turnaround time and likelihood of success, billing by scientist time starts to look like a poor fit.

A pharma company with faster design–make–test–analyze cycles could try more chemical series, end unproductive programs sooner and improve its odds of finding viable candidates on the same budget.

As CROs get more productive, they could initially face pricing pressure under FTE contracts. Those with distinct scientific capabilities could keep more of the value they create through fixed-price or outcome-based contracts.

CDMOs that find better routes and more reliable process conditions could develop proprietary processes, improve manufacturing economics and strengthen customer relationships. In specialty chemicals, cheaper search could make new product categories commercially viable.

The price of research also shapes how much of it gets done. Some molecules, catalysts, materials and industrial processes may never have been seriously investigated because the work was too expensive or too uncertain. If research gets much cheaper, the size of today's R&D market will be a poor guide to the size of the opportunity.

## Where to start

I'd start with a small set of chemistry problems at different levels of difficulty before committing to an organization-wide AI program.

| problem | what to measure |
|---|---|
| synthesis planning | time and experiments required to establish a feasible route |
| reaction optimization | improvement in isolated yield, selectivity, cost and robustness |
| reaction failure prediction | unsuccessful experiments avoided, including the cost of false predictions |
| medicinal chemistry | time and cost per synthesized compound meeting predefined criteria |
| process development | time to a reproducible process meeting scale, purity, safety and cost requirements |

Use some past problems and keep their outcomes from the models. Include unresolved problems from ongoing research programs, too. Compare model performance with baselines from experienced chemists and existing computational methods, including conventional design of experiments and Bayesian optimization where appropriate. Give each approach a comparable experimental budget. Record failures, measure the full costs and look for problems the models get wrong consistently. Repeat every six months.

I suspect the most useful result will be seeing how quickly the models improve on problems the company needs to solve. A model that performs poorly now but improves steadily every six months calls for a different response than one whose performance stays flat.

I'd put money into things the company can keep using as models change. That includes reliable experimental data, instrument integration, reproducible protocols, evaluations tailored to the chemistry, computing infrastructure and short feedback cycles. Those investments become more useful as models get better.

## Discovery sovereignty

I think a country's ability to generate new scientific knowledge will matter more to its long-term technological sovereignty. India has built substantial manufacturing expertise in medicines, chemicals and advanced materials. It also has several of the things that take time and money to develop for scientific AI, including experienced experimental chemists, analytical infrastructure, process engineering expertise, pilot plants and commercial manufacturing capacity.

A chemist who has taken a reaction from milligrams to tonnes holds knowledge that is hard to acquire from the scientific literature. Understanding why a reaction fails at scale, how impurities propagate, how mixing affects selectivity, or how variations in raw materials affect whether a process holds up takes years of empirical experience. Frontier scientific models need access to this kind of knowledge.

India's accumulated industrial knowledge could help train frontier models. Its labs could produce the experimental feedback to improve them, and its manufacturing infrastructure could help test discoveries under commercially relevant constraints.

Indian R&D leaders should work out now who owns the experimental data and who has the right to learn from it. They also need to decide who owns improvements to the models and who captures the value of any intellectual property those models help generate. We should help build this capability in India's scientific institutions so we don't spend the next decade licensing it from elsewhere.

## What comes next

I'd use four questions to judge how well a chemistry organization can compete over time.

1. How much scientific search can it perform computationally?

2. How efficiently can it verify the resulting hypotheses in the physical world?

3. How much does its scientific capability improve with every experiment?

4. How much of the economic value created by this intelligence does it retain?

By 2030, I suspect some chemistry organizations will have capabilities that competitors struggle to replicate, even if their competitors have access to the same frontier AI models. The advantage will come from years of experimental feedback, better scientific priors, proprietary knowledge and experience running these systems.

India spent several decades building an advantage in doing chemistry efficiently and at scale. Over the next decade, it has a chance to build an advantage in discovering new chemistry, too.

I'd like to hear from R&D leaders and experimental scientists in India who are thinking about these questions and want to collaborate on new research.
