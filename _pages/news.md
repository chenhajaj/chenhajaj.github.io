layout: page
title: news
permalink: /news/
pagination:
enabled: true
collection: posts

---

{% if paginator %}

<ul class="news-list">
{% for post in paginator.posts %}
<li>
<a href="{{ post.url }}">{{ post.title }}</a>
<span class="date">{{ post.date | date: "%B %d, %Y" }}</span>
</li>
{% endfor %}
</ul>
<div class="pagination">
{% if paginator.previous_page %}
<a href="{{ paginator.previous_page_path }}">Previous</a>
{% endif %}
<span>Page {{ paginator.page }} of {{ paginator.total_pages }}</span>
{% if paginator.next_page %}
<a href="{{ paginator.next_page_path }}">Next</a>
{% endif %}
</div>
{% else %}
{% include news.liquid %}
{% endif %}
