## git配置SSH_Key

### 本地配置
1. 检查用户名和邮箱是否配置
```
git config --global --list
```
2. 如未配置，执行以下命令进行配置
```
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```
3. 执行以下命令生成密钥
```
ssh-keygen -t rsa -C "你的邮箱"
```
4. 一直回车

### 添加公钥到你的远程仓库
1. Settings -- SSH and GPG keys
2. 打开刚刚生成的.ssh文件夹，并打开id_rsa.pub文件，并复制其中的内容
```
open ~/.ssh
```
3. 选择 New SSH key,并将刚刚的内容复制进去，同时定义一个key
4. 测试是否配置成功,用ssh连接git
```
ssh -T git@github.com
```