import { articles } from '../data/articles';
import { topics } from '../data/topics';

export function getAllTopics() {
  return topics;
}

export function getAllArticles() {
  return articles;
}

export function getTopicBySlug(slug) {
  return topics.find((topic) => topic.slug === slug);
}

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByTopic(topicSlug) {
  return articles.filter((article) => article.topic === topicSlug);
}

export function getRelatedArticles(article) {
  if (!article?.related) return [];
  return article.related
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean);
}
