

### The Page
> this page use [hexo](https://hexo.io/) and [fluid](https://hexo.fluid-dev.com/docs/guide/)


### Tips
> must use ssh, use the proxy ssh to push files

```bash
find ../itsmeucu.github.io ! -path "*/.git*" ! -path "*/.idea*" -maxdepth 1 -print0 | xargs -0 rm -rf

cd ../itsmeucu.github.io

git -c credential.helper= -c core.quotepath=false -c log.showSignature=false push --progress --porcelain origin refs/heads/main:main --tags
```

### The Config file
> it can edit the links and other page
> > _config.yml


### Logs the use command to push Github
```text
git remote -v
  origin	https://github.com/itsmeucu/itsmeucu.github.io.git (fetch)
  origin	https://github.com/itsmeucu/itsmeucu.github.io.git (push)

git remote set-url origin git@github.com:itsmeucu/itsmeucu.github.io.git
git remote -v
  origin	git@github.com:itsmeucu/itsmeucu.github.io.git (fetch)
  origin	git@github.com:itsmeucu/itsmeucu.github.io.git (push)

# Generate SSL cert
ssh-keygen -t ed25519 -C "itsme@ucu520.top" -f ~/.ssh/github_itsmeucu

vim ~/.ssh/config
  Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/github_itsmeucu
  ProxyCommand nc -x 127.0.0.1:7895 %h %p    # Proxy HTTP
  # ProxyCommand connect -S 127.0.0.1:7895 %h %p  # Proxy SOCKS5
  
  `when not use proxy ssh` use command `ssh -T git@github.com` or push command
    ssh: connect to host github.com port 22: Connection refused

git -c credential.helper= -c core.quotepath=false -c log.showSignature=false push --progress --porcelain origin refs/heads/main:main --tags
  The authenticity of host 'github.com (<no hostip for proxy command>)' can't be established.
  ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
  This key is not known by any other names.
  Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
  Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
  Enumerating objects: 102, done.
  Counting objects: 100% (102/102), done.
  Delta compression using up to 8 threads
  Compressing objects: 100% (39/39), done.
  Writing objects: 100% (58/58), 14.13 KiB | 4.71 MiB/s, done.
  Total 58 (delta 26), reused 0 (delta 0), pack-reused 0
  remote: Resolving deltas: 100% (26/26), completed with 18 local objects.
  To github.com:itsmeucu/itsmeucu.github.io.git
   	refs/heads/main:refs/heads/main	1ff6964..b78c790
  Done


```
