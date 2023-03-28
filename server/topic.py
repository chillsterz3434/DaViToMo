
import numpy as np
from dataset import DataSet
import json

count_limit = 20     # minimum times a word has to appear in the corpus
topic_count = 10     # number of topics
max_iterations = 100 # maximum number of EM iterations




class TopicModel:
    def __init__(self,data,
                 topic_count=10):
        self.page_count = data.page_count
        self.topic_count = topic_count
        self.word_count = data.word_count
        self.data = data

        # sample a random topic-given-document distribution
        alpha = [2]*self.topic_count
        self.pr_td = np.random.dirichlet(alpha,self.page_count)
        # sample a random word-given-topic distribution
        alpha = [2]*self.word_count
        self.pr_wt = np.random.dirichlet(alpha,self.topic_count)

    def _learn(self,topics):
        """learn parameters from completed data"""

        # learn topic-given-document distributions
        self.pr_td = np.ones([self.page_count,self.topic_count])
        for d,(topic,vector) in enumerate(zip(topics,data.vectors)):
            vector = vector[:,np.newaxis]
            self.pr_td[d] += (topic*vector).sum(axis=0)
        self.pr_td /= self.pr_td.sum(axis=1,keepdims=True)

        # learn word-given-topic distributions
        self.pr_wt = np.ones([self.topic_count,self.word_count])
        topics = np.swapaxes(topics,0,1)
        for w,(topic,vector) in enumerate(zip(topics,data.vectors.T)):
            vector = vector[:,np.newaxis]
            self.pr_wt.T[w] += (topic*vector).sum(axis=0)
        self.pr_wt /= self.pr_wt.sum(axis=1,keepdims=True)

    def _predict(self):
        """predict (fractional) topics given data"""
        topics = []
        for pr_t,page in zip(self.pr_td,self.data.pages):
            doc_pr = (self.pr_wt * pr_t[:,np.newaxis]).T
            doc_sum = doc_pr.sum(axis=1)[:,np.newaxis]
            doc_pr /= doc_sum
            topics.append(doc_pr)
        return np.array(topics)

    def _log_likelihood(self):
        """compute the log likelihood of the data
        (we skip the Pr(doc) factor, which is a constant)"""
        N = data.vectors.sum()  # total # of words in dataset
        ll = 0.0                # log likelihood
        for pr_t,vector in zip(self.pr_td,data.vectors):
            doc_pr = self.pr_wt * pr_t[:,np.newaxis]
            doc_ll = np.log(doc_pr.sum(axis=0))
            ll += doc_ll@vector
        return ll/N

    def print_topics(self):
        for t,pr_w in enumerate(self.pr_wt):
            header = "topic %d" % t
            
            data.print_word_probability_table(pr_w,header)

    def em(self):
        """run expectation-maximization"""
        for it in range(max_iterations):
            topics = tm._predict()
            tm._learn(topics)
            ll = tm._log_likelihood()
            print("iteration %d/%d: ll = %.4f" % (it+1,max_iterations,ll))
        return ll

# load dataset
data = DataSet(count_limit=count_limit)

# print stats
print("====================")
print("word length limit: %d" % data.length_limit)
print("word count limit: %d" % data.count_limit)
print("====================")
print("page count: %d" % data.page_count)
print("word count: %d" % data.word_count)
print("====================")
#data.print_common_words()

# topic model, run EM and print the learned topics
tm = TopicModel(data,topic_count=topic_count)
ll = tm.em()
tm.print_topics()
print("final log likelihood = %.8f" % ll)
print(DataSet.y_words)


