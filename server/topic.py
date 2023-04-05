
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from dataset import DataSet
from wordcloud import WordCloud
import json
import io
import base64
import requests





count_limit = 25     # minimum times a word has to appear in the corpus
topic_count = 7     # number of topics
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

    def Prtd_heatmap(self):
        # Initializing base64 object
        my_stringIObytes = io.BytesIO()

        plt.figure(figsize=(10,8))
        sns.heatmap(self.pr_td, cmap="coolwarm")
        plt.title("Topic Distribution for Each Article")
        # plt.show()

        # Save it to a temporary buffer.
        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        # Embed the result in the html output.
        image_64_encode = base64.b64encode(buf.getbuffer()).decode("ascii")


        data={'title': 'Prtd_heatmap', 'image': image_64_encode}
        res = requests.post('http://localhost:5000/api/pygraphs/prtdmap', json=data)
        returned_data = res.json()

        print(returned_data)
        result = returned_data['result'] 
        print(result)

    def Prwt_heatmap(self, n_words=70):
        # Initializing base64 object
        my_stringIObytes = io.BytesIO()
        # Get the top n_words most frequent words
        word_counts = self.data.vectors.sum(axis=0)
        top_word_indices = np.argsort(word_counts)[::-1][:n_words]
        top_words = [self.data.index_to_word(i) for i in top_word_indices]

        # Get the topic probabilities for the top words
        topic_probabilities = self.pr_wt[:, top_word_indices].T

        # Plot the heatmap
        plt.figure(figsize=(10, 8))
        ax = sns.heatmap(topic_probabilities, cmap="coolwarm", xticklabels=range(self.topic_count),
                         yticklabels=top_words, vmin=0.001, vmax=0.005)
        ax.set_xlabel("Topic")
        ax.set_ylabel("Word")
        ax.set_title("Topic Distribution for Top %d Words" % n_words)
        # plt.show()
        # Base64 encoding
        plt.savefig(my_stringIObytes, format="png")
        image_64_encode = base64.b64encode(my_stringIObytes.getbuffer()).decode("ascii")
        # Creating json object and sending it as a post request
        data={'title': 'Prwt_heatmap', 'image': image_64_encode}
        res = requests.post('http://localhost:5000/api/pygraphs/prwtmap', json=data)
        returned_data = res.json()

        print(returned_data)
        result = returned_data['result'] 
        print(result)

    def generate_wordcloud(self, n_words=100):
        # Initializing base64 object
        my_stringIObytes = io.BytesIO()
        # Get the probabilities of each word across all topics
        pr_w = self.pr_wt.sum(axis=0)
        sorted_indices = np.argsort(pr_w)[::-1][:n_words]
        word_freq = {self.data.index_to_word(i): pr_w[i] for i in sorted_indices}

        # Generate the word cloud
        wc = WordCloud(width=800, height=400, background_color='white', max_words=n_words)
        wc.generate_from_frequencies(word_freq)

        # Plot and save the word cloud
        plt.figure(figsize=(12, 6))
        plt.imshow(wc, interpolation='bilinear')
        plt.axis("off")
        plt.tight_layout(pad=0)
        plt.show()

        # Base64 encoding
        plt.savefig(my_stringIObytes, format="png")
        image_64_encode = base64.b64encode(my_stringIObytes.getbuffer()).decode("ascii")
        # Creating json object and sending it as a post request
        data={'title': 'WordCloud', 'image': image_64_encode}
        res = requests.post('http://localhost:5000/api/pygraphs/wordcloud', json=data)
        returned_data = res.json()

        print(returned_data)
        result = returned_data['result'] 
        print(result)

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

tm.Prtd_heatmap()
# tm.Prwt_heatmap()
# tm.generate_wordcloud()




