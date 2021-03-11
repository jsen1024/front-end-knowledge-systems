## git rebase vs git merge

## git rebase

- rebase:基变，即改变分支的根基
- 从某种程度上来说，rebase与merge可以完成类似的工作，不过二者的工作方式有着显著的差异
- git rebase 是将一个分支上面的修改应用到另外一个分支上面。git rebase会修改提交历史（commit_id）

### 分支合并

- git merge 和 git rebase 都可以进行分支的合并
- git merge合并后保留两个分支的记录
- git rebase合并后会展示一个分支的记录，另外一个分支的提交实际生成一个副本



### git merge 

合并之前

![2uJDuB](https://gitee.com/vr2/images/raw/master/uPic/2uJDuB.png)

合并之后

![gA1xRQ](https://gitee.com/vr2/images/raw/master/uPic/gA1xRQ.png)

### git rebase

合并之前

![2uJDuB](https://gitee.com/vr2/images/raw/master/uPic/2uJDuB.png)

合并之后

![ZlbDax](https://gitee.com/vr2/images/raw/master/uPic/ZlbDax.png)

### rebase注意事项

- rebase过程中也会出现冲突
- 解决冲突后，使用git add添加，然后执行
  - git rebase --continue
- 接下来git会继续应用余下的补丁   
- 任何时候都可以通过如下命令终止rebase，分支会恢复到rebase开始前到状态
  - git rebase --abort
- 丢弃掉当前的变基，保留要合并分支的提交
  - git rebase --skip

- 不要对master分支执行rebase，否则会引起很多问题
- 一般来说，执行rebase的分支都是自己的本地分支，没有推送到远程版本库
- 如果一个分支被多个人使用，不使用rebase，因为会影响多个的commit历史