<template>
  <article class="news">
    <h3 class="news-title">{{ title }}</h3>
    <div class="news-meta">
      <p class="news-date" v-show="date">{{ date }}</p>
      <p class="news-author" v-show="author">by {{ author  }}</p>
    </div>
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: 'news-item',
  props: {
    title: {
      type: String,
      required: true
    },
    date: {
      type: String
    },
    author: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.news {
  margin: 2em auto;
  box-sizing: content-box;
  padding: 1em 2em;
  padding-top: 1.5em;
  box-shadow: $box-shadow;
  border-radius: 6px;
  background-color: $gray-000;
  
  .news-meta {
    text-align: center;
    margin-top: 6px;
    font-size: 13pt;
    
    .news-author, .news-date {
      display: inline;
    }
    
    .news-author {
      margin-left: 6px;
    }
  }
  
}
</style>