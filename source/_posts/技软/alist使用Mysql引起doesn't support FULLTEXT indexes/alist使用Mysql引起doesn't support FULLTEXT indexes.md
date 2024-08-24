---
title: Alist使用MySQL引起FULLTEXT indexes解决
date: 2024-08-24 00:12:24
categories: 
 - 技术/软件
tags:
 - MySQL
 - Alist
author: 陈小可
excerpt: 解决 Error 1214 (HY000):The used table type doesn't support FULLTEXT indexes
---

#### 复现
如果将Alist的数据库改成MySQL，在使用时不使用索引的情况下，没问题，但如果使用索引，那么有一定概率造成FULLTEXT indexes报错

该位置如下
![img.png](img.png)

解决方法，将数据库中表的引擎进行更改
- 使用Navcat
![img_1.png](img_1.png)

- 使用Sql语句
- ALTER TABLE your_table_name ENGINE = MyISAM;


#### 原因
在CentOS系统下，如果您使用的是MySQL 5.x版本，并且遇到了错误 "Error 1214 (HY000): The used table type doesn't support FULLTEXT indexes"，这通常是因为您尝试在非InnoDB或MyISAM存储引擎的表上创建FULLTEXT索引。FULLTEXT索引在MySQL中只支持MyISAM和InnoDB存储引擎（从MySQL 5.6开始支持InnoDB）。
以下是一些解决步骤：
1. **检查存储引擎**：
   首先，您需要检查您的表正在使用的存储引擎。您可以通过以下SQL命令来检查：
   ```sql
   SHOW TABLE STATUS WHERE Name = 'your_table_name';
   ```
   或者针对具体的表：
   ```sql
   SELECT ENGINE FROM information_schema.TABLES
   WHERE TABLE_SCHEMA = 'your_database_name' AND TABLE_NAME = 'your_table_name';
   ```
2. **转换存储引擎**：
   如果您的表不是使用MyISAM或InnoDB存储引擎，您需要将其转换为支持FULLTEXT索引的存储引擎。以下是将表转换为MyISAM的示例命令：
   ```sql
   ALTER TABLE your_table_name ENGINE = MyISAM;
   ```
   如果您希望使用InnoDB（推荐，因为它支持事务），并且您使用的是MySQL 5.6或更高版本，则可以使用以下命令：
   ```sql
   ALTER TABLE your_table_name ENGINE = InnoDB;
   ```
3. **创建FULLTEXT索引**：
   在确认表使用的是正确的存储引擎后，您可以尝试再次创建FULLTEXT索引：
   对于MyISAM表：
   ```sql
   ALTER TABLE your_table_name ADD FULLTEXT(your_fulltext_index_name) (column1, column2, ...);
   ```
   对于InnoDB表（MySQL 5.6+）：
   ```sql
   ALTER TABLE your_table_name ADD FULLTEXT(your_fulltext_index_name) (column1, column2, ...);
   ```
4. **检查MySQL版本**：
   如果您正在使用的是MySQL 5.5或更早版本，并且希望使用InnoDB存储引擎的FULLTEXT索引，那么您需要升级到MySQL 5.6或更高版本，因为早期版本不支持InnoDB上的FULLTEXT索引。
5. **检查系统变量**：
   确保没有系统变量阻止您创建FULLTEXT索引。例如，`ft_min_word_len` 变量定义了可以包含在FULLTEXT索引中的最小单词长度。如果这个值设置得太高，可能会导致您无法为某些列创建FULLTEXT索引。
6. **检查表结构**：
   确保用于FULLTEXT索引的列数据类型是CHAR、VARCHAR或TEXT。
   如果在完成上述步骤后仍然遇到问题，请检查MySQL的错误日志以获取更详细的错误信息，这可能会提供更具体的解决方案。同时，确保您的MySQL服务已经正确安装和配置，且没有其他系统级别的限制阻止了FULLTEXT索引的创建。


#### 参考
- [https://blog.csdn.net/qq_43175215/article/details/107060384](https://blog.csdn.net/qq_43175215/article/details/107060384)
- [https://chatglm.cn/share/FjwT3](https://chatglm.cn/share/FjwT3)

