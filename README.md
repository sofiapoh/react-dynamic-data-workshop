# React with dynamic data workshop for Founders & Coders

The purpose of this workshop is to understand the most common usecase for React in modern frontend.
That usecase is fetching some data from an API and then rendering it.

For this workshop we'll use the GitHub API since it's well documented and familiar to most students.

## Set up

Start by opening the workshop folder, don't peek into solution just yet!

```bash
git clone git@github.com:sofiapoh/react-dynamic-data-workshop.git

cd react-dynamic-data-workshop

cd workshop

npm i

#and finally

npm start
```

You should now see the following message:

```
Server running at http://localhost:1234
✨  Built in 1.22s.
```

If you do not see this message make sure you have the latest version of node (and npm) installed.

### Getting an access token

Next you'll need a GitHub auth token so you won't get rate limited!

Go to: Settings > Developer Settings > Personal access tokens > Generate new token

For this workshop you'll need to select `repo` and `user` scopes.

When you get your access token remember to save it somewhere! (But don't put it on GitHub). For example, create a file called `token.js` (already in the `.gitignore`) in the root of the workshop folder and put your token there.

```javascript
export const token = "yourAccessToken";
```

## What we'll be building?

### A GitHub user card!

![](https://user-images.githubusercontent.com/17658189/35216025-193031d4-ff5e-11e7-9289-8f7ca5c51a1a.png)
