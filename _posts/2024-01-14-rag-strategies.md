---
layout: post
title: "Optimizing RAG: Basic to Advanced Strategies"
tags:
- RAG
- AI
- Large Language Models
- Applied AI
---

Here are some basic → advanced (_where more complexity is acceptable_) strategies that I see for optimizing RAG implementations these days:

[original tweet](https://x.com/shyamalanadkat/status/1746645405276975581?s=20)

**Basic**

1. Using **effective prompt eng**, templating, and conditioning. eg: “given the context information and no prior knowledge, answer the query..” etc. ok, we've all done some pretty aggressive prompt engineering. 
2. Understand the challenges: **don’t overoptimize** and first really identify common issues with retrieval, augmentation, and generation. you always want to start simple. simplicity is sexier. 
3. Choose the right chunk size: **determine the optimal chunk size for your data** to ensure efficient processing and retrieval. chunk overlaps don't always work; use smaller chunks?
4. Using **summaries for data chunks**: apply summarization techniques to data chunks to provide the model with a concise representation of the information
5. **Data, data, and data**: carefully managing, scrutinizing, versioning, and cleaning data sources and pipelines. quality > quantity. garbage data, garbage r-a-g
6. **Evaluating retrieval**: this can include 1/assessing retrieval performance by measuring the proportion of relevant documents retrieved (precision) and all relevant documents retrieved (recall) and 2/ integrating human-in-the-loop evals/feedback and basic evaluations. think about use-case-specific evaluation metrics.
7. **Evaluating generation**: evaluating faithfulness and answer relevancy using something like ragas or a custom-built eval framework.
8. The enlightening realization that **you don't always need a vector db** or just appreciate simpler options like pgvector

**Intermediate**

1. **Metadata filtering**: adding meta-data to the chunks to help process results. remember: similar ≠ relevant. this could also include filtering by relevancy. _caution: be careful about metadata._
2. Managing embeddings: strategies to **handle frequently updated or newly added documents**; challenges include incremental indexing and dynamic document ranking.
3. **Trustworthiness**: using citations/attributions and employing techniques such as confidence estimation, uncertainty quantification, and error analysis to ensure the accuracy and trustworthiness of the generated content; sooner or later, thinking about "answerable probability" + "I don’t know" problems for retrieval. 
4. Leverage **hybrid search techniques** or other index types: integrate different search techniques, such as keyword-based and semantic searches (eg: bm25). again, **similar != relevant for your use case**.
5. Apply **query transformations**: modify the user's query to better match the information needed from the data sources. users don’t always know what they want. query transformations can include strategies like hypothetical document embeddings which take a query, generate a hypothetical response, and then use both for embedding lookup 2/ decomposing the original query into multiple sub-queries or questions and 3/ iteratively evaluating query for missing information, and generate response once all information is available.
6. Trade-offs: **considering trade-offs between precision, recall, computation/cost** to optimize the retrieval and generation process
7. **Advanced chunking strategies**: experiment with different chunking strategies, such as sentence window retrieval and auto-merging retrieval to improve precision and relevance; there's a lot here?
8. **Re-ranking**: re-rank (reordering the retrieved documents) the retrieved documents based on their relevance to the user's query. you can also combine multiple retrieval techniques and reranking strategies to improve the overall performance.

**Advanced**

1. **Fine-tune the model and/or the embeddings**: either continue the training process on a smaller, more specific dataset to optimize performance or fine-tune to better represent the relationships between data points. fine-tuning on domain-specific datasets can sometimes help the generator understand the context the retriever provides.
2. **Customize embeddings** using labeled training data: the approach involves creating a matrix that you can use to multiply your embeddings. the product of this multiplication is a 'custom embedding' that will better emphasize aspects of the text relevant to your use case."
3. **Query routing**: have more than one index or tool then **route sub-queries to the appropriate index or tool/function call**.
4. **Multi-retrieval**: combining the results from multiple retrieval (and generator?) agents to improve the overall quality and fidelity. 
5. **Contextual compression and filtering**: apply compression techniques to reduce the size of the context while preserving its relevance, and use filtering to select the most relevant information for the model
6. **Self-querying**: use the model's output as a query to retrieve more information, which can be combined with the initial response to generate a more truthful answer
7. **Document hierarchies and knowledge graphs**: use document hierarchies and knowledge graphs to improve the organization and retrieval of information. this could also include combining the strengths of both knowledge graphs with vector db. I’ve also seen folks leveraging knowledge graphs to improve the interpretability/explainability.

Let's go build
