## RSS、Atom、Feed 介绍与简单实现

分类：后台技术 | 标签：php、RSS、Atom、Feed | 发布时间：2013-11-08 22:59:00

___

最近接触了 RSS 订阅相关的，做了一些了解与开发，记录下。

#### RSS是什么

RSS（全称RDF Site Summary，网景的最初定义），RSS也是一种“类网页”描述语言（或叫文档格式），
最初由网景公司（Netscape）定义，RSS只是有个相对统一的规范（注意只是规范），
前途未卜（RSS 2.0的版权问题）。RSS作为网站内容分享的一种便利接口，只是从博客（BLOG）风行才开始广为流传。

关于RSS的更多介绍请参考[RSS](http://zh.wikipedia.org/zh-cn/RSS)。

#### ATOM是什么

由于RSS前途未卜，而且RSS标准发展存在诸多问题或不足，于是ATOM横空出世，可理解为RSS的替代品。
ATOM是IETF的建议标准，Atom Syndication Format是基于XML格式，Atom Publishing Protocol则是基于HTTP协议格式。

RSS与ATOM比较，请参考：[ATOM](http://zh.wikipedia.org/wiki/Atom)

#### FEED是什么

FEED只是一个中间过程，所以全世界没人能给FEED下一个准确的定义，所以大家不用关心FEED的定义，其实FEED什么都不是。
如果非得给个说法，最好还是放到英文环境下理解似乎更加合理，FEED其实就是RSS（或ATOM）和订阅用户之间的“中间商”，
起到帮忙批发传递信息的作用。所以，FEED的常见格式就是RSS和ATOM，网络上说的FEED订阅，更确切的说法应该仍然是RSS或ATOM订阅。

FEED更多介绍：[Feed](http://en.wikipedia.org/wiki/Feed)

#### 可用的工具

RSS Feed 检验网站：[feedvalidator](http://feedvalidator.org)。可以检验你的 RSS 是否符合标准，假如不符合会给出相应的提示和警告。

RSS托管服务网站：[feedburner](http://feedburner.google.com)。 网站定位：全球最大的RSS托管服务网站。07年被google以1亿美元收购，现在已迁移到Google域名之下。

#### php 简单实现

feed.php

	<?php

	class Feed {
		
		protected $entries = array();
		
		protected $title;
		protected $url;
		protected $updated;
		protected $author;
		
		public function title($title) {
			$this->title = $title;
			return $this;
		}
		
		public function url($url) {
			$this->url = $url;
			return $this;
		}
		
		public function updated($updated) {
			$this->updated = $updated;
			return $this;
		}
		
		public function author($author) {
			$this->author = $author;
			return $this;
		}
		
		public function addEntry($entry) {
			$this->entries[] = $entry;
			return $this;
		}	
		
		public function __toString() {
			$result = '<?xml version="1.0">';
			$result .= '<feed xmlns="http://www.w3.org/2005/Atom">';
			$result .= '<title>' . $this->title . '</title>';
			$result .= '<link href=">' . $this->url . '" />';
			$result .= '<updated>' . $this->updated . '</updated>';
			$result .= '<author>' . $this->author . '</author>';
			
			foreach ($this->entries as $entry) {
				$result .= $entry;
			}
			
			return $result;
		}
	}
	
	class Entry {
		protected $title;
		protected $url;
		protected $updated;
		protected $author;
		protected $description;
		
		public function title($title) {
			$this->title = $title;
			return $this;
		}
		
		public function url($url) {
			$this->url = $url;
			return $this;
		}
		
		public function updated($updated) {
			$this->updated = $updated;
			return $this;
		}
		
		public function author($author) {
			$this->author = $author;
			return $this;
		}
		
		public function description($description) {
			$this->description = $description;
			return $this;
		}
		
		public function __toString() {
			$result .= '<entry>';
			$result .= '<title>' . $this->title . '</title>';
			$result .= '<link href=">' . $this->url . '" />';
			$result .= '<updated>' . $this->updated . '</updated>';
			$result .= '<author>' . $this->author . '</author>';
			$result .= '<description>' . $this->description . '</description>';
			$result .= '</entry>';
			return $result;
		}
	}
	?>
	
test.php

	<?php
	require_once 'feed.php';
	
	$feed = new Feed();
	$feed->title('文翼的博客')
		->url('http://wenzhixin.net.cn')
		->updated(date('Y-m-d H:i:s', time()))
		->author('wenzhixin');
	echo $feed;
		
	$entry = new Entry();
	$entry->title('文章1')
		->description('这里是文章1的内容')
		->url('http://wenzhixin.net.cn/1')
		->updated('2013-11-08 22:55:00')
		->author('wenzhixin');
	$feed->addEntry($entry);
		
	$entry = new Entry();
	$entry->title('文章2')
		->description('这里是文章2的内容')
		->url('http://wenzhixin.net.cn/2')
		->updated('2013-11-07 11:33:00')
		->author('wenzhixin');
	$feed->addEntry($entry);
	
	echo $feed;
	?>