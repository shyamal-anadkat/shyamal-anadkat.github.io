---
layout: post
title: "Experience × Evals: the build loop for self‑improving agents"
tags:
- Startups
- Agents
- RL
- Evals
- AGI
---

_author's note: this essay summarizes and synthesizes ideas from the linked pieces and adds my own perspective to extend them._

**core idea:** the next capability jump comes from agents that learn in ongoing experience streams, governed by industrial‑grade evals. experience generates scalable data; evals convert it into reliable capability.

### from human data to experiential data

human data is hitting diminishing returns. shift to streams of interaction with grounded rewards; the signal stays informative as systems improve — continuous experience, grounded actions, and reward from the world ([deepmind: era of experience](https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf)).

### the missing half: evals as an operating system

experience is the fuel; evals are the control system. treat evals as productized, continuous gates for deployment, ranking variants, and shaping training signals ([mercor: era of evals](https://mercor.com/blog/welcome-to-the-era-of-evals/)).

evals do three jobs:

- **sense**: detect capability shifts in near‑real time.
- **shape**: translate task outcomes into rewards, curriculum, and data selection.
- **secure**: enforce safety and reliability before anything reaches users.

done right, evals form a contract that every agent, dataset, and training run must satisfy — continuously.

### the coming “gpt‑3 moment” for rl‑native systems

the claim: reinforcement learning (broadly defined) is nearing an inflection where models, environments, and compute align to produce step‑function jumps in general capability — similar to what happened when gpt‑3 made latent scale legible to the world ([mechanize: the upcoming gpt‑3 moment for rl](https://www.mechanize.work/blog/the-upcoming-gpt-3-moment-for-rl/)).

what unlocks it:

- **streamed interaction**: long‑horizon tasks with memory, tools, and multi‑step goals.
- **rich environments**: simulated or sandboxed systems that approximate real‑world feedback loops.
- **dense eval fabric**: automatic judges, checkers, and property tests that make progress measurable at every step.

### compute realities: rl is inference‑heavy

rl at frontier quality behaves like test‑time scaling: heavy inference for exploration, lighter training for consolidation. plan budgets for rollouts and environment compute, not just gradients ([semianalysis](https://semianalysis.com/2025/06/08/scaling-reinforcement-learning-environments-reward-hacking-agents-scaling-data/)).

- **rollouts dominate cost**: many attempts per task shift spend toward inference.
- **environment compute**: tools, sims, and execution add latency; cache and replay.
- **infra tilt**: optimize for orchestration, io, and trace storage in addition to training.

### the loop: experience → evals → selection → deployment

1) generate experience in rich envs (code, tools, sims).  
2) evaluate with automatic judges for correctness, efficiency, safety, uncertainty.  
3) select and train on high‑value traces; adapt curriculum.  
4) deploy behind safeguards, monitor drift, repeat.

### design principles for experience × evals systems

- **streams over snippets**: long‑lived memory and identity; optimize across weeks.
- **grounded rewards**: prefer environment outcomes to preferences.
- **always‑on evals**: run like CI/CD; regressions fail the build.
- **safety as code**: red‑team scenarios as tests; autonomy expands only with monotonic gains.
- **observability by default**: log reasoning traces, actions, tools, rewards, uncertainty.

### a pragmatic blueprint (what to build now)

- **environments**: deterministic, tool‑rich sandboxes seeded with real tasks.
- **judges**: correctness/property tests, equivalence/differential checks, cost/safety budgets.
- **fabric**: eval suites, auto‑curriculum, intelligent policy routing, governance (kill‑switches, audits, shadow mode).

### metrics that matter

- **task success**: pass/fail on real tasks beats proxy scores.
- **cost efficiency**: reward per unit of experience and per inference; improvement per wall‑clock and dollar.
- **robustness & alignment**: performance under shift and degraded tools; policy and safety adherence.
- **velocity**: update cadence and distillation fidelity.

### pitfalls and how to avoid them

- **reward hacking**: defend with adversarial evals and independent judges.
- **eval overfitting**: rotate holdouts; keep eval/test separation strict.
- **hallucinations from outcome‑only scoring**: add process supervision and token‑level shaping; use reasoners‑as‑judges ([semianalysis](https://semianalysis.com/2025/06/08/scaling-reinforcement-learning-environments-reward-hacking-agents-scaling-data/)).

### operating cadence: frequent updates, distillation, and data moats

- **frequent updates**: ship small deltas; auto‑deploy wins, auto‑block regressions.
- **distill often**: explore with larger reasoners, distill into small deployables, re‑spark periodically.
- **own the data**: verifiable experience traces and the envs/judges that produce them are the moat ([semianalysis](https://semianalysis.com/2025/06/08/scaling-reinforcement-learning-environments-reward-hacking-agents-scaling-data/)).

### what changes in teams

- product owns the evals; research owns the policies; infra owns the env/judge fabric. tie promotions and deploy gates to eval outcomes, not vibes.
- incidents become reproducible agent traces with failing tests, replacing screenshots in slack.
- roadmaps shift from feature lists to “what eval will this improve and how much?”

### the opportunity

the “experience × evals” stack is a flywheel. experience gives you data that stays informative as you get better. evals give you gradient — direction and safety. together they form the build loop for self‑improving agents.

we’ve had our pre‑training era; we’ve had our rlhf era. the next era is streaming interaction optimized by industrial‑grade evals. build the environments, wire the judges, and let agents learn.

—

### references

- David Silver, Richard S. Sutton. “The Era of Experience.” DeepMind preprint (2025). [PDF](https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf)
- Mercor. “Welcome to the Era of Evals.” (2025). [Blog](https://mercor.com/blog/welcome-to-the-era-of-evals/)
- Mechanize. “The Upcoming GPT‑3 Moment for RL.” (2025). [Blog](https://www.mechanize.work/blog/the-upcoming-gpt-3-moment-for-rl/)
- Dylan Patel, AJ Kourabi. “Scaling Reinforcement Learning: Environments, Reward Hacking, Agents, Scaling Data.” SemiAnalysis (2025). [Article](https://semianalysis.com/2025/06/08/scaling-reinforcement-learning-environments-reward-hacking-agents-scaling-data/)


