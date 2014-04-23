# /bin/bash

count=`find html/posts/$1 -name "*.md" -print0 | xargs -0 cat | wc -m`
echo "在$1年，你的博客 Markdown 文章的总字数为：$count 字"
