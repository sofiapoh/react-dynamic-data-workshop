# React with dynamic data workshop for Founders & Coders

The purpose of this workshop is to understand the most common usecase for React in modern frontend.
That usecase is fetching some data from an API and then rendering it.

For this workshop we'll use the GitHub API since it's well documented and familiar to most students.

## Set up

Start by opening the workshop folder, don't peek into solution just yet!

```bash
# clone the repo, ssh or HTTPS, whatever you usually do!
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

If you do not see this message make sure you have the latest version of node (and npm) installed. Make sure you remember to `npm install`!

If you're a Linux user you might get a following error when starting the dev server:

```
events.js:137
throw er; // Unhandled 'error' event^
```

Running this command should fix it:

`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

### Getting an access token

Next you'll need a GitHub auth token so you won't get rate limited!

Go to: `Settings > Developer Settings > Personal access tokens > Generate new token`

For this workshop you'll need to select `repo` and `user` scopes.

When you get your access token remember to save it somewhere! (But don't put it on GitHub). For example, create a file called `token.js` (already in the `.gitignore`) in the root of the workshop folder and put your token there.

```javascript
export const token = "yourAccessToken";
```

## What we'll be building?

### A GitHub user card!

![](https://user-images.githubusercontent.com/17658189/35216025-193031d4-ff5e-11e7-9289-8f7ca5c51a1a.png)

## Walktrough

Before you start I'd like you to take a deep breath, you'll get errors through this workshop and they are annoying but they most likely are quite cryptic at start but you'll learn how to read them. If you get stuck try to get someone else to look at your code. Sometimes the bundler is going to be a bit funny with restarting the file watchers on the dev server so if you don't see changes and feel like you should, restart your server.

Mostly: don't fall into despair, it's just code and you got this!

Let's start by breaking our user card into some top level components. These components will be `Class` components so that we'll have access to state and lifecycle methods. These components will act as "containers" that will do our data fetching and then pass that data down to purely presentational _functional components_.

(Your can read more about stateless vs. stateful components [here](https://code.tutsplus.com/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541))

Based on our design it looks like our two top level components are going to be:

1.  `<UserHeader/>` with your Github avatar, name, username and follower count
2.  `<RepoList/>` With lists of your repositories with their name, descriptions, links and star count.

We'll start with `<UserHeader/>`

### Creating UserHeader

Start by creating a new file for our `UserHeader` component.

Going back to the design, create the skeleton for how your component will come together, add the elements with some hardcoded values first to check something is rendering. We'll also need to hold the data we'll get back from the api somewhere so let's also create `state` where we'll have a key called `userData` with the initial value of `null`.

Don't forget to import this component to your `<App/>` component!

Now let's fill this component with some real user data! I personally like to separate functions that are not directly related to rendering outside the component, into another folder which is commonly called `utils`, create this new folder inside se `src` folder of your project and create a file called `getUserData.js`.

### Get the data

Now we'll need a function that gets your github user data. Create a function that makes a request to `https://api.github.com/users/{{your username}}?access_token={{your access token}}`

You can use any of your preferred method to create an API request but I'll give an example with the `fetch` API. Don't forget to import the access token you created earlier, it's needed to not get rate limited. Try not to copy paste, you'll learn more if you don't!

```javascript=
import { accessToken } from "../../token";

const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response.json();
};

export const getUserData = username => {
  return fetch(`https://api.github.com/users/${username}?access_token=${accessToken}`)
    .then(checkResponse)
    .catch(err => {
      throw new Error(`fetch getUserData failed ${err}`);
    });
};
```

**Note**: this function returns a `Promise`

Now that we have our `getUserData` function, let's import it to our component which will be rendering the data.

### Lifecycle and rendering

We've heard about React lifecycle methods already, they are a place to run functions related to the components lifecycle. In our case we'll want to run a data fetching function as the component mounts the dom. Sounds familiar? Let's define `componentDidMount()` where we'll call `getUserData`.

```javascript=
componentDidMount() {
  const username = "sofiapoh";
  getUserData(username).then(data => console.log(data));
}
```

Hopefully you're seeing something in your console by now! That alone is not enough for us to get rendering, we need to set this data in our components `data` state variable we defined earlier in order for us to consume it outside `componentDidMount`.

```javascript=
  getUserData(username).then(data => this.setState({userData: data}));
```

Let's take this data and use it to finally render some dynamic content.

In your components `render` method destructure following keys out of `this.state.userData` :

```javascript
const {
  avatar_url,
  html_url,
  name,
  followers,
  repos_url
} = this.state.userData;
```

And pass them on your components like so:

```javascript=
render () {
  return (
    <div>
      <img src={avatar_url}/>
      {/*More stuff here!*/}
    </div>
  )
}
```

Now you _might_ be seeing something! If not, that's fine, you've followed instructions correctly.

### When the data isn't there

You might be seeing something like this now:

`Uncaught TypeError: Cannot read property 'avatar_url' of null`

Usually data over network gets to us slower than DOM renders content, this is when we need to provide a loading state so we're not trying to render content that is not there yet. In our case we'll just add a small safeguard in the start of the `render` function:

```javascript
if (!this.state.userData) {
  return <h3>...Loading</h3>;
}
```

This will also help you to avoid UI errors and provide helpful error messages to your user. Note that unless the payload of the made request is not paritcularily heavy you might want to skip loading state and just return `null` to defer rendering until the content is ready. This way you won't get a janky looking flash of loading state before the component finishes loading.

If at this point you feel fairly comfortable continuing ahead I'd like you to take some time to style your `<UserHeader/>` component to roughly match the design. You can use regular css, just create a file (usually something that matches the components name) and import it at the top of your file:

```javascript
import "userHeader.css";
```

This import is handled by your bundler (Parcel in this case) and doesn't make your CSS into Javascript.

Note: in jsx attributes are camelCase and some are slightly different, for example: `class` => `className`.

### What's next?

Hopefully now you'll have a nice looking header component for our Github user card! Next we'll tackle creating the list of your repositories.

You might have noticed from the response we got from `getUserData` didn't include the repos so we'll create another stateful component which fetches it's own data. We did however get a `repos_url` from the response which we'll pass down as a prop to our new component `<RepoList/>`.

### Creating your repo list component

Your next steps are:

1.  Create a new file for your `<RepoList/>` component.
2.  In the component, add some mock data and import it to the `<UserHeader/>` component.
3.  Refactor your `getUserData` function to take a url as an argument so you can use it on both of the components.
4.  Fetch data on the `<RepoList/>` components `componentDidMount` similarily to before.

There is a small gotcha! If you try to render `<RepoList/>` before the parent component has `repos_url` you're going to run into errors. One way to handle this is to use a ternary statement to render the component only when the data is fully loaded:

```javascript=
render () {
  return (
    <div>
      <img src={avatar_url}/>
      <h2>{name}</h2>
      {repos_url ? <RepoList url={repos_url} /> : null}
    </div>
  )
}
```

When your `<RepoList/>` is rendering correctly we can start to render some real data. You've probably noticed the data we have is and `array`. A very common pattern is to create a functional component for the data that you want to render and then map over your data dynamically creating a list of the components, we'll do that next:

```javascript=
// new file: repo.js for rendering a single repository

const Repo = ({name, stargazers_count, description, html_url}) => {
  return (
    <li>{"Your jsx here!"}</li>
  )
}

export default Repo
```

Don't forget to import your `Repo` component to the `RepoList!`

```javascript=
// In RepoList
render () {
  return (
   <ul>{this.state.repos.map(repo => <Repo key={repo.id} {...repo} />)}</ul>
  )
}
```

All dynamically rendered components like our `Repo` here need a `key` prop so React can keep track of the correct elements being added/removed from the DOM.

When you have a list of repos rendering with the data which matches the designs, add some styles! CSS is underrated!

Great job! :sparkles:

### Stretch goals

* Refactor the children of both class components into presentational functional components.
* More CSS
* Create a form input to dynamically create a Github user card from any username

### Feedback? Improvements? Clarification?

Create a pull request or an issue!
