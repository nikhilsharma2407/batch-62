untracked/modified->staging->commit

1.	git init - initialise empty git repo
2.	git status - check the current stattus of repo
3.	git add <filename> - git add readme.md index.html - add files to staging area
4.	git reset <filename> - git reset readme.md index.html - remove files from staging area
5.	git add . - add files to staging area
6.	git merge <branch-name> - merge the changes from other branch into the currently checked out branch
7.	git checkout <filename> - undo all changes since last stage/commit for partilar file
8.	git checkout . - undo all changes since last stage/commit for all lines
9.	git checkout <branch-name> - checkout to resp branch
10.	git checkout -b <branch-name> - create a new branch and then checkout
11.	(one time process for a new repo) git remote add origin <repo url> - add the upstream / link out local repo to cloud remote repo
12.	(one time process for a new branch) git push origin <branch-name> - push the local branch to remote repo
