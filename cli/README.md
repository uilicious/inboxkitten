# What is go.sh

> TLDR: Its a bash script that "rewrites" the `$GOPATH` to the folder holding `go.sh` sub `gopath` folder, and configuring `GOBIN` within it.

For the uninformed, `$GOPATH` is the global environment variable in which GO compile its projects and dependencies. Which by default is a shared user directory,
which is suppose to hold _all_ your, dependencies, and project code. This is great.... assuming all you go code works in harmony.

However the world is not a perfect harmony, something as simple as trying to clone an older version of the same project for debugging, while keeping the newer copy.
And having a 100 different projects in the same workspace clashing with one another. Becomes a huge chore quickly. 

With `go.sh` this whole project repository more self contained, and its files and build function like most other software projects (NPM, ant, gradle ...)
Down to having duplicate dependencies of possibly different versions across multiple projects.

So yea _insert swear word_ I hate `$GOPATH`

For summary on issue

+ https://www.reddit.com/r/golang/comments/7h02zn/whats_the_point_of_gopath/
+ https://www.reddit.com/r/golang/comments/40ps8k/really_wrestling_with_gopath/
+ https://news.ycombinator.com/item?id=14763493

Alternative Workarounds

+ https://github.com/getstream/vg

# Help : I do not have go installed.

Unfortunately, installing go is frankly kinda a multistep pain.
See the guides for more details.

For ubuntu : https://www.digitalocean.com/community/tutorials/how-to-install-go-1-6-on-ubuntu-16-04
For macos  : https://ahmadawais.com/install-go-lang-on-macos-with-homebrew/

For ubuntu you probably would need `sudo apt-get install build-essential` for make file support as well